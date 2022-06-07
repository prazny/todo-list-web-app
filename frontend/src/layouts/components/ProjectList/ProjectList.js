import {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";

import DefaultProjectCard
  from "../../../examples/Cards/ProjectCards/DefaultProjectCard";
import MDBox from "../../../components/MDBox";

export function ProjectList() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/account/boards")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <MDBox p={2}>
        <Grid container spacing={6} display="flex">
          {items.map(item => (
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                title={item.name}
                description="As Uber works through a huge amount of internal management turmoil."
                action={{
                  type: "internal",
                  route: "/somewhere",
                  color: "info",
                  label: "view project",
                }}
                authors={[]}
                label=""
              />
            </Grid>
          ))}
        </Grid>
      </MDBox>

    );
  }
}
