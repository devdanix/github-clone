import React, { Component } from "react";
import ReactMarkdown from "react-markdown";

export class CommentItem extends Component {
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

  render() {
    const userAvatar = this.props.comment.user.avatar_url;
    const login = this.props.comment.user.login;
    const body = this.props.comment.body;
    const created_at = this.props.comment.created_at;

    return (
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
              {` commented ${this.days_between(created_at)}`}
            </p>
          </div>
          <div className="author-comment">
            <ReactMarkdown source={body} />
          </div>
        </div>
      </div>
    );
  }
}

export default CommentItem;
