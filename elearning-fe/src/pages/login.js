import React from "react"
import PropTypes from 'prop-types'
import LoginPage from "../components/containers/LoginPage";

const Login = () => {
    return (
        <div className="conteiner-fluid">
            <LoginPage>
            </LoginPage>
        </div>
    );
}
Login.propTypes = {
    setToken: PropTypes.func
}
export default Login;