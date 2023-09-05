import { Stack } from "@mui/material";
import React from "react";
import {
  Create,
  Form,
  ReferenceInput,
  AutocompleteInput,
  Button,
  useNotify,
  useRedirect,
  TextInput,
  EmailField,
  Edit,
} from "react-admin";

export const UserEdit = (props) => {
  const notify = useNotify();
  const redirect = useRedirect();

  const onSuccess = (data) => {
    notify(`Changes saved`);
    redirect("/users");
  };
  return (
    <Edit {...props} mutationOptions={{ onSuccess }}>
      <Form redirect="list">
        <Stack>
          <TextInput source="name" disabled />
          <EmailField source="email" disabled />
          <TextInput source="phone" />
          <ReferenceInput
            label="Role"
            source="role_id"
            reference="roles"
            //    onChange={handleDeviceChange}
          >
            <AutocompleteInput optionText={(choice) => `${choice.value}`} />
          </ReferenceInput>
          <Button type="submit" sx={{ color: "black", fontSize: "1rem" }}>
            Send
          </Button>
        </Stack>
      </Form>
    </Edit>
  );
};
