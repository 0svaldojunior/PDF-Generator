import React from 'react';
import { BrowserRouter, Route, Switch  } from 'react-router-dom';

import Logon from './pages/Logon';
import Dashboard from './pages/Dashboard';
import Certificates from './pages/Certificat';
import CertificatesPrint from './pages/Print';
import CertificatesDigital from './pages/Digital';
import Courses from './pages/Courses';
import ListCourses from './pages/ListCourses';
import EditCourses from './pages/EditCourses';
import Users from './pages/Users';

export default function Routes() {
  return(
    <BrowserRouter>
      <Switch>
        <Route path = "/" exact component = { Logon } />
        <Route path = "/dashboard" component = { Dashboard } />
        <Route path = "/users" component = { Users } />
        <Route path = "/courses" component = { Courses } />
        <Route path = "/courses-list" component = { ListCourses } />
        <Route path = "/courses-edit" component = { EditCourses } />
        <Route path = "/certificates" component = { Certificates } />
        <Route path = "/certificates-print" component = { CertificatesPrint } />
        <Route path = "/certificates-digital" component = { CertificatesDigital } />
      </Switch>
    </BrowserRouter>
  );
}
