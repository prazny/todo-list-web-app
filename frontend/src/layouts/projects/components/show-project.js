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


// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";


import { ProjectList } from "layouts/components/ProjectList/ProjectList"
import {createRef, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Project} from "../../components/Project/project";


function ShowProject() {
  let { projectId } = useParams();

  return (
    <DashboardLayout>
      <DashboardNavbar/>
      <MDBox py={3}>
        <Project id={projectId} />
      </MDBox>
    </DashboardLayout>
  );
}

export default ShowProject;
