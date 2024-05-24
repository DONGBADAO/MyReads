import "./App.css";
import React from "react";
import PropTypes from "prop-types";
import { map } from "lodash";

const Bookshelf = (props) => {
  const { listBook, currentShelf, bookshelfTitle, handleUpdateBookself } = props;

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{bookshelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {map(listBook, (bookInfo) => {
            const { id, title, authors, imageLinks, shelf } = bookInfo;
            return (
              <li key={id}>
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url("${imageLinks?.thumbnail}")`,
                      }}
                    ></div>
                    <div className="book-shelf-changer">
                      <select
                        value={currentShelf || shelf}
                        onChange={(e) =>
                          handleUpdateBookself(bookInfo, e.target.value)
                        }
                      >
                        <option value="none" disabled>
                          Move to...
                        </option>
                        <option value="currentlyReading">
                          Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{title}</div>
                  <div className="book-authors">
                    {map(authors, (auth) => (
                      <p key={`${auth}_${id}`} className="mt-0">
                        {auth}
                      </p>
                    ))}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

Bookshelf.propTypes = {
  listBook: PropTypes.array,
  currentShelf: PropTypes.string,
  bookshelfTitle: PropTypes.string,
  handleUpdateBookself: PropTypes.func,
};

export default Bookshelf;
