import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";

export default function Searchpage() {
  const [data, setData] = useState([]);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { id } = useParams();

  const navigate = useNavigate();
  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await axios.get(
          "http://localhost/Esercizi/U2-S3-L2/wordpress/wp-json/wp/v2/search/?search=" + id
        );
        setData(postData.data);

        const mediaData = await axios.get("http://localhost/Esercizi/U2-S3-L2/wordpress/wp-json/wp/v2/media/");
        setMedia(mediaData.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(data);

  return (
    <>
      <Container>
        <h1 className="text-center my-5">Risultati di ricerca</h1>
        {loading ? (
          <div className="mx-auto text-center">
            {" "}
            <Spinner animation="grow" variant="success" />
          </div>
        ) : (
          <ListGroup>
            {data.map((post) => (
              <ListGroup.Item className="d-flex justify-content-between">
                {post.title} <Button onClick={() => navigate("/article/" + post.id)}>Leggi tutto</Button>
              </ListGroup.Item>
            ))}
            {data.length === 0 && (
              <ListGroup.Item className="d-flex justify-content-between">
                Nessun risultato corrispondente
              </ListGroup.Item>
            )}
          </ListGroup>
        )}
      </Container>
    </>
  );
}
