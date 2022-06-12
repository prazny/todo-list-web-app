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
import Divider from "@mui/material/Divider";
import {
  faAngleDown,
  faAngleUp, faArrowRotateLeft, faCheck, faThumbsUp,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {toast} from "react-toastify";
import Box from "@mui/material/Box";

export function Subtask(props, setNeedReload) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const subtask = props.subtask


  const deleteSubtask = () => {
    try {
      SubtaskService.delete(subtask.id).then(res => {
        props.setTaskNeedReload()
        toast.success("Task deleted")
      })
      return true;
    } catch (err) {
      toast.error("Some errors occur")
      console.log(err);
    }
  }
  const currentStatusIndex = subtask.status

  const changeStatus = (toStatus) => {
    SubtaskService.changeStatus(subtask.id, toStatus).then(res => {
      props.setTaskNeedReload()
      toast.success("Status changed")
    })
  }

  /*const changeStatusDown = (changeStatus) => {
    let currentStatusIndex = statuses.findIndex(subtask.status)

    if(currentStatusIndex !== 0) {
      return (
        <MDButton onClick={changeStatus(statuses[currentStatusIndex-1])} variant="text"
                  color="info">
          <FontAwesomeIcon icon={faAngleDown} />
        </MDButton>
      )
    }
  }
  const changeStatusUp = (changeStatus) => {

    if(currentStatusIndex !== 0) {
      return (
        <MDButton onClick={changeStatus(statuses[currentStatusIndex+1])} variant="text"
                  color="info">
          <FontAwesomeIcon icon={faAngleUp} />
        </MDButton>
      )
    }
  }
*/
  return (
    <MDBox key={subtask.id} component="li" display="flex" alignItems="center"
           py={1} mb={1} sx={{borderTop: 1}}>
      <Grid container spacing={0}>
        <Grid item xs={8}>
          <MDBox display="flex" flexDirection="column" alignItems="flex-start"
                 justifyContent="center">
            {
              currentStatusIndex === 1 &&
              <MDTypography variant="button"
                            fontWeight="medium">{subtask.name}</MDTypography>
            }
            {
              currentStatusIndex === 2 &&
              <MDTypography variant="button"
                            fontWeight="light">{subtask.name}</MDTypography>
            }
            {
              currentStatusIndex === 3 &&
              <MDTypography variant="button" sx={{ textDecoration: "line-through"}}
                            fontWeight="medium">{subtask.name}</MDTypography>
            }

          </MDBox>
        </Grid>

        <Grid item xs={4} justifyContent="flex-end">
          <Box justifyContent="flex-end"  alignItems="flex-end" display="flex">
            {currentStatusIndex !== 1 &&
              <MDButton variant="text" color="info" iconOnly xs={{padding: 0}}
                        onClick={() => changeStatus(currentStatusIndex - 1)}
                        size={"small"}>
                <FontAwesomeIcon icon={faArrowRotateLeft}/>
              </MDButton>
            }
            {currentStatusIndex !== 3 &&
              <MDButton variant="text" color="info"
                        onClick={() => changeStatus(currentStatusIndex + 1)}
                        iconOnly xs={{padding: 0}}
                        size={"small"}>
                <FontAwesomeIcon icon={faThumbsUp}/>
              </MDButton>
            }

            <MDButton onClick={() => deleteSubtask()} variant="text"
                      size={"small"}
                      iconOnly xs={{paddingLeft: 0, paddingRight: 0}}
                      color="error">
              X
            </MDButton>
          </Box>
        </Grid>
      </Grid>
    </MDBox>

  );

}
