const Grid = require('./grid.js')
const lodash = require('./lodash.js')
const Backtracker = require('./backtracker2.0.js')
const oneThroughNine = [1,2,3,4,5,6,7,8,9]

let grid = new Grid()
let backtracker = new Backtracker()
grid = backtracker.solve(grid)

console.log(isGridComplete())




function isGridComplete(){
  let gridIsComplete = isComplete(isRowComplete)
  
  if (gridIsComplete){
    gridIsComplete = isComplete(isColComplete)
   
    if(gridIsComplete){
      gridIsComplete = isComplete(isBoxComplete)
      if(gridIsComplete){
      }
    }
  }
  return gridIsComplete
}

function isComplete(functionToCheck){
  let allGood = true
  for(counter = 0; counter<9;counter++){
    if(!functionToCheck(counter)){
      allGood = false
      break
    }   
}
return allGood
}


function isRowComplete(rowNumber){
  let currentRow = grid.gridObj[rowNumber]
  return sortAndEquals(currentRow)
}

function isColComplete(colNumber){
  let currentCol = grid.gridObj.map(row=> row[colNumber])
  return sortAndEquals(currentCol)
}

function isBoxComplete(boxNumber){
  let currentBox = grid.gridObj.getBoxByBoxNumber(boxNumber)
  return sortAndEquals(currentBox)
}

//Copies the given array, sorts the copy numerically(ascending), and then sees if it is equal to a 1 through 9 array
function sortAndEquals(currentArray){
  temporaryArray = [...currentArray]
  temporaryArray.sort((num1,num2)=>num1-num2)
  return lodash.isEqual(temporaryArray, oneThroughNine)
}





function resetOneThroughNine(){
  oneThroughNine = [1,2,3,4,5,6,7,8,9]
}

