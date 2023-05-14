import React, { useEffect } from 'react';
// import Feed from './components/Feed';
// import PersonDetails from './components/PersonDetails';
// import Todos from './components/Todos';
import TodosRedux from './components/TodosRedux';

import './App.css'

export default function App() {



  useEffect(() => {
  }, [])


  return (
    <div className='App'>
      {/* <PersonDetails /> */}
      {/* <Todos /> */}
      {/* <Feed /> */}
      <TodosRedux />
    </div>
  );
}
