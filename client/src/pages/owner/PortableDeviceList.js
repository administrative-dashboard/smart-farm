import Axios from "axios";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  NumberField,
  EditButton,
  DeleteButton,
  TextInput,
  NumberInput,
  DateInput,
  Filter,
  SearchInput, // Import Filter
} from "react-admin";
import { Box } from "@mui/material";
import { useDataProvider } from "react-admin";
import { HomeRedirectButton } from "../../components/HomeRedirectButton";
import { ResetFilters } from "../../components/ResetFilters";
import { getUserInfoFromCookies } from "../../providers/authUtils";
import { getJwtTokenFromCookies } from "../../providers/authUtils";

// Define a custom filter component

import customDataProvider from "../../providers/dataProvider";
export const PortableDeviceList = (props) => {
  /* const dataProvider = useDataProvider(); */
  const dataProvider = customDataProvider;
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const fetchData = async () => {
    try {
      // Имитируем задержку в 5 секунд

      const response = await dataProvider.getList("portable_devices", {
        pagination: { page: 1, perPage: 10 },
        sort: { field: "id", order: "ASC" },
        filter: { q: searchTerm }, // Используем текущее значение поиска
      });

      console.log("ЗАПРОС ОТПРАВЛЕН ВОТ ЭЛЕМЕНТ ДЛЯ ПОИСКА ", searchTerm);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const DeviceFilter = (props) => (
    <Filter {...props}>
      <SearchInput source="q" alwaysOn onChange={handleSearchInputChange} />
      <TextInput label="Name" source="device_name" />
      <TextInput label="Type" source="device_type" />
      <NumberInput label="Quantity" source="quantity" />
      <NumberInput label="Shared Quantity" source="shared_quantity" />
      <DateInput label="Date" source="created_at" />
    </Filter>
  );
  useEffect(() => {
    // Функция для загрузки данных с учетом поискового запроса
    fetchData(); // Вызываем функцию при загрузке компонента
  }, []);
  const applySearch = () => {
    // Выполняем запрос на сервер при нажатии на кнопку "Apply Filter"
    fetchData();
  };
  const handleSearchInputChange = async (e) => {
    if (e.target.value) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setSearchTerm(e.target.value);
    }
  };
  return (
    <>
      <ResetFilters />
      <button onClick={applySearch}>Apply Search</button>
      <List
        {...props}
        data={data}
        filters={<DeviceFilter />} // Use the custom DeviceFilter
        sx={{ color: "#38A505" }}
      >
        <Datagrid>
          {" "}
          <TextField source="device_name" label="Name" />
          <TextField source="device_type" label="Type" />
          <NumberField source="quantity" label="Quantity" />
          <NumberField source="shared_quantity" label="Shared Quantity" />
          <DateField source="created_at" label="Date" />
          <EditButton />
          <DeleteButton />
        </Datagrid>
      </List>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        <HomeRedirectButton pageName="devices" title="Devices" />
        <HomeRedirectButton pageName="ownerPage" title="Home" />
      </Box>
    </>
  );
};
