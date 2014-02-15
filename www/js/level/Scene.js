define(function () {
    function Scene(maxTime, waves) {
        this.maxTime = maxTime;
        this.waves = waves || [];
    }

    Scene.prototype.addWave = function (elem) {
        this.waves.push(elem);
    };

    return Scene;
});