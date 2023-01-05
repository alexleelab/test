import React from 'react'
import styled from 'styled-components'
import { useState,useEffect } from "react";
import { Buffer } from "buffer";
import {Button,Input} from 'antd'
import {EditOutlined} from '@ant-design/icons'
import MDEditor from '@uiw/react-md-editor';

import { useMutation } from '@apollo/client';
import { UPDATE_PDF_MUTATION,CREATE_PDF_MUTATION,DELETE_ITEM_MUTATION} from '../graphql/mutations'
import PDF from '../components/pdf'

function renderPdf(pdfBuffer) {
    const bufarray=pdfBuffer.toString().split(',')
    const buf=Buffer.from(bufarray)
    const tempblob = new Blob([buf], {
        type: "application/pdf",
    });
    const docUrl = URL.createObjectURL(tempblob);
    return docUrl
}

const Matrix=({className,data,children,setUploadDisaply,uploadDisplay,pdfFileData,setPdfFileData,token,title})=>{
    const [mode,setMode]=useState('displaying')
    const [MDValue,setMDValue]=useState(data['markdown'])
    const [updateItem] = useMutation(UPDATE_PDF_MUTATION);
    const [createItem] = useMutation(CREATE_PDF_MUTATION)
    const [deleteItemMethod] = useMutation(DELETE_ITEM_MUTATION)
    const [imageMode,setImageMode]=useState(0)
    const changeMode=(e)=>{
        if(mode=='displaying'){
            setMode('editing')
            updateItem({
                variables: {
                    input:{
                        id:data.id,
                        userId:data.userId,
                        title:data.title,
                        pages:data.pages,
                        markdown:MDValue.toString(),
                        status:`${token} is editing`,
                        imagelink:data.imageLink,
                        pdfBuffer:data.pdfBuffer
                    }
                }
            });
        }
        else{
            setMode('displaying')
            updateItem({
                variables: {
                    input:{
                        id:data.id,
                        userId:data.userId,
                        title:data.title,
                        pages:data.pages,
                        markdown:MDValue.toString(),
                        status:`${token} finish editing`,
                        imagelink:data.imageLink,
                        pdfBuffer:data.pdfBuffer
                    }
                }
            });
        }
    }
    const newItem=(e)=>{
        console.log(e)
        createItem({
            variables: {
                input:{
                    userId:token,
                    title:title,
                    pages:data.pages,
                    message:"nothing"
                }
            }
        })
    }

    const deleteItem=(e)=>{
        deleteItemMethod({
            variables:{
                input:{
                    id:data.id
                }
            }
        })
    }
    const imageList=(!data['imageLink'])?[]:(data['imageLink'].split(','))
    const mod=imageList.length
    return(
        <div className={className}>
            <div className='flexbox'>
                <div className='pdfFrame'>
                    <Button type='primary' onClick={e=>setImageMode((imageMode+mod-1)%mod)}>{"<"}</Button>
                    {
                    (!data.pdfBuffer||(imageMode!=0))?
                    <img style={{width:"550px"}} src={imageList[imageMode]}></img>:
                    <iframe
                        style={{width:"550px",height:"400px"}}
                        title="PdfFrame"
                        src={renderPdf(data.pdfBuffer)}
                        type="application/pdf"
                    ></iframe>
                    }
                    <Button type='primary' onClick={e=>setImageMode((imageMode+1)%mod)}>{">"}</Button>
                </div>
                
                
                <div className='extracted' data-color-mode="light">
                    <div className='tools_row'>
                        {data.status}
                        {(data.status.slice(-10)=='is editing'&&data.status!=`${token} is editing`)?
                           <Button className='right_top' disabled>
                           <EditOutlined />
                       </Button>:<Button className='right_top' onClick={changeMode}>
                            <EditOutlined />
                        </Button> }
                        <Button type='primary' danger onClick={e=>deleteItem(e)}>x</Button>
                    </div>
                    {mode==='editing'?
                        <MDEditor
                            value={MDValue}
                            onChange={setMDValue}
                            hideToolbar={true}
                            preview='edit'
                        />
                        :<MDEditor.Markdown 
                            source={MDValue} 
                            style={{ whiteSpace: 'pre-wrap' }} />}
                </div>
            </div>
            <Input.Group compact>
                <Button type="dashed" onClick={e=>newItem(data.pages+1)}>Add</Button>
                <Button type="dashed" onClick={e=>setUploadDisaply(0)}>Upload</Button>
            </Input.Group>
            <br></br>
            {uploadDisplay?
                <></>:
                <PDF pdfFileData={pdfFileData} 
                    setPdfFileData={setPdfFileData} 
                    setUploadDisaply={setUploadDisaply}
                    pages={data.pages}
                    token={token}
                    title={title}></PDF>}
        </div>
    )
}

const StyledMatrix=styled(Matrix)`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .flexbox{
        display:flex;
        min-width:80%;
    }
    .pdfFrame{
        width: 650px;
        padding: 2em;
    }
    .extracted{
        width: 650px;
        height: 400px;
        padding:2em;
        border-style:dotted;
    }
    .tools_row{
        width:100%;
        text-align:right;
    }
    .right_top{

    }
`
export default StyledMatrix
