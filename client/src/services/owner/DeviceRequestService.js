import React, { useState } from "react";
import {
  Create,
  ReferenceInput,
  AutocompleteInput,
  DateInput,
  useNotify,
  useRedirect,
  Form,
  Button,
} from "react-admin";
import axios from "axios";
import { Stack } from "@mui/material";

export const CustomDeviceRequestCreate = (props) => {
  const notify = useNotify();
  const redirect = useRedirect();
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);

  const handleDeviceChange = (e, choice) => {
    setSelectedDeviceId(choice ? choice.id : null);
  };

  const handleCreate = (data) => {
    data.device_id = selectedDeviceId;
    data.user_id = 1;

    axios
      .post("device_requests_history", data)
      .then(() => {
        notify("Device request created successfully");
        redirect("list", "/device_requests_history");
      })
      .catch((error) => {
        notify(`Error: ${error.message}`, "error");
      });
  };

  return (
    <Create {...props}>
      <Form redirect="list" save={handleCreate}>
        <Stack>
          <ReferenceInput
            label="Portable Device"
            source="device_id"
            reference="portable_devices"
            onChange={handleDeviceChange}
          >
            <AutocompleteInput
              optionText={(choice) => `${choice.name} - ${choice.type}`}
            />
          </ReferenceInput>
          <DateInput source="date" label="Request Date" />
          <Button type="submit" sx={{ color: "black", fontSize: "1rem" }}>
            Send
          </Button>
        </Stack>
      </Form>
    </Create>
  );
};
