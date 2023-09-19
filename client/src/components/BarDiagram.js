// BarDiagram.js

import { BarChart } from "@mui/x-charts/BarChart";
import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";
import Theme from "./Theme";

export const BarDiagram = () => {
  return (
    <ThemeProvider theme={Theme}>
      <div>
        <Typography variant="h1">Bar Diagram</Typography>{" "}
        {/* Example heading */}
        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
            },
          ]}
          series={[{ data: [4, 3, 5, 4, 2, 1, 10, 5, 7, 8, 12, 11] }]}
          width={500}
          height={300}
        />
      </div>
    </ThemeProvider>
  );
};
