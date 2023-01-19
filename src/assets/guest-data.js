export const guestData = {
    "id": 9646332422301559000,
    "subtitle": "An example usecase of categories and methods",
    "title": "JavaScript",
    "childOfChain": [],
    "type": "category",
    "codePacket": [],
    "deletedAt": null,
    "entries": [
        {
            "subtitle": "sort(), filter(), map(), lookups etc ...",
            "deletedAt": null,
            "childOfChain": [
                9646332422301559000
            ],
            "type": "",
            "entries": [
                {
                    "title": "Array.sort() ",
                    "childOfChain": [
                        9646332422301559000,
                        2801051184395518000
                    ],
                    "deletedAt": null,
                    "type": "",
                    "id": 9566980822203648000,
                    "codePacket": [],
                    "subtitle": "Various implementations of typical usecases.",
                    "entries": [
                        {
                            "deletedAt": null,
                            "type": "",
                            "id": 2018437580030683100,
                            "codePacket": [
                                {
                                    "content": "function arraySortNumbers(array: (string|number)[], isDescending: boolean = false) {\r  function sortDirection(a: string | number, b: string | number) {\r    a = Number(a)\r    b = Number(b)\r    return isDescending ? b - a : a - b\r  }\r  return array.sort((a, b) => sortDirection(a, b))\r}\r\r\r\r\r",
                                    "title": "code.ts",
                                    "language": "typescript",
                                    "id": 2830070011822314500
                                }
                            ],
                            "subtitle": "Accepts an array of numbers and an optional argument to sort in descending order.",
                            "childOfChain": [
                                9646332422301559000,
                                2801051184395518000,
                                9566980822203648000
                            ],
                            "entries": [],
                            "title": "arraySortNumbers()"
                        }
                    ]
                },
                {
                    "deletedAt": null,
                    "id": 2200207125537814300,
                    "codePacket": [],
                    "subtitle": "",
                    "title": "Array.filter()",
                    "entries": [
                        {
                            "deletedAt": null,
                            "id": 5551219396578688000,
                            "codePacket": [],
                            "entries": [],
                            "subtitle": "Retrieve item from objectArray and modify it. ",
                            "type": "",
                            "title": "filterAndModify()",
                            "childOfChain": [
                                9646332422301559000,
                                2801051184395518000,
                                2200207125537814300
                            ]
                        }
                    ],
                    "type": "",
                    "childOfChain": [
                        9646332422301559000,
                        2801051184395518000
                    ]
                }
            ],
            "codePacket": [],
            "id": 2801051184395518000,
            "title": "Array Methods"
        },
        {
            "id": 3019783863761483000,
            "codePacket": [],
            "childOfChain": [
                9646332422301559000
            ],
            "title": "Object Methods",
            "type": "",
            "entries": [],
            "deletedAt": null,
            "subtitle": ".entries(), .keys(), lookups etc..."
        },
        {
            "entries": [
                {
                    "codePacket": [],
                    "title": "Lookup methods",
                    "deletedAt": null,
                    "id": 1490039705958834400,
                    "entries": [
                        {
                            "title": "searchObjArrayByKeyValue()",
                            "childOfChain": [
                                9646332422301559000,
                                3581281819075461600,
                                1490039705958834400
                            ],
                            "subtitle": "Pass a key and value to function, returns array of matching items.",
                            "codePacket": [
                                {
                                    "language": "typescript",
                                    "content": "/* Returns referential array of all matching objects from passed in params */\r\nfunction searchObjectArrayByKeyValue(array: any[], key: string, value: any) {\r\n  return array.filter((entry: any) => entry[key] === value)\r\n}\r\n ",
                                    "id": 7830613763537022000,
                                    "title": "code.ts"
                                }
                            ],
                            "id": 7931068929407378000,
                            "entries": [],
                            "deletedAt": null,
                            "type": ""
                        },
                        {
                            "childOfChain": [
                                9646332422301559000,
                                3581281819075461600,
                                1490039705958834400
                            ],
                            "codePacket": [
                                {
                                    "title": "code.ts",
                                    "id": 984713026264565400,
                                    "language": "typescript",
                                    "content": "/* Updates original array with new value in all object's with matching keys */\rfunction updateAllObjectValuesByKeyMatch(array: any[], key: string, newValue: any) {\r  let sortedItems = array.filter((entry: any) => entry[key])\r  sortedItems.map((item: any) => item[key] = newValue(37))\r} "
                                }
                            ],
                            "type": "",
                            "title": "updateAllObjectValuesByKeyMatch()",
                            "deletedAt": null,
                            "id": 1973566165566611500,
                            "subtitle": "@params { array, key, newValue }\n\nUpdates original ObjArray in place.",
                            "entries": []
                        },
                        {
                            "id": 9068995683023180000,
                            "title": "updateAllObjectKeysByKeyMatch()",
                            "type": "",
                            "deletedAt": null,
                            "codePacket": [
                                {
                                    "language": "typescript",
                                    "id": 3730491920853438000,
                                    "title": "code.ts",
                                    "content": "/* Updates original array with new key in all object's with matching keys */\rfunction updateAllObjectKeysByKeyMatch(array: any[], oldKey: string, newKey: any) {\r  let sortedItems = array.filter((entry: any) => entry[key])\r  sortedItems.map((item: any) => {\r    Object.defineProperty(item, newKey, Object.getOwnPropertyDescriptor(item, oldKey))\r    delete item[oldKey]\r  })\r}  "
                                }
                            ],
                            "childOfChain": [
                                9646332422301559000,
                                3581281819075461600,
                                1490039705958834400
                            ],
                            "entries": [],
                            "subtitle": "@params { array, key, newKey }\n\nUpdates original ObjArray key match with new key."
                        },
                        {
                            "deletedAt": null,
                            "id": 3815064892222393000,
                            "childOfChain": [
                                9646332422301559000,
                                3581281819075461600,
                                1490039705958834400
                            ],
                            "subtitle": "@params {array, value, newValue}\n\nUpdates original ObjArray value match with new value. Optional partial match.",
                            "type": "",
                            "codePacket": [
                                {
                                    "id": 9471230541614006000,
                                    "language": "typescript",
                                    "title": "code.ts",
                                    "content": "/* Updates original array with new value in all object's with matching value */\r/* Optional parameter allows for partial matching of value */\rfunction updateAllObjectValuesByValueMatch(\rarray: any[], \rvalue: any, \rnewValue: any, \rallowPartialMatch: boolean = false\r) {\r  let sortedItems = []\r  array.forEach((item:any) => {\r  \tString(Object.values(item)).includes(value) && sortedItems.push(item)\r  })\r  sortedItems.forEach((entry: any) => {\r    for(const key in entry) {\r     if (allowPartialMatch) {\r       String(entry[key]).includes(value) && (entry[key] = newValue)\r     } else {\r     \t entry[key] === value && (entry[key] = newValue)\r     }\r    }\r  })\r} "
                                }
                            ],
                            "entries": [],
                            "title": "updateAllObjectValuesByValueMatch()"
                        },
                        {
                            "childOfChain": [
                                9646332422301559000,
                                3581281819075461600,
                                1490039705958834400
                            ],
                            "codePacket": [
                                {
                                    "content": "function returnChangesInArraysById(oldArray: any[], newArray: any[]) {\r\r  function searchObjectArrayByKeyValue(array: any[], key: string, value: any) {\r    return array.filter((entry: any) => entry[key] === value)\r  }\r\r  let result = []\r  oldArray.forEach((entry: any) => {\r    let match = searchObjectArrayByKeyValue(newArray, \"id\", entry.id)[0]\r    for (const key in match) {\r      if (entry[key] !== match[key]) {\r    /*     console.log(`\\n New Diff Match:`)\r        console.log(entry)\r        console.log(match) */\r      }\r    }\r    if (match === undefined) {\r      /* console.log(`\\n New Delete`)\r      console.log(entry) */\r    }\r    result.push(searchObjectArrayByKeyValue(newArray, \"id\", entry.id))\r  })\r  newArray.forEach((entry: any) => {\r      let match = searchObjectArrayByKeyValue(oldArray, \"id\", entry.id)[0]\r      if (match === undefined) {\r        /* console.log(`\\n New Added Item`)\r        console.log(entry) */\r      }\r    })\r\r    console.log(result)\r    return result\r  }  ",
                                    "title": "code.ts",
                                    "id": 4305324788522582000,
                                    "language": "typescript"
                                }
                            ],
                            "subtitle": "@params {oldArray, newArray}\nonly works with shallow comparisons - suggest addition of lodash.isEqual()\n",
                            "title": "returnChangesInArrays()",
                            "type": "",
                            "entries": [],
                            "deletedAt": null,
                            "id": 5075737889564859000
                        }
                    ],
                    "childOfChain": [
                        9646332422301559000,
                        3581281819075461600
                    ],
                    "type": "",
                    "subtitle": "Find and return entries"
                }
            ],
            "childOfChain": [
                9646332422301559000
            ],
            "deletedAt": null,
            "codePacket": [],
            "type": "",
            "subtitle": "Specific to [{key: value}, {pair: here}] structures",
            "title": "Object-Array Methods",
            "id": 3581281819075461600
        },
        {
            "title": "Nested Methods",
            "subtitle": "Tree lookups, recursion, deep-searching",
            "deletedAt": null,
            "id": 4015066227848363000,
            "codePacket": [],
            "type": "",
            "childOfChain": [
                9646332422301559000
            ],
            "entries": []
        },
        {
            "title": "String Methods",
            "entries": [],
            "codePacket": [],
            "subtitle": "indexOf(), substring(), replace() etc...",
            "childOfChain": [
                9646332422301559000
            ],
            "id": 2210009159384889000,
            "deletedAt": null,
            "type": ""
        },
        {
            "deletedAt": null,
            "subtitle": "Re-useable generalized functions",
            "codePacket": [],
            "title": "Atomic Functions",
            "id": 2014764177398911200,
            "entries": [
                {
                    "deletedAt": null,
                    "id": 6752667801470880000,
                    "codePacket": [],
                    "entries": [
                        {
                            "subtitle": "returns a random number up to passed value",
                            "type": "",
                            "title": "randomNumUpTo()",
                            "codePacket": [
                                {
                                    "id": 8408508418625970000,
                                    "title": "code.ts",
                                    "language": "typescript",
                                    "content": "\r\rfunction randomNumUpTo(highestValue: string | number, excludeZero: boolean = false): number {\r    if (excludeZero) {\r        return Math.ceil(Math.random() * highestValue)\r    } else {\r        return Math.floor(Math.random() * (highestValue + 1))\r    }\r}\r\r"
                                },
                                {
                                    "id": 5312227755663370000,
                                    "title": "implementation.js",
                                    "content": "",
                                    "language": "javascript"
                                }
                            ],
                            "childOfChain": [
                                9646332422301559000,
                                2014764177398911200,
                                6752667801470880000
                            ],
                            "entries": [],
                            "id": 5862781718730064000,
                            "deletedAt": null
                        },
                        {
                            "title": "uidGenerator50Max()",
                            "deletedAt": null,
                            "id": 6446192295479749000,
                            "type": "",
                            "codePacket": [
                                {
                                    "language": "typescript",
                                    "id": 1739500420808992500,
                                    "title": "code.ts",
                                    "content": "function uidGenerator50Max(idLength: number = 20, forceString: boolean = false): string | number {\r\n  let concatString: string = ''\r\n  for (let i = 0; i < 4; i++) {\r\n    concatString = concatString + String(Math.ceil(Math.random() * 10e18))\r\n  }\r\n  concatString = concatString.replaceAll('0', '')\r\n  let tempId = concatString.split('')\r\n  tempId.forEach((entry: string, index: number) => {\r\n    if (entry === tempId[index - 1]) {\r\n      tempId[index] = '0'\r\n    }\r\n  })\r\n  concatString = tempId.join().replaceAll(',', '')\r\n  if (idLength < 18 && !forceString) {\r\n    return Number(concatString.substring(0, idLength))\r\n  } else {\r\n    return concatString.substring(0, idLength)\r\n  }\r\n} "
                                }
                            ],
                            "subtitle": "Accepts length and optional forceString argument. If output is greater than 18 characters, a string must be used. ",
                            "entries": [],
                            "childOfChain": [
                                9646332422301559000,
                                2014764177398911200,
                                6752667801470880000
                            ]
                        }
                    ],
                    "type": "",
                    "subtitle": "idGenerator(), randomNum(), etc ...",
                    "title": "Generators",
                    "childOfChain": [
                        9646332422301559000,
                        2014764177398911200
                    ]
                },
                {
                    "type": "",
                    "title": "Finders",
                    "childOfChain": [
                        9646332422301559000,
                        2014764177398911200
                    ],
                    "entries": [
                        {
                            "title": "indexFinder()",
                            "childOfChain": [
                                9646332422301559000,
                                2014764177398911200,
                                8161520219493750000
                            ],
                            "id": 6149842914036690000,
                            "codePacket": [
                                {
                                    "language": "javascript",
                                    "content": "// normalizes string and number types \r\nexport const indexFinder = (parentArray: any[], objUID: string | number | null) : number => {\r\n    // console.log(`Trace: indexFinder()`)\r\n    let childIndex: number\r\n    parentArray.forEach((objItem) => {\r\n        Number(objItem.id) === Number(objUID) && (childIndex = parentArray.indexOf(objItem))\r\n    })\r\n    return childIndex\r\n}\r\n",
                                    "title": "code.js",
                                    "id": 3646006997880260000
                                },
                                {
                                    "title": "implementation.js",
                                    "id": 2184770957482853400,
                                    "content": "\rlet array = [\r    {\r        id: 1,\r        value: 'here'\r    },\r    {\r        id: 2,\r        value: 'there'\r    }\r]\r\rarray[indexFinder(array, passedUID)] // will return object with passed id\r\r\r",
                                    "language": "javascript"
                                }
                            ],
                            "deletedAt": null,
                            "type": "",
                            "entries": [],
                            "subtitle": "Accepts an array and an id, returns the index of passed in item."
                        }
                    ],
                    "codePacket": [],
                    "id": 8161520219493750000,
                    "subtitle": "indexFinder(), findByValue(), etc ...",
                    "deletedAt": null
                }
            ],
            "childOfChain": [
                9646332422301559000
            ],
            "type": ""
        },
        {
            "id": 5695528360396545000,
            "entries": [],
            "subtitle": "Factory Methods, Couplers, Software Interface ...",
            "childOfChain": [
                9646332422301559000
            ],
            "type": "",
            "deletedAt": null,
            "title": "Software Patterns",
            "codePacket": []
        }
    ]
}