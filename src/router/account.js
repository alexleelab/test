import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'
import {CREATE_ACCOUNT_MUTATION} from '../graphql/mutations'
import { SIGNUP_QUERY,LOGIN_QUERY } from '../graphql/queries';
import { useQuery, useMutation,NetworkStatus } from '@apollo/client';
import {CheckCircleTwoTone,CloseSquareTwoTone} from '@ant-design/icons'


export const Login=(props)=>{
    const setToken=props.setToken
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {
        loading, error, data,refetch
    } = useQuery(LOGIN_QUERY,{
        variables:{}
    });
    setTimeout(() => {
        console.log(data)
        if(data.loginQuery){
            console.log(data)
            setToken(data.loginQuery)
            navigate('/homepage')
        }
    }, 1000);

    const handleSubmit=async()=>{
        refetch({input:{userId:username,password:password}})
    }
    return(
        <div>
            <h1>Please Log In</h1>
            <p>Username</p>
            <input type="text" value={username} onChange={e => setUserName(e.target.value)}/>
            <p>Password</p>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}/><br></br>
            <button type="submit" onClick={e=>handleSubmit(e)}>Submit</button>
        </div>
    )
}

export const Signup=(props)=>{
    const setToken=props.setToken
    const [username, setUserName] = useState('');
    const [usernameValid,setUserNameValid]=useState(0);
    const [password, setPassword] = useState('');
    const [passwordCheck,setPasswordCheck]=useState('')
    const navigate = useNavigate();
    const [createAccount] = useMutation(CREATE_ACCOUNT_MUTATION);
    const {
        loading, error, data,refetch,networkStatus
    } = useQuery(SIGNUP_QUERY,{
        variables:{},notifyOnNetworkStatusChange: true
    });
    /*
    const handleUsername=async(e)=>{
        setUserName(e.target.value)
        await refetch({input:{userId:e.target.value}})
        setUserNameValid(data.signupQuery)
    }
    */
    const handleSubmit=()=>{
        createAccount({
            variables:{
                input:{
                    userId:username,
                    password:password
                }
            }
        })
        navigate("/login")
    }
    return(
        <div>
            <h1>Sign up</h1>
            <p>
                Username:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" value={username} onChange={e => setUserName(e.target.value)}/>
                {/*(usernameValid&&username!='')?<CheckCircleTwoTone />:<CloseSquareTwoTone />*/}
            </p>
            <p>
                Password:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
            </p>
            <p>
                Password Again:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="password" value={passwordCheck} onChange={e => setPasswordCheck(e.target.value)}/>
                {(password===passwordCheck&&password!='')?<CheckCircleTwoTone />:<CloseSquareTwoTone />}
            </p>
            <button type="submit" onClick={e=>handleSubmit(e)}>Submit</button>
        </div>
    )
}