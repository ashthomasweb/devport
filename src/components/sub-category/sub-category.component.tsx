/******************************************************************************
* FILENAME:
*   new.mjs

* DESCRIPTION:
*   

* NOTES:
*   - 

* Usage Rights: Not for public use or redistribution.

******************************************************************************/

import React, { useContext, useEffect } from 'react'
import { MainContext } from '../../context/main/MainState'
import { GlobalContext } from '../../context/global/GlobalState'

import { 
  /* Assets */
  /* Database */
  savePrimaryCategoryToDB,
  gatherUserPrimaryCategoriesFromDB,
  gatherSinglePrimaryCategoryFromDB,
  /* Helper Functions */
  indexFinder,
  /* Components */
  /* Icons */
} from '../../export-hub'

import './sub-category.styles.scss'

const SubCategory = (props: any): JSX.Element => {
  const {
    state: { workingObject},
    dispatch,
  } = useContext(MainContext)
  const {
    state: { userObj },
    globalDispatch,
  } = useContext(GlobalContext)

  const deleteSubcategory = async (e: any) => {
    if (window.confirm('Are you sure you want to mark as deleted?')) {
      let obj = workingObject.entries[indexFinder(workingObject.entries, props.data.id)]
      obj.deletedAt = new Date().getTime()
      await savePrimaryCategoryToDB(workingObject)
      gatherUserPrimaryCategoriesFromDB(userObj.auth, dispatch)
    }
  }




  // const openSubcategoryPane = async () => {
  //   dispatch({
  //     type: 'OPEN_PRIMARY_PANE',
  //     payload: {category: props.data.title}
  //   })
  //   gatherSinglePrimaryCategoryFromDB(userObj.auth, dispatch, props.data.title)
  // }
  
  const openPane = () => {
    if (props.pane === 'sub') {
      dispatch({
        type: 'SET_CURRENT_PARENT_ID',
        payload: { id: props.data.id, title: props.data.title, subtitle: props.data.subtitle }
      })
      dispatch({
        type: 'TOG_SUBSUBCAT_PANE',
      })
    } else if (props.pane === 'subsub') {
      dispatch({
        type: 'SET_FINAL_ID',
        payload: {
          id: props.data.id,
          title: props.data.title,
          subtitle: props.data.subtitle,
        },
      })
         dispatch({
           type: 'TOG_FINAL_PANE',
         })
    }
  }



  const updateSubcategory = async (e: any) => {
    e.preventDefault()
    let obj = await gatherSinglePrimaryCategoryFromDB(
      userObj.auth,
      props.data.id
    )
    dispatch({
      type: 'TOG_ADD_PANE',
      payload: { isAddPrimary: false, isEdit: true, editId: props.data.id, idChain: props.data.childOfChain, title: props.data.title, subtitle: props.data.subtitle },
    })
  }

  return (
    <div className='sub-category-container' onContextMenu={updateSubcategory} onClick={openPane}>
      <button onClick={deleteSubcategory}>X</button>
      <h4>{props.data.title}</h4>
      <p>{props.data.subtitle}</p>
    </div>
  )
}

export default SubCategory

// END of document
