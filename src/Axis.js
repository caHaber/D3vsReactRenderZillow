/**
 * Created by cabertron on 1/8/17.
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

class Axis extends Component {
    constructor(props) {
        super();

        this.xScale = d3.scaleLinear()
            .domain(d3.extent(props.data, (d) => d.x))
            .range([0, props.height-props.topMargin-props.bottomMargin]);

        this.update_d3(props);
    }

    componentWillReceiveProps(newProps) {
        this.update_d3(newProps);
    }

    update_d3(props) {

        this.xScale
            .domain(d3.extent(props.data, (d) => d.x))
            .range([0, props.width]);

    }

    componentDidUpdate() { this.renderAxis(); }
    componentDidMount() { this.renderAxis(); }

    renderAxis() {
        let node = ReactDOM.findDOMNode(this);

        d3.select(node).call(d3.axisBottom(this.xScale));
    }

    render() {
        let translate = `translate(${this.props.leftAxisMargin}, ${this.props.height-this.props.topMargin-this.props.bottomMargin})`;
        return (
            <g className="axis" transform={translate}>
            </g>
        );
    }
}

export default Axis;