import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/SwiperPage.css';
import FCDialogNew from '../containers/FCDialogNew';
import FCTextItem from '../components/FCTextItem';

import { 
    selectPrompt, 
    fetchPrompts,
    fetchRetorts,
    createPrompt,
    } from '../actions/contentActions';

import { newCurrPage } from '../actions/viewsActions';

class PromptsPage extends Component {

    async componentDidMount () {
        await this.props.dispatch(fetchPrompts());
        if (this.props.Prompts.items.length>0) {
            await this.props.dispatch(selectPrompt(this.props.Prompts.items[0].id || this.props.selected || 0));
            await this.props.dispatch(fetchRetorts(this.props.selected));
        }
    }

    render () {
        const { Prompts, selected, user, views } = this.props;
        const classes = ['clickable-text'];
        const newFormButton = (
            <FCDialogNew
                key='newpromptbutton'
                type={(user.loggedIn) ? 'Prompt' : 'Disabled'}
                loggedIn={user.loggedIn}
                color='primary'
                placeholder="What's your foamula?"
                helperText="New Foamula: a prompt, setup, category, formula, or joke example"
                goToLogin={ () => {
                    this.props.dispatch(newCurrPage(0,views.index));
                }}
                submit={ (newPrompt) => {
                    this.props.dispatch(createPrompt(newPrompt));
                    }
                }
            />
        );
        const items = (Array.isArray(Prompts.items)) ? Prompts.items.map( (item,i) => (
                    <FCTextItem
                        key={i}
                        item={item}
                        type='Prompt'
                        classes={classes}
                        selected={(item.id===selected)?' selected':''}
                        // children={[latherIndicator, newLatherIndicator]}
                        click={ () => {
                            this.props.dispatch(selectPrompt(item.id));
                            this.props.dispatch(fetchRetorts(item.id));
                            this.props.dispatch(newCurrPage(2,views.index));
                        } } 
                    /> ) 
                ) : null;
        
        return (
            <div className={'prompts'}>
                { newFormButton }
                <div className='prompt-list'>
                    { items }
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    user: state.userReducer.user,
    selected: state.contentReducer.selectedPrompt,
    Prompts: state.contentReducer.allPrompts,
    Retorts: state.contentReducer.retortsByPrompt,
    views: state.viewsReducer
});

export default connect(mapStateToProps)(PromptsPage)
