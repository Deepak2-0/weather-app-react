import React from "react";

const NotFoundCity = () => {
  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <h1 className="display-4">Uh oh!</h1>
        <p className="lead">The city you are searching might not be valid.</p>
        <p className="lead">Try a valid city.</p>
      </div>
    </div>
  );
};

export default NotFoundCity;
