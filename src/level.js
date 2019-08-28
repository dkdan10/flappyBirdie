const CONSTANTS = {
  PIPE_SPEED: 2,
  PIPE_GAP: 150,
  PIPE_SPACE: 220,
  PIPE_WIDTH: 50,
  EDGE_BUFFER: 50,
  WARM_UP_SECONDS: 1
}

export default class Level {
  constructor(dimensions) {
    this.dimensions = dimensions;

    const firstPipe =
      this.dimensions.width +
      (CONSTANTS.WARM_UP_SECONDS * 60 * CONSTANTS.PIPE_SPEED);

    this.pipes = [
      this.makePipe(firstPipe),
      this.makePipe(firstPipe + CONSTANTS.PIPE_SPACE),
      this.makePipe(firstPipe + CONSTANTS.PIPE_SPACE * 2)
    ];
  }

  makePipe(x) {
    const height = this.dimensions.height - (2 * CONSTANTS.EDGE_BUFFER) - CONSTANTS.PIPE_GAP;
    const gap = (Math.random() * height) + CONSTANTS.EDGE_BUFFER;
    const pipe = {
      topPipe: {
        left: x,
        right: x + CONSTANTS.PIPE_WIDTH,
        top: 0,
        bottom: gap
      },
      bottomPipe: {
        left: x,
        right: x + CONSTANTS.PIPE_WIDTH,
        top: gap + CONSTANTS.PIPE_GAP,
        bottom: this.dimensions.height
      },
      passed: false
    };
    return pipe
  }


  animate(ctx) {
    this.drawBackground(ctx);
    this.movePipes();
    this.drawPipes(ctx);
  }

  drawBackground(ctx) {
    ctx.fillStyle = "skyblue";
    ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
  }

  movePipes() {
    this.pipes.forEach((pipe) => {
      pipe.topPipe.left -= CONSTANTS.PIPE_SPEED;
      pipe.topPipe.right -= CONSTANTS.PIPE_SPEED;
      pipe.bottomPipe.left -= CONSTANTS.PIPE_SPEED;
      pipe.bottomPipe.right -= CONSTANTS.PIPE_SPEED;
    })
    if (this.pipes[0].topPipe.right <= 0) {
      this.pipes.shift();
      const newX = this.pipes[1].topPipe.left + CONSTANTS.PIPE_SPACE;
      this.pipes.push(this.makePipe(newX));
    }
  }

  drawPipes(ctx) {
    this.pipes.forEach( (pipe) => {
      ctx.fillStyle = "green";
      ctx.fillRect(
        pipe.topPipe.left,
        pipe.topPipe.top,
        CONSTANTS.PIPE_WIDTH,
        pipe.topPipe.bottom - pipe.topPipe.top
      );
      ctx.fillRect(
        pipe.bottomPipe.left,
        pipe.bottomPipe.top,
        CONSTANTS.PIPE_WIDTH,
        pipe.bottomPipe.bottom - pipe.bottomPipe.top
      );
    });
  }

  collidesWith(birdBox) {
    const _isOverlapped = (rect1, rect2) => {
      if (rect1.left > rect2.right || rect1.right < rect2.left) {
        return false;
      }
      if (rect1.top > rect2.bottom || rect1.bottom < rect2.top) {
        return false;
      }
      return true;
    };
    let collision = false;
    this.pipes.forEach(pipe => {
      if (
        _isOverlapped(pipe.topPipe, birdBox) ||
        _isOverlapped(pipe.bottomPipe, birdBox)
        ) {
          collision = true;
        }
    });
    return collision
  }

  passedPipe(bird, callback) {
    this.pipes.forEach(pipe => {
      if (pipe.topPipe.right < bird.left) {
        if (!pipe.passed) {
          pipe.passed = true;
          callback();
        }
      }
    });
  }


}