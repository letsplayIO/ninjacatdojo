define(function () {
    function TiltController(app, isFirefox) {
        this.app = app;
        this.isFirefox = isFirefox;
    }

    var MAX_RANGE = 12,
        GAMMA_SHIFT = 45;

    TiltController.prototype.handleOrientation = function (event) {
        var xAxis = event.beta;

        if (this.isFirefox) {
            xAxis *= -1;
        }

        if (xAxis > MAX_RANGE) {
            xAxis = MAX_RANGE;
        } else if (xAxis < -MAX_RANGE) {
            xAxis = -MAX_RANGE;
        }

        xAxis /= MAX_RANGE;


        var yAxis = -(event.gamma + GAMMA_SHIFT);

        if (this.isFirefox) {
            yAxis = event.gamma - GAMMA_SHIFT;
        }

        if (yAxis > MAX_RANGE) {
            yAxis = MAX_RANGE;
        } else if (yAxis < -MAX_RANGE) {
            yAxis = -MAX_RANGE;
        }

        yAxis /= MAX_RANGE;

        this.app.updateAxes(xAxis, yAxis);
    };

    return TiltController;
});