function Waterfall(param) {
    this.fontsize_container = param.fontsize_container;//区域标题字体大小,加上y轴偏移量
    this.fontsize_node = param.fontsize_node; //节点字体大小像素,加上y轴偏移量
    this.marginsize = param.marginsize; //元素之间的间距
    this.boundRect = param.boundRect;//当前画布边界参数{ "x": 0, "y": 0, "width": "0", "height": "0"},width根据列数固定，height可自适应增加
    this.colCount = param.colCount;
    this.colWidth = param.colWidth;
    this.nodes = param.nodes;
    this.init();
}

Waterfall.prototype = {
    //获取数组中最大值
    maxArr: function (arr) {
        var len = arr.length, temp = arr[0];
        for (var ii = 1; ii < len; ii++) {
            if (temp < arr[ii]) {
                temp = arr[ii];
            }
        }
        return temp;
    },

    //获取数组中最小值的索引号
    getMinColIndex: function (arr) {
        var ca = arr, cl = ca.length, temp = ca[0], minc = 0;
        for (var ci = 0; ci < cl; ci++) {
            if (temp > ca[ci]) {
                temp = ca[ci];
                minc = ci;
            }
        }
        return minc;
    },
    init: function () {
        var _this = this;
        var col = [];//记录各列高度
        var nodes = _this.nodes, len = nodes.length;
        //初始化记录各列的高度
        for (var i = 0; i < _this.colCount; i++) {
            col[i] = 0;
        }

        for (var i = 0; i < len; i++) {
            var  index= _this.getMinColIndex(col);  
            if (nodes[i].type == "node") {
                nodes[i].x = _this.boundRect.x + (index * _this.colWidth + _this.marginsize);
                nodes[i].y = _this.boundRect.y + col[index] + _this.marginsize;
                col[index] += nodes[i].height + _this.marginsize + _this.fontsize_node;//终端节点的字体默认bottom_center
            }
            else if (nodes[i].type == "container") {
                nodes[i].cWidth = _this.colWidth - 2 * _this.marginsize; //当前区域的宽度
                nodes[i].cHeight = Math.ceil(nodes[i].area / nodes[i].cWidth); //当前区域的实际高度
                if (nodes[i].minCWidth != null && nodes[i].cWidth < nodes[i].minCWidth) {
                    nodes[i].cWidth = nodes[i].minCWidth;
                }
                if (nodes[i].minCHeight != null && nodes[i].cHeight < nodes[i].minCHeight) {
                    nodes[i].cHeight = nodes[i].minCHeight;
                }
                nodes[i].cX = _this.boundRect.x + (index * _this.colWidth + _this.marginsize);//当前区域X坐标
                nodes[i].cY = _this.boundRect.y + (col[index] + _this.marginsize + _this.fontsize_container); //当前区域Y坐标  
                var centX = nodes[i].cX + nodes[i].cWidth / 2;
                var centY = nodes[i].cY - _this.fontsize_container + nodes[i].cHeight / 2
                nodes[i].x = centX-nodes[i].width/2;
                nodes[i].y = centY-(nodes[i].height+ _this.fontsize_node)/2;
                col[index] += nodes[i].cHeight + _this.marginsize + _this.fontsize_container;
            }
                 

        }
        _this.boundRect.height = _this.maxArr(col) + _this.marginsize;
    }


};
