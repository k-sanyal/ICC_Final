class Scene6 {
  constructor(main) {
    this.main = main;

    this.img = null;

    this.revealLayer = null;
    this.brushRadius = 140;

    this.slowRevealCounter = 0;
    this.requiredSlowFrames = 120; // 2 seconds of slow movement before success

    this.targetFound = false;

    this.metaphorTyper = null;
    this.successTyper = null;

    this.nextButton = null;
    this.backButton = null;

    this.prevMouse = createVector(0, 0);
  }

  start() {
    loadImage("images/06.jpg", img => {
      this.img = img;
    });

    // reveal mask
    this.revealLayer = createGraphics(1000, 1000);
    this.revealLayer.pixelDensity(1);
    this.revealLayer.clear();

    this.metaphorTyper = new TextTyper(this.getMetaphorText(), 18);
    this.successTyper = new TextTyper(this.getSuccessText(), 20);

    this.nextButton = new UIButton(1300, 900, 110, 50, "Next");
    this.backButton = new UIButton(1180, 900, 110, 50, "Back");
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
    textAlign(LEFT, TOP);

    if (!this.targetFound) {
      textSize(20);
      text("Scene 6 — The Space Between Movements", 1020, 40);

      textSize(15);
      textLeading(22);
      this.metaphorTyper.update();
      this.metaphorTyper.draw(1020, 80, 520);
    } else {
      textSize(20);
      text("Revelation Through Stillness", 1020, 40);

      textSize(15);
      textLeading(22);
      this.successTyper.update();
      this.successTyper.draw(1020, 80, 520);
    }

    this.backButton.draw();
    this.nextButton.draw();

    pop();
  }

  drawArt() {
    if (!this.img) return;

    // dim image
    push();
    tint(255, 40);
    drawCenteredImage(this.img, 0, 0, 1000, 1000);
    pop();

    // update reveal mask according to mouse speed
    this.updateReveal();

    // apply reveal
    let revealed = this.img.get();
    revealed.mask(this.revealLayer);
    image(revealed, 0, 0, 1000, 1000);
  }

  updateReveal() {
    // mouse speed
    let speed = dist(mouseX, mouseY, this.prevMouse.x, this.prevMouse.y);
    this.prevMouse.set(mouseX, mouseY);

    let slow = speed < 2.2; // adjust threshold for sensitivity

    // reveal stronger when slow
    if (slow && mouseX < 1000) {
      this.slowRevealCounter++;

      this.revealLayer.noStroke();
      let g = this.revealLayer.drawingContext.createRadialGradient(
        mouseX, mouseY, 0,
        mouseX, mouseY, this.brushRadius
      );

      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(1, "rgba(255,255,255,0)");

      this.revealLayer.drawingContext.fillStyle = g;
      this.revealLayer.ellipse(mouseX, mouseY, this.brushRadius * 2);

    } else {
      this.slowRevealCounter = max(0, this.slowRevealCounter - 2);
    }

    // trigger success when enough slow movement happens
    if (!this.targetFound && this.slowRevealCounter > this.requiredSlowFrames) {
      this.targetFound = true;
    }
  }

  mousePressed() {
    if (this.backButton.isClicked()) {
      this.main.showScene("sketch5");
      return;
    }

    if (this.nextButton.isClicked()) {
      this.main.showScene("sketch7"); // next
      return;
    }
  }

  getMetaphorText() {
    return `
“Not everything reveals itself to force.
Some forms only appear
when you learn to move gently.

Slow your pace.
Let the image assemble itself
in the space between your movements.

What you see depends on how you approach it.”

“Revelation lives in quiet gestures,
not in hurried ones.”
    `;
  }

  getSuccessText() {
    return `
“Revelation lives in quiet gestures,
not in hurried ones.”`;
  }
}
