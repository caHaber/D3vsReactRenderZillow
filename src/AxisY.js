/**
 * Created by cabertron on 1/8/17.
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

class AxisY extends Component {
    constructor(props) {
        super();

        this.yScale = d3.scaleLinear();

        this.update_d3(props);
    }

    componentWillReceiveProps(newProps) {
        this.update_d3(newProps);
    }

    update_d3(props) {

        this.yScale
            .domain([0,
                d3.max(props.data.map((d) => d.y))])
            .range([0, props.height-props.topMargin-props.bottomMargin]);

    }

    componentDidUpdate() { this.renderAxis(); }
    componentDidMount() { this.renderAxis(); }

    renderAxis() {
        let node = ReactDOM.findDOMNode(this);

        d3.select(node).call(d3.axisLeft(this.yScale));
    }

    render() {
        let translate = `translate(${this.props.leftMargin-3}, 0)`;
        return (
            <g className="axisY" transform={translate}>
            </g>
        );
    }
}

export default AxisY;
