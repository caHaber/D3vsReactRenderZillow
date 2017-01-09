/**
 * Created by cabertron on 1/8/17.
 */
import React, {Component} from 'react';

class PlotCircle extends Component {

    render (){
        let translate = `translate(${this.props.cx}, ${this.props.cy})`;

        return (
                <circle
                      transform={translate}
                      r={this.props.r}
                      cx={0}
                      cy={0}
                      >
                </circle>
        );



    }




}

export default PlotCircle