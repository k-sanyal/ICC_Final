class InterScene {
  constructor(main) {
    this.main = main;
    this.buttonHover = false;

    this.typer = null;
    this.ready = false;

    this.nextButton = null;
  }

  start() {
    // Text block
    const msg = `
Every image holds two stories.

This interactive project is built from eight illustrations,
each carrying a dual meaning—visible and hidden.

Every scene asks you to participate:
to drag, align, reveal, rotate, or assemble what is unfinished.
The interaction is simple,
but the interpretation belongs entirely to you.

Move forward when you’re ready to begin.
    `;

    this.typer = new TextTyper(msg, 22);
    this.nextButton = new UIButton(width/2 - 80, height/2 + 280, 160, 55, "Go!");

    this.ready = true;
  }

  draw() {
    background(5);

    // ---------- CENTERED TEXT ----------
    if (this.ready) {
      fill(255);
      textAlign(CENTER, TOP);
      textSize(32);
      text("Before You Start", width/2, height/2 - 180);

      textSize(18);
      textLeading(26);

      this.typer.update();
      this.typer.draw(width/2 - 260, height/2 - 120, 520);
    }

    // ---------- BUTTON ----------
    this.nextButton.draw();
  }

  mousePressed() {
    if (this.nextButton.isClicked()) {
      this.main.showScene("sketch1");
    }
  }
}
