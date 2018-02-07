import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chance from 'chance';
import io from 'socket.io-client';

import styles from './Playground.scss';



export default class Playground extends Component {

	static propTypes = {

	}

	state = {
		name: '',
	}

	constructor(props) {
		super(props);

		this.createRoom = this.createRoom.bind(this);
	}

	componentWillMount() {
		const chance = new Chance();

		this.setState({
			name: chance.name(),
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

	createRoom() {
		//this.props.ping();
		this.props.connectLobby();
	}

	render() {
		return (
			<div className={styles('container')}>

				{`Hello ${this.state.name}`}

				<button
					className={styles('create-room-button')}
					onClick={this.createRoom}
				>
					Create Room {this.props.is_pinging.toString()}
				</button>

			</div>
		);
	}
}
