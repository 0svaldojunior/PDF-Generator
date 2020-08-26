import React from 'react';
import { BrowserRouter, Route, Switch  } from 'react-router-dom';

import Logon from './pages/Logon';
import Dashboard from './pages/Dashboard';
import Certificates from './pages/Certificat';
import CertificatesComplete from './pages/Complete';
import CertificatesPrint from './pages/Print';
import CertificatesSimple from './pages/Simple';
import CertificatesIssued from './pages/Issued';
import OldCertificates from './pages/OldCertificates';
import Courses from './pages/Courses';
import ListCourses from './pages/ListCourses';
import EditCourses from './pages/EditCourses';
import Users from './pages/Users';
import DashNormal from './pages/DashboardNormalUser'

export default function Routes() {
  return(
    <BrowserRouter>
      <Switch>
        <Route path = "/" exact component = { Logon } />
        <Route path = "/dashboard" component = { Dashboard } />
        <Route path = "/dashboard-normal-user" component = { DashNormal } />
        <Route path = "/users" component = { Users } />
        <Route path = "/courses" component = { Courses } />
        <Route path = "/courses-list" component = { ListCourses } />
        <Route path = "/courses-edit" component = { EditCourses } />
        <Route path = "/certificates" component = { Certificates } />
        <Route path = "/certificates-complete" component = { CertificatesComplete } />
        <Route path = "/certificates-simple" component = { CertificatesSimple } />
        <Route path = "/certificates-print" component = { CertificatesPrint } />
        <Route path = "/certificates-issued" component = { CertificatesIssued } />
        <Route path = "/old-certificates" component = { OldCertificates } />
      </Switch>
    </BrowserRouter>
  );
}
