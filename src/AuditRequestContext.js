import React from "react";

export const AuditRequestContext = React.createContext();

export const AuditRequestProvider = (props) => {
  const [show, setShow] = React.useState(false);

  const [checkList, setCheckList] = React.useState({
    data: null,
  });

  const [projectDetails, setProjectDetails] = React.useState({
    projectName: "",
    projectManagerName: "",
    applicationOwnerName: "",
    date: "",
  });

  const [auditDetails, setAuditDetails] = React.useState({
    type: "Internal",
    
  });

  const [questions, setQuestions] = React.useState({
    question1: false,
    question2: false,
    question3: false,
    question4: false,
    question5: false,
  });

  const [auditResponse, setAuditResponse] = React.useState({
    data: null,
    generated: false,
  });

  const stateValue = {
    show,
    setShow,
    checkList,
    setCheckList,
    auditDetails,
    setAuditDetails,
    projectDetails,
    setProjectDetails,
    questions,
    setQuestions,
    auditResponse,
    setAuditResponse,
  };
  return (
    <AuditRequestContext.Provider value={stateValue}>
      {props.children}
    </AuditRequestContext.Provider>
  );
};
