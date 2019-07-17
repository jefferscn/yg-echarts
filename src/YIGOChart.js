import React, { PureComponent } from 'react';
import ReactEcharts from 'echarts-for-react';
/**
 * 
 */
export default class YIGOChart extends PureComponent {
    getColumnLabel(col) {
        // return colData.get('caption') || colData.get('label')
    }
    buildDataset(props) {
        // const { controlState, slice } = props;
        // const source = [];
        // const data = controlState.getIn(['dataModel', 'data']);
        // const dimensions = [];
        // const cols = slice.map((col) => {
        //     const colData = this.findColumn(col);
        //     const colIndex = this.findColumnIndex(col);
        //     dimensions.push(this.getColumnLabel(colData));
        //     return colIndex;
        // });
        // source.push(dimensions);
        // for (let rowIndex = 0; rowIndex < data.size; rowIndex++) {
        //     const row = [];
        //     const rowData = data.get(rowIndex);
        //     for (const col of cols) {
        //         const dt = rowData.getIn(['data', col, 0]);
        //         if (isNaN(dt)) {
        //             row.push(dt);
        //         }
        //         else {
        //             row.push(Number.parseFloat(dt));
        //         }
        //     }
        //     source.push(row);
        // }
        // return {
        //     source,
        // };
    }
    findColumn = (col) => {
        // const cols = this.props.controlState.getIn(['dataModel', 'colModel', 'columns']);
        // const data = cols.find((item) => col === item.get('key'));
        // return data;
    }
    buildAxis = (axis) => {
        return axis;
    }
    buildSerie = (options, serie, inverseAxis = false) => {
        const { dataColumn, dimensionColumn, dataAxis, ...others } = serie;
        let dataColumns = [];
        if (dataColumn === 'all') {//所有数据列，这种情况下需要返回一个数组的系列
            if (inverseAxis) {
                for (var i = 1; i < options.dataset.source.length; i++) {
                    dataColumns.push(options.dataset.source[i][0]);
                }
            } else {
                for (var i = 1; i < options.dataset.source[0].length; i++) {
                    dataColumns.push(options.dataset.source[0][i]);
                }
            }
        } else {
            if (dataColumn.forEach) {//数组
                if (inverseAxis) {
                    dataColumns = dataColumn;
                } else {
                    dataColumns = dataColumn.map((dc) => this.getColumnLabel(dc));
                }
            } else {
                if (inverseAxis) {
                    dataColumns = [dataColumn];
                } else {
                    dataColumns = [this.getColumnLabel(dataColumn)];
                }
            }
        }
        // const dataCol = this.getColumnLabel(this.findColumn(dataColumn));
        // const dimCol = this.getColumnLabel(this.findColumn(dimensionColumn));
        const all = [];
        dataColumns.forEach((ddc) => {
            const result = { ...others };
            result.seriesLayoutBy = inverseAxis ? 'row' : 'column';
            switch (serie.type) {
                case 'pie':
                    result.encode = {
                        value: ddc,
                        itemName: 0,
                    };
                    break;
                case 'bar':
                case 'line':
                    if (!(dataAxis==='x')) {
                        result.encode = {
                            seriesName: ddc,
                            y: ddc,
                            x: 0,
                        }
                    } else {
                        result.encode = {
                            seriesName: ddc,
                            x: ddc,
                            y: 0,
                        }
                    }
                    break;
            }
            all.push(result);
        });
        return all;
    }
    buildOptions = (props) => {
        const { title, xAxis, yAxis, legend, series, inverseAxis } = props;
        const options = {};
        //title
        options.title = title;
        //dataset
        options.dataset = this.buildDataset(props);
        if (legend) {
            options.legend = {
                ...legend,
            }
        }
        //xAxis
        if (xAxis) {
            if (xAxis.forEach) {///Array
                options.xAxis = [];
                xAxis.forEach((axis) => {
                    options.xAxis.push(this.buildAxis(axis));
                });
            } else {
                options.xAxis = this.buildAxis(xAxis)
            }
        }
        //yAxis
        if (yAxis) {
            if (yAxis.forEach) {///Array
                options.yAxis = [];
                yAxis.forEach((axis) => {
                    options.yAxis.push(this.buildAxis(axis));
                });
            } else {
                options.yAxis = this.buildAxis(yAxis);
            }
        }
        // if (inverseAxis) {
        //     const x = options.xAxis;
        //     options.xAxis = options.yAxis;
        //     options.yAxis = x;
        // }
        //series
        options.series = [];
        series.forEach((serie) => {
            const d = this.buildSerie(options, serie, inverseAxis);
            if (d.forEach) {
                options.series = [...options.series, ...d];
            } else {
                options.series.push(d);
            }
        });
        console.log(options);
        return options;
    }
    onClick = (event) => {
        const dataIndex = event.dataIndex;
        this.props.onClick(dataIndex);
    }
    events = {
        click: this.onClick
    }
    render() {
        return (
            <ReactEcharts
                option={this.buildOptions(this.props)}
                style={this.props.style}
                onEvents={this.events}
            />
        )
    }
}
