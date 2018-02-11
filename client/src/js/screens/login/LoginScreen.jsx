import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Avatar from 'js/components/avatar';

import styles from './LoginScreen.scss';



export default class LoginScreen extends Component {

	static propTypes = {

	}

	state = {

	}

	constructor(props) {
		super(props);

	}

	componentWillMount() {

	}

	componentDidMount() {

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
			<Link to='/playground'>
				<div className={styles('user')}>
					<p>{id}</p>
					<p>{name}</p>
					<p>{gender}</p>
					<Avatar custom_photo={custom_photo} avatar_id={avatar} />
				</div>
			</Link>
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

				{this.props.user && this.renderUser(this.props.user)}

			</div>
		);
	}
}
