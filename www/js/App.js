define(function () {
    function App(renderer, gameLoop) {
        this.renderer = renderer;
        this.gameLoop = gameLoop;
        this.players = {};
        this.state = State.READY;
    }

    App.prototype.run = function () {
        this.renderer.renderStartScreen();
    };

    App.prototype.startGame = function () {
        this.renderer.clearScreen();
        var playerOne = {x: 240, y: 160};
        this.players['one'] = playerOne;
        this.renderer.addFront(playerOne);

        this.gameLoop.run();
        this.state = State.RUNNING;
    };

    App.prototype.updatePlayer = function (id, x, y) {
        if (this.state != State.RUNNING)
            return;

        var player = this.players[id];
        player.x = x;
        player.y = y;
    };

    var State = {
        READY: 'ready',
        RUNNING: 'running'
    };

    return App;
});