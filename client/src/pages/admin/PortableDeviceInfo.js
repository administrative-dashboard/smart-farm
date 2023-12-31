import React from "react";
import Table from "../../components/Table";
import { NumberInput, TextInput } from "react-admin";
import { ResetFilters } from "../../components/ResetFilters";
import ExportButton from "../../components/ExportButton";
import SearchButton from "../../components/SearchButton";
const userFilter = [
  <TextInput label="Search" source="q" alwaysOn />,
  <TextInput label="name" source="name" />,
  <NumberInput label="size" source="type" />,
  <TextInput label="description" source="description" />,
  <TextInput label="location" source="location" />,
];

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 200, justifyContent: "left" },
  {
    field: "community",
    headerName: "owner",
    width: 200,
    justifyContent: "left",
  },
  {
    field: "quantity",
    headerName: "Quantity",
    type: "number",
    width: 200,
    justifyContent: "left",
  },
];

const rows = [
  { id: 1, userName: "Snow", role: "Jon", PhoneNumber: 3555535, email: "" },
  {
    id: 2,
    userName: "Lannister",
    role: "Cersei",
    phoneNumber: 555542,
    email: "lannister72@gmail.com",
  },
  {
    id: 3,
    userName: "Jaime",
    role: "Jaime",
    phoneNumber: 4555484845,
    email: "Jami",
  },
  {
    id: 4,
    userName: "Stark",
    role: "Arya",
    phoneNumber: 11510005156,
    email: "",
  },
  {
    id: 5,
    userName: "Targaryen",
    role: "Daenerys",
    phoneNumber: 1515151,
    email: "",
  },
  {
    id: 6,
    userName: "Melisandre",
    role: "farmer",
    phoneNumber: 111212150,
    email: "",
  },
  {
    id: 7,
    userName: "Clifford",
    role: "Ferrara",
    phoneNumber: 10220521,
    email: "",
  },
  {
    id: 8,
    userNmae: "Frances",
    role: "Rossini",
    phoneNumber: 3221216,
    email: "",
  },
  {
    id: 9,
    userName: "Roxie",
    role: "Harvey",
    phoneNumber: 6156102055,
    email: "",
  },
];

export const PortableDeviceInfo = () => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRows = rows.filter(
    (row) =>
      (row.userName &&
        row.userName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (row.role && row.role.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (row.phoneNumber && row.phoneNumber.toString().includes(searchTerm)) ||
      (row.email && row.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <ResetFilters />
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
      >
        <SearchButton searchTerm={searchTerm} handleSearch={handleSearch} />
        <ExportButton data={filteredRows} columns={columns} />
      </div>
      <Table columns={columns} rows={filteredRows} />
    </>
  );
};
