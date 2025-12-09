class Scene2 {
  constructor(main) {
    this.main = main;
    this.img = null;
    this.maskG = null;
    this.metaphorTyper = null;
    let spotlightOn = true;

    this.nextButton = null;
    this.backButton = null;
  }

  start() {
    // Load image once and prepare a fixed-size mask for the left panel (1000x1000)
    this.img = loadImage("images/02.jpg");
    this.maskG = createGraphics(1000, 1000);
    // ensure mask image pixel dimensions are straightforward for mask()
    this.maskG.pixelDensity(1);

    this.metaphorTyper = new TextTyper(this.getMetaphorText(), 18);

    this.nextButton = new UIButton(1300, 900, 100, 50, "Next");
    this.backButton = new UIButton(1180, 900, 100, 50, "Back");
  }

  draw() {
    background(15);

    // LEFT PANEL
    push();
    fill(30);
    rect(0, 0, 1000, height);
    this.drawArt();
    pop();

    // RIGHT PANEL (text)
    push();
    fill(240);
    rect(1000, 0, 600, height);

    fill(0);
    textSize(20);
    textAlign(LEFT, TOP);
    text("Scene 2 — The Unseen Faces", 1020, 40);

    textSize(15);
    this.metaphorTyper.update();
    this.metaphorTyper.draw(1020, 80, 520);

    this.backButton.draw();
    this.nextButton.draw();

    pop();
  }

  drawArt() {
    if (!this.img) return;

    // Draw base image to exactly the left 1000x1000 area
    drawCenteredImage(this.img, 0, 0, 1000, 1000);

    if (this.spotlightOn) {
      // Full image, no spotlight effect
      return;
    }

    // Dim base so spotlight is visible
    push();
    fill(0, 180);
    rect(0, 0, 1000, 1000);
    pop();

    // Create spotlight mask using a radial gradient when available
    this.maskG.clear();
    const ctx = this.maskG.drawingContext;
    if (ctx && typeof ctx.createRadialGradient === 'function') {
      // use proper alpha in rgba (0..1)
      const gx = mouseX;
      const gy = mouseY;
      const radius = 150;
      const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, radius);
      g.addColorStop(0, 'rgba(255,255,255,1)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(gx, gy, radius, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // fallback: draw concentric ellipses
      this.maskG.noStroke();
      const maxR = 150;
      for (let r = maxR; r >= 0; r -= 4) {
        const alpha = map(r, 0, maxR, 255, 0);
        this.maskG.fill(255, alpha);
        this.maskG.ellipse(mouseX, mouseY, r * 2);
      }
    }

    // Apply mask to a copy of the image and draw revealed area
    const revealed = this.img.get();
    const maskImg = this.maskG.get();
    revealed.mask(maskImg);
    image(revealed, 0, 0, 1000, 1000);
  }

  getMetaphorText() {
    return `
“Not every truth steps forward on its own.
Some stay quiet, like a moon behind a thin cloud,
waiting for the eye to soften before they are seen.”

Let the dimness lift.
What was overlooked begins to take shape,
not because it changed—
but because you allowed the light to shift.
    `;
  }

  mousePressed() {
    // toggle spotlight
    this.spotlightOn = !this.spotlightOn;

    if (this.backButton.isClicked()) {
      this.main.showScene("sketch1");
      return;
    }

    if (this.nextButton.isClicked()) {
      this.main.showScene("sketch3");
      return;
    }
  }
  
}
