// BasicSelectForm.js

import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./Theme";

export const BasicSelect = ({ onChange }) => {
  const [form, setForm] = React.useState("");

  const handleChange = (event) => {
    const newForm = event.target.value;
    setForm(newForm);
    onChange(newForm);
  };

  const SelectStyle = {
    width: "35%",
    height: "100%",
  };
  const FarmStyle = {
    marginLeft: "32%",
  };

  return (
    <ThemeProvider theme={Theme}>
      <div>
        <FormControl fullWidth style={FarmStyle}>
          <InputLabel id="demo-simple-select-label">View form</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={form}
            label="Farm"
            onChange={handleChange}
            style={SelectStyle}
          >
            <MenuItem value={"Diagram"}>Diagram</MenuItem>
            <MenuItem value={"BarDiagram"}>Bar Diagram</MenuItem>
            <MenuItem value={"CircleDiagram"}>Circle Diagram</MenuItem>
            <MenuItem value={"BasicTable"}>BasicTable</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ minWidth: 520 }}>
          {/* Logic to render specific components based on the form's value will go here */}
        </Box>
      </div>
    </ThemeProvider>
  );
};
