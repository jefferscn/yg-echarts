import React, { PureComponent } from 'react';
import { ListWrap } from 'yes-intf';
import YIGOChart from './YIGOChart';
/**
 * 
 */
class ListChart extends YIGOChart{
    getColumnLabel(col) {
        return this.findColumn(col).get('caption');
    }
    buildDataset(props) {
        const { controlState, slice } = props;
        const source = [];
        const data = controlState.getIn(['data']);
        const dimensions = [];
        const cols = slice.map((col)=> {
            const colData = this.findColumn(col);
            dimensions.push(this.getColumnLabel(col));
            return colData.get('columnKey');
        });
        for (let rowIndex = 0; rowIndex < data.size; rowIndex++) {
            const row = [];
            const rowData = data.get(rowIndex);
            for (const col of cols) {
                row.push(rowData.get(col));
            }
            source.push(row);
        }
        return {
            dimensions,
            source,
        };
    }
    findColumn = (col) => {
        const cols = this.props.controlState.get('columnInfo');
        const data = cols.find((item) => col === item.get('key'));
        return data;
    }
}

export default ListWrap(ListChart);
