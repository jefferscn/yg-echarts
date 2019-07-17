图表的使用方法
==================================

依赖
----------------------------------

    使用Echarts进行渲染，很多配置完全照抄的

支持范围
----------------------------------

* 不支持系统自带的Chart控件
* 当前只支持列表和表格作为图表的渲染控件
* 暂时只支持line,bar,pie三种图表

配置项
----------------------------------

* tooltip

    选中图表的时候显示的内容，如果不配置这个属性则不显示，如果需要显示默认的的数据，则需要配置一个空的tooltip,具体内容，请参考echarts
    ```javascript
        tooltip: {}
    ```

* legend

    数据分类图标的显示，内容参考echarts

* inverseAxis

    数据行列倒转，这里的行列不是显示时候的坐标，而是定义的数据的行列转换，这个在需要将行数据作为列数据来处理的时候使用，系统默认的是以列作为系列数据来源的。

* title

    图标的标题，内容参考echarts

* xAxis

    x坐标,内容参考echarts

* yAxis

    y坐标,内容参考echarts

* slice

    数据切片，必须属性，用于描述哪些数据列需要被用于图表的渲染，内容是列的key的数组。这里需要注意如果需要数据分类列则必须放在第一的位置。

* series

    数据系列,是一个数组，每个项目都描述了一组数据，大部分的结构和echarts的series是一致的，只是在这里提供了另外一个属性用于与yigo控件数据进行关联

    * dataAxis

        数据所在的坐标轴，不写默认为y，

    * dataColumn

        1. 字符串

            指定一个数据列(这里需要和inverseAxis联合使用，如果需要取行数据，作为系列的数据源则inserseAxis需要指定为true,并且这里字符串的内容必须是数据第一列中的值)

        2. 字符串数组

            会生成多个系列，数组中的每个项目都会独立生成一个数据系列，规则同1

        3. all

            会将当前所有的数据列(inverseAxis=true的时候是全部数据行),都生成数据系列

样例
------------------------------------------------

* pie 

```javascript
        "grid0": {
            "control": "GridChart",
            "title": {
                "text": "aaa"
            },
            "legend": {

            },
            "style": {
                "height": 500
            },
            "slice": [
                "FormClassName",
                "Amount1",
                "Amount2",
                "Amount3",
                "Amount4",
                "Amount5",
                "Amount6",
                "Amount7",
                "Amount8",
                "Amount9",
                "Amount10",
                "Amount11",
                "Amount12"
            ],
            "series": [
                {
                    "type": "pie",
                    "dataColumn": "Amount6"
                }
            ]
        }
```

* bar

```javascript
        "grid0": {
            "control": "GridChart",
            "title": {
                "text": "aaa"
            },
            "legend": {

            },
            "xAxis": {
                "type": "category"
            },
            "yAxis": {
                "type": "value"
            },
            "style": {
                "height": 500
            },
            "inverseAxis": true,
            "slice": [
                "FormClassName",
                "Amount1",
                "Amount2",
                "Amount3",
                "Amount4",
                "Amount5",
                "Amount6",
                "Amount7",
                "Amount8",
                "Amount9",
                "Amount10",
                "Amount11",
                "Amount12"
            ],
            "series": [
                {
                    "type": "bar",
                    "dataColumn": "all"
                }
            ]
        }
```
