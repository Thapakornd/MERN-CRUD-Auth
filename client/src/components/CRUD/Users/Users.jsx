import React, { useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ButtonGroup,
  Button,
} from "@mui/material";

const Users = () => {
  const [users, setUsers] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const isMounted = useRef(false);

  useEffect(() => {
    const controller = new AbortController();

    if (!isMounted.current) {
      const getUser = async () => {
        try {
          const response = await axiosPrivate.get("/users/", {
            signal: controller.signal,
          });
          setUsers(response.data);
        } catch (error) {
          console.error.error;
          navigate("/login", { state: { from: location }, replace: true });
        }
      };

      getUser();

      return () => {
        isMounted.current = true;
        !isMounted.current && controller.abort();
      };
    }
  }, []);

  // Update
  const handleUpdate = (id) => {
    try {
      navigate(`/updateuser/${id}`);
    } catch (error) {
      console.log(error);
    }
  }

  // Delete
  const handleDelete = async (id) => {
    try {
      const response = await axiosPrivate.delete(`/users/${id}`)
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="users">
      <h3 className="text-success">Users List</h3>
      <Table
        sx={{
          margin: "30px auto",
          backgroundColor: "white",
        }}
      >
        <TableHead
          sx={{
            backgroundColor: "#e2e2e2",
          }}
        >
          <TableCell align="right">#</TableCell>
          <TableCell align="center">Username</TableCell>
          <TableCell align="left">Email</TableCell>
          <TableCell align="left">Roles</TableCell>
          <TableCell align="left">Posts</TableCell>
          <TableCell align="center">Action</TableCell>
        </TableHead>
        <TableBody>
          {users.length ? (
            users.map((user, i) => (
              <TableRow key={i}>
                <TableCell align="right">{i + 1}</TableCell>
                <TableCell align="center">{user.username}</TableCell>
                <TableCell align="left">{user.email}</TableCell>
                <TableCell align="left">{user.roles.Users}</TableCell>
                <TableCell align="left">{user.AllProperties.length}</TableCell>
                <TableCell align="center">
                  <ButtonGroup variant="outlined">
                    <Button onClick={() => handleUpdate(user._id)} color="success">Edit</Button>
                    <Button onClick={() => handleDelete(user._id)} color="error">Del</Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>No Content</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Users;
