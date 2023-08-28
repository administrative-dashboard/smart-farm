import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    EmailField,
    EditButton,
    DeleteButton
} from 'react-admin';

 const UserList = () => {
    return (
        <List>
            <Datagrid  sx={{
          ".RaDatagrid-rowEven": {
            backgroundColor: "lavender",
          },
          ".RaDatagrid-headerCell": {
            backgroundColor: "MistyRose",
          },
        }}>
              <TextField source="id" />
              <TextField source="name" />
              <EmailField source="email" />
              <TextField source="phone" />
              <TextField source="role" />
              <EditButton basePath='/users' />
              <DeleteButton  basePath='/users' />
            </Datagrid>
        </List>
    )
}

export default UserList