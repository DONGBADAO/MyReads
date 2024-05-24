const api = "https://reactnd-books-api.udacity.com";

let token = localStorage.token;

if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
  Accept: "application/json",
  Authorization: token,
};

export const get = (bookId) => {
  try {
    return fetch(`${api}/books/${bookId}`, { headers })
      .then((res) => res.json())
      .then((data) => data.book);
  } catch (error) {
    console.error("get - Error fetching data:", error);
  }
};

export const getAll = () => {
  try {
    return fetch(`${api}/books`, { headers })
      .then((res) => res.json())
      .then((data) => data.books);
  } catch (error) {
    console.error("getAll - Error fetching data:", error);
  }
};

export const update = (book, shelf) => {
  try {
    return fetch(`${api}/books/${book.id}`, {
      method: "PUT",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shelf }),
    }).then((res) => res.json());
  } catch (error) {
    console.error("update - Error fetching data:", error);
  }
};

export const search = (query, maxResults) => {
  try {
    return fetch(`${api}/search`, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, maxResults }),
    })
      .then((res) => res.json())
      .then((data) => data.books);
  } catch (error) {
    console.error("search - Error fetching data:", error);
  }
};
  
