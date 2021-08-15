class Backtracker {

  constructor(){
  this.grid;
  this.currentRowPossibilities = new Array()
  this.lastPossibilities = new Array();
  this.lastPossibility = [0]
  }
  

  solve(importedGrid){
  this.grid = importedGrid
  let currentSquare = [0,0]
  for(let counter = 0; counter < 9; counter++){
    this.generatePossibilities(currentSquare)
  }
  this.backtrack(currentSquare)
  return this.grid
  }

  backtrack(newSquare){
    let currentSquare = [newSquare[0],newSquare[1]]
    let valueWorks = false
    let currentValue = this.grid.gridObj
    let staticLength = this.currentRowPossibilities.length

      for (let currentPossibility = 0; currentPossibility < staticLength; currentPossibility++){
          console.log("Current applicable row values: " +this.currentRowPossibilities)
          if(this.grid.gridObj[currentSquare[0]][currentSquare[1]] != 0){
              currentSquare = this.incrementSquare(currentSquare)
              if (currentSquare[0] == 9){
                valueWorks = true
              }
              else{
              valueWorks = this.backtrack(currentSquare)
              }
            break
          }

          let value = this.currentRowPossibilities.pop()
          this.lastPossibility[0] = value
          this.lastPossibilities.push(value)
          
          if(this.isCurrentValueValid(value, currentSquare)){
            this.grid.gridObj[currentSquare[0]] [currentSquare[1]] = value
            currentSquare = this.incrementSquare(currentSquare)

            if (currentSquare[0] == 9){
              valueWorks = true
              break;
              }
            else{

              if(this.backtrack(currentSquare)){
                valueWorks = true
                break
                }
              else{
                currentSquare = this.decrementSquare(currentSquare)
                this.grid.gridObj[currentSquare[0]][currentSquare[1]] = 0
                this.currentRowPossibilities.splice(0,0,this.lastPossibilities.pop())
                
                }
              }
              
            }
            else{
              console.log("\n lastPossibilities before: "+this.lastPossibilities +"\n")
              console.log("\n currentPossibilities before: "+this.currentRowPossibilities +"\n")
              this.currentRowPossibilities.splice(0,0,this.lastPossibilities.pop())
              console.log("\n lastPossibilities after: "+this.lastPossibilities +"\n")
               console.log("\n currentPossibilities after: "+this.currentRowPossibilities +"\n")

            } if(this.currentRowPossibilities.length ==1){
              break
            }
          }
          return valueWorks;
        }
        
       
      
   
    
  

  generatePossibilities(currentSquare){
    if(currentSquare[0] != 9){
      this.currentRowPossibilities = [];
      let row = this.grid.gridObj[currentSquare[0]]
      for (let counter = 1; counter < 10; counter++){
        if (!row.includes(counter)){
          this.currentRowPossibilities.push(counter)
        }
      }
    }
}

  incrementSquare(currentSquare){
    if (currentSquare[1] == 8 ){
      currentSquare[0]++
      currentSquare[1] = 0
      this.generatePossibilities(currentSquare)
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
      this.currentRowPossibilities = this.lastPossibility
    }
    else{
      currentSquare[1]--
      
      this.currentRowPossibilities.splice(0,0,this.lastPossibilities.pop())
      
    }
  }

  /* It is assumed that the value is valid in the row due to the use of currentRowPossibilities

  */
  isCurrentValueValid(value,currentSquare){
    console.log("current coordinate: " +currentSquare)
    console.log ("current square: " +this.grid.gridObj[currentSquare[0]][currentSquare[1]])
    console.log("current value: "+value)
    let isValid = false
    let currentRow = this.grid.gridObj[currentSquare[0]]
    let currentCol = this.grid.getColByCoordinate(currentSquare)
   
    if(!currentRow.includes(value)){
      if(!currentCol.includes(value)){
        let currentBox = this.grid.getBox(currentSquare, false)
        console.log("box: "+currentBox)
        if(!currentBox.includes(value)){
          isValid = true
        }
      }
    }
    return isValid
  }

}

//module.exports = Backtracker;