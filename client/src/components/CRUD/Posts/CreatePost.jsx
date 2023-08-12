import {
    Button,
  Container,
  FormControl,
  TextField,
} from "@mui/material";
import React from "react";

const CreatePost = () => {
  return (
    <Container>
      <h1>Create Post</h1>
      <Container
        sx={{
          maxWidth: "560px",
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
            />
            <TextField
              label="Content"
              variant="filled"
              minRows={10}
              multiline
              placeholder="Your content"
            />
            <Button variant="outlined" color="success">Create</Button>
          </FormControl>
        </Container>
      </Container>
    </Container>
  );
};

export default CreatePost;
