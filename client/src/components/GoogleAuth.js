import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '430809920850-tfqct0pvung8ole1r5f0d1mlv27t0ep3.apps.googleusercontent.com',
          scope: 'email',
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    '';

    const { signIn: signInConnect, signOut: signOutConnect } = this.props;

    if (isSignedIn) {
      signInConnect(this.auth.currentUser.get().getId());
    } else {
      signOutConnect();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    const { isSignedIn } = this.props;

    if (isSignedIn === null) {
      return null;
    } if (isSignedIn) {
      return (
        <button type="button" onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    }

    return (
      <button type="button" onClick={this.onSignInClick} className="ui blue google button">
        <i className="google icon" />
        Sign In with Google
      </button>
    );
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

GoogleAuth.defaultProps = {
  isSignedIn: null,
};

GoogleAuth.propTypes = {
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isSignedIn: state.auth.isSignedIn,
});

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
