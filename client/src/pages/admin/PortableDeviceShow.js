import * as React from "react";
import { Show, SimpleShowLayout, TextField } from "react-admin";

export const PortableDeviceShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="Device" label="Device" />
      <TextField source="Owner" label="Owner" />
      <TextField source="Type" label="Type" />
      <TextField source="Status" label="Status" />
    </SimpleShowLayout>
  </Show>
);
