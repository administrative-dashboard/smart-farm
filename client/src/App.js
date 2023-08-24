//client/App.js
import './App.css';
import { Admin, Resource } from 'react-admin';
import restProvider from 'ra-data-simple-rest';
import { MyLayout } from './layouts/Layout';
import { CssBaseline } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import QuizIcon from '@mui/icons-material/Quiz';

import { MainDashboard } from './pages/MainDashboard';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup'
import { Profile } from './pages/Profile';
import { AdminDesktop } from './pages/Desktop'
import { OwnerDesktop } from './pages/OwnerDesktop';
import { OwnerDeviceAdd } from './pages/OwnerDeviceAdd';
import { OwnerGreenhouse } from './pages/OwnerGreenhouse';


const DATAPROVIDER = restProvider('http://localhost:3000');

const App = () => {
    return (

        <Admin layout={MyLayout} dataProvider={DATAPROVIDER} >
            <CssBaseline />
            <Resource name='dashBoard' list={MainDashboard} icon={HomeIcon} />
            <Resource name='signin' list={Signin} icon={VpnKeyIcon} />
            <Resource name='signup' list={Signup} icon={AppRegistrationIcon} />
            <Resource name='profile' list={Profile} icon={PermIdentityIcon} />
            <Resource name='page' list={AdminDesktop} icon={QuizIcon} />
            <Resource name="ownerPage" list={OwnerDesktop} />
            <Resource name="owner/greenhouses" list={OwnerGreenhouse} />
            <Resource name="owner/devices" list={OwnerDeviceAdd} />
        </Admin>
    );
}

export default App;
