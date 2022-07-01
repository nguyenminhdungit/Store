import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import PropTypes from 'prop-types';

PaginationList.propTypes = {};

function PaginationList({ pagination = {} }) {
  const handlePagination = () => {};
  return (
    <div className="pagination">
      <Pagination
        onChange={handlePagination}
        // className={classes.pagination}
        count={Math.ceil(pagination.total / pagination._limit)}
        variant="outlined"
        page={pagination._page}
        shape="rounded"
      />
    </div>
  );
}

export default PaginationList;
