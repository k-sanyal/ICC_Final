class EndScene {
  constructor(main) {
    this.main = main;
    this.buttonHover = false;

    this.typer = null;
    this.typerLeft = null;
    this.typerRight = null;

    this.showLeft = false;
    this.showRight = false;
  }

  start() {
    this.typer = new TextTyper(this.getEndText(), 22);
    this.typerLeft = new TextTyper(this.getLeftText(), 12);
    this.typerRight = new TextTyper(this.getRightText(), 12);
  }

  draw() {
    background(255);

    push();
    fill(0);
    textSize(10);
    textAlign(LEFT, TOP);
    text(this.leftNote, 30, 20);

    textAlign(RIGHT, TOP);
    text(this.rightNote, width - 30, 20);
    pop();

    // Title
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(42);
    text("The End", width/2, height/4);

    // Metaphorical text typed out
    textSize(22);
    textLeading(28);
    this.typer.update();
    this.typer.draw(width/2 - 400, height/2 + 100, 800);

    if (this.typer.index >= this.typer.text.length) {
      this.showLeft = true;
      this.showRight = true;
    }

    if (this.showLeft) {
      textAlign(LEFT, TOP);
      textSize(18);
      this.typerLeft.update();
      this.typerLeft.draw(40, 40, 400);
    }

    if (this.showRight) {
      textAlign(RIGHT, TOP);
      textSize(18);
      this.typerRight.update();
      this.typerRight.draw(width - 40 - 400, 40, 400);
    }

    textAlign(CENTER, BOTTOM);
    textSize(14);
    fill(240);
    text(
      "This interactive work and all images are used strictly for educational, non-commercial purposes.\nNo monetization, resale, or profit is associated with this project.",
      width/2,
      height - 20
    );
  }

  getEndText() {
    return `
Noma Bar, the artist whose illustrations guide this project,
works with silence as much as with shape.
In his world, a shadow might speak louder than a figure,
and empty space becomes its own form of truth.

was never only about the artwork.

It was about the act of looking,
the patience of revealing,
the tenderness of aligning what had fallen apart.

Thank you for completing this exploration.
    `;
  }

  getLeftText() {
    return `AAT2004`;
  }

  getRightText() {
    return `2025`;
  }
}
