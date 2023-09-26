// //client//pages/owner/UserEd.js
// import React, { useEffect, useState } from "react";
// import {
//   Edit,
//   SimpleForm,
//   TextInput,
//   DateInput,
//   NumberInput,
//   useDataProvider,
// } from "react-admin";
// import { Box, MenuItem, TextField } from "@mui/material";

// import { HomeRedirectButton } from "../../components/HomeRedirectButton";
// import customDataProvider from "../../providers/dataProvider";
// import axios from "axios";
// import { API_URL } from "../../consts";
// import { getJwtTokenFromCookies } from "../../providers/authUtils";

// export const UserEdit = (props) => {
//   const [selectedRole, setSelectedRole] = useState("");
//   const [roles, setRoles] = useState([]);
//   useEffect(() => {
//     axios
//       .get(`${API_URL}/user/roles`, {
//         headers: {
//           Authorization: `Bearer ${getJwtTokenFromCookies()}`,
//         },
//       })
//       .then((response) => {
//         setRoles(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching roles: ", error);
//       });
//   }, []);


//   return (
//     <>
//       <Edit 
//         title="Edit a user" {...props}
//         resource="community/users"
//       >
//         <SimpleForm>
//           {/* <NumberInput source="id" disable /> */}
//           <TextInput source="name" label="Name" />
//           <TextInput source="phone_number" label="Phone_number" />
//           <TextInput source="roles" label="Role" />
//         </SimpleForm>
//       </Edit>
//       <Box
//         display="flex"
//         flexDirection="row"
//         justifyContent="center"
//         alignItems="center"
//       >

//       </Box>
//     </>
//   );
// };

import React, { useEffect, useState } from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  NumberInput,
  SelectInput, // Import SelectInput
  useDataProvider,
} from "react-admin";
import { Box, MenuItem, TextField } from "@mui/material";

import { HomeRedirectButton } from "../../components/HomeRedirectButton";
import customDataProvider from "../../providers/dataProvider";
import axios from "axios";
import { API_URL } from "../../consts";
import { getJwtTokenFromCookies } from "../../providers/authUtils";

export const UserEdit = (props) => {
  const [selectedRole, setSelectedRole] = useState("");
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    axios
      .get(`${API_URL}/user/roles`, {
        headers: {
          Authorization: `Bearer ${getJwtTokenFromCookies()}`,
        },
      })
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching roles: ", error);
      });
  }, []);

  return (
    <>
      <Edit title="Edit a user" {...props} resource="community/users">
        <SimpleForm>
          {/* <NumberInput source="id" disable /> */}
          <TextInput source="name" label="Name" />
          <TextInput source="phone_number" label="Phone_number" />
          <SelectInput
            source="roles"
            label="Role"
            choices={roles.map((role) => ({
              id: role.value,
              name: role.value,
            }))}
          />
        </SimpleForm>
      </Edit>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      ></Box>
    </>
  );
};
