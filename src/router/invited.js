import { Link, useLocation, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, split } from '@apollo/client';
import { INVITE_MUTATION,HANDLE_INVITE_MUTATION } from '../graphql/mutations';
import { NOTE_QUERY,INVITE_QUERY } from '../graphql/queries';
import {INVITE_CREATED_SUBSCRIPTION} from '../graphql/subscriptions'
import {Divider,Button,Col,Row,Input,Select }from 'antd'
import { useEffect, useState } from 'react';

export default function Home(props) {
  const setToken=props.setToken
  const setTitle=props.setTitle
  const token=props.token
  const navigate = useNavigate();
  const { Search } = Input;
  const { Option } = Select;
  const [selectTitle,setSelectTitle]=useState('choose one note')
  const [friendId,setFirendId]=useState('')
  let {noteid}=useParams()
  const [inviteMethod]=useMutation(INVITE_MUTATION)
  const [handleInviteMethod]=useMutation(HANDLE_INVITE_MUTATION)
  const {
    loading, error, data: itemsData, subscribeToMore,
  } = useQuery(NOTE_QUERY,{
    variables:{
      input:{
        userId:token
      }
    }
  });
  const {
    loading2, error2, data: itemsData2, subscribeToMore:subscribe2,
  } = useQuery(INVITE_QUERY,{
    variables:{
      input:{
        userId:token
      }
    }
  });

  useEffect(
    ()=>{
      subscribe2({
        document:INVITE_CREATED_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData })=>{
          const temp=subscriptionData.data.inviteCreated
          console.log(temp.acceptance)
          if(temp.acceptance==0|temp.acceptance==1)
            return{
              inviteQuery:prev.inviteQuery.replace(`${temp.title}_${temp.userId}_${temp.friendId},`,``)
            }
          return{
            inviteQuery:prev.inviteQuery+`${temp.title}_${temp.userId}_${temp.friendId},`
          }
        }
      })
    },[subscribe2]
  )
  if (loading) return <p>Loading...</p>;
  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return (<p>Error :</p>);
  }

  const notelist=itemsData?(itemsData.noteQuery?itemsData.noteQuery.split(','):[]):[]
  const invitelist=itemsData2?(itemsData2.inviteQuery?itemsData2.inviteQuery.split(','):[]):[]

  //console.log(itemsData)
  const toNote=(e)=>{
    setTitle(e)
    navigate(`note/${e}`)
  }

  const invite=(e)=>{
    console.log(selectTitle,friendId)
    inviteMethod({
        variables:{
            input:{
                userId:token,
                title:selectTitle,
                friendId:friendId
            }
        }
    })
  }

  const handleInvite=(e,acceptance)=>{
    console.log(e.split('_')[1],acceptance)
    handleInviteMethod({
        variables:{
            input:{
                title:e.split('_')[0],
                userId:e.split('_')[1],
                friendId:e.split('_')[2],
                acceptance:acceptance
            }
        }
    })
  }

  if(noteid){
    return(
        <>
            <Divider><h1>Invite others to {noteid.split('_')[0]}</h1></Divider>
            <Input.Group compact>
                <Select size='large' defaultValue={notelist[0].split('_')[0]}>
                    <Option value={notelist[0].split('_')[0]}>{notelist[0].split('_')[0]}</Option>
                </Select>
                <Input  size='large' style={{ width: '50%' }} placeholder="enter you friend's id" />
                <Button type="primary" size='large'>Add</Button>
            </Input.Group>
        </>
    )
  }
  return (
    <>
        <Divider><h1>Invite others</h1></Divider>
        <Input.Group compact>
            <Select size='large' value={selectTitle} onChange={e=>setSelectTitle(e)}>
            {notelist.filter(ele=>(ele.length&&(ele.split('_')[1]==token))).map(ele=>(
                <Option value={ele.split('_')[0]}>{ele.split('_')[0]}</Option>
            ))}
            </Select>
            <Input  
                size='large' 
                style={{ width: '50%' }} 
                placeholder="enter you friend's id"
                value={friendId} 
                onChange={e=>setFirendId(e.target.value)}/>
            <Button type="primary" size='large' onClick={e=>invite(e)}>Add</Button>
        </Input.Group>
        <br></br>
        {invitelist.filter(ele=>(ele.length&&(ele.split('_')[1]==token))).map(ele=>(
            <>
            <Input.Group compact>
            <Button size="large"  style={{ width: '50%',height:'70px' }} disabled>
                    <Row>
                        <Col span={12}><b><h2>{ele.split('_')[0]}</h2></b></Col>
                        <Col span={12}><h2>not accepted by {ele.split('_')[2]} yet</h2></Col>
                    </Row>
                </Button>
                <Button size="large" type='primary' style={{ width: '10%',height:'70px' }} danger
                    onClick={e=>handleInvite(ele,0)}>cancel</Button>
            </Input.Group>
            <br></br>
                
            </>
            
        ))}
        <Divider><h1>Other's invition</h1></Divider>
        {invitelist.filter(ele=>(ele.length&&(ele.split('_')[1]!=token))).map(ele=>(
            <>
              <Input.Group compact>
                <Button size="large"  style={{ width: '60%',height:'70px' }} onClick={e=>toNote(ele)}>
                  <Row>
                    <Col span={12}><b><h2>{ele.split('_')[0]}</h2></b></Col>
                    <Col span={12}><h2>author by {ele.split('_')[1]}</h2></Col>
                  </Row>
                </Button>
                <Button size="large" type='primary' style={{ width: '10%',height:'70px' }} 
                  onClick={e=>handleInvite(ele,1)}>accept</Button>
              </Input.Group>
                
            </>
        ))}
    </>
  );
    
}
