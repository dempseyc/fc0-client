import React, { Component } from 'react';
import PageHeader from '../components/PageHeader';
import DynamicPageHeader from '../containers/DynamicPageHeader';

import PromptsPage from '../containers/PromptsPage';
import UserPage from '../containers/UserPage';
import RetortsPage from '../containers/RetortsPage';
import FoamyPage from '../components/FoamyPage';
import MorePage from '../components/MorePage';

class Page extends Component {

    constructor (props) {
        super(props);
        this.pageName = this.props.pageName;
        this.content = this.content.bind(this);
    }

    content () {
        switch (this.pageName) {
            case 'Prompts':
                return <><PageHeader pageName={this.pageName}/><PromptsPage /></>
            case 'Retorts':
                return <><PageHeader pageName={this.pageName}/><RetortsPage /></>
            case 'User':
                return <><DynamicPageHeader loggedIn={localStorage.id?true:false} pageName={this.pageName}/><UserPage /></>
            case 'Foamy':
                return <><FoamyPage /></>
            case 'More':
                return <><MorePage /></>
            default:
                return
        }
    }

    render () {
        return (
            <div className={'page'}>
                { this.content() }
            </div>
        )
    }
};

export default Page
