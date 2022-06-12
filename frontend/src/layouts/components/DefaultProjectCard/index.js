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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "../../../components/MDButton";
import ProjectService from "../../../services/ProjectService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCoffee, faTrash} from "@fortawesome/free-solid-svg-icons";
import {toast} from "react-toastify";

function DefaultProjectCard({
                              image,
                              label,
                              title,
                              description,
                              action,
                              project,
                              onProjectDelete
                            }) {

  const deleteProject = (id) => {
    try {
      const response = ProjectService.delete(id).then(res => {
        toast.success("Project deleted")
        onProjectDelete()
      })
      return true;
    } catch (err) {
      toast.error("Some errors occured")
      console.log(err);
    }
    return "";
  }

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent",
        boxShadow: "none",
        overflow: "visible",
      }}
    >
      <MDTypography
        component={Link}
        to={action.route}
        variant="h5"
        textTransform="capitalize"
      >
        <MDBox position="relative" width="100.25%" shadow="xl"
               borderRadius="xl">
          <CardMedia
            src={image}
            component="img"
            title={title}
            sx={{
              maxWidth: "100%",
              margin: 0,
              boxShadow: ({boxShadows: {md}}) => md,
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </MDBox>
      </MDTypography>
      <MDBox mt={1} mx={0.5}>

        <MDTypography variant="button" fontWeight="regular" color="text"
                      textTransform="capitalize">
          <MDTypography
            component={Link}
            to={action.route}
            variant="h5"
            textTransform="capitalize"
          >
            {label}
          </MDTypography>
        </MDTypography>
        <MDBox mb={1}>
          <MDTypography
            component={Link}
            to={action.route}
            variant="h5"
            textTransform="capitalize"
          >
            {title}
          </MDTypography>
          <MDButton onClick={() => deleteProject(project.id)} variant="text"
                    color="error">
            <FontAwesomeIcon icon={faTrash} />
          </MDButton>
        </MDBox>
        <MDBox mb={3} lineHeight={0}>
          <MDTypography variant="button" fontWeight="light" color="text">
            {description}
          </MDTypography>
        </MDBox>
      </MDBox>
    </Card>
  );
}


// Typechecking props for the DefaultProjectCard
DefaultProjectCard.propTypes = {
  image: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  project: PropTypes.object.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]),
    route: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
      "white",
    ]).isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired
};

export default DefaultProjectCard;
