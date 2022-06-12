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

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Overview page components
import Header from "layouts/profile/components/Header";
import { ToastContainer, toast } from 'react-toastify';


// Images

import MDInput from "../../components/MDInput";
import MDButton from "../../components/MDButton";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import AccountService from "../../services/AccountService";
import {notify} from "../components/Helpers/notify";
import {capitalizeFirst} from "../components/Helpers/capitalize-first";

function Overview() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [account, setAccount] = useState(null);
  const [needReload, setNeedReload] = useState(true);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (needReload)
      AccountService.get().then(res => {
        setFirstname(res.data.firstname)
        setLastname(res.data.lastname)
        setEmail(res.data.email)
        setIsLoaded(true)
        setNeedReload(false)
      });
  }, [needReload])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      AccountService.update(firstname, lastname, password).then(response => {
        if (response.status === 200) {
          setFirstname("")
          setLastname("")
          setPassword("")
          setNeedReload(true)
          toast.success("Account updated!")
          setMessage("");
        } else {
          toast.error("Some error occured!")
          setMessage("Some error occured");
        }
      }).catch(error => {
        let msg = ""
        for(let i=0; i< error.response.data.detail.length; i++) {
          let err = error.response.data.detail[i]
          msg += (capitalizeFirst(err['loc'][1] + ": " + err['msg'] + "\n") + "\r\n")
        }
        setMessage(msg)
        toast.error("Some error occured!")
      })

    } catch (err) {
      console.log("ddd")
      console.log(err);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header name={firstname + " " + lastname}>
        <MDBox pt={2} px={2} lineHeight={1.25}>
          <MDTypography variant="h6" fontWeight="medium">
            User data
          </MDTypography>
        </MDBox>
        <MDBox p={2}>
          <form onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput type="text" label="Firstname" variant="standard"
                       value={firstname}
                       onChange={(e) => setFirstname(e.target.value)}
                       fullWidth required/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Lastname" variant="standard"
                       value={lastname}
                       onChange={(e) => setLastname(e.target.value)} required
                       fullWidth/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="email" label="Email" variant="standard"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)} disabled required
                       fullWidth/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="New password" variant="standard"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)} required
                       fullWidth/>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit">
                update
              </MDButton>
            </MDBox>
            <MDBox mt={4} mb={1}>
              {message ? <p>{message.split('\n')}</p> : null}
            </MDBox>
          </form>

        </MDBox>
      </Header>
    </DashboardLayout>
  );
}

export default Overview;
