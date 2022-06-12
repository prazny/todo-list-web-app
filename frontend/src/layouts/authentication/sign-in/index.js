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

import {Component} from "react";

// react-router-dom components
import {Link} from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
//import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

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

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
  return "";
};
const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
  return "";
};

export default class Basic extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();
    this.setState({
      message: "",
      loading: true
    });
    // this.form.validateAll();
    // if (this.checkBtn.context._errors.length === 0) {
    OauthService.login(this.state.username, this.state.password).then(
      () => {
        // browserHistory.push("/dashboard");
        // return <Redirect to="/dashboard" />
        window.location.reload();
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        this.setState({
          loading: false,
          message: resMessage
        });
      }
    );
    //} else {
    //  this.setState({
    //    loading: false
    //  });
    // }
  }

  render() {
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
            <Grid container spacing={3} justifyContent="center"
                  sx={{mt: 1, mb: 2}}>
              <Grid item xs={2}>
                <MDTypography component={MuiLink} href="#" variant="body1"
                              color="white">
                  <FacebookIcon color="inherit"/>
                </MDTypography>
              </Grid>
              <Grid item xs={2}>
                <MDTypography component={MuiLink} href="#" variant="body1"
                              color="white">
                  <GitHubIcon color="inherit"/>
                </MDTypography>
              </Grid>
              <Grid item xs={2}>
                <MDTypography component={MuiLink} href="#" variant="body1"
                              color="white">
                  <GoogleIcon color="inherit"/>
                </MDTypography>
              </Grid>
            </Grid>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <form onSubmit={this.handleLogin}>
              <MDBox>

                <MDBox mb={2}>
                  <MDInput type="email" label="Email" fullWidth
                           name="username"
                           value={this.state.username}
                           onChange={this.onChangeUsername}
                           validations={[required, email]}
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput type="password" label="Password" fullWidth
                           name="password"
                           value={this.state.password}
                           onChange={this.onChangePassword}
                           validations={[required]}
                  />
                </MDBox>
                <MDBox mt={4} mb={1}>
                  <MDButton variant="gradient" type="submit" color="info"
                            fullWidth
                            disabled={this.state.loading}>
                    sign in
                  </MDButton>
                </MDBox>
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm" />
                )}
                {this.state.message && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {this.state.message}
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
}

//export default Basic;
