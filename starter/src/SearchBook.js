import "./App.css";
import React, { useEffect, useState } from "react";
import Bookshelf from "./Bookshelf";
import { isEmpty, reduce, filter, concat } from "lodash";
import { getAll, search, update } from "./BooksAPI";
import { Link } from "react-router-dom";
import { HOME_PAGE } from "./AppRoutes";
import Modal from "react-modal";

const SearchBook = () => {
  const [query, setQuery] = useState("");
  const [listBook, setListBook] = useState();
  const [modalStatus, setModalStatus] = useState(false);
  const [listBookSearch, setListBookSearch] = useState();
  const [listBookSearchDisplay, setListBookSearchDisplay] = useState([]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const getAllBook = async () => {
    const allBook = await getAll();
    if (!isEmpty(allBook)) {
      setListBook(allBook);
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
    let typingTimer = null;
    clearTimeout(typingTimer);

    typingTimer = setTimeout(async () => {
      if (!isEmpty(query)) {
        const resultList = await search(query);
        if (resultList && !resultList.error) {
          setListBookSearch(resultList);
        } else {
          setListBookSearchDisplay([]);
        }
      } else {
        setListBookSearchDisplay([]);
      }
    }, 500);

    return () => {
      clearTimeout(typingTimer);
    };
  }, [query]);

  useEffect(() => {
    if (isEmpty(listBook) && !isEmpty(listBookSearch)) {
      setListBookSearchDisplay(listBookSearch);
    } else if (!isEmpty(listBookSearch)) {
      const newListBookSearch = reduce(
        listBookSearch,
        (result, bookInfo) => {
          if (
            !isEmpty(bookInfo?.imageLinks?.thumbnail) &&
            !isEmpty(bookInfo?.authors)
          ) {
            const bookAdded = filter(listBook, ["id", bookInfo.id]);
            if (!isEmpty(bookAdded)) {
              return concat(result || [], bookAdded);
            }
            return concat(result || [], bookInfo);
          }
          return result || [];
        },
        []
      );
      setListBookSearchDisplay(newListBookSearch);
    } else {
      setListBookSearchDisplay([]);
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
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search by title, author, or ISBN"
          />
        </div>
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
        appElement={document.getElementById("root")}
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
