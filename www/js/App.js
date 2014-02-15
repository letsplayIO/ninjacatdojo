define(['level/Level', 'level/Scene', 'level/Wave'], function (Level, Scene, Wave) {
    function App(renderer, gameLoop, resizeBus, isHit, innerWidth, innerHeight) {
        this.renderer = renderer;
        this.gameLoop = gameLoop;
        this.players = {};
        this.state = State.READY;
        this.resizeBus = resizeBus;
        this.isHit = isHit;

        this.innerWidth = innerWidth;
        this.innerHeight = innerHeight;
    }
    
    App.prototype.resize = function (width, height) {
        this.innerWidth = width;
        this.innerHeight = height;
    };

    App.prototype.run = function () {
        this.renderer.resize(this.innerWidth, this.innerHeight);
        this.renderer.showStartScreen();
    };

    App.prototype.startGame = function () {
        var self = this;
        setTimeout(function () {
            self.resizeBus.forEach(function (fn) {
                fn(window.innerWidth, window.innerHeight)
            });
        }, 1000);

        var playerOne = {name: "one", x: 240, y: 160, radius: 2, color: 'black', score: 0, multi: 1};
        this.players['one'] = playerOne;
        this.renderer.addPlayer(playerOne);

        this.state = State.RUNNING;

        var levelOne = this.createLevelOne();
        this.level = levelOne;

        this.game = {};
        this.game.overAllTimeLeft = levelOne.time;

        this._nextScene();

        this.gameLoop.run();
    };

    App.prototype.tick = function () {
        console.log("tick tack");

        this.game.overAllTimeLeft--;

        this.renderer.updateTime(this.game.overAllTimeLeft);

        this.game.timeLeftOnScene--;
        this.game.timeLeftWithWave--;
        var self = this;
        if (this.game.overAllTimeLeft <= 0) {
            this._end();

        } else if (this.game.timeLeftOnScene <= 0) {
            this._removeCurrentTargets();
            this.renderer.showNextSceneScreen();
            this.renderer.pause = true;
            setTimeout(function () {
                self._nextScene();
                self.renderer.pause = false;
            }, 500);

        } else if (this.game.timeLeftWithWave <= 0) {
            this._removeCurrentTargets();
            this.renderer.showNextWaveScreen();
            this.renderer.pause = true;
            setTimeout(function () {
                self._nextWave();
                self.renderer.pause = false;
            }, 500);
        }
    };

    App.prototype._end = function () {
        console.log("end");
        
        this._removeCurrentTargets();
        this.renderer.showEndScreen();
        this.renderer.pause = true;
    };

    App.prototype._removeCurrentTargets = function () {
        for (var key in this.game.targetDict) {
            this.renderer.removeTarget(key);
            delete this.game.targetDict[key];
        }
    };

    App.prototype._nextScene = function () {
        console.log("new scene");
        
        if (this.level.scenes.length <= 0) {
            this._end();
            return;
        }

        this.game.currentScene = this.level.scenes.shift();
        this.game.timeLeftOnScene = this.game.currentScene.maxTime;

        this._nextWave();
    };

    App.prototype._nextWave = function () {
        console.log("new wave");
        
        if (this.game.currentScene.waves.length <= 0) {
            this._nextScene();
            return;
        }

        this.game.currentWave = this.game.currentScene.waves.shift();
        this.game.timeLeftWithWave = this.game.currentWave.maxTime;
        this.game.targetsLeft = this.game.currentWave.targets.length;

        var id = 0;
        this.game.targetDict = {};

        var self = this;
        this.game.currentWave.targets.forEach(function (target) {
            self.game.targetDict[id] = target;
            self.renderer.addTarget(id, target);
            id++;
        });
    };

    App.prototype.createLevelOne = function () {
        var waveOne = new Wave(10,
            [{"x":299,"y":250,"radius":35,"color":"green"}]);

        var waveTwo = new Wave(15,
            [{"x":295,"y":255,"radius":35,"color":"green"},
            {"x":219,"y":254,"radius":35,"color":"green"},
            {"x":370,"y":255,"radius":35,"color":"green"}]
        );

        var waveThree = new Wave(15,
            [{"x":291,"y":285,"radius":53,"color":"green"},
            {"x":150,"y":252,"radius":41,"color":"green"},
            {"x":439,"y":245,"radius":44,"color":"green"},
            {"x":206,"y":96,"radius":20,"color":"green"},
            {"x":348,"y":71,"radius":22,"color":"green"}]
        );

        var waveFour = new Wave(10,
            [{"x":197,"y":154,"radius":23,"color":"green"},
                {"x":68,"y":200,"radius":21,"color":"green"},
                {"x":244,"y":139,"radius":23,"color":"green"},
                {"x":110,"y":184,"radius":20,"color":"green"},
                {"x":151,"y":169,"radius":22,"color":"green"}]
        );

        var waveFive = new Wave(4,
            [{"x":119,"y":225,"radius":31,"color":"green"},
                {"x":385,"y":279,"radius":49,"color":"green"},
                {"x":185,"y":265,"radius":42,"color":"green"},
                {"x":396,"y":63,"radius":15,"color":"green"},
                {"x":317,"y":52,"radius":16,"color":"green"}]
        );

        var waveSix = new Wave(2,
            [{"x":307,"y":52,"radius":13,"color":"green"},
                {"x":307,"y":178,"radius":38,"color":"green"},
                {"x":306,"y":104,"radius":19,"color":"green"}]
        );

        var sceneOne = new Scene(30, [waveOne, waveTwo, waveThree, waveFour, waveFive, waveSix]);

        var waveSeven = new Wave(10,
            [{"x":310,"y":158,"radius":21,"color":"green"},{"x":391,"y":239,"radius":42,"color":"green"},{"x":205,"y":237,"radius":41,"color":"green"},{"x":297,"y":238,"radius":41,"color":"green"},{"x":343,"y":126,"radius":16,"color":"green"},{"x":372,"y":99,"radius":17,"color":"green"},{"x":402,"y":73,"radius":16,"color":"green"}]
        );

        var waveEight = new Wave(10,
            [{"x":477,"y":66,"radius":21,"color":"green"},{"x":133,"y":296,"radius":42,"color":"green"},{"x":223,"y":315,"radius":41,"color":"green"},{"x":120,"y":61,"radius":17,"color":"green"},{"x":88,"y":43,"radius":13,"color":"green"}]
        );

        var waveNine = new Wave(5,
            [{"x":390,"y":170,"radius":25,"color":"green"},{"x":296,"y":263,"radius":28,"color":"green"},{"x":298,"y":90,"radius":23,"color":"green"},{"x":198,"y":172,"radius":25,"color":"green"},{"x":355,"y":115,"radius":19,"color":"green"},{"x":362,"y":233,"radius":25,"color":"green"},{"x":227,"y":115,"radius":19,"color":"green"},{"x":229,"y":237,"radius":24,"color":"green"}]);

        var waveTen = new Wave(1,
            [{"x":300,"y":173,"radius":19,"color":"green"}]);

        var sceneTwo = new Scene(20, [waveSeven, waveEight, waveNine, waveTen]);

        return new Level(45, [sceneOne, sceneTwo]);
    };

    App.prototype.updatePlayer = function (id, x, y) {
        if (this.state != State.RUNNING)
            return;

        var player = this.players[id];
        player.x = x;
        player.y = y;
    };

    App.prototype.fire = function () {
        var player = this.players['one'];

        var isHit = false;
        for (var key in this.game.targetDict) {
            var target = this.game.targetDict[key];

            if (this.isHit(player.x, player.y, target.x, target.y, target.radius + 2)) {
                isHit = true;

                player.score += 10 * player.multi;
                player.multi++;

                this.renderer.removeTarget(key);
                delete this.game.targetDict[key];

                this.game.targetsLeft--;
                if (this.game.targetsLeft <= 0) {
                    this._nextWave();
                }
            }
        }

        if (!isHit) {
            player.multi = 1;
        }

    };

    var State = {
        READY: 'ready',
        RUNNING: 'running'
    };

    return App;
});