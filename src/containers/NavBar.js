import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/App.css';
import '../styles/NavBar.css';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import PersonIcon from '@material-ui/icons/PersonOutlined';
import HdrWeakOutlined from '@material-ui/icons/HdrWeakOutlined';
import BubbleChartOutlined from '@material-ui/icons/BubbleChartOutlined';
import ScatterPlotIcon from '@material-ui/icons/ScatterPlotOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import WavesIcon from '@material-ui/icons/Waves';
import GestureIcon from '@material-ui/icons/Gesture';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import GrainIcon from '@material-ui/icons/Grain';
import TextsmsIcon from '@material-ui/icons/TextsmsOutlined';


const TabStyle = {
    minWidth: 'none',
    color: '#2E769B'
}

class NavBar extends Component {

    render () {
        return (
            <AppBar 
                position='static' 
            >
                <Tabs 
                    className='NavBar'
                    value={ this.props.viewsReducer.index } 
                    onChange={ this.props.handleTabChange }
                    variant='fullWidth'
                    indicatorColor={'secondary'}
                >
                    <Tab 
                        style={ TabStyle }
                        className='NavLink' 
                        value={0}
                        icon={<PersonIcon/>}
                        // label="O"
                        label="user"
                        />
                    <Tab 
                        style={ TabStyle }
                        className='NavLink' 
                        value={1}
                        icon={<ScatterPlotIcon/>}
                        label="foamulae"
                        // label="Oo°"
                        />
                    <Tab 
                        style={ TabStyle }
                        className='NavLink' 
                        value={2}
                        icon={<GrainIcon/>}
                        label="lather"
                        // label="°oO"
                        />
                    <Tab 
                        style={ TabStyle }
                        className='NavLink' 
                        value={3}
                        icon={<TextsmsIcon/>}
                        label="foamy"
                        // label="°°°"
                        />
                    <Tab 
                        style={ TabStyle }
                        className='NavLink' 
                        value={4}
                        icon={<WavesIcon/>}
                        label="suggest"/>
                </Tabs>
            </AppBar>
        )
    }
}

const mapStateToProps = state => ({
    ...state
   });
   
export default connect(mapStateToProps)(NavBar);