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
  chain: number[],
  newEntryValues: any
): void => {
  // console.log(`Trace: indexFinder()`)
  let depth = chain.length + 1

  // subcategory - [top-level working obj iD, ]
  if (depth === 2) {
    let self = treeObj.entries[indexFinder(treeObj.entries, id)]
    self.title = newEntryValues.title
    self.subtitle = newEntryValues.subtitle
  // subsubcategory - [top-level working obj iD, subCategoryId,]
  } else if (depth === 3) {
    let topLevelObj = treeObj.entries
    let subCategory = topLevelObj[indexFinder(topLevelObj, chain[1])].entries
    subCategory = {
        ...subCategory,
        newEntryValues
    }
  }
  return treeObj
}
