var echarts = require('echarts');
var $ = require('jquery');
require('echarts/config');
require('echarts/chart/tree');
var tokenizer = require('./tokenizer');
var parser = require('./parser');
function draw() {
    var myChart = echarts.init(document.getElementById('main'));
    option = {
        title: {
            text: 'DOM Drawer'
        },
        toolbox: {
            show: true,
            feature: {
                restore: {
                    show: true
                },
                saveAsImage: {
                    show: true
                }
            }
        },
        series: [{
            name: '树图',
            type: 'tree',
            orient: 'horizontal', // vertical horizontal
            rootLocation: {
                x: 'left',
                y: 'center'
            }, // 根节点位置  {x: 100, y: 'center'}
            nodePadding: 8,
            layerPadding: 100,
            hoverable: false,
            roam: true,
            symbolSize: 6,
            itemStyle: {
                normal: {
                    color: '#4883b4',
                    label: {
                        show: true,
                        position: 'right',
                        formatter: "{b}",
                        textStyle: {
                            color: '#000',
                            fontSize: 5
                        }
                    },
                    lineStyle: {
                        color: '#ccc',
                        type: 'curve' // 'curve'|'broken'|'solid'|'dotted'|'dashed'
                    },
                    areaStyle:{
                        color:'#000'
                    }
                },
                emphasis: {
                    color: '#4883b4',
                    label: {
                        show: false
                    },
                    borderWidth: 0
                }
            },

            data: [parser(tokenizer($('#html').val()))]
        }]
    };
    myChart.setOption(option);
}


$('#html').keyup(function(){
    draw();
})

var tmp = '<!DOCTYPE html>\n\
<html>\n\
<head>\n\
    <title>DOM-Drawer</title>\n\
    <link rel="stylesheet" type="text/css" href="style.css">\n\
    <script type="text/javascript" herf="index.js"></script>\n\
</head>\n\
<body>\n\
    <!--这是注释-->\n\
    <p>Hello,World!</p>\n\
</body>\n\
</html>';

$('#html').val(tmp);
draw();