class Scene1 {
  constructor(main) {
    this.main = main;

    this.img = null;
    this.invertedImg = null;

    this.metaphorTyper = null;

    this.nextButton = null;
  }

  start() {
    // Load original
    loadImage("images/01.jpg", img => {
      this.img = img;

      // Create inverted version after image loads
      this.invertedImg = createGraphics(img.width, img.height);
      this.invertedImg.image(img, 0, 0);
      this.invertedImg.loadPixels();

      for (let i = 0; i < this.invertedImg.pixels.length; i += 4) {
        this.invertedImg.pixels[i]     = 255 - this.invertedImg.pixels[i];     // R
        this.invertedImg.pixels[i + 1] = 255 - this.invertedImg.pixels[i + 1]; // G
        this.invertedImg.pixels[i + 2] = 255 - this.invertedImg.pixels[i + 2]; // B
      }
      this.invertedImg.updatePixels();
    });

    // Right-panel text
    this.metaphorTyper = new TextTyper(this.getMetaphorText(), 18);

    // Create NEXT button
    this.nextButton = new UIButton(1300, 900, 110, 50, "Next");
  }

  draw() {
    background(15);

    // LEFT PANEL — interactive reveal
    push();
    fill(0);
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
    text("Scene 1 — The Silent Duality", 1020, 40);

    textSize(15);
    textLeading(22);
    this.metaphorTyper.update();
    this.metaphorTyper.draw(1020, 80, 520);

    // Draw NEXT button
    this.nextButton.draw();
    pop();
  }

  drawArtArea() {
    if (!this.img || !this.invertedImg) return;

    // Draw original centered
    drawCenteredImage(this.img, 0, 0, 1000, 1000);

    // How much is revealed?
    let revealWidth = constrain(mouseX, 0, 1000);

    if (revealWidth <= 1) return;

    // Extract the slice from inverted image
    let sliceW = map(revealWidth, 0, 1000, 0, this.img.width);
    let invertedSlice = this.invertedImg.get(0, 0, sliceW, this.img.height);

    // Draw slice, but centered
    push();
    let boxW = 1000;
    let boxH = 1000;

    // Compute centered position for inverted slice
    let imgRatio = this.img.width / this.img.height;
    let boxRatio = boxW / boxH;

    let drawW, drawH;
    if (imgRatio > boxRatio) {
      drawW = boxW;
      drawH = boxW / imgRatio;
    } else {
      drawH = boxH;
      drawW = boxH * imgRatio;
    }

    // But slice width must match reveal position
    let sliceMappedW = map(revealWidth, 0, 1000, 0, drawW);

    let offsetX = (1000 - drawW) / 2;
    let offsetY = (1000 - drawH) / 2;

    image(invertedSlice, offsetX, offsetY, sliceMappedW, drawH);

    pop();

    // Vertical divider line
    stroke(255, 100);
    let dividerX = revealWidth;
    line(dividerX, 0, dividerX, 1000);
  }

  mousePressed() {
    // Next button functionality
    if (this.nextButton.isClicked()) {
      this.main.showScene("sketch2");
    }
  }

  getMetaphorText() {
    return `
“Every picture is a negotiation between what we expect
and what it dares to reveal.”

As you draw the line across the image,
you’ll watch one narrative fade
and another rise to take its place.

The transformation is not violent—
it is subtle, inevitable,
like realizing the shape you followed
was not leading where you thought it would.

Where one story ends,
another quietly begins.
`;
  }
}
