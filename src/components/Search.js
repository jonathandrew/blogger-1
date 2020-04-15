import React from "react";
import PropTypes from "prop-types";
const Search = (props) => {
  return (
    <div>
      <form className="ui form">
        <div className="field">
          <input
            onChange={props.handleChange}
            type="text"
            placeholder="Search By Subject..."
            value={props.searchTerm}
          />
        </div>
      </form>
    </div>
  );
};
Search.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string.isRequired,
};

export default Search;
