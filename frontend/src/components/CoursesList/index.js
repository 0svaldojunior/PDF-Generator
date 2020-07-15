import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { GlobalContainer, ScrollContainer, GridContainer, GridItem, Column, Column2 } from './styles';

import TopButtonsCourses from '../TopButtonsCourse';
import api from '../../services/api';
import SearchBar from '../SearchBar';

function CoursesList() {
  const [courses, setCourses] = useState([]);
  const [content, setContent] = useState('');
  const history = useHistory();
  
  useEffect(() => {
    async function loadCourses() {
      const response = await api.get('/courses');
      setCourses(response.data);
    };

    if(courses.length === 0) {
      loadCourses();
    } else if(content.length > 0) {
      setCourses(courses.filter( course => course.name.includes(content) ));
    } else {
      loadCourses();
    }
  }, [content, courses.length]);

  const generaterKey = (prefix) => {
    return `${prefix}-${new Date().getTime()}`;
  };

  async function handleDeleteCourse(id) {
    try {
      await api.delete(`/courses?course_id=${id}`, {
        data: {
          course_id: id
        }
      });
      setCourses(courses.filter(course => course.course_id !== id));
      alert('Remoção realizada com SUCESSO!');
    } catch (error) {
        alert('Erro ao deletar a ferramenta, verifique e tente novamente');
    }
  };

  return(
    <GlobalContainer>
      <TopButtonsCourses />
      <SearchBar  content={content} setContent={setContent} />

      <ScrollContainer>
        <GridContainer>
          <main>
            <ul>
              {
                courses.map(course => (
                  <GridItem key={generaterKey(course.course_id)}>
                    <Column>
                      <h1>Nome: {course.name}</h1>
                      <h1>Carga horária: {course.workload} | Número de Registro: {course.register_number}</h1>
                      <h1>Verso: {course.verse === true ? 'Sim' : 'Não'} | Histórico: {course.historic === true ? 'Sim' : 'Não'}</h1>
                      <h1>Conteúdo: Clique em Editar para vizualizar</h1>
                      <h1>Assunto do E-mail: {course.subject}</h1>
                      <h1>Conteúdo do E-mail: Clique em Editar para vizualizar</h1>
                    </Column>
                    
                    <Column2>
                      <button onClick={() => history.push('/courses-edit', {course})}>Editar</button>
                      <button onClick={() => handleDeleteCourse(course.course_id)}>Deletar</button>
                    </Column2>
                  </GridItem>
                ))
              }
            </ul>
          </main>

        </GridContainer>
      </ScrollContainer>
    </GlobalContainer>
  );
}

export default CoursesList;