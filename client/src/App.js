//client/App.js
import './App.css';
import { Admin, Resource } from 'react-admin';
import restProvider from 'ra-data-simple-rest';
import { MyLayout } from './layouts/Layout';
import { CssBaseline } from '@mui/material';

import { MainDashboard } from './pages/MainDashboard';
import {Signup} from './pages/Signup';


const DATAPROVIDER = restProvider('http://localhost:3000');

const  App = ()  => {
    return (
        
        <Admin layout={MyLayout} dataProvider={DATAPROVIDER} >
            <CssBaseline />
       <Resource name='DashBoard' list={MainDashboard} />
       <Resource name='Signup' list={Signup} />
        </Admin>
      );
}

export default App;
