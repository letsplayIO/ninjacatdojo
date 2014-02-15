define(function () {
    function GameLoop(requestAnimationFrame, renderer, tickBus) {
        this.requestAnimationFrame = requestAnimationFrame;
        this.renderer = renderer;
        this.tickBus = tickBus;
        this.tickCount = 0;
    }

    GameLoop.prototype.run = function () {
        this.requestAnimationFrame(this.run.bind(this));

        this.tickCount++;
        if (this.tickCount % 60 == 0) {
            this.tickCount = 0;
            this.tickBus.forEach(function (fn) {
                fn();
            });
        }
        this.renderer.draw();
    };

    return GameLoop;
});