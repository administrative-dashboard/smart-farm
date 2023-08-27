
import * as React from 'react';
import { Show, SimpleShowLayout, TextField } from 'react-admin';

export const SensorsShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="Owner" label="Owner" />
      <TextField source="Type" label="Type" />
      <TextField source="Model" label="Model" />
      <TextField source="Status" label="Status" />
    </SimpleShowLayout>
  </Show>
);


