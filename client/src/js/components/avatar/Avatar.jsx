import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Avatar.scss';



export default class Avatar extends Component {

	static propTypes = {
		custom_photo: PropTypes.string,
		avatar_id: PropTypes.string,
	}

	state = {
		photo_load: false,
	}

	constructor(props) {
		super(props);

		this.handlePhotoLoad = this.handlePhotoLoad.bind(this);
	}

	handlePhotoLoad(e) {
		this.setState({
			photo_load: true,
		});
	}

	render() {

		const container_classname = styles('container', this.props.avatar_id);

		const style = this.state.photo_load ? {
			backgroundImage: `url(${this.props.custom_photo})`,
		} : null;

		return (
			<div className={container_classname} style={style}>
				{!this.state.photo_load && !this.props.avatar_id && 
					<img src={this.props.custom_photo} onLoad={this.handlePhotoLoad} />
				}
			</div>
		);
	}
}
