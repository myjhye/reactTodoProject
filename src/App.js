import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import TodoList from './components/TodoList/TodoList';
import { DarkModeProvider } from './context/DarkModeContext';

const filters = ['all', 'active', 'completed'];

function App() {

  const [filter, setFilter] = useState(filters[0]);

  return (
    <DarkModeProvider>
      <Header 
        filters={filters} // all, active, completed 
        filter={filter} // 선택한 값 
        onFilterChange={setFilter} // 선택한 값 변경하기
      />
      <TodoList 
        filter={filter}
      />
    </DarkModeProvider>
  );
}

export default App;
