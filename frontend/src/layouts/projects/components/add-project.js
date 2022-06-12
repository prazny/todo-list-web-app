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


import {ProjectList} from "layouts/components/ProjectList/ProjectList"
import MDButton from "../../../components/MDButton";
import {useState} from "react";
import {Backdrop, Modal} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import OauthService from "../../../services/OauthService";
import ProjectService from "../../../services/ProjectService";
import MDInput from "../../../components/MDInput";
import {toast} from "react-toastify";


function AddProject(props) {
  let counter = 1;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#d1e0ef");
  const [message, setMessage] = useState("");
  const [state, setState] =  useState(counter)


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ProjectService.create(name, description, color)

      if (response.status === 200) {
        setName("")
        setDescription("")
        toast.success("Project added")
        props.onChange()
        handleClose()
      } else {
        toast.error("Some error occured")

      }

    } catch (err) {
      console.log(err);
    }
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <MDButton onClick={handleOpen}>Add project</MDButton>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <form onSubmit={handleSubmit}>
              <MDBox mb={2}>
                <MDInput type="text" label="Name" variant="standard"
                         value={name}
                         onChange={(e) => setName(e.target.value)}
                         fullWidth required/>
              </MDBox>
              <MDBox mb={2}>
                <MDInput type="text" label="Description" variant="standard"
                         value={description}
                         onChange={(e) => setDescription(e.target.value)}
                         fullWidth />
              </MDBox>
              <MDBox mb={2}>
                <MDInput type="color" label="Color" variant="standard"
                         value={color}
                         onChange={(e) => setColor(e.target.value)}
                         fullWidth required/>
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton variant="gradient" color="info" fullWidth type="submit">
                  add
                </MDButton>
              </MDBox>
              <MDBox mt={4} mb={1}>
                {message ? <p>{message}</p> : null}
              </MDBox>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default AddProject;
