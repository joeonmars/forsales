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
	}

	componentWillMount() {
		const chance = new Chance();

		this.setState({
			name: chance.name(),
		});
	}

	componentDidMount() {

		const socket = io('http://localhost:4200');

		socket.on('connect', () => {
			console.log('connect');

			socket.once('server:connected', greeting => {
				console.log('server:connected', greeting);
			});
		});

		socket.on('disconnect', () => {
			console.log('disconnect');
		});
	}

	render() {
		return (
			<div className={styles('container')}>
				{`Hello ${this.state.name}`}
			</div>
		);
	}
}
