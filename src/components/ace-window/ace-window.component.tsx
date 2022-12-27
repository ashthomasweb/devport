/******************************************************************************
* FILENAME:
*   ace-window.component.tsx

* DESCRIPTION:
*   This is an area to place a general description of the file. Please limit
*   line length to less than 80. The header delimiter is 80 characters long.
*   Place an asterisk in column 1 to continue blocked comments.

* NOTES:
*   - 

* Usage Rights: Not for public use or redistribution.

******************************************************************************/

import React, { useContext, useEffect, useRef } from 'react'
import { MainContext } from '../../context/main/MainState'

import { 
  /* Assets */
  /* Database */
  /* Helper Functions */
  /* Components */
  /* Icons */
} from '../../export-hub'

import './ace-window.styles.scss'

const AceWindow = (props: any): JSX.Element => {
  const {
    state: { aceObj, editorPacket },
    dispatch,
  } = useContext(MainContext)

  const currentEditor = useRef(null)

  // let isFirstOpen = Boolean(props.lastFileViewed === null)
  

  // // first time open
  // if (isFirstOpen) {
  //   if (props.resourceFileNameId.includes('config')) {
  //     displayValue = 'block'
  //     // dispatch({ type: 'MAKE_CODEFILE_ACTIVE', payload: { activeFileId: props.resourceFileNameId } })

  //   } else {
  //     displayValue = 'none'
  //   }
  // } else { // subsequent actions
  //   // only on tab into previously existing resource, that is not the first time doing so
  //   if ( parseFloat(editorData.activeFileId) !== parseFloat(props.lastFileViewed)) {
  //     // console.log('fire last viewed!')
  //     // console.log(props.lastFileViewed)
      
  //     // check to see if this editor is the last viewed
  //     if ( props.fileData.fileNameId === props.lastFileViewed ) {
  //       // console.log('should fire for last V')
  //       displayValue = 'block'
  //     } else {
  //       // console.log('turning display off')
  //       displayValue = 'none'
  //     }

  //   } else {
  //       // console.log('tabbing between')
  //     // console.log(editorData.activeFileId)
      
  //     // upon clicking between tabs
  //     String(editorData.activeFileId) === String(props.fileData.fileNameId)
  //     ? (displayValue = 'block')
  //     : (displayValue = 'none')
  //   }
  // }

  const Ace = aceObj


  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore -
    // let langTools = window.ace.require('ace/ext/language_tools')

    var editor = Ace.edit(`editor ${props.id}`)
    editor.setTheme('ace/theme/chaos')
    function setEditor() {
      editor.setValue('')
      // editor.session.setMode('ace/mode/javascript')
      // editor.session.setMode('ace/mode/terraform')
      editor.session.setMode(`ace/mode/${props.language}`)
      editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        maxLines: Infinity,
      })
      // console.log('set')
      editor.session.insert({ row: 1, column: 0 }, props.codeContent)
      if (props.codeContent === '') {
      editor.setValue('\r\r\r\r')
      }
      // editor.focus()
    // if (props.resourceFileNameId.includes('config') && isFirstOpen) {
    //   // dispatch({ type: 'MAKE_CODEFILE_ACTIVE', payload: { activeFileId: props.resourceFileNameId } })
    // }
    }

    // langTools.setCompleters([staticKeyWordCompleter])

    setEditor()

  }, [
    props.id,
    Ace,
    props.codeContent,
    dispatch,
    // props.fileData.associatedResourceId,
    // props.fileData.filename,
    // props.resourceFileNameId,
    // isFirstOpen,
  ])

  // const callbackSave = useCallback(
  //   async (e:any) => {
  //     console.log(e.target)
  //     var editor = Ace.edit(`editor ${props.id}`)
  //     let newCodeContent = editor.getValue()
  //     console.log(newCodeContent)
  //     await dispatch({
  //       type: 'UPDATE_CODEFILE',
  //       payload: {
  //         resourceId: props.fileData.associatedResourceId,
  //         filename: props.fileData.filename,
  //         codeContent: newCodeContent,
  //       },
  //     })
  //     await dispatch({
  //       type: 'REFRESH_CODE_PANE_OFF',
  //     })
  //     await dispatch({
  //       type: 'REFRESH_CODE_PANE_ON',
  //     })
  //     dispatch({
  //       type: 'MAKE_EDITOR_INACTIVE'
  //     })
  //   }, 
  //   [Ace, dispatch, props.fileData.associatedResourceId, props.fileData.filename, props.id]
  // )


  // useEffect(() => {

  //   // if (editorData.saveAll === true ) {
  //   //   saveToState()
  //   // }

  //   async function saveToState() {
  //     var editor = Ace.edit(`editor ${props.id}`)
  //     let newCodeContent = editor.getValue()
  //     // await dispatch({
  //     //   type: 'REFRESH_CODE_PANE_OFF',
  //     // })
  //     await dispatch({
  //       type: 'UPDATE_CODEFILE',
  //       payload: {
  //         resourceId: props.fileData.associatedResourceId,
  //         filename: props.fileData.filename,
  //         codeContent: newCodeContent,
  //       },
  //     })
  //     // await dispatch({
  //     //   type: 'REFRESH_CODE_PANE_ON',
  //     // })
  //   }
    
  // }, [Ace, dispatch, editorData.saveAll, props.fileData.associatedResourceId, props.fileData.filename, props.id])
  
  // /* BROKEN, ACE ONCHANGE TO CALLBACK */
  // useEffect(() => {
  //   console.log('mounted')
  //   var editor = Ace.edit(`editor ${props.id}`)

  //   editor.session.on('change', function(e: any) {
  //     console.log('hi')
  //     // toast('!! Now editing code file !!')
  //     // dispatch({
  //     //   type: 'MAKE_EDITOR_ACTIVE'
  //     // })
  //     console.log(editor.getValue())
  //     callbackSave(e)
  //   });
  //   // return function unmount() {
  //   //   dispatch({
  //   //     type: 'MAKE_EDITOR_INACTIVE'
  //   //   })
  //   //   console.log('un')
  //   // }
  // }, [Ace, props.id, dispatch, callbackSave])



  // useEffect(() => {
  //   // console.log('mounted')
  //   var editor = Ace.edit(`editor ${props.id}`)

  //   editor.session.selection.on('changeCursor', function(e: any) {
  //     // toast('!! Now editing code file !!')
  //     console.log('changeCursor')
  //     dispatch({
  //       type: 'MAKE_EDITOR_ACTIVE'
  //     })
  //   });
  //   return function unmount() {
  //     dispatch({
  //       type: 'MAKE_EDITOR_INACTIVE'
  //     })
  //     // console.log('un')
  //   }
  // }, [Ace, props.id, dispatch])

  
  const updateFileContent = (e: any, index: number) => {
    var editor = Ace.edit(`editor ${props.id}`)
    let newCodeContent = editor.getValue()
      editorPacket.codePacket[index].content = newCodeContent
      // dispatch({
      //   type: 'SEND_ENTRY_TO_EDITOR',
      //   payload: { editorPacket: editorPacket },
      // })
    }

  return (
    <div
      id={`editor ${props.id}`}
      onInput={(e) => updateFileContent(e, props.id)} // props.id is the index of parent
      ref={currentEditor}
    />
  )
}

export default AceWindow

/* END of document ***********************************************************/
