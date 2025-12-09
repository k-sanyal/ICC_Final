class Scene8 {
  constructor(main) {
    this.main = main;

    // Images
    this.baseImg = null;
    this.midImg = null;
    this.topImg = null;

    // Drag pieces
    this.mid = { x: 240, y: 600, w: 140, h: 0, placed: false };
    this.top = { x: 720, y: 320, w: 130, h: 0, placed: false };

    this.dragging = null;
    this.offsetX = 0;
    this.offsetY = 0;

    // Snap targets (relative to left panel)
    this.midTarget = { x: 498, y: 380, radius: 30 };
    this.topTarget = { x: 498, y: 140, radius: 30 };

    this.metaphor = null;
    this.success = null;

    this.nextButton = null;
    this.backButton = null;
  }

  start() {
    // Load all images
    loadImage("images/08.png", img => this.baseImg = img);
    loadImage("images/08mid.png", img => {
      this.midImg = img;
      this.mid.h = (img.height / img.width) * this.mid.w;
    });
    loadImage("images/08top.png", img => {
      this.topImg = img;
      this.top.h = (img.height / img.width) * this.top.w;
    });

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

    text("Scene 8 — Restore the Vessel", 1020, 40);

    textSize(15);
    textLeading(22);

    if (!this.mid.placed || !this.top.placed) {
      this.metaphor.update();
      this.metaphor.draw(1020, 80, 520);
    } else {
      this.success.update();
      this.success.draw(1020, 80, 520);
    }

    this.backButton.draw();
    if (this.mid.placed && this.top.placed) this.nextButton.draw();

    pop();
  }

  drawArt() {
    if (!this.baseImg) return;

    // Background color
    push();
    fill(0, 35, 73);
    rect(0, 0, 1000, 1000);
    pop();

    // BASE IMAGE (centered and scaled properly)
    drawCenteredImage(this.baseImg, 0, 0, 1000, 1000);

    // TOP PIECE (draggable)
    if (this.topImg) {
      image(this.topImg, this.top.x, this.top.y, this.top.w, this.top.h);
      this.checkSnap(this.top, this.topTarget);
    }

    // MID PIECE (draggable)
    if (this.midImg) {
      image(this.midImg, this.mid.x, this.mid.y, this.mid.w, this.mid.h);
      this.checkSnap(this.mid, this.midTarget);
    }
  }

  checkSnap(piece, target) {
    if (piece.placed) return;

    let cx = piece.x + piece.w / 2;
    let cy = piece.y + piece.h / 2;

    let d = dist(cx, cy, target.x, target.y);

    if (d < target.radius) {
      piece.placed = true;
      piece.x = target.x - piece.w / 2;
      piece.y = target.y - piece.h / 2;
    }
  }

  mousePressed() {
    // Buttons
    if (this.backButton.isClicked()) {
      this.main.showScene("sketch7");
      return;
    }

    if (this.nextButton.isClicked() && this.mid.placed && this.top.placed) {
      this.main.showScene("end");
      return;
    }

    // Drag mid piece?
    if (!this.mid.placed &&
        mouseX > this.mid.x && mouseX < this.mid.x + this.mid.w &&
        mouseY > this.mid.y && mouseY < this.mid.y + this.mid.h) {
      this.dragging = "mid";
      this.offsetX = mouseX - this.mid.x;
      this.offsetY = mouseY - this.mid.y;
    }

    // Drag top piece?
    if (!this.top.placed &&
        mouseX > this.top.x && mouseX < this.top.x + this.top.w &&
        mouseY > this.top.y && mouseY < this.top.y + this.top.h) {
      this.dragging = "top";
      this.offsetX = mouseX - this.top.x;
      this.offsetY = mouseY - this.top.y;
    }
  }

  mouseDragged() {
    if (this.dragging === "mid" && !this.mid.placed) {
      this.mid.x = mouseX - this.offsetX;
      this.mid.y = mouseY - this.offsetY;
    }
    if (this.dragging === "top" && !this.top.placed) {
      this.top.x = mouseX - this.offsetX;
      this.top.y = mouseY - this.offsetY;
    }
  }

  mouseReleased() {
    this.dragging = null;
  }

  getMetaphor() {
    return `
“But now, O Lord, thou art our father;
we are the clay, and thou our potter;
and we all are the work of thy hand.”

( Isaiah 64:8 (KJV) )

Drag each piece back toward its purpose.
Reassemble what time has scattered.
Wholeness is not found — it is rebuilt.”`;
  }

  getSuccess() {
    return `
“Sometimes restoration is not about returning
to what once was,
but embracing what can be made anew.”

“And the vessel that he made of clay was marred…
so he made it again another vessel,
as seemed good to the potter to make it.”

( Jeremiah 18:4-6 (KJV) )
    `;
  }
}
