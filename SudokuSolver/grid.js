class Grid {
  
  constructor(){
    
this.gridObj = Array(9).fill().map(()=>Array(9).fill());

this.gridObj[0] = [7,0,0,0,1,0,3,0,6]
this.gridObj[1] = [0,0,0,0,0,0,0,5,0]
this.gridObj[2] = [1,0,6,7,0,3,0,0,0]
this.gridObj[3] = [0,0,0,0,0,0,0,4,0]
this.gridObj[4] = [0,8,0,0,0,0,0,7,0]
this.gridObj[5] = [0,5,0,6,0,9,0,0,0]
this.gridObj[6] = [3,0,0,0,0,0,0,1,5]
this.gridObj[7] = [5,0,0,0,7,0,9,2,0]
this.gridObj[8] = [4,0,0,0,0,5,0,0,3]
}

reportGrid(){
  this.gridSt = ""
  for(let i = 0; i < 9; i++){
    this.gridSt = this.gridSt.concat(this.gridObj[i].join(" ")+"\n")
  }
  console.log(this.gridSt)
}

solveGrid(){
this.gridObj[0] = [7,4,5,2,1,8,3,9,6]
this.gridObj[1] = [8,3,2,4,9,6,1,5,7]
this.gridObj[2] = [1,9,6,7,5,3,2,8,4]
this.gridObj[3] = [6,1,3,8,2,7,5,4,9]
this.gridObj[4] = [9,8,4,5,3,1,6,7,2]
this.gridObj[5] = [2,5,7,6,4,9,8,3,1]
this.gridObj[6] = [3,7,8,9,6,2,4,1,5]
this.gridObj[7] = [5,6,1,3,7,4,9,2,8]
this.gridObj[8] = [4,2,9,1,8,5,7,6,3]
}

/*Grabs the values of a 3x3 Sudoku box and puts it into an array. 
  First parameter is either the number of the box to grab, or a [row][col] value from which to find
  the box number. Second Parameter is a bool that signals whether the first value is already a 
  box number or not
  Box number is incremented to a 1-9 scheme to work with the following formulas
*/
getBox(boxNumberOrLocation, isBoxNumber){
  let boxNumber = null
  if(!isBoxNumber){
    boxNumber = this.getBoxNumber(boxNumberOrLocation)
  }else{
    boxNumber = boxNumberOrLocation
  }

  let currentBox = [0,0,0,0,0,0,0,0,0]
  boxNumber++
  let rowIndicator = Math.floor(boxNumber / 3) * 3
  let boxMod = boxNumber % 3
  

 
  let rows = this.getBoxRowsByRowIndicator(rowIndicator)
  let cols = this.getBoxColsByModulo(boxMod)

  let counter = 0
  let gridObj = this.gridObj
  rows.forEach(function(row)
  { 
     cols.forEach((col) => 
     {
       currentBox[counter] = gridObj[row][col];
       counter++
     })
    })
  return currentBox
}

/* Calculates the box number of the supplied grid location
*/
getBoxNumber(gridLocation){
  let rowIndicator = (Math.floor(gridLocation[0] / 3)) *10
  let colIndicator = Math.floor(gridLocation[1] / 3)
  let boxIndicator = rowIndicator + colIndicator
  
  switch(boxIndicator){
    case 0:
      return 0
      
    case 1:
      return 1
     
    case 2:
      return 2
     
    case 10:
      return 3;
     
    case 11:
      return 4
      
    case 12:
      return 5
      
    case 20:
      return 6
      
    case 21:
      return 7
     
    case 22:
      return 8
      
    default:
      console.log("gridLocation:"+gridLocation +"rowIndicator:"+rowIndicator +"colIndicator:" +colIndicator +"boxIndicator:"+boxIndicator)
      throw new Error ('Something went wrong in while calculating the box number')
  }
}

/*Determines which rows to grab based on a rowIndicator generated by the floored division of boxNumberOrSquareValue.

P.S. I know it wasn't really necessary to put this in its own function, I felt it just helps the 
readability of getBox()
*/
getBoxRowsByRowIndicator(rowIndicator){

  if ([0,1,2,3,4,5,6,7,8].includes(rowIndicator)){
  return [rowIndicator,rowIndicator+1,rowIndicator+2]
  }
  else{
    
    throw new Error('Box Row Multiplier was not 1-9')
  }
}

//Determines which columns to grab based on a modulo of boxNumberOrSquareValue
getBoxColsByModulo(boxMod){
  switch(boxMod){
    case 0:
    return [6,7,8]
    break;
    case 1:
    return [0,1,2]
    break;
    case 2:
    return [3,4,5]
    break;
    default:
    throw new Error(`Box Modulation Error`)
  }
}

getColByCoordinate(gridLocation){
  return this.gridObj.map(row=> row[gridLocation[1]])
}

getRowByCoordinate(gridLocation){
return this.gridObj[gridLocation[0]]
}

}

module.exports = Grid;