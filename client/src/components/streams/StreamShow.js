import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import flv from 'flv.js';
import { fetchStream } from '../../actions';

class StreamShow extends Component {
  constructor(props) {
    super(props);
    this.myPlayer = React.createRef();
  }

  async componentDidMount() {
    const { fetchStream: fetchStreamConnect, match } = this.props;
    const { id } = match.params;
    await fetchStreamConnect(id);

    this.flvPlayer = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`,
    });

    this.flvPlayer.attachMediaElement(this.myPlayer.current);
    this.flvPlayer.load();
  }

  render() {
    const { stream } = this.props;
    if (!stream) {
      return <div />;
    }

    const { title, description } = stream;

    return (
      <div>
        <h1>{title}</h1>
        <h5 ref>{description}</h5>
        <video
          ref={this.myPlayer}
          style={{ width: '100%' }}
          controls
        >
          <track src="" kind="captions" />
        </video>
      </div>
    );
  }
}

StreamShow.defaultProps = {
  stream: null,
};

StreamShow.propTypes = {
  stream: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  fetchStream: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  stream: state.streams[ownProps.match.params.id],
});

export default connect(mapStateToProps, { fetchStream })(StreamShow);
