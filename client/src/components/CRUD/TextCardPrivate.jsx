import React from "react";
import TextCard from "./TextCard";
import { AccordionActions, Button, Stack } from "@mui/material";

const TextCardPrivate = ({ post, id }) => {
  return (
    <Stack direction='row'>
      <TextCard key={id} post={post} />
      <AccordionActions>
        <Button variant="outlined" color="success">Edit</Button>
        <Button variant="outlined" color="warning">Delete</Button>
      </AccordionActions>
    </Stack>
  );
};

export default TextCardPrivate;
