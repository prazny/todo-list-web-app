/* eslint-disable */
import {useEffect, useState} from "react";

import Grid from "@mui/material/Grid";
import ProjectService from "services/ProjectService"

import DefaultProjectCard
  from "../../../examples/Cards/ProjectCards/DefaultProjectCard";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import AddProject from "../../projects/components/add-project";
import {Task} from "../Task/task";
import Typography from "@mui/material/Typography";
import AddTask from "../../projects/components/add-task";


export function Project(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [project, setProject] = useState(null);
  const [needReload, setNeedReload] = useState(true);

  useEffect(() => {
    if (needReload)
      ProjectService.get(props.id).then(res => {
        setProject(res.data)
        setIsLoaded(true)
        setNeedReload(false)
      });
  }, [needReload])

  const setProjectNeedReload = () => {
    setNeedReload(true);
  }


  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2" component="h2">
            {project.name} {project.id} <AddTask projectId={project.id} setProjectNeedReload={setProjectNeedReload}/>
          </Typography>
        </Grid>

        {project.tasks.map(item => (
          <Grid key={item.id} item xs={12} md={6} xl={3}>
            <Task onChange={setProjectNeedReload} key={item.id} id={item.id}></Task>
          </Grid>
        ))}
      </Grid>

    );
  }
}
