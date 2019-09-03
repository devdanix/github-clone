import React, { Component } from "react";
import "./App.css";

import IssueList from "./components/IssueList";
import Pagination from "./components/Pagination";
import ItemDetails from "./components/ItemDetails";
import Navbar from "./components/Navbar";

import { connect } from "react-redux";
import { getGithubIssues, getTotalPagesCount } from "./redux/actions";

import { BrowserRouter as Router, Route } from "react-router-dom";

import { Container } from "react-bootstrap";

class App extends Component {
  componentWillMount() {
    const { getGithubIssues, getTotalPagesCount } = this.props;

    getGithubIssues(1);
    getTotalPagesCount();
  }

  render() {
    return (
      <Router>
        <Navbar />
        <Container>
          <div className="issue-list">
            <Route exact path={`/issue/:number`} component={ItemDetails} />
            {this.props.data ? (
              <Route exact path="/" component={IssueList} />
            ) : (
              "Loading..."
            )}
            {this.props.pages ? (
              <Route exact path="/" component={Pagination} />
            ) : (
              "Counting.."
            )}

            <br />
            <p />
          </div>
        </Container>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  data: state.githubReducer.issues,
  pages: state.githubReducer.pageCount
});

function mapDispatchToProps(dispatch) {
  return {
    getGithubIssues: data => dispatch(getGithubIssues(data)),
    getTotalPagesCount: data => dispatch(getTotalPagesCount(data))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
