var normalDog, happyDog, database, foodS, foodStock, dog

function preload()
{
  normalDog = loadImage("images/dogImg.png") 
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(500, 500);
  
  dog = createSprite(width/2, height/2, 10, 10);
  
  dog.addImage(normalDog); 

  dog.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  
  rectMode(CENTER);
  background(46, 139, 87);
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
    dog.scale = 0.2;
  }

  /*if(keyDown(UP_ARROW)){
    writeStock(-1);
  }*/

  //normalDog.display();
  //happyDog.display();

  drawSprites();
  
  textSize(25);
  fill(51);
  text("Food left: " +foodS, 100, 100);
}

function readStock(data){
  foodS = data.val()
}

function writeStock(x){
  if(x <= 0){
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref('/').update({
     Food : x
  })
}



