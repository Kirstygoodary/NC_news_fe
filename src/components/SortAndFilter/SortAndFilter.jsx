import React from "react";

const SortAndFilter = props => {
  console.log(props, "props in sort and filter");
  return (
    <div>
      <form>
        Filter By:{" "}
        <label>
          <button value="cooking" onClick={props.handleClick}>
            Cooking
          </button>

          <button value="coding" onClick={props.handleClick}>
            Coding
          </button>

          <button value="football" onClick={props.handleClick}>
            Football
          </button>
        </label>
      </form>
      <form>
        Sort By:{" "}
        <label className="filter_and_sort">
          {" "}
          <button value="created_at" onClick={props.handleFilter}>
            Date
          </button>
          <button value="comment_count" onClick={props.handleFilter}>
            Comment count
          </button>
          <button value="votes" onClick={props.handleFilter}>
            Votes
          </button>
        </label>
      </form>
    </div>
  );
};

export default SortAndFilter;
