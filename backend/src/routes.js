const { Router } = require('express');

const CertificateController = require('./controllers/CertificateController');
const CourseController = require('./controllers/CourseController');
const StudentController = require('./controllers/StudentController');
const UserController = require('./controllers/UserController');

const SendMailController = require('./controllers/SendMailController');
const PDFsController = require('./controllers/PDFController');

const SearchCertificateController = require('./controllers/search/SearchCertificate');
const SearchCourseController = require('./controllers/search/SearchCourse');
const SearchUserController = require('./controllers/search/SearchUser');

const routes = Router();

routes.get('/certificates', CertificateController.index);
routes.post('/certificates', CertificateController.create);
routes.delete('/certificates', CertificateController.delete);

routes.get('/courses', CourseController.index);
routes.post('/courses', CourseController.create);
routes.put('/courses/update', CourseController.setCourse);
routes.delete('/courses', CourseController.delete);

routes.get('/students', StudentController.index);
routes.post('/students', StudentController.create);
routes.delete('/students', StudentController.delete);

routes.get('/users', UserController.index);
routes.get('/users', UserController.getUser);
routes.get('/users', UserController.getUserType);
routes.post('/users', UserController.create);
routes.put('/users/update', UserController.setUser);
routes.post('/dashboard', UserController.login);
routes.delete('/users', UserController.delete);

routes.post('/send-mail', SendMailController.sendMail);

routes.post('/create-pdf', PDFsController.post);
routes.get('/fetch-pdf', PDFsController.get);

routes.get('/search/certificate', SearchCertificateController.index);
routes.get('/search/course', SearchCourseController.index);
routes.get('/search/user', SearchUserController.index);

module.exports = routes;
