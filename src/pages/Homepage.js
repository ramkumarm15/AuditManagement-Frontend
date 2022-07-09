import React from "react";
import { AuthContext } from "../AuthContext";
import { Link, Navigate } from "react-router-dom";
import { Card, Container, Row,Col } from "react-bootstrap";

export const Homepage = () => {
  // const { auth } = React.useContext(AuthContext);

  if (localStorage.getItem("isLoggedIn") === "false") {
    return <Navigate to="/login" />;
  }

  return (
    <React.Fragment>
      <React.Fragment>
        <main className="home h-75">
          <Container>
            <Row>
              <Col md={12} >
                <div className="page-title-box">
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item active"><Link to="/">Home</Link>
                      </li>
                    </ol>
                  </div>
                  <h4 className="page-title">Create Request</h4>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Card>
                  <Card.Body>
                    <div className="text-center">
                      <Link to="/auditRequest" className="btn btn-primary">Create Request</Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </main>
      </React.Fragment>
    </React.Fragment>
  );
};
