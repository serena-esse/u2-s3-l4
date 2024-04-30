import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { baseApiUrl } from "../constants.js";

export default function Homepage() {
  const [data, setData] = useState([]);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(6);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const documentazione = await axios.get("http://localhost/Esercizi/U2-S3-L2/wordpress/wp-json/wp/v2/");
        console.log(documentazione.data);

        const totalCountResponse = await axios.get("http://localhost/Esercizi/U2-S3-L2/wordpress/wp-json/wp/v2/posts");
        const totalCount = totalCountResponse.headers["x-wp-total"];

        const totalPages = Math.ceil(totalCount / perPage);

        setPage((prevPage) => Math.min(Math.max(prevPage, 1), totalPages));

        const postData = await axios.get(
          `http://localhost/Esercizi/U2-S3-L2/wordpress/wp-json/wp/v2/posts?per_page=${perPage}&page=${page}`
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
  }, [page, perPage]);

  const deletePost = async (postId) => {
    try {
      const authString = "serena:wxVu zOYk bFFN ewge cJ70 zOWx";
      const encodedAuthString = btoa(authString);
      const response = await fetch(`http://localhost/Esercizi/U2-S3-L2/wordpress/wp-json/wp/v2/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${encodedAuthString}`,
        },
      });
      if (!response.ok) {
        throw new Error("Errore durante l'eliminazione del post");
      }
      setData(data.filter((article) => article.id !== postId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <Container>
      <h1 className="text-center my-5">Articoli</h1>
      {loading ? (
        <div className="mx-auto text-center">
          {" "}
          <Spinner animation="grow" variant="primary" />
        </div>
      ) : (
        <>
          <div className="row">
            {data.map((post) => {
              const featuredMedia = media.find((mediaItem) => mediaItem.id === post.featured_media);
              const imageUrl = featuredMedia ? featuredMedia.source_url : null;

              return (
                <Card className="col-md-4 m-3 p-2" key={post.id} style={{ width: "18rem" }}>
                  {imageUrl && <Card.Img variant="top" src={imageUrl} />}
                  <Card.Body>
                    <Card.Title>
                      <h4 className=" font-size-2" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                    </Card.Title>
                    <Card.Text>
                      <p className=" font-size-2" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                    </Card.Text>
                    <>
                      <Button variant="primary" onClick={() => navigate("/article/" + post.id)}>
                        Leggi tutto
                      </Button>
                      <Button className="btn btn-danger" onClick={() => deletePost(post.id)}>
                        Delete
                      </Button>
                    </>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
          <div className="text-center mt-4">
            <Button variant="primary" onClick={handlePrevPage} disabled={page === 1}>
              Pagina Precedente
            </Button>{" "}
            <Button variant="primary" onClick={handleNextPage}>
              Pagina Successiva
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}
