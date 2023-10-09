import * as React from "react";
import { AbacProvider } from "react-abac";
// import { Admin, Resource } from "react-admin";
// import restProvider from "ra-data-simple-rest";
// import jsonServerProvider from "ra-data-json-server";
// import { MyLayout } from "./layouts/Layout";
// import HomeIcon from "@mui/icons-material/Home";
// import VpnKeyIcon from "@mui/icons-material/VpnKey";
// import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
// import PermIdentityIcon from "@mui/icons-material/PermIdentity";
// import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
// import ArticleIcon from "@mui/icons-material/Article";
// import polyglotI18nProvider from "ra-i18n-polyglot";
// import englishMessages from "ra-language-english";
// import armenianMessages from "ra-language-armenian";
// import App from "./App";

// import { checkAccess } from "./abac";

// import { MainDashboard } from "./pages/MainDashboard";
// import { Signin } from "./pages/auth/Signin";
// import { Signup } from "./pages/auth/Signup";
// import { Profile } from "./pages/auth/Profile";
import { AdminDesktop } from "./pages/admin/Desktop";
// import { ChooseDevice } from "./pages/admin/ChooseDevice";
// import { ChooseCommunity } from "./pages/admin/ChooseCommunity";
// import { FixedDeviceShow } from "./pages/admin/FixedDeviceShow";
// import { UserShowAdm } from "./pages/admin/UserShow";
// import { UserListAdm } from "./pages/admin/UserList";
// import { FixedDeviceListAdm } from "./pages/admin/FixedDeviceListAdm";
// import { PortableDeviceListAdm } from "./pages/admin/PortableDeviceListAdm";
// import { PortableDeviceShow } from "./pages/admin/PortableDeviceShow";
// import { SensorsShow } from "./pages/admin/SensorsShow";
// import { SensorsListAdm } from "./pages/admin/SensorsListAdm";
import { OwnerDesktop } from "./pages/owner/Desktop";
// import { PortableDeviceList } from "./pages/owner/PortableDeviceList";
// import { GreenhouseList } from "./pages/owner/GreenhouseList";
// import { DeviceDesktop } from "./pages/owner/DeviceDesktop";
// import { PortableDeviceCreate } from "./pages/owner/PortableDeviceCreate";
// import { PortableDeviceEdit } from "./pages/owner/PortableDeviceEdit";
// import { FixedDeviceList } from "./pages/owner/FixedDeviceList";
// import { FixedDeviceCreate } from "./pages/owner/FixedDeviceCreate";
// import { FixedDeviceEdit } from "./pages/owner/FixedDeviceEdit";
// import { GreenhouseCreate } from "./pages/owner/GreenhouseCreate";
// import { GreenhouseEdit } from "./pages/owner/GreenhouseEdit";
// import { FieldCreate } from "./pages/owner/FieldCreate";
// import { FieldList } from "./pages/owner/FieldList";
// import { FieldEdit } from "./pages/owner/FieldEdit";
// import { DeviceRequest } from "./pages/owner/DeviceRequest";
// import { GreenhouseShow } from "./pages/admin/GreenhouseShow";
// import { GreenhouseListAdm } from "./pages/admin/GreenhouseList";
// import { ProductListAdm } from "./pages/admin/ProductList";
// import { ProductShow } from "./pages/admin/ProductListAdm";
// import { DeviceStatisticPage } from "./pages/admin/AdminDeviceStatistic";
// import { Contact } from "./pages/auth/Contact";
// import { NewData } from "./pages/auth/Profile";
// import { CommunityManager } from "./pages/CommunityManager/Desktop";
// import { UserList } from "./pages/CommunityManager/UserList";
// import { BasicTableShow } from "./components/BasicTableShow";
// import { BasicTable } from "./components/BasicTable";

const permissions = {
  EDIT_GREENHOUSE: "EDIT_GREENHOUSE",
  EDIT_FIELD: "EDIT_FIELD",
  EDIT_FIXED_DEVICE: "EDIT_FIXED_DEVICE",
  EDIT_PORTABLE_DEVICE: "EDIT_PORTABLE_DEVICE",
  EDIT_ROLE: "EDIT_ROLE",
  EDIT_PRODUCT: "EDIT_PRODUCT",
};

const roles = {
  GUEST: "GUEST",
  EMPLOYEE: "EMPLOYEE",
  OWNER: "OWNER",
  COMMUNITY_MANAGER: "COMMUNITY_MANAGER",
  COMMUNITY_OWNER: "COMMUNITY_OWNER",
  ADMIN: "ADMIN",
};

const rules = {
  [roles.GUEST]: {
    [permissions.VIEW_MAIN_DASHBOARD]: true,
  },
  [roles.EMPLOYEE]: {
    [permissions.VIEW_MAIN_DASHBOARD]: true,
    [permissions.VIEW_PROFILE_INFO]: true,
    [permissions.EDIT_PROFILE_INFO]: true,
  },
  [roles.OWNER]: {
    [permissions.ADD_GREENHOUSE]: true,
    [permissions.DELETE_GREENHOUSE]: true,
    [permissions.CREATE_FIELD]: true,
    [permissions.DELETE_FIELD]: true,
    [permissions.CREATE_FIXED_DEVICE]: true,
    [permissions.DELETE_FIXED_DEVICE]: true,
    [permissions.CREATE_PORTABLE_DEVICE]: true,
    [permissions.DELETE_PORTABLE_DEVICE]: true,
    [permissions.VIEW_OWN_INFO]: true,
    [permissions.VIEW_PLANNING_INFO]: true,
    [permissions.EDIT_PLANNING]: true,
    [permissions.VIEW_PROFILE_INFO]: true,
    [permissions.EDIT_PROFILE_INFO]: true,
  },
  [roles.COMMUNITY_MANAGER]: {
    [permissions.ADD_GREENHOUSE]: true,
    [permissions.DELETE_GREENHOUSE]: true,
    [permissions.CREATE_GREENHOUSE]: true,
    [permissions.CREATE_FIELD]: true,
    [permissions.DELETE_FIELD]: true,
    [permissions.CREATE_FIXED_DEVICE]: true,
    [permissions.DELETE_FIXED_DEVICE]: true,
    [permissions.CREATE_PORTABLE_DEVICE]: true,
    [permissions.DELETE_PORTABLE_DEVICE]: true,
    [permissions.EDIT_PLANNING]: true,
    [permissions.VIEW_COMMUNITY_INFO]: true,
    [permissions.VIEW_PROFILE_INFO]: true,
    [permissions.EDIT_PROFILE_INFO]: true,
  },
  [roles.COMMUNITY_OWNER]: {
    [permissions.VIEW_COMMUNITY_INFO]: true,
    [permissions.ADD_ROLE]: true,
    [permissions.ADD_PERMISSION]: true,
    [permissions.CREATE_ROLE]: true,
    [permissions.VIEW_PROFILE_INFO]: true,
    [permissions.EDIT_PROFILE_INFO]: true,
  },
  [roles.ADMIN]: {
    [permissions.VIEW_ALL_INFO]: true,
    [permissions.VIEW_PROFILE_INFO]: true,
    [permissions.EDIT_PROFILE_INFO]: true,
  },
};
const AbacApp = (props) => {
const isAdmin = roles.includes("ADMIN");

  // Check if the user has the "OWNER" role
  const isOwner = roles.includes("OWNER");

  return (
    <AbacProvider
      user="Ani"
      roles="ADMIN"
      rules={props.rules}
      //permissions={props.permissions}
    >
      {isAdmin ? (
        <AdminDesktop />
      ) : isOwner ? (
        <>
          <OwnerDesktop />
          
        </>
      ) : (
        <null />
      )}
    </AbacProvider>
  );
};

export default AbacApp;
