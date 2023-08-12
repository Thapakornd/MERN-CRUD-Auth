import { Button, Container, FormControl, TextField } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const CreatePost = () => {
  const navigate = useNavigate();
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

  const back = () => {
    navigate('/lounge', {replace: true});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const author = auth.user;

        const response = await axiosPrivate.post('/posts/create',
            JSON.stringify({ title, author , content})
        )
        navigate('/lounge', { replace: true })
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <Container>
      <h1>Create Post</h1>
      <Container
        sx={{
            width: "75%",
          margin: "5% auto",
          backgroundColor: "#444950",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <Container
          sx={{
            backgroundColor: "white",
            color: "black",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <FormControl
            variant="filled"
            fullWidth
            sx={{
              gridGap: "10px",
            }}
          >
            <TextField
              label="Title"
              variant="filled"
              placeholder="Your Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              label="Content"
              variant="filled"
              minRows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              multiline
              placeholder="Your content"
            />
            <Button variant="contained" color="success" onClick={handleSubmit}>
              Create
            </Button>
          </FormControl>
        </Container>
      </Container>
      <Button
        variant="contained"
        sx={{
          fontSize: "18px",
        }}
        onClick={back}
      >
        Back
      </Button>
    </Container>
  );
};

export default CreatePost;
