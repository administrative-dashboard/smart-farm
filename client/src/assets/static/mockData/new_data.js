// import { CLIENT_URL } from "../../../consts";
const CLIENT_URL=process.env.REACT_APP_CLIENT_URL;
export const drawer_new_data = [
    {
        name: "Home",
        link: `${CLIENT_URL}/dashboard`
    },
    {
      name: "Profile image",
      link: "#/Profile"
    },
    {
      name: "My Profile",
      link: `${CLIENT_URL}/profile`
    },
    

  ];