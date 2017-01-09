// Scatterplot
import React, {Component} from 'react';
import * as d3 from 'd3';
import './ScatterPlot.css';
import PlotCircle from './PlotCircle.js'
import Axis from './Axis.js';
import AxisY from './AxisY.js';


// Scatterplot component
class PlotComponent extends Component{
    constructor(props){
        super();
        // Define scatterplot function
        this.histogram = d3.histogram();
        this.xScale = d3.scaleLinear();
        this.yScale = d3.scaleLinear();

        this.update_d3(props);

    }
    // Create chart
    update_d3(props) {

        // Update parameters





        this.xScale
            .range([9, props.width-props.leftMargin])
            .domain([d3.min(props.data, (d) => d.x), d3.max(props.data, (d) => d.x)]);



        this.yScale
            .range([0, props.height-props.topMargin-props.bottomMargin])
            .domain([d3.min(props.data, (d) => d.y), d3.max(props.data, (d) => d.y)]);



        // Enter new charts
    }
    // Update on new props
    componentWillReceiveProps (newProps){
        this.update_d3(newProps);
    }

    makeCircle(circle) {

        let props = {
                        cx: this.xScale(circle.x),
                        cy: this.yScale(circle.y),
                        r: 2,
                        key: circle.id
                    }

        return (
            <PlotCircle {...props} />
        );


    }

	render() {
        let translate = `translate(0, ${this.props.topMargin})`;
		// Expose HTML node via ref property
		return (
            <g className="histogram" width={this.props.width} height={this.props.height} transform={translate}>
                <g className="dots">
                    {this.props.data.map(this.makeCircle.bind(this))}
                </g>
                <Axis {...this.props} data={this.props.data}  />
                <AxisY {...this.props} data={this.props.data}  />
            </g>

		);
	}
}

export default PlotComponent;
