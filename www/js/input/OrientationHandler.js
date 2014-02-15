define(function () {
    function OrientationHandler(app, maxWidth, maxHeight) {
        this.app = app;
        this.maxX = maxWidth;
        this.maxY = maxHeight;
    }

    var MAX_RANGE = 12;
    var GAMMA_SHIFT = 50;

    OrientationHandler.prototype.handle = function (event) {

        var x = event.beta;
        if (event.beta > MAX_RANGE) {
            x = MAX_RANGE;
        } else if (event.beta < -MAX_RANGE) {
            x = -MAX_RANGE;
        }
        x = Math.floor(this.maxX * (x + MAX_RANGE) / (MAX_RANGE * 2));

        var y = -(event.gamma + GAMMA_SHIFT);
        if (event.gamma + GAMMA_SHIFT > MAX_RANGE) {
            y = -MAX_RANGE;
        } else if (event.gamma + GAMMA_SHIFT < -MAX_RANGE) {
            y = MAX_RANGE;
        }
        y = Math.floor(this.maxY * (y + MAX_RANGE) / (MAX_RANGE * 2));

        this.app.updatePlayer('one', x, y);
    };
    
    OrientationHandler.prototype.resize = function (width, height) {
        this.maxX = width;
        this.maxY = height;
    };

    return OrientationHandler;
});