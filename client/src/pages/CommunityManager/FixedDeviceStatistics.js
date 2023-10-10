/* global BigInt */
import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Select, MenuItem } from "@mui/material";
import { getJwtTokenFromCookies } from "../../providers/authUtils";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const API_URL = process.env.REACT_APP_API_URL;
const GRAFANA_URL = process.env.REACT_APP_GRAFANA_URL;
export const FixedDeviceStatisticsPage = () => {
  const [communityName, setCommunityName] = useState("");
  const [startValue, setStartValue] = useState(dayjs());
  const [endValue, setEndValue] = useState(dayjs());
  const [chartType, setChartType] = useState("pie");
  const uid_devices = "b7519d35-952b-4d17-b0b5-55b5dd46a56a";
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

  const startValueBigInt = BigInt(startValue.valueOf());
  const endValueBigInt = BigInt(endValue.valueOf());

  console.log("Community name: ", communityName);
  console.log("Start value: ", startValueBigInt);
  console.log("End value: ", endValueBigInt);

  let iframeSrc = "";
  switch (chartType) {
    case "pie":
      iframeSrc = `${GRAFANA_URL}/d-solo/${uid_devices}/statistic?orgId=1&var-community=${communityName}&var-start_date=${startValueBigInt}&var-end_date=${endValueBigInt}&from=1696717878879&to=1696739478880&theme=light&panelId=3`;
      break;
    case "bar":
      iframeSrc = `${GRAFANA_URL}/d-solo/${uid_devices}/statistic?orgId=1&var-community=${communityName}&var-start_date=${startValueBigInt}&var-end_date=${endValueBigInt}&from=1696717952536&to=1696739552537&theme=light&panelId=4`;
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
          <iframe src={iframeSrc} width="95%" height="500"></iframe>
        ) : (
          <div>No iframe for this chart type.</div>
        )}
      </Container>
    </Box>
  );
};
