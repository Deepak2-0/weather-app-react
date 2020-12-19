import React from "react";
import {Link} from "react-router-dom";
const NotFoundPage = () => {
  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <h1 className="display-4">Uh oh!</h1>
        <p className="lead">The page you are trying to find is not valid</p>
        <Link to={"/"}>
          <button className="btn btn-warning btn-lg">Go to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
