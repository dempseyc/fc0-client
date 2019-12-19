import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/SwiperPage.css'
import Loading from '../components/Loading'
import FCDialogNew from '../containers/FCDialogNew'
import FCTextItem from '../components/FCTextItem'
import FCDialogEdit from '../containers/FCDialogEdit'
import RetortBlock from '../components/RetortBlock'

import {
    fetchRetorts,
    createRetort,
    editPrompt,
    editRetort,
    } from '../actions/contentActions'

import { newCurrPage } from '../actions/viewsActions';

class RetortsPage extends Component {

    contentLoading () {
        return <Loading contentName={this.pageName}/>
    }

    refetch (selected) {
        this.props.dispatch(fetchRetorts(selected));
        return true;
    }

    render () {
        const { user, usersById, Prompts, selected, Retorts, views } = this.props;
        const fetching = (Prompts.isFetching || Retorts.isFetching || !Retorts[selected] || !selected);
        if (!fetching) {
            const revalidating = (Retorts[selected].didInvalidate) ? this.refetch(selected) : false;
        }
        const myPrompt = (Array.isArray(this.props.Prompts.items)) ? this.props.Prompts.items.find(prompt => prompt.id === selected) : null;
        const newFormButton = (
            <FCDialogNew
                key='newretortbutton'
                type={(user.loggedIn) ? 'Retort': 'Disabled'}
                loggedIn={user.loggedIn}
                placeholder="Lather it up!"
                helperText={`New Lather: Your response to ${myPrompt ? myPrompt.text: '...'}`}
                goToLogin={ () => {
                    this.props.dispatch(newCurrPage(0,views.index));
                }}
                submit={ (newRetort) => {
                    this.props.dispatch(createRetort(selected, newRetort));
                    }
                }
            />
        );

        function promptHeaderButton (target) {
            return (
            <FCTextItem
                key={'promptheader'}
                item={myPrompt}
                type='Prompt'
                classes={['clickable-text','prompt-header']}
                // click={target.handleOpen}
            />
        )};

        const promptEditDialog = (
                <FCDialogEdit
                    key={'prompt'}
                    type='Prompt'
                    item={myPrompt}
                    classes={['prompt', 'prompt-header']}
                    submit={ (changedPromptText) => {
                        this.props.dispatch(editPrompt(selected, changedPromptText));
                        }
                    }
                    button={promptHeaderButton}
                />
        );

        function retortBlocks (Retorts,selected) {
            let blocks = (Retorts[selected].items.length > 0) ? Retorts[selected].items.map( (item) => {
                let myLike = user ? item.likes.find((like)=>like.user_id===user.id) : undefined;
                let likedByMe = (!myLike) ? false : true;
                // console.log('liked',likedByMe);
                return (
                    <RetortBlock
                        key={item.id}
                        item={item}
                        selected={selected}
                        myLike={myLike}
                        likedByMe={likedByMe}
                        createdBy={usersById[item.created_by]}
                    />
                )
            }) : null;
            return ( <div key={'retort-blocks'+selected} className='retort-list'>
                        {blocks}
                    </div>
            )
        }

        return (
            <div className={'retorts'}>
                {(!fetching) ? [promptEditDialog, newFormButton, retortBlocks(Retorts,selected)] : this.contentLoading()}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    usersById: state.userReducer.usersById,
    user: state.userReducer.user,
    selected: state.contentReducer.selectedPrompt,
    Prompts: state.contentReducer.allPrompts,
    Retorts: state.contentReducer.retortsByPrompt,
    views: state.viewsReducer
});

export default connect(mapStateToProps)(RetortsPage)
