import React from 'react';
import Table from '../components/Table';
import {
    NumberInput,
    List,
    Datagrid,
    TextField,
    NumberField,
    EditButton,
    DeleteButton,
    TextInput
} from 'react-admin';
// Update the following imports based on your actual directory structure
import { HomeRedirectButton } from '../components/HomeRedirectButton';
import { ResetFilters } from '../components/ResetFilters';
import SearchButton from '../components/SearchButton';
const userFilter = [
    <TextInput label="Search" source="q" alwaysOn />,
    <TextInput label="name" source="name" />,
    <NumberInput label="size" source="type" />,
    <TextInput label="description" source="description" />,
    <TextInput label="location" source="location" />,
];

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'userName', headerName: 'User Name', width: 200, editable: true },
  { field: 'role', headerName: 'Role', width: 200, editable: true },
  { field: 'phoneNumber', headerName: 'Phone Number', type: 'number', width: 200, editable: true },
  { field: 'email', headerName: 'Email', type: 'email', width: 200, editable: true },
];

const rows = [
    { id: 1, userName: 'Snow', role: 'Jon', PhoneNumber: 35, email: '' },
    { id: 2, userName: 'Lannister', role: 'Cersei', phoneNumber: 42, email: 'lannister72@gmail.com'},
    { id: 3, userName: 'Jaime', role: 'Jaime', phoneNumber: 45, email: 'Jami'},
    { id: 4, userName: 'Stark', role: 'Arya', phoneNumber: 16, email: ''},
    { id: 5, userName: 'Targaryen', role: 'Daenerys', phoneNumber: null, email: ''},
    { id: 6, userName: 'Melisandre', role: 'farmer', phoneNumber: 150, email: ''},
    { id: 7, userName: 'Clifford', role: 'Ferrara', phoneNumber: 44, email: ''},
    { id: 8, userNmae: 'Frances', role: 'Rossini', phoneNumber: 36, email: ''},
    { id: 9, userName: 'Roxie', role: 'Harvey', phoneNumber: 65, email: ''},
];

export const UserInfo = () => {
    const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRows = rows.filter((row) =>
  (row.userName && row.userName.toLowerCase().includes(searchTerm.toLowerCase())) ||
  (row.role && row.role.toLowerCase().includes(searchTerm.toLowerCase())) ||
  (row.phoneNumber && row.phoneNumber.toString().includes(searchTerm)) ||
  (row.email && row.email.toLowerCase().includes(searchTerm.toLowerCase()))
);

  return (
    <>
            <ResetFilters />
            <SearchButton searchTerm={searchTerm} handleSearch={handleSearch} />
            <Table columns={columns} rows={filteredRows} />
        </>
  );
};
