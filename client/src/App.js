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
import AbacApp from "./abac";
import { BrowserRouter, Route } from "react-router-dom";

import { AbacProvider } from "react-abac";
import { checkAccess } from "./abac";
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
import { DeviceRequest } from "./pages/owner/DeviceRequest";
import { GreenhouseShow } from "./pages/admin/GreenhouseShow";
import { GreenhouseListAdm } from "./pages/admin/GreenhouseList";
import { ProductListAdm } from "./pages/admin/ProductList";
import { ProductShow } from "./pages/admin/ProductListAdm";
import { DeviceStatisticPage } from "./pages/admin/DeviceStatistic";
import { Contact } from "./pages/auth/Contact";
import { CommunityManager } from "./pages/CommunityManager/Desktop";
import { UserList } from "./pages/CommunityManager/UserList";
import { UserCreate } from "./pages/CommunityManager/UserCreate";
import { UserEdit } from "./pages/CommunityManager/UserEdit";
import { BasicTableShow } from "./components/BasicTableShow";
import { BasicTable } from "./components/BasicTable";
import simpleRestProvider from "ra-data-simple-rest";
import { API_URL } from "./consts";
import { DesktopInfo } from "./pages/CommunityManager/DesktopInfo";
import axios from "axios";
import { getJwtTokenFromCookies } from "./providers/authUtils";
import { authProvider } from "./providers/authPovider";
// import dataProvider from "./providers/dataProvider";
const dataProvider = simpleRestProvider(API_URL);
// import customDataProvider from "./providers/dataProvider";

const i18nProvider = polyglotI18nProvider(
  (locale) => (locale === "am" ? armenianMessages : englishMessages),
  "en" // Default locale
);

const App = () => {
  const isAuthenticated = getJwtTokenFromCookies() ? true : false;
  const [roles, setRoles] = React.useState([]);

  React.useEffect(() => {
    const fetchUserRoles = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/roles`, {
          headers: {
            Authorization: `Bearer ${getJwtTokenFromCookies()}`,
          },
        });
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching user roles:", error);
        authProvider.logout();
      }
    };
    if (isAuthenticated) {
      fetchUserRoles();
    } else {
      roles[0] = "1";
    }
  }, []);

  console.log(roles[0]);
  const role = roles[0];

  const commonResources = [
    <Resource name="dashboard" list={MainDashboard} icon={HomeIcon} />,
    <Resource name="signin" list={Signin} icon={VpnKeyIcon} />,
    <Route exact path="/signup" element={Signup} />,
    <Resource name="signup" list={Signup} />,
  ];

  const employeeResources = [
    <Resource name="dashboard" list={MainDashboard} icon={HomeIcon} />,
    <Resource name="profile" list={Profile} icon={PermIdentityIcon} />,
    <Resource name="contact" list={Contact} />,
  ];

  const ownerResources = [
    <Resource name="dashboard" list={MainDashboard} icon={HomeIcon} />,
    <Resource name="profile" list={Profile} icon={PermIdentityIcon} />,
    <Resource name="contact" list={Contact} />,
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
      name="device_requests_history"
      create={DeviceRequest}
      list={DeviceRequest}
    />,
  ];
  const CMResources = [
    <Resource name="dashboard" list={MainDashboard} icon={HomeIcon} />,
    <Resource name="contact" list={Contact} />,
    <Resource name="profile" list={Profile} icon={PermIdentityIcon} />,
    <Resource name="usersinfo" list={DesktopInfo} />,
    <Resource
      name="community/users"
      list={UserList}
      icon={ArticleIcon}
    />,
  ];
  const AdminResources = [
    <Resource name="dashboard" list={MainDashboard} icon={HomeIcon} />,
    <Resource name="adminPage" list={AdminDesktop} />,
    <Resource name="contact" list={Contact} />,
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
    <Resource name="usersinfo" list={DesktopInfo} />,
    <Resource
      name="community/users"
      list={UserList}
      icon={ArticleIcon}
    />,
    //<Resource name="BasicTable" list={BasicTable} show={BasicTableShow} />,
  ];

  return (
    <BrowserRouter>
      <Admin
        layout={MyLayout}
        dataProvider={dataProvider}
        i18nProvider={i18nProvider}
      >
        {role === "EMPLOYEE"
          ? [...employeeResources]
          : role === "ADMIN"
          ? [...AdminResources]
          : role === "OWNER"
          ? [...ownerResources]
          : role === "COMMUNITY_MANAGER"
          ? [...CMResources]
          : [...commonResources]}
      </Admin>
    </BrowserRouter>
  );
};

export default App;
