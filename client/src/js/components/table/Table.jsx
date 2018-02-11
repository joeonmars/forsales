import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fill } from 'lodash';
import Avatar from 'js/components/avatar';

import styles from './Table.scss';



export default class Table extends Component {

	static propTypes = {
		players: PropTypes.array,
		owner: PropTypes.object,
		max_players: PropTypes.number,
		name: PropTypes.string,
	}

	state = {

	}

	constructor(props) {
		super(props);

		this.slots = fill(Array(this.props.max_players), null);

		this.renderSeat = this.renderSeat.bind(this);
		this.handleClickTable = this.handleClickTable.bind(this);
	}

	handleClickTable(e) {

	}

	renderSeat(slot, index) {
		const player = this.props.players[index];

		const player_classname = player ? styles('player', {
			'owner': (player.id === this.props.owner.id),
		}) : null;

		return (
			<div key={`seat-${index}`} className={styles('seat')}>
				{player && 
					<div className={player_classname}>
						<Avatar
							className={styles('avatar')}
							custom_photo={player.custom_photo}
							avatar_id={player.avatar_id}
						/>
					</div>
				}
			</div>
		);
	}

	render() {

		const container_classname = styles('container');

		return (
			<div className={container_classname}>
				<div className={styles('table')}>
					<h1>Table</h1>
					<h2>{this.props.name}</h2>
				</div>
				<div className={styles('seats')}>
					{this.slots.map(this.renderSeat)}
				</div>
			</div>
		);
	}
}
