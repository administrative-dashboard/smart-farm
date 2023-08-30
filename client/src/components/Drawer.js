import * as React from 'react';
import { Box, Drawer, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState } from 'react';
export const MyBar = ({ drawerData }) => { // Accept drawerData as a prop
    const theme = createTheme();
    const [open, setOpen] = useState(false);
    const getList = () => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column', // Set the flex direction to 'column'
            justifyContent: 'center',
            mt: 15
          }}
          onClick={()=>setOpen(false)}
        >
          {drawerData.map((item, index) => ( // Use the passed prop drawerData
            <Button
              key={index}
              component="a"
              href={item.link}
              variant="contained" // Add variant="contained" for button styling
              color="primary" // Add color="primary" for primary button color
              sx={{
                background: "#1F4700",
                width: "100%",
                mt: 5,
                fontFamily: "Roboto",
                color: 'white',
                '&:hover': {
                  background: 'rgba(0,190,0,1)',
                  textDecoration: 'none',
                },
              }}
            >
              {item.name}
            </Button>
          ))}
        </Box>
    );
    return (
        <ThemeProvider theme={theme}>
            <Drawer
                variant='permanent'
                anchor={"left"}
                PaperProps={{sx: {backgroundColor: "#1F4700", color: "white", width: "20%" }}}>
                {getList()}
            </Drawer>
        </ThemeProvider>
    );
}


// // Drawer.js
// import * as React from 'react';
// import { Box, Drawer, Button } from '@mui/material';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { useState } from 'react';

// const drawer_data = [
//   { 
//     name: "About Us", 
//     link: "#/dashboard"
//   },
//   {
//     name: "Info Page", 
//     link: "#/adminPage"
//   },
//   {
//     name: "Settings",
//     link: "#/settings"
//   }
// ];

// export const MyBar = () => {
//     const theme = createTheme();
 
//     const [open, setOpen] = useState(false);

//     const getList = () => (
//         <Box 
//           sx={{
//             display: 'flex',
//             flexDirection: 'column', // Set the flex direction to 'column'
//             justifyContent: 'center', 
//             mt: 15
//           }} 
//           onClick={()=>setOpen(false)}
//         >
//           {drawer_data.map((item, index) => (
//             <Button 
//               key={index} 
//               component="a" 
//               href={item.link} 
//               variant="contained" // Add variant="contained" for button styling
//               color="primary" // Add color="primary" for primary button color
//               sx={{
//                 background: "#1f4700",
//                 width: "100%",
//                 mt: 5,
//                 fontFamily: "Roboto", 
//                 color: 'white', 
//                 '&:hover': {
//                   background: 'rgba(0,190,0,1)',
//                   textDecoration: 'none', 
//                 },
//               }}
//             >
//               {item.name}
//             </Button>
//           ))}
//         </Box>
//     );

//     return (
//         <ThemeProvider theme={theme}>
//             <Drawer 
//                 variant='permanent' 
//                 anchor={"left"} 
//                 PaperProps={{sx: {backgroundColor: "#1f4700", color: "white", width: "20%" }}}>
//                 {getList()}
//             </Drawer>
//         </ThemeProvider>
//     );
// }
