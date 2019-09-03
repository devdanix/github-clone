import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Badge } from "react-bootstrap";
import { getSingleIssues } from "../redux/actions";
import { connect } from "react-redux";

export class IssueItem extends Component {
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

    // Convert back to days and return
    return result;
  };

  showComments = () => {
    const comments = this.props.issue.comments;
    if (comments > 0) {
      return <i className="far fa-comment-alt"> {comments}</i>;
    }
  };

  render() {
    const number = this.props.issue.number;
    const title = this.props.issue.title;
    const creationTimestamp = this.props.issue.created_at;
    const user = this.props.issue.user.login;
    const labels = this.props.issue.labels.map((label, index) => {
      return (
        <Badge
          key={index}
          style={{
            background: "#" + label.color,
            color: label.color === "fef2c0" ? "#000000" : "#FFFFFF",
            fontSize: 12,
            padding: 3,
            margin: 3
          }}
        >
          {label.name}
        </Badge>
      );
    });

    return (
      <div className="issue-item">
        <h4 className="issue-text">
          <Link to={`/issue/${number}`}>{title}</Link> {labels}
          <div className="comments">{this.showComments()}</div>
        </h4>
        <p className="issue-subtext">
          #{number} opened {this.days_between(creationTimestamp)} by {user}
        </p>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getSingleIssues: data => dispatch(getSingleIssues(data))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(IssueItem);
