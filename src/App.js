import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { API } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listTodos } from './graphql/queries';
import { createTodo, deleteTodo } from './graphql/mutations';


function App() {
  const initialFormState = { name: "", description: "" };

  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  // componentMount();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const graphQL = await API.graphql({ query: listTodos }); // Fetch data from graphql
    setNotes(graphQL.data.listTodos.items)
  };

  const createNote = async () => {
    await API.graphql({ query: createTodo, variables: { input: formData } })
    setNotes([...notes, formData]); //array.push(formData)
    setFormData(initialFormState)
  }

  const deleteNote = async ({ id }) => {
    await API.graphql({ query: { deleteTodo, variables: { input: id } } })
    const newNotesArray = notes.filter(note => note.id !== id);
    setFormData(initialFormState)
    setNotes(newNotesArray)
  }

  return (
    <div className="App">
      <h1>Mis notas</h1>
      <input
        onChange={event => setFormData({ ...formData, name: event.target.value })}
        placeholder={"Nombre de la nota"}
        value={formData.name}
      />

      <input
        onChange={event => setFormData({ ...formData, description: event.target.value })}
        placeholder={"Descripcion de la nota"}
        value={formData.description}
      />

      <div style={{ marginBottom: 30 }}>
        {notes.map(element => {
          return (<div style={{ border: '1px solid black' }}>
            <h2>{element.name}</h2>
            <h3>{element.name}</h3>
            <button onClick={deleteNote}>Borrar nota</button>
          </div>)
        })}
      </div>

      <button onClick={createNote}>Crear nota</button>
      <AmplifySignOut />
    </div >
  );
}

export default withAuthenticator(App);