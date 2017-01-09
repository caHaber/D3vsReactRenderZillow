// Scatterplot
import React from 'react';
import './Controls.css';
import {MuiThemeProvider, SelectField, MenuItem, TextField} from 'material-ui';



// Needed for onTouchTap (to avoid warning from material-ui)
// See: https://github.com/callemall/material-ui/issues/4670
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


// Scatterplot component
var Controls = React.createClass({

	render() {
		// Return links and show anything inside the <App> component (children)
		return (
            <MuiThemeProvider>
                <div className="controls">
                    <br/>
                    <SelectField
                    key="0"
                    floatingLabelText="X Axis Variable"
                    value={this.props.xVar}
                    onChange={this.props.changeX}

                >
                    <MenuItem value={'DaysOnMarket'} primaryText="DaysOnMarket" />
                    <MenuItem value={'MarketHealthIndex'} primaryText="MarketHealthIndex" />
                    <MenuItem value={'ForecastYoYPctChange'} primaryText="ForecastYoYPctChange" />
                </SelectField>
                    <SelectField
                        key="1"
                        floatingLabelText="Y Axis Variable"
                        value={this.props.yVar}
                        onChange={this.props.changeY}
                    >
                        <MenuItem value={'YoY'} primaryText="YoY" />
                        <MenuItem value={'MoM'} primaryText="MoM" />
                        <MenuItem value={'Delinquency'} primaryText="Delinquency" />

                    </SelectField>
                </div>
            </MuiThemeProvider>
		);
	}
});

export default Controls;
