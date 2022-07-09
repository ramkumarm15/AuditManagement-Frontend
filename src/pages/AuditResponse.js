import React from "react";

import {Container, Row, Col, Table, Card} from "react-bootstrap";
import {Link, Navigate} from "react-router-dom";

import {AuditRequestContext} from "../AuditRequestContext";

export const AuditResponse = () => {
    const {auditResponse} = React.useContext(AuditRequestContext);

    const {data} = auditResponse;
    console.log(data === null)
    let classNameForTable;
    if (data !== null) {
        classNameForTable =
            data.projectExecutionStatus === "RED" ? "redRow" : "greenRow";
    }

    return (
        <>
            {data === null ? (
                <Navigate to="/"/>
            ) : (
                <>
                    <main>
                        <Container>
                            <div className="row">
                                <div className="col-12">
                                    <div className="page-title-box">
                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <li className="breadcrumb-item"><Link to="/">Home</Link>
                                                </li>
                                                <li className="breadcrumb-item active">Audit Response</li>
                                            </ol>
                                        </div>
                                        <h4 className="page-title">Audit Response</h4>
                                    </div>
                                </div>
                            </div>
                            <Row>
                                <Col md={12}>
                                    <Card className="">
                                        <Card.Body className="text-center">

                                            <Table responsive striped hover size="sm">
                                                <thead className="thead-light">
                                                <tr>
                                                    <th>Audit ID</th>
                                                    <th>Project Name</th>
                                                    <th>Remedial Action Duration</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr className={classNameForTable}>
                                                    <td>{data.auditId}</td>
                                                    <td>{data.projectName}</td>
                                                    <td>{data.remedialActionDuration}</td>
                                                </tr>
                                                </tbody>
                                            </Table>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </main>
                </>
            )}
        </>
    );
};
