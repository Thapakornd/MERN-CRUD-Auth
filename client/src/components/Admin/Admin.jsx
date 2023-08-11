import React from "react";
import Users from "../CRUD/Users/Users";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const Admin = () => {
  return (
    <div>
      <div className="container">
        <div className="d-flex justify-content-between">
          <h1>Admin</h1>
          <div className="d-flex">
            <Button variant="danger" className="ms-4 pt-2">
              Delete
            </Button>
            <Button variant="success" className="ms-4 pt-2">
              Add User
            </Button>
          </div>
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
