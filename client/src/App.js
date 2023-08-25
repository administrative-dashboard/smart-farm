//client/App.js
import './App.css';
import { Admin, Resource } from 'react-admin';
import restProvider from 'ra-data-simple-rest';
import jsonServerProvider from 'ra-data-json-server'; 
import { MyLayout } from './layouts/Layout';
import { CssBaseline } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import QuizIcon from '@mui/icons-material/Quiz';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';

import { MainDashboard } from './pages/MainDashboard';
import { Signin } from './pages/auth/Signin';
import { Signup } from './pages/auth/Signup'
import { Profile } from './pages/auth/Profile';
import { AdminDesktop } from './pages/Desktop'
import { OwnerDesktop } from './pages/owner/Desktop';
import { PortableDeviceList } from './pages/owner/PortableDeviceList';
import { GreenhouseList } from './pages/owner/GreenhouseList';
import { DeviceDesktop } from './pages/owner/DeviceDesktop';
import { PortableDeviceCreate } from './pages/owner/PortableDeviceCreate';
import { PortableDeviceEdit } from './pages/owner/PortableDeviceEdit';
import { FieldList } from './pages/owner/FieldList';
import { FixedDeviceList } from './pages/owner/FixedDeviceList';
import { FixedDeviceCreate } from './pages/owner/FixedDeviceCreate';
import { FixedeDeviceEdit } from './pages/owner/FixedDeviceEdit';


//const dataProvider = restProvider('http://localhost:3000');
const dataProvider = jsonServerProvider('http://localhost:5000'); 
const App = () => {
    return (

        <Admin layout={MyLayout} dataProvider={dataProvider}>
            <Resource name='dashBoard' list={MainDashboard} icon={HomeIcon} />
            <Resource name='signin' list={Signin} icon={VpnKeyIcon} />
            <Resource name='signup' list={Signup} icon={AppRegistrationIcon} />
            <Resource name='profile' list={Profile} icon={PermIdentityIcon} />
            <Resource name='page' list={AdminDesktop} icon={QuizIcon} />
            <Resource name="ownerPage" list={OwnerDesktop} icon={FaceRetouchingNaturalIcon} />
            <Resource name="greenhouses" list={GreenhouseList} />
            <Resource name="fields" list={FieldList} />
            <Resource name="devices" list ={DeviceDesktop} />
            <Resource name="portable_devices" list={PortableDeviceList} create={PortableDeviceCreate} edit={PortableDeviceEdit} />
            <Resource name="fixed_devices" list={FixedDeviceList} create={FixedDeviceCreate} edit={FixedeDeviceEdit} />
        </Admin>
    );
}

export default App;

