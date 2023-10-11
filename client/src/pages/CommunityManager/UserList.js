import React, { useEffect, useState } from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  Loading,
  EditButton,
  TextInput,
  Filter,
} from "react-admin";

import customDataProvider from "../../providers/dataProvider";
import axios from "axios";
import { API_URL } from "../../consts";
import { getJwtTokenFromCookies } from "../../providers/authUtils";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

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

  const wrap = {
    xs: 'wrap',
    sm: 'wrap',
    md: 'wrap',
    lg: 'wrap',
    xl: 'nowrap',
  };

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

  const getColumns = () => {
    if (screenWidth <= 800) {
      return 2;
    } else if (screenWidth <= 1300) {
      return 4;
    } else {
      return 6;
    }
  };

  const fontSizes = {
    xs: 9,
    sm: 10,
    md: 11,
    lg: 14,
    xl: 24,
  };


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

  const handleEditRoles = async (user) => {
    try {
      setLoading(true);
      const response = await dataProvider.getOne("community/users", {
        id: user.id,
      });
      setSelectedUserId(user.id);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data: ", error);
      setLoading(false);
    }
  };

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


    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

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
