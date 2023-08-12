import React from "react";
import Users from "../CRUD/Users/Users";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Admin = () => {
  return (
    <div>
      <div className="container">
        <div className="d-flex justify-content-between">
          <h1>Admin</h1>
          <Button variant="contained" color="success">Create</Button>
        </div>
        <div className="mt-4 p-3 border-0 rounded bg-dark">
          <Users />
          <div className="">
            <Link className="btn btn-primary" to="/">
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
