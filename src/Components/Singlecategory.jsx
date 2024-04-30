import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/esm/Spinner";

export default function Singlecategorypage() {
  const { id } = useParams();
  const [cat, setcat] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  console.log(cat);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cat = await axios.get(
          "http://localhost/Esercizi/U2-S3-L2/wordpress/wp-json/wp/v2/posts?categories=" + id
        );
        setcat(cat.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  });

  return (
    <Container>
      {error !== "" ? <h1>{error}</h1> : null}
      <h1 className="text-center my-5">Articoli contenuti in questa categoria categoria </h1>
      <div className="my-5 d-flex flex-wrap ">
        {loading ? (
          <div className="mx-auto text-center">
            <Spinner animation="grow" variant="success" />
          </div>
        ) : (
          cat.map((category) => (
            <Card className="my-3 catcardit" key={category.id} style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{category.title.rendered}</Card.Title>
                <Card.Text dangerouslySetInnerHTML={{ __html: category.excerpt.rendered }} />

                <Button variant="primary" onClick={() => navigate(`/article/${category.id}`)}>
                  Leggi tutto
                </Button>
              </Card.Body>
            </Card>
          ))
        )}
      </div>
    </Container>
  );
}
