import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chance from 'chance';

import Avatar from 'js/components/avatar';

import styles from './Playground.scss';



export default class Playground extends Component {

	static propTypes = {

	}

	state = {

	}

	constructor(props) {
		super(props);

		this.handleClickNewTable = this.handleClickNewTable.bind(this);
	}

	componentWillMount() {

	}

	componentDidMount() {

	}

	handleClickNewTable() {
		this.props.newTable({
			name: Chance().sentence({words: 4}),
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

	renderOtherUser(user) {
		const {
			id,
			name,
			gender,
			custom_photo,
			avatar,
		} = user;

		return (
			<div key={id} className={styles('other-user')}>
				<p>{name}</p>
				<Avatar custom_photo={custom_photo} avatar_id={avatar} />
			</div>
		);
	}

	render() {
		return (
			<div className={styles('container')}>

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
				
				<ul>
					{this.props.all_users.map(this.renderOtherUser)}
				</ul>
			</div>
		);
	}
}
