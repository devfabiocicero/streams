import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends Component {
  componentDidMount() {
    const { fetchStream: fetchStreamConnect, match } = this.props;
    const { id } = match.params;
    fetchStreamConnect(id);
  }

  onFormSubmit = (formValues) => {
    const { editStream: editStreamConnect, stream } = this.props;
    editStreamConnect(stream.id, formValues);
  };

  render() {
    const { stream } = this.props;
    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm
          initialValues={_.pick(stream, 'title', 'description')}
          onSubmit={this.onFormSubmit}
        />
      </div>
    );
  }
}

StreamEdit.propTypes = {
  fetchStream: PropTypes.func.isRequired,
  editStream: PropTypes.func.isRequired,
  stream: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  stream: state.streams[ownProps.match.params.id],
});

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit,
);
