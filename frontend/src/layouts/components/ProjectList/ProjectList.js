/* eslint-disable */
import {useEffect, useState} from "react";

import Grid from "@mui/material/Grid";
import ProjectService from "services/ProjectService"


import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import AddProject from "../../projects/components/add-project";
import TaskService from "../../../services/TaskService";
import DefaultProjectCard from "../DefaultProjectCard";

export function ProjectList() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [projects, setProjects] = useState(null);
  const [needReload, setNeedReload] = useState(true);

  useEffect(() => {
    if(needReload) {
      setIsLoaded(false)
      ProjectService.getAll().then(res => {
        setProjects(res.data)
        setIsLoaded(true)
        setNeedReload(false)
      });
    }
  }, [needReload])

  const setProjectListNeedReload = () => {
    setNeedReload(true);
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <AddProject setProjectListNeedReload={setProjectListNeedReload} />
      <br />
        <Grid container spacing={3}>
          {projects.map(item => (
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                onProjectDelete={setProjectListNeedReload}
                title={item.name}
                project={item}
                image={bgImage}
                description={item.description}
                action={{
                  type: "internal",
                  route: "/projects/"+item.id,
                  color: "info",
                  label: "view project",
                }}
                authors={[]}
                label=""
              />
            </Grid>
          ))}
        </Grid>
      </div>


    );
  }
}
