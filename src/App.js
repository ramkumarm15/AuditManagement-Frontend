import React from "react";
import {Login} from "./Login";
import {AuthProvider} from "./AuthContext";
import {Route, Routes} from "react-router-dom";
import {Homepage} from "./pages/Homepage";
import {AuditRequest} from "./pages/AuditRequest";
import {NavbarPage} from "./components/Navbar";
import {AuditRequestProvider} from "./AuditRequestContext";
import {AuditResponse} from "./pages/AuditResponse";
import {ToastContainer} from "react-toastify";
import Loginpage from "./pages/Loginpage";
import Layout from "./Layout";
import {Navbar} from "react-bootstrap";


function App() {

    const RouteWithNavbar = ({component: Component, ...rest}) => {
        return (
            <>
                <Route
                    {...rest}
                    render={routeProps => (

                        <Layout>
                            <Component {...routeProps} />
                        </Layout>

                    )}
                />
            </>
        );
    }

    return (
        <Routes>

            <Route exact path="/" element={
                <Layout>
                    <NavbarPage/>
                    <Homepage/>
                </Layout>
            }/>
            <Route exact path="/login" element={<Loginpage/>}/>
            <Route path="/auditRequest" element={
                <Layout>
                    <NavbarPage/>
                    <AuditRequest/>
                </Layout>
            }/>
            <Route path="/auditResponse" element={
                <Layout>
                    <NavbarPage/>
                    <AuditResponse/>
                </Layout>
            }/>
        </Routes>
    )

}

export default App;
