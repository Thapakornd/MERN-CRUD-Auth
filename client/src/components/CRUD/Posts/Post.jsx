import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { Typography, Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import TextCard from "../TextCard";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const isMounted = useRef(false);
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    if (!isMounted.current) {
      const getData = async () => {
        try {
          const response = await axiosPrivate.get("/posts/", {
            signal: controller.signal,
          });

          console.log(response);
          console.log(response.data);
          isMounted && setPosts(response.data);
        } catch (error) {
          console.log(error);
          navigate("/", { replace: true });
        }
      };

      getData();

      return () => {
        isMounted.current = true;
        !isMounted.current && controller.abort();
      };
    }
  }, []);

  return (
    <Container>
      <Container
        sx={{
          backgroundColor: "#24282d",
          padding: "20px",
          margin: "20px auto",
          borderRadius: "10px"
        }}
      >
        {posts.length
          ? posts.map((user,i) => (
            <TextCard key={i} post={user} />  
          ))
          : <Typography>No Content</Typography>
        }
      </Container>
    </Container>
  );
};

export default Post;
