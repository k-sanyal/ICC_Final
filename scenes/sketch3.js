class Scene3 {
  constructor(main) {
    this.main = main;

    this.img = null;
    this.angle = 160; // starting rotation
    this.targetFound = false;

    this.metaphorTyper = null;
    this.successTyper = null;

    this.nextButton = null;
    this.backButton = null;

  }

  start() {
    // load image
    loadImage("images/03.png", img => {
      this.img = img;
    });

    this.metaphorTyper = new TextTyper(this.getMetaphorText(), 18);
    this.successTyper = new TextTyper(this.getSuccessText(), 20);

    this.nextButton = new UIButton(1300, 900, 100, 50, "Next");
    this.backButton = new UIButton(1180, 900, 100, 50, "Back");

  }

  draw() {
    background(15);

    // LEFT PANEL
    push();
    fill(30);
    rect(0, 0, 1000, height);
    this.drawArtArea();
    pop();

    // RIGHT PANEL
    push();
    fill(240);
    rect(1000, 0, 600, height);

    fill(0);
    textSize(20);
    textAlign(LEFT, TOP);
    text("Scene 3 — The Angle of Recognition", 1020, 40);

    textSize(15);
    textLeading(22);
    this.metaphorTyper.update();
    this.metaphorTyper.draw(1020, 80, 520);


    // If solved → show success text BELOW metaphor
    if (this.targetFound) {
      this.successTyper.update();
      textSize(15);
      textLeading(22);

      // Measure metaphor height:
      let baseOffset = 80 + textAscent() + textDescent() + 300;  
      // Adjust 300 to fit nice spacing if needed

      this.successTyper.draw(1020, baseOffset, 520);
    }

    this.backButton.draw();
    if (this.targetFound) this.nextButton.draw();

    pop();
  }

  drawArtArea() {
    if (!this.img) return;

    if (!this.targetFound) {
      cursor('grab');    // draggable icon
    } else {
      cursor('default');
    }

    push();
    fill(105, 70, 48);
    rect(0, 0, 1000, 1000);
    pop();

    push();
    translate(500, 500); // center of 1000x1000 panel
    rotate(radians(this.angle));
    drawCenteredImage(this.img, -500, -500, 1000, 1000);
    pop();

    // Check if angle close enough to correct rotation
    if (!this.targetFound && abs(this.angle % 360) < 6) {
      this.targetFound = true;
      this.angle = 0;
    }
  }

  mouseDragged() {
    cursor('grabbing');

    if (mouseX < 1000 && !this.targetFound) {
      let delta = movedX * 0.055;
      this.angle += delta;
    }
  }

  getMetaphorText() {
    return `
“At first glance, things rarely resemble what they truly are.

Sometimes clarity is not an act of seeing,
but an act of aligning ourselves with the world.

Rotate the image.
Shift your perspective.
Notice how meaning clicks into place
only when you meet it at the right angle.”

( inspired by John Berger’s “Ways of Seeing” )
    `;
  }

  getSuccessText() {
    return `
Perspective found.

“When the world finally faces you the right way,
it’s not the image that changed—
it’s you.”
    `;
  }

  mousePressed() {
  // BACK
  if (this.backButton.isClicked()) {
    this.main.showScene("sketch2");
    return;
  }

  // NEXT
  if (this.nextButton.isClicked() && this.targetFound) {
    this.main.showScene("sketch4"); // or whatever next
    return;
  }

  // toggle spotlight etc...
  if (mouseX < 1000 && !this.targetFound) {
    // you can keep your rotate toggle logic
  }
}
}
