class Scene5 {
  constructor(main) {
    this.main = main;

    this.img = null;
    this.zoom = 3.5;       // starting zoom-in
    this.minZoom = 1.0;    // full reveal
    this.targetReached = false;

    this.metaphorTyper = null;
    this.successTyper = null;

    this.nextButton = null;
    this.backButton = null;
  }

  start() {
    loadImage("images/05.jpg", img => {  // your filename
      this.img = img;
    });

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
    this.drawArtArea();
    pop();

    // RIGHT PANEL
    push();
    fill(240);
    rect(1000, 0, 600, height);
    fill(0);
    textAlign(LEFT, TOP);

    textSize(20);
    text("Scene 5 — The Expanding Frame", 1020, 40);

    // MAIN TEXT
    textSize(15);
    textLeading(22);
    this.metaphorTyper.update();
    this.metaphorTyper.draw(1020, 80, 520);

    // SUCCESS TEXT under the main text
    if (this.targetReached) {
      let offset = 80 + 350; // spacing under the main text
      this.successTyper.update();
      textSize(15);
      this.successTyper.draw(1020, offset, 520);
    }

    this.backButton.draw();
    if (this.targetReached) this.nextButton.draw();

    pop();
  }

  drawArtArea() {
    if (!this.img) return;

    push();
    fill(0, 163, 142);
    rect(0, 0, 1000, 1000);
    pop();
    push();
    translate(500, 500);
    scale(this.zoom);

    // Use your global helper
    drawCenteredImage(this.img, -600, -400, 1000, 1000);
    pop();

    // Check zoom threshold
    if (!this.targetReached && this.zoom <= this.minZoom + 0.05) {
      this.targetReached = true;
      this.zoom = this.minZoom;
    }
  }

  mouseWheel(event) {
    if (this.targetReached) return;

    let delta = event.deltaY;

    if (delta > 0) this.zoom *= 1.03;  // scroll down = zoom in slow
    else this.zoom *= 0.97;           // scroll up = zoom out slow

    // clamp
    this.zoom = constrain(this.zoom, this.minZoom, 5.5);
  }

  mousePressed() {
    if (this.backButton.isClicked()) {
      this.main.showScene("sketch4");
      return;
    }

    if (this.nextButton.isClicked() && this.targetReached) {
      this.main.showScene("sketch6");
      return;
    }
  }

  getMetaphorText() {
    return `
“We begin by believing the world is small.

At first glance, only one shape exists,
a single creature floating in an empty field.

But truth widens as we do.

Go outward.
Let your perspective expand.
Watch how the familiar becomes part of something larger—
not because it changed,
but because you allowed more of it to be seen.”

( inspired by Ursula K. Le Guin’s ideas on perception )
    `;
  }

  getSuccessText() {
    return `
Perspective expanded.

“The image was whole all along.
It was only your distance from it
that made it seem incomplete.”
    `;
  }
}
