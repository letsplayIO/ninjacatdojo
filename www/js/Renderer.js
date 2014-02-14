define(function () {
    function Renderer(screen, screenCtx) {
        this.screen = screen;
        this.screenCtx = screenCtx;
        this.screenWidth = screen.width;
        this.screenHeight = screen.height;
        this.renderObjects = {front: [], back: []};
    }

    Renderer.prototype.renderStartScreen = function () {
        this.screenCtx.font = 'italic 40pt Calibri';
        this.screenCtx.textAlign = 'center';
        this.screenCtx.baseline = 'middle';
        this.screenCtx.fillStyle = 'black';
        this.screenCtx.fillText('tap to start', this.screenWidth / 2, this.screenHeight / 2);
    };

    Renderer.prototype.clearScreen = function () {
        this.screenCtx.clearRect(0, 0, this.screenWidth, this.screenHeight);
    };

    Renderer.prototype.draw = function () {
        this.clearScreen();

        var self = this;
        var drawElement = function (elem) {
            self.screenCtx.beginPath();
            self.screenCtx.arc(elem.x, elem.y, 2, 0, 2 * Math.PI, false);
            self.screenCtx.fillStyle = 'black';
            self.screenCtx.fill();
        };

        this.renderObjects.back.forEach(drawElement);
        this.renderObjects.front.forEach(drawElement);
    };

    Renderer.prototype.addFront = function (elem) {
        this.renderObjects['front'].push(elem);
    };

    return Renderer;
});