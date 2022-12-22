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
  console.log(`Trace: treeSearchAndUpdateInPlace()`)
  let depth = chain.length + 1

  if (depth === 1) {
    // primary category [ no ID ]
    console.log('primary')
    let self = treeObj
    self.title = newEntryValues.title
    self.subtitle = newEntryValues.subtitle
  } else if (depth === 2) {
    // subcategory - [top-level working obj ID, ]
    console.log('sub')
    let self = treeObj.entries[indexFinder(treeObj.entries, id)]
    self.title = newEntryValues.title
    self.subtitle = newEntryValues.subtitle
  } else if (depth === 3) {
    // subsubcategory - [top-level working obj ID, subCategoryId,]
    console.log('subsub')
    let primaryEntries = treeObj.entries
    let subEntries =
      primaryEntries[indexFinder(primaryEntries, chain[1])].entries
    let self = subEntries[indexFinder(subEntries, id)]
    self.title = newEntryValues.title
    self.subtitle = newEntryValues.subtitle
  } else if (depth === 4) {
    // subsubcategory - [top-level working obj ID, subCategoryId,]
    console.log('final')
    let primaryEntries = treeObj.entries
    let subEntries =
      primaryEntries[indexFinder(primaryEntries, chain[1])].entries
    let subsubEntries = subEntries[indexFinder(subEntries, chain[2])].entries
    let self = subsubEntries[indexFinder(subsubEntries, id)]
    self.title = newEntryValues.title
    self.subtitle = newEntryValues.subtitle
  }
  return treeObj
}
