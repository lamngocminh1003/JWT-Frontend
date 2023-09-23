import ReactPaginate from "react-paginate";
import React, { useState, useEffect } from "react";
const Pagination = (props) => {
  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
    await fetchUsers();
  };
  let { totalPages, fetchUsers, setCurrentPage } = props;
  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={totalPages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        marginPagesDisplayed={2}
      />
    </>
  );
};
export default Pagination;
