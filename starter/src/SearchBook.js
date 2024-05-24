import "./App.css";
import React, { useRef } from "react";
import PropTypes from "prop-types";
import Bookshelf from "./Bookshelf";
import { isEmpty } from "lodash";

const SearchBook = (props) => {
  const {
    handleShowSearchPage,
    handleSearchBook,
    listBookSearch,
    addBookself,
  } = props;
  const inputRef = useRef(null);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <button className="close-search" onClick={() => handleShowSearchPage()}>
          Close
        </button>
        <div className="search-books-input-wrapper">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by title, author, or ISBN"
          />
        </div>
        <button
          className="btn-search"
          onClick={() => handleSearchBook(inputRef.current.value)}
        >
          Search
        </button>
      </div>
      <div className="search-books-results">
        {!isEmpty(listBookSearch) && (
          <Bookshelf
            currentShelf="none"
            bookshelfTitle="Search results"
            listBook={listBookSearch}
            handleUpdateBookself={addBookself}
          />
        )}
      </div>
    </div>
  );
};

SearchBook.propTypes = {
  updateBookself: PropTypes.func,
  listBookSearch: PropTypes.array,
  handleSearchBook: PropTypes.func,
  handleShowSearchPage: PropTypes.func,
};

export default SearchBook;
