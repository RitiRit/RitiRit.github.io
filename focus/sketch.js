let img; // Declare variable 'img'.
let imgs = [];

let imI = 0;
let playing = false;

var eWordsWant;
var eWordsWantText;
var eWordsWantTextElements = [];
window.onload = function(){
  eWordsWant = $("#wordsWant");
  eWordsWantText = eWordsWant.text();
  eWordsWantTextElements = $("#wordsWant").text().split(",").map(x => x.trim());
}

function constructWandWords(words, I){
  var $all = [];
  for(var i = 0; i<words.length; i++){

    var $item = (i == I) ? $("<u>") : $("<word>");
    $item.text(words[i]);
    //console.log($item.outerHTML());
    $all.push($item.get(0).outerHTML);
  }
  return $all.join(", ");
}

function setup() {
//   Ассоциации к Спокойствию :
//
// Ничего
// Лежать
// Без изменений
// Радость
// Свет
// Тишина
// Нет людей, Трава
// Небо
// Ровное дыхание
  var canvas = createCanvas(400, 300);

  // Move the canvas so it’s inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder');

  background(255, 255, 255);
  // source: https://www.psychologos.ru/articles/view/75053-zelanie-zvonkij-golos-nasego-tela

  //img = loadImage('assets/jin_300.jpg');

  imgs.push(loadImage('assets/nothing.png'));
  imgs.push(loadImage('assets/lie.jpg'));
  imgs.push(loadImage('assets/line.png'));
  imgs.push(loadImage('assets/happy.jpg'));
  imgs.push(loadImage('assets/shine.jpg'));
  imgs.push(loadImage('assets/sil.jpg'));
  imgs.push(loadImage('assets/grass.jpg'));
  imgs.push(loadImage('assets/sky.jpg'));
  imgs.push(loadImage('assets/breathCool.jpg'));

  img = imgs[0];
}

let ts=0;
let delta=800;
let scrlMin=0;
let scrlMax=5000;

let imX=0, imY=0;
function now(){
  return millis()
}

function draw() {
  if (!playing){
    //background(255,255,255);
  }
  if (playing){
    if (now() - delta > ts) {
      imI += 1;
      imI %= imgs.length;

      var words = constructWandWords(eWordsWantTextElements, imI);
      $("#wordsWant").html(words);
      ts = now();
      background(255,255,255);
      img = imgs[imI];
      imX = (400 - img.width)/2;
      imY = (300 - img.height)/2;
    }
    // put drawing code here
    //ellipse(100,100,50,50);

    image(img, imX, imY);
  }

  if (!playing || onButton())
  {
    if (onButton()){
      fill(color(255,0,0));
    } else {
      fill(color(255,255,255));
    }
    ellipse(200,150,50,50);

    fill(0,0,0);
    if (!playing){
      triangle(190,140,215,150,190,160);
    } else {
      rect(195-3,135,5,30);
      rect(205-3,135,5,30);
    }
  }

  drawScroll();
}

function onButton(){
  return dist(mouseX,mouseY,200,150) < 25;
}

function mousePressed(){
  if (onButton()){
    playing = !playing;
  }

  if (onScroll()){
    delta = map(mouseX,0,400,scrlMin, scrlMax);
    if (delta < 0)
      delta = 0;
  }
}

function drawScroll(){
  if ((mouseY >0) && (mouseY<50)){
    fill(200);
    rect(0,30,width,5);
    let scrlX = map(delta,scrlMin, scrlMax,0,400);
    scrlDraw(scrlX);
    scrlDraw(mouseX, false);
    fill(255);
    rect(40,55,130,20);
    fill(0);
    text("delta (ms): " + nf(delta,0,2), 50, 70);
  }
}

function onScroll(){
  return ((mouseY >0) && (mouseY<50));
}
function scrlDraw(x, real = true){
    if (real){
      fill(0);
      triangle(x-10,50,x,20,x+10,50);
    } else {
      fill(200);
      triangle(x-10,45,x,25,x+10,45);
    }
}

function boldWiT(){

}
//
// var cnv;
//
// function centerCanvas() {
//   var x = (windowWidth - width) / 2;
//   var y = (windowHeight - height) / 2;
//   cnv.position(x, y);
// }
//
// function setup() {
//   cnv = createCanvas(100, 100);
//   centerCanvas();
//   background(255, 0, 200);
// }
//
// function windowResized() {
//   centerCanvas();
// }
