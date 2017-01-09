// Application
import React, { Component } from 'react';
import * as d3 from 'd3';
import PlotComponent from './PlotComponent'
import Controls from './Controls';
import './style.css';

class App extends Component{
    constructor() {
        super();

        this.state = {
            data:[],
            xVar:'DaysOnMarket',
            groupVar:'State',
            yVar:'YoY',
            idVar:'City',
            filterNum: '500',
            urlData:'data/MarketHealthIndex_City.csv'
        };

        this.changeX = this.changeX.bind(this);
        this.changeFilter = this.changeFilter.bind(this);
        this.changeY = this.changeY.bind(this);
    }
    componentWillMount() {
        this.loadRawData();
    }
    loadRawData() {
        d3.csv(this.state.urlData)
            .row((d) => {

                if (!d['SizeRank']){
                    return null;
                }

                return {x : d[this.state.xVar],
                        y : d[this.state.yVar],
                        id: d.SizeRank};


            })
          .get((error, rows) => {
              if (error) {
                  console.error(error);
                  console.error(error.stack);
              }else{
                  this.setState({data: rows});
          } });

    }
    changeX(event, index, value) {
        this.setState({xVar:value});
        this.loadRawData();
    }

    changeY(event, index, value) {
        this.setState({yVar:value});
        this.loadRawData();

    }

    changeFilter(event, index, value) {
        this.setState({filterNum:value});
    }
	render() {
        // Prep data
        // let chartData = this.state.data.map((d) => {
        //     let selected = d[this.state.idVar].toLowerCase().match(this.state.search) !== null;
        //     return {
        //         x:d[this.state.xVar],
        //         y:d[this.state.yVar],
        //         group:d[this.state.groupVar],
        //         id:d[this.state.idVar],
        //         selected:selected
        //     }
        // });

        let chartData = this.state.data.filter((d) => d.id < +this.state.filterNum);

        // nest data
        // let nestedData = d3.nest()
        //     .key((d) => d.State)
        //     .rollup(function (s) { return {
        //         x: d3.mean(s, (d) => d.Delinquency),
        //         y: d3.mean(s, (d) => d.DaysOnMarket)
        //      }; })
        //     .entries(this.state.data);
        //
        // this.setState({data:nestedData});

        if (!this.state.data.length) {
            return (<h1> Loading raw data from www.zillow.com/research/data/ </h1>);
        }

        let params = {
                bins: 20,
                width: 500,
                height: 500,
                leftMargin: 83,
                topMargin: 10,
                bottomMargin: 25,
            },
            fullWidth = 700,
            fullHeight = 700;


        // Return ScatterPlot element
		return (

            <div className="App">
                <h1 className="header"> Zillow Housing Research Data by City </h1>
                <Controls
                    changeX={this.changeX}
                    changeY={this.changeY}
                    changeFilter={this.changeFilter}
                    xVar={this.state.xVar}
                    yVar={this.state.yVar}
                    filterNum={this.state.filterNum}
                />
                    <svg width={fullWidth} height={fullHeight}>
                        <PlotComponent {...params} data={chartData}/>
                    </svg>
            </div>
		);
	}
}

export default App;
