import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/esm/Spinner";

export default function Userpage() {
  const [autor, setautor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const autor = await axios.get("http://localhost/Esercizi/U2-S3-L2/wordpress/wp-json/wp/v2/users/");
        setautor(autor.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(autor);

  return (
    <Container>
      {" "}
      <h1 className="text-center my-5">Tutti gli utenti</h1>
      {loading ? (
        <div className="mx-auto text-center">
          {" "}
          <Spinner animation="grow" variant="success" />
        </div>
      ) : (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Immagine</th>
              <th>ID</th>
              <th>Nome</th>
              <th>Dettaglio</th>
            </tr>
          </thead>
          <tbody>
            {autor.map((e) => (
              <tr>
                <td>
                  <img className="w-25" src={e.avatar_urls[96]} alt="" />
                </td>
                <td>{e.id}</td>
                <td>{e.name}</td>

                <td>
                  {" "}
                  <Button onClick={() => navigate(`/authorpage/${e.id}`)}>Visualizza dettaglio profilo</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
