import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

export default function Homepage() {
  const [data, setData] = useState([]);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Documentazione = await axios.get("http://localhost/Esercizi/U2-S3-L2/wordpress/wp-json/wp/v2/");
        console.log(Documentazione.data);

        const postData = await axios.get("http://localhost/Esercizi/U2-S3-L2/wordpress/wp-json/wp/v2/posts");
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

  return (
    <>
      <Container>
        <h1 className="text-center my-5">Tutti gli articoli</h1>
        {loading ? (
          <div className="mx-auto text-center">
            {" "}
            <Spinner animation="grow" variant="primary" />
          </div>
        ) : (
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
                    {
                      <Button variant="primary" onClick={() => navigate("/article/" + post.id)}>
                        Leggi tutto
                      </Button>
                    }
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        )}
      </Container>
    </>
  );
}
