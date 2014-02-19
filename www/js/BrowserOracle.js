define(function () {
    function BrowserOracle(userAgent) {
        this.userAgent = userAgent;
    }

    BrowserOracle.prototype.init = function () {
        this.isFirefox = this.userAgent.match(/firefox/i);
    };

    return BrowserOracle;
});