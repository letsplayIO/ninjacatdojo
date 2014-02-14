define(function () {
    function GameLoop(requestAnimationFrame, renderer) {
        this.requestAnimationFrame = requestAnimationFrame;
        this.renderer = renderer;
    }

    GameLoop.prototype.run = function () {
        this.requestAnimationFrame(this.run.bind(this));

        this.renderer.draw();
    };

    return GameLoop;
});