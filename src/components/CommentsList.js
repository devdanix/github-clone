import React, { Component } from "react";

import CommentItem from "./CommentItem";

import { connect } from "react-redux";
import { Row } from "react-bootstrap";

export class CommentsList extends Component {
  render() {
    return this.props.data.map((comment, index) => {
      return (
        <Row key={index}>
          <CommentItem comment={comment} />
        </Row>
      );
    });
  }
}

const mapStateToProps = state => ({
  data: state.githubReducer.issueComments
});

export default connect(
  mapStateToProps,
  null
)(CommentsList);
