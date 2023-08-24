//Drawer.js
import * as React from 'react';
import { Drawer, ListItem, ListItemText, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState } from 'react';
const drawer_data = [
  { name: "About Us"},
];
export const MyBar = () => {
    const theme = createTheme();
 
    const [open, setOpen] = useState(false);

    const getList = () => (
        <div sx={{display: 'flex', justifyContent: 'center', mt: 50}} onClick={()=>setOpen(false)}>
          {drawer_data.map((item, index) => (
            <ListItem key={index} >
              <ListItemText primary={item.name} sx={{ textAlign: 'center', mt: 50}} primaryTypographyProps={{
                  style: {
                    fontSize: '30px'
                  }
                }}
              />
            </ListItem>
          ))}
        </div>
      );

    return (
        <ThemeProvider theme={theme}>
            <Drawer 
                variant='permanent' 
                anchor={"left"} 
                PaperProps={{sx: {backgroundColor: "#1f4700", color: "white", width: "300px" }}}>
                {getList()}
            </Drawer>
        </ThemeProvider>
    );
}