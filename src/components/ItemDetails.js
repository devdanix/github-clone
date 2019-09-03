import React, { Component } from "react";

import { connect } from "react-redux";
import ReactMarkdown from "react-markdown";
import CommentsList from "./CommentsList";
import { getIssueComments, getSingleIssues } from "../redux/actions";

import { Badge, Row, Col } from "react-bootstrap";

export class ItemDetails extends Component {
  // async componentWillMount() {
  //   const { getIssueComments } = this.props;
  //   const number = this.props.match.params.number;
  //   getIssueComments(number);
  //   console.log(this.props.comments);
  // }

  componentDidMount() {
    const { getIssueComments, getSingleIssues } = this.props;
    const number = this.props.match.params.number;
    getSingleIssues(number);
    getIssueComments(number);
  }

  days_between = timestamp => {
    // The number of milliseconds in one day
    var ONE_DAY = 1000 * 60 * 60 * 24;

    const date = new Date(timestamp);
    const dateNow = Date.now();

    // Convert both dates to milliseconds
    let date1_ms = date.getTime();
    let date2_ms = dateNow;

    // Calculate the difference in milliseconds
    let difference_ms = Math.abs(date1_ms - date2_ms);

    let days = Math.round(difference_ms / ONE_DAY);

    let result = "";

    if (days === 0) {
      days = Math.round(difference_ms / (1000 * 60 * 60));
      result = `${days} hours ago`;
    } else if (days === 1) {
      result = days + " day ago";
    } else {
      result = days + " days ago";
    }
    return result;
  };

  render() {
    if (this.props.data) {
      const creationTime = this.days_between(this.props.data.created_at);
      const number = this.props.data.number;
      const title = this.props.data.title;
      const state = this.props.data.state;
      const login = this.props.data.user.login;
      const comments = this.props.data.comments;
      const userAvatar = this.props.data.user.avatar_url;
      const body = this.props.data.body;
      const assignees = this.props.data.assignees.length;
      const labels = this.props.data.labels.map((label, index) => {
        return (
          <Badge
            key={index}
            style={{
              background: "#" + label.color,
              color: label.color === "fef2c0" ? "#000000" : "#FFFFFF",
              fontSize: 12,
              padding: 3,
              margin: 3,
              width: "-webkit-fill-available",
              textAlign: "left"
            }}
          >
            {label.name}
          </Badge>
        );
      });

      return (
        <Col>
          <Row>
            <div className="issue-text">
              <h3>{title}</h3>
              <h3 style={{ color: "#a3aab1", fontWeight: 300, marginLeft: 5 }}>
                #{number}
              </h3>
            </div>
          </Row>
          <Row style={{ borderBottom: "1px solid #e1e4e8" }}>
            <Badge className="badge-green">
              <i className="fas fa-exclamation-circle" />
              {" " + state}
            </Badge>
            <p>{`${login} opened this issue ${creationTime} · ${comments} comments`}</p>
          </Row>
          <Row>
            <div className="comment">
              <div className="author-image">
                <img
                  className=""
                  height="40"
                  width="40"
                  alt="@fupengl"
                  src={userAvatar}
                />
              </div>
              <div>
                <div className="author-comment-top">
                  <p
                    style={{
                      flex: "1 1 auto",
                      marginBottom: "1px",
                      paddingBottom: "8px",
                      paddingTop: "8px",
                      width: "1%"
                    }}
                  >
                    <strong>{`${login}`}</strong>{" "}
                    {` opened this issue ${creationTime}`}
                  </p>
                </div>
                <div className="author-comment">
                  <ReactMarkdown source={body} />
                </div>
              </div>
              <div className="issue-info">
                <p>
                  <b>Assignes</b>
                </p>
                <p>{assignees > 0 ? `${assignees}` : "No one assigned"}</p>
                <hr></hr>
                <p>
                  <b>Labels</b>
                </p>
                <p>{labels}</p>
                <hr></hr>
                <p>
                  <b>Projects</b>
                </p>
                <p>None yet</p>
                <hr></hr>
                <p>
                  <b>Milestone</b>
                </p>
                <p>None yet</p>
                <hr></hr>
              </div>
            </div>
          </Row>
          {this.props.comments ? <CommentsList /> : "no comments"}
        </Col>
      );
    } else {
      return "Loading...";
    }
  }
}

const mapStateToProps = state => ({
  data: state.githubReducer.issueDetails,
  comments: state.githubReducer.issueComments
});

function mapDispatchToProps(dispatch) {
  return {
    getSingleIssues: data => dispatch(getSingleIssues(data)),
    getIssueComments: data => dispatch(getIssueComments(data))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemDetails);
