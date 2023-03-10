import React, { useState, useEffect } from "react";
import { Form, Button, Container, Card, Col, Row } from "react-bootstrap";
import './App.css';

function Apinews() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("Trending");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
    setQuery(event.target.elements.search.value);
  };

  return (
<div id="home">
      <Container
        style={{
          width: "400px",
          margin: "10px auto 0",
          padding: "10px",
          backgroundColor: "blue"
        }}
      >
        <Form className="d-flex" onSubmit={handleSearch}>
          <Form.Control
            type="text"
            aria-label="Search"
            placeholder="Search"
            onChange={(event) =>
              this.setState({ searchTerm: event.target.value })
            }
          ></Form.Control>
          <Button type="submit" variant="outline-primary">
            Search
          </Button>
        </Form>
      </Container>
      <Container>
        <Row>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            articles.map((article) => (
              <Col className="md-4 my-5">
                <Card key={article.title}>
                  <Card.Img src={article.image} />
                  <Card.Body>
                    <Card.Title>{article.title}</Card.Title>
                    <Card.Text>{article.description}</Card.Text>
                    <a href={article.url}>Show Detail</a>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
        {error && <p>{error.message}</p>}
      </Container>
</div>

    // <div>
    //   <form onSubmit={handleSearch}>
    //     <input type="text" name="search" />
    //     <button type="submit">Search</button>
    //   </form>
    //   {isLoading ? (
    //     <p>Loading...</p>
    //   ) : (
    //     articles.map((article) => (
    //       <div key={article.id}>
    //         <h2>{article.title}</h2>
    //         <p>{article.description}</p>
    //       </div>
    //     ))
    //   )}
    //   {error && <p>{error.message}</p>}
    // </div>
  );
}

export default Apinews;