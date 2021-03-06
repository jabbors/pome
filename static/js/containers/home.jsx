import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Chart from '../components/charts';
import * as Actions from '../actions/index';
import {formatPercent, formatBytes} from '../utils';
import filesize from 'filesize';


class Home extends Component {
    static propTypes = {
        actions: PropTypes.object,
        pushState: PropTypes.func.isRequired,
        state: PropTypes.object
    }
    constructor(props) {
        super(props);
    }
    render() {
        // This should be done when we reduce the state it will avoid doing it any state
        // change
        const {state} = this.props;
        const indexBloat = state.app.metrics.top_index_bloat.map((v)=> v.bloat_ratio);
        const xIndexBloat = state.app.metrics.top_index_bloat.map((v)=> v.timestamp);
        const xIndexMeta=  state.app.metrics.top_index_bloat.map(
          (v)=> "Schema: " + v.table_schema + ", Table: " + v.table_name + ", Index: " + v.index_name
        );
        const indexWaste = state.app.metrics.total_index_bloat_bytes.map((v)=> v.bloat_bytes);
        const xIndexWaste = state.app.metrics.total_index_bloat_bytes.map((v)=> v.timestamp);
        const tableBloat = state.app.metrics.top_table_bloat.map((v)=> v.bloat_ratio);
        const xTableBloat = state.app.metrics.top_table_bloat.map((v)=> v.timestamp);
        const xTableMeta=  state.app.metrics.top_index_bloat.map(
          (v)=> "Schema: " + v.table_schema + ", Table: " + v.table_name 
        );
        const tableWaste = state.app.metrics.total_table_bloat_bytes.map((v)=> v.bloat_bytes);
        const xTableWaste = state.app.metrics.total_table_bloat_bytes.map((v)=> v.timestamp);
        const databaseSize = state.app.metrics.database_size.map((v)=> v.total_size);
        const xSize = state.app.metrics.database_size.map((v)=> v.timestamp);
        const tablesSize = state.app.metrics.database_size.map((v)=> v.table_size);
        const indexesSize = state.app.metrics.database_size.map((v)=> v.index_size);
        const indexesRatio = state.app.metrics.database_size.map((v)=> v.index_ratio);
        const numOfConnection = state.app.metrics.number_of_connection.map((v)=> v.count);
        const xNumOfConnection = state.app.metrics.number_of_connection.map((v)=> v.timestamp);
        return (
            <div>
                <Chart data={numOfConnection} x={xNumOfConnection} yFormatter={(x)=>{return x}} title={"Number of connections"}/>
                <hr/>
                <Chart data={indexBloat} x={xIndexBloat} meta={xIndexMeta} yMax={100} yFormatter={formatPercent} title={"Most bloated index"}/>
                <hr/>
                <Chart data={indexWaste} x={xIndexWaste} yFormatter={filesize} title={"Total wasted bytes for indexes"} />
                <hr/>
                <Chart data={tableBloat} x={xTableBloat} meta={xTableMeta} yMax={100} yFormatter={formatPercent} title={"Most bloated table"}/>
                <hr/>
                <Chart data={tableWaste} x={xTableWaste} yFormatter={filesize} title={"Total wasted bytes for tables"}/>
                <hr/>
                <Chart data={databaseSize} x={xSize} yFormatter={filesize} title={"Database Size"}/>
                <hr/>
                <Chart data={tablesSize} x={xSize} yFormatter={filesize} title={"Table Size"}/>
                <hr/>
                <Chart data={indexesSize} x={xSize} yFormatter={filesize} title={"Indexes Size"}/>
                <hr/>
                <Chart data={indexesRatio} x={xSize} yMax={100} yFormatter={formatPercent} title={"Indexes Size Ratio"}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {state};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
