import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
  Typography,
} from "@mui/material";
import React from "react";
import { ExpandMoreOutlined } from "@mui/icons-material";

const TextCard = ({ post }) => { 
  return (
    <Container sx={{
        margin: "5px 0"
    }}>
      <Accordion
        sx={{
          backgroundColor: "#444950",
          color: "lightgreen",
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
          <Typography>{post.title}</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            color: "white",
            backgroundColor: "#0c0e12",
          }}
        >
          <Typography>{post.content}</Typography>
          <Typography
            sx={{
            color: "#90ff8d",
              backgroundColor: "#000000",
              borderRadius: "10px",
              padding: "8px",
              margin: "10px auto",
            }}
        
          >
            Author: {post.author}<br />
            Create At: {post.createdAt}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default TextCard;
