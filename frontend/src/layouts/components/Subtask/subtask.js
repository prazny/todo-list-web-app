/* eslint-disable */
import {useEffect, useState} from "react";

import Grid from "@mui/material/Grid";
import ProjectService from "services/ProjectService"

import DefaultProjectCard
  from "../../../examples/Cards/ProjectCards/DefaultProjectCard";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import Card from "@mui/material/Card";
import {Task} from "../Task/task";
import MDAvatar from "../../../components/MDAvatar";
import MDButton from "../../../components/MDButton";
import {Link} from "react-router-dom";
import SubtaskService from "../../../services/SubtaskService";

export function Subtask(props, setNeedReload) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const subtask = props.subtask


  const deleteSubtask = (id) => {
    try {
      const response =  SubtaskService.delete(id).then(  res => {
        props.setTaskNeedReload()
      })
      return true;
    } catch (err) {
      console.log(err);
    }

  }
    return (
      <MDBox key={subtask.id} component="li" display="flex" alignItems="center" py={1} mb={1}>
        <MDBox display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center">
          <MDTypography variant="button" fontWeight="medium">
            {subtask.name}
          </MDTypography>
        </MDBox>
        <MDBox ml="auto">
            <MDButton onClick={() => deleteSubtask(subtask.id)} variant="text" color="error">
              X
            </MDButton>
        </MDBox>
      </MDBox>
    );

}
