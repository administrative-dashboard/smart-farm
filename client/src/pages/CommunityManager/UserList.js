import React, { useEffect, useState } from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  useListContext,
  Loading,
  Button,
  EditButton,
  TextInput,
  Filter,
} from "react-admin";

import customDataProvider from "../../providers/dataProvider";
import axios from "axios";
import { API_URL } from "../../consts";
import { getJwtTokenFromCookies } from "../../providers/authUtils";
import { UserEdit } from "./UserEdit";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography"; // Import Typography from Material-UI

// Define a filter for the UserList
const UserFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
  </Filter>
);

export const UserList = (props) => {
  const dataProvider = customDataProvider;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [communityName, setCommunityName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchPhone, setSearchPhone] = useState("");

  const breakpoints = {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  };

  // Define CSS styles for different screen sizes
  const wrap = {
    xs: 'wrap',
    sm: 'wrap',
    md: 'wrap',
    lg: 'wrap',
    xl: 'nowrap',
  };

  // Declare screenWidth and setScreenWidth here
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const screenSize =
    screenWidth < breakpoints.sm
      ? "xs"
      : screenWidth < breakpoints.md
      ? "sm"
      : screenWidth < breakpoints.lg
      ? "md"
      : screenWidth < breakpoints.xl
      ? "lg"
      : "xl";

  // Define padding based on screen size
  const getpadding = () => {
    if (screenWidth <= 800) {
      return "12px";
    } else if (screenWidth <= 1300) {
      return "16px";
    } else {
      return "20px";
    }
  };

  // Define the number of columns based on screen size
  const getColumns = () => {
    if (screenWidth <= 800) {
      return 2; // Display 2 columns on small screens
    } else if (screenWidth <= 1300) {
      return 4; // Display 4 columns on medium screens
    } else {
      return 6; // Display 6 columns on larger screens
    }
  };

  // Define font sizes for different screen sizes
  const fontSizes = {
    xs: 9,
    sm: 10,
    md: 11,
    lg: 14,
    xl: 24,
  };

  // Fetch data from the data provider
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await dataProvider.getList("community/users", {
        pagination: { page: 1, perPage: 10 },
        sort: { field: "id", order: "ASC" },
        filter: {
          q: searchTerm,
          name: searchName,
          email: searchEmail,
          phone_number: searchPhone,
        },
      });

      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  };

  // Handle editing roles when the "Edit" button is clicked
  const handleEditRoles = async (user) => {
    try {
      setLoading(true);
      const response = await dataProvider.getOne("community/users", {
        id: user.id,
      });

      // Pass the user data to the EditRolesButton component
      setSelectedUserId(user.id);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data: ", error);
      setLoading(false);
    }
  };

  // Fetch initial data and community name
  useEffect(() => {
    fetchData();
    axios
      .get(`${API_URL}/user/community`, {
        headers: {
          Authorization: `Bearer ${getJwtTokenFromCookies()}`,
        },
      })
      .then((response) => {
        setCommunityName(response.data);
      });

    // Update screen width when the window is resized
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [searchTerm, searchName, searchEmail, searchPhone]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Typography
              sx={{ m: "auto", fontWeight: "bold" }}
              variant="h5"
              id="react-admin-title"
            >
              {communityName}
            </Typography>
          </Box>
          <List
            {...props}
            data={data}
            title={communityName}
            filters={<UserFilter />}
          >
            <Datagrid>
              <TextField
                source="name"
                sx={{
                  fontSize: fontSizes[screenSize],
                  gridTemplateColumns: `repeat(${getColumns()}, 1fr)`,
                }}
              />
              <EmailField
                source="email"
                sx={{
                  fontSize: fontSizes[screenSize],
                  gridTemplateColumns: `repeat(${getColumns()}, 1fr)`,
                }}
              />
              <TextField
                source="phone_number"
                sx={{
                  fontSize: fontSizes[screenSize],
                  gridTemplateColumns: `repeat(${getColumns()}, 1fr)`,
                }}
              />
              <TextField
                label="Roles"
                source="roles"
                sx={{
                  fontSize: fontSizes[screenSize],
                  gridTemplateColumns: `repeat(${getColumns()}, 1fr)`,
                }}
              />
              <TextField
                label="Permissions"
                source="permissions"
                sx={{
                  fontSize: fontSizes[screenSize],
                  gridTemplateColumns: `repeat(${getColumns()}, 1fr)`,
                }}
              />
              <EditButton onClick={handleEditRoles} />
            </Datagrid>
          </List>
        </>
      )}
    </>
  );
};
