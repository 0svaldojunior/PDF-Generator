import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import { MdEdit } from 'react-icons/md';
import { BsFillTrashFill } from 'react-icons/bs';
import { GlobalContainer,
   Container,
   ScrollContainer,
   GridItem,
   GridItem2,
   Row,
   ListGridContainer,
   ListGridItem,
   Right,
  SearchPadding } from './styles';
import SearchBar from '../SearchBar';

function UserInformation() {
  const [user_id, setUser_id] = useState('');
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [normalUser, setNormalUser] = useState(0);
  const [adminUser, setAdminUser] = useState(0);
  const [newUserName, setNewUserName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newMail, setNewMail] = useState('');
  const [newUserType, setNewUserType] = useState('');
  const [users, setUsers] = useState([]);
  const [content, setContent] = useState('');

  const history = useHistory();
  
  useEffect(() => {
    setMail(localStorage.getItem('mail'));
    async function loadUser() {
      try {
        const response = await api.get(`/users?mail=${localStorage.getItem('mail')}`, { 
          query: {
            data: {
              mail
            }
          }
         });
        setUser_id(response.data.filter(element => element.mail === localStorage.getItem('mail'))[0].user_id);
        setName(response.data.filter(element => element.mail === localStorage.getItem('mail'))[0].name);
        setPassword(response.data.filter(element => element.mail === localStorage.getItem('mail'))[0].password);
        var adm = 0, norm = 0;
        for(var i = 0; i < response.data.length; i++) {
          if(response.data[i].type === false) norm++;
          else adm++;
        }
        setAdminUser(adm);
        setNormalUser(norm);

        const response2 = await api.get('users');
        setUsers(response2.data);
      } catch (err) {
        alert(`Falha ao carregar dados, tente novamente. ${err}`);
      }
    };

    if(content.length === 0) {
      loadUser();
    } else {
      setUsers(users.filter(user => user.name.includes(content) ))
    }
  }, [mail, content]);
  
  async function changeName(event, id) {
    event.preventDefault();
    console.log(event);
    var person = prompt(`Nome atual: ${name}\nInforme o novo:`);
    if (person === null || person === "") {
      window.alert( "Você cancelou a operação." );
    } else {
      try {
        const data = {
          user_id,
          column: 'name', 
          data: person
        };
        await api.put(`/users/update`, data);
        window.alert( "Alteração realizada com sucesso!" );
        window.location.reload(false);
      } catch (error) {
        alert('Falha ao alterar os dados, verifique e tente novamente.');
      }
    }
  };

  async function changeMail() {
    var person = prompt(`E-mail atual: ${mail}\nInforme o novo:`);
    if (person === null || person === "") {
      window.alert( "Você cancelou a operação." );
    } else {
      try {
        const data = {
          user_id,
          column: 'mail', 
          data: person
        };
        await api.put(`/users/update`, data);
        window.alert( "Alteração realizada com sucesso! \nVocê será redirecionado a página de login para entrar com o novo e-mail!" );
        history.push('/');
        window.location.reload(false);
        localStorage.clear();
      } catch (error) {
        alert('Falha ao alterar os dados, verifique e tente novamente.');
      }
    }
  };

  async function changePassword() {
    var person = prompt(`Senha tual: ${password}\nInforme a nova:`);
    if (person === null || person === "") {
      window.alert( "Você cancelou a operação." );
    } else {
      try {
        const data = {
          user_id,
          column: 'password', 
          data: person
        };
        await api.put(`/users/update`, data);
        window.alert( "Alteração realizada com sucesso!" );
        window.location.reload(false);
      } catch (error) {
        alert('Falha ao alterar os dados, verifique e tente novamente.');
      }
    }
  };

  async function createNewUser() {
    try {
      if(newUserName === '' || newMail === '' || newPassword === '' || newUserType === '') {
        window.alert('Primeiro peencha os dados antes de criar um usuário');
      } else {
        const data = {
          name: newUserName,
          mail: newMail,
          password: newPassword,
          type: newUserType === 'Sim' ? true : false
        };
        await api.post('/users', data);
        window.alert('Novo usuário criado com sucesso.');
        window.location.reload(false);
      }
    } catch (error) {
      window.alert(`Erro encontrado: ${error}`);
    }
  };

  function fillNewUser() {
    window.alert('Um novo usuário possui: Nome, E-mail, Senha e Tipo.\n Após preencher os campos você confirmará o usuário e podera utiliza-lo normalmente. Clique em OK para prosseguir');

    var name = prompt(`Complete o que se pede.\nNome: `);
    if (name === null || name === "") {
      window.alert( "Você cancelou a operação." );
    } else {
      var mail = prompt(`Complete o que se pede.\nE-mail: `);
      if(mail === null || mail === '') {
        window.alert('Você cancelou a operação.');
      } else {
        var password = prompt(`Complete o que se pede. \nSenha: `);
        if(password === null || password === '') {
          window.alert('Você cancelou a operação.');
        } else {
          var type = prompt(`O usuário é ADMINISTRADOR?\nInforme Sim ou Não: `);
          if(type === 'Sim' || type === 'Não') {
            setNewUserName(name);
            setNewMail(mail);
            setNewPassword(password);
            setNewUserType(type);
          } else {
            window.alert('Você cancelou a operação.');
          }
        }
      }
    }
  };
  
  const generaterKey = (prefix) => {
    return `${prefix}-${new Date().getTime()}`;
  };

  async function changeUserName(user) {
    var change = prompt(`Nome atual: ${user.name}\nInforme novo nome: `);
    if(change === null || change === '') {
      window.alert('Você cancelou a operação');
    } else {
      const data = {
        user_id: user.user_id,
        coloumn: 'name',
        data: change
      };
      await api.post('users/update', data);
      window.alert('Alteração realizada com sucesso!');
      window.location.reload(false);
    }
  };
  
  async function changeUserMail(user) {
    var change = prompt(`E-mail atual: ${user.mail}\nInforme novo e-mail: `);
    if(change === null || change === '') {
      window.alert('Você cancelou a operação');
    } else {
      const data = {
        user_id: user.user_id,
        coloumn: 'mail',
        data: change
      };
      await api.post('users/update', data);
      window.alert('Alteração realizada com sucesso!');
      window.location.reload(false);
    }
  };

  async function changeUserPassword(user) {
    var change = prompt(`Senha atual: ${user.password}\nInforme nova senha: `);
    if(change === null || change === '') {
      window.alert('Você cancelou a operação');
    } else {
      const data = {
        user_id: user.user_id,
        coloumn: 'password',
        data: change
      };
      await api.post('users/update', data);
      window.alert('Alteração realizada com sucesso!');
      window.location.reload(false);
    }
  };

  async function changeUserType(user) {
    var change = prompt(`Usuário ${user.type === true ? 'Administrador' : 'Normal'}\nUsuário será Administrador? Responda (Sim ou Não) `);
    if(change === null || change === '') {
      window.alert('Você cancelou a operação');
    } else {
      const data = {
        user_id: user.user_id,
        coloumn: 'name',
        data: change === 'Sim' ? true : false
      };
      await api.post('users/update', data);
      window.alert('Alteração realizada com sucesso!');
      window.location.reload(false);
    }
  };

  async function deleteUser(user) {
    try {
      await api.delete(`/users?user_id=${user.user_id}`, {
        data: {
          user_id: user.user_id
        }
      });
      setUsers(users.filter(userx => userx.user_id !== user.user_id));
      window.alert( "Remoção realizada com sucesso!" );
      window.location.reload(false);
    } catch (error) {
      window.alert(`Um erro ocorreu ao deletar usuário: ${error}`);
    }
  }
  
  return(
    <GlobalContainer>
        <Container>
          <GridItem> 
            <h1>Perfil do Usuário</h1>
            <p>{name} <button onClick={changeName}> <MdEdit /> </button> </p>
            <p>{mail} <button onClick={changeMail}> <MdEdit /> </button> </p>
            <p>****** <button onClick={changePassword}> <MdEdit /> </button> </p>
            <h1>Informações dos Usuários</h1>
            <p>Normais: {normalUser} </p>
            <p>Administradores: {adminUser} </p>
          </GridItem>

          <GridItem2>
            <h1>Novo Usuário</h1>
            <p>Nome: {newUserName} </p>
            <p>E-mail: {newMail} </p>
            <p>Senha: {newPassword} </p>
            <p>Tipo: {newUserType} </p>
            <Row>
              <button onClick={fillNewUser} >Preencher</button>
              <button onClick={createNewUser} >Criar</button>
            </Row>
            <p>Confirme se os dados estão corretos, caso esteja clique em Criar.</p>
          </GridItem2>
        </Container>

      <SearchPadding>
        <SearchBar content={content} setContent={setContent} />
      </SearchPadding>

      <ScrollContainer>
        <ListGridContainer>
          {
            users.filter(user => user.user_id !== user_id).map(user => (
              <ListGridItem key={generaterKey(user.user_id)} >
                <Right> <button onClick={() => deleteUser(user)} > <BsFillTrashFill /> </button> </Right>
                <p>Nome: {user.name} <button onClick={() => changeUserName(user)}> <MdEdit /> </button> </p>
                <p>E-mail: {user.mail} <button onClick={() => changeUserMail(user)}> <MdEdit /> </button> </p>
                <p>Senha: ************** <button onClick={() => changeUserPassword(user)}> <MdEdit /> </button> </p>
                <p>Tipo: {user.type === true ? 'Administrador' : 'Normal' } <button onClick={() => changeUserType(user)}> <MdEdit /> </button> </p>
              </ListGridItem>
            ))
          }
        </ListGridContainer>
      </ScrollContainer>

    </GlobalContainer>
  );
}

export default UserInformation;