

class Backtracker {

  constructor(){
  this.grid;
  this.rowPossibilities = [[],[],[],[],[],[],[],[],[]]
  this.usedRowPossibilities = [[],[],[],[],[],[],[],[],[]]
  }
  

  solve(importedGrid){
  this.grid = importedGrid
  let currentSquare = [0,0]
  for (let currentRow = 0; currentRow <9;currentRow++){
    this.generatePossibilities(currentRow)
  }
  this.currentRowPossibilities = this.rowPossibilities[currentSquare[0]]
  this.currentUsedRowPossibilities = this.usedRowPossibilities[currentSquare[0]]
  this.backtrack(currentSquare)
  return this.grid
  } 

  backtrack(newSquare){
    let currentSquare = [newSquare[0],newSquare[1]]
    let valueWorks = false
    let currentValue = this.grid.gridObj[currentSquare[0]][currentSquare[1]]
    let staticLength = this.currentRowPossibilities.length

    if(currentValue != 0){
      valueWorks = this.accept(currentSquare,-1)
  }
  else{

      for (let currentPossibility = 0; currentPossibility < staticLength; currentPossibility++){
        console.log("\ncurrent coordinate: " +currentSquare)
        console.log("\nCurrent applicable row values: " +this.currentRowPossibilities)


        let possibleValue = this.currentRowPossibilities.pop()
        this.currentUsedRowPossibilities.push(possibleValue)

        if(this.isPossibleValueValid(possibleValue, currentSquare)){
          valueWorks = this.accept(currentSquare,possibleValue)
        }
        else{
          this.next();
        }   
      }
    
  }
  return valueWorks;
}    
  accept(currentSquare,possibleValue){
    let backtrackComplete = false
    currentSquare = this.incrementSquare(currentSquare)
    if(possibleValue > 0){
      this.grid.gridObj[currentSquare[0]] [currentSquare[1]-1] = possibleValue
    }
      if(currentSquare[0] == 9 || this.backtrack(currentSquare)){
        backtrackComplete = true
      }
      else if (possibleValue>0){
        this.reject(currentSquare)
        }
          
        
        return backtrackComplete
      }
  
    
    reject(currentSquare){
      
      this.decrementSquare(currentSquare)
      this.grid.gridObj[currentSquare[0]][currentSquare[1]-1] = 0
      this.next()
    }
      
   next(){
    if(this.currentUsedRowPossibilities.length>0){
    this.currentRowPossibilities.splice(0,0,this.currentUsedRowPossibilities.pop())
    }
   }
    
  

  generatePossibilities(rowNumber){
      let row = this.grid.gridObj[rowNumber]
      for (let counter = 1; counter < 10; counter++){
        if (!row.includes(counter)){
          this.rowPossibilities[rowNumber].push(counter)
        }
      }
    
}

  incrementSquare(currentSquare){
    if (currentSquare[1] == 8 ){
      currentSquare[0]++
      currentSquare[1] = 0
      this.rowChange(currentSquare[0])
    }
    else{
     
      currentSquare[1]++
      
    }
    return currentSquare;
  }

  decrementSquare(currentSquare){
    if (currentSquare[1] == 0){
      currentSquare[0]--
      currentSquare[1] = 8
      this.rowChange(currentSquare[0]-1)
    }
    else{
      currentSquare[1]--
    }
  }

  /* It is assumed that the possibleValue is valid in the row due to the use of currentRowPossibilities
  */
  isPossibleValueValid(possibleValue,currentSquare){
   
    let isValid = false
    let currentRow = this.grid.gridObj[currentSquare[0]]
    let currentCol = this.grid.getColByCoordinate(currentSquare)
   
    if(!currentRow.includes(possibleValue)){
      if(!currentCol.includes(possibleValue)){
        let currentBox = this.grid.getBox(currentSquare, false)
       
        if(!currentBox.includes(possibleValue)){
          isValid = true
        }
      }
    }
    return isValid
  }

 

  rowChange(currentSquare){
    this.currentRowPossibilities = this.rowPossibilities[currentSquare]
    this.currentUsedRowPossibilities = this.usedRowPossibilities[currentSquare]
  }

}

module.exports = Backtracker;