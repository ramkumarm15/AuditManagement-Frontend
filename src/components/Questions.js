import React from "react";
import {Form} from "react-bootstrap";
import {AuditRequestContext} from "../AuditRequestContext";

export const Questions = ({checkLists}) => {

    const {questions, setQuestions} = React.useContext(AuditRequestContext)

    const handleChange = (e) => {
        console.log(e.target.value);
        console.log(e.target.name);
        setQuestions((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.checked,
        }));
    };

    return (
        <>
            {checkLists &&
                checkLists.map((checkList) => (
                    <Form.Group key={`question${checkList.questionNo}`}>
                        <Form.Check
                            label={`${checkList.question}`}
                            name={`question${checkList.questionNo}`}
                            onChange={(e) => handleChange(e)}
                            checked={questions[`question${checkList.questionNo}`]}
                        />
                    </Form.Group>
                ))}
        </>
    );
};
