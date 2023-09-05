// Fixed.js
import * as React from "react";
import { Show, SimpleShowLayout, TextField } from "react-admin";

export const GreenhouseShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="name" label="Greenhouse" />
      <TextField source="owner" label="Owner" />
      <TextField source="size" label="Size" />
      <TextField source="description" label="Description" />
      <TextField source="location" label="Location" />
    </SimpleShowLayout>
  </Show>
);
