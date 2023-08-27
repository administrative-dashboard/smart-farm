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
import { HomeRedirectButton } from '../components/HomeRedirectButton';
import ExportButton from '../components/ExportButton';
import { ResetFilters } from '../components/ResetFilters';
import SearchButton from '../components/SearchButton';
const Filter = [
    <TextInput label="Search" source="q" alwaysOn />,
    <TextInput label="name" source="name" />,
    <NumberInput label="size" source="type" />,
    <TextInput label="description" source="description" />,
    <TextInput label="Location" source="Location" />,
];

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'Name', headerName: ' Name', width: 200, editable: true },
  { field: 'Location', headerName: 'Location', width: 200, editable: true },
  { field: 'Owner', headerName: 'Owner',  width: 200, editable: true },
  { field: 'size', headerName: 'size', type: 'number', width: 200, editable: true },
];

const rows = [
    { id: 1, Name: 'Vanadzor N1', Location: 'Jon', Owner: "Anna", size: 25 },
    { id: 2, Name: 'Vanadzor N2', Location: 'Cersei', Owner: "Anina", size: 25},
    { id: 3, Name: 'Vanadzor N2', Location: 'Jaime', Owner: "Annia", size: 25},
    { id: 4, Name: 'Vanadzor N2', Location: 'Arya', Owner: "Annai", size: 25},
    { id: 5, Name: 'Vanadzor N2', Location: 'Daenerys', Owner: "Anna", size: 25},
    { id: 6, Name: 'Vanadzor N2', Location: 'farmer', Owner: "Anna0", size: 25},
    { id: 7, Name: 'Vanadzor N2', Location: 'Ferrara', Owner: "Anna", size: 25},
    { id: 8, Nmae: 'Vanadzor N2', Location: 'Rossini', Owner: "Andna", size: 25},
    { id: 9, Name: 'Vanadzor N2', Location: 'Harvey', Owner: "Annda", size: 25},
    { id: 10, Name: 'Vanadzor N2', Location: 'Harvey', Owner: "Addnna", size: 25},
    { id: 11, Name: 'Vanadzor N2', Location: 'Harvey', Owner: "Annda", size: 25},
    { id: 12, Name: 'Vanadzor N2', Location: 'Harvey', Owner: "Anndea", size: 25},
];

export const GreenhouseInfo = () => {
    const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRows = rows.filter((row) =>
  (row.Name && row.Name.toLowerCase().includes(searchTerm.toLowerCase())) ||
  (row.Location && row.Location.toLowerCase().includes(searchTerm.toLowerCase())) ||
  (row.Owner && row.Owner.toString().includes(searchTerm)) ||
  (typeof row.size === 'string' && row.size.toLowerCase().includes(searchTerm.toLowerCase()))
);

  return (
    <>
            <ResetFilters />
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <SearchButton searchTerm={searchTerm} handleSearch={handleSearch} />
                <ExportButton data={filteredRows} columns={columns} />
            </div>
            <Table columns={columns} rows={filteredRows} />
        </>
  );
};
