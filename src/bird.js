const CONSTANTS = {
    GRAVITY: 0.5,
    FLAP_SPEED: -8,
    TERMINAL_VEL: 12,
    BIRD_WIDTH: 40,
    BIRD_HEIGHT: 30
};

export default class Bird {
    constructor (dimensions) {
        this.velocity = 0;
        this.dimensions = dimensions;
        this.position = {
            x: (this.dimensions.width / 3),
            y: (this.dimensions.height / 2)
        }   
    }

    drawbird (ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x, this.position.y, CONSTANTS.BIRD_WIDTH, CONSTANTS.BIRD_HEIGHT);
    }

    move() {
        this.position.y += this.velocity;
        // if (this.velocity > CONSTANTS.TERMINAL_VEL) 
        this.velocity += CONSTANTS.GRAVITY;
    }

    flap() {
        this.velocity = CONSTANTS.FLAP_SPEED;
    }

    animate (ctx) {
        this.move()
        this.drawbird(ctx)
    }

    getBounds () {
        return {
            left: this.position.x,
            right: this.position.x + CONSTANTS.BIRD_WIDTH,
            top: this.position.y,
            bottom: this.position.y + CONSTANTS.BIRD_HEIGHT
        };
    }

    outOfBounds () {
        const aboveTheTop = this.position.y < 0;
        const belowTheBottom = this.position.y + CONSTANTS.BIRD_HEIGHT > this.dimensions.height;
        return aboveTheTop || belowTheBottom;
    }
}