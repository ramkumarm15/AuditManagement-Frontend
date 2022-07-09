import React, {Fragment} from "react";
import {Navigate, Route, useNavigate} from "react-router-dom";
import {AuthContext} from "./AuthContext";
import {Container, Row, Col, Form, Card, InputGroup} from "react-bootstrap";

import {APIRoutes} from "./api/api";
import axios from "axios";
import {toast} from "react-toastify";

export const Login = () => {
    const [formData, setData] = React.useState({
        username: "",
        password: "",
    });
    const [errorData, setErrorData] = React.useState({
        username: "",
        password: "",
    });
    const [validated, setValidated] = React.useState(false);
    let {username, password} = formData;

    const navigate = useNavigate();


    async function fetchData(props) {
        const body = JSON.stringify({
            username: username,
            password: password,
        });

        try {
            const response = await axios.post(
                `${APIRoutes.AuthorizeModule}/api/Token`,
                body,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            console.log(response);
            if (response.status && response.status === 200) {
                if (localStorage.getItem("access") != null) {
                    localStorage.removeItem("access");
                }
                localStorage.setItem("access", response.data?.token);
                localStorage.setItem("isLoggedIn", true);

                if (localStorage.getItem("isLoggedIn") === "true") {
                    navigate("/");
                }
            }
        } catch (e) {
            console.log("Catch Block")
            console.log(e.response)
            const {response} = e

            switch (response.status) {
                case 404:
                    toast.error(response.data.message, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    break;
                case 400:
                    console.log(response.data.errors)
                    for (let error in response.data.errors) {
                        console.log(response.data.errors[error][0]);
                        toast.error(response.data.errors[error][0], {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
            }

        }
    }

    const validateForm = () => {
        let errorStatus = true;
        if (username.length === 0) {
            setErrorData(prevState => ({...prevState, username: "Username is empty"}));
            errorStatus = false;
            setValidated(true);
        } else if (username.length < 6) {
            setErrorData(prevState => ({...prevState, username: "Username length must be 6 length"}));
            errorStatus = false;
            setValidated(true);
        } else {
            setErrorData(prevState => ({...prevState, username: ""}))
            errorStatus = true
        }
        if (password.length === 0) {
            setErrorData(prevState => ({...prevState, password: "Password is empty"}));
            errorStatus = false;
            setValidated(true);
        } else if (password.length < 6) {
            setErrorData(prevState => ({...prevState, password: "Password length must be 6 length"}));
            errorStatus = false;
            setValidated(true);
        } else {
            setErrorData(prevState => ({...prevState, password: ""}))
            errorStatus = true;
        }
        return errorStatus
    }

    const handelSubmit = (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        console.log(form.checkValidity())
        if (validateForm()) {
            fetchData();
        }

    };

    if (localStorage.getItem("isLoggedIn") === "true") {
        console.log(localStorage.getItem("isLoggedIn"));
        return <Navigate to="/"/>;
    }

    return (
        <React.Fragment>
            <main className="account-pages mt-3 d-flex align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={5}>
                            <Card className="bg-trans">
                                <Card.Body>
                                    <Form onSubmit={(e) => handelSubmit(e)}>
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="username">
                                                Username
                                            </Form.Label>
                                            <InputGroup>
                                                <Form.Control
                                                    type={"text"}
                                                    name="username"
                                                    id="username"
                                                    value={username}
                                                    onChange={(e) => {

                                                        setData({
                                                            ...formData,
                                                            [e.target.name]: e.target.value,
                                                        })
                                                        validateForm();
                                                    }
                                                    }
                                                    isInvalid={errorData.username}
                                                />
                                                {errorData.username && (
                                                    <Form.Control.Feedback type="invalid">
                                                        {errorData.username}
                                                    </Form.Control.Feedback>
                                                )}
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="password">
                                                Password
                                            </Form.Label>
                                            <Form.Control
                                                type={"password"}
                                                name="password"
                                                id="password"
                                                value={password}
                                                onChange={(e) => {

                                                    setData({
                                                        ...formData,
                                                        [e.target.name]: e.target.value,
                                                    })
                                                    validateForm();
                                                }
                                                }
                                                isInvalid={errorData.password}
                                            />
                                            {errorData.password && (
                                                <Form.Control.Feedback type={"invalid"}>
                                                    {errorData.password}
                                                </Form.Control.Feedback>
                                            )}

                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Control
                                                type={"submit"}
                                                value="Submit"
                                                className="btn btn-primary"
                                            />
                                        </Form.Group>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </main>
        </React.Fragment>
    );
};
