import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chance from 'chance';

import Table from 'js/components/table';
import Avatar from 'js/components/avatar';

import styles from './Playground.scss';



export default class Playground extends Component {

	static propTypes = {

	}

	state = {

	}

	constructor(props) {
		super(props);

		this.handleClickMatchmaking = this.handleClickMatchmaking.bind(this);
		this.handleClickNewTable = this.handleClickNewTable.bind(this);
	}

	componentWillMount() {

	}

	componentDidMount() {
		this.props.connectLobby();
	}

	handleClickMatchmaking() {

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

	renderTable(table) {
		return (
			<Table key={table.id} {...table} />
		);
	}

	render() {
		return (
			<div className={styles('container')}>

				<button
					className={styles('matchmaking-button')}
					onClick={this.handleClickMatchmaking}
				>
					Matchmaking
				</button>

				<button
					className={styles('new-table-button')}
					onClick={this.handleClickNewTable}
				>
					New Table
				</button>

				<ul>
					{this.props.all_users.map(this.renderOtherUser)}
				</ul>

				<ul>
					{this.props.all_tables.map(this.renderTable)}
				</ul>
			</div>
		);
	}
}
