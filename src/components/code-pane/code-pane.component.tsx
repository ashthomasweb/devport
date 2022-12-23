/******************************************************************************
* FILENAME:
*   new.mjs

* DESCRIPTION:
*   

* NOTES:
*   - 

* Usage Rights: Not for public use or redistribution.

******************************************************************************/

import React, { useContext, useEffect, useRef } from 'react'
import { MainContext } from '../../context/main/MainState'
import { GlobalContext } from '../../context/global/GlobalState'


import { 
  /* Assets */
  /* Database */
  savePrimaryCategoryToDB,
  gatherUserPrimaryCategoriesFromDB,
  /* Helper Functions */
  treeSearchAndUpdateInPlace,
  /* Components */
  /* Icons */
} from '../../export-hub'

import './code-pane.styles.scss'
import AceWindow from '../ace-window/ace-window.component'

const CodePane = (props: any): JSX.Element => {
  const {
    state: { editorPacket, workingObject },
    dispatch,
  } = useContext(MainContext)
    const {
      state: { userObj },
      globalDispatch,
    } = useContext(GlobalContext)

  const fileNameRef: any = useRef(null)
  const fileExtRef: any = useRef(null)
  const fileContentRef: any = useRef(null)

  interface codePackType {
    title: string
    language: string
    content: string
  }

  const newCodeFile = () => {

    let obj: codePackType = {
      title: fileNameRef.current.value,
      language: fileExtRef.current.value,
      content: '',
    }

    editorPacket.codePacket.push(obj)
    dispatch({
      type: 'SEND_ENTRY_TO_EDITOR',
      payload: { editorPacket: editorPacket },
    })

  }

  const saveCodeFile = async () => {
    let newWorkingObject = treeSearchAndUpdateInPlace(
      workingObject,
      editorPacket.id,
      editorPacket.childOfChain,
      {},
      false,
      editorPacket.codePacket
    )
    await savePrimaryCategoryToDB(newWorkingObject)
    gatherUserPrimaryCategoriesFromDB(userObj.auth, dispatch)
  }

  const updateFileContent = (e: any, index: number) => {

    editorPacket.codePacket[index].content = e.target.value
  }

  const onChange = (e:any, value: any) => {
    console.log(value)
  }

  return (
    <div className='code-pane'>
      {editorPacket.title}
      <br />
      {editorPacket.subtitle}<br/>
      <input ref={fileNameRef} placeholder='filename.ext' type='text'></input>
      <input ref={fileExtRef} placeholder='language' type='text'></input>
      <button onClick={saveCodeFile}>Save To Entry</button>
      <button onClick={newCodeFile}>New File</button>

      {editorPacket.codePacket.map((file: any, index: number) => {
        return (
          <div key={index} className='code-window'>
            <div>
              <h4>{file.title}</h4>
            </div>
            {/* <AceEditor
              mode='javascript'
              theme='github'
              onChange={onChange}
              editorProps={{ $blockScrolling: true }}
              ></AceEditor> */}
              <AceWindow id={index} codeContent={file.content} language={fileExtRef.current?.value}/>
            {/* <textarea
              className='code-area'
              ref={fileContentRef}
              defaultValue={file.content}
              onChange={onChange}></textarea> */}
          </div>
        )
      })}
    </div>
  )
}

export default CodePane

/* END of document ***********************************************************/
