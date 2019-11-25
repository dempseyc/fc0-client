import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/App.css';
import '../styles/NavBar.css';
import SwipeableViews from 'react-swipeable-views';

import Header from '../components/Header';
import NavBar from '../containers//NavBar';
import SwiperPage from '../components/SwiperPage';

import { newCurrPage } from '../actions/viewsActions';

import { fetchUsers, fetchUser } from '../actions/userActions';

import ActionCable from 'action-cable-react-jwt';

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

	initialFetch () {
		this.props.dispatch(fetchUsers());
		this.props.dispatch(fetchUser());
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
		this.initialFetch();
		// console.log('token', localStorage.token);
		this.cable = ActionCable.createConsumer("ws://localhost:3001/cable", localStorage.token);
		// this.cable = ActionCable.createConsumer("wss://echo.websocket.org/");
		this.subscription = this.cable.subscriptions.create({channel: "MyChannel"}, {
			connected: function() { console.log("cable: connected") },             // onConnect
			disconnected: function() { console.log("cable: disconnected") },       // onDisconnect
			received: (data) => { console.log("cable received: ", data); }         // OnReceive
		});
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
});

export default connect(mapStateToProps)(App);