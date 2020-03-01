import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamCreate extends Component {
  onFormSubmit = (formValues) => {
    const { createStream: createStreamConnect } = this.props;
    createStreamConnect(formValues);
  };

  render() {
    return (
      <div>
        <h3>Create a Stream</h3>
        <StreamForm onSubmit={this.onFormSubmit} />
      </div>
    );
  }
}

StreamCreate.propTypes = {
  createStream: PropTypes.func.isRequired,
};

export default connect(null, { createStream })(StreamCreate);
