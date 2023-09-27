import React, { useState } from "react";
import {
  Create,
  ReferenceInput,
  AutocompleteInput,
  useNotify,
  useRedirect,
  Form,
  Button,
} from "react-admin";
import axios from "axios";
import { Stack } from "@mui/material";

export const CustomProductRequestCreate = (props) => {
  const notify = useNotify();
  const redirect = useRedirect();
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleProductChange = (e, choice) => {
    setSelectedProductId(choice ? choice.id : null);
  };

  const handleCreate = (data) => {
    data.product_id = selectedProductId;
    data.user_id = 1;

    axios
      .post("product_requests_history", data)
      .then(() => {
        notify("Product request created successfully");
        redirect("list", "/product_requests_history");
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
            label="Product"
            source="product_id"
            reference="products"
            onChange={handleProductChange}
          >
            <AutocompleteInput
              optionText={(choice) => `${choice.name} - ${choice.type}`}
            />
          </ReferenceInput>
          <Button type="submit" sx={{ color: "black", fontSize: "1rem" }}>
            Send
          </Button>
        </Stack>
      </Form>
    </Create>
  );
};
