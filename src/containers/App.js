import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/App.css'
import '../styles/NavBar.css'
import SwipeableViews from 'react-swipeable-views'

import Header from '../components/Header'
import NavBar from '../containers//NavBar'
import SwiperPage from '../components/SwiperPage'

import { newCurrPage } from '../actions/viewsActions'

import { fetchUsers, fetchUser } from '../actions/userActions'

import {
	broadcastChat,
	storeSubscription,
	connectCable,
	afterConnect } from '../actions/cableActions'


const viewsStyle = {
	position: 'fixed',
	top: 0,
	left: -6,
	minHeight: '100vh',
	minWidth: '102vw'
};

const pageColors5 = ['#00aaaa','#3a99a7','#699cab','#a3b2b8','#eeddcc'];
const pageNames = ['User','Prompts','Retorts','Foamy','More'];

class App extends Component {

	constructor(props) {
		super(props);
		this.newCurrPage = this.newCurrPage.bind(this);
		this.handleTabChange = this.handleTabChange.bind(this);
		this.swiperPages = this.buildSwiperPages();
	}

	async initialFetch () {
		await this.props.dispatch(fetchUsers());
		await this.props.dispatch(fetchUser());
		await this.props.dispatch(connectCable(this.props.username));
		await this.props.dispatch(afterConnect(this.props.subscription, this.props.username));
		// await this.props.dispatch(broadcastChat(this.props.subscription,"HI!",this.props.username));
	}

	buildSwiperPages () {

		const pages = pageColors5.map((c,i) => {
			let pageName = pageNames[i];
			return (
			<SwiperPage
				key={i}
				pageIdx={i}
				bgColor={c}
				pageName={pageName}
				onLogin={(pageName === 'User') ? this.onLogin : null}
			/> )
		});
		return pages;
	}

	newCurrPage (index) {
		this.props.dispatch(newCurrPage(index, this.props.index));
	}

	handleTabChange (event, value) {
		this.props.dispatch(newCurrPage(value, this.props.index));
	}

	componentDidMount() {
		console.log('cdm');
		this.initialFetch();
	}

	componentWillUnmount() {
		console.log('cwu');
		this.props.cable.subscriptions.remove(this.props.subscription);
		// taken as data in server in receive
		// this.subscription.send('hello world');
		// taken as method and args in server in method
		// this.subscription.perform('method_name', arguments);
	}

	render () {
		return (
		<div className="App">
			<SwipeableViews 
				enableMouseEvents
				style={viewsStyle}
				className='swipeable-views'
				onChangeIndex={ (index) => this.newCurrPage(index) }
				index={ this.props.index }  
				children={ this.swiperPages }
			/>
			<Header />
			<NavBar
				handleTabChange={this.handleTabChange}
				openModalButtonType={pageNames[this.props.index]}
			/>		
			</div>
		)
	}
}

const mapStateToProps = state => ({
	index: state.viewsReducer.index,
    selected: state.contentReducer.selectedPrompt,
    Prompts: state.contentReducer.allPrompts,
	Retorts: state.contentReducer.retortsByPrompt,
	user: state.userReducer.user,
	username: state.userReducer.user.username,
	subscription: state.cableReducer.subscription,
	cable: state.cableReducer.cable
});

export default connect(mapStateToProps)(App);