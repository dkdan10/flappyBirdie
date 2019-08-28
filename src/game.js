import Level from './level.js';
import Bird from './bird.js';

export default class FlappyBird {
  constructor(canvas){
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };

    this.highScore = 0;
    this.score = 0;
    // this.ctx.canvas.addEventListener("mousedown", this.click.bind(this))
    window.addEventListener("keydown", this.click.bind(this))
  }
  animate () {

    this.level.animate(this.ctx);
    this.bird.animate(this.ctx);
    if (this.gameOver()) {
      alert("You lost!")
      this.restart()
    }

    this.level.passedPipe(this.bird.getBounds(), () => {
      this.score += 1;
    });

    this.drawScore();
    if (this.running) {
      // gotta bind it the this context
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  restart () {
    this.running = false;
    this.level = new Level(this.dimensions);
    this.bird = new Bird(this.dimensions);
    if (this.score > this.highScore) this.highScore = this.score
    this.score = 0;

    this.animate();
  }

  play () {
    this.running = true;
    this.animate();
  }

  click (e) {
    if (!this.running ) {
      this.play();
    } else if (32 === e.keyCode) {
      this.bird.flap();
    }
  }

  gameOver() {
    return (
      this.level.collidesWith(this.bird.getBounds()) || this.bird.outOfBounds()
    );
  }

  drawScore() {
    //loc will be the location 
    const loc = { x: this.dimensions.width / 3, y: this.dimensions.height / 10 }
    this.ctx.font = "bold 40pt serif";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(`CS: ${this.score} HS: ${this.highScore}`, loc.x, loc.y);
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 2;
    this.ctx.strokeText(`CS: ${this.score} HS: ${this.highScore}`, loc.x, loc.y);

  }

}