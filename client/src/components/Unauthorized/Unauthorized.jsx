import React from "react";
import "./Unauthorized.scss";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";

const Unauthorized = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <div className="unauth">
      <h1>Unauthorized</h1>
      <p>You do not have access to the requested page.</p>
      <Container sx={{
        gridGap: "20px",
        display: 'flex',
      }}>
        <Button onClick={goBack}>Go Back</Button>
        <Button onClick={() => navigate("/lounge")} color="success" >Lounge</Button>
      </Container>
    </div>
  );
};

export default Unauthorized;
