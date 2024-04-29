import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Singlearticle from "../Components/Singlearticle";

export default function Articlepage() {
  const { id } = useParams();
  console.log(id);
  return <Singlearticle />;
}
