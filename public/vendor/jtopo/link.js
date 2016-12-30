//绘制连接线 nodeA：起点,f:true有折线
function linkNode(nodeA, nodeZ, f) {
    var link;
    if (f) {
        link = new JTopo.FoldLink(nodeA, nodeZ);
    } else {
        link = new JTopo.Link(nodeA, nodeZ);
    }
    link.direction = 'vertical';
    link.strokeColor = '200,203,204';
    return link;
}
//绘制连接线,会有中间节点
function hostLink(nodeA, nodeZ) {
    var link = new JTopo.FlexionalLink(nodeA, nodeZ);
    link.shadow = false;
    link.offsetGap = 44;
    return link;
}


// 简单连线
function newLink(nodeA, nodeZ, text, color, dashedPattern) {
    var link = new JTopo.Link(nodeA, nodeZ, text);
    link.lineWidth = 2; // 线宽
    link.arrowsRadius = 10; //箭头大小
    link.bundleOffset = 60; // 折线拐角处的长度
    link.bundleGap = 15; // 线条之间的间隔
    link.textOffsetY = 3; // 文本偏移量（向下3个像素）
    link.strokeColor = color;
    link.dashedPattern = dashedPattern;
    link.shadow = false;
    return link;
}

// 折线
function newFoldLink(nodeA, nodeZ, text, direction, dashedPattern) {
    var link = new JTopo.FoldLink(nodeA, nodeZ, "");
    link.direction = direction || 'horizontal';
    link.arrowsRadius = 15; //箭头大小
    link.lineWidth = 3; // 线宽
    link.bundleOffset = 60; // 折线拐角处的长度
    link.bundleGap = 10; // 线条之间的间隔
    link.textOffsetY = 3; // 文本偏移量（向下3个像素）
    link.strokeColor = JTopo.util.randomColor(); // 线条颜色随机
    link.dashedPattern = dashedPattern;
    link.shadow = false;
    return link;
}

// 二次折线
function newFlexionalLink(nodeA, nodeZ, text, direction, dashedPattern) {
    var link = new JTopo.FlexionalLink(nodeA, nodeZ, "");
    link.direction = direction || 'horizontal';
    link.arrowsRadius = 10;
    link.lineWidth = 3; // 线宽
    link.offsetGap = 35;
    link.bundleGap = 15; // 线条之间的间隔
    link.textOffsetY = 10; // 文本偏移量（向下15个像素）
    link.strokeColor = '0,250,0';
    link.dashedPattern = dashedPattern;
    link.shadow = false;
    return link;
}

// 曲线
function newCurveLink(nodeA, nodeZ, text, color, dashedPattern) {
    var link = new JTopo.CurveLink(nodeA, nodeZ, text);
    link.lineWidth = 1; // 线宽
    link.arrowsRadius = 15; //箭头大小
    link.bundleGap = 10; // 线条之间的间隔
    //link.textOffsetY = 3; // 文本偏移量（向下3个像素）
    link.strokeColor = color;
    //link.dashedPattern = dashedPattern;
    link.shadow = false;
    return link;
}