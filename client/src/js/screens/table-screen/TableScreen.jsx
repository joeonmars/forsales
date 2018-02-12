import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './TableScreen.scss';



export default class TableScreen extends Component {

	static propTypes = {

	}

	state = {

	}

	constructor(props) {
		super(props);

		this.handleClickLeave = this.handleClickLeave.bind(this);
	}

	componentWillMount() {

	}

	componentDidMount() {

	}

	handleClickLeave() {
		this.props.leaveTable(this.props.table.id);
	}

	render() {
		return (
			<div className={styles('container')}>
				HELLO TABLE!

				<button
					className={styles('leave-button')}
					onClick={this.handleClickLeave}
				>
					Leave Table
				</button>
			</div>
		);
	}
}
