import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chance from 'chance';
import io from 'socket.io-client';

import Avatar from 'js/components/avatar';

import styles from './Playground.scss';



export default class Playground extends Component {

	static propTypes = {

	}

	state = {
		name: '',
	}

	constructor(props) {
		super(props);

		this.chance = new Chance();

		this.handleClickNewTable = this.handleClickNewTable.bind(this);
	}

	componentWillMount() {
		this.setState({
			name: this.chance.name(),
		});
	}

	componentDidMount() {
		/*
		const socket = io('http://localhost:4200');

		socket.on('connect', () => {
			console.log('connect');

			socket.once('server:connected', greeting => {
				console.log('server:connected', greeting);
			});
		});

		socket.on('disconnect', () => {
			console.log('disconnect');
		});*/
	}

	handleClickNewTable() {
		this.props.newTable({
			name: this.chance.sentence({words: 4}),
			max_players: 6,
		});
	}

	renderUser(user) {
		const {
			id,
			name,
			gender,
			custom_photo,
			avatar,
		} = user;

		return (
			<div className={styles('user')}>
				<p>{id}</p>
				<p>{name}</p>
				<p>{gender}</p>
				<Avatar custom_photo={custom_photo} avatar_id={avatar} />
			</div>
		);
	}

	render() {
		return (
			<div className={styles('container')}>

				<button
					className={styles('login-button')}
					onClick={this.props.loginWithFacebook}
				>
					Login with Facebook
				</button>

				<button
					className={styles('login-button')}
					onClick={this.props.loginWithTwitter}
				>
					Login with Twitter
				</button>

				<button
					className={styles('enter-lobby-button')}
					onClick={this.props.connectLobby}
				>
					Enter Game Lobby
				</button>

				<button
					className={styles('new-table-button')}
					onClick={this.handleClickNewTable}
				>
					New Table
				</button>

				{this.props.user && this.renderUser(this.props.user)}

			</div>
		);
	}
}
