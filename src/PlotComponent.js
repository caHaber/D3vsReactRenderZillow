// Scatterplot
import React, {Component} from 'react';
import * as d3 from 'd3';
import './ScatterPlot.css';
import PlotCircle from './PlotCircle.js'
import Axis from './Axis.js';
import AxisY from './AxisY.js';
import ScatterD3 from './ScatterPlotD3';


// Scatterplot component
class PlotComponent extends Component{
    constructor(props){
        super(props);
        // Define scatterplot function
        this.xScale = d3.scaleLinear();
        this.yScale = d3.scaleLinear();
        this.scatter = ScatterD3();
        this.timestart = [];

    }
    componentDidMount(){
        this.update_d3(this.props);
    }
    // Create chart
    update_d3(props) {


        // Update parameters

        this.scatter
            .width(props.width)
            .height(props.height)
            .xTitle(props.xTitle)
            .yTitle(props.yTitle);

        // Call d3 update
        d3.select(this.root)
            .datum(props.data)
            .call(this.scatter);



        let xMax = d3.max(props.data, (d) => +d.x) * 1.05;
        let xMin = d3.min(props.data, (d) => +d.x) * .95;
        this.xScale.range([props.leftMargin, props.width]).domain([xMin, xMax]);

        var yMin = d3.min(props.data, (d) => +d.y) * .95;
        var yMax = d3.max(props.data, (d) => +d.y) * 1.05;
        this.yScale.range([props.height, 0]).domain([yMin, yMax]);

        // Enter new charts
    }
    // Update on new props
    componentWillReceiveProps (newProps){
        this.timestart[0] = d3.now();
        this.update_d3(newProps);
    }
    makeCircle(circle) {


        let props = {
                        cx: this.xScale(circle.x),
                        cy: this.yScale(circle.y),
                        r: 2,
                        key: circle.id,
                        id: circle.id
                    }

        return (
            <PlotCircle {...props} />
        );


    }

	render() {
        let translate = `translate(${this.props.leftMargin +200}, ${-this.props.topMargin - 200})`;
        this.timestart[1] = d3.now();
		// Expose HTML node via ref property
		return (


            <g className="histogram" width={this.props.width} height={this.props.height}>

                <div className="timer"> {this.timestart[1] - this.timestart[0]} </div>
                {this.props.renderType === 'd3' &&
                <g
                    className="chart"
                    width={this.props.width}
                    height={this.props.height}
                    ref={(node) => { this.root = node;}}
                />
                }
                {this.props.renderType === 'react' &&
                  <g>
                    <g className="chart">
                    {this.props.data.map(this.makeCircle.bind(this))}
                    </g>
                    <Axis {...this.props} data={this.props.data} xScale={this.xScale} />
                    <AxisY {...this.props} data={this.props.data}  yScale={this.yScale} />
                  </g>
                }

            </g>


		);
	}
}

export default PlotComponent;
