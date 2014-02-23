define(function () {
    function Renderer(screen, screenCtx, fireArea) {
        this.screen = screen;
        this.screenCtx = screenCtx;
        this.screenWidth = screen.width;
        this.screenHeight = screen.height;
        this.players = [];
        this.targets = {};
        this.pause = false;
        this.time = "0";
        this.fireArea = fireArea;
    }

    var START_RADIUS = 15,
        DPAD_RADIUS = 100,
        END_RADIUS = 25;

    Renderer.prototype.resize = function (width, height) {
        this.screen.width = width;
        this.screen.height = height;
        this.screenWidth = width;
        this.screenHeight = height;
    };

    var showDPad = false,
        startPoint,
        endPoint;

    Renderer.prototype.showDPad = function (start, end) {
        startPoint = start;
        endPoint = end;

        showDPad = true;
    };

    Renderer.prototype.hideDPad = function () {
        showDPad = false;
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
        this._renderHUD();
        this._renderDPad();
        this._renderFireButton();

    };

    Renderer.prototype._renderFireButton = function () {
        this.screenCtx.strokeRect(this.fireArea.startX, this.fireArea.startY,
            this.fireArea.endX - this.fireArea.startX, this.fireArea.endY - this.fireArea.startY);
    };

    Renderer.prototype._renderPlayer = function (elem) {
        this._renderCircle(elem.x, elem.y, elem.radius, elem.color);
    };

    Renderer.prototype._renderHUD = function () {
        this._renderScore();
        this._renderTime();
    };

    Renderer.prototype._renderDPad = function () {
        if (!showDPad) {
            return;
        }

        this.screenCtx.save();
        this.screenCtx.beginPath();
        this.screenCtx.arc(startPoint.x, startPoint.y, START_RADIUS, 0, 2 * Math.PI, false);
        this.screenCtx.fillStyle = 'lightblue';
        this.screenCtx.fill();
        this.screenCtx.restore();

        this.screenCtx.save();
        this.screenCtx.beginPath();
        this.screenCtx.arc(endPoint.x, endPoint.y, END_RADIUS, 0, 2 * Math.PI, false);
        this.screenCtx.strokeStyle = 'lightblue';
        this.screenCtx.lineWidth = 5;
        this.screenCtx.stroke();
        this.screenCtx.restore();

        this.screenCtx.save();
        this.screenCtx.beginPath();
        this.screenCtx.arc(startPoint.x, startPoint.y, DPAD_RADIUS, 0, 2 * Math.PI, false);
        this.screenCtx.strokeStyle = 'lightgreen';
        this.screenCtx.lineWidth = 5;
        this.screenCtx.stroke();
        this.screenCtx.restore();

    };

    Renderer.prototype._renderScore = function () {
        this.screenCtx.font = 'italic 10pt Calibri';
        this.screenCtx.textAlign = 'center';
        this.screenCtx.baseline = 'middle';
        this.screenCtx.fillStyle = 'black';
        this.screenCtx.fillText('score: ' + this.players[0].score, this.screenWidth / 2, this.screenHeight / 8);
        this.screenCtx.fillText('multi: ' + this.players[0].multi, this.screenWidth / 8, this.screenHeight / 8);
    };

    Renderer.prototype._renderTime = function () {
        this.screenCtx.font = 'bold 10pt Calibri';
        this.screenCtx.textAlign = 'center';
        this.screenCtx.baseline = 'middle';
        this.screenCtx.fillStyle = 'black';
        this.screenCtx.fillText(this.time, this.screenWidth / 8 * 7, this.screenHeight / 8);
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

    Renderer.prototype.updateTime = function (newTime) {
        this.time = newTime.toString();
    };

    return Renderer;
});