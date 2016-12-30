<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Echarts test</title>
</head>
<body>
    <div id="main" style="width: 2000px;height:500px;"></div>

    <script src="http://cdn.bootcss.com/echarts/3.3.2/echarts.common.min.js"></script>
    <script>
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        var option = {
            tooltip: {
                trigger: 'axis'
            },
            grid:{
                show: false
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: function(){
                        var now = new Date();
                        var res = [];
                        var len = 7;
                        while (len--) {
                            res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                            now = new Date(now - 5000);
                        }
                        return res;
                    }
                }
            ],
            yAxis: [
                {
                    name: 'M',
                    type: 'value',
                }
            ],
            series: [
                {
                    name: '下行流量',
                    type: 'line',
                    tooltip: {
                        trigger: 'axis'
                        // formatter: '{a} <br/>{b}日: {c}元'
                    },
                    smooth: true,
//                    symbol: 'circle',
                    symbolSize: 10,
                    itemStyle: {
                        normal: {
                            color: 'rgba(2, 197, 233, 0.2)',
                            lineStyle: {
                                color: 'rgba(58, 133, 159, 0.5)',
                                width:3,
                            },
                            areaStyle: {
                                color: 'rgba(227, 239, 236, 1)'
                            }
                        }
                    },
                    data: [10, 12, 21, 10, 60, 80, 71]
                },
                {
                    name: '上行流量',
                    type: 'line',
                    tooltip: {
                        trigger: 'axis'
                        // formatter: '{a} <br/>{b}日: {c}元'
                    },
                    // yAxisIndex: 1,
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 10,
                    itemStyle: {
                        normal: {
                            color: 'rgba(2, 197, 233, 0.2)',
                            lineStyle: {
                                color: 'rgba(77, 169, 68, 0.5)',
                                width:3,
                            },
                            areaStyle: {
                                color: 'rgba(246, 251, 245, 0.2)'
                            }
                        }
                    },
                    data: [30, 32, 61, 24, 70, 90, 100]
                }
            ]
        };
        myChart.setOption(option);
    </script>
</body>
</html>
