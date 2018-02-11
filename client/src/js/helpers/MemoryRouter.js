import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router-dom';

/**
 * The public API for a <Router> that stores location in memory.
 */
class MemoryRouter extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    children: PropTypes.node
  };

  render() {
    return <Router history={this.props.history} children={this.props.children} />;
  }
}

export default MemoryRouter;
