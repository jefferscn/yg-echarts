import React, { PureComponent } from 'react';
import { GridWrap } from 'yes-intf';
import YIGOChart from './YIGOChart';
/**
 * 
 */
class GridChart extends YIGOChart{
    getColumnLabel(col) {
        const colData = this.findColumn(col);
        return colData.get('caption') || colData.get('label')
    }
    buildDataset(props) {
        const { controlState, slice } = props;
        const source = [];
        const data = controlState.getIn(['dataModel', 'data']);
        const dimensions = [];
        const cols = slice.map((col) => {
            const colIndex = this.findColumnIndex(col);
            dimensions.push(this.getColumnLabel(col));
            return colIndex;
        });
        source.push(dimensions);
        for (let rowIndex = 0; rowIndex < data.size; rowIndex++) {
            const row = [];
            const rowData = data.get(rowIndex);
            for (const col of cols) {
                const dt = rowData.getIn(['data', col, 0]);
                if (isNaN(dt)) {
                    row.push(dt);
                }
                else {
                    row.push(Number.parseFloat(dt));
                }
            }
            source.push(row);
        }
        return {
            source,
        };
    }
    findColumn = (col) => {
        const cols = this.props.controlState.getIn(['dataModel', 'colModel', 'columns']);
        const data = cols.find((item) => col === item.get('key'));
        return data;
    }
    findColumnIndex = (col) => {
        const cols = this.props.controlState.getIn(['dataModel', 'colModel', 'columns']);
        const index = cols.findIndex((item) => col === item.get('key'));
        return index;
    }
}

export default GridWrap(GridChart);
