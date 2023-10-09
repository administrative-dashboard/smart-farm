// import { CLIENT_URL } from "../../../consts";
const CLIENT_URL=process.env.REACT_APP_CLIENT_URL;
export const owner_drawer = [
    {
        name: "Home",
        link: `${CLIENT_URL}/dashboard`
    },
    {
      name: "My properties",  
      link: `${CLIENT_URL}/ownerPage`
    },
    {
      name: "Profile image",
      link: ""
    },
    {
      name: "My Profile",
      link: `${CLIENT_URL}/profile`
    },
  ];