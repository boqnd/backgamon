const height = 700
const width = 80*12
const capHeight = height*3/7
const capWidth = width/12
const pul = capHeight/5

// let whitePulPositions = {
//   1: 2, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0,
//   7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 5,
//   13: 0, 14: 0, 15: 0, 16: 0, 17: 3, 18: 0,
//   19: 5, 20: 0, 21: 0, 22: 0, 23: 0, 24: 0,
//   0: 0, 25: 0,
// }

// let blackPulPositions = {
//   1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 5,
//   7: 0, 8: 3, 9: 0, 10: 0, 11: 0, 12: 0,
//   13: 5, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0,
//   19: 0, 20: 0, 21: 0, 22: 0, 23: 0, 24: 2,
//   25: 0, 0: 0,
// }

let whitePulPositions = {
  1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0,
  7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0,
  13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0,
  19: 0, 20: 1, 21: 2, 22: 3, 23: 4, 24: 5,
  0: 0, 25: 0,
}

let blackPulPositions = {
  1: 5, 2: 4, 3: 3, 4: 2, 5: 1, 6: 0,
  7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0,
  13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0,
  19: 0, 20: 0, 21: 0, 22: 0, 23: 0, 24: 0,
  25: 0, 0: 0,
}

let lastState = whitePulPositions

let isWhiteTurn = true;

let possibleMoves = []

let dice = {
  1: {
    value: 0,
    used: 0,
    doublesUsedCounter: 0,
  },
  2: {
    value: 0,
    used: 0,
    doublesUsedCounter: 0,
  },
}

function setup() {
  createCanvas(width+capWidth, height)
  noLoop()
  throwDice()
}

function draw() {
  background(160,82,45)
  for(i = 0; i < 12; i++){
    if(i%2 == 0){
      fill(245,222,179)
    }else
      fill(128,0,0)
    triangle(i*capWidth, 0, (i+1)*capWidth, 0, 40+(i*capWidth), capHeight)
  } 

  for(i = 0; i < 12; i++){
    if(i%2 != 0){
      fill(245,222,179)
    }else
      fill(128,0,0)
    triangle(i*capWidth, height, (i+1)*capWidth, height, 40+(i*capWidth), height-capHeight)
  }

  line(capWidth*6,0,capWidth*6,height)
  line(capWidth*12,0,capWidth*12,height)

  fill(128,128,0)
  circle(width/2,height/2,pul)
  textSize(18);
  fill(0)
  text("undo",width/2-pul/3,height/2+pul/12);


  if(isWhiteTurn){
    fill(255)
  }else{
    fill(0)
  }
  square(capWidth*12.5 - 45/2 ,capHeight,45)
  square(capWidth*12.5 - 45/2 ,capHeight+50,45)

  textSize(30);

  if(!isWhiteTurn){
    fill(255)
  }else{
    fill(0)
  }
  text(dice[1].value,capWidth*12.42,capHeight+65/2);
  if(!isWhiteTurn){
    fill(255)
  }else{
    fill(0)
  }
  text(dice[2].value,capWidth*12.42,capHeight+65/2+50);


  if(whitePulPositions[0]!=0){
    fill(255)
    circle((capWidth/2)+12*capWidth,height-(pul/2),pul)
    fill(63,0,0)
    text(whitePulPositions[0],capWidth*12.42,height-pul/2.7);
  }

  if(blackPulPositions[25]!=0){
    fill(63,0,0)
    circle((capWidth/2)+12*capWidth,pul/2,pul)
    fill(255)
    text(blackPulPositions[25],capWidth*12.42,pul/1.5);
  }



  //http://93.123.116.130:4000

  for(i = 1; i <= 12; i++){
    for(w = 0; w < whitePulPositions[i]; w++){
      fill(255)
      circle((capWidth/2)+(i-1)*capWidth,pul/2+w*pul,pul)
    }
    for(b = 0; b < blackPulPositions[i]; b++){
      fill(63,0,0)
      circle((capWidth/2)+(i-1)*capWidth,pul/2+b*pul,pul)
    }
  }

  for(i = 24; i >= 13; i--){
    for(w = 0; w < whitePulPositions[i]; w++){
      fill(255)
      circle((capWidth/2)+((25-i)-1)*capWidth,height-(pul/2+w*pul),pul)
    }
    for(b = 0; b < blackPulPositions[i]; b++){
      fill(63,0,0)
      circle((capWidth/2)+((25-i)-1)*capWidth,height-(pul/2+b*pul),pul)
    }
  }
}

function mousePressed() {
  calculatePossibleMoves()
  let x = mouseX
  let y = mouseY
  let cap = capNumber(x,y)
  console.log(cap)

  let d = dist(x, y, width/2, height/2);

  if (d < pul/2) {
    undo()
  }else{
    if(isWhiteTurn){
      if(!(whitePulPositions[0]!=0 && cap != 0)){
        whitePlay(cap)
      }
    }else{
      if(!(blackPulPositions[25]!=0 && cap != 25)){
        blackPlay(cap)
      }
    }
  }

  if(dice[1].used == 1 && dice[2].used == 1){
    isWhiteTurn = !isWhiteTurn
    throwDice()
  }
  redraw()
}

function capNumber(x, y){

  let cap
  let capNumber = floor(x/capWidth + 1)
  let capSide = ceil(y/(height/2))

  if(capNumber > 0 && capNumber <= 12){
    switch(capSide){
      case 1:
        cap = capNumber
        break
      case 2:
        cap = 12 + (13 - capNumber)
        break
      default:
        cap = -1
        break
    }
  }else if(capNumber == 13){
    if(y >= capHeight && y <= height-capHeight){
      let helper = dice[1]

      dice[1] = dice[2]
      dice[2] = helper
      cap = -1
    }else if(y < capHeight/2){
      if(!isWhiteTurn){
        cap = 25
      }else{
        cap = -1
      }
    }else if(y > height - capHeight/2){
      if(isWhiteTurn){
        cap = 0
      }else{
        cap = -1
      }
    }else{
      cap = -1
    }
  }else{
    cap = -1
  }

  return cap
}

function calculatePossibleMoves(){
  possibleMoves = []

  if(isWhiteTurn){
    for(i = 1; i <= 24; i++){
      if(whitePulPositions[i] != 0){
        possibleMoves.push(i)
      }
    }
  }else{
    for(i = 1; i <= 24; i++){
      if(blackPulPositions[i] != 0){
        possibleMoves.push(i)
      }
    }
  }
}

function throwDice() {
  dice[1].value = floor(random(1,7))
  dice[2].value = floor(random(1,7))
  dice[1].used = 0
  dice[2].used = 0
  dice[1].doublesUsedCounter = 0
  dice[2].doublesUsedCounter = 0
}



function whitePlay(cap){
  let isPossible = possibleMoves.includes(cap)

  if(cap == 0 && whitePulPositions[0] > 0){
    isPossible = true
  }

  if(whitePulPositions[0] > 0 && (blackPulPositions[dice[1].value] > 1 || dice[1].used == 1)
    && (blackPulPositions[dice[2].value] > 1 || dice[2].used == 1)){
   isPossible = false
   dice[1].used = 1
   dice[2].used = 1
  }

  let allInHome = true

  for(i = 1; i <= 18; i ++){
    if(whitePulPositions[i] != 0){
      allInHome = false
    }
  }
  let range = 24

  if(allInHome){
    range = 25

    for(i = 19; i < 24; i++) {

      if(whitePulPositions[i] == 0){
        range += 1;
      }else{
        break
      }
    }
  }

  console.log("range " + range)
  console.log(blackPulPositions[cap+dice[1].value]==null)

  if(isPossible){
    if((blackPulPositions[cap+dice[1].value]==0 || blackPulPositions[cap+dice[1].value]==null) && dice[1].used==0 && cap+dice[1].value <= range){
      lastState = Object.assign({}, whitePulPositions)
      whitePulPositions[cap]-=1
      whitePulPositions[cap+dice[1].value]+=1
      if(isDoubles())
      {
        if(dice[1].doublesUsedCounter < 1){
          dice[1].doublesUsedCounter += 1
        }else{
          dice[1].doublesUsedCounter += 1
          dice[1].used = 1
        }
      }else{
        dice[1].used = 1
      }
    }else if(blackPulPositions[cap+dice[1].value]==1 && dice[1].used==0 && cap+dice[1].value <= range){
      lastState = Object.assign({}, whitePulPositions)
      whitePulPositions[cap]-=1
      whitePulPositions[cap+dice[1].value]+=1
      blackPulPositions[cap+dice[1].value]-=1
      blackPulPositions[25]+=1
      if(isDoubles())
      {
        if(dice[1].doublesUsedCounter < 1){
          dice[1].doublesUsedCounter += 1
        }else{
          dice[1].doublesUsedCounter += 1
          dice[1].used = 1
        }
      }else{
        dice[1].used = 1
      }
    }else if((blackPulPositions[cap+dice[2].value]==0 || blackPulPositions[cap+dice[2].value]==null) && dice[2].used==0 && cap+dice[2].value <= range){
      lastState = Object.assign({}, whitePulPositions)
      whitePulPositions[cap]-=1
      whitePulPositions[cap+dice[2].value]+=1
      if(isDoubles())
      {
        if(dice[2].doublesUsedCounter < 1){
          dice[2].doublesUsedCounter += 1
        }else{
          dice[2].doublesUsedCounter += 1
          dice[2].used = 1
        }
      }else{
        dice[2].used = 1
      }
    }else if(blackPulPositions[cap+dice[2].value]==1 && dice[2].used==0 && cap+dice[2].value <= range){
      lastState = Object.assign({}, whitePulPositions)
      whitePulPositions[cap]-=1
      whitePulPositions[cap+dice[2].value]+=1
      blackPulPositions[cap+dice[2].value]-=1
      blackPulPositions[25]+=1
      if(isDoubles())
      {
        if(dice[2].doublesUsedCounter < 1){
          dice[2].doublesUsedCounter += 1
        }else{
          dice[2].doublesUsedCounter += 1
          dice[2].used = 1
        }
      }else{
        dice[2].used = 1
      }
    }
  }
}

function blackPlay(cap){
  let isPossible = possibleMoves.includes(cap)

  if(cap == 25 && blackPulPositions[25] > 0){
    isPossible = true
  }

  if(blackPulPositions[25] > 0 && (whitePulPositions[25 - dice[1].value] > 1 || dice[1].used == 1)
    && (whitePulPositions[25 - dice[2].value] > 1 || dice[2].used == 1)){
   isPossible = false
   dice[1].used = 1
   dice[2].used = 1
  }

  let allInHome = true

  for(i = 7; i <= 24; i ++){
    if(blackPulPositions[i] != 0){
      allInHome = false
    }
  }

  let range = 1

  if(allInHome){
    range = 0

    for(i = 6; i > 1; i--) {

      if(blackPulPositions[i] == 0){
        range -= 1;
      }else{
        break
      }
    }
  }

  if(isPossible){
    if((whitePulPositions[cap+dice[1].value]==0 || whitePulPositions[cap+dice[1].value]==null) && dice[1].used==0 && cap-dice[1].value >= range){
      lastState = Object.assign({}, blackPulPositions)
      blackPulPositions[cap]-=1
      blackPulPositions[cap-dice[1].value]+=1
      if(isDoubles())
      {
        if(dice[1].doublesUsedCounter < 1){
          dice[1].doublesUsedCounter += 1
        }else{
          dice[1].doublesUsedCounter += 1
          dice[1].used = 1
        }
      }else{
        dice[1].used = 1
      }
    }else if(whitePulPositions[cap-dice[1].value]==1 && dice[1].used==0 && cap-dice[1].value >= range){
      lastState = Object.assign({}, blackPulPositions)
      blackPulPositions[cap]-=1
      blackPulPositions[cap-dice[1].value]+=1
      whitePulPositions[cap-dice[1].value]-=1
      whitePulPositions[0]+=1
      if(isDoubles())
      {
        if(dice[1].doublesUsedCounter < 1){
          dice[1].doublesUsedCounter += 1
        }else{
          dice[1].doublesUsedCounter += 1
          dice[1].used = 1
        }
      }else{
        dice[1].used = 1
      }
    }else if((whitePulPositions[cap+dice[2].value]==0 || whitePulPositions[cap+dice[2].value]==null) && dice[2].used==0 && cap-dice[2].value >= range){
      lastState = Object.assign({}, blackPulPositions)
      blackPulPositions[cap]-=1
      blackPulPositions[cap-dice[2].value]+=1
      if(isDoubles())
      {
        if(dice[2].doublesUsedCounter < 1){
          dice[2].doublesUsedCounter += 1
        }else{
          dice[2].doublesUsedCounter += 1
          dice[2].used = 1
        }
      }else{
        dice[2].used = 1
      }
    }else if(whitePulPositions[cap-dice[2].value]==1 && dice[2].used==0 && cap-dice[2].value >= range){
      lastState = Object.assign({}, blackPulPositions)
      blackPulPositions[cap]-=1
      blackPulPositions[cap-dice[2].value]+=1
      whitePulPositions[cap-dice[2].value]-=1
      whitePulPositions[0]+=1
      if(isDoubles())
      {
        if(dice[2].doublesUsedCounter < 1){
          dice[2].doublesUsedCounter += 1
        }else{
          dice[2].doublesUsedCounter += 1
          dice[2].used = 1
        }
      }else{
        dice[2].used = 1
      }
    }
  }
}

function undo(){
  if((dice[1].used == 1 && dice[2].used == 0)){
    if(isWhiteTurn)
    {
      whitePulPositions = lastState
    }else{
      blackPulPositions = lastState
    }
    dice[1].used = 0
  }else if(dice[1].used == 0 && dice[2].used == 1){
    if(isWhiteTurn)
    {
      whitePulPositions = lastState
    }else{
      blackPulPositions = lastState
    }
    dice[2].used = 0
  }else if(isDoubles() && dice[1].doublesUsedCounter + dice[2].doublesUsedCounter < 4 && 
            !(dice[1].used==1 && dice[2].used==1) && !(dice[1].doublesUsedCounter==0 && dice[2].doublesUsedCounter==0)){
    if(isWhiteTurn){
      whitePulPositions = lastState
    }else{
      blackPulPositions = lastState
    }
    if(dice[1].used == 1){
      dice[1].used=0
      dice[1].doublesUsedCounter = 1
    }else if(dice[2].used == 1){
      dice[2].used=0
      dice[2].doublesUsedCounter = 1
    }else{
      if(dice[1].doublesUsedCounter==1){
        dice[1].doublesUsedCounter = 0
      }else if(dice[2].doublesUsedCounter==1){
        dice[2].doublesUsedCounter = 0
      }
    }
  }
}

function isDoubles()
{
  if(dice[1].value == dice[2].value){
    return true
  }else{
    return false
  }
}