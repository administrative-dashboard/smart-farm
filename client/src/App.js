//client/App.js
import './App.css';
import { Admin, Resource } from 'react-admin';
import restProvider from 'ra-data-simple-rest';
import jsonServerProvider from 'ra-data-json-server';
import { MyLayout } from './layouts/Layout';
import HomeIcon from '@mui/icons-material/Home';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';

import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from 'ra-language-english';
import armenianMessages from 'ra-language-armenian';

import { MainDashboard } from './pages/MainDashboard';
import { Signin } from './pages/auth/Signin';
import { Signup } from './pages/auth/Signup'
import { Profile } from './pages/auth/Profile';
import { AdminDesktop } from './pages/admin/Desktop'
import { ChooseDevice } from './pages/admin/ChooseDevice';
import { ChooseCommunity } from './pages/admin/ChooseCommunity';
import { FixedDeviceShow } from './pages/admin/FixedDeviceShow';
import { UserShowAdm } from './pages/admin/UserShow';
import { UserListAdm } from './pages/admin/UserList';
import { GreenhouseInfo } from './pages/admin/GreenhouseInfo';
import { ProductInfo } from './pages/admin/ProductInfo';
import { FixedDeviceListAdm } from './pages/admin/FixedDeviceListAdm';
import { PortableDeviceListAdm } from './pages/admin/PortableDeviceListAdm';
import { PortableDeviceShow } from './pages/admin/PortableDeviceShow';
import { SensorsShow } from './pages/admin/SensorsShow';
import { SensorsListAdm } from './pages/admin/SensorsListAdm';
//import { UsersInfo } from './pages/admin/UsersInfo';
//import { GreenHouseInfo } from './pages/admin/GreenhouseInfo';
import { OwnerDesktop } from './pages/owner/Desktop';
import { PortableDeviceList } from './pages/owner/PortableDeviceList';
import { GreenhouseList } from './pages/owner/GreenhouseList';
import { DeviceDesktop } from './pages/owner/DeviceDesktop';
import { PortableDeviceCreate } from './pages/owner/PortableDeviceCreate';
import { PortableDeviceEdit } from './pages/owner/PortableDeviceEdit';
import { FixedDeviceList } from './pages/owner/FixedDeviceList';
import { FixedDeviceCreate } from './pages/owner/FixedDeviceCreate';
import { FixedDeviceEdit } from './pages/owner/FixedDeviceEdit';
import { GreenhouseCreate } from './pages/owner/GreenhouseCreate';
import { GreenhouseEdit } from './pages/owner/GreenhouseEdit';
import { FieldCreate } from './pages/owner/FieldCreate';
import { FieldList } from './pages/owner/FieldList';
import { FieldEdit } from './pages/owner/FieldEdit';
import { DeviceRequest } from './pages/owner/DeviceRequest'
import { GreenhouseShow } from './pages/admin/GreenhouseShow';
import { GreenhouseListAdm } from './pages/admin/GreenhouseList';
import { UserInfo } from './pages/admin/UserInfo'
import { ProductListAdm } from './pages/admin/ProductList';
import { ProductShow } from './pages/admin/ProductListAdm';
import { DeviceStatisticPage } from './pages/admin/AdminDeviceStatistic';
//const dataProvider = restProvider('http://localhost:3000');
const dataProvider = jsonServerProvider('http://localhost:5000');

const i18nProvider = polyglotI18nProvider(
    locale => (locale === 'am' ? armenianMessages : englishMessages),
    'en', // Default locale
);

const App = () => {
    return (

        <Admin
            layout={MyLayout}
            dataProvider={dataProvider}
            i18nProvider={i18nProvider}
        >
            <Resource name='dashBoard' list={MainDashboard} icon={HomeIcon} />
            <Resource name='signin' list={Signin} icon={VpnKeyIcon} />
            <Resource name='signup' list={Signup} icon={AppRegistrationIcon} />
            <Resource name='profile' list={Profile} icon={PermIdentityIcon} />
            <Resource name='adminPage' list={AdminDesktop}/>
            <Resource name='chooseCommunity' list={ChooseCommunity}/>
            <Resource name='chooseDevice' list={ChooseDevice}/>
            <Resource name='all_fixedDevices' list={FixedDeviceListAdm} show={FixedDeviceShow}/>
            <Resource name='all_portableDevices' list={PortableDeviceListAdm} show={PortableDeviceShow}/>
            <Resource name='all_sensors' list={SensorsListAdm} show={SensorsShow}/>
            <Resource name='User' list={UserListAdm}  show={UserShowAdm}/>
            <Resource name='Greenhouse' list={GreenhouseListAdm} show={GreenhouseShow} />
            <Resource name='ProductsInfo' list={ProductInfo} />
            <Resource name="ownerPage" list={OwnerDesktop} icon={FaceRetouchingNaturalIcon} />
            <Resource name="greenhouses" list={GreenhouseList} create={GreenhouseCreate} edit={GreenhouseEdit} />
            <Resource name="fields" list={FieldList}  create={FieldCreate} edit={FieldEdit}/>
            <Resource name="devices" list={DeviceDesktop} />
            <Resource name="portable_devices" list={PortableDeviceList} create={PortableDeviceCreate} edit={PortableDeviceEdit} />
            <Resource name="fixed_devices" list={FixedDeviceList} create={FixedDeviceCreate} edit={FixedDeviceEdit} />
            <Resource name="device_requests_history" create={DeviceRequest} list={DeviceRequest}/>
            <Resource name='UserInfo' list={UserInfo} />
            <Resource name='GreenhouseInfo' list={GreenhouseInfo} />
            <Resource name='Product' list={ProductListAdm} show={ProductShow}/>
            <Resource name='Statistic' list={DeviceStatisticPage}/>

        </Admin>
    );
}

export default App;

/*import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    EmailField,
    EditButton,
    DeleteButton
} from 'react-admin';

 const UserList = () => {
    return (
        <List>
            <Datagrid  sx={{
          ".RaDatagrid-rowEven": {
            backgroundColor: "lavender",
          },
          ".RaDatagrid-headerCell": {
            backgroundColor: "MistyRose",
          },
        }}>
              <TextField source="id" />
              <TextField source="name" />
              <EmailField source="email" />
              <TextField source="phone" />
              <TextField source="role" />
              <EditButton basePath='/users' />
              <DeleteButton  basePath='/users' />
            </Datagrid>
        </List>
    )
}

export default UserList*/

