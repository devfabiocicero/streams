import React, { Component } from "react";
import { connect } from "react-redux";
import { createStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamCreate extends Component {
  onFormSubmit = formValues => {
    this.props.createStream(formValues);
  };

  render() {
    return (
      <div>
        <StreamForm onSubmit={this.onFormSubmit} />
      </div>
    );
  }
}

export default connect(null, { createStream })(StreamCreate);
