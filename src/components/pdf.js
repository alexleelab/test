import { useState } from "react"
import { Button } from 'antd';
import api from '../axios'
import { useMutation } from '@apollo/client';
import { CREATE_PDF_MUTATION} from '../graphql/mutations'


const Pdf=(props)=>{
    const setUploadDisaply=props.setUploadDisaply
    const pages=props.pages
    const title=props.title
    const token=props.token
    const [file,setFile]=useState()
    const browse = async(e)=>{
        if(e.target.files)
            setFile(e.target.files[0])
    }
    const [createPdfItem] = useMutation(CREATE_PDF_MUTATION);
    function getArrayBuffer(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.addEventListener('load', () => {
            resolve(reader.result);
          });
          reader.readAsArrayBuffer(file);
        })
      }
    const upload = async(e)=>{
        setUploadDisaply(1)
        const arraybuffer=await getArrayBuffer(file)
        for(var i=0;5000*(i-1)<arraybuffer.byteLength;i++){
            var start=5000*i
            var end=Math.min(5000*(i+1),arraybuffer.byteLength)
            var slicebuffer=arraybuffer.slice(start,end)
            var data=Array.from(new Uint8Array(slicebuffer))
            createPdfItem({
                variables: {
                    input:{
                        userId:token,
                        title:title,
                        pages:pages,
                        message:"uploading",
                        pdfname:file.name,
                        data:data.toString(),
                        dataStart:start,
                        dataEnd:arraybuffer.byteLength
                    }
                }
            });
        }
    }
    return(
        <>
            <input
                type="file"
                id="file-selector"
                accept=".pdf"
                onChange={browse}
            />
            <Button onClick={upload}>Confirm</Button>
        </>
    )
}
export default Pdf
