import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { Label } from "@mui/icons-material";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [user,setUser] = useState('');
  const [email,setEmail] = useState('');
  const [role,setRole] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getData = async () => {
      try {
        const response = await axiosPrivate.get(`/users/${id}`, {
          signal: controller.signal
        })
        console.log(response.data);
        isMounted && setUser(response.data.username);
        isMounted && setEmail(response.data.email);
        isMounted && setRole(response.data.roles.Users);
      } catch (error) {
        console.log(error);
      }
    }

    getData();

    return () => {
      isMounted = false;
      isMounted && controller.abort();
    }
  }, [])

  const handleSubmit = async () => {
    try {
      const response = await axiosPrivate.put(`/users/${id}`, {
        roles: role
      });
      console.log(response);
      navigate(-1, {replace: true});
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <h1>Update User</h1>
      <Container
        sx={{
          margin: "5% auto",
          backgroundColor: "#24282d",
          padding: "30px",
          borderRadius: "6px",
        }}
      >
        <Box bgcolor="#b6bdc7" padding={2} borderRadius={2}>
          <Stack direction="row" spacing={2}>
            <TextField fullWidth label="Username" value={user} onChange={(e) => setUser(e.target.value)} disabled/>
            <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} disabled/>
          </Stack>
          <TextField fullWidth sx={{ margin: "14px auto" }} label="Roles" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Admin: 5150, Editor: 1984, User: 2001" />
        </Box>
        <Button sx={{ margin: "18px auto 0", width: "100%"}} color="success" variant="contained" onClick={handleSubmit}>Update</Button>
      </Container>
      <Button variant="contained" sx={{ fontSize: "20px"}} onClick={() => navigate(-1)}>Back</Button>
    </Container>
  );
};

export default UpdateUser;
