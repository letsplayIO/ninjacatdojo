define(function () {
    function BrowserOracle(userAgent) {
        this.userAgent = userAgent;
    }

    BrowserOracle.prototype.init = function () {
        this.isFirefox = /firefox/i.test(this.userAgent);
    };

    return BrowserOracle;
});