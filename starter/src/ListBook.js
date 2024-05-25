import "./App.css";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Bookshelf from "./Bookshelf";
import { filter, isEmpty } from "lodash";
import { getAll, update } from "./BooksAPI";
import { Link } from "react-router-dom";
import { SEARCH_PAGE } from "./AppRoutes";

const ListBook = () => {
  const [listBook, setListBook] = useState();
  const [listCurrentReading, setListCurrentReading] = useState([]);
  const [listWantToRead, setListWantToRead] = useState([]);
  const [listRead, setListRead] = useState([]);

  const getAllBook = async () => {
    const allBook = await getAll();
    if (!isEmpty(allBook)) {
      setListBook(allBook);
    }
  };

  const updateBookself = async (book, shelf) => {
    const allBook = await update(book, shelf);
    if (!isEmpty(allBook)) {
      getAllBook();
    }
  };

  useEffect(() => {
    getAllBook();
  }, []);

  useEffect(() => {
    if (!isEmpty(listBook)) {
      const listReading = filter(listBook, ["shelf", "currentlyReading"]);
      setListCurrentReading(listReading);

      const listWantToRead = filter(listBook, ["shelf", "wantToRead"]);
      setListWantToRead(listWantToRead);

      const listRead = filter(listBook, ["shelf", "read"]);
      setListRead(listRead);
    }
  }, [listBook]);

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        {!isEmpty(listCurrentReading) && (
          <Bookshelf
            bookshelfTitle="Currently Reading"
            listBook={listCurrentReading}
            handleUpdateBookself={updateBookself}
          />
        )}
        {!isEmpty(listWantToRead) && (
          <Bookshelf
            bookshelfTitle="Want to Read"
            listBook={listWantToRead}
            handleUpdateBookself={updateBookself}
          />
        )}
        {!isEmpty(listRead) && (
          <Bookshelf
            bookshelfTitle="Read"
            listBook={listRead}
            handleUpdateBookself={updateBookself}
          />
        )}
      </div>
      <div className="open-search">
        <Link to={SEARCH_PAGE}>Add a book</Link>
      </div>
    </div>
  );
};

ListBook.propTypes = {
  listBook: PropTypes.array,
  updateBookself: PropTypes.func,
  handleShowSearchPage: PropTypes.func,
};

export default ListBook;
