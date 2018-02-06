import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chance from 'chance';

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

	}

	render() {
		return (
			<div className={styles('container')}>
				{`Hello ${this.state.name}`}
			</div>
		);
	}
}
