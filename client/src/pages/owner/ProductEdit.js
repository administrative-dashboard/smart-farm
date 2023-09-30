//client//pages/admin/ProductEdit.js
import React from "react";
import { Edit, SimpleForm, TextInput, required, DateInput } from "react-admin";
import { Box } from "@mui/material";

import { HomeRedirectButton } from "../../components/HomeRedirectButton";

export const ProductEdit = (props) => {
  return (
    <>
      <Edit title="Edit a product" {...props} resource="products">
        <SimpleForm>
          <TextInput source="product_name" validate={[required()]} />
          <TextInput source="product_type" validate={[required()]} />
          <TextInput
            source="description"
            label="Description"
            validate={[required()]}
          />
          <DateInput source="created_at" label="Date" disabled />
        </SimpleForm>
      </Edit>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        <HomeRedirectButton pageName="products" title="Products" />
        <HomeRedirectButton pageName="ownerPage" title="Home" />
      </Box>
    </>
  );
};
