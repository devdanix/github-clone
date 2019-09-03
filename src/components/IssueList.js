import React, { Component } from "react";

import IssueItem from "./IssueItem";

import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";

export class IssueList extends Component {
  render() {
    return this.props.data.map((issue, index) => {
      return (
        <Row key={issue.id}>
          <Col lg={true} md={true}>
            <IssueItem issue={issue} />
          </Col>
        </Row>
      );
    });
  }
}

const mapStateToProps = state => ({
  data: state.githubReducer.issues,
  pages: state.githubReducer.pageCount
});

export default connect(
  mapStateToProps,
  null
)(IssueList);
