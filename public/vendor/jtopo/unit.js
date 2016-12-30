(function () {
    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
    // requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
    // MIT license

    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
                                   || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
}());


//从数组筛选出指定父节点下的所有子节点
function getCurSubNodes(arrfilter, fieldname, ffieldname, ffieldvalue, arrpush) {
    for (var i = 0; i < arrfilter.length; i++) {
        if (arrfilter[i][ffieldname] == ffieldvalue) {
            arrpush.push(arrfilter[i]);
            getCurSubNodes(arrfilter, arrfilter[i][fieldname], arrpush);
        }
    }
}



//根据唯一标识字段从数组中获取某个成员
function getItemIndex(arr, flied, value) {
    var index = -1;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i][flied] == value) {
            index = i;
            break;
        }
    }
    return index;
}

//根据多个字段条件从数组中获取某个元素
/*arr:待筛选的数据源; fliedvalues:多字段条件组合 Object([[flied1,value1],[flied2,value2]])*/
function getItemIndexByFlieds(arr, fliedvalues) {
    var index = -1;
    for (var i = 0; i < arr.length; i++) {
        var conditionStr = "";
        if (fliedvalues != null && fliedvalues.length > 0) {
            for (var j = 0; j < fliedvalues.length; j++) {
                conditionStr += "arr[" + i + "]." + fliedvalues[j][0] + "=='" + fliedvalues[j][1] + "'&&"
            }
            if (conditionStr.length > 0) {
                conditionStr = conditionStr.substr(0, conditionStr.length - 2);
            }
        }
        if (eval(conditionStr)) {
            index = i;
            break;
        }
    }
    return index;
}

//获取当前鼠标坐标(相对文档)
function getMousePos(event) {
    var e = event || window.event;
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    var x = e.pageX || e.clientX + scrollX;
    var y = e.pageY || e.clientY + scrollY;
    //alert('x: ' + x + '\ny: ' + y);
    return { 'x': x, 'y': y };
}

//生成某个范围内的随机数
function selectfrom(lowValue, highValue) {
    var choice = highValue - lowValue + 1;
    return Math.floor(Math.random() * choice + lowValue);
}

//获取数组中最大值
function maxArr(arr) {
    var len = arr.length, temp = arr[0];
    for (var ii = 1; ii < len; ii++) {
        if (temp < arr[ii]) {
            temp = arr[ii];
        }
    }
    return temp;
}

//获取数组中最小值的索引号
function getMinColIndex(arr) {
    var ca = arr, cl = ca.length, temp = ca[0], minc = 0;
    for (var ci = 0; ci < cl; ci++) {
        if (temp > ca[ci]) {
            temp = ca[ci];
            minc = ci;
        }
    }
    return minc;
}