import * as React from "react";
import "./App.css";
import { Admin, Resource } from "react-admin";
import restProvider from "ra-data-simple-rest";
import jsonServerProvider from "ra-data-json-server";
import { MyLayout } from "./layouts/Layout";
import HomeIcon from "@mui/icons-material/Home";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import ArticleIcon from "@mui/icons-material/Article";
import polyglotI18nProvider from "ra-i18n-polyglot";
import englishMessages from "ra-language-english";
import armenianMessages from "ra-language-armenian";
import AbacApp from "./abac";
import { BrowserRouter, Route } from "react-router-dom";

import { ProductCreate } from "../src/pages/owner/ProductCreate";
import { ProductList } from "../src/pages/owner/ProductList";
import { ProductEdit } from "../src/pages/owner/ProductEdit";
import { ProductRequest } from "./pages/owner/ProductRequest";

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
import { Contact } from "./pages/auth/Contact";
import { NewData } from "./pages/auth/Profile";
import { CommunityManager } from "./pages/CommunityManager/CommunityManager";
import { UserList } from "./pages/CommunityManager/UserList";
import { UserCreate } from "./pages/CommunityManager/UserCreate";
import { UserEdit } from "./pages/CommunityManager/UserEdit";
import { BasicTableShow } from "./components/BasicTableShow";
import { BasicTable } from "./components/BasicTable";
import { authProvider } from "./providers/authPovider";
import simpleRestProvider from "ra-data-simple-rest";
import { fetchUtils } from "react-admin";
import GoogleLoginComponent from "./components/Gooogle";
import { API_URL } from "./consts";
import customDataProvider from "./providers/dataProvider";
//const dataProvider = jsonServerProvider(API_URL);
/* const dataProvider = simpleRestProvider(API_URL); */

// const dataProvider = jsonServerProvider(process.env.API_URL);
// const dataProvider = simpleRestProvider(process.env.API_URL);

// import AbacApp from "./abac";
const i18nProvider = polyglotI18nProvider(
  (locale) => (locale === "am" ? armenianMessages : englishMessages),
  "en" // Default locale
);

const App = () => {
  return (
    <BrowserRouter>
      <Admin
        layout={MyLayout}
        dataProvider={customDataProvider}
        i18nProvider={i18nProvider}
        // authProvider={authProvider}
        // loginPage={Signup}
      >
        <Resource name="dashboard" list={MainDashboard} icon={HomeIcon} />
        <Resource name="signin" list={Signin} icon={VpnKeyIcon} />
        <Route exact path="/signup" element={Signup} />
        <Resource name="signup" list={Signup} />
        <Resource name="profile" list={Profile} icon={PermIdentityIcon} />
        <Resource name="adminPage" list={AdminDesktop} />
        <Resource name="chooseCommunity" list={ChooseCommunity} />
        <Resource name="chooseDevice" list={ChooseDevice} />
        <Resource
          name="all_fixedDevices"
          list={FixedDeviceListAdm}
          show={FixedDeviceShow}
        />
        <Resource
          name="all_portableDevices"
          list={PortableDeviceListAdm}
          show={PortableDeviceShow}
        />
        <Resource name="User" list={UserListAdm} show={UserShowAdm} />
        <Resource
          name="Greenhouse"
          list={GreenhouseListAdm}
          show={GreenhouseShow}
        />
        <Resource
          name="ownerPage"
          list={OwnerDesktop}
          icon={FaceRetouchingNaturalIcon}
        />
        <Resource
          name="greenhouses"
          list={GreenhouseList}
          create={GreenhouseCreate}
          edit={GreenhouseEdit}
        />
        <Resource
          name="fields"
          list={FieldList}
          create={FieldCreate}
          edit={FieldEdit}
        />
        <Resource name="devices" list={DeviceDesktop} />
        <Resource
          name="portable_devices"
          list={PortableDeviceList}
          create={PortableDeviceCreate}
          edit={PortableDeviceEdit}
        />
        <Resource
          name="fixed_devices"
          list={FixedDeviceList}
          create={FixedDeviceCreate}
          edit={FixedDeviceEdit}
        />
        <Resource
          name="device_requests_history"
          create={DeviceRequest}
          list={DeviceRequest}
        />
        <Resource
          name="products"
          list={ProductList}
          create={ProductCreate}
          edit={ProductEdit}
        />
        <Resource
          name="product_requests_history"
          create={ProductRequest}
          list={ProductRequest}
        />
        <Resource name="contact" list={Contact} />
        <Resource name="community_manager" list={CommunityManager} />
        <Resource
          name="users"
          list={UserList}
          create={UserCreate}
          edit={UserEdit}
          icon={ArticleIcon}
        />
        <Resource name="BasicTable" list={BasicTable} show={BasicTableShow} />
      </Admin>
    </BrowserRouter>
  );
};

export default App;
