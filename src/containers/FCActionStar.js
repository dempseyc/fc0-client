import React, { Component } from 'react';
import { connect } from 'react-redux';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';

import {
    addLike,
    removeLike
    } from '../actions/contentActions';

class FCActionStar extends Component {
    state = {
        value: this.props.data.value,
    }

    handleClick () {
        let newValue = this.state.value ? false : true;
        this.setState({
            value: newValue
        });
       newValue ? this.props.dispatch(addLike(this.props.selected,this.props.data.retortID)) : this.props.dispatch(removeLike(this.props.selected,this.props.data.retortID, this.props.data.likeID)) ;
    }

    render() {
        const { value } = this.state;
        const createdBy = <span key={`${this.props.data.retortID}-created-by`} className={'created-by'}>
                    {`-${this.props.data.createdBy}`}
                </span>
        const display =  value ? <Star key={this.props.data.retortID} /> : <StarBorder key={this.props.data.retortID} />;
        const text = <span key={`${this.props.data.retortID}-star-count`} className="star-count">{this.props.data.count}</span>;

        return (
            <ToggleButton 
                value={value}
                children={[createdBy,display,text]}
                disableRipple={true}
                onClick={ (e)=>{ e.stopPropagation(); this.handleClick(); } }
            />
        )
    }
}

const mapStateToProps = state => ({
    selected: state.contentReducer.selectedPrompt,
    });

export default connect(mapStateToProps)(FCActionStar);

// export default FCActionStar