import React from 'react';
import { useHistory } from 'react-router-dom';

import { MdDashboard } from 'react-icons/md'

import { AiFillSafetyCertificate, AiOutlineLogout } from 'react-icons/ai'
import { TiDocumentText } from 'react-icons/ti'
import { FaUserAlt } from 'react-icons/fa'

import { Container, ButtonContainer, Image, ButtonGetOutContainer } from './styles';
import logoimg from '../../assets/img/certificate/i3v.png';


function DashMenu() {
  const history = useHistory();

  function PushDashboard() {
    try {
      return ( history.push('/dashboard') );
    } catch (error) {
      alert('Falha ao trocar de página, verifique e tente novamente!');
    }
  };
  
  function PushCertificates() {
    try {
      return ( history.push('/certificates') );
    } catch (error) {
      alert('Falha ao trocar de página, verifique e tente novamente!');
    }
  };
  
  function PushCourses() {
    try {
      return ( history.push('/courses') );
    } catch (error) {
      alert('Falha ao trocar de página, verifique e tente novamente!');
    }
  };
  
  function PushUsers() {
    try {
      return ( history.push('/users') );
    } catch (error) {
      alert('Falha ao trocar de página, verifique e tente novamente!');
    }
  };
  
  function PushRoot() {
    try {
      localStorage.clear();
      return ( history.push('/') );
    } catch (error) {
      alert('Falha ao trocar de página, verifique e tente novamente!');
    }
  };
  
  return(
    <Container>
      <Image src={logoimg}/>
      
      <ButtonContainer onClick={PushDashboard} >
        <MdDashboard height="20"/> Dashboard
      </ButtonContainer>

      <ButtonContainer onClick={PushCertificates}>
        <AiFillSafetyCertificate height="20" /> Certificados
      </ButtonContainer>
      
      <ButtonContainer onClick={PushUsers}>
         <FaUserAlt height="20" /> Usuários
      </ButtonContainer>
      
      <ButtonContainer onClick={PushCourses}>
         <TiDocumentText height="20" /> Cursos
      </ButtonContainer>


      <ButtonGetOutContainer onClick={PushRoot}>
        <AiOutlineLogout height="20" /> Deslogar-se
      </ButtonGetOutContainer>



    </Container>
  );
}

export default DashMenu;