//client/App.js
import './App.css';
import { Admin, Resource } from 'react-admin';
import restProvider from 'ra-data-simple-rest';
import { MyLayout } from './layouts/Layout';
import { CssBaseline } from '@mui/material';

import { MainDashboard } from './pages/MainDashboard';
import {Signin} from './pages/Signin';
import {Signup} from './pages/Signup'
import { Profile } from './pages/Profile';


const DATAPROVIDER = restProvider('http://localhost:3000');

const  App = ()  => {
    return (
        
        <Admin layout={MyLayout} dataProvider={DATAPROVIDER} >
            <CssBaseline />
       <Resource name='DashBoard' list={MainDashboard} />
       <Resource name='Signin' list={Signin} />
       <Resource name='Signup' list={Signup} />
       <Resource name='Profile' list={Profile} />
        </Admin>
      );
}

export default App;
