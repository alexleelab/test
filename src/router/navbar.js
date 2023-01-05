import React from 'react';
import { Breadcrumb,Button,Space } from 'antd';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const token=props.token
  const setToken=props.setToken
  const location =useLocation()
  const navigate = useNavigate();
  const logout=(e)=>{
    setToken('nothing')
    navigate('/login')
  }
  if(location.pathname=="/"){
    return(
      <>
        <Button size="large" type="dashed" style={{ width: '20%' }} disabled>HomePage</Button>
        <Button size="large" type='primary' style={{ width: '20%' }} onClick={e=>navigate('/signup')}>Sign up</Button>
        <Button size="large" type='primary' style={{ width: '20%' }} danger onClick={e=>navigate('/login')}>Sign in</Button>
      </>
    )
  }
  else if(location.pathname=="/signup"){
    return(
      <>
        <Button size="large" type='primary' style={{ width: '20%' }} onClick={e=>navigate('/')}>HomePage</Button>
        <Button size="large" type="dashed" style={{ width: '20%' }} disabled>Sign up</Button>
        <Button size="large" type='primary' style={{ width: '20%' }} danger onClick={e=>navigate('/login')}>Sign in</Button>
      </>
    )
  }
  else if(location.pathname=="/login"){
    return(
      <>
        <Button size="large" type='primary' style={{ width: '20%' }} onClick={e=>navigate('/')}>HomePage</Button>
        <Button size="large" type='primary' style={{ width: '20%' }} danger onClick={e=>navigate('/signup')}>Sign up</Button>
        <Button size="large" type="dashed" style={{ width: '20%' }} disabled>Sign in</Button>
      </>
    )
  }

  else if(location.pathname=="/homepage"){
    return(
      <>
          <Button size="large" type="dashed" style={{ width: '20%' }} disabled>Home</Button>
          <Button size="large" type='primary' style={{ width: '20%' }} onClick={e=>navigate('/invited')}>invited</Button>
          <Button size="large" type='primary' style={{ width: '20%' }} danger onClick={e=>logout(e)}>log out</Button>
      </>
    )
  }
  else if(location.pathname=="/invited"){
    return(
      <>
          <Button size="large" type='primary' style={{ width: '20%' }} onClick={e=>navigate('/homepage')}>Home</Button>
          <Button size="large" type="dashed" style={{ width: '20%' }} disabled>invited</Button>
          <Button size="large" type='primary' style={{ width: '20%' }} danger onClick={e=>logout(e)}>log out</Button>
      </>
    )
  }
  else if(location.pathname.slice(0,14)=='/homepage/note'){
    return(
      <>
          <Button size="large" type='primary' style={{ width: '20%' }} onClick={e=>navigate('/homepage')}>Back to Home</Button>
          <Button size="large" type="dashed" style={{ width: '20%' }}  onClick={e=>navigate(`/invited/${token}`)}>invition to this note</Button>
          <Button size="large" type='primary' style={{ width: '20%' }} danger onClick={e=>logout(e)}>log out</Button>
      </>
    )
  }
  else if(location.pathname.slice(0,9)=='/invited/'){
    return(
      <>
          <Button size="large" type='primary' style={{ width: '20%' }} onClick={e=>navigate('/homepage')}>Back to Home</Button>
          <Button size="large" type="dashed" style={{ width: '20%' }}  onClick={e=>navigate(`/homepage/note/${token}`)}>Back to note</Button>
          <Button size="large" type='primary' style={{ width: '20%' }} danger onClick={e=>logout(e)}>log out</Button>
      </>
    )
  }
}

export default Navbar;
