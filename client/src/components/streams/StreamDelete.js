import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { fetchStream } from "../../actions";
import Modal from "../Modal";
import history from "../../history";

class StreamDelete extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderActions = () => (
    <React.Fragment>
      <div className="ui primary button">Delete</div>
      <div className="ui button">Cancel</div>
    </React.Fragment>
  );

  renderContent = () => {
    if (!this.props.stream) {
      return "Are you sure you want to delete this stream?";
    }

    return `Are you sure you want to delete ${this.props.stream.title}?`;
  };

  render() {
    console.log(this.props.stream);
    return (
      <div>
        <Modal
          title="Delete Stream"
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() => history.push("/")}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};

export default connect(mapStateToProps, { fetchStream })(StreamDelete);
