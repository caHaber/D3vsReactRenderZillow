// ScatterPlot
import * as d3 from 'd3';
import d3tip from 'd3-tip';

var ScatterPlot = function() {
    // Set default values
    var height = 500,
        width = 500,
        xScale = d3.scaleLinear(),
        yScale = d3.scaleLinear(),
        xTitle = 'X Axis Title',
        yTitle = 'Y Axis Title',
        fill = 'green',
        radius = (d) => 6,
        margin = {
            left:70,
            bottom:50,
            top:30,
            right:10,
        };

    // Function returned by ScatterPlot
    var chart = function(selection) {
        // Height/width of the drawing area itself
        var chartHeight = height - margin.bottom - margin.top;
        var chartWidth = width - margin.left - margin.right;

        // Iterate through selections, in case there are multiple
        selection.each(function(data){

        });
    };

    // Getter/setter methods to change locally scoped options
    chart.height = function(value){
        if (!arguments.length) return height;
        height = value;
        return chart;
    };

    chart.width = function(value){
        if (!arguments.length) return width;
        width = value;
        return chart;
    };

    chart.fill = function(value){
        if (!arguments.length) return fill;
        fill = value;
        return chart;
    };

    chart.xTitle = function(value){
        if (!arguments.length) return xTitle;
        xTitle = value;
        return chart;
    };

    chart.yTitle = function(value){
        if (!arguments.length) return yTitle;
        yTitle = value;
        return chart;
    };
    chart.radius = function(value){
        if (!arguments.length) return radius;
        radius = value;
        return chart;
    };

    return chart;
};


export default ScatterPlot;
