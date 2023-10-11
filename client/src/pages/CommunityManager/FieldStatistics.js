import React, { useEffect, useState } from "react";
import { Box, Container, Select, MenuItem } from "@mui/material";
import { getJwtTokenFromCookies } from "../../providers/authUtils";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const GRAFANA_URL = process.env.REACT_APP_GRAFANA_URL;

export const FieldStatisticsPage = () => {
  const [communityName, setCommunityName] = useState("");
  const [chartType, setChartType] = useState("pie");
  const uid_fields_greenhouses = "d1107e1c-40f7-4abe-abc5-3fea3afe010f";
  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  const getCommunityName = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/community`, {
        headers: {
          Authorization: `Bearer ${getJwtTokenFromCookies()}`,
        },
      });
      setCommunityName(response.data);
      console.log("Community name", response.data);
    } catch (error) {
      console.error("Error fetching community name:", error);
    }
  };

  useEffect(() => {
    getCommunityName();
  }, []);

  console.log("Community name: ", communityName);

  let iframeSrc = "";
  switch (chartType) {
    case "pie":
      iframeSrc = `${GRAFANA_URL}/d-solo/${uid_fields_greenhouses}/statistics-for-fields-and-greenhouses?orgId=1&var-community=${communityName}&theme=light&panelId=1`;
      break;
    case "bar":
      iframeSrc = `${GRAFANA_URL}/d-solo/${uid_fields_greenhouses}/statistics-for-fields-and-greenhouses?orgId=1&var-community=${communityName}&theme=light&panelId=3`;
      break;

    default:
      iframeSrc = "";
  }

  return (
    <Box
      style={{
        display: "flex",
      }}
    >
      <Container>
        <Select
          value={chartType}
          onChange={handleChartTypeChange}
          sx={{ mb: 5, mt: 5 }}
        >
          <MenuItem value="pie">Pie Chart</MenuItem>
          <MenuItem value="bar">Bar Chart</MenuItem>
        </Select>

        {iframeSrc ? (
          <iframe src={iframeSrc} width="95%" height="500"></iframe>
        ) : (
          <div>No iframe for this chart type.</div>
        )}
      </Container>
    </Box>
  );
};
