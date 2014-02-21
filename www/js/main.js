require(['require', 'lib/domReady', 'App', 'GameLoop', 'render/Renderer', 'input/OrientationHandler', 'HitDetector',
    'input/FullScreenController', 'BrowserOracle'
], function (require) {
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
        OrientationHandler = require('input/OrientationHandler'),
        HitDetector = require('HitDetector'),
        FullScreenController = require('input/FullScreenController'),
        BrowserOracle = require('BrowserOracle');

    var renderer = new Renderer(screen, ctx);
    var tickBus = [];
    var gameLoop = new GameLoop(requestAnimationFrame, renderer, tickBus);
    var resizeBus = [];
    var hitDetector = new HitDetector(ctx);
    var app = new App(renderer, gameLoop, resizeBus, hitDetector.isHit.bind(hitDetector), INNER_WIDTH, INNER_HEIGHT);
    tickBus.push(app.tick.bind(app));

    resizeBus.push(renderer.resize.bind(renderer));
    resizeBus.push(app.resize.bind(app));

    var fsCtrl = new FullScreenController(screen);
    var listener = function () {
        screen.removeEventListener('click', listener);
//        fsCtrl.request();
//        document.documentElement.mozRequestFullScreen();
        app.startGame();

        screen.addEventListener('touchend', app.fire.bind(app));
//        screen.addEventListener('touchend', app.fire.bind(app));
    };
    screen.addEventListener('click', listener);
    var oracle = new BrowserOracle(navigator.userAgent);
    oracle.init();
    var orientationHandler = new OrientationHandler(app, INNER_WIDTH, INNER_HEIGHT, oracle.isFirefox);
    resizeBus.push(orientationHandler.resize.bind(orientationHandler));
    window.addEventListener('deviceorientation', orientationHandler.handle.bind(orientationHandler));

    app.run();
});