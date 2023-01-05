import { useState } from 'react';

export function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    //const userToken = tokenString?0:JSON.parse(tokenString);
    return tokenString
  };

  //const [token,setToken ] = useState(getToken());
  const [token,setToken ] = useState("");

  const saveToken = userToken => {
    //localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token
  }
}

export function useTitle() {
  const getTitle = () => {
    const tokenString = localStorage.getItem('title');
    //const userToken = tokenString?0:JSON.parse(tokenString);
    return tokenString
  };

  //const [title,setTitle ] = useState(getTitle());
  const [title,setTitle ] = useState("");

  const saveTitle = userTitle => {
    //localStorage.setItem('title', JSON.stringify(userTitle));
    setTitle(userTitle);
  };

  return {
    setTitle: saveTitle,
    title
  }
}
