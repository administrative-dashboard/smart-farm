/* global BigInt */
import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Select, MenuItem } from "@mui/material";
// import { API_URL } from "../../consts";
import { getJwtTokenFromCookies } from "../../providers/authUtils";
import axios from "axios";
// import { GRAFANA_URL } from "../../consts";

const API_URL=process.env.REACT_APP_API_URL;
const GRAFANA_URL = process.env.REACT_APP_GRAFANA_URL;
export const FixedDeviceStatisticsPage = () => {
  const [communityName, setCommunityName] = useState("");
  const [chartType, setChartType] = useState("pie");

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
      iframeSrc = `${GRAFANA_URL}/d-solo/b7519d35-952b-4d17-b0b5-55b5dd46a56a/statistics?orgId=1&var-community=${communityName}&var-start_date=${startValueBigInt}&var-end_date=${endValueBigInt}&theme=light&panelId=3`;
      break;
    case "bar":
      iframeSrc=`${GRAFANA_URL}/d-solo/b7519d35-952b-4d17-b0b5-55b5dd46a56a/statistics?orgId=1&var-community=${communityName}&var-start_date=${startValueBigInt}&var-end_date=${endValueBigInt}&theme=light&panelId=4` 
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            components={["DatePicker", "DatePicker"]}
            sx={{ mb: 5, justifyContent: "center" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <DatePicker
                  label="Start"
                  value={startValue}
                  onChange={(newValue) => setStartValue(newValue)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <DatePicker
                  label="End"
                  value={endValue}
                  onChange={(newValue) => setEndValue(newValue)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Select value={chartType} onChange={handleChartTypeChange}>
                  <MenuItem value="pie">Pie Chart</MenuItem>
                  <MenuItem value="bar">Bar Chart</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </DemoContainer>
        </LocalizationProvider>

        {iframeSrc ? (
          <iframe
            src={iframeSrc}
            width="95%"
            height="500"
          ></iframe>
        ) : (
          <div>No iframe for this chart type.</div>
        )}
      </Container>
    </Box>
  );
};
