require(['require', 'lib/domReady', 'App', 'GameLoop', 'render/Renderer', 'input/OrientationHandler'], function (require) {
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
    var INNER_WIDTH = window.innerWidth;
    var INNER_HEIGHT = window.innerHeight;

    var App = require('App'),
        GameLoop = require('GameLoop'),
        Renderer = require('render/Renderer'),
        OrientationHandler = require('input/OrientationHandler');

    var renderer = new Renderer(screen, ctx);
    var tickBus = [];
    var gameLoop = new GameLoop(requestAnimationFrame, renderer, tickBus);
    var resizeBus = [];
    var app = new App(renderer, gameLoop, resizeBus, INNER_WIDTH, INNER_HEIGHT);
    tickBus.push(app.tick.bind(app));

    resizeBus.push(renderer.resize.bind(renderer));
    resizeBus.push(app.resize.bind(app));
    
    var listener = function () {
        window.removeEventListener('click', listener); 
        console.log("listener has been called");
        screen.webkitRequestFullScreen();
        app.startGame();
    };
    window.addEventListener('click', listener);

    var orientationHandler = new OrientationHandler(app, INNER_WIDTH, INNER_HEIGHT);
    resizeBus.push(orientationHandler.resize.bind(orientationHandler));
    window.addEventListener('deviceorientation', orientationHandler.handle.bind(orientationHandler));

    app.run();
});