import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  setCurrentPage,
  setSearchQuery,
} from "../reduxComponent/Action";
import { Link } from "react-router-dom";

const RecordList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const isLoading = useSelector((state) => state.isLoading);
  const error = useSelector((state) => state.error);
  const currentPage = useSelector((state) => state.currentPage);
  const totalPages = useSelector((state) => state.totalPages);
  const searchQuery = useSelector((state) => state.searchQuery);

  useEffect(() => {
    dispatch(fetchUsersRequest());

    fetch("http://localhost:5000/record/")
      .then((response) => response.json())
      .then((data) => dispatch(fetchUsersSuccess(data.result)))
      .catch((error) => dispatch(fetchUsersFailure(error)));
  },[]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.includes(searchQuery) ||
      user.email.includes(searchQuery) ||
      user.mob.includes(searchQuery)
  );
  console.log(filteredUsers);
  const startIndex = (currentPage - 1) * 5;
  const endIndex = startIndex + 5;
  const displayedUsers = filteredUsers.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    dispatch(setCurrentPage(currentPage - 1));
  };

  const handleNextPage = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };
  let handlePageClick = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handleSearch = (event) => {
    dispatch(setSearchQuery(event.target.value.trim()));
  };

  return (
    <div>
     <div className="form-outline mb-2 w-50">
     <input
     className="form-control"
     type="text"
     value={searchQuery}
     onChange={handleSearch}
     placeholder={"Search here"}
   />
   <label className="form-label"></label>
     </div>
     

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!isLoading && !error && (
        <div>
          <div className="table-responsive">
            <table className="table table-bordered ">
              <thead>
                <tr
                  className="text-center text-info bg-light"
                  style={{ fontSize: "25px" }}
                >
                  <th>Id</th>
                  <th style={{ width: "20%" }}>Name</th>
                  <th style={{ width: "30%" }}>Email</th>
                  <th>Mobile-No</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {displayedUsers.map((e, i) => {
                  return (
                    <tr key={e.i}>
                      <td>{e.id}</td>
                      <td>{e.name}</td>
                      <td>{e.email}</td>
                      <td>{e.mob}</td>
                      <td>
                        <button className="btn btn-outline-secondary">
                          <Link className="text-black text-decoration-none" to={`/edit/${e._id}`}>
                            Edit
                          </Link>
                        </button>
                      </td>
                      <td>
                        <button className="btn btn-outline-danger">
                          <Link className="text-decoration-none text-black" to={`/remove/${e._id}`}>Delete</Link>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              {currentPage > 1 && (
                <button className="page-link" onClick={handlePrevPage}>Previous</button>
              )}
              {Array.from(Array(totalPages).keys()).map((page) => {
                return (
                  <button className="page-link" onClick={() => handlePageClick(page + 1)}>
                    {page + 1}
                  </button>
                );
              })}
              {currentPage < totalPages && (
                <button className="page-link" onClick={handleNextPage}>Next</button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecordList;
