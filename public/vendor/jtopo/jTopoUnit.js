//根据id获取场景中的容器
function getContainerById(id) {
    var containerObj = null;
    for (var i = 0; i < scene.childs.length; i++) {
        if (scene.childs[i].elementType == "container" && scene.childs[i].id == id) {
            containerObj = scene.childs[i];
            break;
        }
    }
    return containerObj;
}



//通过ip地址查找场景中的对象，如果此终端不存在，则一直查找它的父级区域节点，直到找到最接近的上级父节点为止(现最大层级3层，有待扩展)
function getNodeFromSceneByIp(ip) {
    var node = null;
    var index = getItemIndex(allnodes, "ip", ip);
    if (index == -1) {
        var assetsItem = assetsList[getItemIndex(assetsList, "ip", ip)];
        if (assetsItem == null) {
            return null;
        }
        var areacode = assetsItem.areacode;
        var condArr = [];
        condArr.push(["id", areacode]);
        condArr.push(["type", "container"]);
        index = getItemIndexByFlieds(allnodes, condArr);
        if (index == -1) {
            var areaItem = areaList[getItemIndex(areaList, "id", areacode)];
            condArr = [];
            condArr.push(["id", areaItem.pid]);
            condArr.push(["type", "container"]);
            index = getItemIndexByFlieds(allnodes, condArr);
            if (index > -1) {
                node = allnodes[index];
            }
        }
        else {
            node = allnodes[index];
        }
    }
    else {
        node = allnodes[index];
    }
    return node;
}


//判断当前元素是否已经存在场景中
function isElementExist(elem) {
    var flag = false;
    var allElemsList = scene.getDisplayedElements();
    var fiterElems = allElemsList.filter(function (item) {
        return item.elementType == elem.elementType && item.id == elem.id;
    })
    if (fiterElems != null && fiterElems.length > 0) {
        flag = true;
    }
    return flag;
}
