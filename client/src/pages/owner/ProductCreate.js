import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  useNotify,
  useRedirect,
  required,
} from "react-admin";
import customDataProvider from "../../providers/dataProvider";

export const ProductCreate = (props) => {
  const currentDate = new Date();
  const notify = useNotify();
  const redirect = useRedirect();

  const validateProductName = [required()];
  const validateProductType = [required()];
  const validateProductDescription = [required()];

  const handleSave = async (values) => {
    try {
      const productData = {
        name: values.product_name,
        type: values.product_type,
        description: values.description,
        created_at: values.created_at.toISOString(),
      };

      const response = await customDataProvider.create("products/create", {
        data: productData,
      });

      if (response.data) {
        notify("Product created successfully", "info");
        redirect("/products");
      } else {
        console.error("Product creation failed:", response.error);
      }
    } catch (error) {
      console.error("Error creating product:", error);
      notify("Product already is existing", { type: "error" });
    }
  };

  return (
    <>
      <Create
        title="Create a product"
        {...props}
        // save={handleSave}
      >
        <SimpleForm onSubmit={handleSave}>
          <TextInput source="product_name" validate={validateProductName} />
          <TextInput source="product_type" validate={validateProductType} />
          <TextInput
            source="description"
            validate={validateProductDescription}
          />
          <DateInput source="created_at" defaultValue={currentDate} disabled />
        </SimpleForm>
      </Create>
    </>
  );
};
