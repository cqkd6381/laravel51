//初始化node,x,y代表横纵坐标,后期写成可配置，text:节点名称，
//alarm：不为null则显示内容，msg: 为存alarm值而自定义的属性
function createnode(id, pid, ip, text, img1, img2, type, width, height) {
    var node;
    //if (status == "1") {
    //    // 1行4列，1000毫秒播放一轮，行偏移量
    //    node = new JTopo.AnimateNode(img2, 1, 3, 1000, 1);
    //    node.id = id;
    //    node.font = "10px Consolas";
    //    node.fontColor = "50, 50, 50";
    //    node.setSize(width, height);
    //    if (text != null)
    //        node.text = text;
    //    node.pid = pid;
    //    node.ip = ip;
    //    node.type = type;
    //    node.img1=
    //    node.repeatPlay = true;
    //    node.play();
    //}
    //else {

    //    //node.alarm = alarm;
    //    //node.alarm = "提示信息";
    //    //node.alarm.fontcolor = "73,167,214";
    //}

    node = new JTopo.Node();
    node.id = id;
    node.setImage(img1, true);
    node.setSize(width, height);
    node.font = "10px Consolas";
    node.fontColor = "50, 50, 50";
    if (text != null) {
        node.text = text;
        node.textOffsetY = 2;
    }
    node.ip = ip;
    node.pid = pid;
    node.type = type;
    node.img1 = img1;
    node.img2 = img2;
    return node;
}