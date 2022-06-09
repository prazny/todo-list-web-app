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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";


import { ProjectList } from "layouts/components/ProjectList/ProjectList"

function Tables() {
  return (
    <DashboardLayout>
      <DashboardNavbar/>
      <MDBox pt={6} pb={3} mx={5}>
        <Grid container spacing={6}>
          <ProjectList />
        </Grid>
      </MDBox>
      <Footer/>
    </DashboardLayout>
  );
}

export default Tables;
