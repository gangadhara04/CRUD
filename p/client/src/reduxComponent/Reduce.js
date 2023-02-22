import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    SET_CURRENT_PAGE,
    SET_SEARCH_QUERY
  } from './Action';
  
  const initialState = {
    users: [],
    isLoading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    searchQuery: ''
  };
  
  const usersReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_USERS_REQUEST:
        return {
          ...state,
          isLoading: true,
          error: null
        };
      case FETCH_USERS_SUCCESS:
        return {
          ...state,
          isLoading: false,
          users: action.payload,
          totalPages: Math.ceil(action.payload.length / 5)
        };
      case FETCH_USERS_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.payload
        };
      case SET_CURRENT_PAGE:
        return {
          ...state,
          currentPage: action.payload
        };
      case SET_SEARCH_QUERY:
        return {
          ...state,
          searchQuery: action.payload,
          currentPage: 1
        };
      default:
        return state;
    }
  };
  
  export default usersReducer;
  