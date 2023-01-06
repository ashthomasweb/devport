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
  console.log(`Trace: treeSearchAndUpdateInPlace()`)
  let depth = chain.length + 1

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

  function addEntryToPacket(self: any) {
    console.log(self)
    self.entries.push(newEntry)
  }

  function removeEntryFromPacket(self: any) {
    self.entries = self.entries.filter(
      (entry: any) => entry.title !== newEntry.title
    )
  }

  let operation
  if (toDelete && newEntry === null) {
    operation = markDeleted
  } else if (codePacket !== null) {
    operation = updateCode
  } else if (newEntry !== null) {
    operation = addEntryToPacket
  } else if (newEntry !== null && toDelete === true) {
    operation = removeEntryFromPacket
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

export const moveEntry = (dragData: any, workingObject: any, entry: any) => {
  let destinationId = dragData.currentDropId || dragData.currentDropPaneId
  let draggedEntryId = dragData.currentDraggingId
  console.log(destinationId)
  console.log(entry)
  console.log(dragData)
  treeSearchAndUpdateInPlace(
    workingObject,
    dragData.currentDropId | dragData.currentDropPaneId,
    dragData.currentDropChain | dragData.currentDropPaneChain, // from drop id
    null,
    false,
    null,
    entry
  )
  // treeSearchAndUpdateInPlace(
  //   workingObject,
  //   dragData.currentDraggingId,
  //   entry.childOfChain, // from drop id
  //   null,
  //   true,
  //   null,
  //   entry
  // )
}
