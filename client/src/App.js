import * as React from "react";
import "./App.css";
import { Admin, Resource } from "react-admin";
import { MyLayout } from "./layouts/Layout";
import HomeIcon from "@mui/icons-material/Home";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import ArticleIcon from "@mui/icons-material/Article";
import polyglotI18nProvider from "ra-i18n-polyglot";
import englishMessages from "ra-language-english";
import armenianMessages from "ra-language-armenian";
import { BrowserRouter, Route } from "react-router-dom";
import { MainDashboard } from "./pages/MainDashboard";
import { Signin } from "./pages/auth/Signin";
import { Signup } from "./pages/auth/Signup";
import { Profile } from "./pages/auth/Profile";
import { AdminDesktop } from "./pages/admin/Desktop";
import { ChooseDevice } from "./pages/admin/ChooseDevice";
import { ChooseCommunity } from "./pages/admin/ChooseCommunity";
import { FixedDeviceShow } from "./pages/admin/FixedDeviceShow";
import { UserShowAdm } from "./pages/admin/UserShow";
import { UserListAdm } from "./pages/admin/UserList";
import { FixedDeviceListAdm } from "./pages/admin/FixedDeviceListAdm";
import { PortableDeviceListAdm } from "./pages/admin/PortableDeviceListAdm";
import { PortableDeviceShow } from "./pages/admin/PortableDeviceShow";
//import { SensorsShow } from "./pages/admin/SensorsShow";
//import { SensorsListAdm } from "./pages/admin/SensorsListAdm";
import { OwnerDesktop } from "./pages/owner/Desktop";
import { PortableDeviceList } from "./pages/owner/PortableDeviceList";
import { GreenhouseList } from "./pages/owner/GreenhouseList";
import { DeviceDesktop } from "./pages/owner/DeviceDesktop";
import { PortableDeviceCreate } from "./pages/owner/PortableDeviceCreate";
import { PortableDeviceEdit } from "./pages/owner/PortableDeviceEdit";
import { FixedDeviceList } from "./pages/owner/FixedDeviceList";
import { FixedDeviceCreate } from "./pages/owner/FixedDeviceCreate";
import { FixedDeviceEdit } from "./pages/owner/FixedDeviceEdit";
import { GreenhouseCreate } from "./pages/owner/GreenhouseCreate";
import { GreenhouseEdit } from "./pages/owner/GreenhouseEdit";
import { FieldCreate } from "./pages/owner/FieldCreate";
import { FieldList } from "./pages/owner/FieldList";
import { FieldEdit } from "./pages/owner/FieldEdit";
//import { DeviceRequest } from "./pages/owner/DeviceRequest";
import { GreenhouseShow } from "./pages/admin/GreenhouseShow";
import { GreenhouseListAdm } from "./pages/admin/GreenhouseList";
import { ProductListAdm } from "./pages/admin/ProductList";
import { ProductShow } from "./pages/admin/ProductListAdm";
import { DeviceStatisticPage } from "./pages/admin/DeviceStatistic";
import { Contact } from "./pages/auth/Contact";
import { CommunityManager } from "./pages/CommunityManager/Desktop";
import { UserList } from "./pages/CommunityManager/UserList";
import { DesktopInfo } from "./pages/CommunityManager/DesktopInfo";
import axios from "axios";
import { getJwtTokenFromCookies } from "./providers/authUtils";
// import dataProvider from "./providers/dataProvider";
// const dataProvider = simpleRestProvider(API_URL);
// import customDataProvider from "./providers/dataProvider";
import customDataProvider from "./providers/dataProvider";
//const dataProvider = jsonServerProvider(API_URL);
/* const dataProvider = simpleRestProvider(API_URL); */
import { authProvider } from "./providers/authPovider";
import { API_URL } from "./consts";
import { UserEdit } from "./pages/CommunityManager/UserEdit";
const i18nProvider = polyglotI18nProvider(
  (locale) => (locale === "am" ? armenianMessages : englishMessages),
  "en" // Default locale
);

const App = () => {
  const isAuthenticated = getJwtTokenFromCookies() ? true : false;
  const [roles, setRoles] = React.useState([]);
  const [perms, setPerms] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    localStorage.setItem("appLoading", "true");

    const fetchUserRoles = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/role`, {
          headers: {
            Authorization: `Bearer ${getJwtTokenFromCookies()}`,
          },
        });
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching user roles:", error);
        authProvider.logout();
      } finally {
        localStorage.removeItem("appLoading");
        setIsLoading(false);
      }
    };

    const fetchUserPerms = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/perm`, {
          headers: {
            Authorization: `Bearer ${getJwtTokenFromCookies()}`,
          },
        });
        setPerms(response.data);
      } catch (error) {
        console.error("Error fetching user permissions:", error);
        authProvider.logout();
      } finally {
        localStorage.removeItem("appLoading");
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchUserRoles();
      fetchUserPerms();
    } else {
      setRoles(["GUEST"]);
      setPerms([]);
      setIsLoading(false);
    }
  }, []);

  // console.log(roles);
  const permission = perms;
  const role = roles;

  const commonResources = [
    <Resource name="Main Dashboard" list={MainDashboard} icon={HomeIcon} />,
    <Resource name="signin" list={Signin} icon={VpnKeyIcon} />,
    <Route exact path="/signup" element={Signup} />,
    <Resource name="signup" list={Signup} />,
  ];

  const employeeResources = [
    <Resource name="Main Dashboard" list={MainDashboard} icon={HomeIcon} />,
    <Resource name="profile" list={Profile} icon={PermIdentityIcon} />,
    <Resource
      name="contact"
      list={Contact}
      options={{ label: "My contacts" }}
    />,
  ];

  const ownerResources = [
    <Resource name="dashboard" list={MainDashboard} icon={HomeIcon} />,
    <Resource name="profile" list={Profile} icon={PermIdentityIcon} />,
    <Resource
      name="contact"
      list={Contact}
      options={{ label: "My contacts" }}
    />,
    <Resource
      name="ownerPage"
      list={OwnerDesktop}
      icon={FaceRetouchingNaturalIcon}
    />,
    <Resource
      name="greenhouses"
      list={GreenhouseList}
      create={GreenhouseCreate}
      edit={GreenhouseEdit}
    />,
    <Resource
      name="fields"
      list={FieldList}
      create={FieldCreate}
      edit={FieldEdit}
    />,
    <Resource name="devices" list={DeviceDesktop} />,
    <Resource
      name="portable_devices"
      list={PortableDeviceList}
      create={PortableDeviceCreate}
      edit={PortableDeviceEdit}
    />,
    <Resource
      name="fixed_devices"
      list={FixedDeviceList}
      create={FixedDeviceCreate}
      edit={FixedDeviceEdit}
    />,
    <Resource
      name="fields"
      list={FieldList}
      create={FieldCreate}
      edit={FieldEdit}
    />,
    // <Resource
    //   name="device_requests_history"
    //   create={DeviceRequest}
    //   list={DeviceRequest}
    // />,
  ];
  const CMResources = [
    <Resource
      name="dashboard"
      list={MainDashboard}
      icon={HomeIcon}
      options={{ label: "Home" }}
    />,
    <Resource
      name="contact"
      list={Contact}
      options={{ label: "My contacts" }}
    />,
    <Resource
      name="profile"
      list={Profile}
      icon={PermIdentityIcon}
      options={{ label: "Profile" }}
    />,
    <Resource
      name="usersinfo"
      list={DesktopInfo}
      options={{ label: "Dashboard" }}
    />,
    <Resource
      name="community/users"
      list={UserList}
      edit={UserEdit}
      icon={ArticleIcon}
      options={{ label: "Users" }}
    />,
  ];
  const AdminResources = [
    ...CMResources,
    <Resource name="dashboard" list={MainDashboard} icon={HomeIcon} />,
    <Resource name="adminPage" list={AdminDesktop} />,
    <Resource
      name="contact"
      list={Contact}
      options={{ label: "My contacts" }}
    />,
    <Resource name="profile" list={Profile} icon={PermIdentityIcon} />,
    <Resource
      name="all_fixedDevices"
      list={FixedDeviceListAdm}
      show={FixedDeviceShow}
    />,
    <Resource
      name="all_portableDevices"
      list={PortableDeviceListAdm}
      show={PortableDeviceShow}
    />,
    <Resource name="User" list={UserListAdm} show={UserShowAdm} />,
    <Resource
      name="all_portableDevices"
      list={PortableDeviceListAdm}
      show={PortableDeviceShow}
    />,
    <Resource name="User" list={UserListAdm} show={UserShowAdm} />,
    <Resource
      name="Greenhouse"
      list={GreenhouseListAdm}
      show={GreenhouseShow}
    />,
    <Resource name="chooseCommunity" list={ChooseCommunity} />,
    <Resource name="chooseDevice" list={ChooseDevice} />,
    <Resource
      name="all_fixedDevices"
      list={FixedDeviceListAdm}
      show={FixedDeviceShow}
    />,
    <Resource
      name="all_portableDevices"
      list={PortableDeviceListAdm}
      show={PortableDeviceShow}
    />,
    <Resource name="User" list={UserListAdm} show={UserShowAdm} />,
    <Resource
      name="Greenhouse"
      list={GreenhouseListAdm}
      show={GreenhouseShow}
    />,

    <Resource name="Product" list={ProductListAdm} show={ProductShow} />,
    <Resource name="Statistic" list={DeviceStatisticPage} />,
    //<Resource name="community_manager" list={CommunityManager} />,
    // <Resource name="usersinfo" list={DesktopInfo} />,
    // <Resource
    //   name="community/users"
    //   list={UserList}
    //   edit={UserEdit}
    //   icon={ArticleIcon}
    // />,
    //<Resource name="BasicTable" list={BasicTable} show={BasicTableShow} />,
  ];
  const myTheme = {
    palette: {
      primary: {
        main: "#357A38",
      },
      secondary: {
        main: "#4CAF50",
      },
      error: {
        main: "#BA000D",
      },
    },
    typography: {
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Arial",
        "sans-serif",
      ].join(","),
    },
  };
  const getdrw = () => {
    const array = ["EMPLOYEE", "ADMIN", "OWNER", "GUEST", "COMMUNITY_MANAGER"];
    const array2 = [
      [...employeeResources],
      [...AdminResources],
      [...ownerResources],
      [...commonResources],
      [...CMResources],
    ];

    const result = [];

    for (let index = 0; index < role.length; index++) {
      for (let j = 0; j < array.length; j++) {
        if (role[index] === array[j]) {
          result[index] = array2[j];
          break;
        }
      }
    }
    return result.length > 0 ? result : <div>...loading</div>;
  };
  const getprm = () => {
    console.log(perms);
    const permissions = [
      <Resource
        name="greenhouses"
        list={GreenhouseList}
        create={GreenhouseCreate}
        edit={GreenhouseEdit}
      />,
      <Resource
        name="fields"
        list={FieldList}
        create={FieldCreate}
        edit={FieldEdit}
      />,
      <Resource
        name="fixed_devices"
        list={FixedDeviceList}
        create={FixedDeviceCreate}
        edit={FixedDeviceEdit}
      />,
      <Resource
        name="portable_devices"
        list={PortableDeviceList}
        create={PortableDeviceCreate}
        edit={PortableDeviceEdit}
      />,
      <Resource name="Product" list={ProductListAdm} show={ProductShow} />,
    ];

    const answer = [];
    let b = 0;
    const all_permissions = [
      "GREENHOUSE",
      "FIELD",
      "FIXED",
      "PORTABLE",
      "ROLE",
      "PRODUCT",
    ];
    let a = 0;
    for (let index = 0; index < perms.length; index++) {
      for (let j = 0; j < all_permissions.length; j++) {
        if (perms[index].includes(all_permissions[j])) {
          if (all_permissions[j]== "ROLE") {
              answer[b] = <Resource
              name="usersinfo"
              list={DesktopInfo}
              options={{ label: "Dashboard" }}
            />;
              b++;
              answer[b] = 
                <Resource
                  name="community/users"
                  list={UserList}
                  edit={UserEdit}
                  icon={ArticleIcon}
                  options={{ label: "Users" }}
                />
                b++;
            }
            else{
              answer[b] = permissions[a];
              b++;
            }
          }
        }
      }
    
    return answer.length > 0 ? answer : <div>...loading</div>;
  };
  return (
    <BrowserRouter>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Admin
          theme={myTheme}
          layout={MyLayout}
          dataProvider={customDataProvider}
          i18nProvider={i18nProvider}
        >
          {getdrw()}
          {getprm()}
        </Admin>
      )}
    </BrowserRouter>
  );
};

export default App;
