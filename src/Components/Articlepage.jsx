import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Singlearticle from "./Singlearticle";

export default function Articlepage() {
  const { id } = useParams();
  console.log(id);
  return <Singlearticle />;
}
