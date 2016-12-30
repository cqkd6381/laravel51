var canvas;//canvas对象
var stage;//jtopo场景
var scene;//jtopo层
var containers = [];//场景中包含的所有容器
var allnodes = [];//场景中包含的所有nodes
var alllinks = [];//场景中包含的所有links
var allLayNodes = [];//所有的节点（包含坐标轴布局）

var areaList = []; //区域数据源
var assetsList = []; //资产数据源
var arrylinks;//攻击路径数据源
var marginsize = 10;//元素之间的间隔空隙值

//节点字体大小像素,加上y轴偏移量
var fontsize_node = 10 + 2;

//区域标题字体大小,加上y轴偏移量
var fontsize_container = 14 + 2;
var arrAreaNodeBound = [];//存储区域节点的边界[x:10,y:10,width:100,height:100]
var arrAreaContainerBound = [];//存储区域容器的边界[x:10,y:10,width:200,height:200]

var fps = 30; //帧数
var now;
var then = Date.now();
var interval = 1000 / fps; //帧频
var delta;

var video;


//重置canvas区域大小
function resizeCanvas() {
    canvas.width = window.document.documentElement.clientWidth || document.body.clientWidth;
    canvas.height = window.document.documentElement.clientHeight || document.body.clientHeight;
    //stage.repaint();

}

var outNetNode;
//创建和加载动态图数据
function loadCanvasData() {
    allnodes = [];//场景中包含的所有nodes
    alllinks = [];//场景中包含的所有links
    allLayNodes = [];//所有的节点（包含坐标轴布局）

    areaList = []; //区域数据源
    assetsList = []; //资产数据源


    //canvas = null;
    canvas = document.getElementById("canvas");
    canvas.width = window.document.documentElement.clientWidth || document.body.clientWidth;
    canvas.height = window.document.documentElement.clientHeight || document.body.clientHeight;
    window.onresize = resizeCanvas;
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ////视频播放效果
    //fps = 30;
    //interval = 1000 / fps;
    //var v = document.getElementById("video1");
    //video = spriteVideo({
    //    context: canvas.getContext("2d"),
    //    width: canvas.width,
    //    height: canvas.height,
    //    video: v
    //});
    //v.addEventListener("play", videoPlay);
    //v.play();
    stage = new JTopo.Stage(canvas);
    stage.clear();

    scene = new JTopo.Scene();
    scene.clear();
    stage.add(scene);
    stage.needRepaint = 1;



    $.ajax({
        type: "post",
        url: "caseAptPeriod.aspx/GetAreaList",
        data: "",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            areaList = $.parseJSON(data.d);
            if (areaList != null && areaList.error != null) {
                qmalert("提示", areaList.error, 360, 180, null);
                return;
            }
            $.ajax({
                type: "post",
                url: "caseAptPeriod.aspx/GetAssetsList",
                data: "",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (data) {
                    assetsList = $.parseJSON(data.d);
                    if (areaList != null && areaList.error != null) {
                        qmalert("提示", jsonObj.error, 360, 180, null);
                        return;
                    }
                    if (areaList != null && areaList.length > 0) {
                        var rootAreas = areaList.filter(function (item) {
                            return item.pid == 0
                        });

                        outNetNode = createnode("-1", "-1", "", "外网", "https://192.168.3.230/image_area/cloud_1.png", "", "node", 50, 51);
                        outNetNode.x = 5;
                        outNetNode.y = 5;
                        scene.add(outNetNode);
                        //先定位好根节点的XY坐标轴
                        for (var i = 0; i < rootAreas.length; i++) {
                            //区域未展开前作为单独节点
                            var node = createnode(rootAreas[i].id, rootAreas[i].pid, "", rootAreas[i].name, "https://192.168.3.230/image_area/" + rootAreas[i].imgnormal, "https://192.168.3.230/image_area/" + rootAreas[i].imgunnaomal, "container", 80, 80);
                            allLayNodes.push(node);
                            layoutCurAreas(node);
                        }

                        setAllElementBound();

                        nodesOperateAdd(null);
                        getAttackProcess();

                        //fps = 0.5;
                        //interval = 2000 / fps;
                        //autoZoomInHander();

                        //window.setTimeout(autoZoomInHander, 2000);
                    }

                }
            });




        }
    });

    //鼠标滚动整体展开或者收起区域内容,不对画布进行缩放操作
    stage.wheelZoom = null;
    var mousewheelname = "";
    if (navigator.userAgent.indexOf('Firefox') >= 0) {   //firefox
        mousewheelname = "DOMMouseScroll";
    }
    else {
        mousewheelname = "mousewheel";
    }
    canvas.addEventListener(mousewheelname, function (e) {
        var delta = e.detail ? e.detail * (-120) : e.wheelDelta //delta returns +120 when wheel is scrolled up, -120 when scrolled down
        if (delta <= -120) {
            zoomOutHander();
        }
        else if (delta >= 120) {
            zoomInHander();
        }
        getAttackProcess();
    });
    $(canvas).preventScroll();
}

//阻止鼠标滚动事件冒泡
$.fn.extend({
    "preventScroll": function () {
        $(this).each(function () {
            var _this = this;
            if (navigator.userAgent.indexOf('Firefox') >= 0) {   //firefox
                _this.addEventListener('DOMMouseScroll', function (e) {
                    _this.scrollTop += e.detail > 0 ? 60 : -60;
                    e.preventDefault();
                }, false);
            } else {
                _this.onmousewheel = function (e) {
                    e = e || window.event;
                    _this.scrollTop += e.wheelDelta > 0 ? -60 : 60;
                    return false;
                };
            }
        })
    }
});

//递归布局当前区域节点，若存在子区域则递归布局，反之则展开布局此区域节点中的单个节点
function layoutCurAreas(curNode) {
    //判断当前区域下是否还有子区域
    var subAreas = areaList.filter(function (item) {
        return item.pid == curNode.id
    });

    //若当前区域下还包含子区域，则对其子区域进行布局排版
    if (subAreas != null && subAreas.length > 0) {
        for (var j = 0; j < subAreas.length; j++) {
            var node = createnode(subAreas[j].id, subAreas[j].pid, "", subAreas[j].name, "https://192.168.3.230/image_area/" + subAreas[j].imgnormal, "https://192.168.3.230/image_area/" + subAreas[j].imgunnaomal, "container", 60, 60);
            allLayNodes.push(node);
            //当前区域是否包含子区域
            var curHasChildArea = false;
            var curAreaChildren = areaList.filter(function (item) {
                return item.pid == subAreas[j].id;
            });

            if (curAreaChildren != null && curAreaChildren.length > 0) {
                curHasChildArea = true;
            }
            //若当前区域包含子区域，则判断是否包含终端节点
            var curHasChildNode = false;
            var curNodeChildren = assetsList.filter(function (item) {
                return item.areacode == subAreas[j].id;
            })
            if (curNodeChildren != null && curNodeChildren.length > 0) {
                curHasChildNode = true;
            }

            if (curHasChildArea) {
                layoutCurAreas(node);//递归布局当前子区域
            }
            else if (curHasChildNode) {
                layoutAreaNodes(node);
            }
        }
    }

    layoutAreaNodes(curNode);
}

//当前区域没有子区域的情况下，布局当前区域中的电脑节点
function layoutAreaNodes(curNode) {
    //当前根区域下不在包含子区域，直接排版当前区域下的节点
    var curAreaNodes = assetsList.filter(function (item) {
        return item.areacode == curNode.id
    });
    var img1, img2;
    for (var j = 0; j < curAreaNodes.length; j++) {
        if (curAreaNodes[j].type.toString().toLowerCase() == "pc") {
            img1 = "https://192.168.3.230/image_area/computer3.png";
            img2 = "https://192.168.3.230/image_area/icon1.png";
        }
        else if (curAreaNodes[j].type.toString().toLowerCase() == "server") {
            img1 = "https://192.168.3.230/image_area/server1.png";
            img2 = "https://192.168.3.230/image_area/icon3.png";
        }

        var node = createnode(curAreaNodes[j].id, curAreaNodes[j].areacode, curAreaNodes[j].ip, curAreaNodes[j].dev_name, img1, img2, "node", 30, 30);
        allLayNodes.push(node);
    }
}



//自动展开播放
function autoZoomInHander() {
    var autoId = window.requestAnimationFrame(autoZoomInHander);
    now = Date.now();
    delta = now - then;
    if (delta > interval) {
        // 这里不能简单then=now，否则还会出现上边简单做法的细微时间差问题。例如fps=10，每帧100ms，而现在每16ms（60fps）执行一次draw。16*7=112>100，需要7次才实际绘制一次。这个情况下，实际10帧需要112*10=1120ms>1000ms才绘制完成。
        then = now - (delta % interval);
        var flag = zoomInHander();
        if (flag == false) {
            window.cancelAnimationFrame(autoId);
        }
        else {
            getAttackProcess();
        }
    }
}






//放大事件，放大当前场景中的区域节点
function zoomInHander() {
    var allElems = scene.getDisplayedElements();
    //获取场景中存在的区域节点，
    var areaNodes = allElems.filter(function (item) {
        return item.elementType == "node" && item.type == "container"&&item.id!=-1;
    });
    if (areaNodes != null && areaNodes.length > 0) {
        areaNodes.forEach(function (item) {
            nodesOperateAdd(item);
        });
        return true;
    }
    else {
        return false;
    }

}

//缩小事件
function zoomOutHander() {
    var allElems = scene.getDisplayedElements();
    //首先获取终结点，若存在则收起这些节点，展示它的父级区域节点
    var nodes = allElems.filter(function (item) {
        return item.elementType == "node" && item.type == "node" && item.id != -1;
    });
    if (nodes != null && nodes.length > 0) {
        var arrContainer = [];
        var condArr = [];
        var containerObj;
        for (var i = 0; i < nodes.length; i++) {
            condArr = [];
            condArr.push(["id", nodes[i].pid]);
            condArr.push(["elementType", "container"]);
            condArr.push(["type", "container"]);
            containerObj = allElems[getItemIndexByFlieds(allElems, condArr)];
            if (getItemIndexByFlieds(arrContainer, condArr) == -1) {
                arrContainer.push(containerObj);
            }
        }
        arrContainer.forEach(function (item) {
            containerCloseHander(item);
        });
    }
    else {
        //若没有终点节点，则查找最底层的区域节点
        var areaNodes = allElems.filter(function (item) {
            return item.elementType == "node" && item.type == "container" && item.pid != "0";
        });
        var arrContainer = [];
        var condArr = [];
        var containerObj;
        for (var i = 0; i < areaNodes.length; i++) {
            condArr = [];
            condArr.push(["id", areaNodes[i].pid]);
            condArr.push(["elementType", "container"]);
            condArr.push(["type", "container"]);
            containerObj = allElems[getItemIndexByFlieds(allElems, condArr)];
            if (getItemIndexByFlieds(arrContainer, condArr) == -1) {
                arrContainer.push(containerObj);
            }
        }
        arrContainer.forEach(function (item) {
            containerCloseHander(item);
        });

    }

}





//鼠标移到节点悬浮显示提示信息
function nodemouseoverhander() {
    var curNode = this;
    createNodeToolTip(curNode);
}

//鼠标从节点移开删除所有悬浮提示框
function nodemouseouthander() {
    var allElemsList = scene.getDisplayedElements();
    var fiterElems = allElemsList.filter(function (item) {
        return item.elementType == "container" && item.type == "tooltip";
    })
    $.each(fiterElems, function (i, elem) {
        scene.remove(elem);
    });
}

function nodeclickhander() {
    searchType = "accesslist";
    ip = this.ip;
    Search();
}

//鼠标点击线条加载列表攻击详细数据
function linkclickhander() {
    searchType = "attackinfo";
    Search();
}

//鼠标移到线条悬浮显示提示信息
function linkmouseoverhander() {
    var curLink = this;
    createLinkToolTip(curLink);
}

//鼠标从线条移开删除所有悬浮提示框
function linkmouseouthander() {
    var allElemsList = scene.getDisplayedElements();
    var fiterElems = allElemsList.filter(function (item) {
        return item.elementType == "container" && item.type == "tooltip";
    })
    $.each(fiterElems, function (i, elem) {
        scene.remove(elem);
    });
}


//创建节点悬浮提示框
function createNodeToolTip(curNode) {
    //火狐和ie的鼠标事件对象区别
    var theEvent = window.event || arguments.callee.caller.arguments[0];
    //var curNode = theEvent.srcElement;//ie和google的事件的源
    //if (!curNode) {
    //    curNode = theEvent.target;//火狐的事件的源
    //}
    container = new JTopo.Container();
    container.text = curNode.ip;
    container.textPosition = 'Middle_Center';
    container.font = '12px Consolas'; //对应的像素14px;
    container.fontColor = "0,0,0";
    container.borderColor = '255,0,0';
    container.borderRadius = 5; // 圆角
    container.id = curNode.ip;
    container.type = "tooltip"; //表示只作为提示框
    if (isElementExist(container) == true) {
        return false;
    }
    container.width = (container.text.length) * 12;//字体个数乘以字体像素大小
    container.height = 30;
    container.setLocation(curNode.x + curNode.width, curNode.y - container.height);
    container.fillColor = "176,176,176";
    container.zIndex = 6;
    container.alpha = 1;
    container.shadow = false;
    container.showSelected = false;
    scene.add(container);
}

//创建线条悬浮提示框
function createLinkToolTip(curLink) {
    //火狐和ie的鼠标事件对象区别
    var theEvent = window.event || arguments.callee.caller.arguments[0];
    //var curLink = theEvent.srcElement;//ie和google的事件的源
    //if (!curLink) {
    //    curLink = theEvent.target;//火狐的事件的源
    //}
    container = new JTopo.Container();
    container.text = curLink.attacktitle;
    container.textPosition = 'Middle_Center';
    container.font = '12px Consolas'; //对应的像素14px;
    container.fontColor = "0,0,0";
    container.borderColor = '255,0,0';
    container.borderRadius = 5; // 圆角
    container.id = curLink.id;
    container.type = "tooltip"; //表示只作为提示框
    if (isElementExist(container) == true) {
        return false;
    }
    container.width = (container.text.length) * 12;
    container.height = 30;

    container.setLocation(getMousePos(canvas, theEvent).x, getMousePos(canvas, theEvent).y);
    container.fillColor = "176,176,176";
    container.zIndex = 6;
    container.alpha = 1;
    container.shadow = false;
    container.showSelected = false;
    scene.add(container);
}

//获取鼠标在画布中的相对位置
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left * (canvas.width / rect.width),
        y: evt.clientY - rect.top * (canvas.height / rect.height)
    }
}

//节点双击加载本节点包含的子节点
function nodedbClick() {
    //若是容器节点则双击加载子节点或者子区域
    if (this.type == "container") {
        nodesOperateAdd(this);
        getAttackProcess();
    }
}



//双击容器收起此容器并向上容器上层父节点
function containerDbClick() {
    containerCloseHander(this);
    getAttackProcess();
}

//当前容器收起事件
function containerCloseHander(curContainer) {
    removeCurContainer(curContainer);
    //获取当前点击容器的对应的容器节点，并重新添加到场景中
    var condArr = [];
    condArr.push(["id", curContainer.id]);
    condArr.push(["type", "container"]);
    var fnode = allLayNodes[getItemIndexByFlieds(allLayNodes, condArr)];
    scene.add(fnode);
    var fatherContainer = getContainerById(fnode.pid);
    if (fatherContainer != null) { //在父级容器中添加区域节点并删除当前区域
        fatherContainer.add(fnode);
        fatherContainer.remove(curContainer);
    }
    scene.remove(curContainer);//从场景中移除当前容器
    allnodes.push(fnode);
}

function containerMouseWheel() {
    if (e.wheelDelta > 0) {
        nodesOperateAdd(this);
    } else {
        containerDbClick();
    }
}

//清空当前容器包含的所有子元素(子容器或者子节点)
function removeCurContainer(curContainer) {
    if (curContainer.childs != null && curContainer.childs.length > 0) {
        for (var i = 0; i < curContainer.childs.length; i++) {
            var item = curContainer.childs[i];
            //若是子容器则递归清空内部的元素
            if (item.elementType == "container") {
                removeCurContainer(item);
                //item.addEventListener("dbclick", containerDbClick, false);//删除区域容器双击事件
                scene.remove(item);
            }
            else if (item.elementType == "node") {
                //item.removeEventListener("dbclick", nodedbClick, false);//删除节点dbclick监听事件
                scene.remove(item);
                var condArr = [];
                condArr.push(["id", item.id]);
                condArr.push(["type", item.type]);
                condArr.push(["pid", item.pid]);
                allnodes.splice(getItemIndexByFlieds(allnodes, condArr), 1);

                // 节点删除了，对应的线条数据集删除相应的连线
                //var delLinks = alllinks.filter(function (item) {
                //    return item.nodeA.id == curContainer.childs[i].id
                //        || item.nodeZ.id == curContainer.childs[i].id;
                //});
                //for (var j = 0; j < delLinks.length; j++) {
                //    var index = getItemIndex(alllinks,"id",delLinks[j].id);
                //    if (index > -1) {
                //        alllinks.splice(index, 1);
                //    }
                //}

            }
        }
    }
}


//添加当前父节点下的第一层子节点
function nodesOperateAdd(selnode) {
    var pid = 0;
    if (selnode != null) {
        pid = selnode.id;
    }
    //此处筛选依据，终端节点已经过滤不会进入此点击事件，所有容器节点之间可以通过id来唯一标识(AreaSource)，
    //所以能够能够pid来标识当前节点或者子区域属于哪个容器
    var nodes = allLayNodes.filter(function (item) {
        return item.pid == pid;
    })
    var container = null;
    var fatherContainer = null;
    if (pid != 0&&nodes.length > 0) {
        container = new JTopo.Container();
        container.text = selnode.text;
        container.textPosition = 'Top_Left';
        container.text.shadow = false;
        container.fontColor = "0,0,0";
        container.font = '14px 微软雅黑';
        container.font.bold = true;
        container.textOffsetY = 2;
        container.textOffsetX = 2;

        container.borderColor = '161,155,97';
        container.borderWidth = 1;
        container.borderRadius = 8; // 圆角
        container.id = selnode.id;
        container.pid = selnode.pid;
        container.type = "container"; //表示只作为容器
        container.fillColor = "252,249,232";
        //container.fillColor = areaList[getItemIndex(areaList, "id", selnode.id)].backcolor;
        container.shadow = true;
        container.shadowBlur = 20;
        container.shadowColor = "33,116,188";
        container.shadowOffsetX = 5;
        container.shadowOffsetY = 5;
        container.layout = null;//禁止容器自动布局
        container.x = selnode.cX;
        container.y = selnode.cY;
        container.width = selnode.cWidth;
        container.height = selnode.cHeight;

        //var g = stage.graphics;
        //var grd = g.createLinearGradient(container.x, container.y, container.x + container.width, container.y+container.height);
        //grd.addColorStop(0, "rgba(0,250,0,0)");
        //grd.addColorStop(0.5, "rgba(0,250,0,0.5)");
        //grd.addColorStop(1, "rgba(0,250,0,1)");

        //container.fillStyle = grd;
        //如果容器已存在，跳过此操作，防止多次双击事件的执行(暂时解决方法)
        if (isElementExist(container) == true) {
            return false;
        }
        //场景中原来的区域节点移去，替换成当前区域容器
        var condArr = [];
        condArr.push(["id", selnode.id]);
        condArr.push(["type", selnode.type]);
        condArr.push(["pid", selnode.pid]);
        allnodes.splice(getItemIndexByFlieds(allnodes, condArr), 1);
        scene.remove(selnode);
        //selnode.removeEventListener("dbclick", nodedbClick, false);//删除dbclick监听事件
        container.addEventListener("dbclick", containerDbClick, false);
        scene.add(container);
        fatherContainer = getContainerById(selnode.pid);
        if (fatherContainer != null) {
            fatherContainer.add(container);
            //fatherContainer.textPosition = "Middle_Center";
            fatherContainer.remove(selnode); //父级容器中移除此节点
            container.fillColor = "255,255,255";
        }
    }


    //遍历所有节点构造节点绘制对象
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        var arrfiter = allnodes.filter(function (item) {
            return item.id == node.id && item.type == node.type;
        })
        //已存在不用再次添加
        if (arrfiter != null && arrfiter.length > 0) {
            continue;
        }
        allnodes.push(node);
        scene.add(node);
        if (container != null) {
            container.add(node);
        }
        node.alpha = 0;
        JTopo.Animate.stepByStep(node, {
                alpha: 1,
                stop: function () {
                    //终止条件
                    return node.alpha == 1;
                }
            },
            1000, true).start();

        //事件的添加需在对象被加入场景后，否则会导致单一事件触发多次的状况出现
        if (node.type == "container") {
            node.addEventListener("dbclick", nodedbClick, false);//添加click监听事件
        }
        else if (node.type == "node") {
            node.addEventListener("mouseover", nodemouseoverhander, false);
            node.addEventListener("mouseout", nodemouseouthander, false);
            node.addEventListener("click", nodeclickhander, false);
        }
    }

}

//设置元素节点的边界参数值，区域节点x,y,cWidth,cHeight,终端节点 x,y
function setAllElementBound() {
    var nodes = allLayNodes.filter(function (item) {
        return item.pid == 0;
    })
    if (nodes == null || nodes.length == 0)
        return false;
    //先布局最外层区域
    var colCount, colWidth, boundRect, minWidth, minHeight;
    boundRect = { "x": (outNetNode.x + outNetNode.width + marginsize), "y": 0, "width": canvas.width - (outNetNode.x + outNetNode.width + marginsize), "height": canvas.height }
    colCount = 4;//自定义画布中的列数
    if (nodes.length < 4) {
        colCount = nodes.length;
    }
    colWidth = (canvas.width - (outNetNode.x + outNetNode.width + 2 * marginsize)) / colCount;
    minWidth = nodes[0].width + 2 * marginsize //此快计算有待改进
    if (colWidth <= minWidth) {
        colCount -= 1;
        colWidth = canvas.width / colCount;
    }

    var col = [];//记录各列高度
    //初始化记录各列的高度
    for (var i = 0; i < colCount; i++) {
        col[i] = 0;
    }

    //遍历所有节点构造节点绘制对象
    for (var i = 0; i < nodes.length; i++) {
        //是否包含子区域节点
        var childAreaNode = allLayNodes.filter(function (item) {
            return item.type == "container" && item.pid == nodes[i].id;
        });
        //是否包含终端节点
        var childNode = allLayNodes.filter(function (item) {
            return item.type == "node" && item.pid == nodes[i].id;
        });

        var area = 0;
        if (childAreaNode.length > 0 || childNode.length > 0) {
            area = getContainerArea(nodes[i].id);
        }
        else{
            area = nodes[i].width * nodes[i].height;
        }

        //area += Math.ceil(Math.sqrt(area))* marginsize + Math.ceil(Math.sqrt(area) + marginsize) * (marginsize + fontsize_container);
        area += Math.ceil(Math.sqrt(area) + marginsize) * Math.ceil(Math.sqrt(area) + marginsize + fontsize_container);
        nodes[i].area = area;
        nodes[i].minCWidth = minWidth;

        nodes[i].cWidth =colWidth - 2 * marginsize; //当前区域的宽度
        nodes[i].cHeight = Math.ceil(nodes[i].area / nodes[i].cWidth); //当前区域的通过面积计算得出的高度


        var index = getMinColIndex(col);
        if (nodes[i].minCWidth != null && nodes[i].cWidth < nodes[i].minCWidth) {
            nodes[i].cWidth = nodes[i].minCWidth;
        }

        nodes[i].cX = boundRect.x + (index * colWidth + marginsize);//当前区域X坐标
        nodes[i].cY = boundRect.y + (col[index] + marginsize + fontsize_container); //当前区域Y坐标


        if (childAreaNode.length == 0 && childNode.length == 0) {
            nodes[i].minCHeight = nodes[i].height;
        }
        else {
            //布局当前区域（包含子区域）
            if (childAreaNode.length > 0) {
                colCount = 2;//默认情况下，当前区域已2列用于排列子区域
                //布局子区域后，nodes[i].cHeight会重新计算
                setAreaElementBound(childAreaNode, nodes[i]);
            }
            //布局只包含终端的区域
            else if (childNode.length > 0) {
                colCount = Math.floor((nodes[i].cWidth - marginsize) / (childNode[0].width + marginsize));
                setNodeElementBound(childNode, nodes[i]);
            }
            nodes[i].minCHeight = getContainerMinHeight(nodes[i], colCount);
        }

        if (nodes[i].minCHeight != null && nodes[i].cHeight < nodes[i].minCHeight) {
            nodes[i].cHeight = nodes[i].minCHeight;
        }
        var centX = nodes[i].cX + nodes[i].cWidth / 2;
        var centY = nodes[i].cY - fontsize_container + nodes[i].cHeight / 2
        nodes[i].x = centX - nodes[i].width / 2;
        nodes[i].y = centY - (nodes[i].height + fontsize_node) / 2;
        col[index] += nodes[i].cHeight + marginsize + fontsize_container;
    }
    boundRect.height = maxArr(col) + marginsize;
    canvas.height = boundRect.height;
}

function setAreaElementBound(nodes, selnode) {
    //先布局最外层区域
    var colCount, colWidth, boundRect, minWidth, minHeight;
    boundRect = { "x": selnode.cX, "y": selnode.cY, "width": selnode.cWidth, "height": selnode.cHeight}
    //布局当前区域（包含子区域）子区域默认2列
    colCount = 2;
    if (nodes.length == 1) {
        colCount = 1;
    }
    colWidth = selnode.cWidth / colCount;
    minWidth = nodes[0].width + marginsize + marginsize;//区域节点本身的宽度加上左右间距
    if (colWidth <= minWidth) {
        colCount -= 1;
        colWidth = selnode.cWidth / colCount;
    }

    var col = [];//记录各列高度
    //初始化记录各列的高度
    for (var i = 0; i < colCount; i++) {
        col[i] = 0;
    }

    for (var i = 0; i < nodes.length; i++) {
        nodes[i].minCWidth = minWidth;

        nodes[i].cWidth = colWidth - 2 * marginsize; //当前区域的宽度
        nodes[i].cHeight = Math.ceil(nodes[i].area / nodes[i].cWidth); //当前区域的通过面积计算得出的高度
        //是否包含子区域节点
        var childAreaNode = allLayNodes.filter(function (item) {
            return item.type == "container" && item.pid == nodes[i].id;
        });
        //是否包含终端节点
        var childNode = allLayNodes.filter(function (item) {
            return item.type == "node" && item.pid == nodes[i].id;
        });

        var index = getMinColIndex(col);
        if (nodes[i].minCWidth != null && nodes[i].cWidth < nodes[i].minCWidth) {
            nodes[i].cWidth = nodes[i].minCWidth;
        }

        nodes[i].cX = boundRect.x + (index * colWidth + marginsize);//当前区域X坐标
        nodes[i].cY = boundRect.y + (col[index] + marginsize + fontsize_container); //当前区域Y坐标
        //布局当前区域（包含子区域）
        if (childAreaNode.length > 0) {
            colCount = 2;
            //布局子区域后，nodes[i].cHeight会重新计算
            setAreaElementBound(childAreaNode, nodes[i]);
        }
        //布局只包含终端的区域
        else if (childNode.length > 0) {
            colCount = Math.floor((nodes[i].cWidth - marginsize) / (childNode[0].width + marginsize));
            setNodeElementBound(childNode, nodes[i]);
        }
        nodes[i].minCHeight = getContainerMinHeight(nodes[i], colCount);//默认情况下，当前区域分2列用于排列子节点
        if (nodes[i].minCHeight != null && nodes[i].cHeight < nodes[i].minCHeight) {
            nodes[i].cHeight = nodes[i].minCHeight;
        }

        var centX = nodes[i].cX + nodes[i].cWidth / 2;
        var centY = nodes[i].cY - fontsize_container + nodes[i].cHeight / 2
        nodes[i].x = centX - nodes[i].width / 2;
        nodes[i].y = centY - (nodes[i].height + fontsize_node) / 2;
        col[index] += nodes[i].cHeight + marginsize + fontsize_container;
    }
    boundRect.height = maxArr(col) + marginsize;
    selnode.cHeight = boundRect.height;
}

function setNodeElementBound(childNode, selnode) {
    colCount = Math.floor((selnode.cWidth - marginsize) / (childNode[0].width + marginsize));
    colWidth = selnode.cWidth / colCount;
    boundRect = { "x": selnode.cX, "y": selnode.cY, "width": selnode.cWidth, "height": selnode.cHeight };
    var waterObj = new Waterfall({
        fontsize_container: fontsize_container,
        fontsize_node: fontsize_node,
        marginsize: marginsize,
        boundRect: boundRect,
        colCount: colCount,
        colWidth: colWidth,
        nodes: childNode
    });
    selnode.cHeight = waterObj.boundRect.height;
}


//获取当前区域节点展开后最小高度@node 区域节点 @colCount 当前区域分多少列
function getContainerMinHeight(node, colCount) {
    var height = 0;

    var nodes = allLayNodes.filter(function (item) {
        return item.pid == node.id;
    })
    if (nodes.length ==1) {
        colCount = 1;
    }
    else if (nodes.length == 0) {
        return node.height;
    }

    var rowCount = Math.ceil(nodes.length / colCount);
    var subNodeHeight = nodes[0].height;//子节点的高度，同一级子节点的高度都相同
    var fontsize = 0;
    if(nodes[0].type=="node"){
        fontsize = fontsize_node;
    }
    else if(nodes[0].type=="container"){
        fontsize = fontsize_container;
    }

    for (var i = 0; i < rowCount; i++) {
        height += subNodeHeight + marginsize+fontsize;
    }
    height += marginsize;//上边距
    //区域节点展开后的最小高度小于 区域节点本身的高度时
    if (height < (node.height + fontsize + 2 * marginsize)) {
        height = node.height + fontsize + 2 * marginsize;
    }
    return height;
}



//获取根区域节点完全展开后（包括内部的子区域）的面积，在递归的同时计算子区域的面积（只考虑了区域包含子区域，没有考虑区域即包含子区域又包含终端节点）
function getContainerArea(id) {
    var area = 0;
    var fiterArr = allLayNodes.filter(function (item) {
        return item.pid == id;
    });
    for (var i = 0; i < fiterArr.length; i++) {
        if (fiterArr[i].type == "node") {
            area += (fiterArr[i].width + marginsize) * (fiterArr[i].height + marginsize + fontsize_node);
        }
        else if (fiterArr[i].type == "container") {
            var subArea = getContainerArea(fiterArr[i].id);
            fiterArr[i].area = subArea;
            //当前子区域所占面积，包括右边外间距和底边外间距+容器字体的高度
            area +=subArea+ Math.ceil(Math.sqrt(subArea)) * marginsize + Math.ceil(Math.sqrt(subArea)) * (fontsize_container + marginsize) + marginsize * (fontsize_container + marginsize);
        }
    }
    //当前区域加上未计算在内的，左内边距和上内边距
    area += Math.ceil(Math.sqrt(area)) * marginsize + Math.ceil(Math.sqrt(area)) * marginsize + marginsize * marginsize;
    return area
}


var link;
//构造攻击路径
function getAttackProcess() {
    //清空场景中所有线条
    var allElemsList = scene.getDisplayedElements();
    var fiterElems = allElemsList.filter(function (item) {
        return item.elementType == "link";
    })
    $.each(fiterElems, function (i, elem) {
        scene.remove(elem);
    });
    if (arrylinks != null && arrylinks.length > 0) {
        link = spriteLink({
            arr: arrylinks
        })
        fps = 1;
        interval = 1000 / fps;
        linkPlay();
    }
}

//循环执行线条的展示
function linkPlay() {
    var id = window.requestAnimationFrame(linkPlay);
    now = Date.now();
    delta = now - then;
    if (delta > interval) {
        // 这里不能简单then=now，否则还会出现上边简单做法的细微时间差问题。例如fps=10，每帧100ms，而现在每16ms（60fps）执行一次draw。16*7=112>100，需要7次才实际绘制一次。这个情况下，实际10帧需要112*10=1120ms>1000ms才绘制完成。
        then = now - (delta % interval);
        if (link.index > link.arr.length - 1) {
            window.cancelAnimationFrame(id);
        }
        else {
            link.render();
        }
        link.update();
    }

}

//线条效果方法
function spriteLink(options) {
    var that = {};
    that.arr = options.arr;
    that.index = 0;//当前索引号
    that.update = function () {
        that.index += 1;
    }
    that.render = function () {
        if (that.index < that.arr.length) {
            var crtlink = that.arr[that.index];
            if ((crtlink.fromip == null || crtlink.fromip == "")
                && (crtlink.toip == null || crtlink.toip == "")) {
                return false;
            }
            var nodeA = getNodeFromSceneByIp(crtlink.fromip);
            var nodeZ = getNodeFromSceneByIp(crtlink.toip);
            var linkobj;
            if (nodeA != null && nodeZ == null) {
                linkobj = newCurveLink(nodeA, outNetNode, "", '255,0,0', '5');
                linkobj.attacktitle = crtlink.attacktitle;
                linkobj.id = crtlink.fromip + "-" + crtlink.toip; //攻击过程的key中间用-标识
                scene.add(linkobj);
            }
            else if (nodeA == null && nodeZ != null) {
                linkobj = newCurveLink(outNetNode, nodeZ, "", '255,0,0', '5');
                linkobj.attacktitle = crtlink.attacktitle;
                linkobj.id = crtlink.fromip + "-" + crtlink.toip; //攻击过程的key中间用-标识
                scene.add(linkobj);
                if (nodeZ.type == "node") {
                    if (nodeZ.isAnimate == null) {
                        createAnimateNode(linkobj);
                    }
                    else {
                        linkobj.nodeIndex = 1;
                    }
                }
            }
            else if (nodeA != null && nodeZ != null) {
                linkobj = newCurveLink(nodeA, nodeZ, "", '255,0,0', '5');
                linkobj.attacktitle = crtlink.attacktitle;
                linkobj.id = crtlink.fromip + "-" + crtlink.toip; //攻击过程的key中间用-标识
                scene.add(linkobj);
                if (nodeZ.type == "node" && nodeZ.isAnimate==null) {
                    createAnimateNode(linkobj);
                }

            }
            linkobj.alpha = 0;
            JTopo.Animate.stepByStep(linkobj, {
                    alpha: 1,
                    stop: function () {
                        //终止条件
                        return linkobj.alpha == 1;
                    },

                },
                100, false).start();

            linkobj.addEventListener("mouseover", linkmouseoverhander, false);
            linkobj.addEventListener("mouseout", linkmouseouthander, false);
            //linkobj.addEventListener("click", linkclickhander,false);

        }

    };


    return that;
}

//将原场景中的节点替换成动态效果节点
function createAnimateNode(linkobj) {
    var nodeZ = linkobj.nodeZ;
    var nodeA = linkobj.nodeA;
    var node = new JTopo.AnimateNode(nodeZ.img2, 1, 3, 1000, 1);
    node.id = nodeZ.id;
    node.setSize(45, 30);
    node.font = nodeZ.font;
    node.fontColor = nodeZ.fontColor;
    node.text = nodeZ.text;
    node.textOffsetY = nodeZ.textOffsetY;
    node.x = nodeZ.x;
    node.y = nodeZ.y;
    node.ip = nodeZ.ip;
    node.pid = nodeZ.pid;
    node.type = nodeZ.type;
    node.img1 = nodeZ.img1;
    node.img2 = nodeZ.img2;
    node.isAnimate = true;
    node.repeatPlay = true;
    node.play();

    scene.add(node);
    allnodes.push(node);
    //获取原节点所在容器
    var container = getContainerById(nodeZ.pid);
    if (container != null) {
        container.add(node);
    }

    var allElemsList = scene.getDisplayedElements();
    var fiterElems = allElemsList.filter(function (item) {
        return item.elementType == "link";
    })
    $.each(fiterElems, function (i, elem) {
        if (elem.nodeA == nodeZ) {
            elem.nodeA = node;
            scene.add(elem);
        }
        else if (elem.nodeZ == nodeZ) {
            elem.nodeZ = node;
            scene.add(elem);
        }

    });


    scene.remove(nodeZ);
    var condArr = [];
    condArr.push(["id", nodeZ.id]);
    condArr.push(["type", nodeZ.type]);
    condArr.push(["pid", nodeZ.pid]);
    allnodes.splice(getItemIndexByFlieds(allnodes, condArr), 1);
    if (container != null) {
        container.remove(nodeZ);
    }



    //linkobj.nodeZ = node;
    //scene.add(linkobj);

    node.addEventListener("mouseover", nodemouseoverhander, false);
    node.addEventListener("mouseout", nodemouseouthander, false);
    node.addEventListener("click", nodeclickhander, false);

}


//init
$(function () {

    loadCanvasData();
});