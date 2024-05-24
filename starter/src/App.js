import "./App.css";
import React, { useEffect, useState } from "react";
import ListBook from "./ListBook";
import SearchBook from "./SearchBook";
import { getAll, search, update } from "./BooksAPI";
import { isEmpty, reduce, filter, concat } from "lodash";
import Modal from "react-modal";

const App = () => {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [listBook, setListBook] = useState();
  const [listBookSearch, setListBookSearch] = useState();
  const [listBookSearchDisplay, setListBookSearchDisplay] = useState();
  const [modalStatus, setModalStatus] = useState(false);

  const handleShowSearchPage = () => {
    setShowSearchpage(!showSearchPage);
    setListBookSearchDisplay(null);
  };

  const handleSearchBook = async (query) => {
    const resultList = await search(query);
    if (!isEmpty(resultList)) {
      setListBookSearch(resultList);
    }
  };

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
          if (isEmpty(bookAdded)) {
            return concat(result || [], bookInfo);
          }
          return result;
        },
        []
      );
      setListBookSearchDisplay(newListBookSearch);
    }
  }, [listBook, listBookSearch]);

  return (
    <div className="app">
      {showSearchPage ? (
        <SearchBook
          addBookself={addBookself}
          handleSearchBook={handleSearchBook}
          listBookSearch={listBookSearchDisplay}
          handleShowSearchPage={handleShowSearchPage}
        />
      ) : (
        <ListBook
          listBook={listBook}
          updateBookself={updateBookself}
          handleShowSearchPage={handleShowSearchPage}
        />
      )}
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

export default App;
