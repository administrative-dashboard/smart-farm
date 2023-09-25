import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../consts";
import { getJwtTokenFromCookies } from "../../providers/authUtils";
import {
  Button,
  useNotify,
  useRedirect,
} from "react-admin";
import { Dialog, DialogActions, DialogTitle, DialogContent, TextField, MenuItem } from "@mui/material";

export const EditRolesButton = ({ record }) => {
  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const notify = useNotify();
  const redirect = useRedirect();

  const onSuccess = () => {
    notify(`Changes saved`);
    redirect("/community/users");
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await axios.put(
        `${API_URL}/user/roles/${record.id}`,
        { roles: [selectedRole] },
        {
          headers: {
            Authorization: `Bearer ${getJwtTokenFromCookies()}`,
          },
        }
      );
      setLoading(false);
      handleClose();
      onSuccess();
    } catch (error) {
      console.error("Error updating roles: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/user/roles`, {
        headers: {
          Authorization: `Bearer ${getJwtTokenFromCookies()}`,
        },
      })
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching roles: ", error);
      });
  }, []);

  return (
    <>
      <Button color="primary" onClick={handleOpen}>
        Edit Roles
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Roles</DialogTitle>
        <DialogContent>
        <TextField
  id="role"
  select
  label="Select Role"
  variant="filled"
  color="primary"
  sx={{
    width: "100%",
    mb: 3,
  }}
  value={selectedRole}
  onChange={(e) => setSelectedRole(e.target.value)}
>
  {roles.map((role) => (
    <MenuItem key={role.id} value={role.value}> 
      {role.value}
    </MenuItem>
  ))}
</TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" disabled={loading}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

