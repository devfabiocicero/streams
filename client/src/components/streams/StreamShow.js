import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";
import flv from "flv.js";

class StreamShow extends Component {
  constructor(props) {
    super(props);
    this.myPlayer = React.createRef();
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    await this.props.fetchStream(id);

    this.flvPlayer = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`
    });

    this.flvPlayer.attachMediaElement(this.myPlayer.current);
    this.flvPlayer.load();
  }

  render() {
    if (!this.props.stream) {
      return <div></div>
    }

    const { title, description } = this.props.stream;

    return (
      <div>
        <h1>{title}</h1>
        <h5 ref>{description}</h5>
        <video ref={this.myPlayer} style={{width: "100%"}} controls />
      </div>
    )
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  }
}

export default connect(mapStateToProps, { fetchStream })(StreamShow);
