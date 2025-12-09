class Scene7 {
  constructor(main) {
    this.main = main;

    this.bodyImg = null;
    this.pinImg = null;

    this.pin = { x: 200, y: 700, w: 307, h: 342 };  // pin size & start pos
    this.dragging = false;
    this.offsetX = 0;
    this.offsetY = 0;

    // where pin must be placed to win
    this.target = { x: 470, y: 510, radius: 30 };

    this.snapped = false;

    this.metaphor = null;
    this.success = null;

    this.nextButton = null;
    this.backButton = null;
  }

  start() {
    loadImage("images/07body.png", img => this.bodyImg = img);
    loadImage("images/07pin.png", img => this.pinImg = img);

    this.metaphor = new TextTyper(this.getMetaphor(), 18);
    this.success = new TextTyper(this.getSuccess(), 20);

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
    textSize(20);
    textAlign(LEFT, TOP);
    text("Scene 7 — Aligning the Self", 1020, 40);

    textSize(15);
    textLeading(22);

    this.metaphor.update();
    this.metaphor.draw(1020, 80, 520);

    if (this.snapped) {
      let offset = 80 + 350;
      this.success.update();
      textSize(15);
      this.success.draw(1020, offset, 520);
    
    }

    this.backButton.draw();
    if (this.snapped) this.nextButton.draw();

    pop();
  }

  drawArt() {
    if (!this.bodyImg || !this.pinImg) return;

    // BODY — centered properly
    drawCenteredImage(this.bodyImg, 0, 0, 1000, 1000);

    // PIN — overlay, draggable
    image(this.pinImg, this.pin.x, this.pin.y, this.pin.w, this.pin.h);

    // DEBUG: target point (remove later)
    // push(); fill("red"); noStroke(); ellipse(this.target.x, this.target.y, 10); pop();

    if (!this.snapped) {
      this.checkSnap();
    }
  }

  checkSnap() {
    let dx = this.pin.x + this.pin.w/2 - this.target.x;
    let dy = this.pin.y + this.pin.h/2 - this.target.y;

    let d = sqrt(dx*dx + dy*dy);

    if (d < this.target.radius) {
      this.snapped = true;

      // Auto place pin exactly in correct spot
      this.pin.x = this.target.x - this.pin.w/2;
      this.pin.y = this.target.y - this.pin.h/2;
    }
  }

  mousePressed() {
    if (mouseX > 1000) {
      if (this.backButton.isClicked()) this.main.showScene("sketch6");
      if (this.snapped && this.nextButton.isClicked()) this.main.showScene("sketch8");
      return;
    }

    // begin drag
    if (
      mouseX > this.pin.x &&
      mouseX < this.pin.x + this.pin.w &&
      mouseY > this.pin.y &&
      mouseY < this.pin.y + this.pin.h
    ) {
      this.dragging = true;
      this.offsetX = mouseX - this.pin.x;
      this.offsetY = mouseY - this.pin.y;
    }
  }

  mouseReleased() {
    this.dragging = false;
  }

  mouseDragged() {
    if (this.dragging && !this.snapped && mouseX < 1000) {
      this.pin.x = mouseX - this.offsetX;
      this.pin.y = mouseY - this.offsetY;
    }
  }

  getMetaphor() {
    return `
“To hold yourself together is a quiet act of strength.

Sometimes the world pulls pieces of you
just slightly out of place—
not enough to break you,
but enough to disorient your sense of self.

Drag the missing part back into alignment.
Balance returns
not through perfection,
but through intention.”`;
  }

  getSuccess() {
    return `
A woman’s body has never needed permission
to belong to her.

What needs correcting
is the world that still struggles
to understand that truth.”`;
  }
}
