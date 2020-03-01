import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends Component {
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label htmlFor={input.title}>{label}</label>
        <input onChange={input.onChange} value={input.value} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onFormSubmit = (formValues) => {
    const { onSubmit } = this.props;
    onSubmit(formValues);
  };

  renderError = ({ error, touched }) => {
    if (error && touched) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }

    return null;
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form
        onSubmit={handleSubmit(this.onFormSubmit)}
        className="ui form"
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button type="submit" className="ui button primary">Submit</button>
      </form>
    );
  }
}

StreamForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const validate = (formValues) => {
  const erros = {};

  if (!formValues.title) {
    erros.title = 'You must enter a title';
  }

  if (!formValues.description) {
    erros.description = 'You must enter a description';
  }

  return erros;
};

export default reduxForm({
  form: 'streamForm',
  validate,
})(StreamForm);
