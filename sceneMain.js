class SceneMain {
  constructor() {
    this.scenes = {};
    this.current = null;
  }

  addScene(name, sceneObject) {
    this.scenes[name] = sceneObject;
  }

  showScene(name) {
    this.current = this.scenes[name];
    if (this.current.start) this.current.start();
  }

  draw() {
    if (this.current && this.current.draw) {
      this.current.draw();
    }
  }

  mousePressed() {
    if (this.current && this.current.mousePressed) {
      this.current.mousePressed();
    }
  }

  mouseMoved() {
    if (this.current && this.current.mouseMoved) {
      this.current.mouseMoved();
    }
  }

  mouseDragged() {
  if (this.current && this.current.mouseDragged) {
    this.current.mouseDragged();
  }
}

}

class TextTyper {
  constructor(text, speed) {
    this.text = text;
    this.speed = speed;
    this.index = 0;
    this.lastTime = 0;
  }

  update() {
    if (millis() - this.lastTime > this.speed && this.index < this.text.length) {
      this.index++;
      this.lastTime = millis();
    }
  }

  draw(x, y, w) {
    text(this.text.substring(0, this.index), x, y, w);
  }
}

class UIButton {
  constructor(x, y, w, h, label) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.label = label;
    this.hover = false;
  }

  draw() {
    // hover detection
    this.hover =
      mouseX > this.x &&
      mouseX < this.x + this.w &&
      mouseY > this.y &&
      mouseY < this.y + this.h;

    // style
    push();
    noStroke();
    fill(this.hover ? "#e0e0e0" : "#cfcfcf");
    rect(this.x, this.y, this.w, this.h, 10);

    fill("#222");
    textAlign(CENTER, CENTER);
    textSize(16);
    text(this.label, this.x + this.w / 2, this.y + this.h / 2);
    pop();
  }

  isClicked() {
    return this.hover;
  }
}


function drawCenteredImage(img, x, y, w, h) {
  let imgRatio = img.width / img.height;
  let boxRatio = w / h;

  let drawW, drawH;

  if (imgRatio > boxRatio) {
    drawW = w;
    drawH = w / imgRatio;
  } else {
    drawH = h;
    drawW = h * imgRatio;
  }

  let offsetX = x + (w - drawW) / 2;
  let offsetY = y + (h - drawH) / 2;

  image(img, offsetX, offsetY, drawW, drawH);
}
