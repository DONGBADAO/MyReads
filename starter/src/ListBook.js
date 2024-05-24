import "./App.css";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Bookshelf from "./Bookshelf";
import { filter, isEmpty } from "lodash";

const ListBook = (props) => {
  const { listBook, updateBookself, handleShowSearchPage } = props;

  const [listCurrentReading, setListCurrentReading] = useState([]);
  const [listWantToRead, setListWantToRead] = useState([]);
  const [listRead, setListRead] = useState([]);

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
        <button onClick={() => handleShowSearchPage()}>Add a book</button>
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
