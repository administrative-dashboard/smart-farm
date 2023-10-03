import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  useNotify,
  useRedirect,
  required,
  Toolbar,
  SaveButton,
  Button,
  DeleteButton,
} from "react-admin";
import customDataProvider from "../../providers/dataProvider";

export const ProductEdit = (props) => {
  const notify = useNotify();
  const redirect = useRedirect();
  const handleSave = async (values) => {
    try {
      const productData = {
        id: values.id,
        product_name: values.product_name,
        product_type: values.product_type,
        description: values.description,
        created_at: values.created_at,
      };
      console.log(productData.id);
      const response = await customDataProvider.update("products", {
        data: productData,
        id: productData.id,
      });
      console.log(response);
      if (response.status === 200) {
        notify("Product updated successfully", "info");
        redirect("/products");
      } else if (response.status === 400) {
        const Error = await response.json();
        const message = Error.message;
        if (message) {
          notify(message, { type: "error" });
        } else {
          notify("An error occurred", { type: "error" });
        }
      } else {
        notify("An error occurred", { type: "error" });
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  const handleCancel = () => {
    redirect("/products");
  };
  return (
    <>
      <Edit title="Edit a product" {...props} resource="products">
        <SimpleForm
          onSubmit={handleSave}
          toolbar={
            <Toolbar>
              <SaveButton
                label="Save"
                submitOnEnter={true}
                sx={{ mr: "80%" }}
              />

              <Button label="Cancel" onClick={handleCancel} sx={{ mr: "3%" }} />
              <DeleteButton />
            </Toolbar>
          }
        >
          <TextInput source="product_name" label="Name" validate={required()} />
          <TextInput source="product_type" label="Type" validate={required()} />
          <TextInput
            source="description"
            label="Description"
            validate={required()}
          />
          <DateInput source="updated_at" label="Date" disabled />
        </SimpleForm>
      </Edit>
    </>
  );
};
