define(function () {
    function TouchDPad(app, renderer, fireArea) {
        this.app = app;
        this.renderer = renderer;
        this.fireArea = fireArea;
    }

    var DPAD_RADIUS = 100,
        isActive = false,
        startTouchId,
        startPoint,
        endPoint,
        shooting = false,
        shootingId;

    TouchDPad.prototype.touchStart = function (event) {
        event.preventDefault();

        for (var i = 0; i < event.changedTouches.length; i++) {
            var t = event.changedTouches[i];

            if (isActive && t.identifier === startTouchId) {
                continue;
            }
            if (t.clientX >= this.fireArea.startX &&
                t.clientX <= this.fireArea.endX &&
                t.clientY >= this.fireArea.startY &&
                t.clientY <= this.fireArea.endY) {

                this.app.fire();
                shooting = true;
                shootingId = t.identifier;
                return;
            }
        }


        if (isActive)
            return;

        var touch = event.changedTouches[0];
        startTouchId = touch.identifier;
        startPoint = {
            x: touch.clientX,
            y: touch.clientY
        };

        endPoint = {
            x: startPoint.x,
            y: startPoint.y
        };

        isActive = true;
        this.renderer.showDPad(startPoint, endPoint);
    };

    TouchDPad.prototype.touchMove = function (event) {
        event.preventDefault();

        for (var i = 0; i < event.changedTouches.length; i++) {
            var touch = event.changedTouches[i];

            if (shooting && touch.identifier === shootingId) {
                continue;
            }

            if (isActive && touch.identifier === startTouchId) {
                endPoint.x = touch.clientX;
                endPoint.y = touch.clientY;

                this._calcAxes();
                break;
            }
        }
    };

    TouchDPad.prototype._calcAxes = function () {
        var vector = {
            x: endPoint.x - startPoint.x,
            y: endPoint.y - startPoint.y
        };

        var magnitude = Math.sqrt(vector.x * vector.x + vector.y * vector.y);

        if (magnitude > DPAD_RADIUS) {
            var theta = Math.atan2(vector.y, vector.x);
            endPoint.x = startPoint.x + DPAD_RADIUS * Math.cos(theta);
            endPoint.y = startPoint.y + DPAD_RADIUS * Math.sin(theta);

            vector = {
                x: endPoint.x - startPoint.x,
                y: endPoint.y - startPoint.y
            };
        }

        var xAxis = vector.x / DPAD_RADIUS;
        var yAxis = vector.y / DPAD_RADIUS;

        this.app.updateAxes(xAxis, yAxis);
    };

    TouchDPad.prototype.touchEnd = function (event) {
        event.preventDefault();

        for (var i = 0; i < event.changedTouches.length; i++) {
            var touch = event.changedTouches[i];

            if (isActive && touch.identifier === startTouchId) {
                isActive = false;
                this.app.updateAxes(0, 0);
                this.renderer.hideDPad();
            }
            if (shooting && touch.identifier === shootingId) {
                shooting = false;
            }
        }
    };

    return TouchDPad;
});