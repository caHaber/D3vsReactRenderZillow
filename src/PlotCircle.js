/**
 * Created by cabertron on 1/8/17.
 */
import React, {Component} from 'react';

class PlotCircle extends Component {

    render (){
        let translate = `translate(${this.props.cx}, ${this.props.cy})`;

        return (

                <circle

                      r={this.props.r}
                      cx={this.props.cx}
                      cy={this.props.cy}
                      >
                </circle
>

        );



    }




}

export default PlotCircle