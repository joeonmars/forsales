import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from 'js/components/avatar';

import styles from './TableScreen.scss';



export default class TableScreen extends Component {

	static propTypes = {

	}

	state = {

	}

	constructor(props) {
		super(props);

		this.renderStartButton = this.renderStartButton.bind(this);
		this.renderReadyButton = this.renderReadyButton.bind(this);
		this.handleClickLeave = this.handleClickLeave.bind(this);
	}

	componentWillMount() {

	}

	componentDidMount() {

	}

	handleClickLeave() {
		this.props.leaveTable(this.props.table_id);
	}

	renderStartButton() {
		return 	(
			<button
				className={styles('start-button')}
				onClick={this.handleClickStart}
			>
				Start
			</button>
		);
	}

	renderReadyButton() {
		return 	(
			<button
				className={styles('ready-button')}
				onClick={this.handleClickReady}
			>
				Ready
			</button>
		);
	}

	renderUser(user) {
		const {
			id,
			name,
			custom_photo,
			avatar,
		} = user;

		return (
			<div key={id} className={styles('user')}>
				<p>{name}</p>
				<Avatar custom_photo={custom_photo} avatar_id={avatar} />
			</div>
		);
	}

	render() {
		return (
			<div className={styles('container')}>
				<h1>{`Table: ${this.props.table_name}`}</h1>

				<button
					className={styles('leave-button')}
					onClick={this.handleClickLeave}
				>
					Leave Table
				</button>

				{this.props.is_owner ? 
					this.renderStartButton() : 
					this.renderReadyButton()
				}

				<ul>
					{this.props.users.map(this.renderUser)}
				</ul>
			</div>
		);
	}
}
