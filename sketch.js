let main;
//let font;

function preload() {
  //font = loadFont("IBM-Regular.ttf");
}

function setup() {
  createCanvas(1440, 1000); // wide layout
  textFont("IBM Plex Sans");
  main = new SceneMain();

  main.addScene("intro", new IntroScene(main));
  main.addScene("inter", new InterScene(main));

  
  main.addScene("sketch1", new Scene1(main));
  main.addScene("sketch2", new Scene2(main));
  main.addScene("sketch3", new Scene3(main));
  main.addScene("sketch4", new Scene4(main));
  main.addScene("sketch5", new Scene5(main));
  main.addScene("sketch6", new Scene6(main));
  main.addScene("sketch7", new Scene7(main));
  main.addScene("sketch8", new Scene8(main));
  main.addScene("end", new EndScene(main));

  main.showScene("intro");
}

function draw() {
  main.draw();
}

function mousePressed() {
  main.mousePressed();
}

function mouseMoved() {
  main.mouseMoved();
}

function mouseDragged() {
  if (main && main.mouseDragged) main.mouseDragged();
}

function mouseWheel(e) {
  if (main && main.current && main.current.mouseWheel) {
    main.current.mouseWheel(e);
  }
}

function keyPressed() {
  if (main && main.current && main.current.keyPressed) {
    main.current.keyPressed();
  }
}
