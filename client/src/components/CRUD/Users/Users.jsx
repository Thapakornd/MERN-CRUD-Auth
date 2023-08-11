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
  Button
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
          const data = response.data;
          setUsers(response.data);
          console.log(data);
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

  return (
    <div className="users">
      <h3 className="text-success">Users List</h3>
      <Table>
        <TableHead>
          <TableCell align="right">#</TableCell>
          <TableCell align="center">Username</TableCell>
          <TableCell align="left">Email</TableCell>
          <TableCell align="left">Roles</TableCell>
          <TableCell align="left">Posts</TableCell>
          <TableCell align="center">Action</TableCell>
        </TableHead>
        <TableBody>
          {users.length
            ? users.map((user,i) => (
              <TableRow key={i}>
                <TableCell align="right">{i}</TableCell>
                <TableCell align="center">{user.username}</TableCell>
                <TableCell align="left">{user.email}</TableCell>
                <TableCell align="left">{user.roles.Users}</TableCell>
                <TableCell align="left">{(user.AllProperties).length}</TableCell>
                <TableCell align="center">
                  <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button>Edit</Button>
                    <Button>Del</Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))
            : <TableRow>
              <TableCell>No Content</TableCell>
            </TableRow>
          }
        </TableBody>
      </Table>
    </div>
  );
};

export default Users;
