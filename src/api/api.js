import Axios from "axios";

export const API = Axios.create({
  baseURL: "http://localhost:3340/api/",
});

export const APIRoutes = {
  AuthorizeModule:
    "https://localhost:44356",
  AuditCheckList:
    "https://localhost:44309",
  AuditSeverity:
    "https://localhost:44397/",
};
