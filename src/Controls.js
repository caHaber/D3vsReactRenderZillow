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
            <MuiThemeProvider >
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
                    <SelectField
                        key="2"
                        floatingLabelText="Select Filter Amount"
                        value={this.props.filterNum}
                        onChange={this.props.changeFilter}
                    >
                        <MenuItem value={'500'} primaryText="500" />
                        <MenuItem value={'1000'} primaryText="1000" />
                        <MenuItem value={'10000'} primaryText="10000" />

                    </SelectField>
                    <SelectField
                        key="3"
                        floatingLabelText="Select Render Type"
                        value={this.props.renderType}
                        onChange={this.props.changeRender}
                    >
                        <MenuItem value={'react'} primaryText="react" />
                        <MenuItem value={'d3'} primaryText="d3" />


                    </SelectField>
                </div>
            </MuiThemeProvider>
		);
	}
});

export default Controls;
