  import { useNavigate } from "react-router-dom";
import { Link, useLocation, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import {CREATE_NEW_NOTE_MUTATION,DELETE_NOTE_MUTATION} from '../graphql/mutations'
import { NOTE_QUERY } from '../graphql/queries';
import {NOTE_CREATED_SUBSCRIPTION,INVITE_CREATED_SUBSCRIPTION} from '../graphql/subscriptions'
import {Divider,Button,Col,Row,Input }from 'antd'
import { useState,useEffect } from "react";
import { BREAK } from "graphql";

export default function Home(props) {
  const setToken=props.setToken
  const setTitle=props.setTitle
  const token=props.token
  const navigate = useNavigate();
  const [newdocument,setNewdocument]=useState('')
  const {
    loading, error, data: itemsData, subscribeToMore:subscribe,
  } = useQuery(NOTE_QUERY,{
    variables:{
      input:{
        userId:token
      }
    }
  });
  const [createNewNote]=useMutation(CREATE_NEW_NOTE_MUTATION)
  const [deleteNote]=useMutation(DELETE_NOTE_MUTATION)
  useEffect(
    ()=>{
      subscribe({
        document:NOTE_CREATED_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData })=>{
          const temp=subscriptionData.data.noteHandled
          if(temp.message=="delete")
            return{
              noteQuery:prev.noteQuery.replace(`${temp.title}_${temp.userId},`,``)
            }
          return{
            noteQuery:prev.noteQuery+`${temp.title}_${temp.userId},`
          }
        }
      })
    },[subscribe]
  )

  if (loading) return <p>Loading...</p>;
  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return (<p>Error :</p>);
  }
  
  const notelist=itemsData.noteQuery?itemsData.noteQuery.split(','):[]
  const toNote=(e)=>{
    setTitle(e)
    navigate(`note/${e}`)
  }

  const createNewdocument=(e)=>{
    createNewNote({
      variables:{
        input:{
          userId:token,
          title:newdocument
        }
      }
    })
  }

  const deletenote=(e)=>{
    deleteNote({
      variables:{
        input:{
          userId:token,
          title:e.split('_')[0]
        }
      }
    })
  }

  return (
    <>
      <Divider><h1>{token}'s note</h1></Divider>
      <Input.Group compact>
        <Input  size='large' style={{ width: '50%',height:'70px' }} placeholder="enter new document's name" 
          value={newdocument} onChange={e=>setNewdocument(e.target.value)}/>
        {
          !notelist.find(ele=>(ele==`${newdocument}_${token}`))?
            <Button size="large" type="primary" style={{ width: '10%',height:'70px' }} onClick={e=>createNewdocument(e)}>
              <h2>Create</h2>
            </Button>:
            <Button size="large" type="primary" style={{ width: '10%',height:'70px' }} onClick={e=>createNewdocument(e)} disabled>
                <h2>Create</h2>
            </Button>
        }
      </Input.Group>
      
      <br></br><br></br>
      {notelist.filter(ele=>(ele.length&&(ele.split('_')[1]==token))).map(ele=>(
        <>
          <Input.Group compact>
            <Button size="large"  style={{ width: '50%',height:'70px' }} onClick={e=>toNote(ele)}>
            <h2>{ele.split('_')[0]}</h2>
            </Button>
            <Button size="large" type='primary' style={{ width: '10%',height:'70px' }} danger onClick={e=>deletenote(ele)}>
              <h2>delete</h2>
            </Button>
          </Input.Group>
          <br></br>
        </>
      ))}
      <Divider><h1>Collaborate note</h1></Divider>
      {notelist.filter(ele=>(ele.length&&(ele.split('_')[1]!=token))).map(ele=>(
        <Button size="large"  style={{ width: '60%',height:'70px' }} onClick={e=>toNote(ele)}>
          <Row>
            <Col span={12}><b><h2>{ele.split('_')[0]}</h2></b></Col>
            <Col span={12}><h2>author by {ele.split('_')[1]}</h2></Col>
          </Row>
        </Button>
      ))}
    </>
  );
    
}