import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

export default function Categorypage() {
  const [category, setcategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const autor = await axios.get("http://localhost/Esercizi/U2-S3-L2/wordpress/wp-json/wp/v2/categories");
        setcategory(autor.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(category);

  return (
    <>
      <Container>
        {error !== "" ? <h1>{error}</h1> : null}
        <div className="my-5 d-flex flex-wrap ">
          {loading ? (
            <div className="mx-auto text-center">
              <Spinner animation="grow" variant="primary" />
            </div>
          ) : (
            category.map((category) => (
              <Card className="my-3 catcardit" key={category.id} style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>{category.name}</Card.Title>
                  <Card.Text>{category.description === "" ? "Descrizione categoria" : category.description}</Card.Text>
                  <Button variant="primary" onClick={() => navigate(`/singlecategory/${category.id}`)}>
                    Vai
                  </Button>
                </Card.Body>
              </Card>
            ))
          )}
        </div>
      </Container>
    </>
  );
}
