import React, { createContext, useContext, useState, useEffect } from 'react';

// Crie o contexto
const UserContext = createContext();

// Hook para usar o contexto do usuário
export const useUser = () => useContext(UserContext);

// Provider que irá englobar o seu app e fornecer o nome e o ID do usuário
export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');  // Novo estado para armazenar o ID do usuário

  useEffect(() => {
    // Recupera o nome e o ID do usuário do localStorage quando o componente é montado
    const storedUserName = localStorage.getItem('userName');
    const storedUserId = localStorage.getItem('userId');  // Recupera o ID do localStorage
    if (storedUserName) {
      setUserName(storedUserName);  // Define o nome do usuário com o valor salvo
    }
    if (storedUserId) {
      setUserId(storedUserId);  // Define o ID do usuário com o valor salvo
    }
  }, []);

  // Função para definir o nome e o ID do usuário após o login
  const login = (name, id) => {
    setUserName(name);
    setUserId(id);  // Define o ID do usuário
    localStorage.setItem('userName', name);  // Armazena o nome no localStorage
    localStorage.setItem('userId', id);  // Armazena o ID no localStorage
  };

  // Função para logout
  const logout = () => {
    setUserName('');
    setUserId('');  // Reseta o ID do usuário
    localStorage.removeItem('userName');  // Remove o nome do localStorage
    localStorage.removeItem('userId');  // Remove o ID do localStorage
  };

  return (
    <UserContext.Provider value={{ userName, userId, setUserName: login, setUserId, logout }}>
      {children}
    </UserContext.Provider>
  );
};