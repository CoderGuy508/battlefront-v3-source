// Keep the game source on the same revision as this runtime.
var battlefrontSourceUrl = new URL("battlefront-v3.js", document.currentScript.src).href;
Processing.disableInit();
    function adaptAngles(processing) {
        var toRadians = Math.PI / 180;
        var textMode = processing.textMode;
        processing.textMode = function (mode) {
            return textMode.call(processing, mode === processing.CENTER ? processing.MODEL : mode);
        };
        ['sin', 'cos', 'tan', 'rotate', 'rotateX', 'rotateY', 'rotateZ'].forEach(function (name) {
            var original = processing[name];
            if (typeof original === 'function') {
                processing[name] = function (angle) {
                    return original.call(processing, angle * toRadians);
                };
            }
        });
        ['asin', 'acos', 'atan', 'atan2'].forEach(function (name) {
            var original = processing[name];
            processing[name] = function () {
                return original.apply(processing, arguments) / toRadians;
            };
        });
        var originalArc = processing.arc;
        processing.arc = function (x, y, w, h, start, stop) {
            return originalArc.call(processing, x, y, w, h, start * toRadians, stop * toRadians);
        };
        var createGraphics = processing.createGraphics;
        processing.createGraphics = function () {
            var graphics = createGraphics.apply(processing, arguments);
            adaptAngles(graphics);
            return graphics;
        };
        Object.defineProperty(processing, 'mouseIsPressed', {
            get: function () {
                return processing.__mousePressed;
            }
        });
        Object.defineProperty(processing, 'keyIsPressed', {
            get: function () {
                return processing.__keyPressed;
            }
        });
    }

function startGame() {
    var canvas = document.getElementById('game');
    var instance = new Processing(canvas, function (p) {
        p.size(600, 600, p.P2D);
        adaptAngles(p);
        p.noLoop();
    });
    var protectedNames = ['window', 'document', 'location', 'console', 'eval', 'Function', 'setTimeout', 'setInterval', 'clearTimeout', 'clearInterval', 'addEventListener', 'removeEventListener', 'fetch', 'XMLHttpRequest', 'draw', 'setup', 'mousePressed', 'mouseReleased', 'mouseScrolled', 'keyPressed', 'keyReleased'];
    var liveNames = ['width', 'height', 'mouseX', 'mouseY', 'pmouseX', 'pmouseY', 'mouseButton', 'mouseIsPressed', 'keyIsPressed', 'keyCode', 'key', 'frameCount'];
    var pointer = { x: 0, y: 0, previousX: 0, previousY: 0, ready: false, pendingPress: false };
    function trackPointer(event) {
        var bounds = canvas.getBoundingClientRect();
        pointer.x = (event.clientX - bounds.left) * 600 / (bounds.width || 600);
        pointer.y = (event.clientY - bounds.top) * 600 / (bounds.height || 600);
        if (!pointer.ready || event.type === 'mousedown' || event.type === 'mouseup') {
            pointer.previousX = pointer.x;
            pointer.previousY = pointer.y;
        }
        if (event.type === 'mousedown' && event.button === 0 && window.gameStage !== 'Play') {
            pointer.pendingPress = true;
        }
        pointer.ready = true;
    }
    ['mousemove', 'mousedown', 'mouseup'].forEach(function (name) {
        canvas.addEventListener(name, trackPointer, true);
    });
    var apiNames = [];
    for (var apiName in instance) {
        apiNames.push(apiName);
    }
    apiNames.forEach(function (name) {
        if (name.indexOf('__') === 0 || protectedNames.indexOf(name) >= 0 || liveNames.indexOf(name) >= 0 || ['parseInt', 'parseFloat', 'isNaN', 'isFinite', 'Object', 'Array', 'String', 'Number', 'Boolean', 'Date', 'RegExp'].indexOf(name) >= 0) {
            return;
        }
        var value = instance[name];
        if (typeof value === 'function') {
            window[name] = /^[A-Z]/.test(name) ? value : value.bind(instance);
        } else if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'string') {
            window[name] = value;
        }
    });
    liveNames.forEach(function (name) {
        Object.defineProperty(window, name, {
            configurable: true,
            get: function () {
                if (name === 'mouseX') {
                    return pointer.x;
                }
                if (name === 'mouseY') {
                    return pointer.y;
                }
                if (name === 'pmouseX') {
                    return pointer.previousX;
                }
                if (name === 'pmouseY') {
                    return pointer.previousY;
                }
                if (name === 'mouseIsPressed') {
                    return instance.mouseIsPressed || (window.gameStage !== 'Play' && pointer.pendingPress);
                }
                return instance[name];
            }
        });
    });
    window.externals = instance.externals;
    var script = document.createElement('script');
    script.src = battlefrontSourceUrl;
    script.onload = function () {
        var callbacks = window.BattlefrontV3Callbacks || window;
        ['draw', 'mousePressed', 'mouseReleased', 'mouseScrolled', 'keyPressed', 'keyReleased'].forEach(function (name) {
            if (typeof callbacks[name] === 'function') {
                instance[name] = callbacks[name];
            }
        });
        var gameDraw = instance.draw;
        instance.draw = function () {
            try {
                return gameDraw.apply(instance, arguments);
            } finally {
                pointer.pendingPress = false;
                pointer.previousX = pointer.x;
                pointer.previousY = pointer.y;
            }
        };
        window.editorTipVisible = false;
        instance.frameRate(60);
        instance.loop();
    };
    script.onerror = function () {
        console.error('Could not load Battlefront from jsDelivr.');
    };
    document.body.appendChild(script);
    canvas.addEventListener('pointerdown', function () {
        canvas.focus();
    });
    canvas.addEventListener('contextmenu', function (event) {
        event.preventDefault();
    });
    var spaceHeld = false;
    function releaseSpace() {
        if (!spaceHeld) {
            return;
        }
        spaceHeld = false;
        instance.keyCode = 32;
        instance.key = ' ';
        instance.keyReleased();
        instance.__keyPressed = Object.keys(window.keys || {}).some(function (key) {
            return Boolean(window.keys[key]);
        });
    }
    canvas.addEventListener('keydown', function (event) {
        if (event.code !== 'Space' && event.key !== ' ' && event.keyCode !== 32) {
            return;
        }
        // Printable keys normally reach ProcessingJS through keypress, which
        // preventDefault suppresses. Deliver Space once through keydown instead.
        event.preventDefault();
        event.stopImmediatePropagation();
        if (!spaceHeld) {
            spaceHeld = true;
            instance.keyCode = 32;
            instance.key = ' ';
            instance.__keyPressed = true;
            instance.keyPressed();
        }
    }, true);
    canvas.addEventListener('keyup', function (event) {
        if (event.code === 'Space' || event.key === ' ' || event.keyCode === 32) {
            event.preventDefault();
            event.stopImmediatePropagation();
            releaseSpace();
        }
    }, true);
    canvas.addEventListener('blur', releaseSpace);
    window.addEventListener('blur', releaseSpace);
    canvas.addEventListener('keydown', function (event) {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].indexOf(event.key) >= 0) {
            event.preventDefault();
        }
    });
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startGame, { once: true });
} else {
    startGame();
}
