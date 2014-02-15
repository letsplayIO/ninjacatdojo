define(function () {
    function Renderer(screen, screenCtx) {
        this.screen = screen;
        this.screenCtx = screenCtx;
        this.screenWidth = screen.width;
        this.screenHeight = screen.height;
        this.players = [];
        this.targets = {};
        this.pause = false;
    }

    Renderer.prototype.resize = function (width, height) {
        this.screen.width = width;
        this.screen.height = height;
        this.screenWidth = width;
        this.screenHeight = height;
    };

    Renderer.prototype.showStartScreen = function () {
        this.screenCtx.font = 'italic 40pt Calibri';
        this.screenCtx.textAlign = 'center';
        this.screenCtx.baseline = 'middle';
        this.screenCtx.fillStyle = 'black';
        this.screenCtx.fillText('tap to start', this.screenWidth / 2, this.screenHeight / 2);
    };

    Renderer.prototype.showEndScreen = function () {
        this.screenCtx.font = 'italic 40pt Calibri';
        this.screenCtx.textAlign = 'center';
        this.screenCtx.baseline = 'middle';
        this.screenCtx.fillStyle = 'black';
        var txt = "the end! ";
        this.players.forEach(function (player) {
            txt += player.name + ": " + player.score + " ";
        });
        this.screenCtx.fillText(txt, this.screenWidth / 2, this.screenHeight / 2);
    };

    Renderer.prototype.showNextSceneScreen = function () {
        this.screenCtx.font = 'italic 40pt Calibri';
        this.screenCtx.textAlign = 'center';
        this.screenCtx.baseline = 'middle';
        this.screenCtx.fillStyle = 'black';
        this.screenCtx.fillText('new scene animation', this.screenWidth / 2, this.screenHeight / 2);
    };

    Renderer.prototype.showNextWaveScreen = function () {
        this.screenCtx.font = 'italic 40pt Calibri';
        this.screenCtx.textAlign = 'center';
        this.screenCtx.baseline = 'middle';
        this.screenCtx.fillStyle = 'black';
        this.screenCtx.fillText('new wave incoming', this.screenWidth / 2, this.screenHeight / 2);
    };

    Renderer.prototype.clearScreen = function () {
        this.screenCtx.clearRect(0, 0, this.screenWidth, this.screenHeight);
    };

    Renderer.prototype.draw = function () {
        if (this.pause)
            return;

        this.clearScreen();

        for (var key in this.targets) {
            this._renderTarget(this.targets[key]);
        }
        this.players.forEach(this._renderPlayer.bind(this));
    };

    Renderer.prototype._renderPlayer = function (elem) {
        this._renderCircle(elem.x, elem.y, elem.radius, elem.color);
    };

    Renderer.prototype._renderTarget = function (elem) {
        this._renderCircle(elem.x, elem.y, elem.radius, elem.color);
    };

    Renderer.prototype._renderCircle = function (x, y, radius, color) {
        this.screenCtx.beginPath();
        this.screenCtx.arc(x, y, radius, 0, 2 * Math.PI, false);
        this.screenCtx.fillStyle = color;
        this.screenCtx.fill();
    };

    Renderer.prototype.addPlayer = function (elem) {
        this.players.push(elem);
    };

    Renderer.prototype.addTarget = function (id, elem) {
        this.targets[id] = elem;
    };

    Renderer.prototype.removeTarget = function (id) {
        delete this.targets[id];
    };

    return Renderer;
});