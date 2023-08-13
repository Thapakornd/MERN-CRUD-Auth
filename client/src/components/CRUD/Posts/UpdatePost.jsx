import React, { useEffect } from "react";
import { Container, FormControl, TextField, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useState } from "react";

const UpdatePost = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const back = () => {
    navigate(-1, { replace: true });
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getData = async () => {
      try {
        const response = await axiosPrivate.get(`/posts/${id}`,{
          signal: controller.signal
        })
        console.log(response.data);
        isMounted && setTitle(response.data.title);
        isMounted && setContent(response.data.content);
      } catch (error) {
        console.error.error;
      }
    }

    getData();
    
    return () => {
      isMounted = false;
      isMounted && controller.abort();
    }
  },[])

  const handleSubmit = async () => {
    try {
      const response = await axiosPrivate.put(`/posts/${id}`,{
        title, content
      })
    } catch (error) {
      console.log(error);
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
              Update
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

export default UpdatePost;
