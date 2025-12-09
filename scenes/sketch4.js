class Scene4 {
  constructor(main) {
    this.main = main;

    this.img = null;

    this.eye1 = { x: 315, y: 420, activated: false, timer: 0 };
    this.eye2 = { x: 695, y: 420, activated: false, timer: 0 };

    this.metaphorTyper = null;
    this.successTyper = null;

    this.nextButton = null;
    this.backButton = null;

    this.completed = false;
    this.delayTimer = 0;
  }

  start() {
    loadImage("images/04.jpg", img => {
      this.img = img;
    });

    this.metaphorTyper = new TextTyper(this.getMetaphorText(), 18);
    this.successTyper = new TextTyper(this.getSuccessText(), 20);

    this.nextButton = new UIButton(1300, 900, 100, 50, "Next");
    this.backButton = new UIButton(1180, 900, 100, 50, "Back");

    this.eye1.activated = false;
    this.eye2.activated = false;
    this.completed = false;
  }

  draw() {
    background(15);

    // LEFT PANEL
    push();
    fill(30);
    rect(0, 0, 1000, height);
    this.drawArt();
    pop();

    // RIGHT PANEL
    push();
    fill(240);
    rect(1000, 0, 600, height);

    fill(0);
    textSize(20);
    textAlign(LEFT, TOP);
    text("Scene 4 — The Gaze That Writes", 1020, 40);

    textSize(15);
    textLeading(22);
    this.metaphorTyper.update();
    this.metaphorTyper.draw(1020, 80, 520);

    if (this.completed) {
      this.successTyper.update();
      textSize(15);
      textLeading(22);
      
      let baseOffset = 80 + textAscent() + textDescent() + 300;  
      
      this.successTyper.draw(1020, baseOffset, 520);
    }

    this.backButton.draw();
    if (this.completed) this.nextButton.draw();

    pop();
  }

  drawArt() {
    if (!this.img) return;

    // background color
    push();
    fill(255, 216, 1);
    rect(0, 0, 1000, 1000);
    pop();

    // draw image centered
    drawCenteredImage(this.img, 0, 0, 1000, 1000);

    // eyes detection
    this.updateEye(this.eye1);
    this.updateEye(this.eye2);

    // circle highlight
    this.drawEyeHighlight(this.eye1);
    this.drawEyeHighlight(this.eye2);

    // check completion
    if (this.eye1.activated && this.eye2.activated) {
      if (!this.completed) {
        this.completed = true;
      }
    }
    if (this.delayTimer > 15000) {
      if (!this.completed) {
        this.completed = true;
      }
    }
  }

  updateEye(eye) {
    let d = dist(mouseX, mouseY, eye.x, eye.y);

    if (d < 60) {
      eye.timer += deltaTime;

      if (eye.timer > 700) {
        eye.activated = true;
      }
    } else {
      eye.timer = 0;
    }
  }

  drawEyeHighlight(eye, mirror = 1) {
    if (!eye.activated) return;

    let amp = 5;          // small movement range
    let speed = 0.02;     // slower motion
    let offset = sin(frameCount * speed) * amp * mirror * noise(frameCount * 0.01)

    push();
    fill(255);
    noStroke();
    ellipse(eye.x + offset, eye.y, 18, 18); // small white dot
    pop();
}



  mousePressed() {
    if (this.backButton.isClicked()) {
      this.main.showScene("sketch3");
      return;
    }

    if (this.completed && this.nextButton.isClicked()) {
      this.main.showScene("sketch5");
      return;
    }
  }

  getMetaphorText() {
    return `
“A face appears only when attention is given.

The EYES you look at are also looking back.
Perception is never a one-way act—
it is a meeting place, a quiet exchange.

Gaze gently at the illustration.
Let the eyes awaken through your patience.”

( inspired by Maurice Merleau-Ponty’s writings on perception )
    `;
  }

  getSuccessText() {
    return `
The gaze returns.

"What you attend to begins to attend to you.
To see is always, in some small way, to be seen.”
    `;
  }
}
