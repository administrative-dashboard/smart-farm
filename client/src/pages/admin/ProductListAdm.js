import * as React from 'react';
import { Show, SimpleShowLayout, TextField } from 'react-admin';

export const ProductShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
    <TextField source="name" label="Greenhouse" />
          <TextField source="size" label="Size" />
          <TextField source="description" label="Description" />
          <TextField source="location" label="Location" />
    </SimpleShowLayout>
  </Show>
);


