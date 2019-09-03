import React, { Component } from "react";
import { getGithubIssues } from "../redux/actions";
import { connect } from "react-redux";

export class Pagination extends Component {
  render() {
    const changePage = (e, index) => {
      //Get active page number span and remove class
      var active = document.querySelector(".active");

      //Check if active is valid, if yes then remove active class
      if (active) {
        active.classList.remove("active");
      }

      //Set selected page class to active
      e.target.classList.add("active");

      //Call redux action
      getGithubIssues(index + 1);
    };

    const { getGithubIssues } = this.props;
    //const totalPages = this.props.totalPages;
    const totalPages = Math.ceil(this.props.pages.open_issues_count / 30);
    const pagesArray = [];

    for (let i = 1; i <= totalPages; i++) {
      pagesArray.push(i);
    }

    let renderPages = pagesArray.map((page, index) => {
      let active = index === this.props.currentPage - 1 ? "active" : "";

      return (
        <span
          id={"page-" + index}
          key={index}
          className={active}
          //onClick={() => this.props.getGithubIssues(index + 1)}
          onClick={e => changePage(e, index)}
        >
          {page}
        </span>
      );
    });

    return <div className="pagination">{renderPages}</div>;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getGithubIssues: data => dispatch(getGithubIssues(data))
  };
}

const mapStateToProps = state => ({
  currentPage: state.githubReducer.currentPage,
  pages: state.githubReducer.pageCount
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pagination);

// export default Pagination;
