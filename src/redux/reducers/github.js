const githubReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ISSUES":
      return {
        ...state,
        issues: action.payload,
        currentPage: action.currentPage
      };

    case "GET_PAGES_COUNT":
      return { ...state, pageCount: action.payload };

    case "GET_SINGLE_ISSUE":
      return { ...state, issueDetails: action.payload };

    case "GET_ISSUE_COMMENTS":
      return { ...state, issueComments: action.payload };

    default:
      return state;
  }
};

export default githubReducer;
