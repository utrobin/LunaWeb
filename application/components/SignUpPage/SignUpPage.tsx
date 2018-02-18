import React from 'react';
import { withRouter } from 'react-router';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import SignUpForm from './SignUpForm';

class SignInFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] };
  }

  handleSubmit(values) {
    return this.props.mutate({ variables: values })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <SignUpForm
        onSubmit={this.handleSubmit.bind(this)}
      />
    );
  }
};

const signInMutation = gql`
  mutation createClient($email: String!, $password: String!) {
    createClient(email: $email, password: $password) {
      id
    }
  }
`;

const SignInWithData = graphql(signInMutation)(withRouter(SignInFormContainer));

export default SignInWithData;