const height = 700
const width = 80*12
const capHeight = height*3/7
const capWidth = width/12
const pul = capHeight/5

let whitePulPositions = {
  1: 2, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0,
  7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 5,
  13: 0, 14: 0, 15: 0, 16: 0, 17: 3, 18: 0,
  19: 5, 20: 0, 21: 0, 22: 0, 23: 0, 24: 0,
}

let blackPulPositions = {
  1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 5,
  7: 0, 8: 3, 9: 0, 10: 0, 11: 0, 12: 0,
  13: 5, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0,
  19: 0, 20: 0, 21: 0, 22: 0, 23: 0, 24: 2,
}

let isWhiteTurn = true;

let possibleMoves = []

let dice = {
  1: {
    value: 0,
    used: 0
  },
  2: {
    value: 0,
    used: 0
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

  fill(255)
  square(capWidth*12.5 - 45/2 ,capHeight,45)
  square(capWidth*12.5 - 45/2 ,capHeight+50,45)

  textSize(30);
  fill(0);
  text(dice[1].value,capWidth*12.42,capHeight+65/2);
  fill(0);
  text(dice[2].value,capWidth*12.42,capHeight+65/2+50);


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
  let isPossible = possibleMoves.includes(cap)

  if(isPossible){
    if(blackPulPositions[cap+dice[1].value]==0 && dice[1].used==0){
      whitePulPositions[cap]-=1
      whitePulPositions[cap+dice[1].value]+=1
      dice[1].used = 1
    }else if(blackPulPositions[cap+dice[2].value]==0 && dice[2].used==0){
      whitePulPositions[cap]-=1
      whitePulPositions[cap+dice[2].value]+=1
      dice[2].used = 1
    }
  }

  // if(x<=capWidth && y <= capHeight){
  //   whitePulPositions[n]-=1
  //   whitePulPositions[n+1]++
  //   n++
  // }

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
        cap = 0
        break
    }
  }else{
    cap = 0
  }

  return cap
}

function calculatePossibleMoves(){
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
}
