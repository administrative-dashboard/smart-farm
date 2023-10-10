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
import { ImageField } from 'react-admin';
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
import loadGif from "./assets/static/load.gif";
import { FieldEdit } from "./pages/owner/FieldEdit";
import { GreenhouseShow } from "./pages/admin/GreenhouseShow";
import { GreenhouseListAdm } from "./pages/admin/GreenhouseList";
import { ProductListAdm } from "./pages/admin/ProductList";
import { ProductShow } from "./pages/admin/ProductListAdm";
import { Contact } from "./pages/auth/Contact";
import { UserList } from "./pages/CommunityManager/UserList";
import { DesktopInfo } from "./pages/CommunityManager/DesktopInfo";
import axios from "axios";
import { getJwtTokenFromCookies } from "./providers/authUtils";
import customDataProvider from "./providers/dataProvider";
import { authProvider } from "./providers/authPovider";
import { API_URL } from "./consts";
import myTheme from "./themes/general_theme";
import { UserEdit } from "./pages/CommunityManager/UserEdit";
import { PortableDeviceStatisticsPage } from "./pages/CommunityManager/PortableDeviceStatistics"
import { FixedDeviceStatisticsPage } from "./pages/CommunityManager/FixedDeviceStatistics"
import { GreenhouseStatisticsPage } from "./pages/CommunityManager/GreenhouseStatistics"
import { FieldStatisticsPage } from "./pages/CommunityManager/FieldStatistics"

const i18nProvider = polyglotI18nProvider(
  (locale) => (locale === "am" ? armenianMessages : englishMessages),
  "en"
);

window.onerror = function () {
  return true;
};

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

  const role = roles;


  const commonResources = [
    <Resource
      name="dashboard"
      list={MainDashboard}
      icon={HomeIcon}
      options={{ label: "Home" }}
    />,
    <Resource
      name="signin"
      list={Signin}
      icon={VpnKeyIcon}
      options={{ label: "Sign In" }}
    />,
    <Route exact path="/signup" element={Signup} />,
    <Resource name="signup" list={Signup} options={{ label: "Sign Up" }} />,
  ];

  const employeeResources = [
    <Resource
      name="dashboard"
      list={MainDashboard}
      icon={HomeIcon}
      options={{ label: "Home" }}
    />,
    <Resource
      name="profile"
      list={Profile}
      icon={PermIdentityIcon}
      options={{ label: "Profile" }}
    />,
    <Resource
      name="contact"
      list={Contact}
      options={{ label: "My contacts" }}
    />,
  ];

  const ownerResources = [
    <Resource
      name="dashboard"
      list={MainDashboard}
      icon={HomeIcon}
      options={{ label: "Home" }}
    />,
    <Resource
      name="profile"
      list={Profile}
      icon={PermIdentityIcon}
      options={{ label: "Profile" }}
    />,
    <Resource
      name="contact"
      list={Contact}
      options={{ label: "My contacts" }}
    />,
    <Resource
      name="ownerPage"
      list={OwnerDesktop}
      icon={FaceRetouchingNaturalIcon}
      options={{ label: "Owner desktop" }}
    />,
    <Resource
      name="greenhouses"
      list={GreenhouseList}
      create={GreenhouseCreate}
      edit={GreenhouseEdit}
      options={{ label: "Greenhouse" }}

    />,
    <Resource
      name="fields"
      list={FieldList}
      create={FieldCreate}
      edit={FieldEdit}
      options={{ label: "Field" }}
    />,
    <Resource name="devices" list={DeviceDesktop}
      options={{ label: "Device" }} />,
    <Resource
      name="portable_devices"
      list={PortableDeviceList}
      create={PortableDeviceCreate}
      edit={PortableDeviceEdit}
      options={{ label: "Portable device" }}
    />,
    <Resource
      name="fixed_devices"
      list={FixedDeviceList}
      create={FixedDeviceCreate}
      edit={FixedDeviceEdit}
      options={{ label: "Fixed device" }}
    />,
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
    <Resource
      name="portable_device_statistics"
      list={PortableDeviceStatisticsPage}
      options={{ label: "Portable Device Statistics" }}
    />,
    <Resource
      name="fixed_device_statistics"
      list={FixedDeviceStatisticsPage}
      options={{ label: "Fixed Device Statistics" }}
    />,
    <Resource
      name="field_statistics"
      list={FieldStatisticsPage}
      options={{ label: "Field Statistics" }}
    />,
    <Resource
      name="greenhouse_statistics"
      list={GreenhouseStatisticsPage}
      options={{ label: "Greenhouse Statistics" }}
    />
  ];
  const AdminResources = [
    ...CMResources,
    <Resource
      name="all_fixedDevices"
      list={FixedDeviceListAdm}
      show={FixedDeviceShow}
      options={{ label: "Fixed device" }}
    />,
    <Resource
      name="all_portableDevices"
      list={PortableDeviceListAdm}
      show={PortableDeviceShow}
      options={{ label: "Portable device" }}
    />,
    <Resource
      name="Greenhouse"
      list={GreenhouseListAdm}
      show={GreenhouseShow}
    />,
    <Resource name="chooseDevice" list={ChooseDevice} options={{ label: "Choose device" }} />,
    <Resource
      name="Greenhouse"
      list={GreenhouseListAdm}
      show={GreenhouseShow}
    />,

    <Resource name="Product" list={ProductListAdm} show={ProductShow} />,
  ];

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
      <Resource
        name="community/users"
        list={UserList}
        edit={UserEdit}
        icon={ArticleIcon}
        options={{ label: "Users" }}
      />,
      <Resource name="Product" list={ProductListAdm} show={ProductShow} />,
    ];

    const answer = [];
    let b = 0;
    const all_permissions = [
      'EDIT_GREENHOUSE',
      'EDIT_FIELD',
      'EDIT_FIXED_DEVICE',
      'EDIT_PORTABLE_DEVICE',
      'EDIT_ROLE',
      'EDIT_PRODUCT'
    ];
    for (let index = 0; index < perms.length; index++) {
      for (let j = 0; j < all_permissions.length; j++) {
        if (perms[index] == (all_permissions[j])) {
          answer[b] = permissions[j];
          b++;
        }
      }

      return answer.length > 0 ? answer : <div>...loading</div>;
    };
    return (
      <>
        {isLoading ? (
          <div className="loading-indicator" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <img src={loadGif} alt="Loading" />
          </div>) : (
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
      </>
    );
  };
}

export default App;