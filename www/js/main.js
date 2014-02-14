require(['require', 'lib/domReady', 'App', 'GameLoop', 'Renderer', 'OrientationHandler'], function (require) {
    var requestAnimationFrame = (function () {
        return  (window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            }).bind(window);
    })();

    var screen = document.getElementById('screen');
    var ctx = screen.getContext('2d');

    var App = require('App'),
        GameLoop = require('GameLoop'),
        Renderer = require('Renderer'),
        OrientationHandler = require('OrientationHandler');

    var renderer = new Renderer(screen, ctx);
    var gameLoop = new GameLoop(requestAnimationFrame, renderer);
    var app = new App(renderer, gameLoop);

    screen.addEventListener('click', app.startGame.bind(app));
    screen.removeEventListener('click', app.startGame);

    var orientationHandler = new OrientationHandler(app, 480, 320);
    window.addEventListener('deviceorientation', orientationHandler.handle.bind(orientationHandler));

    app.run()
});