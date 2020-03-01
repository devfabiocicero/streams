import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStream, deleteStream } from '../../actions';
import Modal from '../Modal';
import history from '../../history';

class StreamDelete extends Component {
  componentDidMount() {
    const { fetchStream: fetchStreamConnect, match } = this.props;
    const { id } = match.params;
    fetchStreamConnect(id);
  }

  renderActions = () => {
    const { deleteStream: deleteStreamConnect, match } = this.props;
    const { id } = match.params;

    return (
      <>
        <button type="button" onClick={() => deleteStreamConnect(id)} className="ui primary button">Delete</button>
        <Link to="/" className="ui button">Cancel</Link>
      </>
    );
  };

  renderContent = () => {
    const { stream } = this.props;

    if (!stream) {
      return 'Are you sure you want to delete this stream?';
    }

    return `Are you sure you want to delete ${stream.title}?`;
  };

  render() {
    return (
      <div>
        <Modal
          title="Delete Stream"
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() => history.push('/')}
        />
      </div>
    );
  }
}

StreamDelete.defaultProps = {
  stream: null,
};

StreamDelete.propTypes = {
  fetchStream: PropTypes.func.isRequired,
  deleteStream: PropTypes.func.isRequired,
  stream: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  stream: state.streams[ownProps.match.params.id],
});

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);
