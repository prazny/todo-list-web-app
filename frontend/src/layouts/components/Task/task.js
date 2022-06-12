/* eslint-disable */
import {useEffect, useRef, useState} from "react";

import Grid from "@mui/material/Grid";
import ProjectService from "services/ProjectService"

import DefaultProjectCard
  from "../../../examples/Cards/ProjectCards/DefaultProjectCard";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import TaskService from "../../../services/TaskService";
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import Card from "@mui/material/Card";
import {Subtask} from "../Subtask/subtask";
import MDInput from "../../../components/MDInput";
import OauthService from "../../../services/OauthService";
import SubtaskService from "../../../services/SubtaskService";
import Divider from "@mui/material/Divider";
import {toast} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRotateLeft, faTrash} from "@fortawesome/free-solid-svg-icons";
import MDButton from "../../../components/MDButton";

export function Task(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [task, setTask] = useState(null);
  const [needReload, setNeedReload] = useState(true);
  const [newSubtaskName, setNewSubtaskName] = useState("");

  const setTaskNeedReload = () => {
    setNeedReload(true);
  }
  const addSubtaskInput = useRef(null)

  useEffect(() => {
    if (needReload) {
      setIsLoaded(false)
      TaskService.get(props.id).then(res => {
        setTask(res.data)
        setNeedReload(false)
        setIsLoaded(true)
      });
    }
  }, [needReload])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNeedReload(true)
    try {
      SubtaskService.create(newSubtaskName, task.id).then(res => {
        if (res.status === 200) {
          setNewSubtaskName("")
          toast.success("Subtask added!")
          setNeedReload(true)
        }
      })
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = () => {
    TaskService.delete(task.id).then(res => {
      if (res.status === 200) {
        toast.success("Task deleted!")
        props.onChange()
      }
    })
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Card item sx={{height: "100%", width: "100%", boxShadow: 1, backgroundColor: task.color}} >
        <MDBox pt={2} px={2}>
          <MDTypography variant="h6" fontWeight="medium"
                        textTransform="capitalize">
            {task.name}
            <MDButton variant="text" color="info" iconOnly xs={{padding: 0}}
                      onClick={() => deleteTask()}
                      size={"small"}>
              <FontAwesomeIcon icon={faTrash}/>
            </MDButton>
          </MDTypography>
        </MDBox>
        <MDBox p={2}>
          <MDBox component="ul" display="flex" flexDirection="column" p={0}
                 m={0}>
            {task.subtasks.map(item => (
              <Subtask key={item.id} subtask={item} component="li"
                       setTaskNeedReload={setTaskNeedReload}></Subtask>
            ))}
            <form onSubmit={handleSubmit}>
            <MDBox component="li" display="flex" alignItems="center" py={1}
                   mb={1}>

                <MDBox display="flex" flexDirection="column"
                       alignItems="flex-start" justifyContent="center">

                  <MDInput type="text" label="New subtask" variant="standard"
                           value={newSubtaskName}
                           ref={addSubtaskInput}
                           onChange={(e) => setNewSubtaskName(e.target.value)}
                           fullWidth/>

                </MDBox>
            </MDBox>
            </form>
          </MDBox>
        </MDBox>
      </Card>
    );
  }
}
