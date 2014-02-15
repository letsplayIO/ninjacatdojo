define(function () {
    function HitDetector(ctx) {
        this.ctx = ctx;
    }

    HitDetector.prototype.isHit = function (pointerX, pointerY, targetX, targetY, targetRadius) {
        this.ctx.beginPath();
        this.ctx.arc(targetX, targetY, targetRadius, 0, 2 * Math.PI, false);

        return this.ctx.isPointInPath(pointerX, pointerY);
    };

    return HitDetector;
});