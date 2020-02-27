import React from "react";
import Modal from "../Modal";

const StreamDelete = () => {
  const actions = (
    <React.Fragment>
      <div className="ui primary button">Delete</div>
      <div className="ui button">Cancel</div>
    </React.Fragment>
  );

  return (
    <div>
      StreamDelete
      <Modal
        title="Delete Stream"
        content="Are you sure you want to delete this stream?"
        actions={actions}
      />
    </div>
  );
};

export default StreamDelete;
