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

// react-router-dom components
import {Link} from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import {useState} from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";


// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import BasicLayout from "../components/BasicLayout";
import OauthService from "../../../services/OauthService";

function Cover() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("d")
      const response = await OauthService.register(email, firstname, lastname, password)

      if (response.status === 200) {
        setFirstname("")
        setLastname("")
        setEmail("")
        setPassword("")
        setMessage("User created successfully");
      } else {
        setMessage("Some error occured");
      }

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            and manage your projects
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox>
            <form onSubmit={handleSubmit}>
              <MDBox mb={2}>
                <MDInput type="text" label="Firstname" variant="standard"
                         value={firstname}
                         onChange={(e) => setFirstname(e.target.value)}
                         fullWidth/>
              </MDBox>
              <MDBox mb={2}>
                <MDInput type="text" label="Lastname" variant="standard"
                         value={lastname}
                         onChange={(e) => setLastname(e.target.value)}
                         fullWidth/>
              </MDBox>
              <MDBox mb={2}>
                <MDInput type="email" label="Email" variant="standard"
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                         fullWidth/>
              </MDBox>
              <MDBox mb={2}>
                <MDInput type="password" label="Password" variant="standard"
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}
                         fullWidth/>
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton variant="gradient" color="info" fullWidth type="submit">
                  sign in
                </MDButton>
              </MDBox>
              <MDBox mt={4} mb={1}>
                  {message ? <p>{message}</p> : null}
              </MDBox>
              <MDBox mt={3} mb={1} textAlign="center">
                <MDTypography variant="button" color="text">
                  Already have an account?{" "}
                  <MDTypography
                    component={Link}
                    to="/authentication/sign-in"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Sign In
                  </MDTypography>
                </MDTypography>
              </MDBox>
            </form>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Cover;
