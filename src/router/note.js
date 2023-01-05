import MATRIX from '../components/matrix'
import { useState,useEffect } from "react";
import { useQuery, useMutation } from '@apollo/client';
import { Button,Divider } from 'antd';
import { GET_PDF_ITEMS_QUERY } from '../graphql/queries';
import {
  PDF_ITEM_CREATED_SUBSCRIPTION,
  PDF_ITEM_UPDATED_SUBSCRIPTION
} from '../graphql/subscriptions';


export default function Home(props) {
  const token=props.token
  const title=props.title
  const setToken=props.setToken
  const setTitle=props.setToken
  const [pdfFileData, setPdfFileData] = useState("");
  const [uploadDisplay,setUploadDisaply]=useState(1);
  const {
    loading, error, data: itemsData, subscribeToMore,
  } = useQuery(GET_PDF_ITEMS_QUERY,{
    variables:{
      input:{
        userId:token,
        title:title
      }
    }
  });
  useEffect(
    ()=>{
      subscribeToMore({
        document:PDF_ITEM_UPDATED_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData })=>{
          console.log(subscriptionData)
          const temp=subscriptionData.data.pdfItemUpdated
          if(temp.status=='deleted'){
            return{
              pdfitems:prev.pdfitems.filter(ele=>ele.id!=temp.id)
            }
          }
          const id=prev.pdfitems.findIndex(ele=>(ele.id==temp.id))
          if(id==-1){
            return{
              pdfitems:[temp,...prev.pdfitems]
            }
          }
          else if(id==0){
            //console.log([...prev.pdfitems.slice(0,id),temp,...prev.pdfitems.slice(id+1,prev.pdfitems.length)])
            return{
              pdfitems:[temp,...prev.pdfitems.slice(1,prev.pdfitems.length)]
            }
          }
          else{
            //console.log([...prev.pdfitems.slice(0,id),temp,...prev.pdfitems.slice(id+1,prev.pdfitems.length)])
            return{
              pdfitems:[...prev.pdfitems.slice(0,id),temp,...prev.pdfitems.slice(id+1,prev.pdfitems.length)]
            }
          }
        }
      })
    },[subscribeToMore]
  )
  if (loading) return <p>Loading...</p>;
  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return (<p>Error :</p>);
  }
  const items=itemsData.pdfitems.slice().sort((a, b) => a.pages - b.pages);
  console.log(items)
  return (
    <>
      <Divider><h1>note title's: {title}</h1></Divider>
      <Divider><h1>user : {token}</h1></Divider>
      {items.map(element => {
        return (
        <><MATRIX data={element} 
                    pdfFileData={pdfFileData} 
                    setPdfFileData={setPdfFileData} 
                    uploadDisplay={uploadDisplay}
                    setUploadDisaply={setUploadDisaply}
                    token={token} setToken={setToken} title={title} setTitle={setTitle}
                    >
                  </MATRIX><br></br></>
        )
      })}
    </>
  );
}
