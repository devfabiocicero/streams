import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';

class StreamList extends Component {
  componentDidMount() {
    const { fetchStreams: fetchStreamsConnect } = this.props;
    fetchStreamsConnect();
  }

  renderAdmin(stream) {
    const { currentUserId } = this.props;

    if (stream.userId === currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>
          <Link
            to={`/streams/delete/${stream.id}`}
            className="ui button negative"
          >
            Delete
          </Link>
        </div>
      );
    }

    return null;
  }

  renderList() {
    const { streams } = this.props;

    return streams.map((stream) => (
      <div className="item" key={stream.id}>
        {this.renderAdmin(stream)}
        <i className="large middle aligned icon camera" />
        <div className="content">
          <Link to={`/streams/${stream.id}`} className="header">{stream.title}</Link>
          <div className="description">{stream.description}</div>
        </div>
      </div>
    ));
  }

  renderCreate() {
    const { isSignedIn } = this.props;

    if (isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    }

    return null;
  }

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

StreamList.defaultProps = {
  isSignedIn: null,
  currentUserId: null,
};

StreamList.propTypes = {
  fetchStreams: PropTypes.func.isRequired,
  streams: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.arrayOf([
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
      }),
    ]),
  ]).isRequired,
  currentUserId: PropTypes.string,
  isSignedIn: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  streams: Object.values(state.streams),
  currentUserId: state.auth.userId,
  isSignedIn: state.auth.isSignedIn,
});

export default connect(mapStateToProps, { fetchStreams })(StreamList);
