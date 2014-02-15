define(function () {
    function Wave(maxTime, targets) {
        this.maxTime = maxTime;

        this.targets = targets || [];
    }

    return Wave;
});