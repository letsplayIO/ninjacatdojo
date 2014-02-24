require(['require', 'lib/domReady', 'App', 'GameLoop', 'render/Renderer', 'input/OrientationHandler', 'HitDetector',
    'input/FullScreenController', 'BrowserOracle', 'input/TiltController', 'input/TouchDPad'
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
//        ### old tilt controller 1/2
//        OrientationHandler = require('input/OrientationHandler'),
        HitDetector = require('HitDetector'),
        FullScreenController = require('input/FullScreenController'),
        BrowserOracle = require('BrowserOracle'),
        TiltController = require('input/TiltController'),
        TouchDPad = require('input/TouchDPad');

    var fireArea = {
        startX: screen.width / 8 * 6,
        startY: screen.height / 8 * 6,
        endX: screen.width,
        endY: screen.height
    };

    var renderer = new Renderer(screen, ctx, fireArea);
    var tickBus = [];
    var gameLoop = new GameLoop(requestAnimationFrame, renderer, tickBus);
    var resizeBus = [];
    var hitDetector = new HitDetector(ctx);
    var app = new App(renderer, gameLoop, resizeBus, hitDetector.isHit.bind(hitDetector), INNER_WIDTH, INNER_HEIGHT);
    tickBus.push(app.tick.bind(app));

    resizeBus.push(renderer.resize.bind(renderer));
    resizeBus.push(app.resize.bind(app));


    var dPad = new TouchDPad(app, renderer, fireArea);

    var fsCtrl = new FullScreenController(screen);
    var listener = function () {
        screen.removeEventListener('click', listener);
//        ### full screen controller 1/1
//        fsCtrl.request();
        app.startGame();

//        #### tilt controls 1/2
//        screen.addEventListener('touchend', app.fire.bind(app));

//        #### dpad controls 1/1
//        screen.addEventListener('touchstart', dPad.touchStart.bind(dPad));
//        screen.addEventListener('touchmove', dPad.touchMove.bind(dPad));
//        screen.addEventListener('touchend', dPad.touchEnd.bind(dPad));

    };
    screen.addEventListener('click', listener);
    var oracle = new BrowserOracle(navigator.userAgent);
    oracle.init();

//    ### old tilt controller 2/2
//    var orientationHandler = new OrientationHandler(app, INNER_WIDTH, INNER_HEIGHT, oracle.isFirefox);
//    resizeBus.push(orientationHandler.resize.bind(orientationHandler));
//    window.addEventListener('deviceorientation', orientationHandler.handle.bind(orientationHandler));

//    ### tilt controls 2/2
//    var tiltPad = new TiltController(app, oracle.isFirefox);
//    window.addEventListener('deviceorientation', tiltPad.handleOrientation.bind(tiltPad));

    app.run();
});