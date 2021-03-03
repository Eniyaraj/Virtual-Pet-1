var dogImg, happyDogImg, dog;
var database;
var foodS, foodStock;
var canvas;
var lastFed, fedTime; 
var foodObj, feed, addFood, food1, foodCount;
var input; 
var milk, milkImg;

function preload() {
  dogImg = loadImage('Dog.png');
  happyDogImg = loadImage('happy dog.png');
  milkImg = loadImage('milk.png');
}

function setup() {
  database = firebase.database();

  dog = createSprite(650, 250);
  dog.scale = 0.3;
  dog.addImage(dogImg);

  milk = createSprite(565, 300);
  milk.addImage(milkImg);
  milk.scale = 0.1;
  milk.visible = false;
  milk.rotation = 55;
  
  food1 = new Food();
  food1.start();

  feed = createButton("Feed the Dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add food");
  addFood.position(8095);
  addFood.mousePressed(addFoods);

  canvas = createCanvas(800, 400);
}

function draw() {  
  background(46, 139, 87);
  food1.display();

  drawSprites();

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
  lastFed = data.val();
  });

  fill(255,255,254);
  if(fedTime >= 12) {
  text("Last Feed: " + fedTime % 12 + " PM", 350, 30);
  } else if(fedTime == 0){
  text("Last Feed: 12 AM", 350, 30);
  } else {
  text("Last Feed: " + fedTime + " AM", 350, 30);
  }
}

function feedDog() {
  dog.addImage(happyDogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food : foodObj.getFoodStock(),
    FeedTime : hour()
  });

  if(foodObj.getFoodStock()<= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  } else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
}

function addFoods() {
foodS++;
database.ref('/').update({
  Food : foods 
});
}