import React, { useEffect, useState } from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  Loading,
  EditButton,
} from "react-admin";
import customDataProvider from "../../providers/dataProvider";
import axios from "axios";
// import { API_URL } from "../../consts";
import { getJwtTokenFromCookies } from "../../providers/authUtils";

const API_URL = process.env.REACT_APP_API_URL;

export const UserList = (props) => {
  const dataProvider = customDataProvider;
  const [data, setData] = useState([]);
  const [communityName, setCommunityName] = useState("");
  const [loading, setLoading] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await dataProvider.getList("community/users", {
        pagination: { page: 1, perPage: 10 },
        sort: { user: "id", order: "ASC" },
      });

      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  };

  const breakpoints = {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  };

  const screenSize =
    window.innerWidth < breakpoints.sm
      ? "xs"
      : window.innerWidth < breakpoints.md
      ? "sm"
      : window.innerWidth < breakpoints.lg
      ? "md"
      : window.innerWidth < breakpoints.xl
      ? "lg"
      : "xl";

  const fontSizes = {
    xs: 9,
    sm: 10,
    md: 11,
    lg: 14,
    xl: 24,
  };

  // const wrap = {
  //   xs: 'wrap',
  //   sm: 'wrap',
  //   md: 'wrap',
  //   lg: 'wrap',
  //   xl: 'nowrap',
  // };

  // const maxCharCount = {
  //   xs: 50, // Adjust the character count based on your preference
  //   sm: 75,
  //   md: 100,
  //   lg: 125,
  //   xl: 150,
  // };

  // const padding = {
  //   xs: 0,
  //   sm: 0,
  //   md: 0,
  //   lg: 0,
  //   xl: 0,
  // }

  // const getFontSize = () => {
  //   if (screenWidth <= 800) {
  //     return "12px";
  //   } else if (screenWidth <= 1300) {
  //     return "16px";
  //   } else {
  //     return "20px";
  //   }
  // };

  // const getpadding = () => {
  //   if (screenWidth <= 800) {
  //     return "12px";
  //   } else if (screenWidth <= 1300) {
  //     return "16px";
  //   } else {
  //     return "20px";
  //   }
  // };

  const getColumns = () => {
    if (screenWidth <= 800) {
      return 2; // Display 2 columns on small screens
    } else if (screenWidth <= 1300) {
      return 4; // Display 4 columns on medium screens
    } else {
      return 6; // Display 6 columns on larger screens
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

    // Update screen width when the window is resized
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <List
            {...props}
            data={data}
            title={communityName}
            sx={{ width: "100%" }}
          >
            <Datagrid
              sx={{
                fontSize: fontSizes[screenSize],
                // whiteSpace: wrap[screenSize],
                // overflowWrap: 'break-word',
                // padding: padding[screenSize],
                gridTemplateColumns: `repeat(${getColumns()}, 1fr)`,
                // padding: getpadding(),
              }}
            >
              <TextField
                source="name"
                sx={{
                  fontSize: fontSizes[screenSize],
                  // whiteSpace: wrap[screenSize],
                  // overflowWrap: 'break-word',
                  // padding: padding[screenSize],
                  gridTemplateColumns: `repeat(${getColumns()}, 1fr)`,
                  // padding: getpadding(),
                }}
              />
              <EmailField
                source="email"
                sx={{
                  fontSize: fontSizes[screenSize],
                  // whiteSpace: wrap[screenSize],
                  // overflowWrap: 'break-word',
                  // padding: padding[screenSize],
                  gridTemplateColumns: `repeat(${getColumns()}, 1fr)`,
                  // padding: getpadding(),
                }}
              />
              <TextField
                source="phone_number"
                sx={{
                  fontSize: fontSizes[screenSize],
                  // whiteSpace: wrap[screenSize],
                  // overflowWrap: 'break-word',
                  // padding: padding[screenSize],
                  gridTemplateColumns: `repeat(${getColumns()}, 1fr)`,
                  // padding: getpadding(),
                }}
              />
              <TextField
                label="Roles"
                source="roles"
                sx={{
                  fontSize: fontSizes[screenSize],
                  // whiteSpace: wrap[screenSize],
                  // overflowWrap: 'break-word',
                  // padding: padding[screenSize],
                  gridTemplateColumns: `repeat(${getColumns()}, 1fr)`,
                  // padding: getpadding(),
                }}
              />
              <TextField
                label="Permissions"
                source="permissions"
                sx={{
                  fontSize: fontSizes[screenSize],
                  // whiteSpace: wrap[screenSize],
                  // overflowWrap: 'break-word',
                  // padding: padding[screenSize],
                  gridTemplateColumns: `repeat(${getColumns()}, 1fr)`,
                  // padding: getpadding(),
                }}
              />
              <EditButton />
            </Datagrid>
          </List>
          {console.log("Screen Width:", screenWidth)}

          {console.log("Number of Columns:", getColumns())}
          {console.log("Font Size:", fontSizes[screenSize])}
        </>
      )}
    </>
  );
};
