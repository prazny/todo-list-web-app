/* eslint-disable */

/**
 =========================================================
 * Material Dashboard 2 React - v2.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2022 Creative Tim (https://www.creative-tim.com)

 Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

import {Component, useState} from "react";

// react-router-dom components
import {Link, useSearchParams} from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import OauthService from "../../../services/OauthService";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import {toast} from "react-toastify";

export function SignIn(props) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [searchParams, setSearchParams] = useSearchParams();


  const activateAccount = () => {
    if (searchParams.get('activation_token')) {
      OauthService.activate(searchParams.get('activation_token')).then(response => {
        if (response.status === 200) {
          toast.success("Account activated. Sign in.")
        }
      }).catch(err => {
        toast.error("The account cannot be activated")
      })
      setSearchParams("")
    }
  }
  activateAccount()


  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("")
    setLoading(true)

    OauthService.login(username, password).then(
      response => {
        if(response.status === 200) {
          toast.success("Logged in")
          window.location.reload();
        }
      },
    ).catch(
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false)
        setMessage("Invaild email or password.")
        toast.error("Invaild email or password.")
      });
  }

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <form onSubmit={handleLogin}>
            <MDBox>
              <MDBox mb={2}>
                <MDInput type="email" label="Email" fullWidth
                         name="username"
                         value={username}
                         onChange={(e) => setUsername(e.target.value)}
                         required
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput type="password" label="Password" fullWidth
                         name="password"
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}
                         required
                />
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton variant="gradient" type="submit" color="info"
                          fullWidth
                          disabled={loading}>
                  sign in
                </MDButton>
              </MDBox>
              {loading && (
                <span className="spinner-border spinner-border-sm"/>
              )}
              {message && (
                <div className="form-group">
                  <div className=" alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
              <MDBox mt={3} mb={1} textAlign="center">
                <MDTypography variant="button" color="text">
                  Don&apos;t have an account?{" "}
                  <MDTypography
                    component={Link}
                    to="/authentication/sign-up"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Sign up
                  </MDTypography>
                </MDTypography>
              </MDBox>
            </MDBox>
          </form>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default SignIn;
