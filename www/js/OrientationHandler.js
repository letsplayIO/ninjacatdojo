define(function () {
    function OrientationHandler(app, maxWidth, maxHeight) {
        this.app = app;
        this.maxX = maxWidth;
        this.maxY = maxHeight;
    }

    OrientationHandler.prototype.handle = function (event) {

        var x = event.beta;
        if (event.beta > 25) {
            x = 25;
        } else if (event.beta < -25) {
            x = -25;
        }
        x = Math.floor(this.maxX * (x + 25) / 50);

        var y = -(event.gamma + 35);
        if (event.gamma + 35 > 25) {
            y = -25;
        } else if (event.gamma + 35 < -25) {
            y = 25;
        }
        y = Math.floor(this.maxY * (y + 25) / 50);

        this.app.updatePlayer('one', x, y);
    };

    return OrientationHandler;
});