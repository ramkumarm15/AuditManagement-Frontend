import React from "react";
import {AuditRequestProvider} from "./AuditRequestContext";
import {ToastContainer} from "react-toastify";


export default function Layout({children}) {
    return (
        <>
            <AuditRequestProvider>
                <ToastContainer/>
                {children}
            </AuditRequestProvider>
        </>
    )
}