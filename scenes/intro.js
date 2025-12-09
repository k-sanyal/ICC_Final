class IntroScene {
  constructor(main) {
    this.main = main;
    this.buttonHover = false;

    this.bgImgs = [];
    this.loaded = false;

    // How many images shown at once
    this.activeCount = 5;

    // Active images stored here
    this.active = [];

    // Image cycling control
    this.timer = 0;
    this.duration = 120; // 2 seconds per cycle
    this.index = 0; // which image to show next
  }

  start() {
    if (!this.loaded) {
      let names = [
        "bg1.png","bg2.png","bg3.jpg","bg4.jpg",
        "bg5.jpg","bg6.jpg","bg7.jpg","bg8.png"
      ];

      let loadCount = 0;
      names.forEach(name => {
        loadImage("images/intro/" + name, img => {
          this.bgImgs.push(img);

          if (++loadCount === names.length) {
            this.loaded = true;
            this.spawnInitialImages();
          }
        });
      });
    }
  }

  spawnInitialImages() {
    this.active = [];

    for (let i = 0; i < this.activeCount; i++) {
      this.spawnNextImage();
    }
  }

  spawnNextImage() {
    let img = this.bgImgs[this.index % this.bgImgs.length];
    this.index++;

    // scale control
    let scaleFactor = random(0.15, 0.30);

    this.active.push({
      img: img,
      x: random(50, width - 200),
      y: random(50, height - 200),
      w: img.width * scaleFactor,
      h: img.height * scaleFactor,
      alpha: 160
    });
  }

  updateCycle() {
    this.timer++;

    if (this.timer > this.duration) {
      this.timer = 0;

      // remove oldest image
      this.active.shift();

      // add next image in sequence
      this.spawnNextImage();
    }
  }

  drawImages() {
    push();
    for (let obj of this.active) {
      tint(255, obj.alpha);
      image(obj.img, obj.x, obj.y, obj.w, obj.h);
    }
    pop();
  }

  draw() {
    background(5);

    if (this.loaded) {
      this.updateCycle();
      this.drawImages();
    }

    // ===== TITLE =====
    fill(255);
    textSize(38);
    textAlign(CENTER);
    text("Interactive Duality",
         width / 2, height / 2 - 80);

    textSize(18);
    text("An experiment in dual imagery, metaphor, and participation.",
         width / 2, height / 2 - 20);

    // ===== BUTTON =====
    let bw = 200, bh = 60;
    let bx = width/2 - bw/2;
    let by = height/2 + 40;

    this.buttonHover =
      mouseX > bx && mouseX < bx + bw &&
      mouseY > by && mouseY < by + bh;

    fill(this.buttonHover ? 220 : 180);
    rect(bx, by, bw, bh, 10);

    fill(20);
    textSize(22);
    text("Begin", width / 2, by + 38);
  }

  mousePressed() {
    if (this.buttonHover) {
      this.main.showScene("inter");
    }
  }
}
