import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import Bookshelf from "./Bookshelf";
import { isEmpty, reduce, filter, concat } from "lodash";
import { getAll, search, update } from "./BooksAPI";
import { Link } from "react-router-dom";
import { HOME_PAGE } from "./AppRoutes";
import Modal from "react-modal";

const SearchBook = () => {
  const inputRef = useRef(null);
  const [listBook, setListBook] = useState();
  const [modalStatus, setModalStatus] = useState(false);
  const [listBookSearch, setListBookSearch] = useState();
  const [listBookSearchDisplay, setListBookSearchDisplay] = useState();

  const getAllBook = async () => {
    const allBook = await getAll();
    if (!isEmpty(allBook)) {
      setListBook(allBook);
    }
  };

  const handleSearchBook = async (query) => {
    const resultList = await search(query);
    if (!isEmpty(resultList)) {
      setListBookSearch(resultList);
    }
  };

  const addBookself = async (book, shelf) => {
    const allBook = await update(book, shelf);
    if (!isEmpty(allBook)) {
      getAllBook();
      setModalStatus(!modalStatus);
    }
  };

  useEffect(() => {
    getAllBook();
  }, []);

  useEffect(() => {
    if (!isEmpty(listBook) && !isEmpty(listBookSearch)) {
      const newListBookSearch = reduce(
        listBookSearch,
        (result, bookInfo) => {
          const bookAdded = filter(listBook, ["id", bookInfo.id]);
          if (!isEmpty(bookAdded)) {
            return concat(result || [], bookAdded);
          }
          return concat(result || [], bookInfo);
        },
        []
      );
      setListBookSearchDisplay(newListBookSearch);
    }
  }, [listBook, listBookSearch]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to={HOME_PAGE}>
          Close
        </Link>
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
        {!isEmpty(listBookSearchDisplay) && (
          <Bookshelf
            bookshelfTitle="Search results"
            listBook={listBookSearchDisplay}
            handleUpdateBookself={addBookself}
          />
        )}
      </div>
      <Modal
        isOpen={modalStatus}
        contentLabel="Status Modal"
        onRequestClose={() => setModalStatus(!modalStatus)}
      >
        <h2>SUCCESS</h2>
        <p>You have successfully added the book to the bookshelf!</p>
        <button onClick={() => setModalStatus(!modalStatus)}>Close</button>
      </Modal>
    </div>
  );
};

export default SearchBook;
