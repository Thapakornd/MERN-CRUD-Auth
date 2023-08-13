import React from "react";
import TextCard from "./TextCard";
import { AccordionActions, Button, Stack } from "@mui/material";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

const TextCardPrivate = ({ post, id }) => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate(`/updatepost/${post._id}`)
  }

  const handleDelete = async () => {
    try {
      const response = await axiosPrivate.delete(`/posts/${post._id}`)
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Stack direction='row'>
      <TextCard key={id} post={post} />
      <AccordionActions>
        <Button variant="outlined" color="success" onClick={handleUpdate}>Edit</Button>
        <Button variant="outlined" color="warning" onClick={handleDelete}>Delete</Button>
      </AccordionActions>
    </Stack>
  );
};

export default TextCardPrivate;
