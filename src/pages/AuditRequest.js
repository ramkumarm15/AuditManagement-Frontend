import axios from "axios";
import React from "react";
import {Link} from "react-router-dom";
import {Button, Form, Container, Row, Col, Card} from "react-bootstrap";
import {Navigate, useNavigate} from "react-router-dom";
import {AuditRequestContext} from "../AuditRequestContext";
import {Questions} from "../components/Questions";
import {APIRoutes} from "../api/api";

// axios.defaults.headers.common["Authorization"] = }`;

const config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
};

export const AuditRequest = () => {
    const {
        show,
        setShow,
        checkList,
        setCheckList,
        auditDetails,
        setAuditDetails,
        projectDetails,
        setProjectDetails,
        questions,
        auditResponse,
        setAuditResponse,
    } = React.useContext(AuditRequestContext);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(
                `${APIRoutes.AuditCheckList}/api/AuditChecklist/${auditDetails.type}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access")}`,
                        // WWWAuthenticate:
                    },
                }
            );
            console.log(response);
            setCheckList({data: response.data});
            setShow(true);
        } catch (err) {
            console.log(err.response);
            if (err.response.status === 401) {
                localStorage.removeItem("access");
                localStorage.setItem("isLoggedIn", false);
                navigate("/login");
            }
        }
    };

    const handleSubmitRequest = async (e) => {
        e.preventDefault();

        const formData = {
            projectName: projectDetails.projectName,
            projectManagerName: projectDetails.projectManagerName,
            applicationOwnerName: projectDetails.applicationOwnerName,
            auditDetail: {
                type: auditDetails.type,
                date: projectDetails.date,
                questions,
            },
        };

        const body = JSON.stringify(formData);

        try {
            const res = await axios.post(
                `${APIRoutes.AuditSeverity}api/AuditSeverity`,
                body,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access")}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(res.data);
            if (res.status === 200) {
                setAuditResponse(() => ({data: res.data, generated: true}));
                navigate("/auditResponse");
            }
        } catch (err) {
            console.log(err);
            if (err.response.status === 401) {
                localStorage.removeItem("access");
                localStorage.setItem("isLoggedIn", false);
                navigate("/login");
            }
        }
    };

    return (
        <React.Fragment>
            {localStorage.getItem("isLoggedIn") === "true" ? (
                <main className="mt-3">
                    <Container>
                        <Row>
                            <Col md={12}>
                                <div className="page-title-box">
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item"><Link to="/">Home</Link>
                                            </li>
                                            <li className="breadcrumb-item active">Create Request</li>
                                        </ol>
                                    </div>
                                    <h4 className="page-title">Create Request</h4>
                                </div>
                            </Col>
                        </Row>
                        <Row className="justify-content-between">
                            <Col md={4}>
                                <Card>
                                    <Card.Body>
                                        <Form onSubmit={(e) => handleSubmit(e)}>
                                            <Form.Group className="mb-3">
                                                <Form.Check
                                                    type="radio"
                                                    label="Internal"
                                                    name="internal"
                                                    value="Internal"
                                                    checked={auditDetails.type === "Internal"}
                                                    onChange={(e) =>
                                                        setAuditDetails((prevState) => ({
                                                            ...prevState,
                                                            type: e.target.value,
                                                        }))
                                                    }
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="SOX"
                                                    name="SOX"
                                                    value="SOX"
                                                    checked={auditDetails.type === "SOX"}
                                                    onChange={(e) =>
                                                        setAuditDetails({type: e.target.value})
                                                    }
                                                />
                                            </Form.Group>
                                            <Button type="submit">Proceed</Button>
                                        </Form>
                                    </Card.Body>
                                </Card>
                                {auditResponse.generated ? (
                                    <>

                                        <Card>
                                            <Card.Body>
                                                <h4>Response has been generated</h4>
                                                <Button as={Link} to={"/auditResponse"} variant="success">View</Button>
                                            </Card.Body>
                                        </Card>
                                    </>
                                ) : null}
                            </Col>
                            {show ? (<>
                                <Col md={8}>
                                    <Form onSubmit={(e) => handleSubmitRequest(e)}><Card>
                                        <Card.Body>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Project Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="projectName"
                                                    value={projectDetails.projectName}
                                                    placeholder="Audit Management System"
                                                    onChange={(e) =>
                                                        setProjectDetails((prevState) => ({
                                                            ...prevState,
                                                            [e.target.name]: e.target.value,
                                                        }))
                                                    }
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Project Manager Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="projectManagerName"
                                                    placeholder="Ramkumar"
                                                    value={projectDetails.projectManagerName}
                                                    onChange={(e) =>
                                                        setProjectDetails((prevState) => ({
                                                            ...prevState,
                                                            [e.target.name]: e.target.value,
                                                        }))
                                                    }
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Application Owner Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="applicationOwnerName"
                                                    value={projectDetails.applicationOwnerName}
                                                    placeholder="Sowndharya"
                                                    onChange={(e) =>
                                                        setProjectDetails((prevState) => ({
                                                            ...prevState,
                                                            [e.target.name]: e.target.value,
                                                        }))
                                                    }
                                                    required
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Control
                                                    type="date"
                                                    value={projectDetails.date}
                                                    onChange={(e) =>
                                                        setProjectDetails((prevState) => ({
                                                            ...prevState,
                                                            date: e.target.value,
                                                        }))
                                                    }
                                                    required
                                                />
                                            </Form.Group>
                                        </Card.Body>
                                    </Card>
                                        <Card>
                                            <Card.Body>
                                                <Questions checkLists={checkList.data} questions={questions}/>
                                                <Form.Group className="mt-3">
                                                    <Button type="submit">Submit</Button>
                                                </Form.Group>
                                            </Card.Body>
                                        </Card>
                                    </Form>
                                </Col>
                            </>) : null}
                            {/*{auditResponse.generated ? (*/}
                            {/*    <>*/}
                            {/*        <Col md={3}>*/}
                            {/*            <Card>*/}
                            {/*                <Card.Body>*/}
                            {/*                    <h5>Response Generated</h5>*/}
                            {/*                    <Link to="/auditResponse" className="btn btn-success">*/}
                            {/*                        Click to see*/}
                            {/*                    </Link>*/}
                            {/*                </Card.Body>*/}
                            {/*            </Card>*/}
                            {/*        </Col>*/}
                            {/*    </>*/}
                            {/*) : (*/}
                            {/*    ""*/}
                            {/*)}*/}
                        </Row>
                    </Container>
                </main>
            ) : (
                <Navigate to="/login"/>
            )}
        </React.Fragment>
    );
};
