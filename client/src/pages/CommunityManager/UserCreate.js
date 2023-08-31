import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  EmailField,
  useNotify,
  useRedirect,
} from "react-admin";

export const UserCreate = (props) => {
  const notify = useNotify();
  const redirect = useRedirect();

  const onSuccess = (data) => {
    notify(`Changes saved`);
    redirect("/users");
  };
  return (
    <Create title="Create a Post" {...props} mutationOptions={{ onSuccess }}>
      <SimpleForm>
        <NumberInput source="id" />
        <TextInput source="name" />
        <EmailField source="email" />
        <TextInput source="phone" />
        <TextInput source="role" />
      </SimpleForm>
    </Create>
  );
};
