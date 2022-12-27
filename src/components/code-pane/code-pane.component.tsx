/******************************************************************************
* FILENAME:
*   new.mjs

* DESCRIPTION:
*   

* NOTES:
*   - 

* Usage Rights: Not for public use or redistribution.

******************************************************************************/

import React, { useContext, useEffect, useRef, useState } from 'react'
import { MainContext } from '../../context/main/MainState'
import { GlobalContext } from '../../context/global/GlobalState'
import { toast } from 'react-toastify'

import {
  /* Assets */
  /* Database */
  savePrimaryCategoryToDB,
  gatherUserPrimaryCategoriesFromDB,
  /* Helper Functions */
  treeSearchAndUpdateInPlace,
  indexFinder,
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
  const fileTitleRef: any = useRef(null)
  const fileLanguageRef: any = useRef(null)

  const [editIndex, setEditIndex]: any = useState(null)
  const [allowEdit, setAllowEdit]: any = useState(null)

  interface codePackType {
    title: string
    language: string
    content: string
    id: number
  }

  const newCodeFile = () => {
    let obj: codePackType = {
      title: fileNameRef.current.value,
      language: fileExtRef.current.value,
      content: '',
      id: Math.random() * 10e18,
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

  const editFileParams = (index: number) => {
    setAllowEdit(!allowEdit)
    setEditIndex(index)
  }

  const saveFileParams = async (e: any, id: number) => {
    console.log(e.target.previousSibling.previousSibling.previousSibling)
    let languageField = e.target.previousSibling.previousSibling.previousSibling
    let titleField =
      e.target.previousSibling.previousSibling.previousSibling.previousSibling

    let file = editorPacket.codePacket[indexFinder(editorPacket.codePacket, id)]
    file.title = titleField.value
    file.language = languageField.value
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
    setAllowEdit(false)
  }

  const deleteFile = async (id: number) => {
    editorPacket.codePacket = editorPacket.codePacket.filter((item) => item.id !== id)

    dispatch({
      type: 'SEND_ENTRY_TO_EDITOR',
      payload: { editorPacket: editorPacket },
    })
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
    setAllowEdit(false)
  }

  let inputStyle: any = {
    border: `${allowEdit ? '1px solid lightgreen' : '1px solid lightgrey'}`,
    pointerEvents: `${allowEdit ? 'all' : 'none'}`,
    margin: '0 5px 3px 0',
  }

  const closeCodePane = () => {
    dispatch({
      type: 'TOG_CODE_PANE'
    })
  }

  const copyCode = async (input: string) => {
    try {
      await navigator.clipboard.writeText(input)
      await toast('Content copied to clipboard')
    } catch (err) {
      await toast('Failed to copy!')
      console.log('Failed to copy: ', err)

    }
  }

  return (
    <div className='code-pane'>
      <h3>{editorPacket.title}</h3>
      <button
        style={{ position: 'absolute', right: 0 }}
        onClick={closeCodePane}>
        Close
      </button>
      <p>{editorPacket.subtitle}</p>
      {/* <br /> */}
      <input ref={fileNameRef} placeholder='filename.ext' type='text'></input>
      <input ref={fileExtRef} placeholder='language' type='text'></input>
      <button onClick={saveCodeFile}>Save To Entry</button>
      <button onClick={newCodeFile}>New File</button>

      {editorPacket.codePacket.length >= 1 &&
        editorPacket?.codePacket.map((file: any, index: number) => {
          return (
            <div key={index} className='code-window'>
              <div>
                <button onClick={() => copyCode(file.content)}>Copy</button>
                <input
                  ref={fileTitleRef}
                  style={inputStyle}
                  type='text'
                  defaultValue={file.title}></input>
                <input
                  ref={fileLanguageRef}
                  style={inputStyle}
                  type='text'
                  defaultValue={file.language}></input>
                <button onClick={() => editFileParams(index)}>{`${
                  allowEdit ? 'Cancel' : 'Edit'
                }`}</button>

                <button onClick={() => deleteFile(file.id)}>Delete</button>
                {allowEdit && (
                  <button onClick={(e) => saveFileParams(e, file.id)}>
                    Save
                  </button>
                )}
              </div>
              <div style={{position: 'relative'}}>
              <AceWindow
                id={index}
                codeContent={file.content}
                language={file.language}
              />
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default CodePane

/* END of document ***********************************************************/
