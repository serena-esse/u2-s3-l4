import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/esm/Spinner";
import { BiSolidCategory } from "react-icons/bi";
import { FaPen } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

export default function Singlearticle() {
  const { id } = useParams();
  const [artic, setArtic] = useState([]);
  const [media, setMedia] = useState("");
  const [autor, setautor] = useState("");
  const [category, setcategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await axios.get("http://localhost/Esercizi/U2-S3-L2/wordpress/wp-json/wp/v2/posts/" + id);
        setArtic(postData.data);

        const mediaData = await axios.get(
          "http://localhost/Esercizi/U2-S3-L2/wordpress/wp-json/wp/v2/media/" + postData.data.featured_media
        );
        setMedia(mediaData.data);

        const mediaauth = await axios.get(
          "http://localhost/Esercizi/U2-S3-L2/wordpress/wp-json/wp/v2/users/" + postData.data.author
        );
        setautor(mediaauth.data);

        const category = await axios.get(
          "http://localhost/Esercizi/U2-S3-L2/wordpress/wp-json/wp/v2/categories/" + postData.data.categories
        );
        setcategory(category.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(autor);
  console.log(artic);
  console.log(category);

  return (
    <>
      <Container className="my-5">
        {loading ? (
          <div className="mx-auto text-center">
            {" "}
            <Spinner animation="grow" variant="success" />
          </div>
        ) : (
          <Card className="text-center">
            <Card.Header>
              {" "}
              <div className="w-50 mx-auto">
                {" "}
                <img className="w-100" src={media.source_url} alt="" />
              </div>
            </Card.Header>
            <Card.Footer className="text-muted">
              <p className="text-start">
                <FaUser className="me-1" /> Di{" "}
                <span className="linkstyle" onClick={() => navigate("/authorpage/" + autor.id)}>
                  {autor.name}
                </span>{" "}
                / {artic.modified.substring(0, 10)}
              </p>
              <p className="text-start">
                <BiSolidCategory className="me-1" />
                Categoria : {category.name}
              </p>
              <p className="text-start">
                <FaPen className="me-1" />
                Ultima modifica : {artic.modified.substring(0, 10)}
              </p>
            </Card.Footer>
            <Card.Body>
              <Card.Title>
                <h1 className=" font-size-2" dangerouslySetInnerHTML={{ __html: artic.title.rendered }} />
              </Card.Title>

              <Card.Text>
                <p dangerouslySetInnerHTML={{ __html: artic.content.rendered }} />
              </Card.Text>
              <Button variant="primary" onClick={() => navigate("/")}>
                Torna idietro
              </Button>
            </Card.Body>
            <Card.Footer className="text-muted">{artic.modified.substring(0, 10)}</Card.Footer>
          </Card>
        )}
      </Container>
    </>
  );
}
