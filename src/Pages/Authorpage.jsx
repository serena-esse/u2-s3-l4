import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/esm/Spinner";
import { Row, Col } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";

export default function Authorpage() {
  const { id } = useParams();
  const [autor, setautor] = useState([]);
  const [article, setarticle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const autor = await axios.get("http://localhost/Esercizi/U2-S3-L2/wordpress/wp-json/wp/v2/users/" + id);
        setautor(autor.data);

        const article = await axios.get("http://localhostEsercizi/U2-S3-L2/wordpress/wp-json/wp/v2/posts?author=" + id);
        setarticle(article.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(article);
  return (
    <Container>
      <h1 className="text-center my-5">Dettaglio del Profilo</h1>
      {loading ? (
        <div className="mx-auto text-center">
          {" "}
          <Spinner animation="grow" variant="success" />
        </div>
      ) : (
        <Row>
          <Col md={6}>
            <h2 className="text-success">Immagine del profilo</h2>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={autor.avatar_urls[96]} />
              <Card.Body>
                <Card.Title>{autor.name}</Card.Title>
                <Card.Text>{autor.description}</Card.Text>
              </Card.Body>
            </Card>{" "}
          </Col>
          <Col md={6}>
            <h2 className="text-success">Articoli di {autor.name}</h2>
            {article.map((e) => (
              <Card className="text-center my-3">
                <Card.Header></Card.Header>
                <Card.Body>
                  <Card.Title dangerouslySetInnerHTML={{ __html: e.title.rendered }} />
                  <Card.Text dangerouslySetInnerHTML={{ __html: e.content.rendered }} />

                  <Button variant="primary" onClick={() => navigate("/article/" + e.id)}>
                    Visualizza tutto
                  </Button>
                </Card.Body>
                <Card.Footer className="text-muted">{e.modified.substring(0, 10)}</Card.Footer>
              </Card>
            ))}
          </Col>
        </Row>
      )}
      <div className="d-flex justify-content-center my-5">
        <Button className=" w-25  m-auto" variant="primary" onClick={() => navigate(-1)}>
          Torna indietro
        </Button>
      </div>
    </Container>
  );
}
