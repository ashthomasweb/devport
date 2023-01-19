export const indexFinder = (
  arrayObj: any,
  id: string | number | null
): number => {
  // console.log(`Trace: indexFinder()`)
  let newIndex: any
  arrayObj.forEach((item: any) => {
    Number(item.id) === Number(id) && (newIndex = arrayObj.indexOf(item))
  })
  return newIndex
}

export const treeSearchAndUpdateInPlace = (
  treeObj: any,
  id: string | number | null,
  chain: any[],
  newEntryValues: any = null,
  toDelete: boolean = false,
  codePacket: any = null,
  newEntry: any = null
): void => {
  // console.log(`Trace: treeSearchAndUpdateInPlace()`)
  console.log(chain)

  let depth
  if (chain === undefined) {
    depth = 1
  } else {
    depth = chain?.length + 1
  }

  function updateFields(self: any) {
    self.title = newEntryValues.title
    self.subtitle = newEntryValues.subtitle
  }

  function markDeleted(self: any) {
    self.deletedAt = new Date().getTime()
  }

  function updateCode(self: any) {
    self.codePacket = codePacket
  }

//   function addEntryToPacket(self: any) {
//     // debugger
// console.log('test')
//     console.log(self)
//     self.entries.push(newEntry)
//   }


  let operation
  if (toDelete && newEntry === null) {
    operation = markDeleted
  } else if (codePacket !== null) {
    operation = updateCode
  } else {
    operation = updateFields
  }

  if (depth === 1) {
    // primary category [ no ID ]
    console.log('primary')
    let self = treeObj
    // toDelete ? markDeleted(self) : updateFields(self, newEntryValues)
    operation(self)
  } else if (depth === 2) {
    // subcategory - [top-level working obj ID, ]
    console.log('sub')
    let self = treeObj.entries[indexFinder(treeObj.entries, id)]
    // toDelete ? markDeleted(self) : updateFields(self, newEntryValues)
    operation(self)
  } else if (depth === 3) {
    // subsubcategory - [top-level working obj ID, subCategoryId,]
    console.log('subsub')
    let primaryEntries = treeObj.entries
    let subEntries =
      primaryEntries[indexFinder(primaryEntries, chain[1])].entries
    let self = subEntries[indexFinder(subEntries, id)]
    //  toDelete ? markDeleted(self) : updateFields(self, newEntryValues)
    operation(self)
  } else if (depth === 4) {
    // finalcategory - [top-level working obj ID, subCategoryId, subsubcotegoryID]
    console.log('final')
    let primaryEntries = treeObj.entries
    let subEntries =
      primaryEntries[indexFinder(primaryEntries, chain[1])].entries
    let subsubEntries = subEntries[indexFinder(subEntries, chain[2])].entries
    let self = subsubEntries[indexFinder(subsubEntries, id)]
    // toDelete ? markDeleted(self) : updateFields(self, newEntryValues)
    operation(self)
  }
  return treeObj
}

export const moveEntry = (
  dragData: any,
  workingObject: any,
  entry: any,
) => {
  let destinationId = dragData.currentDropId || dragData.currentDropPaneId
  let draggedEntryId = dragData.currentDraggingId
  let chain =
    dragData.currentDropChain === null
      ? dragData.currentDropPaneChain
      : dragData.currentDropChain
  let id =
    dragData.currentDropPaneId === null
      ? dragData.currentDropId
      : dragData.currentDropPaneId
  let pushEntry = findTreeEntry(workingObject, id, chain)
  pushEntry.entries.push(entry)
}

export const findTreeEntry = (
  treeObj: any,
  entryId: any,
  entryChain: any[]
) => {
  let entry
  let depth = entryChain.length
  // debugger
  if (entryChain[0] === undefined) {
    entry = treeObj
  } else if (depth === 1) {
    entry = treeObj.entries[indexFinder(treeObj.entries, entryId)]
  }
  if (depth === 2) {
    let parent = treeObj.entries[indexFinder(treeObj.entries, entryChain[1])]
    entry = parent.entries[indexFinder(parent.entries, entryId)]
  }
  if (depth === 3) {
    
    let gParent = treeObj.entries[indexFinder(treeObj.entries, entryChain[1])]
    let parent = gParent.entries[indexFinder(gParent.entries, entryChain[2])]
    entry = parent.entries[indexFinder(parent.entries, entryId)]
  }
  return entry
}

export const findTreeEntryParent = (
  treeObj: any,
  entryChain: any[]
) => {
  let parentEntry
  let depth = entryChain.length
  if (depth === 1) {
    parentEntry = treeObj
  }
  if (depth === 2) {
    let parent = treeObj.entries[indexFinder(treeObj.entries, entryChain[1])]
    parentEntry = parent
  }
  if (depth === 3) {
    let gParent = treeObj.entries[indexFinder(treeObj.entries, entryChain[1])]
    let parent = gParent.entries[indexFinder(gParent.entries, entryChain[2])]
    parentEntry = parent
  }
  return parentEntry
}

export const removeEntryFromArray = (entry: any, parentEntry: any) => {
  return parentEntry.entries.filter((item: any) => item.id !== entry.id)
}