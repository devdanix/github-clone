export const getGithubIssues = page => dispatch => {
  fetch(
    "https://api.github.com/repos/facebook/create-react-app/issues?state=open&page=" +
      page
  )
    .then(result => result.json())
    .then(result =>
      dispatch({
        type: "GET_ISSUES",
        payload: result,
        currentPage: page
      })
    );
};

export const getTotalPagesCount = () => dispatch => {
  fetch("https://api.github.com/repos/facebook/create-react-app")
    .then(result => result.json())
    .then(result =>
      dispatch({
        type: "GET_PAGES_COUNT",
        payload: result
      })
    );
};

export const getSingleIssues = number => async dispatch => {
  await fetch(
    "https://api.github.com/repos/facebook/create-react-app/issues/" + number
  )
    .then(result => result.json())
    .then(result =>
      dispatch({
        type: "GET_SINGLE_ISSUE",
        payload: result
      })
    );
};

export const getIssueComments = number => async dispatch => {
  await fetch(
    "https://api.github.com/repos/facebook/create-react-app/issues/" +
      number +
      "/comments"
  )
    .then(result => result.json())
    .then(result =>
      dispatch({
        type: "GET_ISSUE_COMMENTS",
        payload: result
      })
    );
};
