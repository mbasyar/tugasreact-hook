import React, { useState, useEffect } from "react";
import Isloading from "./isloading";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("Trending");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://gnews.io/api/v4/search?q=${query}&lang=en&country=us&max=10&apikey=de6c315e52d7534595e6734df65e360c`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong...");
        }
      })
      .then((data) => {
        setArticles(data.articles);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [query]);

  const handleSearch = (event) => {
    event.preventDefault();
    setQuery(input);
  };

  return (
    <div className="content__container">
      <div>
        <form class="input-container" onSubmit={handleSearch}>
          <input
            type="text"
            className="input"
            placeholder="search..."
            onChange={(event) => setInput(event.target.value)}
          />
          <button className="icon" type="submit">
            <svg
              width="19px"
              height="19px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  opacity="1"
                  d="M14 5H20"
                  stroke="#000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  opacity="1"
                  d="M14 8H17"
                  stroke="#000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2"
                  stroke="#000"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  opacity="1"
                  d="M22 22L20 20"
                  stroke="#000"
                  stroke-width="3.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </button>
        </form>
      </div>

      <div className="row">
        {isLoading ? (
          <Isloading />
        ) : (
          articles.map((article, index) => (
            <div className="col" key={index}>
              <div className="card">
                <img className="image" src={article.image} />
                <div className="content">
                  <span className="title">{article.title}</span>

                  <p className="desc">{article.description}</p>

                  <a href={article.url} className="action">
                    Find out more
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default News;