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
            filterNum: '1000',
            urlData:'data/MarketHealthIndex_City.csv',
            renderType: 'd3'
        };

        this.changeX = this.changeX.bind(this);
        this.changeFilter = this.changeFilter.bind(this);
        this.changeY = this.changeY.bind(this);
        this.changeRender = this.changeRender.bind(this);
    }
    componentWillMount() {
        this.loadRawData();
    }
    loadRawData() {
        d3.csv(this.state.urlData)
            .row((d) => {

                if (!d['SizeRank'] || !d[this.state.xVar] || !d[this.state.yVar]){
                    return null;
                }

                return {x : d[this.state.xVar],
                        y : d[this.state.yVar],
                        id: d.SizeRank,
                        name: d.CBSATitle,
                        group: d.State };


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
    changeRender(event, index, value) {
        this.setState({renderType:value});
        this.loadRawData();
    }


    changeFilter(event, index, value) {
        this.setState({filterNum:value});
    }
	render() {

        let chartData = this.state.data.filter((d) => d.id < +this.state.filterNum);

        if (!this.state.data.length) {
            return (<h1> Loading raw data from www.zillow.com/research/data/ </h1>);
        }

        let params = {
                bins: 20,
                width: 500,
                height: 500,
                leftMargin: 70,
                topMargin: 0,
                bottomMargin: 50,
                renderType: this.state.renderType,
            },
            fullWidth = 700,
            fullHeight = 700;


        // Return ScatterPlot element
		return (

            <div className="App">
                <div className="info">
                    <h1 className="header"> Zillow Housing Research Data by City </h1>
                    <p>This project is a rendering test for implementation of visualizations. The rendering of the visualization either happens using d3 or through the generation of svgs elements through react functions.
The data is from Zillow’s  ZHVI dataset. This is a investigation of the advantages/disadvantages of said render methods.
No transitions are included in the react render which makes this a implementation experiment and not a performance test. </p>
<a href="https://github.com/caHaber/D3vsReactRenderZillow">See code here</a>
                </div>
                <Controls
                    changeX={this.changeX}
                    changeY={this.changeY}
                    changeFilter={this.changeFilter}
                    changeRender={this.changeRender}
                    xVar={this.state.xVar}
                    yVar={this.state.yVar}
                    filterNum={this.state.filterNum}
                    renderType={this.state.renderType}
                />
                    <svg width={fullWidth} height={fullHeight}>
                        <PlotComponent {...params} data={chartData}/>
                    </svg>
            </div>
		);
	}
}

export default App;
