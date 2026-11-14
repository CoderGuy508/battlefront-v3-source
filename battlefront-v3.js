/**
 * This is a project by ✝ 𝕮𝕲𝕏𝕷𝕮𝕵 ✝ (@KingCobraVenom and @LemoncelloJr)
 *
 * A note on the inheritance and class structure...
 * 
 * GameMap  -->   Various maps for the game are created as
 * instances of the parent GameMap class, and contain
 * arrays of GameObjs
 * GameObj  -->   GameObj is a general parent class, specific
 * game object classes, such as Door, inherit from the parent
 * class
 */
/**Global Variables**/
var getSkinTraits;
var findTDMSpawn;
var Sniper;
var playerHasForce;
var drawSimpleShadow;
var drawActorShadow;
var matchState;
var Laser;
var Detonator;
var gameStage;
var stageTransition;
var characterData;
var Kashyyyk;
var Jakku;
var StarDestroyer;
var planetList = ["Kashyyyk", "Jakku", "Star Destroyer"];
var resetSaberDuel;
var endDuel;
var currentGun;
var impactBodies;
var AIPlayer;
var mainFont;
var matchFont;
var Stairs;
var screenToWorld;
var isSupremacy;
var initSupremacy;
var hasCommsHeadset;
var Shotgun;
var DL44;
var Bowcaster;
var drawB2BlasterIcon;
var currentMap;
var syncEntityGrid;
var applyWorldHeight;
var stepPerceptionJob;
var curImg;
var drawCreditBalance;
var drawCreditSymbol;
var shopNumber;
var startStageTrans;
var resetMatchForHome;
var recordAchievement;
var saveGameData;
var clearGameData;
var gameSaveStorage = null;
var gameSaveSnapshot = null;
var gameSaveError = "";
var gameSaveDirty = false;
var gameSaveSoon = false;
var gameSaveAt = 0;
var gameDataPanel = "";
var creditsMusic;
var ensureCreditsAudio;
var decodeCreditsMusic;
var loadCreditsMusic;
var playCreditsMusic;
var stopCreditsMusic;
var setCreditsMusic;
var fullCreditsFrame = 0;
var creditsLogoStart = 82;
var headings = ["Achievements", "Play", "Main", "Shop", "Credits"];
var planetNum = 0;
var menuRot = 230;
var menuRotVel = 0;
var menuSlideFriction = 0.93;
var menuDragPower = 0.02;
var holoHeight = -25;
var holos = [];
var holoNum = 15;
var currentMenu = null;
var addCreditChange;
var drawCrateWreck;
var resetCrates;
var crushInDoor;
var crushActor;
var worldToScreen;
var getViewBounds;
var Blaster;
var F_11D;
var B2WristBlaster;
var Lightsaber;
var drawSaberLayer;
var saberSweepDist;
var gripTargetRadius;
var jediPlayerTarget;
var hitJediTarget;
var updateJediBot;
var clearPlacedCrates;
var getHeldItem;
var returnToWeapon;
var drawHeldItem;
var startCharShop;
var equippedCosmetic;
var syncSquadHeadset;
var isCosmeticEquipped;
var drawCharCosmetic;
var shopState;
var shopPrice;
var ownedCosmetics;
var toggleCosmetic;
var zapProgress;
var zap;
var resetLightning;
var trackLightning;
var damageZap;
var channelingZap;
var drawForceHands;
var drawZapWorld;
var drawZapReady;
var drawZapBlade;
var drawZapTrail;
var supColor;
var renderSupPost;
var updateSupBot;
var moveSupBot;
var duel;
var saberPower;
var inSaberDuel;
var duelTarget;
var runPlayerDuel;
var updateDuelActor;
var duelDeflectPulse;
var parryThrownSaber;
var renderDuelFX;
var impactWall;
var angleDifference;
var turnTowardAngle;
var turnPlayerToward;
var playerAimTick = -1;
var playerAimTurned = 0;
var getBotAwareness;
var getAITargetKey;
var aiCanObserve;
var aiTargetUsesSaber;
var aiReactToHit;
var aiUpdateAim;
var aiUpdateFacing;
var aiFireBurst;
var aiApplySpacing;
var getAIPerception;
var aiCanSeeTarget;
var aiSegHitsAlly;
var dashBill;
var getHandPose;
var getHandAngle;
var saberFlash;
var addWeaponRecoil;
var drawActorHands;
var playerHandPose = null;
var handDelayMs = 100;
var recoilProfiles = {
    F_11D: {
        kick: 4.8,
        angle: 1.4,
        recoveryMs: 150,
        camera: 0.34
    },

    E11: {
        kick: 5.7,
        angle: 1.8,
        recoveryMs: 170,
        camera: 0.41
    },

    Sniper: {
        kick: 10.5,
        angle: 3.1,
        recoveryMs: 280,
        camera: 0.72
    },

    Shotgun: {
        kick: 12.75,
        angle: 4,
        recoveryMs: 300,
        camera: 0.87
    },

    DL44: {
        kick: 7.5,
        angle: 2.4,
        recoveryMs: 215,
        camera: 0.56
    },

    Bowcaster: {
        kick: 11.4,
        angle: 3.5,
        recoveryMs: 320,
        camera: 0.81
    },

    B2_Wrist: {
        kick: 3,
        angle: 0.6,
        recoveryMs: 120,
        camera: 0.2
    }
};
//Initial values and configuration.

var lowDetailMode = true;
var gameSettings = {
    aimAssist: 0,
    firingMode: 0
};
var fireModeLabels = ["WEAPON DEFAULT", "HOLD", "CLICK"];
var bloodSplatterEnabled = false;
var mapFetch = false;
//General Variable Definitions
var playerPos = new PVector(0, 0); //The player's position
var camPos = new PVector(0, 0); //The camera's position
var minimapView = {
    canvas: null,
    size: 400,
    nextUpdateMs: 0
};
var inventoryState = {
    selected: 0,
    lastWeapon: null,
    readyAt: 0,
    cosmeticsOpen: false,
    uiConsumed: false
};

var cameraState = {
    ready: false,
    map: null,
    roll: 0,
    pitch: 1,
    recoil: 0,
    shakeX: 0,
    shakeY: 0
};
var screenShake = 0; //SHAKEY BREAKEY
var playerVel = new PVector(0, 0); //The player's velocity
var playerFloorHit = false;
var playerTeam = 1;
var hitboxSize = 30; //The radius of the player's hitbox
var colPrecision = 8; //The precision of collisions, recommended as a multiple of 4; higher values = more points checked
var colSamples = [];
for (var colSampleI = 0; colSampleI < colPrecision; colSampleI++) {
    colSamples.push({
        x: cos((360 / colPrecision) * colSampleI),
        y: sin((360 / colPrecision) * colSampleI)
    });
}
var colBucket = 320;
var collideMode = "stable"; //Testing collision modes
var skin = "Kylo Ren"; //Skin
var bodyAngle = 0;
var walkSway = 0;
var playerRenderPrevX = null;
var playerRenderPrevY = null;

var character = "Jedi";

var defaultCharacter = "Jedi";

var loadedImages = {
}; //Loaded images will go here
var squadCommandMode = false;
var squadCmdButton = {
    x: 430,
    y: 19,
    w: 118,
    h: 30
};
var squadPowerButton = {
    x: 300,
    y: 19,
    w: 54,
    h: 30
};
var squadEnabled = false;
var squadClickLock = false;
var deathScreenActive = false;
var deathScreenFrame = 0;
var deathRespawnAt = 76;
var deathTransStarted = false;
var stuckHoldFrames = 180;
var stuckHoldCount = 0;
var stuckHoldLock = false;
var deathScorePaid = false;
var playerGunPose = 0;
var playerSpeed = 1.02;
var playerDeaths = 0;
var playerCredits = 2000;
var creditDisplay = {
    value: 0,
    speed: 0
};
var creditPopups = [];
var playerJumpHeight = 0.1;
var flyCeilSoft = 0.55;
var flyCeilBuffer = 0.08;
var flyCeilExtra = 2;
var jetpackEquipped = false;
var playerHealth = 100;
var playerMaxHealth = 100;
var baseShield = 20;
var baseShieldRegen = 0.03;
var playerShield = baseShield;
var playerMaxShield = baseShield;
var playerShieldRegen = baseShieldRegen;
var pHpRegenFull = 0.05;
var pHpRegenLow = 0.02;

var playerDamageMult = 1;
var jediDashSettings = {
    burstSpeed: 90,
    arrowCount: 3,
    arrowDelayFrames: 3,
    forceCost: 20
};
var forceGripSettings = {
    strength: 0.5,
    range: 950,
    aimPad: 72,
    startCost: 8,
    holdCost: 0.3,
    throwSpeed: 28,
    throwMs: 350,
    cooldownMs: 350
};
var forceGrip = null;
var forceGripReadyAt = 0;
var forceDoorUntil = 0;
var forceHandBlend = 0;
var hasForceGrip = function () {
    if (!forceGrip || forceGrip.map !== currentMap) {
        return false;
    }
    var target = forceGrip.target;
    return !target.destroyed && !target.exploding && (target.health === undefined || target.health > 0);
};
var gripHolds = function (target) {
    return forceGrip && forceGrip.target === target && hasForceGrip();
};
var forceSettings = {
    regenSpeed: 0.23,
    jumpCost: 20,
    jumpSpeed: 0.22,
    dangerSenseCost: 3,
    saberThrowCost: 25,
    autoDeflectCost: 4,
    lightningBlockCost: 1.65,
    dangerSenseSlowMoFrames: 24,
    dangerSenseSlowMoScale: 0.02,
    dangerSenseThreatDamage: 30,
    dangerSenseThreatSpeed: 70,
    dangerSenseThreatDistance: 420
};
var defaultForceProfile = {
    capacity: 100,
    regen: 1,
    strength: 1,
    control: 1,
    range: 1,
    jump: 1
};
var forceProfiles = {
    "Yoda": {
        capacity: 180,
        regen: 1.4,
        strength: 1.75,
        control: 1.35,
        range: 1.15,
        jump: 1.15
    },
    "Darth Vader": {
        capacity: 230,
        regen: 1.15,
        strength: 2.5,
        control: 1.2,
        range: 1.1,
        jump: 0.9
    },
    "Luke Skywalker": {
        capacity: 155,
        regen: 1.3,
        strength: 1.55,
        control: 1.2,
        range: 1.1,
        jump: 1.08
    },
    "Ahsoka Tano": {
        capacity: 130,
        regen: 1.25,
        strength: 1.2,
        control: 1.15,
        range: 1,
        jump: 1.12
    },
    "Darth Maul": {
        capacity: 125,
        regen: 1.05,
        strength: 1.3,
        control: 1,
        range: 1,
        jump: 1.1
    },
    "Kylo Ren": {
        capacity: 145,
        regen: 0.9,
        strength: 1.5,
        control: 0.9,
        range: 1.05,
        jump: 1
    }
};
var forceProfile = function (skinName) {
    return forceProfiles[skinName] || defaultForceProfile;
};
var syncPlayerForce = function () {
    var capacity = forceProfile(skin).capacity;
    if (capacity !== playerMaxForce) {
        playerForce = constrain(playerForce / max(1, playerMaxForce), 0, 1) * capacity;
        playerMaxForce = capacity;
    }
};
var playerForce = 100;
var playerMaxForce = 100;
var dangerSense = 0;
var projectilePools = {
    lasers: [],
    detonators: [],
    maxLasers: 160,
    maxDetonators: 40
};
var getPooledLaser = function (config) {
    var laser = projectilePools.lasers.pop();
    if (laser) {
        laser.reset(config);
        return laser;
    }
    return new Laser(config);
};
var getPoolDetonator = function (config) {
    var det = projectilePools.detonators.pop();
    if (det) {
        det.reset(config);
        if (currentMap && currentMap._entityGridActive) {
            syncEntityGrid(currentMap, det, false);
        }
        return det;
    }
    det = new Detonator(config);
    if (currentMap && currentMap._entityGridActive) {
        syncEntityGrid(currentMap, det, false);
    }
    return det;
};
var recycleProjectile = function (ent) {
    if (!ent || !ent.poolType) {
        return;
    }
    ent.owner = null;
    ent.renderFunc = null;
    ent._activeLayer = undefined;
    if (ent.poolType === "laser") {
        ent.shooter = null;
        if (projectilePools.lasers.length < projectilePools.maxLasers) {
            projectilePools.lasers.push(ent);
        }
    } else if (ent.poolType === "detonator" && projectilePools.detonators.length < projectilePools.maxDetonators) {
        projectilePools.detonators.push(ent);
    }
};
var keys = {
}; //The keys being pressed
var aiSettings = {
    aimShootTolerance: 10,
    aimThrowTolerance: 24,
    useLearningBots: true,
    debugLearning: false,
    explorationRate: 0.08,
    rewardScale: 1,
    targetSearchRange: 1450,
    preferredCombatRange: 430,
    botSpacingRange: 190,
    idleSpreadRange: 320,
    detonatorAvoidRange: 430,
    detonatorUrgentRange: 250,
    detonatorPenalty: 0.025,
    lightsaberFearRange: 400,
    lightsaberKeepAwayRange: 300,
    botDetonatorCooldown: 280,
    botDetonatorMinRange: 280,
    botDetonatorMaxRange: 400,
    botDetonatorThrowChance: 0.12,
    botHealthScale: 2 / 3,
    botDamageScale: 1,
    squadFollowMinRange: 145,
    squadFollowMaxRange: 360,
    squadFollowComfortRange: 235,
    squadFollowPull: 1.35,
    squadPriorityRange: 430,
    squadShootBias: 1.15,
    learningRate: 0.08,
    discount: 0.9,
    decisionFrames: 28,
    perceptionIntervalMs: 120,
    reactionMinMs: 240,
    reactionMaxMs: 420,
    targetMemoryMs: 2600,
    closeThreatRange: 650,
    turnDegreesPerTick: 6.5,
    friendlyCheckMs: 50
};
var movementSettings = {
    turnDegreesPerTick: 11,
    sprintMultiplier: 1.45,
    drag: 0.8,
    diagonalMultiplier: sqrt(2)
};
var aiRoles = ["guard", "rusher", "flanker", "sneak"];
var getPlayerMoveAccel = function (sprinting, held) {
    return (playerSpeed * (sprinting ? movementSettings.sprintMultiplier : 1) * getSkinTraits(skin).move * (held ? 0.78 : 1));
};
var getBotMoveAccel = function () {
    return getPlayerMoveAccel(true, false) * movementSettings.diagonalMultiplier;
};
var getPlayerMaxSpeed = function () {
    return (getBotMoveAccel() * movementSettings.drag) / (1 - movementSettings.drag);
};
var aiTacticalActions = [ "advance", "strafe", "retreat", "hold", "chaseEnemy", "shootEnemy", "throwDetonator", "regroup", "spreadOut", "avoidDetonator", "unstuck" ];
var aiTargetSerial = 1;
var runtimeErrMsg = "";
var runtimeFailed = false;
var performanceStats = {
    updateMs: 0,
    renderMs: 0,
    targetCandidates: 0,
    sightSamples: 0,
    culledObjects: 0,
    perceptionScans: 0
};
var aiScansLeft = -1;
var aiScanUntil = 0;
var aiJumpChecksLeft = 2;
var inputKeys = {
    sprint: 16,
    jump: 32,
    left: 65,
    right: 68,
    up: 87,
    down: 83,
    cosmetics: 74,
    unstick: 66,
    dash: 67,
    telekinesis: 70,
    reload: 82,
    saber: 86,
    medkit: 81,
    detonator: 71,
    landmine: 72,
    arrowLeft: 37,
    arrowRight: 39,
    arrowUp: 38,
    arrowDown: 40,
    escape: 27
};
var hudLayout = {
    minimapX: 20,
    minimapY: 430,
    minimapSize: 150,
    weaponX: 470,
    weaponY: 575
};
var fpsSample = {
    startedAt: null,
    frames: 0,
    value: null
};
var pauseState = {
    active: false,
    settings: false,
    resuming: false,
    resumeStartedAt: 0,
    frame: null,
    blockMouseUntilRelease: false,
    saveStatus: ""
};
var killHudState = {
    count: 0,
    burstAt: -10000
};
var canUseGameInput = function () {
    return (gameStage === "Play" && matchState.phase === "live" && !stageTransition.active && !deathScreenActive && !runtimeFailed && !pauseState.active && !pauseState.blockMouseUntilRelease);
};
var getSelectedCharData = function () {
    if (!characterData[character]) {
        character = defaultCharacter;
    }
    return characterData[character];
};
var getSelectedMap = function () {
    var maps = {
        Kashyyyk: Kashyyyk,
        Jakku: Jakku,
        "Star Destroyer": StarDestroyer
    };
    return maps[planetList[0]] || Kashyyyk || null;
};
var tickClock = {
    baseMs: 1000 / 60,
    stepMs: 1000 / 60,
    lastMs: null,
    deltaMs: 1000 / 60,
    wallStepMs: 1000 / 60,
    renderDeltaMs: 1000 / 60,
    renderScale: 1,
    realMs: 0,
    gameMs: 0,
    accumulatorMs: 0,
    maxGapMs: 250,
    maxSteps: 4,
    updateBudgetMs: 24,
    tick: 0,
    stepsThisFrame: 0,
    scale: 1
};
var hasForceGesture = function () {
    return hasForceGrip() || tickClock.gameMs < forceDoorUntil;
};

//Throw State
var activeSaberThrows = [];
var rightHeld = false;
var mouseButtons = null;
var leftHeld = function () {
    return mouseButtons === null ? mouseIsPressed && !rightHeld : (mouseButtons & 1) !== 0;
};
var resetSaberThrows = function () {
    resetSaberDuel();
    for (var i = 0; i < activeSaberThrows.length; i++) {
        var saber = activeSaberThrows[i];
        saber.throwState = null;
        saber.bladeTrail = [];
        saber.throwReadyAt = tickClock.gameMs + 4000;
        if (saber.parentSaber) {
            saber.parentSaber.bladeTrail = [];
        }
    }
    activeSaberThrows = [];
    rightHeld = false;
    if (currentGun && currentGun.isLightsaber) {
        currentGun.bladeTrail = [];
    }
};

var resetSaberClock = function () {
    resetSaberThrows();
    if (currentGun && currentGun.isLightsaber) {
        currentGun.throwReadyAt = 0;
        currentGun.dualThrows = null;
        currentGun.dualPose = null;
    }
    if (typeof characterData !== "undefined") {
        for (var className in characterData) {
            if (!characterData.hasOwnProperty(className)) {
                continue;
            }
            var guns = characterData[className].guns || [];
            for (var i = 0; i < guns.length; i++) {
                if (guns[i] && guns[i].isLightsaber) {
                    guns[i].throwReadyAt = 0;
                    guns[i].dualThrows = null;
                    guns[i].dualPose = null;
                    guns[i].throwState = null;
                    guns[i].bladeTrail = [];
                }
            }
        }
    }
};

//Input and Helpers
var gameInput = {
    pressed: {
    },

    mousePressed: false,
    mouseReleased: false,
    saberThrow: false
};
var clearGameInput = function () {
    gameInput.pressed = {
    };
    gameInput.mousePressed = false;
    gameInput.mouseReleased = false;
    gameInput.saberThrow = false;
};
var uiEase = function (amount) {
    return 1 - pow(1 - amount, tickClock.renderScale);
};
/**Helper Functions**/
var drawImg = function (img, x, y, w, h) {
    if (!img) {
        return false;
    }
    image(img, x, y, w, h);
    return true;
};
var prepMap = function (map) {
    if (!map) {
        return false;
    }
    if (!map.entities) {
        map.entities = {
        };
    }
    for (var layer = min(map.bottomZ !== undefined ? map.bottomZ : 0, map.killZ !== undefined ? map.killZ : 0) - 2; layer <= (map.topZ !== undefined ? map.topZ : 0) + 3; layer++) {
        if (!map.entities[layer]) {
            map.entities[layer] = [];
        }
    }
    return true;
};
var solidAt = function (x, y, z, size, ignored, allowDoors) {
    if (!currentMap || !currentMap.objects) {
        return false;
    }
    var zLayer = floor(z);
    for (var layer = zLayer - 1; layer <= zLayer; layer++) {
        var cols = currentMap.getNearbyCollisions ? currentMap.getNearbyCollisions(layer, x, y, size + 2) : currentMap.collisionLayers ? currentMap.collisionLayers[layer] : null;
        if (!cols || cols.length === undefined) {
            continue;
        }
        for (var c = 0; c < cols.length; c++) {
            var col = cols[c];
            if (!col || col.plane || col.disabled || !col.blocksPlayers || z < col.bodyBase || z >= col.bodyTop - 0.00001 || (ignored && ignored.indexOf(col) >= 0) || !col.inBounds(x, y, size + 0.001)) {
                continue;
            }
            if (allowDoors && col.door && col.door.manualOpen !== false && col.door.opensOnLayer(zLayer)) {
                continue;
            }
            if (col.overlapsCircle(x, y, size)) {
                return true;
            }
        }
    }
    return false;
};
var forceMovesTarget = function (target) {
    return !!(target && ((forceGrip && forceGrip.target === target && forceGrip.map === currentMap) || tickClock.gameMs < (target.forceThrowUntil || 0)));
};
var gripProtectsPlayer = function (target) {
    return !!(target && (forceMovesTarget(target) || (target.forceMotion && target.forceMotion.hits)));
};
var softCharCollide = function (actor, isPlayerActor) {
    if (!currentMap || !currentMap.entities) {
        return;
    }
    var pos = isPlayerActor ? playerPos : actor.pos;
    var vel = isPlayerActor ? playerVel : actor.vel;
    var size = isPlayerActor ? hitboxSize : actor.colSize;
    if (!pos || !vel || !size) {
        return;
    }
    var tick = tickClock.scale;
    var z0 = floor(pos.z);
    var zMin = max(currentMap.killZ, z0 - 1);
    var zMax = min(currentMap.topZ + 1, z0 + 1);
    for (var z = zMin; z <= zMax; z++) {
        var list = currentMap.entities[z];
        if (!list) {
            continue;
        }
        for (var i = 0; i < list.length; i++) {
            var ent = list[i];
            if (!ent || !ent.pos || ent.health === undefined || ent.health <= 0 || ent === actor) {
                continue;
            }
            if (abs(ent.pos.z - pos.z) > 1.2) {
                continue;
            }
            var minDist = (size + (ent.colSize || hitboxSize)) * 0.82;
            var dx = pos.x - ent.pos.x;
            var dy = pos.y - ent.pos.y;
            var dSq = dx * dx + dy * dy;
            if (dSq >= minDist * minDist) {
                continue;
            }
            var d = sqrt(max(dSq, 0.0001));
            if (dSq < 0.0001) {
                dx = cos((tickClock.tick + i * 37) % 360);
                dy = sin((tickClock.tick + i * 37) % 360);
                d = 1;
            }
            var push = min((minDist - d) * 0.18 * tick, 4.5);
            var nx = dx / d;
            var ny = dy / d;
            var casterSafe = isPlayerActor && gripProtectsPlayer(ent);
            if (!casterSafe) {
                impactBodies(isPlayerActor ? null : actor, ent, nx, ny);
            }
            var actorPush = casterSafe ? 0 : push * 0.5;
            var otherPush = push - actorPush;
            pos.x += nx * actorPush;
            pos.y += ny * actorPush;
            vel.x += nx * actorPush * 0.08;
            vel.y += ny * actorPush * 0.08;
            if (ent.vel) {
                ent.pos.x -= nx * otherPush;
                ent.pos.y -= ny * otherPush;
                ent.vel.x -= nx * otherPush * 0.08;
                ent.vel.y -= ny * otherPush * 0.08;
                if (currentMap._entityGridActive) {
                    syncEntityGrid(currentMap, ent, false);
                }
            }
        }
    }
};

//Droid Traits

var defaultSkinTraits = {
    move: 1,
    hullDamage: 1,
    description: "Standard combat profile"
};
var b1SkinTraits = {
    move: 1.1,
    hullDamage: 1.2,
    description: "Light chassis: +10% movement, +20% hull damage taken"
};
var b2SkinTraits = {
    move: 0.85,
    hullDamage: 0.75,
    shield: 80,
    shieldRegenMult: 2,
    description: "Heavy chassis: -15% movement, -25% hull damage taken"
};
getSkinTraits = function (skinName) {
    if (skinName === "Battle Droid" || skinName === "B1 Battle Droid") {
        return b1SkinTraits;
    }
    if (skinName === "Super Battle Droid" || skinName === "B2 Super Battle Droid") {
        return b2SkinTraits;
    }
    return defaultSkinTraits;
};
var resetPlayerShield = function () {
    var traits = getSkinTraits(skin);
    playerMaxShield = traits.shield || baseShield;
    playerShieldRegen = baseShieldRegen * (traits.shieldRegenMult || 1);
    playerShield = playerMaxShield;
};

var isB2Droid = function (name) {
    return name === "Super Battle Droid" || name === "B2 Super Battle Droid";
};

//Combat Feedback
var combatFeedback = {
    impacts: [],
    blood: [],
    maxImpacts: 40,
    playerHitAt: -10000,
    playerShieldHit: false,
    markerAt: -10000,
    markerKill: false
};
var bloodLifetime = 5000;
var addBloodSplatter = function (target, attacker, healthLost, killed, now) {
    if (!bloodSplatterEnabled || healthLost <= 0 || (!target.isPlayerTarget && !target.isMatchBot)) {
        return;
    }
    var targetSkin = target.isPlayerTarget ? skin : target.skin;
    if (isB2Droid(targetSkin) || targetSkin === "Battle Droid" || targetSkin === "B1 Battle Droid") {
        return;
    }
    var stains = combatFeedback.blood;
    while (stains.length && (now - stains[0].time >= bloodLifetime || stains.length >= 144)) {
        stains.shift();
    }
    var pos = target.pos;
    var seed = abs(floor(now * 0.89 + pos.x * 1.13 + pos.y * 1.71));
    var source = target.damageSource;
    if (!source || dist(source.x, source.y, pos.x, pos.y) <= 1) {
        source = attacker && (attacker.isPlayer ? playerPos : attacker.pos);
    }
    var angle = source && dist(source.x, source.y, pos.x, pos.y) > 1 ? atan2(pos.y - source.y, pos.x - source.x) : seed % 360;
    angle += seed % 27 - 13;
    var size = 84 + min(96, healthLost * 2.1) + (killed ? 44 : 0);
    var spread = 24 + size * 0.17;
    stains.push({
        x: pos.x + cos(angle) * spread,
        y: pos.y + sin(angle) * spread,
        layer: floor(pos.z),
        time: now,
        angle: angle,
        size: size,
        pattern: seed % 4
    });
};
var recordCombatHit = function (target, oldHealth, oldShield, attacker) {
    var healthLost = max(0, oldHealth - (target.health || 0));
    var shieldLost = max(0, oldShield - (target.shield || 0));
    if (healthLost + shieldLost <= 0) {
        return;
    }
    var shieldOnly = healthLost === 0 && shieldLost > 0;
    var killed = oldHealth > 0 && target.health <= 0;
    var now = tickClock.gameMs;
    if (target.pos) {
        //Cull expired entries on insertion, keeping the render pass read-only.
        while (combatFeedback.impacts.length && now - combatFeedback.impacts[0].time > 750) {
            combatFeedback.impacts.shift();
        }
        var actor = target.isPlayerTarget ? playerPos : target;
        var damage = healthLost + shieldLost;
        for (var i = combatFeedback.impacts.length - 1; i >= 0; i--) {
            var previous = combatFeedback.impacts[i];
            if (now - previous.time > 110) {
                break;
            }
            if (previous.actor === actor && previous.shield === shieldOnly && !previous.killed) {
                damage += previous.damage;
                combatFeedback.impacts.splice(i, 1);
                break;
            }
        }
        combatFeedback.impacts.push({
            actor: actor,
            x: target.pos.x,
            y: target.pos.y,
            z: target.pos.z,
            time: now,
            damage: damage,
            shield: shieldOnly,
            killed: killed
        });
        if (combatFeedback.impacts.length > combatFeedback.maxImpacts) {
            combatFeedback.impacts.shift();
        }
        addBloodSplatter(target, attacker, healthLost, killed, now);
    }
    target.hitVisualAt = now;
    target.hitVisualShield = shieldOnly;
    if (target.isPlayerTarget) {
        combatFeedback.playerHitAt = now;
        combatFeedback.playerShieldHit = shieldOnly;
        screenShake = max(screenShake, min(8, screenShake + 1.6 + (healthLost + shieldLost) * 0.16));
    }
    if (attacker && attacker.isPlayer && target.team !== undefined && target.team !== attacker.team) {
        combatFeedback.markerAt = now;
        combatFeedback.markerKill = killed;
    }
};
var drawActorHitFlash = function (actor) {
    var age = tickClock.gameMs - (actor.hitVisualAt !== undefined ? actor.hitVisualAt : -10000);
    if (age < 0 || age > 110) {
        return;
    }
    pushStyle();
    noStroke();
    if (actor.hitVisualShield) {
        fill(100, 190, 255, 65 * (1 - age / 110));
    } else {
        fill(255, 225, 165, 75 * (1 - age / 110));
    }
    ellipse(actor.pos.x, actor.pos.y, 112, 112);
    popStyle();
};
var bloodTextures = [];
var bakeBloodSplatter = function () {
    var buffer = createGraphics(96, 96, P2D);
    buffer.noStroke();
    for (var pattern = 0; pattern < 4; pattern++) {
        var pools = [[30, 48, 34, 24]];
        var drops = [];
        for (var i = 0; i < 12; i++) {
            var angle = i * 30 + random(-12, 12);
            var radius = random(0.65, 1.2);
            pools.push([30 + cos(angle) * radius * 17, 48 + sin(angle) * radius * 12, random(10, 23), random(7, 15)]);
        }
        for (var i = 0; i < 66; i++) {
            var reach = pow(random(1), 1.25);
            var x = 27 + reach * 63;
            var y = 48 + random(-1, 1) * (19 + reach * 22);
            var size = random(1.3, 8) * (1 - reach * 0.62);
            drops.push([x, y, size * random(1.25, 2.35), size, random(86, 150)]);
        }
        for (var level = 0; level < 6; level++) {
            var fade = 1 - level * 0.19;
            buffer.background(0, 0);
            for (var i = 0; i < drops.length; i++) {
                var drop = drops[i];
                buffer.fill(drop[4], 10, 14, 205 * fade);
                buffer.ellipse(drop[0], drop[1], drop[2], drop[3]);
            }
            buffer.fill(116, 9, 15, 199 * fade);
            for (var i = 0; i < pools.length; i++) {
                var pool = pools[i];
                buffer.ellipse(pool[0], pool[1], pool[2], pool[3]);
            }
            buffer.fill(66, 6, 10, 100 * fade);
            buffer.ellipse(25 + pattern, 48, 17, 11);
            buffer.ellipse(31, 50 + pattern * 0.65, 18, 9);
            buffer.fill(152, 21, 26, 78 * fade);
            buffer.ellipse(26 + pattern, 44, 11, 3);
            bloodTextures.push(buffer.get(0, 0, 96, 96));
        }
    }
};
var drawBloodLayer = function (layer, bounds) {
    var stains = combatFeedback.blood;
    var now = tickClock.gameMs;
    if (!bloodSplatterEnabled || !bloodTextures.length || !stains.length || now - stains[stains.length - 1].time >= bloodLifetime) {
        return;
    }
    pushStyle();
    imageMode(CORNER);
    noTint();
    for (var i = 0; i < stains.length; i++) {
        var stain = stains[i];
        var age = now - stain.time;
        if (stain.layer !== layer || age < 0 || age >= bloodLifetime) {
            continue;
        }
        var x = stain.x;
        var y = stain.y;
        var size = stain.size * (0.52 + 0.48 * min(1, age / 140));
        if (bounds && (x + size < bounds.minX || x - size > bounds.maxX || y + size < bounds.minY || y - size > bounds.maxY)) {
            continue;
        }
        pushMatrix();
        translate(x, y);
        rotate(stain.angle);
        var fade = max(0, 6 - ceil((bloodLifetime - age) / 500));
        image(bloodTextures[stain.pattern * 6 + fade], -size / 2, -size / 2, size, size);
        popMatrix();
    }
    popStyle();
};
var drawCombatHitLayer = function (layer) {
    pushStyle();
    pushMatrix();
    translate(-camPos.x, -camPos.y);
    for (var i = 0; i < combatFeedback.impacts.length; i++) {
        var fx = combatFeedback.impacts[i];
        var age = tickClock.gameMs - fx.time;
        if (floor(fx.z) !== layer || age < 0 || age > 750) {
            continue;
        }
        pushMatrix();
        applyWorldHeight(fx.z - playerPos.z, playerPos.z);
        var fade = 1 - age / 750;
        noFill();
        strokeWeight(fx.killed ? 4.5 : 2.75);
        if (fx.shield) {
            stroke(100, 190, 255, 185 * fade);
        } else if (fx.killed) {
            stroke(255, 175, 65, 205 * fade);
        } else {
            stroke(255, 220, 155, 175 * fade);
        }
        if (age < 240) {
            var radius = 8 + age * (fx.killed ? 0.3 : 0.15);
            ellipse(fx.x, fx.y, radius * 2, radius * 2);
        }
        noStroke();
        var label = "-" + ceil(fx.damage);
        var labelY = fx.y - 70 - age * 0.07;
        textFont(matchFont, 24);
        textAlign(CENTER, CENTER);
        fill(5, 10, 18, 175 * fade);
        text(label, fx.x + 1, labelY + 2);
        if (fx.shield) {
            fill(175, 224, 255, 255 * fade);
        } else {
            fill(255, 239, 208, 255 * fade);
        }
        text(label, fx.x, labelY);
        popMatrix();
    }
    popMatrix();
    popStyle();
};
var drawScreenRim = function (r, g, b, opacity, depth) {
    if (opacity < 1) {
        return;
    }
    noFill();
    var band = depth / 12;
    strokeWeight(band + 0.75);
    for (var i = 0; i < 12; i++) {
        var inset = (i + 0.5) * band;
        var fade = 1 - i / 12;
        stroke(r, g, b, opacity * fade * fade);
        rect(inset, inset, width - inset * 2, height - inset * 2);
    }
};
var damageRim = null;
var bakeDamageRim = function () {
    var size = 120;
    var buffer = createGraphics(size, size, P2D);
    var surface = createGraphics(size, size, P2D);
    var ctx = surface.externals && surface.externals.context;
    if (!ctx || !ctx.canvas || !ctx.drawImage) {
        return;
    }
    var opacity = [];
    for (var y = 0; y < size; y++) {
        for (var x = 0; x < size; x++) {
            var edge = min(min(x, size - 1 - x), min(y, size - 1 - y));
            opacity.push(round(255 * pow(max(0, 1 - edge / (size * 0.11)), 2.4)));
        }
    }
    buffer.background(238, 20, 34);
    var redRim = buffer.get(0, 0, size, size);
    redRim.mask(opacity);
    buffer.background(75, 165, 255);
    var blueRim = buffer.get(0, 0, size, size);
    blueRim.mask(opacity);
    if (redRim.sourceImg && blueRim.sourceImg) {
        damageRim = {
            width: size,
            height: size,
            sourceImg: ctx.canvas,
            context: ctx,
            red: redRim.sourceImg,
            blue: blueRim.sourceImg
        };
    }
};
var drawDamageRim = function () {
    var age = tickClock.gameMs - combatFeedback.playerHitAt;
    var lowHealth = playerHealth > 0 ? constrain(1 - playerHealth / max(1, playerMaxHealth) / 0.45, 0, 1) : 0;
    var flash = age >= 0 && age < 360 ? 1 - age / 360 : 0;
    var redAlpha = max(195 * pow(lowHealth, 0.75), combatFeedback.playerShieldHit ? 0 : 115 * flash);
    var blueAlpha = combatFeedback.playerShieldHit ? 100 * flash : 0;
    if (redAlpha < 1 && blueAlpha < 1) {
        return;
    }
    pushStyle();
    if (damageRim) {
        var ctx = damageRim.context;
        ctx.save();
        ctx.clearRect(0, 0, damageRim.width, damageRim.height);
        if (redAlpha >= 1) {
            ctx.globalAlpha = redAlpha / 255;
            ctx.drawImage(damageRim.red, 0, 0);
        }
        if (blueAlpha >= 1) {
            ctx.globalAlpha = blueAlpha / 255;
            ctx.drawImage(damageRim.blue, 0, 0);
        }
        ctx.restore();
        imageMode(CORNER);
        noTint();
        image(damageRim, 0, 0, width, height);
    } else {
        var size = min(width, height);
        rectMode(CORNER);
        drawScreenRim(238, 20, 34, redAlpha, size * (0.04 + 0.06 * lowHealth));
        drawScreenRim(75, 165, 255, blueAlpha, size * 0.038);
    }
    popStyle();
};
var drawCombatHUD = function () {
    var markerAge = tickClock.gameMs - combatFeedback.markerAt;
    if (markerAge < 0 || markerAge >= 230) {
        return;
    }
    var fade = 1 - markerAge / 230;
    var outside = combatFeedback.markerKill ? 22 : 18;
    pushStyle();
    for (var pass = 0; pass < 2; pass++) {
        stroke(pass === 0 ? color(6, 10, 17, 210 * fade) : combatFeedback.markerKill ? color(255, 104, 70, 255 * fade) : color(255, 245, 213, 255 * fade));
        strokeWeight(pass === 0 ? 5 : 2.5);
        for (var side = 0; side < 4; side++) {
            var a = 45 + side * 90;
            line(mouseX + cos(a) * 8, mouseY + sin(a) * 8, mouseX + cos(a) * outside, mouseY + sin(a) * outside);
        }
    }
    popStyle();
};
var resetCombatFX = function () {
    combatFeedback.impacts = [];
    combatFeedback.blood = [];
    combatFeedback.playerHitAt = -10000;
    combatFeedback.markerAt = -10000;
};

//Spawn Grace
//Combat protection lasts 1.5 simulation seconds after spawning.
var spawnGraceMs = 1500;
var playerGraceEndMs = 0;
var spawnGraceLeft = function (actor) {
    var until = actor && actor.isPlayerTarget ? playerGraceEndMs : actor ? actor.graceUntilMs : 0;
    return max(0, (until || 0) - tickClock.gameMs);
};
var hasSpawnGrace = function (actor) {
    return spawnGraceLeft(actor) > 0;
};
var canAttack = function (actor) {
    return !hasSpawnGrace(!actor || actor.isPlayer ? {
        isPlayerTarget: true
    } : actor);
};
var protectForcePath = function (target, vel, step) {
    if (playerHealth <= 0 || deathScreenActive || abs(target.pos.z - playerPos.z) > 1.2) {
        return;
    }
    var dx = target.pos.x - playerPos.x;
    var dy = target.pos.y - playerPos.y;
    var separation = sqrt(dx * dx + dy * dy);
    var radius = hitboxSize + gripTargetRadius(target) + 12;
    var nx = separation > 0.01 ? dx / separation : cos(bodyAngle - 90);
    var ny = separation > 0.01 ? dy / separation : sin(bodyAngle - 90);
    var vx = vel.x - playerVel.x;
    var vy = vel.y - playerVel.y;
    var outward = vx * nx + vy * ny;
    var minimum = 4;
    if (step > 0) {
        minimum = min(4, (radius - separation) / step);
    } else if (separation >= radius) {
        var sideways = vx * dy - vy * dx;
        if (outward >= 0 || sideways * sideways >= radius * radius * (vx * vx + vy * vy)) {
            return;
        }
    }
    var correction = max(0, minimum - outward);
    vel.x += nx * correction;
    vel.y += ny * correction;
};
var beginSpawnGrace = function () {
    playerGraceEndMs = tickClock.gameMs + spawnGraceMs;
    for (var layer in currentMap.entities) {
        var list = currentMap.entities[layer];
        for (var i = 0; i < list.length; i++) {
            if (list[i] instanceof AIPlayer && list[i].health > 0) {
                list[i].graceUntilMs = tickClock.gameMs + spawnGraceMs;
            }
        }
    }
};
var drawSpawnGrace = function (x, y, radius, actor) {
    var remaining = spawnGraceLeft(actor);
    if (remaining <= 0) {
        return;
    }
    pushStyle();
    noFill();
    stroke(124, 221, 241, 210);
    strokeWeight(2);
    ellipse(x, y, radius * 2, radius * 2);
    stroke(224, 251, 255);
    strokeWeight(3);
    arc(x, y, radius * 2, radius * 2, -90, -90 + 360 * constrain(remaining / spawnGraceMs, 0, 1));
    noStroke();
    fill(175, 237, 250);
    textFont(mainFont, 12);
    textAlign(CENTER, CENTER);
    text("GRACE " + (ceil(remaining / 100) / 10).toFixed(1) + "s", x, y - radius - 12);
    popStyle();
};

//Runtime State
var isAllyAttack = function (target, attacker) {
    if (!target || !attacker || target === attacker || attacker.team === undefined) {
        return false;
    }
    var targetIsPlayer = target.isPlayerTarget || target.isPlayer;
    if (targetIsPlayer && (attacker.isPlayer || attacker.isPlayerTarget)) {
        return false;
    }
    var targetTeam = targetIsPlayer ? playerTeam : target.team;
    return targetTeam !== undefined && targetTeam === attacker.team;
};
var applyDamage = function (target, dmg, attacker) {
    if (!target) {
        return;
    }
    if (dmg <= 0 || isAllyAttack(target, attacker) || hasSpawnGrace(target) || (attacker && !canAttack(attacker))) {
        return;
    }
    var visualOldHealth = target.health || 0;
    var visualOldShield = target.shield !== undefined ? target.shield : target.maxShield || 0;
    if (target.maxShield === undefined) {
        target.maxShield = 0;
    }
    if (target.shield === undefined) {
        target.shield = target.maxShield;
    }
    if (target.shield < 0) {
        target.shield = 0;
    }
    if (target.shield > target.maxShield) {
        target.shield = target.maxShield;
    }
    if (target.shield > 0) {
        var take = min(target.shield, dmg);
        target.shield -= take;
        dmg -= take;
    }
    if (dmg > 0) {
        if (target.health !== undefined) {
            var mult = target.damageMult !== undefined ? target.damageMult : 1;
            target.health -= dmg * mult * getSkinTraits(target.skin).hullDamage;
            if (target.maxHealth === undefined) {
                target.maxHealth = target.health;
            }
            if (target.health < 0) {
                target.health = 0;
            }
            if (target.health > target.maxHealth) {
                target.health = target.maxHealth;
            }
        }
    }
    if (target.aiMemory && target.health + target.shield < visualOldHealth + visualOldShield) {
        aiReactToHit(target, attacker);
    }
    recordCombatHit(target, visualOldHealth, visualOldShield, attacker);
};

//Elevation Navigation

var aiNavSettings = {
    jumpCooldownMs: 1400,
    jumpSpeed: 0.1,
    jumpLift: 0.1,
    gravity: 0.005,
    jumpFrames: 47
};
var getAINavigation = function () {
    if (currentMap.aiNavigation) {
        return currentMap.aiNavigation;
    }
    var nav = {
        ramps: []
    };
    var addRamp = function (changer) {
        if (!changer || changer.type !== "smooth") {
            return;
        }
        var c = changer.collision;
        var z = changer.zChange;
        var dx = (sin(c.rotation) * c.height) / 2;
        var dy = (-cos(c.rotation) * c.height) / 2;
        nav.ramps.push({
            collision: c,
            z: z,
            topLanding: changer.topLanding || 1,
            a: {
                x: c.x - dx,
                y: c.y - dy,
                z: z[0]
            },

            b: {
                x: c.x + dx,
                y: c.y + dy,
                z: z[1]
            }
        });
    };
    for (var i = 0; i < currentMap.objectsTemp.length; i++) {
        var obj = currentMap.objectsTemp[i];
        if (obj instanceof Stairs) {
            addRamp(obj.zChanger);
        }
    }
    for (var j = 0; j < currentMap.zChangers.length; j++) {
        addRamp(currentMap.zChangers[j]);
    }
    currentMap.aiNavigation = nav;
    return nav;
};
var aiRampHeight = function (ramp, x, y, margin) {
    var c = ramp.collision;
    var dx = x - c.x;
    var dy = y - c.y;
    var across = dx * cos(c.rotation) + dy * sin(c.rotation);
    var along = dx * sin(c.rotation) - dy * cos(c.rotation);
    if (abs(across) > c.width / 2 - (margin || 0) || along < -c.height / 2 - 1 || along > c.height / 2 + ramp.topLanding) {
        return null;
    }
    return ramp.z[0] + (ramp.z[1] - ramp.z[0]) * constrain((along + c.height / 2) / c.height, 0, 1);
};
var rampLanding = function (pos, oldX, oldY, oldZ, grounded) {
    var ramps = getAINavigation().ramps;
    var ground = null;
    for (var i = 0; i < ramps.length; i++) {
        var ramp = ramps[i];
        var height = aiRampHeight(ramp, pos.x, pos.y, 0);
        if (height === null || (grounded && height <= pos.z) || (ground !== null && height <= ground)) {
            continue;
        }
        var prevHeight = aiRampHeight(ramp, oldX, oldY, 0);
        var wasOnRamp = prevHeight !== null && abs(oldZ - prevHeight) < 0.015;
        var landsOnRamp = oldZ >= (prevHeight === null ? height : prevHeight) && pos.z <= height;
        var stepsOntoRamp = grounded && height - pos.z < 1;
        if (wasOnRamp || landsOnRamp || stepsOntoRamp) {
            ground = height;
        }
    }
    return ground;
};
var aiHasSupport = function (x, y, z, from) {
    var nav = getAINavigation();
    for (var r = 0; r < nav.ramps.length; r++) {
        var ramp = nav.ramps[r];
        var height = aiRampHeight(ramp, x, y, 0);
        var start = from ? aiRampHeight(ramp, from.x, from.y, 0) : null;
        if (height === null) {
            if (start !== null && abs(start - z) < 0.16) {
                var endpoint = dist(x, y, ramp.a.x, ramp.a.y) < dist(x, y, ramp.b.x, ramp.b.y) ? ramp.a : ramp.b;
                var c = ramp.collision;
                var across = (x - c.x) * cos(c.rotation) + (y - c.y) * sin(c.rotation);
                if (abs(across) < c.width / 2 && dist(x, y, endpoint.x, endpoint.y) < 160 && abs(endpoint.z - z) < 0.65 && aiHasSupport(x, y, endpoint.z + 0.001)) {
                    return true;
                }
            }
            continue;
        }
        if (abs(height - z) < 0.16 || (start !== null && (abs(start - z) < 0.16 || (start <= z && z - start < 1.5 && height <= z && z - height < 1.5)))) {
            return true;
        }
    }
    for (var layer = floor(z) - 1; layer <= floor(z); layer++) {
        var cols = currentMap.getNearbyCollisions(layer, x, y, 2) || [];
        for (var i = 0; i < cols.length; i++) {
            var c = cols[i];
            var top = c.plane ? c.surfaceZ : c.bodyTop;
            if (!c.disabled && c.blocksPlayers && c.blocksLanding && abs(top - z) < 0.16 && c.overlapsCircle(x, y, 0)) {
                return true;
            }
        }
    }
    return false;
};

//Darth Vader Saber Icon
var vaderSaberShapes = [ [ [38.1, 122.9], [39, 114.3], [42.9, 109.5], [51.4, 110.5], [65.7, 116.2], [70.5, 113.3], [81, 114.3], [85.7, 110.5], [89.5, 110.5], [104.8, 117.1], [112.4, 118.1], [114.3, 127.6], [121, 131.4], [122.9, 137.1], [138.1, 140], [152.4, 149.5], [169.5, 151.4], [170.5, 153.3], [219, 168.6], [224.8, 168.6], [226.7, 163.8], [229.5, 162.9], [262.9, 176.2], [267.6, 176.2], [273.3, 180], [278.1, 180], [327.6, 197.1], [328.6, 199], [363.8, 208.6], [366.7, 210.5], [366.7, 219], [373.3, 223.8], [377.1, 233.3], [369.5, 262.9], [357.1, 279], [341, 281], [341, 286.7], [336.2, 286.7], [332.4, 282.9], [328.6, 282.9], [294.3, 266.7], [289.5, 266.7], [289.5, 264.8], [284.8, 262.9], [207.6, 234.3], [201, 227.6], [192.4, 226.7], [185.7, 231.4], [177.1, 233.3], [160, 223.8], [131.4, 214.3], [129.5, 204.8], [130.5, 194.3], [117.1, 189.5], [105.7, 188.6], [99, 182.9], [84.8, 178.1], [73.3, 178.1], [59, 170.5], [47.6, 167.6], [42.9, 162.9], [39, 151.4] ] ];
var drawVaderSaber = function (x, y, size) {
    pushStyle();
    pushMatrix();
    translate(x, y);
    scale(size / 400);
    translate(-200, -200);
    noStroke();
    fill(190, 195, 202);
    for (var i = 0; i < vaderSaberShapes.length; i++) {
        beginShape();
        for (var j = 0; j < vaderSaberShapes[i].length; j++) {
            vertex(vaderSaberShapes[i][j][0], vaderSaberShapes[i][j][1]);
        }
        endShape(CLOSE);
    }
    popMatrix();
    popStyle();
};

//Clone Trooper
var drawCloneHands = function (size) {
    pushStyle();
    pushMatrix();
    scale(size / 212);
    fill(244);
    stroke(160);
    strokeWeight(5);
    ellipse(-65, -122, 57, 57);
    ellipse(65, -122, 57, 57);
    popMatrix();
    popStyle();
};
var drawCloneTrooper = function (x, y, size, hideHands) {
    pushStyle();
    pushMatrix();
    translate(x, y);
    scale(size / 212);
    rotate(180);
    rectMode(CENTER);
    fill(235);
    stroke(154);
    strokeWeight(4);
    ellipse(-78, 12, 48, 99);
    ellipse(78, 12, 48, 99);
    fill(242);
    stroke(167);
    beginShape();
    vertex(0, -104);
    bezierVertex(-57, -104, -86, -70, -85, -14);
    bezierVertex(-88, 36, -63, 65, -31, 79);
    bezierVertex(-19, 96, 19, 96, 31, 79);
    bezierVertex(63, 65, 88, 36, 85, -14);
    bezierVertex(86, -70, 57, -104, 0, -104);
    endShape(CLOSE);
    noStroke();
    fill(249);
    ellipse(0, -35, 143, 124);
    fill(155);
    rect(0, -65, 27, 94, 6);
    fill(165);
    rect(0, 5, 11, 49);
    fill(27);
    stroke(35);
    strokeWeight(3);
    beginShape();
    vertex(-65, 8);
    bezierVertex(-40, 26, 40, 26, 65, 8);
    vertex(61, 27);
    bezierVertex(42, 37, 25, 40, 11, 44);
    vertex(5, 65);
    vertex(17, 78);
    vertex(10, 84);
    vertex(0, 74);
    vertex(-10, 84);
    vertex(-17, 78);
    vertex(-5, 65);
    vertex(-11, 44);
    bezierVertex(-25, 40, -42, 37, -61, 27);
    endShape(CLOSE);
    popMatrix();
    popStyle();
    if (!hideHands) {
        pushMatrix();
        translate(x, y);
        drawCloneHands(size);
        popMatrix();
    }
};

//Luke Skywalker
var drawLukeHands = function (size) {
    pushStyle();
    pushMatrix();
    scale(size / 212);
    fill(220, 199, 150);
    stroke(116, 104, 76);
    strokeWeight(5);
    ellipse(-65, -126, 57, 57);
    ellipse(65, -126, 57, 57);
    popMatrix();
    popStyle();
};
var drawLukeSkywalker = function (x, y, size, hideHands) {
    pushStyle();
    pushMatrix();
    translate(x, y);
    scale(size / 212);
    rotate(180);
    fill(244);
    stroke(141, 142, 134);
    strokeWeight(5);
    ellipse(-78, 18, 67, 112);
    ellipse(78, 18, 67, 112);
    noFill();
    stroke(175, 175, 164);
    strokeWeight(4);
    arc(-75, 48, 56, 53, 0, 180);
    arc(75, 48, 56, 53, 0, 180);
    fill(223, 201, 151);
    stroke(120, 105, 72);
    strokeWeight(5);
    beginShape();
    vertex(-68, 18);
    bezierVertex(-62, 57, -29, 83, 0, 86);
    bezierVertex(29, 83, 62, 57, 68, 18);
    bezierVertex(35, -12, -35, -12, -68, 18);
    endShape(CLOSE);
    fill(150, 131, 85);
    stroke(103, 91, 61);
    strokeWeight(6);
    beginShape();
    vertex(-77, 15);
    bezierVertex(-79, -22, -78, -61, -48, -83);
    bezierVertex(-30, -104, 11, -110, 28, -91);
    bezierVertex(55, -93, 68, -72, 73, -49);
    bezierVertex(85, -27, 83, -4, 82, 16);
    vertex(69, 28);
    vertex(58, 20);
    bezierVertex(50, 41, 35, 54, 15, 54);
    vertex(24, 44);
    bezierVertex(-10, 64, -48, 48, -65, 28);
    vertex(-77, 15);
    endShape(CLOSE);
    popMatrix();
    popStyle();
    if (!hideHands) {
        pushMatrix();
        translate(x, y);
        drawLukeHands(size);
        popMatrix();
    }
};

//Interface And Assets
var aiDoorWaypoint = function (bot, goal) {
    if (abs(goal.z - bot.pos.z) > 0.8) {
        return null;
    }
    var doors = currentMap.doors;
    var z = bot.pos.z;
    var layer = floor(z);
    var best = null;
    var nearest = 320 * 320;
    for (var i = 0; i < doors.length; i++) {
        var door = doors[i];
        var dx = bot.pos.x - door.x;
        var dy = bot.pos.y - door.y;
        var d = dx * dx + dy * dy;
        var panel = door.collisions[0];
        var usable = door.width / 2 - bot.colSize - 5;
        if (d >= nearest || usable <= 0 || door.manualOpen === false || z < panel.bodyBase || z >= panel.bodyTop || !door.opensOnLayer(layer)) {
            continue;
        }
        var c = panel._cos;
        var s = panel._sin;
        var gx = goal.x - door.x;
        var gy = goal.y - door.y;
        var acrossGoal = gy * c - gx * s;
        var sign = acrossGoal >= 0 ? 1 : -1;
        var across = (dy * c - dx * s) * sign;
        var along = dx * c + dy * s;
        var clearance = bot.colSize + door.thickness / 2 + 12;
        if (abs(acrossGoal) < clearance || across >= clearance || (across >= 0 && abs(along) > usable)) {
            continue;
        }
        var cross = lerp(along, gx * c + gy * s, max(0, -across / (abs(acrossGoal) - across)));
        if (abs(cross) > door.width / 2 + 110) {
            continue;
        }
        var exit = {
            x: door.x - s * sign * clearance,
            y: door.y + c * sign * clearance
        };
        var entry = {
            x: door.x + s * sign * clearance,
            y: door.y - c * sign * clearance
        };
        var waypoint = across >= -clearance - 3 && abs(along) <= usable ? exit : entry;
        var travel = dist(bot.pos.x, bot.pos.y, waypoint.x, waypoint.y);
        var steps = max(1, ceil(travel / max(20, bot.colSize)));
        var clear = !solidAt(exit.x, exit.y, z, bot.colSize, null, true) && aiHasSupport(exit.x, exit.y, z);
        for (var j = 1; clear && j <= steps; j++) {
            var t = j / steps;
            clear = !solidAt(lerp(bot.pos.x, waypoint.x, t), lerp(bot.pos.y, waypoint.y, t), z, bot.colSize, null, true);
        }
        if (clear) {
            nearest = d;
            best = waypoint;
        }
    }
    return best;
};
var aiMoveToward = function (bot, targetPos, speedScale, direct) {
    if (!targetPos) {
        return;
    }
    if (!direct && targetPos.z !== undefined) {
        targetPos = aiDoorWaypoint(bot, targetPos) || targetPos;
    }
    var dx = targetPos.x - bot.pos.x;
    var dy = targetPos.y - bot.pos.y;
    var d = sqrt(dx * dx + dy * dy);
    if (d < 0.001) {
        return;
    }
    var accel = min(bot.walkSpeed * (speedScale || 1) * getSkinTraits(bot.skin).move, getBotMoveAccel()) * tickClock.scale;
    bot.vel.x += (dx / d) * accel;
    bot.vel.y += (dy / d) * accel;
};
var aiMoveAway = function (bot, targetPos, speedScale) {
    if (!targetPos) {
        return;
    }
    var away = {
        x: bot.pos.x + (bot.pos.x - targetPos.x),
        y: bot.pos.y + (bot.pos.y - targetPos.y)
    };
    aiMoveToward(bot, away, speedScale);
};
var aiFollowSquad = function (bot, crowdingAlly) {
    if (!bot || !bot.inPlayerSquad || !bot.aiMemory) {
        return;
    }
    var dx = playerPos.x - bot.pos.x;
    var dy = playerPos.y - bot.pos.y;
    var d = sqrt(dx * dx + dy * dy);
    bot.aiMemory.squadStepTimer -= tickClock.scale;
    if (bot.aiMemory.squadStepTimer <= 0) {
        bot.aiMemory.squadAngle += random(-65, 65);
        bot.aiMemory.squadDrift = random(-115, 115);
        bot.aiMemory.squadStepPower = random(0.45, 0.9);
        bot.aiMemory.squadStepTimer = floor(random(48, 110));
    }
    var desired = aiSettings.squadFollowComfortRange + bot.aiMemory.squadDrift;
    var anchor = {
        x: playerPos.x + cos(bot.aiMemory.squadAngle) * desired,
        y: playerPos.y + sin(bot.aiMemory.squadAngle) * desired,
        z: playerPos.z
    };
    if (abs(bot.pos.z - playerPos.z) > 0.2) {
        aiMoveToward(bot, playerPos, aiSettings.squadFollowPull);
    } else if (d > aiSettings.squadFollowMaxRange) {
        aiMoveToward(bot, anchor, aiSettings.squadFollowPull);
    } else if (d < aiSettings.squadFollowMinRange) {
        aiMoveAway(bot, playerPos, 0.5);
    } else if (d > aiSettings.squadFollowComfortRange) {
        aiMoveToward(bot, anchor, 0.4);
    } else if (dist(bot.pos.x, bot.pos.y, anchor.x, anchor.y) > 80) {
        aiMoveToward(bot, anchor, bot.aiMemory.squadStepPower);
    }
    if (crowdingAlly && crowdingAlly.pos) {
        aiMoveAway(bot, crowdingAlly.pos, 0.45);
    }
};
var drawB1Hands = function (size) {
    pushStyle();
    pushMatrix();
    scale(size / 212);
    fill(193, 177, 136);
    stroke(95, 84, 62);
    strokeWeight(6);
    ellipse(-70, -122, 58, 58);
    ellipse(70, -122, 58, 58);
    popMatrix();
    popStyle();
};
var drawBattleDroid = function (x, y, size, hideHands) {
    pushStyle();
    pushMatrix();
    translate(x, y);
    scale(size / 212);
    stroke(69, 65, 52);
    strokeWeight(6);
    fill(139, 128, 98);
    ellipse(-68, -3, 39, 63);
    ellipse(68, -3, 39, 63);
    fill(113, 108, 87);
    ellipse(0, -2, 148, 145);
    fill(195, 180, 142);
    stroke(94, 84, 63);
    beginShape();
    vertex(-13, -122);
    vertex(-30, -75);
    vertex(-43, -10);
    vertex(-39, 91);
    vertex(-17, 109);
    vertex(-5, 115);
    vertex(5, 115);
    vertex(17, 109);
    vertex(39, 91);
    vertex(43, -10);
    vertex(30, -75);
    vertex(13, -122);
    endShape(CLOSE);
    noFill();
    stroke(178, 162, 125);
    strokeWeight(6);
    arc(0, -6, 78, 22, 0, 180);
    noStroke();
    fill(49, 46, 37);
    ellipse(-17, -35, 10, 16);
    ellipse(17, -35, 10, 16);
    popMatrix();
    popStyle();
    if (!hideHands) {
        pushMatrix();
        translate(x, y);
        drawB1Hands(size);
        popMatrix();
    }
};
var drawMuzzleFlash = function (x, y, angle, strength, size) {
    pushMatrix();
    pushStyle();
    translate(x, y);
    rotate(angle);
    var radius = size * 1.35 * (0.55 + 0.45 * strength);
    noStroke();
    fill(255, 105, 35, 125 * strength);
    ellipse(radius * 0.35, 0, radius * 3.4, radius * 2.6);
    fill(255, 185, 80, 250 * strength);
    quad(-radius * 0.2, 0, radius * 0.3, -radius * 0.8, radius * 2, 0, radius * 0.3, radius * 0.8);
    fill(255, 250, 217, 255 * strength);
    quad(-radius * 0.15, 0, radius * 0.2, -radius * 0.4, radius * 1.6, 0, radius * 0.2, radius * 0.4);
    popStyle();
    popMatrix();
};
var drawB2Hands = function (size, aimDelta, pose, recoilKick, flash) {
    pushStyle();
    pushMatrix();
    scale((size * 1.65) / 212);
    rectMode(CENTER);
    for (var side = -1; side <= 1; side += 2) {
        pushMatrix();
        translate(side * 133, -20);
        rotate(side === 1 ? aimDelta || 0 : -12 * (1 - (pose || 0)));
        if (side === 1 && recoilKick) {
            translate(0, recoilKick * 212 / (size * 1.65));
        }
        translate(0, -80);
        stroke(31, 40, 49);
        strokeWeight(7);
        fill(48, 61, 72);
        rect(0, 23, 34, 39, 9);
        fill(100, 122, 139);
        rect(0, -8, 62, 81, 16);
        noStroke();
        fill(145, 163, 175);
        rect(-13, -15, 15, 51, 5);
        if (side === 1) {
            stroke(25, 33, 40);
            strokeWeight(5);
            fill(54, 68, 80);
            rect(-11, -57, 15, 32, 4);
            rect(11, -57, 15, 32, 4);
            noStroke();
            fill(14, 21, 28);
            rect(-11, -70, 8, 7, 2);
            rect(11, -70, 8, 7, 2);
            if (flash > 0) {
                drawMuzzleFlash(-11, -74, -90, flash, 11);
                drawMuzzleFlash(11, -74, -90, flash, 11);
            }
        }
        popMatrix();
    }
    popMatrix();
    popStyle();
};
var drawB2Droid = function (x, y, size, hideHands) {
    pushStyle();
    pushMatrix();
    translate(x, y);
    scale((size * 1.65) / 212);
    rectMode(CENTER);
    stroke(30, 39, 48);
    strokeWeight(8);
    fill(48, 63, 77);
    ellipse(-104, 0, 61, 57);
    ellipse(104, 0, 61, 57);
    fill(91, 112, 130);
    beginShape();
    vertex(-87, -42);
    vertex(-54, -65);
    vertex(54, -65);
    vertex(87, -42);
    vertex(99, 8);
    vertex(77, 57);
    vertex(40, 74);
    vertex(-40, 74);
    vertex(-77, 57);
    vertex(-99, 8);
    endShape(CLOSE);
    noStroke();
    fill(135, 155, 172);
    beginShape();
    vertex(-78, -35);
    vertex(-47, -53);
    vertex(47, -53);
    vertex(78, -35);
    vertex(66, -9);
    vertex(-66, -9);
    endShape(CLOSE);
    fill(66, 85, 103);
    beginShape();
    vertex(-83, 13);
    vertex(83, 13);
    vertex(67, 50);
    vertex(36, 64);
    vertex(-36, 64);
    vertex(-67, 50);
    endShape(CLOSE);
    for (var side = -1; side <= 1; side += 2) {
        pushMatrix();
        translate(side * 105, -18);
        rotate(side * -12);
        stroke(31, 42, 53);
        strokeWeight(7);
        fill(88, 110, 130);
        ellipse(0, 0, 91, 93);
        noStroke();
        fill(138, 159, 176);
        ellipse(-8, -10, 61, 59);
        popMatrix();
    }
    stroke(27, 38, 49);
    strokeWeight(6);
    fill(39, 54, 68);
    ellipse(0, -39, 77, 66);
    fill(100, 124, 144);
    ellipse(0, -45, 58, 51);
    noStroke();
    fill(146, 166, 181);
    ellipse(-6, -51, 34, 28);
    fill(71, 93, 112);
    rect(0, -68, 31, 8, 4);
    fill(229, 68, 53);
    rect(9, -72, 8, 4, 2);
    popMatrix();
    popStyle();
    if (!hideHands) {
        pushMatrix();
        translate(x, y);
        drawB2Hands(size);
        popMatrix();
    }
};

var drawVaderHands = function (size) {
    pushStyle();
    pushMatrix();
    scale(size / 212);
    rectMode(CENTER);
    stroke(10, 12, 16);
    strokeWeight(7);
    for (var side = -1; side <= 1; side += 2) {
        pushMatrix();
        translate(side * 119, -107);
        rotate(side * -10);
        fill(30, 33, 40);
        rect(0, 12, 42, 38, 9);
        fill(40, 44, 52);
        ellipse(0, -7, 56, 56);
        noFill();
        stroke(68, 73, 83);
        strokeWeight(3);
        arc(-2, -9, 35, 32, 190, 280);
        line(-12, 10, 12, 10);
        stroke(10, 12, 16);
        strokeWeight(7);
        popMatrix();
    }
    popMatrix();
    popStyle();
};
var drawDarthVader = function (x, y, size, hideHands) {
    pushStyle();
    pushMatrix();
    translate(x, y);
    scale(size / 212);
    rectMode(CENTER);
    stroke(9, 12, 17);
    strokeWeight(8);
    fill(36, 40, 49);
    beginShape();
    vertex(-56, -89);
    vertex(-83, -53);
    vertex(-97, 15);
    vertex(-120, 72);
    vertex(-81, 91);
    vertex(0, 100);
    vertex(81, 91);
    vertex(120, 72);
    vertex(97, 15);
    vertex(83, -53);
    vertex(56, -89);
    endShape(CLOSE);
    noStroke();
    fill(60, 66, 78);
    beginShape();
    vertex(-77, -31);
    vertex(-85, 21);
    vertex(-106, 67);
    vertex(-82, 76);
    vertex(-59, 24);
    vertex(-59, -35);
    endShape(CLOSE);
    fill(21, 24, 31);
    beginShape();
    vertex(77, -31);
    vertex(85, 21);
    vertex(106, 67);
    vertex(82, 76);
    vertex(59, 24);
    vertex(59, -35);
    endShape(CLOSE);
    stroke(12, 15, 21);
    strokeWeight(6);
    fill(30, 34, 43);
    ellipse(0, -21, 158, 181);
    noStroke();
    fill(52, 59, 72);
    ellipse(-16, -43, 111, 124);
    fill(37, 43, 54);
    ellipse(4, -24, 111, 143);
    fill(80, 87, 100);
    beginShape();
    vertex(-6, -108);
    vertex(2, -109);
    vertex(8, -62);
    vertex(7, 46);
    vertex(-3, 55);
    vertex(-5, -61);
    endShape(CLOSE);
    fill(112, 119, 130);
    rect(-1, -83, 5, 30, 3);
    noFill();
    stroke(77, 84, 97);
    strokeWeight(4);
    arc(-3, -24, 133, 157, 198, 254);
    stroke(10, 12, 17);
    strokeWeight(4);
    fill(58, 63, 74);
    beginShape();
    vertex(-36, -99);
    vertex(-30, -118);
    vertex(-13, -124);
    vertex(0, -118);
    vertex(13, -124);
    vertex(30, -118);
    vertex(36, -99);
    vertex(17, -104);
    vertex(0, -101);
    vertex(-17, -104);
    endShape(CLOSE);
    noStroke();
    fill(12, 15, 21);
    beginShape();
    vertex(-29, -109);
    vertex(-15, -119);
    vertex(-5, -110);
    vertex(-17, -106);
    endShape(CLOSE);
    beginShape();
    vertex(29, -109);
    vertex(15, -119);
    vertex(5, -110);
    vertex(17, -106);
    endShape(CLOSE);
    fill(79, 85, 96);
    beginShape();
    vertex(0, -111);
    vertex(-11, -128);
    vertex(11, -128);
    endShape(CLOSE);
    stroke(19, 23, 31);
    strokeWeight(2);
    line(-5, -119, -5, -126);
    line(0, -116, 0, -127);
    line(5, -119, 5, -126);
    popMatrix();
    popStyle();
    if (!hideHands) {
        pushMatrix();
        translate(x, y);
        drawVaderHands(size);
        popMatrix();
    }
};

var drawYoda = function (x, y, size, hideHands) {
    pushStyle();
    pushMatrix();
    translate(x, y);
    scale(size / 212);
    stroke(34, 50, 31);
    strokeWeight(6);
    fill(94, 132, 67);
    beginShape();
    vertex(-39, -39);
    bezierVertex(-79, -61, -119, -91, -139, -115);
    bezierVertex(-120, -65, -116, -23, -88, -5);
    bezierVertex(-111, 18, -120, 49, -111, 72);
    bezierVertex(-77, 62, -50, 45, -35, 30);
    bezierVertex(-20, 49, 20, 49, 35, 30);
    bezierVertex(50, 45, 77, 62, 111, 72);
    bezierVertex(120, 49, 111, 18, 88, -5);
    bezierVertex(116, -23, 120, -65, 139, -115);
    bezierVertex(119, -91, 79, -61, 39, -39);
    bezierVertex(19, -52, -19, -52, -39, -39);
    endShape(CLOSE);
    noStroke();
    fill(135, 169, 91);
    beginShape();
    vertex(-39, -35);
    bezierVertex(-69, -48, -105, -76, -125, -99);
    bezierVertex(-108, -57, -102, -25, -79, -12);
    bezierVertex(-61, -24, -49, -31, -39, -35);
    endShape(CLOSE);
    beginShape();
    vertex(39, -35);
    bezierVertex(69, -48, 105, -76, 125, -99);
    bezierVertex(108, -57, 102, -25, 79, -12);
    bezierVertex(61, -24, 49, -31, 39, -35);
    endShape(CLOSE);
    fill(76, 112, 57);
    beginShape();
    vertex(-83, 4);
    bezierVertex(-63, -20, -40, -37, -23, -39);
    bezierVertex(-34, -9, -34, 14, -50, 30);
    bezierVertex(-60, 41, -78, 52, -99, 57);
    bezierVertex(-101, 37, -95, 17, -83, 4);
    endShape(CLOSE);
    beginShape();
    vertex(83, 4);
    bezierVertex(63, -20, 40, -37, 23, -39);
    bezierVertex(34, -9, 34, 14, 50, 30);
    bezierVertex(60, 41, 78, 52, 99, 57);
    bezierVertex(101, 37, 95, 17, 83, 4);
    endShape(CLOSE);
    stroke(59, 84, 45);
    strokeWeight(4);
    fill(117, 153, 76);
    ellipse(0, 0, 82, 103);
    noFill();
    stroke(174, 190, 113);
    strokeWeight(3);
    arc(-5, -17, 34, 25, 205, 335);
    arc(7, 2, 42, 28, 20, 145);
    arc(-4, 22, 31, 20, 205, 330);
    noStroke();
    fill(63, 79, 48);
    ellipse(-15, -4, 6, 7);
    ellipse(15, -4, 6, 7);
    fill(180, 151, 91);
    ellipse(0, 5, 10, 9);
    popMatrix();
    popStyle();
};

var drawDarthMaul = function (size, hideHands) {
    pushStyle();
    pushMatrix();
    scale(size / 200);
    ellipseMode(CENTER);
    rectMode(CENTER);
    stroke(13, 12, 16);
    strokeWeight(7);
    fill(35, 32, 40);
    rect(0, 25, 116, 102, 18);
    ellipse(-69, 15, 61, 67);
    ellipse(69, 15, 61, 67);
    noStroke();
    fill(58, 52, 61);
    quad(-91, 14, -60, -5, -51, 14, -82, 33);
    quad(91, 14, 60, -5, 51, 14, 82, 33);
    fill(23, 22, 28);
    rect(0, 65, 102, 14, 3);
    stroke(40, 14, 18);
    strokeWeight(7);
    fill(176, 35, 42);
    ellipse(0, -17, 133, 151);
    noStroke();
    fill(29, 19, 23);
    quad(-13, -91, 13, -91, 6, -35, -6, -35);
    quad(-62, -53, -24, -62, -37, -17, -65, -1);
    quad(62, -53, 24, -62, 37, -17, 65, -1);
    quad(-55, 21, -21, -7, 0, 31, -21, 52);
    quad(55, 21, 21, -7, 0, 31, 21, 52);
    stroke(43, 27, 25);
    strokeWeight(4);
    fill(228, 205, 159);
    for (var side = -1; side <= 1; side += 2) {
        triangle(side * 16, -76, side * 28, -100, side * 34, -72);
        triangle(side * 44, -54, side * 63, -78, side * 62, -44);
        triangle(side * 55, -23, side * 77, -36, side * 67, -9);
    }
    popMatrix();
    popStyle();
    if (!hideHands) {
        drawVaderHands(size);
    }
};
var drawYodaHands = function (size) {
    pushStyle();
    pushMatrix();
    scale(size / 200);
    noStroke();
    fill(133, 165, 91);
    ellipse(-77, 53, 30, 32);
    ellipse(77, 53, 30, 32);
    popMatrix();
    popStyle();
};
var drawYoda = function (size, hideHands) {
    pushStyle();
    pushMatrix();
    scale(size / 200);
    ellipseMode(CENTER);
    noStroke();
    fill(77, 64, 44);
    ellipse(-29, 106, 27, 36);
    ellipse(29, 106, 27, 36);
    fill(161, 139, 101);
    beginShape();
    vertex(-44, 24);
    bezierVertex(-69, 29, -77, 48, -69, 75);
    vertex(-46, 118);
    bezierVertex(-22, 132, 22, 132, 46, 118);
    vertex(69, 75);
    bezierVertex(77, 48, 69, 29, 44, 24);
    endShape(CLOSE);
    fill(194, 176, 133);
    beginShape();
    vertex(-49, 32);
    bezierVertex(-66, 42, -64, 65, -51, 91);
    vertex(-30, 111);
    bezierVertex(-8, 120, 8, 120, 30, 111);
    vertex(51, 91);
    bezierVertex(64, 65, 66, 42, 49, 32);
    endShape(CLOSE);
    fill(147, 127, 92);
    beginShape();
    vertex(-47, 36);
    bezierVertex(-73, 30, -91, 39, -95, 55);
    vertex(-78, 68);
    bezierVertex(-61, 60, -51, 53, -39, 48);
    endShape(CLOSE);
    beginShape();
    vertex(47, 36);
    bezierVertex(73, 30, 91, 39, 95, 55);
    vertex(78, 68);
    bezierVertex(61, 60, 51, 53, 39, 48);
    endShape(CLOSE);
    stroke(125, 106, 76, 120);
    strokeWeight(3);
    line(-18, 76, -30, 108);
    line(18, 76, 30, 108);
    noStroke();
    translate(0, 66);
    scale(1.2);
    stroke(48, 77, 42);
    strokeWeight(4);
    for (var side = -1; side <= 1; side += 2) {
        fill(105, 153, 73);
        beginShape();
        vertex(side * 44, -81);
        bezierVertex(side * 76, -90, side * 121, -107, side * 151, -104);
        bezierVertex(side * 137, -79, side * 106, -47, side * 58, -28);
        bezierVertex(side * 50, -43, side * 45, -63, side * 44, -81);
        endShape(CLOSE);
        noStroke();
        fill(133, 169, 89);
        beginShape();
        vertex(side * 63, -76);
        bezierVertex(side * 88, -85, side * 123, -96, side * 140, -98);
        bezierVertex(side * 118, -69, side * 93, -53, side * 66, -43);
        endShape(CLOSE);
        fill(80, 127, 63, 100);
        triangle(side * 66, -44, side * 108, -59, side * 140, -98);
    }
    stroke(50, 82, 46);
    strokeWeight(5);
    fill(116, 158, 78);
    ellipse(0, -55, 126, 110);
    noStroke();
    fill(151, 184, 102);
    ellipse(-8, -67, 100, 80);
    fill(174, 197, 121, 95);
    ellipse(-16, -83, 64, 32);
    popMatrix();
    popStyle();
    if (!hideHands) {
        drawYodaHands(size);
    }
};
var drawAhsokaHands = function (size) {
    pushStyle();
    pushMatrix();
    scale(size / 212);
    ellipseMode(CENTER);
    stroke(24, 24, 27);
    strokeWeight(5);
    fill(255, 145, 39);
    ellipse(-116, -43, 44, 44);
    ellipse(116, -43, 44, 44);
    popMatrix();
    popStyle();
};
var drawAhsoka = function (size, hideHands) {
    pushStyle();
    pushMatrix();
    scale(size / 212);
    ellipseMode(CENTER);
    stroke(24, 24, 27);
    strokeWeight(5);
    pushMatrix();
    translate(0, -46);
    fill(49, 48, 52);
    beginShape();
    vertex(-24, 52);
    bezierVertex(-31, 69, -34, 87, -25, 96);
    bezierVertex(-11, 104, 11, 104, 25, 96);
    bezierVertex(34, 87, 31, 69, 24, 52);
    endShape(CLOSE);
    fill(255, 145, 39);
    triangle(-20, 54, 20, 54, 0, 72);
    popMatrix();
    stroke(24, 24, 27);
    strokeWeight(5);
    fill(255, 145, 39);
    ellipse(0, -54, 100, 92);
    noStroke();
    fill(249, 246, 240);
    triangle(-6, -91, 6, -91, 0, -49);
    quad(-26, -76, -11, -65, -9, -55, -22, -65);
    quad(26, -76, 11, -65, 9, -55, 22, -65);
    stroke(24, 24, 27);
    strokeWeight(5);
    pushMatrix();
    translate(0, -12);
    scale(1, -1);
    fill(242, 237, 229);
    beginShape();
    vertex(-75, -99);
    bezierVertex(-81, -105, -80, -88, -78, -75);
    bezierVertex(-75, -53, -82, -35, -84, -20);
    bezierVertex(-91, 8, -85, 26, -78, 44);
    bezierVertex(-73, 69, -63, 94, -41, 109);
    bezierVertex(-34, 114, -29, 109, -31, 99);
    bezierVertex(-37, 81, -39, 67, -34, 53);
    bezierVertex(-13, 67, 13, 67, 34, 53);
    bezierVertex(39, 67, 37, 81, 31, 99);
    bezierVertex(29, 109, 34, 114, 41, 109);
    bezierVertex(63, 94, 73, 69, 78, 44);
    bezierVertex(85, 26, 91, 8, 84, -20);
    bezierVertex(82, -35, 75, -53, 78, -75);
    bezierVertex(80, -88, 81, -105, 75, -99);
    bezierVertex(61, -88, 46, -70, 39, -55);
    bezierVertex(39, -32, 23, -20, 0, -20);
    bezierVertex(-23, -20, -39, -32, -39, -55);
    bezierVertex(-46, -70, -61, -88, -75, -99);
    endShape(CLOSE);
    noStroke();
    fill(95, 130, 178);
    for (var side = -1; side <= 1; side += 2) {
        pushMatrix();
        scale(side, 1);
        beginShape();
        vertex(75, -95);
        bezierVertex(77, -96, 76, -85, 75, -75);
        bezierVertex(73, -57, 77, -45, 78, -35);
        bezierVertex(70, -28, 62, -20, 55, -11);
        bezierVertex(59, -30, 57, -45, 49, -63);
        vertex(37, -55);
        bezierVertex(48, -69, 65, -87, 75, -95);
        endShape(CLOSE);
        beginShape();
        vertex(81, -16);
        bezierVertex(84, -7, 85, 3, 84, 13);
        bezierVertex(75, 27, 56, 32, 44, 43);
        bezierVertex(35, 50, 30, 57, 25, 62);
        bezierVertex(29, 46, 40, 34, 53, 27);
        bezierVertex(67, 18, 77, 1, 81, -16);
        endShape(CLOSE);
        beginShape();
        vertex(75, 46);
        bezierVertex(72, 57, 68, 69, 62, 78);
        bezierVertex(53, 82, 43, 82, 35, 79);
        vertex(34, 66);
        bezierVertex(48, 71, 64, 59, 75, 46);
        endShape(CLOSE);
        beginShape();
        vertex(58, 84);
        bezierVertex(53, 94, 46, 102, 39, 106);
        bezierVertex(35, 108, 33, 105, 34, 99);
        vertex(36, 91);
        bezierVertex(43, 92, 51, 89, 58, 84);
        endShape(CLOSE);
        popMatrix();
    }
    popMatrix();
    popMatrix();
    popStyle();
    if (!hideHands) {
        drawAhsokaHands(size);
    }
};
var drawPlayerVector = function (skin, size, hideHands) {
    if (skin === "Ahsoka Tano") {
        drawAhsoka(size, hideHands);
        return;
    }
    if (skin === "Yoda") {
        drawYoda(size, hideHands);
        return;
    }
    if (skin === "Clone Trooper") {
        drawCloneTrooper(0, 0, size, hideHands);
        return;
    }
    if (skin === "Luke Skywalker") {
        drawLukeSkywalker(0, 0, size, hideHands);
        return;
    }
    if (skin === "Darth Vader") {
        drawDarthVader(0, 0, size, hideHands);
        return;
    }
    if (skin === "Darth Maul") {
        drawDarthMaul(size, hideHands);
        return;
    }
    if (skin === "Super Battle Droid" || skin === "B2 Super Battle Droid") {
        drawB2Droid(0, 0, size, hideHands);
        return;
    }
    if (skin === "Battle Droid" || skin === "B1 Battle Droid") {
        drawBattleDroid(0, 0, size, hideHands);
        return;
    }
    var drawSpriteHands = !hideHands;
    pushMatrix();
    scale(size / 212);
    translate(-212, -203);
    rectMode(CENTER);
    switch (skin) {
        case "First Order Stormtrooper": {
            strokeWeight(5);
            pushMatrix();
            translate(200, 200);
            rotate(5);
            fill(230);
            stroke(196, 196, 196);
            beginShape();
            curveVertex(-68, -86);
            curveVertex(-32, -91);
            curveVertex(-21, -92);
            curveVertex(-14, -90);
            curveVertex(9, -92);
            curveVertex(21, -95);
            curveVertex(24, -97);
            curveVertex(60, -98);
            curveVertex(100, -30);
            curveVertex(99, 54);
            curveVertex(33, 105);
            curveVertex(-51, 84);
            curveVertex(-84, 9);
            curveVertex(-68, -86);
            curveVertex(-32, -91);
            curveVertex(-21, -67);
            endShape();
            popMatrix();
            pushMatrix();
            translate(216, 168);
            scale(0.65, 0.78);
            rotate(0);
            fill(50);
            stroke(31, 31, 31);
            strokeWeight(5);
            beginShape();
            curveVertex(-84, -15);
            curveVertex(-1, -51);
            curveVertex(49, -51);
            curveVertex(82, 18);
            curveVertex(72, 58);
            curveVertex(56, -21);
            curveVertex(26, -44);
            curveVertex(-74, -35);
            curveVertex(-80, 55);
            curveVertex(-90, 56);
            curveVertex(-84, -49);
            curveVertex(-1, -51);
            curveVertex(68, -90);
            endShape();
            popMatrix();
            pushMatrix();
            translate(202, 207);
            scale(0.78);
            rotate(5);
            fill(242, 242, 242);
            stroke(237, 237, 237);
            strokeWeight(5);
            beginShape();
            curveVertex(-68, -86);
            curveVertex(-32, -73);
            curveVertex(-21, -73);
            curveVertex(-14, -71);
            curveVertex(9, -77);
            curveVertex(21, -75);
            curveVertex(24, -76);
            curveVertex(60, -74);
            curveVertex(100, -30);
            curveVertex(99, 54);
            curveVertex(33, 105);
            curveVertex(-51, 84);
            curveVertex(-84, 9);
            curveVertex(-68, -58);
            curveVertex(-32, -71);
            curveVertex(-21, -85);
            endShape();
            popMatrix();
                //hands
            if (drawSpriteHands) {
                fill(250);
                stroke(214, 214, 214);
                strokeWeight(10);
                ellipse(90, 103, 70, 70);
                ellipse(326, 103, 70, 70);
            }
        }
        break;
        case "Shadowtrooper": {
            strokeWeight(5);
            pushMatrix();
            translate(200, 200);
            rotate(5);
            fill(26);
            stroke(23, 23, 23);
            beginShape();
            curveVertex(-68, -86);
            curveVertex(-32, -91);
            curveVertex(-21, -92);
            curveVertex(-14, -90);
            curveVertex(9, -92);
            curveVertex(21, -95);
            curveVertex(24, -97);
            curveVertex(60, -98);
            curveVertex(100, -30);
            curveVertex(99, 54);
            curveVertex(33, 105);
            curveVertex(-51, 84);
            curveVertex(-84, 9);
            curveVertex(-68, -86);
            curveVertex(-32, -91);
            curveVertex(-21, -67);
            endShape();
            popMatrix();
            pushMatrix();
            translate(216, 168);
            scale(0.65, 0.78);
            rotate(0);
            fill(0, 0, 0);
            stroke(0, 0, 0);
            strokeWeight(6);
            beginShape();
            curveVertex(-84, -15);
            curveVertex(-1, -51);
            curveVertex(49, -51);
            curveVertex(82, 18);
            curveVertex(72, 58);
            curveVertex(56, -21);
            curveVertex(26, -44);
            curveVertex(-74, -35);
            curveVertex(-80, 55);
            curveVertex(-90, 56);
            curveVertex(-84, -49);
            curveVertex(-1, -51);
            curveVertex(68, -90);
            endShape();
            popMatrix();
            pushMatrix();
            translate(202, 207);
            scale(0.78);
            rotate(5);
            fill(15, 15, 15);
            stroke(15, 15, 15);
            strokeWeight(5);
            beginShape();
            curveVertex(-68, -86);
            curveVertex(-32, -73);
            curveVertex(-21, -73);
            curveVertex(-14, -71);
            curveVertex(9, -77);
            curveVertex(21, -75);
            curveVertex(24, -76);
            curveVertex(60, -74);
            curveVertex(100, -30);
            curveVertex(99, 54);
            curveVertex(33, 105);
            curveVertex(-51, 84);
            curveVertex(-84, 9);
            curveVertex(-68, -58);
            curveVertex(-32, -71);
            curveVertex(-21, -85);
            endShape();
            popMatrix();
                //hands
            if (drawSpriteHands) {
                fill(38, 38, 38);
                stroke(23);
                strokeWeight(10);
                ellipse(90, 103, 70, 70);
                ellipse(326, 103, 70, 70);
            }
        }
        break;
        case "Heavy Shoretrooper": {
            strokeWeight(5);
            pushMatrix();
            translate(200, 200);
            rotate(5);
            fill(222, 213, 162);
            stroke(202, 193, 136);
            beginShape();
            curveVertex(-68, -114);
            curveVertex(-32, -106);
            curveVertex(-24, -107);
            curveVertex(-14, -108);
            curveVertex(9, -113);
            curveVertex(21, -111);
            curveVertex(24, -110);
            curveVertex(60, -83);
            curveVertex(100, -30);
            curveVertex(99, 54);
            curveVertex(33, 105);
            curveVertex(-51, 84);
            curveVertex(-84, 9);
            curveVertex(-68, -55);
            curveVertex(-32, -106);
            curveVertex(-21, -134);
            endShape();
            popMatrix();
            fill(117, 117, 117);
            noStroke();
            rect(205, 131, 40, 86);
            pushMatrix();
            translate(216, 172);
            scale(0.65, 0.78);
            rotate(0);
            fill(50);
            stroke(31, 31, 31);
            strokeWeight(5);
            beginShape();
            curveVertex(-84, -15);
            curveVertex(-1, -51);
            curveVertex(49, -51);
            curveVertex(82, 18);
            curveVertex(72, 58);
            curveVertex(56, -21);
            curveVertex(26, -44);
            curveVertex(-74, -35);
            curveVertex(-80, 55);
            curveVertex(-90, 56);
            curveVertex(-84, -49);
            curveVertex(-1, -51);
            curveVertex(68, -90);
            endShape();
            popMatrix();
            pushMatrix();
            translate(202, 207);
            scale(0.78);
            rotate(5);
            fill(202, 193, 136);
            stroke(173, 162, 109);
            strokeWeight(5);
            beginShape();
            curveVertex(-68, -86);
            curveVertex(-32, -73);
            curveVertex(-21, -73);
            curveVertex(-14, -71);
            curveVertex(9, -77);
            curveVertex(21, -75);
            curveVertex(24, -76);
            curveVertex(60, -74);
            curveVertex(100, -30);
            curveVertex(99, 54);
            curveVertex(33, 105);
            curveVertex(-51, 84);
            curveVertex(-84, 9);
            curveVertex(-68, -58);
            curveVertex(-32, -71);
            curveVertex(-21, -85);
            endShape();
            popMatrix();
                //hands
            if (drawSpriteHands) {
                fill(56, 56, 56);
                stroke(15, 15, 15);
                strokeWeight(10);
                ellipse(90, 103, 70, 70);
                ellipse(326, 103, 70, 70);
                fill(202, 193, 136);
                stroke(184, 176, 128);
                arc(90, 103, 70, 70, -14, 175);
                arc(326, 103, 70, 70, 9, 194);
                fill(112, 112, 112);
                stroke(23, 23, 23);
                strokeWeight(5);
                rect(204, 105, 23, 31, 0, 0, 100, 100);
                fill(133, 133, 133);
                noStroke();
                rect(205, 220, 40, 151, 10);
            }
        }
        break;
        case "Shoretrooper": {
            strokeWeight(5);
            pushMatrix();
            translate(200, 200);
            rotate(5);
            fill(222, 213, 162);
            stroke(202, 193, 136);
            beginShape();
            curveVertex(-68, -114);
            curveVertex(-32, -106);
            curveVertex(-24, -107);
            curveVertex(-14, -108);
            curveVertex(9, -113);
            curveVertex(21, -111);
            curveVertex(24, -110);
            curveVertex(60, -83);
            curveVertex(100, -30);
            curveVertex(99, 54);
            curveVertex(33, 105);
            curveVertex(-51, 84);
            curveVertex(-84, 9);
            curveVertex(-68, -55);
            curveVertex(-32, -106);
            curveVertex(-21, -134);
            endShape();
            popMatrix();
            pushMatrix();
            translate(216, 172);
            scale(0.65, 0.78);
            rotate(0);
            fill(50);
            stroke(31, 31, 31);
            strokeWeight(5);
            beginShape();
            curveVertex(-84, -15);
            curveVertex(-1, -51);
            curveVertex(49, -51);
            curveVertex(82, 18);
            curveVertex(72, 58);
            curveVertex(56, -21);
            curveVertex(26, -44);
            curveVertex(-74, -35);
            curveVertex(-80, 55);
            curveVertex(-90, 56);
            curveVertex(-84, -49);
            curveVertex(-1, -51);
            curveVertex(68, -90);
            endShape();
            popMatrix();
            pushMatrix();
            translate(202, 207);
            scale(0.78);
            rotate(5);
            fill(202, 193, 136);
            stroke(173, 162, 109);
            strokeWeight(5);
            beginShape();
            curveVertex(-68, -86);
            curveVertex(-32, -73);
            curveVertex(-21, -73);
            curveVertex(-14, -71);
            curveVertex(9, -77);
            curveVertex(21, -75);
            curveVertex(24, -76);
            curveVertex(60, -74);
            curveVertex(100, -30);
            curveVertex(99, 54);
            curveVertex(33, 105);
            curveVertex(-51, 84);
            curveVertex(-84, 9);
            curveVertex(-68, -58);
            curveVertex(-32, -71);
            curveVertex(-21, -85);
            endShape();
            popMatrix();
                //hands
            if (drawSpriteHands) {
                fill(56, 56, 56);
                stroke(15, 15, 15);
                strokeWeight(10);
                ellipse(90, 103, 70, 70);
                ellipse(326, 103, 70, 70);
                fill(202, 193, 136);
                stroke(184, 176, 128);
                arc(90, 103, 70, 70, -14, 175);
                arc(326, 103, 70, 70, 9, 194);
                fill(112, 112, 112);
                stroke(23, 23, 23);
                strokeWeight(5);
                rect(204, 105, 23, 31, 0, 0, 100, 100);
            }
        }
        break;
        case "Kylo Ren": {
            strokeWeight(5);
            pushMatrix();
            translate(200, 200);
            rotate(5);
            fill(26);
            stroke(23, 23, 23);
            beginShape();
            curveVertex(-68, -86);
            curveVertex(-32, -101);
            curveVertex(-21, -105);
            curveVertex(-14, -107);
            curveVertex(9, -110);
            curveVertex(21, -108);
            curveVertex(24, -109);
            curveVertex(60, -98);
            curveVertex(100, -30);
            curveVertex(99, 54);
            curveVertex(33, 105);
            curveVertex(-51, 84);
            curveVertex(-84, 9);
            curveVertex(-68, -80);
            curveVertex(-32, -100);
            curveVertex(-21, -94);
            endShape();
            popMatrix();
            pushMatrix();
            translate(216, 168);
            scale(0.65, 0.78);
            rotate(0);
            fill(0, 0, 0);
            stroke(184, 184, 184);
            strokeWeight(37);
            beginShape();
            curveVertex(-84, -15);
            curveVertex(-1, -51);
            curveVertex(49, -51);
            curveVertex(82, 18);
            curveVertex(72, 58);
            curveVertex(56, -21);
            curveVertex(26, -44);
            curveVertex(-74, -35);
            curveVertex(-80, 55);
            curveVertex(-90, 56);
            curveVertex(-84, -49);
            curveVertex(-1, -51);
            curveVertex(68, -90);
            endShape();
            popMatrix();
            pushMatrix();
            translate(216, 168);
            scale(0.73, 0.91);
            rotate(0);
            fill(184);
            stroke(0, 0, 0);
            strokeWeight(1);
            beginShape();
            curveVertex(-84, -15);
            curveVertex(-1, -51);
            curveVertex(49, -51);
            curveVertex(82, 18);
            curveVertex(72, 58);
            curveVertex(56, -21);
            curveVertex(26, -44);
            curveVertex(-74, -35);
            curveVertex(-80, 55);
            curveVertex(-90, 56);
            curveVertex(-84, -49);
            curveVertex(-1, -51);
            curveVertex(68, -90);
            endShape();
            popMatrix();
            pushMatrix();
            translate(216, 179);
            scale(0.56, 0.91);
            rotate(0);
            fill(184);
            stroke(0, 0, 0);
            strokeWeight(1);
            beginShape();
            curveVertex(-84, -15);
            curveVertex(-1, -51);
            curveVertex(49, -51);
            curveVertex(82, 18);
            curveVertex(72, 58);
            curveVertex(56, -21);
            curveVertex(26, -44);
            curveVertex(-74, -35);
            curveVertex(-80, 55);
            curveVertex(-90, 56);
            curveVertex(-84, -49);
            curveVertex(-1, -51);
            curveVertex(68, -90);
            endShape();
            popMatrix();
            pushMatrix();
            translate(216, 169);
            scale(0.65, 0.78);
            rotate(0);
            fill(0, 0, 0);
            stroke(0, 0, 0);
            strokeWeight(6);
            beginShape();
            curveVertex(55, -15);
            curveVertex(-1, -51);
            curveVertex(49, -51);
            curveVertex(54, -35);
            curveVertex(51, -41);
            curveVertex(56, -33);
            curveVertex(26, -38);
            curveVertex(-74, -35);
            curveVertex(-80, -32);
            curveVertex(-90, -33);
            curveVertex(-70, -52);
            curveVertex(-1, -51);
            curveVertex(68, -90);
            endShape();
            popMatrix();
            pushMatrix();
            translate(202, 207);
            scale(0.78);
            rotate(5);
            fill(15, 15, 15);
            stroke(15, 15, 15);
            strokeWeight(5);
            beginShape();
            curveVertex(-68, -86);
            curveVertex(-32, -73);
            curveVertex(-21, -73);
            curveVertex(-14, -71);
            curveVertex(9, -77);
            curveVertex(21, -75);
            curveVertex(24, -76);
            curveVertex(60, -74);
            curveVertex(100, -30);
            curveVertex(99, 54);
            curveVertex(33, 105);
            curveVertex(-51, 84);
            curveVertex(-84, 9);
            curveVertex(-68, -58);
            curveVertex(-32, -71);
            curveVertex(-21, -85);
            endShape();
            popMatrix();
                //hands
            if (drawSpriteHands) {
                fill(38, 38, 38);
                stroke(23);
                strokeWeight(10);
                ellipse(90, 103, 70, 70);
                ellipse(326, 103, 70, 70);
            }
        }
        break;
        case "Rebel Trooper": {
            popMatrix();
            pushMatrix();
            scale(size / 200);
            pushMatrix();
            scale(0.85);
            rectMode(CENTER);
            strokeWeight(10);
            fill(207, 185, 135);
            stroke(173, 155, 114);
            ellipse(0, 0, 200, 200);
            noStroke();
            fill(245, 245, 245);
            ellipse(0, 35, 217, 150);
            ellipse(-48, 14, 139, 91);
            ellipse(48, 13, 139, 91);
            fill(0);
            ellipse(-44, -53, 20, 16);
            ellipse(44, -53, 20, 16);
            ellipse(0, 38, 171, 100);
            fill(10);
            ellipse(0, 56, 158, 107);
            noFill();
            stroke(10);
            strokeWeight(8);
            arc(0, 0, 211, 211, -168, -11);
            fill(250);
            noStroke();
            ellipse(0, -104, 59, 23);
            popMatrix();
                //hands
            if (drawSpriteHands) {
                fill(209, 188, 140);
                stroke(173, 155, 114);
                strokeWeight(10);
                ellipse(-110, -97, 70, 70);
                ellipse(110, -97, 70, 70);
            }
        }
        break;
    }
    popMatrix();
};
var skinImageNames = {
    "Ahsoka Tano": "PlayerSkin_AhsokaTano",
    "Yoda": "PlayerSkin_Yoda",
    "Darth Maul": "PlayerSkin_DarthMaul",

    "Darth Vader": "PlayerSkin_DarthVader",

    "Super Battle Droid": "PlayerSkin_SuperBattleDroid",

    "B2 Super Battle Droid": "PlayerSkin_SuperBattleDroid",

    "Battle Droid": "PlayerSkin_BattleDroid",

    "B1 Battle Droid": "PlayerSkin_BattleDroid",

    "First Order Stormtrooper": "PlayerSkin_FirstOrderStormtrooper",

    Shadowtrooper: "PlayerSkin_Shadowtrooper",

    "Shadow Trooper": "PlayerSkin_Shadowtrooper",

    "Heavy Shoretrooper": "PlayerSkin_HeavyShoretrooper",

    Shoretrooper: "PlayerSkin_Shoretrooper",

    "Luke Skywalker": "PlayerSkin_LukeSkywalker",

    "Kylo Ren": "PlayerSkin_KyloRen",

    "Clone Trooper": "PlayerSkin_CloneTrooper",

    "Rebel Trooper": "PlayerSkin_RebelTrooper"
};
var drawSkinHands = function (skinName, size) {
    if (skinName === "Ahsoka Tano") {
        drawAhsokaHands(size);
        return;
    }
    if (skinName === "Yoda") {
        drawYodaHands(size);
        return;
    }
    if (skinName === "Clone Trooper") {
        drawCloneHands(size);
        return;
    }
    if (skinName === "Luke Skywalker") {
        drawLukeHands(size);
        return;
    }
    if (skinName === "Darth Vader" || skinName === "Darth Maul") {
        drawVaderHands(size);
        return;
    }
    if (skinName === "Super Battle Droid" || skinName === "B2 Super Battle Droid") {
        drawB2Hands(size);
        return;
    }
    if (skinName === "Battle Droid" || skinName === "B1 Battle Droid") {
        drawB1Hands(size);
        return;
    }
    pushMatrix();
    if (skinName === "Rebel Trooper" || skinName === "Luke Skywalker") {
        scale(size / 200);
        if (skinName === "Luke Skywalker") {
            fill(219, 197, 143);
        } else {
            fill(209, 188, 140);
        }
        stroke(173, 155, 114);
        strokeWeight(10);
        ellipse(-110, -97, 70, 70);
        ellipse(110, -97, 70, 70);
    } else {
        scale(size / 212);
        translate(-212, -203);
        if (skinName === "First Order Stormtrooper" || skinName === "Clone Trooper") {
            fill(250);
            stroke(214, 214, 214);
            strokeWeight(10);
            if (skinName === "First Order Stormtrooper") {
                ellipse(90, 103, 70, 70);
                ellipse(326, 103, 70, 70);
            } else {
                ellipse(90, 103, 70, 70);
                ellipse(326, 103, 70, 70);
            }
        } else if (skinName === "Shoretrooper" || skinName === "Heavy Shoretrooper") {
            fill(56, 56, 56);
            stroke(15, 15, 15);
            strokeWeight(10);
            ellipse(90, 103, 70, 70);
            ellipse(326, 103, 70, 70);
            fill(202, 193, 136);
            stroke(184, 176, 128);
            arc(90, 103, 70, 70, -14, 175);
            arc(326, 103, 70, 70, 9, 194);
            fill(112, 112, 112);
            stroke(23, 23, 23);
            strokeWeight(5);
            rect(204, 105, 23, 31, 0, 0, 100, 100);
            if (skinName === "Heavy Shoretrooper") {
                fill(133, 133, 133);
                noStroke();
                rect(205, 220, 40, 151, 10);
            }
        } else {
            fill(38, 38, 38);
            stroke(23);
            strokeWeight(10);
            ellipse(90, 103, 70, 70);
            ellipse(326, 103, 70, 70);
        }
    }
    popMatrix();
};
var drawPlayer = function (skin, size, hideHands) {
    if (isB2Droid(skin)) {
        drawB2Droid(0, 0, size, hideHands);
        return;
    }
    var skinImageName = skinImageNames[skin];
    if (skinImageName && typeof loadedImages !== "undefined" && loadedImages[skinImageName]) {
        image(loadedImages[skinImageName], -size, -size, size * 2, size * 2);
        if (!hideHands) {
            drawSkinHands(skin, size);
        }
        return;
    }
    drawPlayerVector(skin, size, hideHands);
};
var getHandColors = function (skinName) {
    var n = ("" + skinName).toLowerCase();
    if (n === "ahsoka tano") {
        return {
            fill: color(255, 145, 39),
            stroke: color(24, 24, 27)
        };
    }
    if (n.indexOf("vader") >= 0) {
        return {
            fill: color(40, 44, 52),
            stroke: color(10, 12, 16)
        };
    }
    if (n.indexOf("super battle droid") >= 0) {
        return {
            fill: color(100, 122, 139),
            stroke: color(31, 40, 49)
        };
    }
    if (n.indexOf("droid") >= 0) {
        return {
            fill: color(196, 174, 130),
            stroke: color(93, 78, 55)
        };
    }
    if (n.indexOf("rebel") >= 0 || n.indexOf("luke") >= 0) {
        return {
            fill: color(219, 197, 143),
            stroke: color(173, 155, 114)
        };
    }
    if (n.indexOf("shore") >= 0) {
        return {
            fill: color(202, 193, 136),
            stroke: color(184, 176, 128)
        };
    }
    if (n.indexOf("shadow") >= 0 || n.indexOf("kylo") >= 0 || n === "darth maul") {
        return {
            fill: color(38, 38, 38),
            stroke: color(23)
        };
    }
    return {
        fill: color(250),
        stroke: color(214, 214, 214)
    };
};

var drawSaberGrip = function (skinName, forceHand) {
    pushStyle();
    var hand = getHandColors(skinName);
    fill(hand.fill);
    stroke(hand.stroke);
    strokeWeight(2);
    //Both gloves wrap the hilt's centerline, one below the other.
    ellipse(0, 3, 13, 12);
    var blend = forceHand || 0;
    blend = blend * blend * (3 - 2 * blend);
    var x = -49 * blend;
    var y = 16 - 30 * blend;
    ellipse(x, y, 13 + 3 * blend, 12 + 8 * blend);

    popStyle();
};
var getB2MouseAim = function (pos, forward, recoilAngle, recoilKick) {
    var armScale = (60 * 1.65) / 212;
    var pivotX = pos.x + cos(forward) * 20 * armScale - sin(forward) * 133 * armScale;
    var pivotY = pos.y + sin(forward) * 20 * armScale + cos(forward) * 133 * armScale;
    var target = screenToWorld(mouseX, mouseY);
    var angle = atan2(target.y - pivotY, target.x - pivotX);
    angle = forward + constrain(angleDifference(angle, forward), -35, 35);
    angle += recoilAngle || 0;
    return {
        x: pivotX + cos(angle) * (150 * armScale - (recoilKick || 0)),
        y: pivotY + sin(angle) * (150 * armScale - (recoilKick || 0)),
        angle: angle,
        delta: angle - forward
    };
};
var blasterMuzzles = {
    F_11D: [116, -1, 17],
    E11: [116, 10, 19],
    Sniper: [180, -0.5, 23],
    Shotgun: [127, 0, 27],
    DL44: [102, 0, 21],
    Bowcaster: [151.3, 0, 28]
};
var renderBlaster = function (gun, skinName, pose, armAim, recoilKick, flash, forceHand) {
    if (isB2Droid(skinName)) {
        drawB2Hands(60, armAim, pose, recoilKick, flash);
        return;
    }
    if (!gun || !gun.render) {
        return;
    }
    if (gun.isLightsaber) {
        gun.render(skinName, forceHand);
        return;
    }
    var tactical = 1 - constrain(pose, 0, 1);
    pushMatrix();
    translate(-15 * constrain(tactical, 0, 1), -35 - 4 * constrain(tactical, 0, 1));
    rotate(-90 + 70 * constrain(tactical, 0, 1));
    scale(0.5, 0.5);
    gun.render();
    if (flash > 0) {
        var muzzle = blasterMuzzles[gun.weaponId] || blasterMuzzles.F_11D;
        drawMuzzleFlash(muzzle[0], muzzle[1], 0, flash, muzzle[2]);
    }
    var hand = getHandColors(skinName);
    pushStyle();
    stroke(hand.stroke);
    strokeWeight(5);
    fill(hand.fill);
    ellipse(20, 8, 24, 21);
    var supportX = gun.weaponId === "Bowcaster" ? 85 : gun.weaponId === "DL44" ? 34 : 70;
    ellipse(supportX, 7, 24, 21);

    popStyle();
    popMatrix();
};
var crosshair = function (x1, y1, x2, y2, r, type, spread) {
    if (type === "spread") {
        stroke(0, 150);
        noFill();
        strokeWeight(dist(x1, y1, x2, y2) / 70);
        pushMatrix();
        translate(x2, y2);
        rotate(r);
        strokeCap(SQUARE);
        arc(0, 0, dist(x1, y1, x2, y2) * 2, dist(x1, y1, x2, y2) * 2, -spread / 2, spread / 2);
        arc(0, 0, dist(x1, y1, x2, y2) * 1.5, dist(x1, y1, x2, y2) * 1.5, -spread / 3, spread / 3);
        line(dist(x1, y1, x2, y2) / 1.1, 0, dist(x1, y1, x2, y2) - 2, 0);
        strokeCap(ROUND);
        popMatrix();
    } else if (type === "normal") {
        stroke(0, 150);
        noFill();
        strokeWeight(dist(x1, y1, x2, y2) / 70);
        pushMatrix();
        translate(x1, y1);
        rotate((tickClock.realMs / tickClock.baseMs) * 2);
        strokeCap(SQUARE);
        ellipse(0, 0, dist(x1, y1, x2, y2) / 3.5, dist(x1, y1, x2, y2) / 3.5);
        line(dist(x1, y1, x2, y2) / 15, 0, dist(x1, y1, x2, y2) / 5, 0);
        line(-dist(x1, y1, x2, y2) / 15, 0, -dist(x1, y1, x2, y2) / 5, 0);
        line(0, dist(x1, y1, x2, y2) / 15, 0, dist(x1, y1, x2, y2) / 5);
        line(0, -dist(x1, y1, x2, y2) / 15, 0, -dist(x1, y1, x2, y2) / 5);
        point(0, 0);
        strokeCap(ROUND);
        popMatrix();
    }
};
var settleCreditDisplay = function () {
    creditDisplay.value = playerCredits;
    creditDisplay.speed = 0;
};
matchState = {
    gameMode: "Team Deathmatch",
    scoreLimit: 100,
    teamScores: [0, 0],
    botRespawns: [],
    phase: "idle",
    countdownFrame: 0,
    countdownStarted: false,
    countdownStepFrames: 72,
    winCheckFrame: 0,
    winConfirmFrames: 30,
    endingFrame: 0,
    endingHoldFrames: 96,
    playerKills: 0,
    lastCreditAward: 0,
    creditsAwarded: false,
    winnerTeam: -1
};
var spawnFloorZ = function (x, y, radius, groundOnly) {
    var low = groundOnly ? 0 : currentMap.killZ;
    var high = groundOnly ? 0 : currentMap.topZ + 1;
    for (var layer = low; layer <= high; layer++) {
        var cols = currentMap.getNearbyCollisions(layer, x, y, 0) || [];
        for (var i = 0; i < cols.length; i++) {
            var col = cols[i];
            if (!col || !col.plane || !col.spawnSurface) {
                continue;
            }
            var z = col.surfaceZ;
            if (z >= low && z <= high && col.checkCollision(x, y, z) && !solidAt(x, y, z, radius)) {
                return z;
            }
        }
    }
    return null;
};
var supPoint = function (x, y, clearance) {
    for (var radius = 0; radius <= 640; radius += 80) {
        for (var a = 0; a < 360; a += 45) {
            var px = x + cos(a) * radius;
            var py = y + sin(a) * radius;
            if (abs(px - (currentMap.offsetX || 0)) > currentMap.width / 2 - 300 || abs(py - (currentMap.offsetY || 0)) > currentMap.height / 2 - 300) {
                continue;
            }
            if (spawnFloorZ(px, py, clearance, true) !== null) {
                return {
                    x: px,
                    y: py,
                    z: 0
                };
            }
        }
    }
    return null;
};
var findOpenSpawn = function (anchor, minPlayerDist, minEntityDist, angleHint, radiusMin, radiusMax) {
    anchor = anchor || currentMap.spawnPos;
    var spawnX = anchor.x;
    var spawnY = anchor.y;
    var spawnZ = anchor.z;
    for (var attempt = 0; attempt < 180; attempt++) {
        var testX;
        var testY;
        if (angleHint !== null && angleHint !== undefined && attempt < 100) {
            var spawnAngle = angleHint + random(-26, 26);
            var spawnRadius = random(radiusMin || 130, radiusMax || 520);
            testX = constrain(anchor.x + cos(spawnAngle) * spawnRadius, -currentMap.width / 2 + 70, currentMap.width / 2 - 70);
            testY = constrain(anchor.y + sin(spawnAngle) * spawnRadius, -currentMap.height / 2 + 70, currentMap.height / 2 - 70);
        } else {
            testX = random(-currentMap.width / 2 + 90, currentMap.width / 2 - 90);
            testY = random(-currentMap.height / 2 + 90, currentMap.height / 2 - 90);
        }
        var clearOfEntities = dist(testX, testY, playerPos.x, playerPos.y) > minPlayerDist;
        for (var z = currentMap.killZ; z < currentMap.topZ + 2 && clearOfEntities; z++) {
            var entList = currentMap.entities[z];
            if (!entList) {
                continue;
            }
            for (var e = 0; e < entList.length; e++) {
                var ent = entList[e];
                if (ent && ent.pos && dist(testX, testY, ent.pos.x, ent.pos.y) < minEntityDist) {
                    clearOfEntities = false;
                    break;
                }
            }
        }
        var floorFound = false;
        var floorZ = spawnZ;
        for (var layer = currentMap.killZ; layer <= currentMap.topZ + 1 && !floorFound; layer++) {
            var cols = currentMap.collisionLayers ? currentMap.collisionLayers[layer] : null;
            if (!cols || cols.length === undefined) {
                continue;
            }
            for (var colIndex = 0; colIndex < cols.length; colIndex++) {
                var col = cols[colIndex];
                if (!col || !col.plane || !col.spawnSurface) {
                    continue;
                }
                var testZ = col.lowZ !== undefined ? floor(col.lowZ) : layer;
                if (testZ < currentMap.killZ || testZ > currentMap.topZ + 1) {
                    continue;
                }
                if (col.checkCollision(testX, testY, testZ) && !solidAt(testX, testY, testZ, hitboxSize)) {
                    floorZ = testZ + 0.001;
                    floorFound = true;
                    break;
                }
            }
        }
        if (clearOfEntities && floorFound) {
            return {
                x: testX,
                y: testY,
                z: floorZ
            };
        }
    }
    return {
        x: spawnX,
        y: spawnY,
        z: spawnZ
    };
};
var getMapTrooperSkin = function (skinName, index) {
    if (currentMap === Kashyyyk && skinName === "First Order Stormtrooper") {
        return index % 3 === 0 ? "Heavy Shoretrooper" : "Shoretrooper";
    }
    return skinName;
};
var spawnBRBots = function () {
    var botSkins = ["Rebel Trooper", "First Order Stormtrooper"];
    var botCount = 23;
    for (var b = 0; b < botCount; b++) {
        var spawn = findOpenSpawn(currentMap.spawnPos, hitboxSize * 5.6, hitboxSize * 4.5, (360 / botCount) * b, min(currentMap.width, currentMap.height) * 0.12, min(currentMap.width, currentMap.height) * 0.46);
        var bot = new AIPlayer({
            x: spawn.x,
            y: spawn.y,
            z: spawn.z,
            team: 100 + b,
            skin: b === 0 ? playerTeam === 0 ? "Kylo Ren" : "Luke Skywalker" : getMapTrooperSkin(botSkins[b % botSkins.length], b),
            walkSpeed: undefined
        });
        bot.isMatchBot = true;
        bot.isBattleRoyaleBot = true;
        var layer = constrain(floor(bot.pos.z), currentMap.killZ, currentMap.topZ + 1);
        if (!currentMap.entities[layer]) {
            currentMap.entities[layer] = [];
        }
        currentMap.entities[layer].push(bot);
    }
    currentMap._initialTeamBotsSpawned = true;
};
var spawnMatchBots = function () {
    if (!currentMap || currentMap._initialTeamBotsSpawned) {
        return;
    }
    var skinName = ("" + skin).toLowerCase();
    if (skinName.indexOf("rebel") >= 0 || skinName.indexOf("clone") >= 0 || skinName === "luke skywalker" || skinName === "yoda" || skinName === "ahsoka tano") {
        playerTeam = 0;
    } else {
        playerTeam = 1;
    }
    if (matchState.gameMode === "Sniper Duel") {
        playerTeam = 99;
        var sniperSpawns = [];
        for (var sniperSlot = 0; sniperSlot < 7; sniperSlot++) {
            var sniperSpawn = null;
            for (var sniperAttempt = 0; sniperAttempt < 180; sniperAttempt++) {
                var sniperX = random(-currentMap.width / 2 + 90, currentMap.width / 2 - 90);
                var sniperY = random(-currentMap.height / 2 + 90, currentMap.height / 2 - 90);
                var sniperZ = spawnFloorZ(sniperX, sniperY, hitboxSize, false);
                if (sniperZ === null || dist(sniperX, sniperY, playerPos.x, playerPos.y) < 350) {
                    continue;
                }
                var separated = true;
                for (var previous = 0; previous < sniperSpawns.length; previous++) {
                    if (dist(sniperX, sniperY, sniperSpawns[previous].x, sniperSpawns[previous].y) < 350) {
                        separated = false;
                        break;
                    }
                }
                if (separated) {
                    sniperSpawn = new PVector(sniperX, sniperY, sniperZ + 0.001);
                    break;
                }
            }
            if (!sniperSpawn) {
                sniperSpawn = findTDMSpawn(sniperSlot % 2);
            }
            sniperSpawns.push(sniperSpawn);
                var sniperBot = new AIPlayer({
                    x: sniperSpawn.x,
                    y: sniperSpawn.y,
                    z: sniperSpawn.z,
                    team: 100 + sniperSlot,
                    skin: sniperSlot % 2 === 0 ? "Rebel Trooper" : "First Order Stormtrooper"
                });
                sniperBot.weapon = new Blaster({
                    weaponId: Sniper.weaponId,
                    laserSpeed: Sniper.laserSpeed,
                    damage: Sniper.damage,
                    laserRender: Sniper.laserRender,
                    fireRate: Sniper.fireRate,
                    shotsAllowed: Sniper.shotsAllowed,
                    reloadSpeed: Sniper.reloadSpeed,
                    renderFunc: Sniper.renderFunc,
                    maxDist: Sniper.maxDist,
                    accuracy: Sniper.accuracy,
                    auto: Sniper.auto,
                    renderZoom: Sniper.renderZoom,
                    scopeFov: Sniper.scopeFov
                });
                sniperBot.isMatchBot = true;
                var sniperLayer = floor(sniperBot.pos.z);
                currentMap.entities[sniperLayer].push(sniperBot);
        }
        currentMap._initialTeamBotsSpawned = true;
        return;
    }
    if (matchState.gameMode === "Battle Royale") {
        spawnBRBots();
        return;
    }
    var teamSkins = ["Rebel Trooper", "First Order Stormtrooper"];
    var supremacy = isSupremacy();
    currentMap._matchClusterSpawns = [];
    currentMap._matchPlayerSpawn = null;
    for (var clusterTeam = 0; !supremacy && clusterTeam < 2; clusterTeam++) {
        var clusterX = currentMap.spawnPos.x;
        var clusterY = currentMap.spawnPos.y;
        var clusterZ = currentMap.spawnPos.z;
        var clusterHasAnchor = false;
        for (var clusterAttempt = 0; clusterAttempt < 180; clusterAttempt++) {
            var clusterTestX = random(-currentMap.width / 2 + 90, currentMap.width / 2 - 90);
            var clusterTestY = random(-currentMap.height / 2 + 90, currentMap.height / 2 - 90);
            var clusterFarEnough = true;
            if (clusterTeam > 0 && currentMap._matchClusterSpawns[0]) {
                clusterFarEnough = dist(clusterTestX, clusterTestY, currentMap._matchClusterSpawns[0].x, currentMap._matchClusterSpawns[0].y) > min(currentMap.width, currentMap.height) * 0.35;
            }
            if (!clusterFarEnough) {
                continue;
            }
            var clusterFloorFound = false;
            var clusterFloorZ = currentMap.spawnPos.z;
            for (var clusterLayer = currentMap.killZ; clusterLayer <= currentMap.topZ + 1 && !clusterFloorFound; clusterLayer++) {
                var clusterCols = currentMap.collisionLayers ? currentMap.collisionLayers[clusterLayer] : null;
                if (!clusterCols || clusterCols.length === undefined) {
                    continue;
                }
                for (var clusterColIndex = 0; clusterColIndex < clusterCols.length; clusterColIndex++) {
                    var clusterCol = clusterCols[clusterColIndex];
                    if (!clusterCol || !clusterCol.plane || !clusterCol.spawnSurface) {
                        continue;
                    }
                    var clusterTestZ = clusterCol.lowZ !== undefined ? floor(clusterCol.lowZ) : clusterLayer;
                    if (clusterTestZ < currentMap.killZ || clusterTestZ > currentMap.topZ + 1) {
                        continue;
                    }
                    if (clusterCol.checkCollision(clusterTestX, clusterTestY, clusterTestZ) && !solidAt(clusterTestX, clusterTestY, clusterTestZ, hitboxSize)) {
                        clusterFloorZ = clusterTestZ + 0.001;
                        clusterFloorFound = true;
                        break;
                    }
                }
            }
            if (clusterFloorFound) {
                clusterX = clusterTestX;
                clusterY = clusterTestY;
                clusterZ = clusterFloorZ;
                clusterHasAnchor = true;
                break;
            }
        }
        if (!clusterHasAnchor) {
            for (var fallbackLayer = currentMap.killZ; fallbackLayer <= currentMap.topZ + 1; fallbackLayer++) {
                var fallbackCols = currentMap.collisionLayers ? currentMap.collisionLayers[fallbackLayer] : null;
                if (!fallbackCols || fallbackCols.length === undefined) {
                    continue;
                }
                for (var fallbackColIndex = 0; fallbackColIndex < fallbackCols.length; fallbackColIndex++) {
                    var fallbackCol = fallbackCols[fallbackColIndex];
                    if (!fallbackCol || !fallbackCol.plane || !fallbackCol.spawnSurface) {
                        continue;
                    }
                    var fallbackTestZ = fallbackCol.lowZ !== undefined ? floor(fallbackCol.lowZ) : fallbackLayer;
                    if (fallbackTestZ < currentMap.killZ || fallbackTestZ > currentMap.topZ + 1) {
                        continue;
                    }
                    if (fallbackCol.checkCollision(clusterX, clusterY, fallbackTestZ) && !solidAt(clusterX, clusterY, fallbackTestZ, hitboxSize)) {
                        clusterZ = fallbackTestZ + 0.001;
                        clusterHasAnchor = true;
                        break;
                    }
                }
                if (clusterHasAnchor) {
                    break;
                }
            }
        }
        currentMap._matchClusterSpawns[clusterTeam] = {
            x: clusterX,
            y: clusterY,
            z: clusterZ
        };
    }
    if (supremacy) {
        initSupremacy();
        for (var team = 0; team < 2; team++) {
            var post = currentMap.sup.posts[team];
            var base = currentMap.spawnPos;
            var anchor = post && supPoint(post.x, post.y, hitboxSize) || supPoint(base.x, base.y, hitboxSize);
            currentMap._matchClusterSpawns[team] = anchor || {
                x: base.x,
                y: base.y,
                z: 0
            };
            currentMap._matchClusterSpawns[team].z = 0.001;
        }
    }
    for (var teamId = 0; teamId < 2; teamId++) {
        var botCount = teamId === playerTeam ? 7 : 8;
        var roleOffset = floor(random(0, aiRoles.length));
        var teamCluster = currentMap._matchClusterSpawns[teamId] || currentMap.spawnPos;
        for (var b = 0; b < botCount; b++) {
            var spawnX = teamCluster.x;
            var spawnY = teamCluster.y;
            var spawnZ = teamCluster.z;
            for (var attempt = 0; attempt < 128; attempt++) {
                var spawnAngle = (360 / botCount) * b + random(-24, 24);
                var spawnRadius = random(145, 470);
                var testX = constrain(teamCluster.x + cos(spawnAngle) * spawnRadius, -currentMap.width / 2 + 70, currentMap.width / 2 - 70);
                var testY = constrain(teamCluster.y + sin(spawnAngle) * spawnRadius, -currentMap.height / 2 + 70, currentMap.height / 2 - 70);
                var clearOfEntities = dist(testX, testY, playerPos.x, playerPos.y) > hitboxSize * 4.2;
                for (var z = currentMap.killZ; z < currentMap.topZ + 2 && clearOfEntities; z++) {
                    var entList = currentMap.entities[z];
                    if (!entList) {
                        continue;
                    }
                    for (var e = 0; e < entList.length; e++) {
                        var ent = entList[e];
                        if (ent && ent.pos && dist(testX, testY, ent.pos.x, ent.pos.y) < hitboxSize * 4.2) {
                            clearOfEntities = false;
                            break;
                        }
                    }
                }
                if (!clearOfEntities) {
                    continue;
                }
                var botFloorZ = spawnFloorZ(testX, testY, hitboxSize, supremacy);
                if (botFloorZ !== null) {
                    spawnX = testX;
                    spawnY = testY;
                    spawnZ = botFloorZ + 0.001;
                    break;
                }
            }
            var bot = new AIPlayer({
                x: spawnX,
                y: spawnY,
                z: spawnZ,
                team: teamId,
                role: aiRoles[(b + roleOffset) % aiRoles.length],
                skin: b === 0 && (teamId !== playerTeam || !playerHasForce()) ? teamId === 0 ? skin === "Clone Trooper" || skin === "Yoda" ? "Yoda" : "Luke Skywalker" : "Kylo Ren" : getMapTrooperSkin(teamSkins[teamId], b),
                walkSpeed: undefined
            });
            bot.isMatchBot = true;
            if (teamId === playerTeam && b < 3) {
                bot.wasPlayerSquad = true;
                bot.inPlayerSquad = hasCommsHeadset() && squadEnabled;
            }
            var layer = constrain(floor(bot.pos.z), currentMap.killZ, currentMap.topZ + 1);
            if (!currentMap.entities[layer]) {
                currentMap.entities[layer] = [];
            }
            currentMap.entities[layer].push(bot);
        }
    }
    currentMap._initialTeamBotsSpawned = true;
};
var playerDie = function (respawnNow) {
    playerHandPose = null;
    forceGrip = null;
    forceGripReadyAt = 0;
    forceDoorUntil = 0;
    forceHandBlend = 0;
    resetSaberThrows();
    if (respawnNow !== true) {
        if (deathScreenActive) {
            return;
        }
        if ((matchState.gameMode === "Battle Royale" || matchState.gameMode === "Sniper Duel") && matchState.phase === "live") {
            matchState.phase = "ending";
            matchState.winnerTeam = -2;
            matchState.endingFrame = 0;
            playerHealth = 0;
            playerShield = 0;
            playerVel.mult(0);
            squadCommandMode = false;
            settleCreditDisplay();
            return;
        }
        playerDeaths++;
        deathScreenActive = true;
        deathScreenFrame = 0;
        deathTransStarted = false;
        deathScorePaid = true;
        squadCommandMode = false;
        playerHealth = 0;
        playerShield = 0;
        playerVel.mult(0);
        return;
    }
    if (!deathScreenActive) {
        playerDeaths++;
    }
    deathScreenActive = false;
    deathScreenFrame = 0;
    deathTransStarted = false;
    stuckHoldCount = 0;
    stuckHoldLock = false;
    deathScorePaid = false;
    var respawnSkinName = ("" + skin).toLowerCase();
    if (respawnSkinName.indexOf("rebel") >= 0 || respawnSkinName.indexOf("clone") >= 0 || respawnSkinName === "luke skywalker" || respawnSkinName === "yoda" || respawnSkinName === "ahsoka tano") {
        playerTeam = 0;
    } else {
        playerTeam = 1;
    }
    if (matchState.gameMode === "Sniper Duel") {
        playerTeam = 99;
    }
    if (playerDeaths === 0) {
        spawnMatchBots();
    }
    playerVel.mult(0);
    var playerCluster = currentMap._matchClusterSpawns && currentMap._matchClusterSpawns[playerTeam] ? currentMap._matchClusterSpawns[playerTeam] : currentMap.spawnPos;
    var supremacy = isSupremacy();
    var playerSpawnX = playerCluster.x;
    var playerSpawnY = playerCluster.y;
    var playerSpawnZ = supremacy ? 0.001 : playerCluster.z;
    if (supremacy) {
        var anchor = supPoint(playerSpawnX, playerSpawnY, hitboxSize);
        if (anchor) {
            playerSpawnX = anchor.x;
            playerSpawnY = anchor.y;
        }
    }
    for (var playerAttempt = 0; playerAttempt < 160; playerAttempt++) {
        var playerSpawnAngle = random(0, 360);
        var playerSpawnRadius = random(130, 430);
        var playerTestX = constrain(playerCluster.x + cos(playerSpawnAngle) * playerSpawnRadius, -currentMap.width / 2 + 70, currentMap.width / 2 - 70);
        var playerTestY = constrain(playerCluster.y + sin(playerSpawnAngle) * playerSpawnRadius, -currentMap.height / 2 + 70, currentMap.height / 2 - 70);
        var playerClearEnts = true;
        for (var playerZ = currentMap.killZ; playerZ < currentMap.topZ + 2 && playerClearEnts; playerZ++) {
            var playerEntList = currentMap.entities[playerZ];
            if (!playerEntList) {
                continue;
            }
            for (var playerE = 0; playerE < playerEntList.length; playerE++) {
                var playerEnt = playerEntList[playerE];
                if (playerEnt && playerEnt.pos && dist(playerTestX, playerTestY, playerEnt.pos.x, playerEnt.pos.y) < hitboxSize * 4.2) {
                    playerClearEnts = false;
                    break;
                }
            }
        }
        if (!playerClearEnts) {
            continue;
        }
        var playerFloorZ = spawnFloorZ(playerTestX, playerTestY, hitboxSize, supremacy);
        if (playerFloorZ !== null) {
            playerSpawnX = playerTestX;
            playerSpawnY = playerTestY;
            playerSpawnZ = playerFloorZ + 0.001;
            break;
        }
    }
    currentMap._matchPlayerSpawn = {
        x: playerSpawnX,
        y: playerSpawnY,
        z: playerSpawnZ
    };
    for (var className in characterData) {
        if (!characterData[className] || !characterData[className].abilities) {
            continue;
        }
        if (characterData[className].equipment) {
            characterData[className].equipment.durationCount = characterData[className].equipment.duration;
            characterData[className].equipment.thrustAt = -120;
        }
        for (var abilityIndex = 0; abilityIndex < characterData[className].abilities.length; abilityIndex++) {
            var respawnAbility = characterData[className].abilities[abilityIndex];
            if (!respawnAbility) {
                continue;
            }
            respawnAbility.rechargeCount = 0;
            respawnAbility.pressed = false;
            if (respawnAbility.maxUses !== undefined) {
                respawnAbility.remainingUses = respawnAbility.maxUses;
                respawnAbility.durationCount = 0;
            } else if (respawnAbility.sprite === "jetpack_icon") {
                respawnAbility.durationCount = respawnAbility.duration;
            } else {
                respawnAbility.durationCount = 0;
            }
        }
    }
    inventoryState.selected = 0;
    inventoryState.cosmeticsOpen = false;
    playerPos = new PVector(playerSpawnX, playerSpawnY, playerSpawnZ);
    cameraState.ready = false;
    currentGun.shots = 0;
    currentGun.reloadTime = 0;
    playerHealth = playerMaxHealth;
    playerGraceEndMs = tickClock.gameMs + spawnGraceMs;
    resetPlayerShield();
    playerDamageMult = 1;
    stuckHoldCount = 0;
    stuckHoldLock = false;
};
var weaponSprite = function (x, y, s, r, type, c) {
    if (!c) {
        fill(0);
        stroke(0);
    } else {
        fill(c);
        stroke(255);
    }
    strokeWeight(2);
    pushMatrix();
    translate(x, y);
    scale(s / 400);
    translate(-200, -200);
    rotate(r);
    switch (type) {
        case "Shotgun": case "DL44": case "Bowcaster": pushMatrix(); translate(100, 200); scale(1.6);
        (type === "Shotgun" ? Shotgun : type === "DL44" ? DL44 : Bowcaster).render();
        popMatrix();
        break;
        case "B2_Wrist": pushMatrix(); translate(50, 200); scale(2.8);
        drawB2BlasterIcon();
        popMatrix();
        break;
        case "F_11D": var shapes = [ [ [35, 188], [37, 177], [58, 176], [63, 181], [80, 182], [87, 179], [96, 179], [96, 176], [98, 174], [104, 174], [106, 178], [117, 177], [117, 169], [93, 168], [90, 163], [91, 158], [94, 156], [110, 156], [119, 159], [120, 157], [123, 157], [123, 153], [128, 153], [128, 156], [130, 157], [162, 155], [166, 156], [167, 165], [165, 167], [138, 167], [136, 171], [137, 175], [154, 177], [171, 176], [176, 177], [180, 182], [191, 182], [193, 179], [196, 178], [262, 180], [277, 179], [286, 180], [291, 185], [323, 186], [325, 172], [328, 169], [336, 168], [339, 169], [344, 175], [346, 179], [347, 189], [357, 190], [358, 192], [363, 193], [364, 205], [361, 209], [357, 209], [354, 212], [347, 212], [343, 215], [340, 215], [351, 220], [355, 224], [355, 227], [352, 228], [352, 230], [349, 232], [349, 235], [337, 234], [336, 232], [326, 233], [325, 246], [319, 250], [307, 249], [294, 245], [274, 243], [261, 240], [253, 240], [246, 238], [230, 238], [222, 234], [216, 228], [214, 228], [208, 222], [208, 218], [194, 217], [192, 215], [166, 215], [165, 220], [161, 226], [142, 225], [140, 241], [137, 244], [127, 249], [124, 249], [114, 239], [113, 231], [120, 215], [128, 213], [126, 210], [108, 208], [106, 204], [107, 200], [96, 200], [92, 196], [90, 199], [86, 199], [83, 201], [69, 201], [65, 209], [64, 217], [44, 220], [37, 206] ], [ [328, 179], [328, 186], [332, 186], [332, 181], [335, 177], [337, 177], [337, 173], [334, 170], [331, 170] ], [ [123, 149], [130, 149], [130, 152], [123, 152] ] ];
        for (var i = 0; i < shapes.length; i++) {
            beginShape();
            for (var j = 0; j < shapes[i].length; j++) {
                vertex(shapes[i][j][0], shapes[i][j][1]);
            }
            endShape(CLOSE);
        }
        break;
        case "E11": var shapes = [ [ [12.5, 200.6], [17.4, 196.9], [28.7, 195.6], [27.4, 178.2], [33.6, 164.5], [38.6, 158.3], [46.1, 159.5], [48.6, 164.5], [162, 163.2], [164.5, 164.5], [164.5, 169.5], [180.7, 169.5], [181.9, 158.3], [184.4, 153.3], [190.7, 152], [195.6, 148.3], [205.6, 153.3], [216.8, 153.3], [218.1, 158.3], [226.8, 157], [226.8, 153.3], [219.3, 152], [218.1, 148.3], [221.8, 143.3], [226.8, 142.1], [226.8, 133.3], [229.3, 128.3], [255.5, 128.3], [266.7, 130.8], [276.6, 130.8], [282.9, 128.3], [310.3, 128.3], [311.5, 148.3], [309, 153.3], [286.6, 153.3], [269.2, 149.5], [267.9, 158.3], [337.7, 158.3], [340.2, 164.5], [343.9, 164.5], [343.9, 162], [347.7, 158.3], [353.9, 158.3], [358.9, 168.2], [376.3, 168.2], [381.3, 169.5], [385, 174.5], [382.6, 195.6], [377.6, 200.6], [362.6, 199.4], [360.1, 196.9], [356.4, 196.9], [353.9, 201.9], [347.7, 203.1], [332.7, 203.1], [332.7, 196.9], [294.1, 196.9], [289.1, 199.4], [272.9, 200.6], [266.7, 206.9], [266.7, 215.6], [292.8, 256.7], [291.6, 261.7], [276.6, 272.9], [269.2, 272.9], [267.9, 259.2], [261.7, 253], [256.7, 243], [253, 240.5], [248, 230.5], [238, 221.8], [231.8, 219.3], [228, 226.8], [220.6, 233], [206.9, 234.3], [198.1, 231.8], [196.9, 229.3], [203.1, 231.8], [219.3, 231.8], [230.5, 220.6], [230.5, 218.1], [228, 218.1], [226.8, 215.6], [220.6, 215.6], [218.1, 224.3], [215.6, 224.3], [214.3, 230.5], [211.8, 230.5], [213.1, 219.3], [208.1, 206.9], [193.1, 208.1], [193.1, 225.5], [196.9, 228], [194.4, 229.3], [191.9, 225.5], [191.9, 208.1], [100.9, 208.1], [97.2, 210.6], [96, 214.3], [91, 216.8], [68.5, 216.8], [19.9, 213.1], [16.2, 209.3], [13.7, 209.3] ], [ [33.6, 196.9], [39.9, 200.6], [46.1, 200.6], [62.3, 205.6], [67.3, 205.6], [73.5, 201.9], [72.3, 198.1] ] ];
        for (var i = 0; i < shapes.length; i++) {
            beginShape();
            for (var j = 0; j < shapes[i].length; j++) {
                vertex(shapes[i][j][0], shapes[i][j][1]);
            }
            endShape(CLOSE);
        }
        break;
        case "Sniper": var shapes = [ [ [6.7, 194.8], [39, 193.8], [44.8, 192.9], [46.7, 190], [61.9, 189], [59, 186.2], [35.2, 188.1], [31.4, 184.3], [33.3, 176.7], [36.2, 175.7], [41, 178.6], [60, 176.7], [61.9, 174.8], [61.9, 167.1], [113.3, 167.1], [117.1, 171], [128.6, 169], [130.5, 171.9], [135.2, 171.9], [141.9, 168.1], [144.8, 168.1], [146.7, 171], [155.2, 171], [159, 167.1], [161.9, 167.1], [163.8, 170], [174.3, 170], [178.1, 166.2], [181, 166.2], [181.9, 169], [194.3, 169], [197.1, 165.2], [200, 165.2], [203.8, 169], [215.2, 168.1], [217.1, 164.3], [221, 164.3], [221.9, 167.1], [244.8, 167.1], [252.4, 164.3], [254.3, 165.2], [253.3, 174.8], [221.9, 174.8], [220, 177.6], [220, 187.1], [219, 178.6], [216.2, 174.8], [202.9, 174.8], [199, 180.5], [194.3, 174.8], [182.9, 175.7], [180, 180.5], [175.2, 175.7], [167.6, 175.7], [163.8, 176.7], [161, 180.5], [161, 185.2], [160, 179.5], [157.1, 176.7], [147.6, 176.7], [143.8, 181.4], [139, 176.7], [130.5, 177.6], [127.6, 182.4], [121.9, 177.6], [118.1, 178.6], [113.3, 184.3], [101.9, 186.2], [101.9, 191], [106.7, 192.9], [107.6, 197.6], [124.8, 196.7], [126.7, 195.7], [126.7, 191], [127.6, 195.7], [137.1, 197.6], [142.9, 194.8], [142.9, 191], [144.8, 194.8], [154.3, 196.7], [160, 193.8], [160, 190], [161.9, 193.8], [175.2, 194.8], [178.1, 193.8], [179, 190], [180, 193.8], [197.1, 193.8], [198.1, 190], [201, 193.8], [217.1, 193.8], [220, 189], [220, 192.9], [246.7, 193.8], [250.5, 198.6], [365.7, 195.7], [366.7, 197.6], [380, 196.7], [381, 199.5], [386.7, 199.5], [391.4, 196.7], [391.4, 207.1], [380, 205.2], [379, 208.1], [347.6, 209], [336.2, 207.1], [254.3, 205.2], [255.2, 211], [205.7, 211], [199, 218.6], [198.1, 225.2], [192.4, 221.4], [169.5, 220.5], [143.8, 220.5], [142.9, 222.4], [95.2, 221.4], [92.4, 216.7], [87.6, 214.8], [140, 214.8], [141.9, 209], [139, 207.1], [108.6, 206.2], [107.6, 208.1], [101.9, 208.1], [100, 211], [100, 209], [86.7, 208.1], [84.8, 210], [82.9, 208.1], [79, 213.8], [64.8, 214.8], [58.1, 230], [58.1, 234.8], [61, 238.6], [59, 241.4], [54.3, 241.4], [42.9, 232.9], [46.7, 221.4], [51.4, 216.7], [50.5, 212.9], [38.1, 216.7], [36.2, 209], [27.6, 197.6], [21, 204.3], [21, 222.4], [11.4, 223.3] ], [ [142.9, 209], [142.9, 213.8], [147.6, 218.6], [181.9, 219.5], [187.6, 213.8], [186.7, 211], [156.2, 210], [155.2, 207.1] ], [ [82.9, 187.1], [82.9, 192.9], [97.1, 192.9], [99, 190], [98.1, 185.2], [94.3, 184.3], [83.8, 184.3] ], [ [81, 204.3], [81.9, 207.1], [85.7, 205.2], [84.8, 202.4] ] ];
        for (var i = 0; i < shapes.length; i++) {
            beginShape();
            for (var j = 0; j < shapes[i].length; j++) {
                vertex(shapes[i][j][0], shapes[i][j][1]);
            }
            endShape(CLOSE);
        }
        break;
        case "Kylo Ren Lightsaber": var shapes = [ [ [107, 57.3], [111.4, 46.5], [118.9, 38.9], [120, 27], [162.2, 27], [163.2, 23.8], [169.7, 23.8], [170.8, 27], [182.7, 27], [181.6, 11.9], [187, 8.6], [213, 8.6], [218.4, 10.8], [218.4, 25.9], [228.1, 25.9], [229.2, 22.7], [235.7, 22.7], [235.7, 25.9], [276.8, 24.9], [280, 27], [280, 35.7], [284.3, 36.8], [293, 55.1], [291.9, 57.3], [271.4, 58.4], [238.9, 58.4], [231.4, 55.1], [231.4, 130.8], [234.6, 134.1], [231.4, 136.2], [231.4, 147], [222.7, 149.2], [222.7, 152.4], [227, 153.5], [225.9, 280], [223.8, 281.1], [223.8, 291.9], [227, 293], [229.2, 299.5], [231.4, 364.3], [234.6, 378.4], [229.2, 380.5], [225.9, 387], [218.4, 390.3], [188.1, 391.4], [178.4, 387], [176.2, 382.7], [168.6, 380.5], [171.9, 357.8], [173, 298.4], [178.4, 293], [178.4, 281.1], [176.2, 280], [175.1, 191.4], [175.1, 154.6], [178.4, 153.5], [178.4, 150.3], [177.3, 148.1], [168.6, 147], [168.6, 135.1], [166.5, 135.1], [166.5, 131.9], [168.6, 131.9], [168.6, 56.2], [164.3, 58.4], [138.4, 59.5], [107, 59.5] ], [ [218.4, 351.4], [218.4, 366.5], [219.5, 368.6], [227, 368.6], [227, 349.2] ], [ [176.2, 350.3], [177.3, 369.7], [180.5, 369.7], [183.8, 365.4], [184.9, 351.4] ] ];
        for (var i = 0; i < shapes.length; i++) {
            beginShape();
            for (var j = 0; j < shapes[i].length; j++) {
                vertex(shapes[i][j][0], shapes[i][j][1]);
            }
            endShape(CLOSE);
        }
        break;
    }
    popMatrix();
};
/**SFX (SwankyMan, Modified)**/
//jshint ignore : start
//huge thanks to DebugRanger for the jsdelivr fetching
if (typeof PJSCodeInjector !== "undefined" && typeof Reflect !== "undefined") {
    PJSCodeInjector.applyInstance = function (o) {
        return function () {
            return Reflect.construct(o, arguments);
        };
    };
}
creditsMusic = {
    enabled: false,
    context: null,
    buffer: null,
    data: null,
    source: null,
    gain: null,
    status: "idle",
    pending: false,
    started: false,
    retryAt: 0,
    cueAt: null,
    url: "https://cdn.jsdelivr.net/gh/CoderGuyxLemoncelloJr/1@main/opening-crawl.js"
};
ensureCreditsAudio = function () {
    if (!creditsMusic.context) {
        var AudioConstructor = typeof AudioContext !== "undefined" ? AudioContext : typeof webkitAudioContext !== "undefined" ? webkitAudioContext : null;
        if (!AudioConstructor) {
            creditsMusic.status = "audio unavailable";
            return false;
        }
        try {
            creditsMusic.context = new AudioConstructor();
        } catch (error) {
            creditsMusic.status = "audio unavailable";
            return false;
        }
    }
    if (creditsMusic.context.state === "suspended" && creditsMusic.context.resume) {
        var resumed = creditsMusic.context.resume();
        if (resumed && resumed.catch) {
            resumed.catch(function () {
                creditsMusic.status = "audio blocked";
            });
        }
    }
    if (creditsMusic.data && !creditsMusic.buffer) {
        decodeCreditsMusic();
    }
    return true;
};
decodeCreditsMusic = function () {
    if (!creditsMusic.context || !creditsMusic.data || creditsMusic.status === "decoding" || millis() < creditsMusic.retryAt) {
        return;
    }
    creditsMusic.status = "decoding";
    var failed = function () {
        creditsMusic.status = "decode error";
        creditsMusic.retryAt = millis() + 5000;
        creditsMusic.pending = false;
    };
    try {
        var binary = atob(creditsMusic.data);
        var bytes = new Uint8Array(binary.length);
        for (var i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i) & 255;
        }
        creditsMusic.context.decodeAudioData(bytes.buffer, function (buffer) {
            creditsMusic.buffer = buffer;
            creditsMusic.data = null;
            creditsMusic.status = "ready";
            if (creditsMusic.pending) {
                playCreditsMusic();
            }
        }, failed);
    } catch (error) {
        failed();
    }
};
loadCreditsMusic = function () {
    if (creditsMusic.buffer || creditsMusic.status === "loading" || creditsMusic.status === "decoding" || millis() < creditsMusic.retryAt) {
        return;
    }
    if (creditsMusic.data) {
        decodeCreditsMusic();
        return;
    }
    if (typeof $ === "undefined" || !$.ajax) {
        creditsMusic.status = "loader unavailable";
        return;
    }
    creditsMusic.status = "loading";
    try {
        $.ajax({
            url: creditsMusic.url,
            dataType: "script",
            cache: true,
            timeout: 20000
        }).done(function () {
            var data = typeof window !== "undefined" ? window.audio : null;
            if (typeof data !== "string" || !data.length) {
                creditsMusic.status = "empty track";
                creditsMusic.retryAt = millis() + 5000;
                return;
            }
            creditsMusic.data = data;
            window.audio = null;
            creditsMusic.status = "loaded";
            decodeCreditsMusic();
        }).fail(function () {
            creditsMusic.status = "load error";
            creditsMusic.retryAt = millis() + 5000;
            creditsMusic.pending = false;
        });
    } catch (error) {
        creditsMusic.status = "load error";
        creditsMusic.retryAt = millis() + 5000;
        creditsMusic.pending = false;
    }
};
playCreditsMusic = function () {
    var enteringCredits = stageTransition.active && stageTransition.nextStage === "FullCredits";
    if (!creditsMusic.enabled || pauseState.active || (!enteringCredits && (gameStage !== "FullCredits" || stageTransition.active))) {
        return false;
    }
    if (creditsMusic.cueAt === null) {
        creditsMusic.cueAt = millis();
    }
    creditsMusic.pending = true;
    if (!ensureCreditsAudio()) {
        return false;
    }
    if (!creditsMusic.buffer) {
        loadCreditsMusic();
        return false;
    }
    if (creditsMusic.source || creditsMusic.started) {
        creditsMusic.pending = false;
        return true;
    }
    var offset = max(0, (millis() - creditsMusic.cueAt) / 1000);
    if (creditsMusic.buffer.duration > 0 && offset >= creditsMusic.buffer.duration) {
        creditsMusic.pending = false;
        creditsMusic.started = true;
        creditsMusic.status = "ended";
        return false;
    }
    var source = creditsMusic.context.createBufferSource();
    var gain = creditsMusic.context.createGain();
    source.buffer = creditsMusic.buffer;
    gain.gain.value = 0.8;
    source.connect(gain);
    gain.connect(creditsMusic.context.destination);
    source.onended = function () {
        source.disconnect();
        gain.disconnect();
        if (creditsMusic.source === source) {
            creditsMusic.source = null;
            creditsMusic.gain = null;
            creditsMusic.pending = false;
            creditsMusic.status = "ready";
        }
    };
    try {
        source.start(0, offset);
    } catch (error) {
        source.disconnect();
        gain.disconnect();
        creditsMusic.status = "playback error";
        creditsMusic.pending = false;
        return false;
    }
    creditsMusic.source = source;
    creditsMusic.gain = gain;
    creditsMusic.pending = false;
    creditsMusic.started = true;
    creditsMusic.status = "playing";
    return true;
};
stopCreditsMusic = function (clearCue) {
    var source = creditsMusic.source;
    var gain = creditsMusic.gain;
    creditsMusic.source = null;
    creditsMusic.gain = null;
    creditsMusic.pending = false;
    creditsMusic.started = false;
    if (clearCue) {
        creditsMusic.cueAt = null;
    }
    if (creditsMusic.buffer) {
        creditsMusic.status = "ready";
    }
    if (source) {
        source.onended = null;
        try {
            source.stop(0);
        } catch (error) {
        }
        source.disconnect();
    }
    if (gain) {
        gain.disconnect();
    }
};
setCreditsMusic = function (enabled) {
    creditsMusic.enabled = !!enabled;
    saveGameData();
    if (!creditsMusic.enabled) {
        stopCreditsMusic();
        return;
    }
    creditsMusic.retryAt = 0;
    ensureCreditsAudio();
    if (creditsMusic.cueAt !== null) {
        playCreditsMusic();
    }
};
loadCreditsMusic();

/**S'more Global Variables**/
var fov = 2; //Field of View. Larger number = smaller mouse motion
//Yeah, I know the fov values kind of work backwards
keys[inputKeys.sprint] = false;
var mouseClick = false;
var menuClickPending = false;
var mouseRelease = false;
var defaultZoom = 0.6;
var zoom = defaultZoom; //How much to scale things
//Right now this assignment doesn't do anything; check the minimap functions
var gameMode = 0;
var matchGameModes = ["Team Deathmatch", "Battle Royale", "Supremacy", "Sniper Duel"];
var matchModeIndex = 0;
//Load Images
var headerFont = createFont("Magneto", 25);
var backupHeaderFont = createFont("Arial Bold Italic", 25);
var basicHeaderFont = createFont("sans-serif", 25);
mainFont = createFont("Cascadia Code", 30);
var backupMainFont = createFont("Source Code Pro", 30);
var basicMainFont = createFont("monospace", 30);
var titleFont = createFont("CASTELLAR", 45);
var backupTitleFont = createFont("Times New Roman", 45);
var basicTitleFont = createFont("serif", 45);
matchFont = createFont("Arial", 30);
var uiTextWidth = function (value, size) {
    var context = typeof externals !== "undefined" ? externals.context : null;
    if (!context || !context.measureText) {
        textFont(matchFont, size);
        return textWidth(String(value));
    }
    context.save();
    context.font = size + "px Arial";
    var measuredWidth = context.measureText(String(value)).width;
    context.restore();
    return measuredWidth;
};
var drawUiText = function (value, x, y, size, horizontal, vertical, tint, outline, outlineWidth) {
    var context = typeof externals !== "undefined" ? externals.context : null;
    if (!context || !context.fillText) {
        textFont(matchFont, size);
        textAlign(horizontal === "right" ? RIGHT : horizontal === "center" ? CENTER : LEFT, vertical === "middle" ? CENTER : TOP);
        fill(tint);
        if (outlineWidth > 0) {
            stroke(outline);
            strokeWeight(outlineWidth);
        }
        text(String(value), x, y);
        return;
    }
    context.save();
    context.font = size + "px Arial";
    context.textAlign = horizontal;
    context.textBaseline = vertical;
    context.fillStyle = "rgba(" + red(tint) + "," + green(tint) + "," + blue(tint) + "," + alpha(tint) / 255 + ")";
    if (outlineWidth > 0) {
        context.strokeStyle = "rgba(" + red(outline) + "," + green(outline) + "," + blue(outline) + "," + alpha(outline) / 255 + ")";
        context.lineWidth = outlineWidth;
        context.lineJoin = "round";
        context.strokeText(String(value), x, y);
    }
    context.fillText(String(value), x, y);
    context.restore();
};
shopNumber = function (value) {
    return String(floor(value)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
//Hand-built Republic credit silhouette, based on the Resh reference.
drawCreditSymbol = function (x, y, size) {
    pushMatrix();
    pushStyle();
    translate(x, y);
    scale(size / 476.51053);
    noStroke();
    beginShape();
    vertex(26.48392, 0);
    vertex(26.48392, 92.55075);
    vertex(0, 92.55075);
    vertex(0, 198.45787);
    vertex(26.76992, 198.45787);
    vertex(26.76992, 290.72263);
    vertex(46.41837, 290.72263);
    vertex(46.41837, 198.45787);
    vertex(86.28727, 198.45787);
    vertex(86.28727, 291.26603);
    vertex(105.93571, 291.26603);
    vertex(105.93571, 198.45787);
    vertex(152.29689, 198.45787);
    vertex(34.61898, 476.48433);
    vertex(107.70894, 476.51053);
    vertex(258.77602, 92.55075);
    vertex(105.93571, 92.55075);
    vertex(105.93571, 0);
    vertex(86.28727, 0);
    vertex(86.28727, 92.55075);
    vertex(46.70437, 92.55075);
    vertex(46.70437, 0);
    endShape(CLOSE);
    popStyle();
    popMatrix();
};
drawCreditBalance = function (value, size) {
    size = size || 22;
    var balanceText = shopNumber(round(value));
    var activity = constrain(abs(creditDisplay.speed) / 5, 0, 1);
    var tint = creditDisplay.speed < -0.01 ? color(255, lerp(230, 80, activity), lerp(130, 80, activity)) : color(lerp(255, 110, activity), lerp(230, 255, activity), lerp(130, 150, activity));
    fill(tint);
    drawUiText(balanceText, 0, 0, size, "right", "top", tint);
    drawCreditSymbol(-uiTextWidth(balanceText, size) - size * 20 / 22, 2, size);
};
var pauseButtonBounds = function () {
    return {
        x: width - 60,
        y: 12,
        width: 44,
        height: 48
    };
};
var pauseMenuBounds = function () {
    var panelWidth = min(pauseState.settings ? 350 : 320, width - 32);
    var panelHeight = min(pauseState.settings ? 380 : 354, height - 20);
    var rowTop = pauseState.settings ? 76 : 100;
    var rowStep = min(pauseState.settings ? 47 : 54, (panelHeight - rowTop - 40) / (pauseState.settings ? 5 : 4));
    return {
        x: (width - panelWidth) / 2,
        y: (height - panelHeight) / 2,
        width: panelWidth,
        height: panelHeight,
        rowTop: rowTop,
        rowStep: rowStep,
        rowHeight: min(42, rowStep - 4)
    };
};
var toggleGraphics = function () {
    lowDetailMode = !lowDetailMode;
    return saveGameData();
};
var overPauseButton = function (x, y) {
    var button = pauseButtonBounds();
    return x >= button.x && x <= button.x + button.width && y >= button.y && y <= button.y + button.height;
};
var setGamePaused = function (paused) {
    if (gameStage !== "Play" || stageTransition.active || runtimeFailed || pauseState.active === paused) {
        return;
    }
    if (paused) {
        pauseState.frame = get(0, 0, width, height);
        pauseState.saveStatus = "";
        if (gameSaveDirty) {
            saveGameData();
        }
    }
    pauseState.active = paused;
    pauseState.settings = false;
    pauseState.resuming = false;
    pauseState.resumeStartedAt = 0;
    pauseState.blockMouseUntilRelease = !!mouseIsPressed;
    forceGrip = null;
    clearGameInput();
    keys = {
    };
    keys[inputKeys.sprint] = false;
    rightHeld = false;
    mouseClick = false;
    mouseRelease = null;
    menuClickPending = false;
    tickClock.accumulatorMs = 0;
    tickClock.lastMs = millis();
};
var beginGameResume = function () {
    if (!pauseState.active || pauseState.resuming) {
        return;
    }
    pauseState.resuming = true;
    pauseState.settings = false;
    pauseState.resumeStartedAt = millis();
    clearGameInput();
    keys = {
    };
    keys[inputKeys.sprint] = false;
    rightHeld = false;
    mouseClick = false;
    mouseRelease = null;
};
var setPauseSaveStatus = function (saved, message) {
    pauseState.saveStatus = saved ? message : gameSaveStorage ? gameSaveError : "Browser storage is unavailable.";
};
var handlePauseClick = function (x, y) {
    if (overPauseButton(x, y)) {
        if (pauseState.resuming) {
            pauseState.resuming = false;
        } else {
            beginGameResume();
        }
        return;
    }
    if (pauseState.resuming) {
        return;
    }
    var panel = pauseMenuBounds();
    if (x < panel.x + 24 || x > panel.x + panel.width - 24) {
        return;
    }
    var row = floor((y - panel.y - panel.rowTop) / panel.rowStep);
    if (row < 0 || row > (pauseState.settings ? 4 : 3) || y > panel.y + panel.rowTop + row * panel.rowStep + panel.rowHeight) {
        return;
    }
    if (pauseState.settings) {
        if (row === 4) {
            pauseState.settings = false;
            pauseState.saveStatus = "";
            return;
        }
        if (row === 0) {
            gameSettings.aimAssist = (gameSettings.aimAssist + 1) % 3;
        } else if (row === 2) {
            gameSettings.firingMode = (gameSettings.firingMode + 1) % fireModeLabels.length;
        } else if (row === 3) {
            bloodSplatterEnabled = !bloodSplatterEnabled;
        }
        setPauseSaveStatus(row === 1 ? toggleGraphics() : saveGameData(), "Settings saved.");
        return;
    }
    if (row === 0) {
        beginGameResume();
    } else if (row === 1) {
        setPauseSaveStatus(saveGameData(), "Progress saved.");
    } else if (row === 2) {
        pauseState.settings = true;
        pauseState.saveStatus = "";
    } else if (row === 3) {
        setGamePaused(false);
        startStageTrans("Menu", function () {
            currentMenu = null;
            holoHeight = -25;
            resetMatchForHome();
        });
    }
};
var drawPauseButton = function () {
    var button = pauseButtonBounds();
    var hovered = overPauseButton(mouseX, mouseY);
    pushStyle();
    rectMode(CORNER);
    stroke(hovered ? color(150, 235, 255) : color(100, 160, 190, 180));
    strokeWeight(1.5);
    fill(hovered ? color(18, 51, 70, 230) : color(6, 22, 36, 210));
    rect(button.x, button.y, button.width, button.height, 7);
    noStroke();
    fill(220, 247, 255);
    if (pauseState.active && !pauseState.resuming) {
        triangle(button.x + 17, button.y + 14, button.x + 17, button.y + 34, button.x + 31, button.y + 24);
    } else {
        rect(button.x + 14, button.y + 14, 5, 20, 1);
        rect(button.x + 25, button.y + 14, 5, 20, 1);
    }
    popStyle();
};
var drawPauseMenu = function () {
    resetMatrix();
    noTint();
    pushStyle();
    imageMode(CORNER);
    if (pauseState.frame) {
        image(pauseState.frame, 0, 0, width, height);
    } else {
        background(3, 12, 23);
    }
    rectMode(CORNER);
    noStroke();
    fill(0, 7, 15, 180);
    rect(0, 0, width, height);
    if (pauseState.resuming) {
        var elapsed = max(0, millis() - pauseState.resumeStartedAt);
        if (elapsed >= 3000) {
            popStyle();
            setGamePaused(false);
            return;
        }
        drawUiText("RESUMING", width / 2, height / 2 - 90, 20, "center", "middle", color(150, 217, 242));
        drawUiText(String(3 - floor(elapsed / 1000)), width / 2, height / 2, 96, "center", "middle", color(225, 248, 255), color(0, 180), 5);
        popStyle();
        drawPauseButton();
        return;
    }
    var panel = pauseMenuBounds();
    fill(6, 20, 35, 245);
    stroke(90, 177, 210, 180);
    strokeWeight(1.5);
    rect(panel.x, panel.y, panel.width, panel.height, 12);
    var settings = pauseState.settings;
    drawUiText(settings ? "SETTINGS" : "PAUSED", width / 2, panel.y + (settings ? 30 : 39), 28, "center", "middle", color(220, 247, 255));
    drawUiText(settings ? "CHANGES APPLY ON RESUME" : matchState.gameMode.toUpperCase(), width / 2, panel.y + (settings ? 55 : 70), 12, "center", "middle", color(117, 170, 195));
    var labels = settings ? ["AIM ASSIST", "GRAPHICS", "FIRING MODE", "BLOOD SPLATTER", "BACK"] : ["RESUME", "QUICKSAVE", "SETTINGS", "EXIT TO MENU"];
    var values = settings ? [["OFF", "LIGHT", "PREDICTIVE"][gameSettings.aimAssist], lowDetailMode ? "LOW" : "HIGH", fireModeLabels[gameSettings.firingMode], bloodSplatterEnabled ? "ON" : "OFF"] : [];
    for (var i = 0; i < labels.length; i++) {
        var y = panel.y + panel.rowTop + i * panel.rowStep;
        var centerY = y + panel.rowHeight / 2;
        var hovered = mouseX >= panel.x + 24 && mouseX <= panel.x + panel.width - 24 && mouseY >= y && mouseY <= y + panel.rowHeight;
        noStroke();
        fill(hovered ? color(27, 70, 91) : color(15, 43, 62));
        rect(panel.x + 24, y, panel.width - 48, panel.rowHeight, 6);
        if (values[i]) {
            var labelSize = min(14, (panel.width - 76) * 14 / max(1, uiTextWidth(labels[i] + "   " + values[i], 14)));
            drawUiText(labels[i], panel.x + 38, centerY, labelSize, "left", "middle", color(214, 246, 255));
            drawUiText(values[i], panel.x + panel.width - 38, centerY, labelSize, "right", "middle", values[i] === "OFF" ? color(147, 177, 192) : color(113, 222, 253));
        } else {
            drawUiText(labels[i], width / 2, centerY, 15, "center", "middle", !settings && i === 3 ? color(255, 196, 166) : color(214, 246, 255));
        }
    }
    var status = pauseState.saveStatus || (settings ? "Aim assist and firing mode apply to blasters." : "");
    if (status) {
        var statusSize = 12 * min(1, (panel.width - 24) / max(1, uiTextWidth(status, 12)));
        drawUiText(status, width / 2, panel.y + panel.height - 22, statusSize, "center", "middle", color(181, 226, 245));
    }
    popStyle();
    drawPauseButton();
};
var drawMatchCounters = function () {
    var kills = matchState.playerKills;
    if (killHudState.count !== kills) {
        killHudState.burstAt = kills > killHudState.count ? tickClock.realMs : -10000;
        killHudState.count = kills;
    }
    var pulse = constrain(1 - (tickClock.realMs - killHudState.burstAt) / 650, 0, 1);
    var label = "KILLS " + kills;
    var labelWidth = uiTextWidth(label, 22);
    pushStyle();
    pushMatrix();
    translate(width - 76, 12);
    var punch = 1 + sin(pulse * 180) * 0.13;
    scale(punch);
    drawUiText(label, 0, 0, 22, "right", "top", color(255, 205 + pulse * 35, 145 + pulse * 55));
    noFill();
    stroke(255, 158, 84, 205);
    strokeWeight(1.5);
    var iconX = -labelWidth - 17;
    ellipse(iconX, 12, 13, 13);
    line(iconX - 10, 12, iconX - 3, 12);
    line(iconX + 3, 12, iconX + 10, 12);
    line(iconX, 2, iconX, 9);
    line(iconX, 15, iconX, 22);
    if (pulse > 0) {
        stroke(255, 172, 90, 210 * pulse);
        for (var spark = 0; spark < 4; spark++) {
            var angle = 135 + spark * 30;
            var reach = 12 + (1 - pulse) * 15;
            line(iconX + cos(angle) * reach, 12 + sin(angle) * reach, iconX + cos(angle) * (reach + 6), 12 + sin(angle) * (reach + 6));
        }
    }
    popMatrix();
    var creditActivity = constrain(abs(creditDisplay.speed) / 5, 0, 1);
    pushMatrix();
    translate(width - 76, 43);
    scale(1 + (creditDisplay.speed > 0 ? creditActivity * 0.35 : 0));
    drawCreditBalance(creditDisplay.value, 16);
    popMatrix();
    popStyle();
};
var gameDataHoloPages = {
    advanced: {
        name: "MenuPlayAdvanced",
        title: "Advanced",
        subtitle: "Game settings",
        detail: "Preferences and local save data.",
        buttons: [{
                label: "Blood Splatter",
                action: "blood",
                y: 244,
                width: 235
            }, {
                label: "Graphics",
                action: "graphics",
                y: 284,
                width: 215
            }, {
                label: "Clear Game Data",
                action: "confirm",
                y: 324,
                width: 190
            }, {
                label: "Back",
                action: "close",
                y: 364,
                width: 100
        }]
    },

    confirm: {
        name: "MenuPlayConfirmReset",
        title: "Clear all game data?",
        subtitle: "This cannot be undone.",
        detail: "Credits, unlocks and achievements will reset.",
        buttons: [{
                label: "Delete & Reset",
                action: "reset",
                y: 260,
                width: 190
            }, {
                label: "Cancel",
                action: "close",
                y: 310,
                width: 100
        }]
    },

    cleared: {
        name: "MenuPlayResetDone",
        title: "Game data cleared",
        subtitle: "Your profile has been reset.",
        detail: "Starting credits and settings restored.",
        buttons: [{
                label: "Done",
                action: "close",
                y: 260,
                width: 100
        }]
    }
};
var drawGameDataHoloArt = function () {
    var page = gameDataHoloPages[this.page];
    pushStyle();
    background(0);
    textAlign(CENTER, CENTER);
    fill(255);
    textFont(basicHeaderFont, 30);
    textFont(backupHeaderFont, 30);
    textFont(headerFont, 30);
    text(page.title, 300, 105);
    textFont(mainFont, 19);
    text(page.subtitle, 300, 153);
    textFont(mainFont, 14);
    text(page.detail, 300, 184);
    rectMode(CENTER);
    for (var i = 0; i < page.buttons.length; i++) {
        var button = page.buttons[i];
        fill(100);
        stroke(220);
        strokeWeight(4);
        rect(300, button.y, button.width, 30);
        fill(255);
        textFont(mainFont, 18);
        text(button.label, button.action === "blood" || button.action === "graphics" ? 278 : 300, button.y);
    }
    popStyle();
};
var imagesToLoad = [
    {
        //Menu Title
        display: function () {
            textAlign(CENTER, CENTER);
            background(0);
            fill(255);
            textFont(basicHeaderFont);
            textFont(backupHeaderFont);
            textFont(headerFont);
            text("S T A R   W A R S", 295, 150);
            textFont(basicTitleFont);
            textFont(backupTitleFont);
            textFont(titleFont);
            text("BATTLEFRONT", 300, 190);
            textFont(basicMainFont, 20);
            textFont(backupMainFont, 20);
            textFont(mainFont, 20);
            fill(220);
            text("By @KingCobraVenom\nand @LemoncelloJr", 300, 280);
            stroke(230);
            strokeWeight(5);
            line(135, 215, 465, 215);
        },

        w: 600,
        h: 600,
        name: "MenuMain"
    },
    {
        //Play menu
        display: function () {
            textAlign(CENTER, CENTER);
            background(0);
            fill(100);
            stroke(220);
            strokeWeight(4);
            rectMode(CENTER);
            rect(300, 170, 250, 50);
            rect(300, 240, 210, 50);
            rect(300, 310, 170, 50);
            fill(255);
            textFont(basicHeaderFont, 35);
            textFont(backupHeaderFont, 35);
            textFont(headerFont, 35);
            text("Game Selection", 295, 105);
            textFont(basicMainFont, 25);
            textFont(backupMainFont, 25);
            textFont(mainFont, 25);
            text("Quick Match", 300, 170);
            text("Custom Game", 300, 240);
            text("Campaigns", 300, 310);
        },

        w: 600,
        h: 600,
        name: "MenuPlay"
    },
    {
        //Custom Game Screen
        display: function () {
            background(0);
            fill(255);
            textFont(basicHeaderFont, 35);
            textFont(backupHeaderFont, 35);
            textFont(headerFont, 35);
            text("Custom Match", 295, 105);
            rectMode(CENTER);
            fill(100);
            stroke(220);
            strokeWeight(4);
            rect(300, 160, 200, 30);
            rect(300, 190, 150, 25);
            ellipse(300, 260, 110, 90);
            rect(300, 345, 70, 50);
            rect(300, 400, 90, 25);
            fill(130);
            stroke(255);
            triangle(180, 180, 180, 140, 150, 160);
            triangle(420, 180, 420, 140, 450, 160);
            triangle(220, 280, 220, 240, 190, 260);
            triangle(380, 280, 380, 240, 410, 260);
            fill(255);
            textFont(basicMainFont, 20);
            textFont(backupMainFont, 20);
            textFont(mainFont, 20);
            text("Advanced ⚙️", 300, 190);
            text("Start", 300, 400);
        },

        w: 600,
        h: 600,
        name: "MenuPlayCustom"
    },
    {
        //Shop
        display: function () {
            background(0);
            fill(255);
            textFont(basicHeaderFont, 35);
            textFont(backupHeaderFont, 35);
            textFont(headerFont, 35);
            text("Select Character", 295, 105);
            //Trooper Classes
            stroke(255);
            strokeWeight(4);
            fill(100);
            rect(212.5, 150, 150, 30);
            rect(387.5, 150, 150, 30);
            rect(227.5, 190, 120, 30);
            rect(372.5, 190, 120, 30);
            //Reinforcements
            rect(300, 240, 210, 30);
            rect(300, 285, 180, 30);
            rect(300, 330, 150, 30);
            rect(300, 375, 120, 30);
            fill(255);
            textFont(mainFont, 20);
            textAlign(CENTER, CENTER);
            text("Assault", 212.5, 150);
            text("Specialist", 387.5, 150);
            text("Officer", 227.5, 190);
            text("Heavy", 372.5, 190);
            text("Jedi", 300, 240);
            text("Infiltrator", 300, 285);
            text("Enforcer", 300, 330);
            text("Aerial", 300, 375);
        },

        w: 600,
        h: 600,
        name: "MenuShop"
    },
    {
        //Credits
        display: function () {
            background(0);
            textFont(basicHeaderFont, 35);
            textFont(backupHeaderFont, 35);
            textFont(headerFont, 35);
            fill(255);
            text("Main Development By", 295, 185);
            text("With Thanks To", 295, 280);
            stroke(255);
            strokeWeight(3);
            fill(100);
            rect(300, 125, 230, 42);
            fill(255);
            textFont(mainFont, 20);
            text("Full Credits", 300, 125);
            textFont(mainFont, 20);
            fill(220);
            text("LemoncelloJr\nCoder Guy", 300, 230);
            text("DebugRanger\nBristleFrost\nGreenGhost\nEA\nSwankyMan", 300, 360);
        },

        w: 600,
        h: 600,
        name: "MenuCredits"
    },
    {
        //Achievements
        display: function () {
        },

        w: 600,
        h: 600,
        name: "MenuAchievements"
    },
    {
        //Minimap
        display: function () {
            background(0);
            fill(255);
            ellipse(75, 75, 150, 150);
        },

        w: 150,
        h: 150,
        name: "MinimapMask"
    },
    {
        //AT-AT
        display: function () {
            strokeWeight(lowDetailMode ? 8 : 2);
            var metalColor = color(95, 98, 95);
            var rustColor = color(133, 94, 66);
            var mossColor = color(77, 89, 72);
            for (var y = -298; y < 300; y += lowDetailMode ? 3 : 1) {
                for (var x = -147; x < 105; x += lowDetailMode ? 3 : 1) {
                    var n = noise(x * 0.014, y * 0.012);
                    if (n > 0.55) {
                        stroke(rustColor);
                        point(x, y);
                    } else if (n > 0.45) {
                        stroke(mossColor);
                        point(x, y);
                    }
                }
            }
        },

        w: 600,
 //Size of the image you're loading
        h: 600,
        name: "AT_AT_Moss"
    },
    {
        //Sand
        display: function () {
            strokeWeight(lowDetailMode ? 8 : 2);
            for (var i = 0; i < 600; i += lowDetailMode ? 6 : 2) {
                for (var j = 0; j < 600; j += lowDetailMode ? 6 : 2) {
                    if (!(i > 59 && i < 121 && j > 89 && j < 361)) {
                        stroke(map(noise(i / 100, j / 100), 0, 1, 180, 255), map(noise(i / 100 + 1000, j / 100 + 1000), 0, 1, 150, 200), map(noise(i / 100 + 3000, j / 100 + 3000), 0, 1, 10, 40));
                        point(i, j);
                    }
                }
            }
            noStroke();
            for (var i = 0; i < 5000; i += lowDetailMode ? 3 : 1) {
                var Size = random(0.2, 1.2);
                fill(random(200, 255), random(150, 200), random(0, 75));
                var x = random(0, 600);
                var y = random(0, 600);
                if (!(x > 60 && x < 120 && y > 90 && y < 360)) {
                    ellipse(x, y, Size, Size);
                }
            }
        },

        w: 600,
        h: 600,
        name: "Jakku_Sand"
    },
    {
        //Sandy AT-AT
        display: function () {
            strokeWeight(lowDetailMode ? 10 : 3);
            var metalColor = color(95, 98, 95);
            var ATATrustColor = color(200, 94, 70);
            var ATATsandColor = color(200, 180, 80);
            for (var y = -298; y < 300; y += lowDetailMode ? 3 : 1) {
                for (var x = -147; x < 105; x += lowDetailMode ? 3 : 1) {
                    stroke(map(noise(x * 0.014, y * 0.012), 0, 1, 100, 220), map(noise(x * 0.014 + 1000, y * 0.012 + 1000), 0, 1, 50, 190), map(noise(x * 0.014 - 1000, y * 0.012 - 1000), 0, 1, 0, 80), map(noise(x * 0.014 - 15214, y * 0.012 + 43633), 0, 1, -180, 255));
                    point(x, y);
                }
            }
        },

        w: 600,
        h: 600,
        name: "AT_AT_Sand"
    },
    {
        display: function () {
            strokeWeight(lowDetailMode ? 8 : 2);
            for (var x = 0; x < 600; x += lowDetailMode ? 6 : 2) {
                for (var y = 0; y < 300; y += lowDetailMode ? 6 : 2) {
                    if (noise(x / 70, y / 70) > 0.57) {
                        stroke(180, 80, 50, map(noise(x / 70, y / 70), 0, 1, 150, 300));
                        point(x, y);
                    } else if (noise(x / 70, y / 70) > 0.45) {
                        stroke(170, 140, 30, map(noise(x / 70, y / 70), 0, 1, 150, 300));
                        point(x, y);
                    }
                }
            }
        },

        w: 600,
        h: 300,
        name: "Jakku_Platform_Sand"
    },
    {
        display: function () {
            var x = 300;
            var y = 300;
            var s = 600;
            var r = 0;
            rectMode(CENTER);
            pushMatrix();
            translate(x, y + 16);
            scale(s / 600, s / 670);
            rotate(r);
            noStroke();
            fill(226, 227, 224);
            rect(228, 34, 52, 25);
            fill(168, 172, 174);
            ellipse(0, 0, 500, 500);
            fill(226, 227, 224);
            arc(0, -40, 550, 520, -179, 0);
            arc(0, 40, 550, 520, 0, 180);
            rect(-174, 79, 160, 107);
            rect(-178, -79, 152, 107);
            rect(79, 79, 160, 107);
            rect(79, -79, 160, 107);
            rect(-78, 113, 50, 200);
            rect(-27, -113, 52, 200);
            rect(182, 113, 50, 200);
            rect(233, -52, 46, 79);
            fill(255, 86, 57);
            stroke(186, 34, 24);
            strokeWeight(7);
            pushMatrix();
            translate(-174, -177);
            rotate(31);
            ellipse(0, 0, 38, 50);
            noStroke();
            fill(255, 229, 178);
            ellipse(0, 0, 20, 29);
            popMatrix();
            fill(166, 166, 166);
            stroke(148, 148, 148);
            strokeWeight(5);
            pushMatrix();
            translate(-222, -1);
            ellipse(0, 0, 24, 30);
            ellipse(42, 0, 25, 30);
            ellipse(91, 0, 26, 30);
            popMatrix();
            noFill();
            stroke(60);
            strokeWeight(1);
            arc(0, -42, 514, 510, -90, 0);
            arc(0, -38, 418, 526, -90, 0);
            arc(0, -38, 320, 526, -90, 0);
            arc(0, -29, 1, 571, -180, -90);
            arc(0, -44, 107, 540, -180, -90);
            arc(0, -44, 202, 540, -180, -90);
            arc(0, -44, 508, 521, -180, -90);
            pushMatrix();
            translate(300, 300);
            scale(1, -1);
            translate(-300, 300);
            arc(0, -42, 514, 517, -90, 0);
            arc(0, -39, 415, 520, -90, 0);
            arc(0, -27, 313, 547, -90, 0);
            arc(0, -45, 4, 509, -180, -90);
            arc(0, -44, 106, 512, -180, -90);
            arc(0, -31, 208, 537, -180, -90);
            arc(0, -44, 508, 513, -180, -90);
            popMatrix();
            pushMatrix();
            translate(0, -309);
            scale(1.5, 1);
            rotate(0);
            fill(158, 158, 158);
            stroke(133, 133, 133);
            strokeWeight(8);
            beginShape();
            curveVertex(-90, 18);
            curveVertex(-42, -20);
            curveVertex(35, -10);
            curveVertex(99, 44);
            curveVertex(98, 49);
            curveVertex(35, 16);
            curveVertex(-21, 24);
            curveVertex(-58, 65);
            curveVertex(-67, 71);
            curveVertex(-100, 62);
            curveVertex(-109, 50);
            curveVertex(-42, -20);
            curveVertex(33, -22);
            endShape();
            popMatrix();
            popMatrix();
        },

        w: 600,
        h: 600,
        name: "thermal_detonator"
    },
    {
        display: function () {
            var x = 200;
            var y = 200;
            var s = 200;
            var r = 0;
            rectMode(CENTER);
            pushMatrix();
            translate(x, y);
            scale(s / 200, s / 200);
            rotate(r);
            noStroke();
            fill(240);
            stroke(230);
            strokeWeight(10);
            rect(0, 0, 200, 100, 10);
            fill(255, 30, 30);
            stroke(255, 0, 0);
            rect(0, 0, 60, 20, 5);
            rect(0, 0, 20, 60, 5);
            noStroke();
            rect(0, 0, 50, 11);
            fill(153, 144, 144);
            quad(48, -45, 68, -45, 95, 4, 95, 40);
            quad(-87, -45, -65, -45, -34, 45, -54, 45);
            popMatrix();
        },

        w: 400,
        h: 400,
        name: "medkit_1"
    },
    {
        display: function () {
            var jetpackIcon = function (x, y, s, r) {
                pushStyle();
                rectMode(CENTER);
                noStroke();
                pushMatrix();
                translate(x, y);
                scale(s / 400);
                fill(130, 130, 130);
                rect(-30, 10, 30, 100, 100);
                rect(30, 10, 30, 100, 100);
                fill(100);
                rect(-30, 58, 30, 10, 50);
                rect(30, 58, 30, 10, 50);
                fill(153, 153, 153);
                rect(0, 0, 60, 100, 20);
                stroke(100);
                strokeWeight(6);
                arc(-18, 4, 15, 60, -270, -90);
                arc(18, 4, 15, 60, -90, 90);
                noStroke();
                fill(255, 200, 0);
                triangle(-43, 63, -17, 63, -30, 100);
                triangle(43, 63, 17, 63, 30, 100);
                fill(255, 0, 0);
                triangle(-40, 63, -20, 63, -30, 80);
                triangle(40, 63, 20, 63, 30, 80);
                popMatrix();
                popStyle();
            };
            jetpackIcon(95, 80, 600, 0);
        },

        w: 200,
        h: 230,
        name: "jetpack_icon"
    },
    {
        //jetpack sprite
        display: function () {
            var jetpackSprite = function (x, y, s, r) {
                pushStyle();
                pushMatrix();
                translate(x, y);
                scale(s / 400);
                noStroke();
                rectMode(CENTER);
                fill(130);
                ellipse(-30, 0, 40, 40);
                ellipse(30, 0, 40, 40);
                fill(153);
                rect(0, 0, 60, 50, 100);
                popMatrix();
                popStyle();
            };
            jetpackSprite(95, 80, 600, 0);
        },

        w: 200,
        h: 230,
        name: "jetpack_sprite"
    },
    {
        //red landmine
        display: function () {
            var redLandmineSprite = function (x, y, s, r) {
                pushStyle();
                pushMatrix();
                translate(x, y);
                scale(s / 400);
                rectMode(CENTER);
                fill(130, 130, 130);
                noStroke();
                ellipse(0, 0, 60, 60);
                stroke(102, 102, 102);
                ellipse(0, 0, 50, 50);
                ellipse(0, 0, 40, 40);
                ellipse(0, 0, 30, 30);
                noStroke();
                fill(143, 143, 143);
                rect(0, 0, 70, 13, 5);
                rect(0, 0, 13, 75, 5);
                fill(99, 99, 99);
                rect(0, 0, 50, 13, 5);
                rect(0, 0, 13, 50, 5);
                fill(255, 122, 122);
                ellipse(0, 0, 10, 10);
                popMatrix();
                popStyle();
            };
            redLandmineSprite(100, 100, 600, 0);
        },

        w: 200,
        h: 200,
        name: "red_landmine_sprite"
    },
    {
        //blue landmine
        display: function () {
            var blueMineSprite = function (x, y, s, r) {
                pushStyle();
                pushMatrix();
                translate(x, y);
                scale(s / 400);
                rectMode(CENTER);
                fill(130, 130, 130);
                noStroke();
                ellipse(0, 0, 60, 60);
                stroke(102, 102, 102);
                ellipse(0, 0, 50, 50);
                ellipse(0, 0, 40, 40);
                ellipse(0, 0, 30, 30);
                noStroke();
                fill(143, 143, 143);
                rect(0, 0, 70, 13, 5);
                rect(0, 0, 13, 75, 5);
                fill(99, 99, 99);
                rect(0, 0, 50, 13, 5);
                rect(0, 0, 13, 50, 5);
                fill(122, 122, 255);
                ellipse(0, 0, 10, 10);
                popMatrix();
                popStyle();
            };
            blueMineSprite(100, 100, 800, 0);
        },

        w: 200,
        h: 200,
        name: "blue_landmine_sprite"
    }
];
var skinImgsToBake = [
    ["Ahsoka Tano", "PlayerSkin_AhsokaTano"],
    ["Yoda", "PlayerSkin_Yoda"],
    ["Darth Maul", "PlayerSkin_DarthMaul"],
    ["Darth Vader", "PlayerSkin_DarthVader"],
    ["Super Battle Droid", "PlayerSkin_SuperBattleDroid"],
    ["Battle Droid", "PlayerSkin_BattleDroid"],
    ["First Order Stormtrooper", "PlayerSkin_FirstOrderStormtrooper"],
    ["Shadowtrooper", "PlayerSkin_Shadowtrooper"],
    ["Heavy Shoretrooper", "PlayerSkin_HeavyShoretrooper"],
    ["Shoretrooper", "PlayerSkin_Shoretrooper"],
    ["Luke Skywalker", "PlayerSkin_LukeSkywalker"],
    ["Kylo Ren", "PlayerSkin_KyloRen"],
    ["Clone Trooper", "PlayerSkin_CloneTrooper"],
    ["Rebel Trooper", "PlayerSkin_RebelTrooper"]
];
for (var playerSkinImgIdx = 0; playerSkinImgIdx < skinImgsToBake.length; playerSkinImgIdx++) {
    imagesToLoad.push({
        skinName: skinImgsToBake[playerSkinImgIdx][0],
        display: function () {
            background(255, 0);
            pushMatrix();
            translate(212, 212);
            drawPlayerVector(this.skinName, 212, true);
            popMatrix();
        },

        w: 424,
        h: 424,
        name: skinImgsToBake[playerSkinImgIdx][1]
    });
}
for (var gameDataHoloPage in gameDataHoloPages) {
    imagesToLoad.push({
        name: gameDataHoloPages[gameDataHoloPage].name,
        page: gameDataHoloPage,
        display: drawGameDataHoloArt,
        w: 600,
        h: 600
    });
}
var assetLoad = {
    jobs: null,
    done: 0,
    total: 0,
    stripes: []
};
var advanceAssetLoad = function () {
    if (!assetLoad.jobs) {
        var jobs = [];
        for (var h = 0; h < holoNum; h++) {
            jobs.push({
                kind: "holo",
                index: h
            });
        }
        for (var a = 0; a < imagesToLoad.length; a++) {
            jobs.push({
                kind: "image",
                index: a
            });
        }
        jobs.push({
            kind: "bolts"
        });
        jobs.push({
            kind: "damage"
        });
        jobs.push({
            kind: "blood"
        });
        assetLoad.jobs = jobs;
        assetLoad.total = jobs.length;
        for (var row = 0; row < 600 + holoNum; row += 3) {
            assetLoad.stripes.push(map(noise(row / 5), 0, 1, 30, 300) + random(-3, 3));
        }
    }
    var job = assetLoad.jobs[assetLoad.done];
    if (!job) {
        return;
    }
    background(255, 255, 255, 0);
    if (job.kind === "holo") {
        background(255, 0);
        strokeWeight(3);
        for (var s = 0; s < assetLoad.stripes.length; s++) {
            var bright = assetLoad.stripes[s];
            stroke(bright * 0.8, bright * 1.2, 255);
            line(0, s * 3, 600, s * 3);
        }
        holos.push(get(0, holoNum - job.index, 600, 600));
    } else if (job.kind === "image") {
        imgIndex = job.index;
        curImg = imagesToLoad[job.index];
        curImg.display();
        loadedImages[curImg.name] = get(0, 0, curImg.w, curImg.h);
        if (curImg.skinName || curImg.name === "jetpack_sprite") {
            var shadowImage = get(0, 0, curImg.w, curImg.h);
            var shadowPixels = shadowImage.imageData.data;
            for (var shadowPixel = 0; shadowPixel < shadowPixels.length; shadowPixel += 4) {
                shadowPixels[shadowPixel] = 5;
                shadowPixels[shadowPixel + 1] = 8;
                shadowPixels[shadowPixel + 2] = 11;
                shadowPixels[shadowPixel + 3] = shadowPixels[shadowPixel + 3] * 0.42;
            }
            shadowImage.__isDirty = true;
            shadowImage.updatePixels();
            loadedImages[curImg.name + "_shadow"] = shadowImage;
        }
    } else if (job.kind === "bolts") {
        bakeBoltGlow();
    } else if (job.kind === "damage") {
        bakeDamageRim();
    } else if (job.kind === "blood") {
        bakeBloodSplatter();
    }
    assetLoad.done++;
    if (assetLoad.done === assetLoad.total) {
        assetLoad.jobs = [];
        assetLoad.stripes.length = 0;
    }
};

var imgIndex = -1; //Current index of the image being loaded
var treeCanopyPoints = [[0, 47], [39, 63], [42, 26], [74, 17], [53, -16], [57, -47], [26, -47], [0, -75], [-26, -47], [-59, -47], [-55, -18], [-70, 15], [-41, 28], [-39, 63]];

//The current image being loaded
/**Misc**/
var menuStars = []; //for loading stars
for (var i = 0; i < random(150, 200); i++) {
    menuStars.push({
        x: random(-50, 650),
        y: random(-50, 650),
        size: random(0.5, 2),
        color: color(random(150, 255), random(150, 255), 255, random(50, 255))
    });
}
var starWarsLogo = function (x, y, s, alpha) {
    alpha = alpha === undefined ? 255 : alpha;
    pushMatrix();
    scale(s);
    noFill();
    stroke(255, 204, 0, alpha);
    strokeWeight(5);
    //S
    line(x, y + 28, x, y - 4);
    line(x, y + 28, x + 85, y + 28);
    line(x, y - 4, x + 64, y - 4);
    line(x + 67, y - 5, x + 40, y - 42);
    arc(x + 88, y + 10, 35, 35, -35, 97);
    line(x + 102, y, x + 78, y - 36);
    arc(x + 58, y - 49, 37, 37, 158, 276);
    //T
    line(x + 81, y - 36, x + 130, y - 36);
    line(x + 51, y - 68, x + 205, y - 68);
    line(x + 130, y + 28, x + 130, y - 34);
    line(x + 160, y + 28, x + 160, y - 34);
    line(x + 130, y + 28, x + 160, y + 28);
    line(x + 160, y - 36, x + 205, y - 36);
    line(x + 205, y - 67, x + 205, y - 38);
    //A
    line(x + 278, y - 68, x + 235, y - 68);
    line(x + 234, y - 68, x + 192, y + 28);
    line(x + 192, y + 28, x + 221, y + 28);
    line(x + 221, y + 28, x + 229, y + 11);
    line(x + 229, y + 11, x + 270, y + 11);
    line(x + 274, y + 11, x + 281, y + 28);
    line(x + 281, y + 28, x + 310, y + 28);
    line(x + 280, y - 68, x + 310, y + 28);
    line(x + 238, y - 8, x + 268, y - 8);
    line(x + 238, y - 8, x + 253, y - 40);
    line(x + 268, y - 8, x + 253, y - 40);
    //R
    line(x + 323, y - 68, x + 323, y + 28);
    line(x + 323, y - 68, x + 390, y - 68);
    line(x + 323, y + 28, x + 353, y + 28);
    line(x + 353, y + 28, x + 353, y - 2);
    line(x + 353, y - 2, x + 389, y + 27);
    line(x + 389, y + 28, x + 452, y + 28);
    line(x + 452, y + 28, x + 452, y + 1);
    line(x + 452, y + 1, x + 389, y + 1);
    arc(x + 387, y - 33, 68, 70, -78, 90);
    line(x + 355, y - 26, x + 383, y - 26);
    line(x + 355, y - 41, x + 383, y - 41);
    line(x + 355, y - 26, x + 355, y - 41);
    arc(x + 383, y - 33, 14, 14, -78, 90);
    //W
    line(x, y + 58, x + 30, y + 58);
    line(x + 45, y + 58, x + 75, y + 58);
    line(x + 90, y + 58, x + 120, y + 58);
    line(x + 77, y + 150, x + 94, y + 150);
    line(x + 27, y + 150, x + 45, y + 150);
    line(x, y + 58, x + 27, y + 150);
    line(x + 120, y + 58, x + 94, y + 150);
    line(x + 47, y + 150, x + 60, y + 105);
    line(x + 60, y + 105, x + 77, y + 150);
    line(x + 30, y + 58, x + 38, y + 84);
    line(x + 38, y + 84, x + 45, y + 58);
    line(x + 75, y + 58, x + 83, y + 84);
    line(x + 90, y + 58, x + 83, y + 84);
    //A
    line(x + 146, y + 58, x + 186, y + 58);
    line(x + 146, y + 58, x + 121, y + 150);
    line(x + 186, y + 58, x + 214, y + 150);
    line(x + 121, y + 150, x + 139, y + 150);
    line(x + 214, y + 150, x + 192, y + 150);
    line(x + 192, y + 150, x + 185, y + 138);
    line(x + 141, y + 150, x + 148, y + 138);
    line(x + 148, y + 138, x + 185, y + 138);
    line(x + 154, y + 116, x + 179, y + 116);
    line(x + 154, y + 116, x + 168, y + 91);
    line(x + 179, y + 116, x + 168, y + 93);
    //R
    line(x + 230, y + 58, x + 230, y + 150);
    line(x + 230, y + 58, x + 300, y + 58);
    line(x + 230, y + 150, x + 261, y + 150);
    line(x + 261, y + 150, x + 261, y + 123);
    line(x + 261, y + 123, x + 294, y + 150);
    line(x + 297, y + 122, x + 305, y + 129);
    line(x + 281, y + 82, x + 263, y + 82);
    line(x + 281, y + 94, x + 263, y + 94);
    line(x + 262, y + 94, x + 262, y + 82);
    arc(x + 294, y + 89, 59, 63, -78, 90);
    arc(x + 283, y + 88, 10, 12, -78, 90);
    //S
    line(x + 294, y + 150, x + 401, y + 150);
    line(x + 304, y + 130, x + 372, y + 130);
    line(x + 373, y + 130, x + 356, y + 104);
    line(x + 419, y + 126, x + 392, y + 87);
    line(x + 395, y + 87, x + 452, y + 87);
    line(x + 370, y + 58, x + 452, y + 58);
    line(x + 452, y + 84, x + 452, y + 58);
    arc(x + 374, y + 84, 53, 53, -220, -85);
    arc(x + 406, y + 134, 32, 32, -24, 109);
    popMatrix();
};
var saberCoreWidth = 9;
var defaultSaber = {
    base: -33,
    tip: -26,
    reach: 300,
    light: "blue"
};
var saberStyles = {
    "Ahsoka Tano": {
        base: -33,
        tip: -26,
        reach: 300,
        light: "white",
        dual: true,
        offhandScale: 0.78,
        offhandReverse: true
    },
    "Yoda": {
        base: -33,
        tip: -26,
        reach: 300,
        light: "green"
    },
    "Kylo Ren": {
        base: -43,
        tip: -36,
        reach: 300,
        light: "red",
        guard: true
    },

    "Darth Vader": {
        base: -33,
        tip: -26,
        reach: 300,
        light: "red"
    },

    "Darth Maul": {
        base: -60,
        tip: -60,
        reach: 240,
        light: "red",
        staff: true,
        spinScale: 1 / 1.5
    }
};
var saberStyle = function (name) {
    return saberStyles[name] || defaultSaber;
};
var saberGrip = function (skinName, side) {
    return saberStyle(skinName).dual ? { x: side * 33, y: -12 } : { x: 27, y: -28 };
};

var updateAhsokaPose = function (saber, pos, skinName, actor) {
    if (skinName !== "Ahsoka Tano" || saber.parentSaber) {
        return;
    }
    var now = tickClock.gameMs;
    var pose = saber.dualPose;
    if (!pose) {
        pose = saber.dualPose = {
            main: -35,
            offhand: 35,
            run: 0,
            nearEnemy: false,
            nextScan: 0,
            at: now - tickClock.baseMs
        };
    }
    if (pose.at === now) {
        return;
    }
    var isPlayer = typeof currentGun !== "undefined" && currentGun === saber;
    var team = isPlayer ? playerTeam : actor ? actor.team : null;
    if (now >= pose.nextScan) {
        pose.nearEnemy = false;
        if (typeof currentMap !== "undefined" && currentMap && currentMap.entities) {
            for (var z = floor(pos.z) - 1; z <= floor(pos.z) + 1; z++) {
                var list = currentMap.entities[z] || [];
                for (var i = 0; i < list.length; i++) {
                    var enemy = list[i];
                    if (enemy && enemy.isMatchBot && enemy.pos && enemy.pos !== pos && enemy.team !== team && enemy.health > 0 && abs(enemy.pos.z - pos.z) < 0.8 && dist(pos.x, pos.y, enemy.pos.x, enemy.pos.y) < 360) {
                        pose.nearEnemy = true;
                        break;
                    }
                }
            }
        }
        if (actor && playerHealth > 0 && actor.team !== playerTeam && abs(playerPos.z - pos.z) < 0.8 && dist(pos.x, pos.y, playerPos.x, playerPos.y) < 360) {
            pose.nearEnemy = true;
        }
        pose.nextScan = now + 100;
    }
    var swinging = saber.clicked || abs(saber.spinVelocity || 0) > 1.5 || (isPlayer && leftHeld());
    var combat = swinging || pose.nearEnemy;
    var running = isPlayer && !combat && inventoryState.selected === 0 && isPlayerSprinting() && playerVel.x * playerVel.x + playerVel.y * playerVel.y > 0.3;
    var dueling = typeof inSaberDuel === "function" && inSaberDuel(actor || null);
    var main = running ? 165 : swinging || dueling ? saber.swing + saber.spinAngle : -35;
    var offhand = running ? 195 : combat ? -(saber.swing + saber.spinAngle) + 180 : 35;
    pose.main = main;
    pose.offhand = offhand;
    pose.run = running ? 1 : 0;
    pose.at = now;
};
var saberHeldAngle = function (saber, skinName, side) {
    if (skinName === "Ahsoka Tano" && !saber.parentSaber) {
        var pose = saber.dualPose;
        return pose ? side < 0 ? pose.offhand : pose.main : side < 0 ? 35 : -35;
    }
    return (saber.swing + saber.spinAngle) * (saberStyle(skinName).dual ? side : 1) + (side < 0 && saberStyle(skinName).offhandReverse ? 180 : 0);
};
var heldSaberSide = function (saber, side) {
    var thrown = saber.dualThrows && saber.dualThrows[side];
    return !saber.throwState && !(thrown && thrown.throwState);
};
var hasHeldSaber = function (saber, skinName) {
    return !!saber && (saberStyle(skinName).dual && !saber.parentSaber ? heldSaberSide(saber, 1) || heldSaberSide(saber, -1) : !saber.throwState);
};
var glowLine = function (x1, y1, x2, y2, glowColor, vertical, coreOpacity) {
    var glowStep = lowDetailMode ? 3 : 1;
    stroke(lowDetailMode ? color(red(glowColor), green(glowColor), blue(glowColor), 255 * (1 - pow(1 - alpha(glowColor) / 255, 20 / 7))) : glowColor);
    for (var i = 0; i < 20; i += glowStep) {
        strokeWeight(saberCoreWidth + i * 1.3);
        if (vertical) {
            line(x1, y1 + saberCoreWidth / 1.75, x2, y2 - saberCoreWidth / 1.75);
        } else {
            line(x1 + saberCoreWidth / 1.75, y1, x2 - saberCoreWidth / 1.75, y2);
        }
    }
    stroke(255, 255, 255, coreOpacity === undefined ? 230 : coreOpacity);
    strokeWeight(saberCoreWidth);
    line(x1, y1, x2, y2);
};
var lightsaber = function (x, y, s, r, type, on, bladeLength) {
    var drawnBladeLength = bladeLength !== undefined ? bladeLength : on ? 1 : 0;
    pushStyle();
    rectMode(CENTER);
    pushMatrix();
    translate(x, y);
    scale(s / 390);
    rotate(r);
    var blade = saberStyle(type);
    if (blade.staff) {
        if (drawnBladeLength > 0.01) {
            var tip = -blade.tip + blade.reach * drawnBladeLength;
            glowLine(0, blade.base, 0, -tip, color(255, 0, 0, 32), true, 255);
            glowLine(0, tip, 0, -blade.base, color(255, 0, 0, 32), true, 255);
        }
        stroke(22, 21, 26);
        strokeWeight(4);
        fill(115, 112, 120);
        rect(0, 0, 18, 120, 4);
        noStroke();
        fill(48, 43, 52);
        rect(0, 0, 15, 51, 3);
        for (var side = -1; side <= 1; side += 2) {
            fill(163, 158, 163);
            rect(0, side * 48, 20, 12, 2);
            fill(195, 35, 44);
            rect(0, side * 30, 5, 8, 2);
        }
    } else if (blade.guard) {
        var kyloLength = drawnBladeLength;
        if (kyloLength > 0.01) {
            glowLine(0, blade.base, 0, blade.tip - blade.reach * kyloLength, color(255, 0, 0, 32), true, 255);
            glowLine(0, -19, 0 + 50 * kyloLength, -19, color(255, 0, 0, 32), false, 255);
            glowLine(0, -19, 0 - 50 * kyloLength, -19, color(255, 0, 0, 32), false, 255);
        }
        strokeWeight(4);
        fill(41, 41, 41);
        stroke(20);
        rect(0, 0, 15, 80, 5);
        rect(0, -19, 40, 15, 5);
        noStroke();
        rect(0, 0, 12, 77, 5);
    } else {
        pushMatrix();
        translate(0, 10);
        var lukeLength = drawnBladeLength;
        if (lukeLength > 0.01) {
            glowLine(0, blade.base - 10, 0, blade.tip - 10 - blade.reach * lukeLength, blade.light === "red" ? color(255, 0, 0, 32) : blade.light === "green" ? color(65, 235, 90, 48) : blade.light === "white" ? color(215, 235, 255, 42) : color(48, 139, 255, 48), true, 255);
        }
        strokeWeight(4);
        fill(41, 41, 41);
        stroke(20);
        rect(0, 0, 15, 80, 5);
        popMatrix();
    }
    popMatrix();
    popStyle();
};
imagesToLoad.push(
{
    name: "saber_hotbar_blue",
    w: 64,
    h: 64,
    display: function () {
        lightsaber(23, 48, 48, 35, "Luke Skywalker", true, 1);
    }
},
{
    name: "saber_hotbar_red",
    w: 64,
    h: 64,
    display: function () {
        lightsaber(23, 48, 48, 35, "Kylo Ren", true, 1);
    }
},
{
    name: "saber_hotbar_green",
    w: 64,
    h: 64,
    display: function () {
        lightsaber(23, 48, 48, 35, "Yoda", true, 1);
    }
}
);
imagesToLoad.push({
    name: "saber_hotbar_white",
    w: 64,
    h: 64,
    display: function () {
        lightsaber(20, 48, 42, 25, "Ahsoka Tano", true, 1);
        lightsaber(42, 18, 34, 205, "Ahsoka Tano", true, 1);
    }
});
var loadScreen = function () {
    textAlign(CENTER, CENTER);
    textFont(basicHeaderFont, 12);
    background(0, 0, 15);
    noStroke();
    for (var s = 0; s < menuStars.length; s++) {
        fill(menuStars[s].color);
        ellipse((menuStars[s].x * width) / 600, (menuStars[s].y * height) / 600, menuStars[s].size, menuStars[s].size);
    }
    pushMatrix();
    translate((width - 600) / 2, (height - 600) / 2);
    starWarsLogo(145, 105, 0.8);
    textSize(43);
    textMode(CENTER);
    for (var c = 0; c < 30; c++) {
        fill(255, 0, 0);
        textMode(CENTER);
        text("B A T T L E F R O N T", 300 + sin(c * 10) * 2, 240 + cos(c * 10) * 2);
    }
    fill(8, 8, 8);
    textMode(CENTER);
    text("B A T T L E F R O N T", 300, 240);
    fill(255, 204, 0);
    textSize(40);
    text("L O A D I N G . . .", 300, 323);
    if (assetLoad.done < assetLoad.total) {
        glowLine(450, 400, 100 + (assetLoad.total ? assetLoad.done / assetLoad.total : 0) * 350, 400, color(0, 0, 255, 30), false);
        pushMatrix();
        translate(500, 400);
        rotate(90);
        strokeWeight(13);
        stroke(31, 31, 31);
        line(200 - 200, -20, 200 - 200, 330 - 275 - 10);
        stroke(201, 201, 201);
        line(200 - 200, -9, 200 - 200, 305 - 275 - 10 - 9);
        stroke(201, 201, 201);
        line(200 - 200, 35, 200 - 200, 330 - 275 - 15);
        fill(255, 0, 0);
        noStroke();
        ellipse(0, 20 - 10, 7, 9);
        popMatrix();
    }
    popMatrix();
};
gameStage = "ImageLoad";
stageTransition = {
    active: false,
    x: -850,
    switched: false,
    nextStage: "",
    afterSwitch: null
};
startStageTrans = function (nextStage, afterSwitch) {
    if (stageTransition.active) {
        return;
    }
    if (gameStage === "FullCredits" && nextStage !== "FullCredits") {
        stopCreditsMusic(true);
    }
    stageTransition.active = true;
    stageTransition.x = width + 200;
    stageTransition.switched = false;
    stageTransition.nextStage = nextStage;
    stageTransition.afterSwitch = afterSwitch || null;
    if (nextStage === "FullCredits") {
        creditsMusic.cueAt = millis();
        creditsMusic.started = false;
        creditsMusic.retryAt = 0;
        playCreditsMusic();
    }
};
var drawStageTrans = function () {
    if (!stageTransition.active) {
        return;
    }
    noStroke();
    fill(194, 194, 194);
    quad(stageTransition.x, 0, stageTransition.x - 200, height, stageTransition.x + width, height, stageTransition.x + width + 200, 0);
    stageTransition.x = lerp(stageTransition.x, stageTransition.switched ? -width - 240 : 0, 1 - pow(1 - (stageTransition.switched ? 0.16 : 0.18), tickClock.renderScale));
    if (!stageTransition.switched && stageTransition.x < 8) {
        if (stageTransition.afterSwitch) {
            stageTransition.afterSwitch();
        }
        gameStage = stageTransition.nextStage;
        stageTransition.switched = true;
    }
    if (stageTransition.switched && stageTransition.x < -width - 210) {
        stageTransition.active = false;
        stageTransition.afterSwitch = null;
    }
};
findTDMSpawn = function (teamId) {
    var teamCluster = currentMap._matchClusterSpawns && currentMap._matchClusterSpawns[teamId] ? currentMap._matchClusterSpawns[teamId] : currentMap.spawnPos;
    var supremacy = isSupremacy();
    var spawnX = teamCluster.x;
    var spawnY = teamCluster.y;
    var spawnZ = supremacy ? 0.001 : teamCluster.z;
    for (var attempt = 0; attempt < 180; attempt++) {
        var testX = attempt < 35 && teamCluster ? teamCluster.x + cos(random(0, 360)) * random(160, 520) : random(-currentMap.width / 2 + 90, currentMap.width / 2 - 90);
        var testY = attempt < 35 && teamCluster ? teamCluster.y + sin(random(0, 360)) * random(160, 520) : random(-currentMap.height / 2 + 90, currentMap.height / 2 - 90);
        testX = constrain(testX, -currentMap.width / 2 + 70, currentMap.width / 2 - 70);
        testY = constrain(testY, -currentMap.height / 2 + 70, currentMap.height / 2 - 70);
        var clearOfEntities = dist(testX, testY, playerPos.x, playerPos.y) > hitboxSize * 4.2;
        for (var z = currentMap.killZ; z < currentMap.topZ + 2 && clearOfEntities; z++) {
            var entList = currentMap.entities[z];
            if (!entList) {
                continue;
            }
            for (var e = 0; e < entList.length; e++) {
                var ent = entList[e];
                if (ent && ent.pos && dist(testX, testY, ent.pos.x, ent.pos.y) < hitboxSize * 4.2) {
                    clearOfEntities = false;
                    break;
                }
            }
        }
        if (!clearOfEntities) {
            continue;
        }
        var testZ = spawnFloorZ(testX, testY, hitboxSize, supremacy);
        if (testZ !== null) {
            return new PVector(testX, testY, testZ + 0.001);
        }
    }
    if (supremacy) {
        var anchor = supPoint(spawnX, spawnY, hitboxSize);
        if (anchor) {
            return new PVector(anchor.x, anchor.y, spawnZ);
        }
    }
    return new PVector(spawnX, spawnY, spawnZ);
};
var awardTDMKill = function (killerTeam, victimTeam) {
    if (matchState.gameMode !== "Team Deathmatch" || matchState.phase !== "live") {
        return;
    }
    if (killerTeam === undefined || victimTeam === undefined || killerTeam === victimTeam) {
        return;
    }
    matchState.teamScores[killerTeam] = (matchState.teamScores[killerTeam] || 0) + 1;
    if (matchState.teamScores[killerTeam] >= matchState.scoreLimit && matchState.phase !== "ending") {
        matchState.phase = "ending";
        matchState.winnerTeam = killerTeam;
        matchState.endingFrame = 0;
        if (matchState.winnerTeam === playerTeam && !matchState.creditsAwarded) {
            matchState.lastCreditAward = floor(random(90, 141)) * 5 + matchState.playerKills * floor(random(8, 16)) * 5;
            addCreditChange(matchState.lastCreditAward);
            matchState.creditsAwarded = true;
        }
        settleCreditDisplay();
    }
};
var updateBotRespawns = function () {
    if (!currentMap || !currentMap.entities || (matchState.gameMode !== "Team Deathmatch" && !isSupremacy()) || matchState.phase !== "live") {
        return;
    }
    for (var r = matchState.botRespawns.length - 1; r >= 0; r--) {
        matchState.botRespawns[r].timer -= tickClock.scale;
        if (matchState.botRespawns[r].timer > 0) {
            continue;
        }
        var data = matchState.botRespawns[r];
        var pos = findTDMSpawn(data.team);
        var bot = new AIPlayer({
            x: pos.x,
            y: pos.y,
            z: pos.z,
            team: data.team,
            skin: data.skin,
            temper: data.temper,
            walkSpeed: data.walkSpeed !== undefined ? data.walkSpeed : undefined
        });
        bot.isMatchBot = true;
        bot.wasPlayerSquad = data.wasPlayerSquad;
        bot.inPlayerSquad = hasCommsHeadset() && squadEnabled && data.inPlayerSquad;
        var layer = constrain(floor(bot.pos.z), currentMap.killZ, currentMap.topZ + 1);
        if (!currentMap.entities[layer]) {
            currentMap.entities[layer] = [];
        }
        currentMap.entities[layer].push(bot);
        matchState.botRespawns.splice(r, 1);
    }
};
var drawSquadButton = function () {
    if (!hasCommsHeadset()) {
        return;
    }
    squadCmdButton.x = width - 232;
    squadCmdButton.y = 19;
    squadCmdButton.w = 118;
    squadCmdButton.h = 30;
    squadPowerButton.x = squadCmdButton.x - squadCmdButton.w / 2 - squadPowerButton.w / 2 - 8;
    squadPowerButton.y = squadCmdButton.y;
    squadPowerButton.w = 54;
    squadPowerButton.h = 30;
    var hover = mouseX >= squadCmdButton.x - squadCmdButton.w / 2 && mouseX <= squadCmdButton.x + squadCmdButton.w / 2 && mouseY >= squadCmdButton.y - squadCmdButton.h / 2 && mouseY <= squadCmdButton.y + squadCmdButton.h / 2;
    var powerHover = mouseX >= squadPowerButton.x - squadPowerButton.w / 2 && mouseX <= squadPowerButton.x + squadPowerButton.w / 2 && mouseY >= squadPowerButton.y - squadPowerButton.h / 2 && mouseY <= squadPowerButton.y + squadPowerButton.h / 2;
    rectMode(CENTER);
    strokeWeight(2);
    stroke(squadEnabled ? color(90, 180, 255) : color(255, 80, 80, 190));
    fill(squadEnabled ? color(15, 75, 110, powerHover ? 235 : 190) : color(75, 15, 15, powerHover ? 230 : 185));
    rect(squadPowerButton.x, squadPowerButton.y, squadPowerButton.w, squadPowerButton.h, 5);
    textAlign(CENTER, CENTER);
    textSize(13);
    noStroke();
    fill(squadEnabled ? color(185, 230, 255) : color(255, 150, 150));
    text(!hasCommsHeadset() ? "COMMS" : squadEnabled ? "ON" : "OFF", squadPowerButton.x, squadPowerButton.y);
    strokeWeight(2);
    stroke(squadCommandMode ? color(90, 180, 255) : color(255, 245, 180, 180));
    fill(!squadEnabled ? color(20, 20, 20, hover ? 175 : 120) : squadCommandMode ? color(20, 70, 115, hover ? 235 : 205) : color(0, 0, 0, hover ? 190 : 145));
    rect(squadCmdButton.x, squadCmdButton.y, squadCmdButton.w, squadCmdButton.h, 5);
    textAlign(CENTER, CENTER);
    textSize(13);
    noStroke();
    fill(!squadEnabled ? color(140, 140, 140) : squadCommandMode ? color(185, 230, 255) : color(255, 245, 180));
    var squadCount = 0;
    if (squadEnabled && currentMap && currentMap.entities) {
        for (var squadZ = currentMap.killZ; squadZ < currentMap.topZ + 2; squadZ++) {
            var squadList = currentMap.entities[squadZ];
            if (!squadList) {
                continue;
            }
            for (var squadE = 0; squadE < squadList.length; squadE++) {
                if (squadList[squadE] && squadList[squadE].inPlayerSquad && squadList[squadE].health > 0) {
                    squadCount++;
                }
            }
        }
    }
    text("SQUAD " + squadCount, squadCmdButton.x, squadCmdButton.y);
};
var findAllyClick = function () {
    if (!currentMap || !currentMap.entities || !camPos) {
        return null;
    }
    var best = null;
    var bestD = 999999;
    for (var z = currentMap.killZ; z < currentMap.topZ + 2; z++) {
        var list = currentMap.entities[z];
        if (!list) {
            continue;
        }
        for (var e = 0; e < list.length; e++) {
            var ent = list[e];
            if (!ent || !ent.isMatchBot || ent.team !== playerTeam || ent.health <= 0 || !ent.pos) {
                continue;
            }
            if (abs(ent.pos.z - playerPos.z) > 2.2) {
                continue;
            }
            var allyScreen = worldToScreen(ent.pos.x, ent.pos.y, ent.pos.z);
            var d = dist(mouseX, mouseY, allyScreen.x, allyScreen.y);
            if (d < max(8, max(ent.colSize || hitboxSize, 36) * 1.35 * zoom) && d < bestD) {
                best = ent;
                bestD = d;
            }
        }
    }
    return best;
};
var handleSquadClick = function () {
    syncSquadHeadset();
    if (!leftHeld()) {
        squadClickLock = false;
    }
    if (!hasCommsHeadset() || mouseClick !== true || squadClickLock || gameStage !== "Play") {
        return false;
    }
    squadCmdButton.x = width - 232;
    squadCmdButton.y = 19;
    squadCmdButton.w = 118;
    squadCmdButton.h = 30;
    squadPowerButton.x = squadCmdButton.x - squadCmdButton.w / 2 - squadPowerButton.w / 2 - 8;
    squadPowerButton.y = squadCmdButton.y;
    squadPowerButton.w = 54;
    squadPowerButton.h = 30;
    var powerHover = mouseX >= squadPowerButton.x - squadPowerButton.w / 2 && mouseX <= squadPowerButton.x + squadPowerButton.w / 2 && mouseY >= squadPowerButton.y - squadPowerButton.h / 2 && mouseY <= squadPowerButton.y + squadPowerButton.h / 2;
    if (powerHover) {
        squadEnabled = hasCommsHeadset() && !squadEnabled;
        squadCommandMode = false;
        if (currentMap && currentMap.entities) {
            for (var powerZ = currentMap.killZ; powerZ < currentMap.topZ + 2; powerZ++) {
                var powerList = currentMap.entities[powerZ];
                if (!powerList) {
                    continue;
                }
                for (var powerE = 0; powerE < powerList.length; powerE++) {
                    if (powerList[powerE] && powerList[powerE].isMatchBot && powerList[powerE].team === playerTeam) {
                        if (!squadEnabled) {
                            powerList[powerE].wasPlayerSquad = powerList[powerE].wasPlayerSquad || powerList[powerE].inPlayerSquad;
                            powerList[powerE].inPlayerSquad = false;
                        } else if (powerList[powerE].wasPlayerSquad) {
                            powerList[powerE].inPlayerSquad = true;
                        }
                    }
                }
            }
        }
        squadClickLock = true;
        mouseClick = null;
        return true;
    }
    if (mouseX >= squadCmdButton.x - squadCmdButton.w / 2 && mouseX <= squadCmdButton.x + squadCmdButton.w / 2 && mouseY >= squadCmdButton.y - squadCmdButton.h / 2 && mouseY <= squadCmdButton.y + squadCmdButton.h / 2) {
        if (!squadEnabled) {
            squadClickLock = true;
            mouseClick = null;
            return true;
        }
        squadCommandMode = !squadCommandMode;
        squadClickLock = true;
        mouseClick = null;
        return true;
    }
    if (!squadEnabled || !squadCommandMode || !(gameStage === "Play" && matchState.phase === "live" && !stageTransition.active)) {
        return false;
    }
    var clickedAlly = findAllyClick();
    if (clickedAlly) {
        clickedAlly.inPlayerSquad = !clickedAlly.inPlayerSquad;
        clickedAlly.wasPlayerSquad = clickedAlly.inPlayerSquad;
        squadClickLock = true;
        mouseClick = null;
        return true;
    }
    return false;
};
var sniperDuelLoadout = null;
var restoreSniperDuelLoadout = function () {
    if (!sniperDuelLoadout) {
        return;
    }
    character = sniperDuelLoadout.character;
    currentGun = sniperDuelLoadout.gun;
    sniperDuelLoadout = null;
    inventoryState.selected = 0;
    inventoryState.lastWeapon = null;
};
resetMatchForHome = function () {
    for (var pendingJob = 0; pendingJob < perceptionQueue.jobs.length; pendingJob++) {
        perceptionQueue.jobs[pendingJob].bot._perceptionJob = null;
    }
    perceptionQueue.jobs.length = 0;
    perceptionQueue.cursor = 0;
    perceptionQueue.map = null;
    forceGrip = null;
    forceGripReadyAt = 0;
    forceDoorUntil = 0;
    forceHandBlend = 0;
    pauseState.active = false;
    pauseState.resuming = false;
    pauseState.resumeStartedAt = 0;
    pauseState.frame = null;
    pauseState.blockMouseUntilRelease = false;
    if (currentMap) {
        currentMap.sup = null;
    }
    dashBill = null;
    resetLightning();
    resetCombatFX();
    resetSaberThrows();
    restoreSniperDuelLoadout();
    clearGameInput();
    inventoryState.selected = 0;
    inventoryState.cosmeticsOpen = false;
    clearPlacedCrates(currentMap);
    tickClock.accumulatorMs = 0;
    if (currentMap && currentMap.entities) {
        prepMap(currentMap);
        for (var resetZ = currentMap.killZ; resetZ < currentMap.topZ + 2; resetZ++) {
            if (typeof recycleProjectile === "function") {
                for (var resetEnt = 0; resetEnt < currentMap.entities[resetZ].length; resetEnt++) {
                    recycleProjectile(currentMap.entities[resetZ][resetEnt]);
                }
            }
            currentMap.entities[resetZ] = [];
        }
        currentMap._initialTeamBotsSpawned = false;
        currentMap._matchClusterSpawns = null;
        currentMap._matchPlayerSpawn = null;
        matchState.botRespawns = [];
    }
    squadCommandMode = false;
    deathScreenActive = false;
    deathScreenFrame = 0;
    deathTransStarted = false;
    deathScorePaid = false;
    matchState.phase = "idle";
    matchState.countdownFrame = 0;
    matchState.countdownStarted = false;
    matchState.winCheckFrame = 0;
    matchState.endingFrame = 0;
    matchState.playerKills = 0;
    matchState.teamScores = [0, 0];
    matchState.botRespawns = [];
    matchState.lastCreditAward = 0;
    matchState.creditsAwarded = false;
    matchState.winnerTeam = -1;
    creditPopups = [];
    playerVel.mult(0);
    playerHealth = playerMaxHealth;
    playerGraceEndMs = tickClock.gameMs + spawnGraceMs;
    resetPlayerShield();
    playerForce = playerMaxForce;
    settleCreditDisplay();
};
addCreditChange = function (amount, x, y) {
    if (amount === 0) {
        return;
    }
    playerCredits += amount;
    gameSaveDirty = true;
    gameSaveSoon = true;
    if (amount > 0 && typeof recordAchievement === "function") {
        recordAchievement("credits", amount);
    }
    if (x !== undefined && y !== undefined) {
        creditPopups.push({
            x: x,
            y: y,
            amount: amount,
            life: 90,
            maxLife: 90
        });
    }
};
var transitionToPlay = function (nextMap, mode) {
    if (stageTransition.active) {
        return;
    }
    nextMap = nextMap || getSelectedMap();
    if (!nextMap) {
        return;
    }
    startStageTrans("Play", function () {
        restoreSniperDuelLoadout();
        getSelectedCharData();
        if (!currentGun) {
            currentGun = new Lightsaber({
            });
        }
        currentMap = nextMap;
        for (var doorIndex = 0; doorIndex < currentMap.doors.length; doorIndex++) {
            var door = currentMap.doors[doorIndex];
            door.manualOpen = undefined;
            door.manualUntil = undefined;
        }
        resetCrates(currentMap);
        resetSaberClock();
        resetCombatFX();
        tickClock.gameMs = 0;
        tickClock.tick = 0;
        tickClock.accumulatorMs = 0;
        dangerSense = 0;
        currentMap._aliveCountAtMs = undefined;
        currentMap._aliveBotCount = 0;
        minimapView.nextUpdateMs = 0;
        clearGameInput();
        prepMap(currentMap);
        squadCommandMode = false;
        matchState.gameMode = mode || matchGameModes[matchModeIndex % matchGameModes.length];
        if (matchState.gameMode === "Sniper Duel") {
            sniperDuelLoadout = {
                character: character,
                gun: currentGun
            };
            currentGun = Sniper;
            character = "Specialist";
            inventoryState.selected = 0;
        }
        squadEnabled = hasCommsHeadset() && matchState.gameMode !== "Battle Royale";
        deathScreenActive = false;
        deathScreenFrame = 0;
        deathTransStarted = false;
        deathScorePaid = false;
        playerForce = playerMaxForce;
        if (currentMap && currentMap.entities) {
            textFont(matchFont, 20);
            prepMap(currentMap);
            for (var transitionZ = currentMap.killZ; transitionZ < currentMap.topZ + 2; transitionZ++) {
                if (typeof recycleProjectile === "function") {
                    for (var transitionEnt = 0; transitionEnt < currentMap.entities[transitionZ].length; transitionEnt++) {
                        recycleProjectile(currentMap.entities[transitionZ][transitionEnt]);
                    }
                }
                currentMap.entities[transitionZ] = [];
            }
            currentMap._initialTeamBotsSpawned = false;
            currentMap._matchClusterSpawns = null;
            currentMap._matchPlayerSpawn = null;
            matchState.botRespawns = [];
        }
        currentMap._initialTeamBotsSpawned = false;
        playerDeaths = -1;
        playerDie(true);
        matchState.phase = "countdown";
        matchState.countdownFrame = 0;
        matchState.countdownStarted = false;
        matchState.winCheckFrame = 0;
        matchState.endingFrame = 0;
        matchState.playerKills = 0;
        matchState.teamScores = [0, 0];
        matchState.botRespawns = [];
        matchState.lastCreditAward = 0;
        matchState.creditsAwarded = false;
        matchState.winnerTeam = -1;
        settleCreditDisplay();
    });
};
var achievementStats = {
    kills: 0,
    wins: 0,
    matches: 0,
    parries: 0,
    credits: 0,
    throws: 0,
    seconds: 0
};
var achievementUnlocked = {
};
var notices = [];
var noticeMs = 0;
var matchCounted = false;
var achievementFont = '"Cascadia Code", "Source Code Pro", monospace';
var achievementTracks = [
    {
        stat: "kills",
        icon: "target",
        tiers: [[25, "Frontline Fighter"], [100, "Battle Hardened"], [250, "One-Person Army"], [500, "Shock Trooper"], [1000, "Force of Nature"], [2500, "Unstoppable"], [5000, "Walking Arsenal"], [10000, "Galactic Menace"], [25000, "The Final Order"]]
    },
    {
        stat: "wins",
        icon: "medal",
        tiers: [[3, "A New Hope"], [10, "Rising Star"], [25, "Squad Legend"], [50, "Battle Commander"], [100, "Hero of the Galaxy"], [250, "Supreme Strategist"], [500, "Bring Balance"]]
    },
    {
        stat: "matches",
        icon: "flag",
        tiers: [[10, "Reporting for Duty"], [25, "Regular Deployment"], [75, "Veteran"], [150, "Career Soldier"], [300, "Tour of the Galaxy"], [750, "The Long Campaign"]]
    },
    {
        stat: "parries",
        icon: "shield",
        tiers: [[5, "Return to Sender"], [25, "Iron Defense"], [75, "You Shall Not Pass"], [150, "Perfect Timing"], [300, "Unbreakable Guard"], [750, "Saber Sentinel"], [1500, "Immovable Object"]]
    },
    {
        stat: "credits",
        icon: "credits",
        tiers: [[5000, "Pocket Change"], [25000, "Well Paid"], [75000, "Galactic Fortune"], [150000, "Bounty Hunter"], [300000, "Trade Federation"], [750000, "Galactic Treasury"], [1500000, "Fund the Rebellion"]]
    },
    {
        stat: "throws",
        icon: "saber",
        tiers: [[10, "Let It Fly"], [50, "Remote Control"], [150, "Orbit Master"], [300, "Beyond the Blade"], [750, "Force Guided"], [1500, "Endless Orbit"], [3000, "Master of Recall"]]
    },
    {
        stat: "seconds",
        icon: "clock",
        tiers: [[900, "Boots on the Ground"], [3600, "Long Watch"], [10800, "No Shore Leave"], [36000, "Never Off Duty"], [90000, "Part of the Fleet"]]
    }
];
var achievementItems = [];
for (var achievementTier = 0; achievementTier < 9; achievementTier++) {
    for (var trackIndex = 0; trackIndex < achievementTracks.length; trackIndex++) {
        var achievementTrack = achievementTracks[trackIndex];
        var milestone = achievementTrack.tiers[achievementTier];
        if (!milestone) {
            continue;
        }
        var achievementGoal = milestone[0];
        var achievementAmount = String(achievementGoal).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        var achievementDesc = "";
        if (achievementTrack.stat === "kills") {
            achievementDesc = "Eliminate " + achievementAmount + " enemies.";
        } else if (achievementTrack.stat === "wins") {
            achievementDesc = "Win " + achievementAmount + " matches.";
        } else if (achievementTrack.stat === "matches") {
            achievementDesc = "Finish " + achievementAmount + " matches.";
        } else if (achievementTrack.stat === "parries") {
            achievementDesc = "Deflect " + achievementAmount + " flying lightsabers.";
        } else if (achievementTrack.stat === "credits") {
            achievementDesc = "Earn " + achievementAmount + " credits in battle.";
        } else if (achievementTrack.stat === "throws") {
            achievementDesc = "Throw your lightsaber " + achievementAmount + " times.";
        } else {
            achievementDesc = "Spend " + (achievementGoal < 3600 ? achievementGoal / 60 + " minutes" : achievementGoal / 3600 + (achievementGoal === 3600 ? " hour" : " hours")) + " in live matches.";
        }
        achievementItems.push({
            id: achievementTrack.stat + "-" + achievementGoal,
            name: milestone[1],
            description: achievementDesc,
            stat: achievementTrack.stat,
            goal: achievementGoal,
            icon: achievementTrack.icon
        });
    }
}
var achievementUI = {
    scroll: 0,
    target: 0,
    velocity: 0,
    down: false,
    dragging: false,
    startScreenX: 0,
    startScreenY: 0,
    lastScreenY: 0,
    dragScaleY: 1,
    pressed: -1,
    selected: -1,
    displayed: -1,
    expansion: 0,
    originX: 300,
    originY: 260,
    originRadius: 38,
    transform: null
};
var achievementCanvas = null;
var loadAchievementStats = function (stats) {
    achievementUnlocked = {
    };
    notices.length = 0;
    noticeMs = 0;
    matchCounted = false;
    for (var stat in achievementStats) {
        if (achievementStats.hasOwnProperty(stat)) {
            achievementStats[stat] = stats && typeof stats[stat] === "number" && isFinite(stats[stat]) ? max(0, stats[stat]) : 0;
        }
    }
    for (var i = 0; i < achievementItems.length; i++) {
        var item = achievementItems[i];
        if (achievementStats[item.stat] >= item.goal) {
            achievementUnlocked[item.id] = true;
        }
    }
};
recordAchievement = function (stat, amount) {
    if (!achievementStats.hasOwnProperty(stat) || !(amount > 0)) {
        return;
    }
    achievementStats[stat] += amount;
    gameSaveDirty = true;
    if (stat !== "seconds") {
        gameSaveSoon = true;
    }
    for (var i = 0; i < achievementItems.length; i++) {
        var item = achievementItems[i];
        if (item.stat === stat && achievementStats[stat] >= item.goal && !achievementUnlocked[item.id]) {
            achievementUnlocked[item.id] = true;
            notices.push({
                label: "Achievement unlocked",
                title: item.name,
                icon: item.icon
            });
        }
    }
};
var tickAchievements = function () {
    if (gameStage === "Play") {
        if (matchState.phase === "countdown" || matchState.phase === "live") {
            matchCounted = false;
        }
        if (matchState.phase === "live" && !stageTransition.active) {
            recordAchievement("seconds", min(120, max(0, tickClock.renderScale * tickClock.baseMs)) / 1000);
        }
        if (matchState.phase === "ending" && !matchCounted) {
            matchCounted = true;
            recordAchievement("matches", 1);
            if (matchState.winnerTeam === playerTeam) {
                recordAchievement("wins", 1);
            }
        }
    }
    if (gameSaveDirty && gameSaveStorage && (gameSaveSoon || tickClock.realMs - gameSaveAt >= 2000)) {
        saveGameData();
    }
};
var achievementBubble = function (index, scroll) {
    var row = floor(index / 5) * 2;
    var col = index % 5;
    var count = 3;
    if (col >= 3) {
        row++;
        col -= 3;
        count = 2;
    }
    var x = 300 + (col - (count - 1) / 2) * 90;
    var y = 192 + row * 76 - scroll;
    var focus = constrain(1 - abs(y - 268) / 166, 0, 1);
    return {
        x: x,
        y: y,
        radius: 41 * (0.18 + 0.82 * pow(focus, 0.7))
    };
};
var dragAchievements = function () {
    var ui = achievementUI;
    if (!mouseIsPressed) {
        if (ui.dragging) {
            ui.down = false;
            ui.dragging = false;
            ui.pressed = -1;
        }
        return;
    }
    if (ui.down) {
        var dx = abs(mouseX - ui.startScreenX);
        var dy = abs(mouseY - ui.startScreenY);
        var distance = sqrt(dx * dx + dy * dy);
        if (distance > 8) {
            ui.dragging = true;
        }
        if (ui.dragging && ui.selected < 0 && ui.expansion < 0.05) {
            var deltaY = (ui.lastScreenY - mouseY) / ui.dragScaleY;
            ui.velocity = constrain(deltaY, -24, 24);
            ui.target = constrain(ui.target + deltaY, 0, max(0, achievementBubble(achievementItems.length - 1, 0).y - 344));
        }
        ui.lastScreenY = mouseY;
    }
};
var canvasArcDegrees = function (ctx, x, y, radius, startDegrees, endDegrees) {
    var sweep = constrain(endDegrees - startDegrees, -360, 360);
    var segments = max(1, ceil(abs(sweep) / 90));
    var step = sweep / segments;
    var bend = 4 * tan(step / 4) / 3;
    ctx.lineTo(x + radius * cos(startDegrees), y + radius * sin(startDegrees));
    for (var i = 0; i < segments; i++) {
        var start = startDegrees + i * step;
        var end = start + step;
        var startCos = cos(start);
        var startSin = sin(start);
        var endCos = cos(end);
        var endSin = sin(end);
        ctx.bezierCurveTo(x + radius * (startCos - bend * startSin), y + radius * (startSin + bend * startCos), x + radius * (endCos + bend * endSin), y + radius * (endSin - bend * endCos), x + radius * endCos, y + radius * endSin);
    }
};
var drawAchievementIcon = function (ctx, type, x, y, size, tint) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(size / 40, size / 40);
    ctx.strokeStyle = tint;
    ctx.fillStyle = tint;
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    if (type === "target") {
        canvasArcDegrees(ctx, 0, 0, 12, 0, 360);
        ctx.moveTo(-17, 0);
        ctx.lineTo(-7, 0);
        ctx.moveTo(7, 0);
        ctx.lineTo(17, 0);
        ctx.moveTo(0, -17);
        ctx.lineTo(0, -7);
        ctx.moveTo(0, 7);
        ctx.lineTo(0, 17);
    } else if (type === "medal") {
        ctx.moveTo(-12, -17);
        ctx.lineTo(-5, -2);
        ctx.lineTo(0, -7);
        ctx.lineTo(5, -2);
        ctx.lineTo(12, -17);
        ctx.moveTo(10, 5);
        canvasArcDegrees(ctx, 0, 5, 10, 0, 360);
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 9);
        ctx.moveTo(-4, 5);
        ctx.lineTo(4, 5);
    } else if (type === "shield") {
        ctx.moveTo(0, -17);
        ctx.lineTo(14, -11);
        ctx.lineTo(11, 6);
        ctx.quadraticCurveTo(7, 13, 0, 18);
        ctx.quadraticCurveTo(-7, 13, -11, 6);
        ctx.lineTo(-14, -11);
        ctx.closePath();
        ctx.moveTo(-6, 0);
        ctx.lineTo(-1, 6);
        ctx.lineTo(8, -6);
    } else if (type === "saber") {
        ctx.moveTo(-7, 8);
        ctx.lineTo(12, -15);
        ctx.moveTo(-13, 15);
        ctx.lineTo(-7, 8);
        ctx.moveTo(-12, 3);
        ctx.lineTo(-2, 12);
        ctx.moveTo(4, -17);
        ctx.quadraticCurveTo(-20, -13, -17, 6);
        ctx.moveTo(-20, 1);
        ctx.lineTo(-17, 6);
        ctx.lineTo(-12, 2);
    } else if (type === "flag") {
        ctx.moveTo(-11, 17);
        ctx.lineTo(-11, -17);
        ctx.lineTo(13, -17);
        ctx.lineTo(7, -8);
        ctx.lineTo(13, 0);
        ctx.lineTo(-11, 0);
        ctx.moveTo(-16, 17);
        ctx.lineTo(-5, 17);
    } else if (type === "credits") {
        canvasArcDegrees(ctx, 0, 0, 16, 0, 360);
        ctx.moveTo(6, -8);
        ctx.lineTo(-6, -8);
        ctx.lineTo(-6, 8);
        ctx.lineTo(6, 8);
        ctx.moveTo(-10, -3);
        ctx.lineTo(3, -3);
        ctx.moveTo(-10, 3);
        ctx.lineTo(3, 3);
    } else {
        canvasArcDegrees(ctx, 0, 0, 16, 0, 360);
        ctx.moveTo(0, -10);
        ctx.lineTo(0, 0);
        ctx.lineTo(8, 5);
    }
    ctx.stroke();
    ctx.restore();
};
var drawNotice = function () {
    if (!notices.length) {
        return;
    }
    var notice = notices[0];
    var opacity = constrain(min(noticeMs, 3600 - noticeMs) / 240, 0, 1);
    var a = opacity * 255;
    var besideMinimap = gameStage === "Play" && width >= 600;
    var w = min(176, width - 24);
    var x = besideMinimap ? hudLayout.minimapX + hudLayout.minimapSize + 8 : (width - w) / 2;
    var y = height - (gameStage === "Play" && !besideMinimap ? 226 : 66);
    var ctx = typeof externals !== "undefined" ? externals.context : null;
    pushMatrix();
    resetMatrix();
    pushStyle();
    rectMode(CORNER);
    ellipseMode(CENTER);
    stroke(95, 171, 101, a * 0.66);
    strokeWeight(1);
    fill(24, 28, 25, a);
    rect(x, y, w, 50, 25);
    noStroke();
    fill(18, 128, 44, a);
    ellipse(x + 25, y + 25, 36, 36);
    if (ctx) {
        drawAchievementIcon(ctx, notice.icon, x + 25, y + 25, 24, "rgba(255,255,255," + opacity + ")");
    } else {
        stroke(255, a);
        strokeWeight(2);
        line(x + 20, y + 25, x + 24, y + 29);
        line(x + 24, y + 29, x + 31, y + 21);
    }
    var titleSize = min(14, 14 * (w - 62) / max(1, uiTextWidth(notice.title, 14)));
    noStroke();
    drawUiText(notice.label, x + 50, y + 16, 10, "left", "middle", color(176, 229, 179, a));
    drawUiText(notice.title, x + 50, y + 32, titleSize, "left", "middle", color(255, a));
    popStyle();
    popMatrix();
    noticeMs += tickClock.renderDeltaMs;
    if (noticeMs >= 3600) {
        notices.shift();
        noticeMs = 0;
    }
};
var achievementText = function (ctx, value, x, y, size, tint) {
    ctx.font = size + "px " + achievementFont;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = tint;
    ctx.fillText(value, x, y);
};
var drawAchievementHolo = function (pointerX, pointerY) {
    if (!achievementCanvas) {
        achievementCanvas = createGraphics(600, 600, P2D);
        achievementCanvas.background(0);
    }
    var ctx = achievementCanvas.externals ? achievementCanvas.externals.context : null;
    if (!ctx) {
        return;
    }
    var ui = achievementUI;
    var step = min(3, max(0, tickClock.renderScale));
    var maxScroll = max(0, achievementBubble(achievementItems.length - 1, 0).y - 344);
    var inside = pointerX >= 105 && pointerX <= 495 && pointerY >= 110 && pointerY <= 425;
    var hovered = -1;
    for (var i = 0; i < achievementItems.length; i++) {
        var hit = achievementBubble(i, ui.scroll);
        if (inside && dist(pointerX, pointerY, hit.x, hit.y) <= hit.radius && hit.y >= 130 && hit.y <= 400) {
            hovered = i;
        }
    }
    if (mouseIsPressed && !ui.down && inside) {
        ui.down = true;
        ui.dragging = false;
        ui.startScreenX = mouseX;
        ui.startScreenY = mouseY;
        ui.lastScreenY = mouseY;
        ui.dragScaleY = ui.transform ? max(0.001, ui.transform.sy) : 1;
        ui.pressed = hovered;
        ui.velocity = 0;
    }
    if (ui.down && !mouseIsPressed) {
        if (!ui.dragging && inside) {
            if (ui.selected >= 0) {
                ui.selected = -1;
            } else if (hovered >= 0 && hovered === ui.pressed && ui.expansion < 0.05) {
                var origin = achievementBubble(hovered, ui.scroll);
                ui.originX = origin.x;
                ui.originY = origin.y;
                ui.originRadius = origin.radius;
                ui.selected = hovered;
                ui.displayed = hovered;
            }
        }
        ui.down = false;
        ui.pressed = -1;
    }
    if (ui.selected < 0) {
        if (keys[inputKeys.arrowUp] || keys[inputKeys.arrowDown]) {
            ui.target += ((keys[inputKeys.arrowDown] ? 1 : 0) - (keys[inputKeys.arrowUp] ? 1 : 0)) * 6 * step;
            ui.velocity = 0;
        } else if (!ui.down) {
            ui.target += ui.velocity * step;
            ui.velocity *= pow(0.88, step);
        }
    }
    ui.target = constrain(ui.target, 0, maxScroll);
    ui.scroll = lerp(ui.scroll, ui.target, 1 - pow(0.76, step));
    ui.expansion = lerp(ui.expansion, ui.selected >= 0 ? 1 : 0, 1 - pow(0.74, step));
    var earned = 0;
    for (var n = 0; n < achievementItems.length; n++) {
        if (achievementUnlocked[achievementItems[n].id]) {
            earned++;
        }
    }
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, 600, 600);
    ctx.globalAlpha = 1 - ui.expansion;
    achievementText(ctx, "ACHIEVEMENTS", 300, 89, 22, "#d7f7ff");
    achievementText(ctx, earned + " / " + achievementItems.length + " UNLOCKED", 300, 115, 11, "#7ec9e7");
    ctx.globalAlpha = 1;
    ctx.save();
    ctx.beginPath();
    ctx.rect(105, 132, 390, 271);
    ctx.clip();
    ctx.globalAlpha = 1 - ui.expansion;
    for (var j = 0; j < achievementItems.length; j++) {
        var item = achievementItems[j];
        var bubble = achievementBubble(j, ui.scroll);
        if (bubble.y < 95 || bubble.y > 440) {
            continue;
        }
        var unlocked = !!achievementUnlocked[item.id];
        var radius = bubble.radius * (hovered === j && !ui.dragging ? 1.06 : 1);
        var progress = constrain(achievementStats[item.stat] / item.goal, 0, 1);
        ctx.fillStyle = unlocked ? "rgba(19,83,105,0.96)" : "rgba(6,27,50,0.94)";
        ctx.strokeStyle = unlocked ? "#ffe3a0" : "#3c6685";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        canvasArcDegrees(ctx, bubble.x, bubble.y, radius, 0, 360);
        ctx.fill();
        ctx.stroke();
        if (progress > 0) {
            ctx.strokeStyle = unlocked ? "#ffe3a0" : "#63d9ff";
            ctx.lineWidth = 3;
            ctx.beginPath();
            canvasArcDegrees(ctx, bubble.x, bubble.y, radius - 3, -90, -90 + progress * 360);
            ctx.stroke();
        }
        drawAchievementIcon(ctx, item.icon, bubble.x, bubble.y, radius * 0.9, unlocked ? "#fff0be" : "#84b5d4");
    }
    ctx.restore();
    if (ui.expansion > 0.005 && ui.displayed >= 0) {
        var selected = achievementItems[ui.displayed];
        var completed = !!achievementUnlocked[selected.id];
        var open = ui.expansion;
        var cx = lerp(ui.originX, 300, open);
        var cy = lerp(ui.originY, 265, open);
        var beamTop = 480 + holoHeight;
        var beamTopHalf = -holoHeight * 5 / 8;
        var beamBaseHalf = uiTextWidth("Achievements", 25) * 0.6;
        var beamSlope = (beamBaseHalf - beamTopHalf) / max(1, 455 - beamTop);
        var beamHalfAtCenter = beamTopHalf + (265 - beamTop) * beamSlope;
        var fittedRadius = max(1, min(min(173, 265 - beamTop - 8), min(455 - 265 - 8, beamHalfAtCenter / sqrt(1 + beamSlope * beamSlope) - 8)));
        var detailRadius = lerp(ui.originRadius, fittedRadius, open);
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(300 - beamTopHalf, beamTop);
        ctx.lineTo(300 + beamTopHalf, beamTop);
        ctx.lineTo(300 + beamBaseHalf, 455);
        ctx.lineTo(300 - beamBaseHalf, 455);
        ctx.closePath();
        ctx.clip();
        ctx.globalAlpha = open;
        ctx.fillStyle = "rgba(3,18,36,0.98)";
        ctx.strokeStyle = completed ? "#ffe3a0" : "#69d4f7";
        ctx.lineWidth = 2;
        ctx.beginPath();
        canvasArcDegrees(ctx, cx, cy, detailRadius, 0, 360);
        ctx.fill();
        ctx.stroke();
        ctx.translate(cx, cy);
        var detailScale = open * fittedRadius / 173;
        ctx.scale(detailScale, detailScale);
        drawAchievementIcon(ctx, selected.icon, 0, -83, 52, completed ? "#ffe3a0" : "#8ae5ff");
        achievementText(ctx, completed ? "UNLOCKED" : "IN PROGRESS", 0, -38, 10, completed ? "#ffe3a0" : "#73b6d2");
        var titleSize = 22;
        ctx.font = titleSize + "px " + achievementFont;
        if (ctx.measureText(selected.name).width > 290) {
            titleSize *= 290 / ctx.measureText(selected.name).width;
        }
        achievementText(ctx, selected.name, 0, -8, titleSize, "#e5faff");
        var words = selected.description.split(" ");
        var line = "";
        var textY = 27;
        ctx.font = "13px " + achievementFont;
        for (var w = 0; w < words.length; w++) {
            var next = line ? line + " " + words[w] : words[w];
            if (ctx.measureText(next).width > 268 && line) {
                achievementText(ctx, line, 0, textY, 13, "#9fc6db");
                textY += 19;
                line = words[w];
            } else {
                line = next;
            }
        }
        achievementText(ctx, line, 0, textY, 13, "#9fc6db");
        var value = min(selected.goal, floor(achievementStats[selected.stat]));
        var goal = selected.goal;
        var progressText = shopNumber(value) + " / " + shopNumber(goal);
        if (selected.stat === "seconds") {
            progressText = goal >= 3600 ? (value / 3600).toFixed(1) + " / " + goal / 3600 + " HR" : floor(value / 60) + " / " + goal / 60 + " MIN";
        }
        ctx.fillStyle = "#173a53";
        ctx.fillRect(-111, 77, 222, 5);
        ctx.fillStyle = completed ? "#ffe3a0" : "#69d4f7";
        ctx.fillRect(-111, 77, 222 * constrain(achievementStats[selected.stat] / selected.goal, 0, 1), 5);
        achievementText(ctx, progressText, 0, 103, 13, "#e0f5ff");
        achievementText(ctx, "CLICK TO RETURN", 0, 135, 10, "#6ba4bf");
        ctx.restore();
    }
    ctx.restore();
    loadedImages.MenuAchievements = achievementCanvas.get(0, 0, 600, 600);
};
var creditsLogoSlam = 20;
var creditsLogoHold = 180;
var creditsCrawlH = 3400;
var fullCreditsText = "KHAN ACADEMY PRESENTS\nA LEMONCELLOJR & CODER GUY PRODUCTION\nSTAR WARS\nBATTLEFRONT\nMAIN PRODUCTION CREDITS\n\nDirected By\nLemoncelloJr\nCoder Guy\n\nWritten By\nLemoncelloJr\n\nProduced By\nCoderGuyxLemoncelloJr\n\nFramework & Core Development\nLemoncelloJr\n\nAnimation, Visual Effects & Art Direction\nCoder Guy\n\nSound Layout & Audio Design\nSwankyMan\n\nProcessingJS jsDelivr Fetch Assistance\ndebugRanger\n\nImage Loading Systems\nGreenGhost\n\nStar Wars Logo Assistance\nEA\n\nAdditional Contributions\nBristleFrost\n\nCAST & GAME SYSTEMS\n\nProgramming & Systems Engineering\nLemoncelloJr\n\nVisual Design & Effects\nCoder Guy\n\nCombat Visual Effects\nCoder Guy\n\nUI Construction\nCoder Guy\n\nAnimation Systems\nCoder Guy\n\nLighting & Scene Effects\nCoder Guy\n\nGame Framework Architecture\nLemoncelloJr\n\nLevel Construction\nLemoncelloJr\n\nAdditional Bug Fixing & Technical Support\ndebugRanger\n\nAUDIO CREDITS\n\nSound Layout\nSwankyMan\n\nMusic Inspired By\nStar Wars Original Motion Picture Soundtrack\n\nSound Effects Inspired By\nStar Wars Sound Library\n\nSPECIAL THANKS\n\nGeorge Lucas\nKhan Academy\nProcessingJS\nThe Khan Academy Community\njsDelivr CDN\nEveryone who tested the game\nEveryone who believed this project could exist\n\nDISCLAIMER\n\nThis is a non-commercial fan production created for educational and entertainment purposes on Khan Academy.\n\nStar Wars and all associated properties are owned by Lucasfilm Ltd. and The Walt Disney Company.\n\nNo copyright infringement intended.\n\nMade with imagination,\nProcessingJS,\nand way too many semicolons.\n\nIt is a period of creativity.\nDeep within the Khan Academy systems,\ndevelopers have forged an ambitious\nSTAR WARS game using the ancient\npowers of ProcessingJS...\n\nGuided by the coding mastery of\nLEMONCELLOJR and the artistic force\nof CODER GUY, the project\nrapidly evolved into a fully armed\nbrowser experience.\n\nWith assistance from DEBUGRANGER,\nGREENGHOST, SWANKYMAN, and others,\nthe game now stands ready to bring\nbalance to the KA galaxy....";
var drawMusicButton = function () {
    var musicButtonX = width - 34;
    var musicButtonY = height - 32;
    var musicButtonW = 42;
    var musicButtonH = 42;
    var musicButtonHover = mouseX >= musicButtonX - musicButtonW / 2 && mouseX <= musicButtonX + musicButtonW / 2 && mouseY >= musicButtonY - musicButtonH / 2 && mouseY <= musicButtonY + musicButtonH / 2;
    noFill();
    for (var musicGlow = 11; musicGlow >= 5; musicGlow -= 2) {
        stroke(255, 255, 255, musicButtonHover ? 34 : 22);
        strokeWeight(musicGlow);
        rect(musicButtonX, musicButtonY, musicButtonW, musicButtonH, 5);
    }
    stroke(musicButtonHover ? color(130, 230, 255) : color(255));
    strokeWeight(3);
    fill(0);
    rect(musicButtonX, musicButtonY, musicButtonW, musicButtonH, 5);
    fill(creditsMusic.enabled ? color(160, 255, 185) : color(220));
    textFont(basicHeaderFont, 22);
    text(creditsMusic.enabled ? "🔊" : "🔇", musicButtonX, musicButtonY);
};
var drawFullCredits = function () {
    fullCreditsFrame += tickClock.renderScale;
    background(0, 0, 15);
    noStroke();
    for (var creditsStarIndex = 0; creditsStarIndex < menuStars.length; creditsStarIndex++) {
        fill(menuStars[creditsStarIndex].color);
        ellipse((menuStars[creditsStarIndex].x * width) / 600, (menuStars[creditsStarIndex].y * height) / 600, menuStars[creditsStarIndex].size, menuStars[creditsStarIndex].size);
    }
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    drawMusicButton();
    if (mouseClick) {
        if (mouseX >= width - 34 - 21 && mouseX <= width - 34 + 21 && mouseY >= height - 32 - 21 && mouseY <= height - 32 + 21) {
            setCreditsMusic(!creditsMusic.enabled);
        } else {
            if (!stageTransition.active) {
                startStageTrans("Menu", function () {
                    fullCreditsFrame = 0;
                    creditsMusic.started = false;
                    currentMenu = null;
                    if (currentMap) {
                        resetMatchForHome();
                    }
                });
            }
            return;
        }
    }
    if (!creditsMusic.started && creditsMusic.enabled && !stageTransition.active) {
        playCreditsMusic();
    }
    if (fullCreditsFrame >= creditsLogoStart) {
        var logoFrame = fullCreditsFrame - creditsLogoStart;
        var logoScale = 1;
        var logoAlpha = 255;
        if (logoFrame < creditsLogoSlam) {
            var slamProgress = logoFrame / creditsLogoSlam;
            logoScale = lerp(10, 1, 1 - pow(1 - slamProgress, 4));
        } else if (logoFrame < creditsLogoSlam + creditsLogoHold) {
            logoScale = 1;
        } else {
            var shrinkProgress = constrain((logoFrame - creditsLogoSlam - creditsLogoHold) / 220, 0, 1);
            logoScale = lerp(1, 0.02, shrinkProgress);
            logoAlpha = 255 * (1 - shrinkProgress);
        }
        if (logoScale > 0.03 && logoAlpha > 2) {
            pushMatrix();
            translate(width / 2 - 226 * logoScale, height / 2 - 41 * logoScale);
            starWarsLogo(0, 0, logoScale, logoAlpha);
            popMatrix();
        }
    }
    var crawlStartFrame = creditsLogoStart + creditsLogoSlam + creditsLogoHold + 99;
    if (fullCreditsFrame >= crawlStartFrame) {
        var crawlFrame = fullCreditsFrame - crawlStartFrame;
        var crawlY = height + 70 - crawlFrame * 0.62;
        pushMatrix();
        translate(width / 2, crawlY);
        scale(1, 0.72);
        textAlign(CENTER, TOP);
        textFont(basicHeaderFont, 25);
        fill(255, 210, 35);
        textLeading(34);
        text(fullCreditsText, -205, 0, 410, creditsCrawlH);
        popMatrix();
        if (crawlY < -creditsCrawlH * 0.72 - 120) {
            if (!stageTransition.active) {
                startStageTrans("Menu", function () {
                    fullCreditsFrame = 0;
                    creditsMusic.started = false;
                    currentMenu = null;
                    if (currentMap) {
                        resetMatchForHome();
                    }
                });
            }
        }
    }
};
var closeGameDataPanel = function () {
    gameDataPanel = gameDataPanel === "confirm" ? "advanced" : "";
    mouseClick = null;
};
var drawGameDataPanel = function (pointerX, pointerY) {
    var panel = gameDataPanel;
    var page = gameDataHoloPages[panel];
    var status = gameSaveError;
    if (!status && panel === "advanced") {
        status = gameSaveStorage ? "Autosave is on in this browser." : "Browser storage is unavailable.";
    } else if (!status && panel === "confirm") {
        status = "Settings will return to their defaults.";
    }
    pushStyle();
    noStroke();
    if (status) {
        textAlign(CENTER, CENTER);
        textFont(mainFont, 13);
        textSize(13 * min(1, 290 / max(1, textWidth(status))));
        fill(165, 195, 245);
        text(status, 0, 214 - 480);
    }
    rectMode(CENTER);
    fill(220, 150);
    for (var i = 0; i < page.buttons.length; i++) {
        var button = page.buttons[i];
        if (abs(pointerX - 300) > button.width / 2 || abs(pointerY - button.y) > 15) {
            continue;
        }
        rect(0, button.y - 480, button.width, 30);
        if (mouseClick) {
            mouseClick = null;
            if (button.action === "close") {
                closeGameDataPanel();
            } else if (button.action === "blood") {
                bloodSplatterEnabled = !bloodSplatterEnabled;
                saveGameData();
            } else if (button.action === "graphics") {
                toggleGraphics();
            } else if (button.action === "confirm") {
                gameDataPanel = "confirm";
            } else if (clearGameData()) {
                gameDataPanel = "cleared";
            }
        }
        break;
    }
    if (panel === "advanced") {
        textAlign(CENTER, CENTER);
        textFont(mainFont, 16);
        fill(bloodSplatterEnabled ? color(212, 247, 255) : color(158, 188, 229));
        text(bloodSplatterEnabled ? "ON" : "OFF", 83, page.buttons[0].y - 480);
        fill(212, 247, 255);
        text(lowDetailMode ? "LOW" : "HIGH", 73, page.buttons[1].y - 480);
    }
    popStyle();
};
var menu = function () {
    if (keys[inputKeys.arrowLeft] || keys[inputKeys.left]) {
        menuRotVel -= 0.5 * tickClock.renderScale;
    }
    if (keys[inputKeys.arrowRight] || keys[inputKeys.right]) {
        menuRotVel += 0.5 * tickClock.renderScale;
    }
    menuRotVel *= pow(menuSlideFriction, tickClock.renderScale);
    menuRot += menuRotVel * tickClock.renderScale;
    menuRot %= 360;
    background(0, 0, 15);
    noStroke();
    for (var menuStarIndex = 0; menuStarIndex < menuStars.length; menuStarIndex++) {
        fill(menuStars[menuStarIndex].color);
        var starX = (menuStars[menuStarIndex].x * width) / 600 + ((mouseX - width / 2) * menuStars[menuStarIndex].size) / -40;
        var starY = (menuStars[menuStarIndex].y * height) / 600 + ((mouseY - height / 2) * menuStars[menuStarIndex].size) / -40;
        ellipse(starX, starY, menuStars[menuStarIndex].size, menuStars[menuStarIndex].size);
    }
    textAlign(RIGHT, TOP);
    textFont(basicHeaderFont, 22);
    var menuCreditAnim = constrain(abs(creditDisplay.speed) / 5, 0, 1);
    if (creditDisplay.speed < -0.01) {
        fill(255, lerp(230, 80, menuCreditAnim), lerp(130, 80, menuCreditAnim));
    } else {
        fill(lerp(255, 110, menuCreditAnim), lerp(230, 255, menuCreditAnim), lerp(130, 150, menuCreditAnim));
    }
    pushMatrix();
    translate(width - 18, 16);
    scale(1 + (creditDisplay.speed > 0 ? menuCreditAnim * 0.35 : 0));
    drawCreditBalance(creditDisplay.value);
    popMatrix();
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    textFont(matchFont, 25);
    fill(0);
    drawMusicButton();
    if (mouseX >= width - 34 - 21 && mouseX <= width - 34 + 21 && mouseY >= height - 32 - 21 && mouseY <= height - 32 + 21 && mouseClick) {
        setCreditsMusic(!creditsMusic.enabled);
    }
    textFont(matchFont, 25);
    for (var i = 0; i < headings.length; i++) {
        fill(0);
        stroke(255);
        strokeWeight(3);
        menuRot += 360 / headings.length;
        menuRot = menuRot % 360;
        if (menuRot <= 360 && menuRot >= 180) {
            pushMatrix();
            translate(width / 2 + 250 * cos(menuRot), height - 100 + sin(menuRot) * 12);
            scale(abs(sin(menuRot)), 1 + sin(menuRot) / 4);
            var backBoxW = uiTextWidth(headings[i], 25) * 1.8;
            noFill();
            for (var backGlow = 11; backGlow >= 5; backGlow -= 2) {
                stroke(255, 255, 255, 22);
                strokeWeight(backGlow);
                rect(0, 0, backBoxW, 50, 5);
            }
            fill(0);
            stroke(255);
            strokeWeight(3);
            rect(0, 0, backBoxW, 50, 5);
            popMatrix();
        }
    }
    for (var i = 0; i < headings.length; i++) {
        stroke(255);
        strokeWeight(3);
        textFont(matchFont, 25);
        menuRot += 360 / headings.length;
        menuRot = menuRot % 360;
        if (menuRot >= 0 && menuRot <= 180) {
            rectMode(CENTER);
            pushMatrix();
            translate(width / 2 + 250 * cos(menuRot), height - 100 + sin(menuRot) * 12);
            scale(abs(sin(menuRot)), 1 + sin(menuRot) / 4);
            var frontBoxW = uiTextWidth(headings[i], 25) * 1.8;
            noFill();
            for (var frontGlow = 11; frontGlow >= 5; frontGlow -= 2) {
                stroke(255, 255, 255, 22);
                strokeWeight(frontGlow);
                rect(0, 0, frontBoxW, 50, 5);
            }
            fill(0);
            stroke(255);
            strokeWeight(3);
            rect(0, 0, frontBoxW, 50, 5);
            for (var headingGlow = 4; headingGlow >= 1; headingGlow--) {
                fill(255, 255, 255, 24);
                drawUiText(headings[i], -headingGlow, 0, 25, "center", "middle", color(255, 255, 255, 24));
                drawUiText(headings[i], headingGlow, 0, 25, "center", "middle", color(255, 255, 255, 24));
                drawUiText(headings[i], 0, -headingGlow, 25, "center", "middle", color(255, 255, 255, 24));
                drawUiText(headings[i], 0, headingGlow, 25, "center", "middle", color(255, 255, 255, 24));
            }
            fill(255);
            drawUiText(headings[i], 0, 0, 25, "center", "middle", color(255));
            if (menuRot >= 50 && menuRot <= 140) {
                if (menuRot >= 75 && menuRot <= 105) {
                    //Draw Holo
                    holoHeight = lerp(holoHeight, -425, uiEase(0.1));
                    fill(100, 100, 255, map(holoHeight, -25, -425, 0, 100));
                    noStroke();
                    var fade = 0;
                    strokeWeight(5);
                    for (var j = holoHeight; j <= -25; j += 5) {
                        fade += 0.2;
                        fill(50, 200 + fade * 1.2, 255, constrain(fade * 0.8, 2, 3));
                        quad( -frontBoxW / 3, -25, frontBoxW / 3, -25, (-5 / 8) * j, j, (5 / 8) * j, j);
                    }
                    if (holoHeight < -350) {
                        var activeMenu = "Menu" + headings[i];
                        if (!(activeMenu === "MenuPlay" && currentMenu === "MenuPlayCustom")) {
                            currentMenu = activeMenu;
                            gameDataPanel = "";
                        }
                        var menuPointerScaleX = max(0.001, abs(sin(menuRot)));
                        var menuPointerScaleY = max(0.001, 1 + sin(menuRot) / 4);
                        var menuPointerX = (mouseX - (width / 2 + 250 * cos(menuRot))) / menuPointerScaleX;
                        var menuPointerY = (mouseY - (height - 100 + sin(menuRot) * 12)) / menuPointerScaleY;
                        var menuHoloX = menuPointerX + 300;
                        var menuHoloY = menuPointerY + 480;
                        switch (currentMenu) {
                            case "MenuAchievements":
                            achievementUI.transform = {
                                x: width / 2 + 250 * cos(menuRot),
                                y: height - 100 + sin(menuRot) * 12,
                                sx: menuPointerScaleX,
                                sy: menuPointerScaleY
                            };
                            drawAchievementHolo(menuHoloX, menuHoloY);
                            break;
                            //Update the menu
                            case "MenuPlay": noStroke();
                            fill(220, 150);
                            if (menuPointerX >= -125 && menuPointerX <= 125 && menuPointerY >= 170 - 480 - 25 && menuPointerY <= 170 - 480 + 25) {
                                rect(0, 170 - 480, 250, 50);
                                if (mouseClick) {
                                    var quickMode = matchGameModes[floor(random(0, matchGameModes.length))];
                                    var quickPlanetName = planetList[floor(random(0, planetList.length))];
                                    transitionToPlay(quickPlanetName === "Kashyyyk" ? Kashyyyk !== undefined ? Kashyyyk : null : quickPlanetName === "Jakku" ? Jakku !== undefined ? Jakku : null : quickPlanetName === "Star Destroyer" ? StarDestroyer !== undefined ? StarDestroyer : null : Kashyyyk !== undefined ? Kashyyyk : null, quickMode);
                                }
                            } else if (menuPointerX >= -105 && menuPointerX <= 105 && menuPointerY >= 240 - 480 - 25 && menuPointerY <= 240 - 480 + 25) {
                                rect(0, 240 - 480, 210, 50);
                                if (mouseClick) {
                                    currentMenu = "MenuPlayCustom";
                                }
                            }
                            break;
                            case "MenuPlayCustom": fill(220, 150);
                            if (gameDataPanel) {
                                drawGameDataPanel(menuHoloX, menuHoloY);
                                break;
                            }
                            pushMatrix();
                            translate(-300, -480);
                            if (dist(menuHoloX, menuHoloY, 165, 160) <= 50) {
                                triangle(180, 180, 180, 140, 150, 160);
                                if (mouseClick) {
                                    matchModeIndex = (matchModeIndex - 1 + matchGameModes.length) % matchGameModes.length;
                                    saveGameData();
                                }
                            }
                            if (dist(menuHoloX, menuHoloY, 435, 160) <= 50) {
                                triangle(420, 180, 420, 140, 450, 160);
                                if (mouseClick) {
                                    matchModeIndex = (matchModeIndex + 1 + matchGameModes.length) % matchGameModes.length;
                                    saveGameData();
                                }
                            }
                            if (dist(menuHoloX, menuHoloY, 205, 260) <= 50) {
                                triangle(220, 280, 220, 240, 190, 260);
                                if (mouseClick) {
                                    planetNum = (planetNum - 1 + planetList.length) % planetList.length;
                                    saveGameData();
                                }
                            }
                            if (dist(menuHoloX, menuHoloY, 395, 260) <= 50) {
                                triangle(380, 280, 380, 240, 410, 260);
                                if (mouseClick) {
                                    planetNum++;
                                    planetNum = planetNum % planetList.length;
                                    saveGameData();
                                }
                            }
                            if (menuHoloX >= 225 && menuHoloX <= 375 && menuHoloY >= 177.5 && menuHoloY <= 202.5) {
                                rect(300, 190, 150, 25);
                                    //Go to advanced settings
                                if (mouseClick) {
                                    mouseClick = null;
                                    gameDataPanel = "advanced";
                                }
                            }
                            if (menuHoloX >= 255 && menuHoloX <= 345 && menuHoloY >= 387.5 && menuHoloY <= 412.5) {
                                rect(300, 400, 90, 25);
                                if (mouseClick) {
                                    var customPlanetName = planetList[planetNum];
                                    transitionToPlay(customPlanetName === "Kashyyyk" ? Kashyyyk !== undefined ? Kashyyyk : null : customPlanetName === "Jakku" ? Jakku !== undefined ? Jakku : null : customPlanetName === "Star Destroyer" ? StarDestroyer !== undefined ? StarDestroyer : null : Kashyyyk !== undefined ? Kashyyyk : null);
                                }
                            }
                            popMatrix();
                            textFont(mainFont, 20);
                            fill(30, 30, 100);
                            fill(150, 150, 200);
                            text(("" + matchGameModes[matchModeIndex % matchGameModes.length]).toUpperCase(), 0, 160 - 480);
                            if (planetList[planetNum] === "Star Destroyer") {
                                textLeading(20);
                                text("Star\nDestroyer", 0, 252 - 480);
                            } else {
                                text(planetList[planetNum], 0, 260 - 480);
                            }
                            break;
                            case "MenuShop": noStroke();
                            fill(220, 150);
                            if (menuHoloX >= 212.5 - 75 && menuHoloX <= 212.5 + 75 && menuHoloY <= 150 + 15 && menuHoloY >= 150 - 15) {
                                rect(212.5 - 300, 150 - 480, 150, 30);
                                if (mouseClick) {
                                    startCharShop("Assault");
                                }
                            }
                            if (menuHoloX >= 387.5 - 75 && menuHoloX <= 387.5 + 75 && menuHoloY <= 150 + 15 && menuHoloY >= 150 - 15) {
                                rect(387.5 - 300, 150 - 480, 150, 30);
                                if (mouseClick) {
                                    startCharShop("Specialist");
                                }
                            }
                            if (menuHoloX >= 227.5 - 60 && menuHoloX <= 227.5 + 60 && menuHoloY <= 190 + 15 && menuHoloY >= 190 - 15) {
                                rect(227.5 - 300, 190 - 480, 120, 30);
                                if (mouseClick) {
                                    startCharShop("Officer");
                                }
                            }
                            if (menuHoloX >= 372.5 - 60 && menuHoloX <= 372.5 + 60 && menuHoloY <= 190 + 15 && menuHoloY >= 190 - 15) {
                                rect(372.5 - 300, 190 - 480, 120, 30);
                                if (mouseClick) {
                                    startCharShop("Heavy");
                                }
                            }
                            if (menuHoloX >= 300 - 105 && menuHoloX <= 300 + 105 && menuHoloY <= 240 + 15 && menuHoloY >= 240 - 15) {
                                rect(0, 240 - 480, 210, 30);
                                if (mouseClick) {
                                    startCharShop("Jedi");
                                }
                            }
                            if (menuHoloX >= 300 - 90 && menuHoloX <= 300 + 90 && menuHoloY <= 285 + 15 && menuHoloY >= 285 - 15) {
                                rect(0, 285 - 480, 180, 30);
                                if (mouseClick) {
                                    startCharShop("Infiltrator");
                                }
                            }
                            if (menuHoloX >= 300 - 75 && menuHoloX <= 300 + 75 && menuHoloY <= 330 + 15 && menuHoloY >= 330 - 15) {
                                rect(0, 330 - 480, 150, 30);
                                if (mouseClick) {
                                    startCharShop("Enforcer");
                                }
                            }
                            if (menuHoloX >= 300 - 60 && menuHoloX <= 300 + 60 && menuHoloY <= 375 + 15 && menuHoloY >= 375 - 15) {
                                rect(0, 375 - 480, 120, 30);
                                if (mouseClick) {
                                    startCharShop("Aerial");
                                }
                            }
                            break;
                            case "MenuCredits": noStroke();
                            fill(220, 150);
                            if (menuHoloX >= 185 && menuHoloX <= 415 && menuHoloY >= 125 - 21 && menuHoloY <= 125 + 21) {
                                rect(0, 125 - 480, 230, 42);
                                if (mouseClick) {
                                    startStageTrans("FullCredits", function () {
                                        fullCreditsFrame = 0;
                                        currentMenu = null;
                                    });
                                }
                            }
                            break;
                        }
                        //Draw the specific menus
                        var holoImage = currentMenu === "MenuPlayCustom" && gameDataPanel ? gameDataHoloPages[gameDataPanel].name : currentMenu;
                        if (loadedImages[holoImage]) {
                            holos[round(tickClock.realMs / tickClock.baseMs / 5) % holoNum].mask(loadedImages[holoImage]);
                        }
                        image(holos[round(tickClock.realMs / tickClock.baseMs / 5) % holoNum], -300, -480, 600, 600);
                    } else {
                        currentMenu = null;
                    }
                } else {
                    //Fading Holo
                    holoHeight = lerp(holoHeight, -25, uiEase(0.15));
                    fill(100, 100, 255, map(holoHeight, -25, -425, 0, 100));
                    stroke(255, 0);
                    quad( -frontBoxW / 3, -25, frontBoxW / 3, -25, (-5 / 8) * (holoHeight + 25), holoHeight, (5 / 8) * (holoHeight + 25), holoHeight);
                }
            }
            popMatrix();
        }
    }
};
/**Create Collisions Framework**/

//World Geometry
var Collision = function (config) {
    this.type = config.type;
    this.collisionMode = config.collisionMode || "static";
    this.liveCollision = this.collisionMode === "live";
    this.blocksLasers = config.blocksLasers !== undefined ? config.blocksLasers : true;
    this.blocksPlayers = config.blocksPlayers !== undefined ? config.blocksPlayers : true;
    this.blocksLanding = config.blocksLanding !== false;
    this.plane = config.plane !== undefined ? config.plane : false;
    this.exactSurface = config.exactSurface === true;
    this.blocksCeiling = config.blocksCeiling !== false;
    this.spawnSurface = config.spawnSurface !== undefined ? config.spawnSurface : false;
    this.smoothCorners = config.smoothCorners !== undefined ? config.smoothCorners : false;
    if (config.lowZ !== undefined) {
        this.lowZ = config.lowZ;
        this.highZ = config.highZ !== undefined ? config.highZ : config.lowZ;
    } else if (config.zValue !== undefined) {
        this.lowZ = config.zValue;
        this.highZ = config.zValue;
    } else {
        this.lowZ = -100;
        this.highZ = 100;
        //By default, it will assume an all-encompassing collision
    }
    if (this.type === "rect" || this.type === "ellipse" || this.type === "poly") {
        //Note that these collisions will be CENTERED at the given (x, y) point
        this.x = config.x !== undefined ? config.x : 0;
        this.y = config.y !== undefined ? config.y : 0;
        this.width = config.width !== undefined ? config.width : 50;
        this.height = config.height !== undefined ? config.height : 50;
        this.rotation = config.rotation !== undefined ? config.rotation : 0;
        if (this.type === "poly") {
            this.points = config.points;
            this.vertices = [];
            this.width = 0;
            this.height = 0;
            var area = 0;
            for (var i = 0; i < this.points.length; i += 2) {
                var j = (i + 2) % this.points.length;
                this.width = max(this.width, abs(this.points[i]) * 2);
                this.height = max(this.height, abs(this.points[i + 1]) * 2);
                area += this.points[i] * this.points[j + 1] - this.points[j] * this.points[i + 1];
            }
            this.winding = area < 0 ? -1 : 1;
        }
    } else if (this.type === "quad") {
        this.p1 = [config.points[0], config.points[1]] || [-50, 50];
        this.p2 = [config.points[2], config.points[3]] || [-50, -50];
        this.p3 = [config.points[4], config.points[5]] || [50, -50];
        this.p4 = [config.points[6], config.points[7]] || [50, 50];
    } else if (this.type === "tri") {
        this.p1 = [config.points[0], config.points[1]] || [-50, 50];
        this.p2 = [config.points[2], config.points[3]] || [-50, -50];
        this.p3 = [config.points[4], config.points[5]] || [50, -50];
    }
    this.refreshCache();
};
Collision.prototype.refreshCache = function () {

    this._floorLowZ = floor(this.lowZ);
    this._floorHighZ = floor(this.highZ);
    this._planeMinZ = this._floorLowZ - 0.1;
    this._planeMaxZ = this._floorHighZ + 0.1;
    this._solidMinZ = this._floorLowZ;
    this._solidMaxZ = constrain(this._floorHighZ, this._floorLowZ + 0.9, 999);
    this.bodyBase = this.forceLowZ === undefined ? this._floorLowZ : this.lowZ;
    this.bodyTop = this.highZ > this.lowZ ? this.highZ : this.bodyBase + 1;
    this.surfaceZ = this.exactSurface ? this.lowZ : this._floorLowZ;
    if (this.type === "rect" || this.type === "ellipse") {
        this._halfW = this.width / 2;
        this._halfH = this.height / 2;
        this._rotationNorm = ((this.rotation % 360) + 360) % 360;
        this._absRot = abs(this._rotationNorm);
    }
    if (this.type === "rect") {
        this._cos = cos(this.rotation);
        this._sin = sin(this.rotation);
        this._rectAxisAligned = this._rotationNorm === 0 || this._rotationNorm === 180;
        this._rectQuarterTurn = this._rotationNorm === 90 || this._rotationNorm === 270;
        if (this._rectAxisAligned) {
            this._minX = this.x - this._halfW;
            this._maxX = this.x + this._halfW;
            this._minY = this.y - this._halfH;
            this._maxY = this.y + this._halfH;
        } else if (this._rectQuarterTurn) {
            this._minX = this.x - this._halfH;
            this._maxX = this.x + this._halfH;
            this._minY = this.y - this._halfW;
            this._maxY = this.y + this._halfW;
        } else {
            this._rectHalfDiag = sqrt(this.width * this.width + this.height * this.height) / 2;
            this._minX = this.x - this._rectHalfDiag;
            this._maxX = this.x + this._rectHalfDiag;
            this._minY = this.y - this._rectHalfDiag;
            this._maxY = this.y + this._rectHalfDiag;
            var hyp = sqrt(this._halfW * this._halfW + this._halfH * this._halfH);
            var phi = atan(this.width / this.height) + 90;
            this._ax = cos(phi + this.rotation) * hyp + this.x;
            this._ay = sin(phi + this.rotation) * hyp + this.y;
            this._bx = cos(-phi + this.rotation) * hyp + this.x;
            this._by = sin(-phi + this.rotation) * hyp + this.y;
            this._cx = cos(phi + this.rotation + 180) * hyp + this.x;
            this._cy = sin(phi + this.rotation + 180) * hyp + this.y;
            this._dx = cos(-phi + this.rotation + 180) * hyp + this.x;
            this._dy = sin(-phi + this.rotation + 180) * hyp + this.y;
            this._quadArea1 = 0.5 * abs(this._ax * (this._by - this._cy) + this._bx * (this._cy - this._ay) + this._cx * (this._ay - this._by));
            this._quadArea2 = 0.5 * abs(this._ax * (this._dy - this._cy) + this._dx * (this._cy - this._ay) + this._cx * (this._ay - this._dy));
        }
    } else if (this.type === "ellipse") {
        this._ellipseCos = cos(this.rotation);
        this._ellipseSin = sin(this.rotation);
        var xRadius = sqrt(pow(this._halfW * this._ellipseCos, 2) + pow(this._halfH * this._ellipseSin, 2));
        var yRadius = sqrt(pow(this._halfW * this._ellipseSin, 2) + pow(this._halfH * this._ellipseCos, 2));
        this._minX = this.x - xRadius;
        this._maxX = this.x + xRadius;
        this._minY = this.y - yRadius;
        this._maxY = this.y + yRadius;
    } else if (this.type === "poly") {
        var c = cos(this.rotation);
        var s = sin(this.rotation);
        for (var i = 0; i < this.points.length; i += 2) {
            var x = this.x + this.points[i] * c - this.points[i + 1] * s;
            var y = this.y + this.points[i] * s + this.points[i + 1] * c;
            this.vertices[i] = x;
            this.vertices[i + 1] = y;
            this._minX = i === 0 ? x : min(this._minX, x);
            this._maxX = i === 0 ? x : max(this._maxX, x);
            this._minY = i === 0 ? y : min(this._minY, y);
            this._maxY = i === 0 ? y : max(this._maxY, y);
        }
    } else if (this.type === "quad") {
        this._minX = min(min(this.p1[0], this.p2[0]), min(this.p3[0], this.p4[0]));
        this._maxX = max(max(this.p1[0], this.p2[0]), max(this.p3[0], this.p4[0]));
        this._minY = min(min(this.p1[1], this.p2[1]), min(this.p3[1], this.p4[1]));
        this._maxY = max(max(this.p1[1], this.p2[1]), max(this.p3[1], this.p4[1]));
        this._quadArea1 = 0.5 * abs(this.p1[0] * (this.p2[1] - this.p3[1]) + this.p2[0] * (this.p3[1] - this.p1[1]) + this.p3[0] * (this.p1[1] - this.p2[1]));
        this._quadArea2 = 0.5 * abs(this.p1[0] * (this.p4[1] - this.p3[1]) + this.p4[0] * (this.p3[1] - this.p1[1]) + this.p3[0] * (this.p1[1] - this.p4[1]));
    } else if (this.type === "tri") {
        this._minX = min(this.p1[0], min(this.p2[0], this.p3[0]));
        this._maxX = max(this.p1[0], max(this.p2[0], this.p3[0]));
        this._minY = min(this.p1[1], min(this.p2[1], this.p3[1]));
        this._maxY = max(this.p1[1], max(this.p2[1], this.p3[1]));
        this._triArea = 0.5 * abs(this.p1[0] * (this.p2[1] - this.p3[1]) + this.p2[0] * (this.p3[1] - this.p1[1]) + this.p3[0] * (this.p1[1] - this.p2[1]));
    }
};
Collision.prototype.inBounds = function (x, y, pad) {
    return x + pad >= this._minX && x - pad <= this._maxX && y + pad >= this._minY && y - pad <= this._maxY;
};
Collision.prototype.overlapsCircle = function (x, y, radius) {
    if (this.type === "rect") {
        var dx = x - this.x;
        var dy = y - this.y;
        var ox = max(0, abs(dx * this._cos + dy * this._sin) - this._halfW);
        var oy = max(0, abs(dy * this._cos - dx * this._sin) - this._halfH);
        return ox * ox + oy * oy <= radius * radius;
    }
    if (this.type === "ellipse") {
        return this.ellipseContact(x, y, radius);
    }
    if (this.type === "poly") {
        return this.polyContact(x, y, radius);
    }
    var z = this.plane ? this._planeMinZ : this._solidMinZ;
    if (this.checkCollision(x, y, z)) {
        return true;
    }
    for (var i = 0; i < colSamples.length; i++) {
        if (this.checkCollision(x + radius * colSamples[i].x, y + radius * colSamples[i].y, z)) {
            return true;
        }
    }
    return false;
};
Collision.prototype.crossZ = function (from, to, clearance) {
    if (this.disabled || !this.blocksPlayers) {
        return null;
    }
    if (to < from) {
        if (!this.blocksLanding) {
            return null;
        }
        var top = this.plane ? this.surfaceZ : this.bodyTop;
        var lastTop = this.zMoveTick === tickClock.tick ? this.priorTop : top;
        return from >= min(top, lastTop) - 0.00001 && to <= top ? top : null;
    }
    if (this.plane && !this.blocksCeiling) {
        return null;
    }
    var base = (this.plane ? this.surfaceZ : this.bodyBase) - clearance;
    return from <= base + 0.00001 && to >= base ? base : null;
};
Collision.prototype.checkCollision = function (x, y, z) {
    if (this.disabled) {
        return false;
    }
    //Checks z collision, rounding to the nearest --thousandth-- tenths place (yeah, I really wish it were more accurate)
    //Added the - 0.1 so that you'll hit your head on ceilings
    if ((this.plane && z >= this._planeMinZ && z <= this._planeMaxZ) || (!this.plane && z >= this._solidMinZ && z <= this._solidMaxZ)) {
        if (this.type === "rect") {
            if (this._rectAxisAligned) {
                if (x < this._minX || x > this._maxX || y < this._minY || y > this._maxY) {
                    return false;
                }
            } else if (this._rectQuarterTurn) {
                if (x < this._minX || x > this._maxX || y < this._minY || y > this._maxY) {
                    return false;
                }
            } else {
                if (x < this._minX || x > this._maxX || y < this._minY || y > this._maxY) {
                    return false;
                }
            }
        } else if (this.type === "ellipse") {
            return this.ellipseContact(x, y, 0);
        } else if (this.type === "poly") {
            return this.polyContact(x, y, 0);
        } else if (this.type === "quad") {
            if (x < this._minX || x > this._maxX || y < this._minY || y > this._maxY) {
                return false;
            }
        } else if (this.type === "tri") {
            if (x < this._minX || x > this._maxX || y < this._minY || y > this._maxY) {
                return false;
            }
        }
        if (this.type === "rect") {
            if (this._rectAxisAligned || this._rectQuarterTurn) {
                return x >= this._minX && x <= this._maxX && y >= this._minY && y <= this._maxY;
            }
        }
        if (this.type === "quad" || this.type === "rect") {
            //If this is a rect in standard position, this code won't          //run because the above rect if will stop the function
            var a1x;
            var a1y;
            var b1x;
            var b1y;
            var c1x;
            var c1y;
            var d1x;
            var d1y;
            if (this.type === "quad") {
                a1x = this.p1[0];
                a1y = this.p1[1];
                b1x = this.p2[0];
                b1y = this.p2[1];
                c1x = this.p3[0];
                c1y = this.p3[1];
                d1x = this.p4[0];
                d1y = this.p4[1];
            } else if (this.type === "rect") {
                a1x = this._ax;
                a1y = this._ay;
                b1x = this._bx;
                b1y = this._by;
                c1x = this._cx;
                c1y = this._cy;
                d1x = this._dx;
                d1y = this._dy;
            }
            return (abs((0.5 * abs(x * (b1y - c1y) + b1x * (c1y - y) + c1x * (y - b1y))) / this._quadArea1 + (0.5 * abs(a1x * (y - c1y) + x * (c1y - a1y) + c1x * (a1y - y))) / this._quadArea1 + (0.5 * abs(a1x * (b1y - y) + b1x * (y - a1y) + x * (a1y - b1y))) / this._quadArea1 - 1) < 0.001 || abs((0.5 * abs(x * (d1y - c1y) + d1x * (c1y - y) + c1x * (y - d1y))) / this._quadArea2 + (0.5 * abs(a1x * (y - c1y) + x * (c1y - a1y) + c1x * (a1y - y))) / this._quadArea2 + (0.5 * abs(a1x * (d1y - y) + d1x * (y - a1y) + x * (a1y - d1y))) / this._quadArea2 - 1) < 0.001);
        } else if (this.type === "tri") {
            //Although not copied exactly, the ideas for calculating the area of the tri and using the barycentric coordinate method came from Google's Gemini
            var a = this.p1;
            var b = this.p2;
            var c = this.p3;
            return (abs((0.5 * abs(x * (b[1] - c[1]) + b[0] * (c[1] - y) + c[0] * (y - b[1]))) / this._triArea + (0.5 * abs(a[0] * (y - c[1]) + x * (c[1] - a[1]) + c[0] * (a[1] - y))) / this._triArea + (0.5 * abs(a[0] * (b[1] - y) + b[0] * (y - a[1]) + x * (a[1] - b[1]))) / this._triArea - 1) < 0.001);
        }
    }
    return false;
};
var circlePolyContact = function (points, winding, x, y, radius, resolve) {
    var inside = true;
    var nearest = Infinity;
    var nx = 0;
    var ny = 0;
    for (var i = 0; i < points.length; i += 2) {
        var j = (i + 2) % points.length;
        var ex = points[j] - points[i];
        var ey = points[j + 1] - points[i + 1];
        var dx = x - points[i];
        var dy = y - points[i + 1];
        if ((ex * dy - ey * dx) * winding < -0.00001) {
            if (radius === 0) {
                return false;
            }
            inside = false;
        }
        if (radius > 0 || resolve) {
            var lengthSq = ex * ex + ey * ey;
            var t = constrain((dx * ex + dy * ey) / lengthSq, 0, 1);
            var px = dx - ex * t;
            var py = dy - ey * t;
            var distanceSq = px * px + py * py;
            if (distanceSq < nearest) {
                nearest = distanceSq;
                nx = distanceSq > 0.000001 ? px : ey * winding;
                ny = distanceSq > 0.000001 ? py : -ex * winding;
            }
        }
    }
    if (!inside && nearest > radius * radius) {
        return false;
    }
    if (!resolve) {
        return true;
    }
    var distance = sqrt(nearest);
    var sign = inside && distance > 0.001 ? -1 : 1;
    var normal = sign / sqrt(nx * nx + ny * ny);
    return {
        nx: nx * normal,
        ny: ny * normal,
        depth: radius + (inside ? distance : -distance)
    };
};
Collision.prototype.polyContact = function (x, y, radius, resolve) {
    return this.inBounds(x, y, radius) && circlePolyContact(this.vertices, this.winding, x, y, radius, resolve);
};
Collision.prototype.ellipseContact = function (x, y, radius, resolve, vel) {
    if (this._halfW <= 0 || this._halfH <= 0 || x + radius < this._minX || x - radius > this._maxX || y + radius < this._minY || y - radius > this._maxY) {
        return false;
    }
    var dx = x - this.x;
    var dy = y - this.y;
    if (this._halfW === this._halfH) {
        var reach = this._halfW + radius;
        var distanceSq = dx * dx + dy * dy;
        if (distanceSq > reach * reach) {
            return false;
        }
        if (!resolve) {
            return true;
        }
        var distance = sqrt(distanceSq);
        if (distance > 0.0001) {
            return {
                nx: dx / distance,
                ny: dy / distance,
                depth: reach - distance
            };
        }
        var speed = vel ? sqrt(vel.x * vel.x + vel.y * vel.y) : 0;
        return speed > 0.0001 ? {
            nx: -vel.x / speed,
            ny: -vel.y / speed,
            depth: reach
        } : {
            nx: 1,
            ny: 0,
            depth: reach
        };
    }
    var c = this._ellipseCos;
    var s = this._ellipseSin;
    var localX = dx * c + dy * s;
    var localY = -dx * s + dy * c;
    var swapped = this._halfW < this._halfH;
    var a = swapped ? this._halfH : this._halfW;
    var b = swapped ? this._halfW : this._halfH;
    var u = swapped ? localY : localX;
    var v = swapped ? localX : localY;
    var pu = abs(u);
    var pv = abs(v);
    var inside = pow(pu / a, 2) + pow(pv / b, 2) <= 1;
    if (!resolve && (inside || radius === 0)) {
        return inside;
    }
    var a2 = a * a;
    var b2 = b * b;
    var gap = a2 - b2;
    var au = a * pu;
    var bv = b * pv;
    var nearestU = a;
    var nearestV = 0;
    if (pv < 0.000001) {
        if (au < gap) {
            nearestU = a * au / gap;
            nearestV = b * sqrt(max(0, 1 - pow(nearestU / a, 2)));
        }
    } else {
        var low = inside ? bv : b2;
        var high = inside ? b2 : sqrt(au * au + bv * bv);
        for (var i = 0; i < 32; i++) {
            var mid = (low + high) / 2;
            if (pow(au / (gap + mid), 2) + pow(bv / mid, 2) > 1) {
                low = mid;
            } else {
                high = mid;
            }
        }
        var root = (low + high) / 2;
        nearestU = a * au / (gap + root);
        nearestV = b * bv / root;
    }
    var distance = dist(pu, pv, nearestU, nearestV);
    if (!inside && distance > radius) {
        return false;
    }
    if (!resolve) {
        return true;
    }
    var nu = (u < 0 ? -nearestU : nearestU) / a2;
    var nv = (v < 0 ? -nearestV : nearestV) / b2;
    var nx = swapped ? nv : nu;
    var ny = swapped ? nu : nv;
    var length = sqrt(nx * nx + ny * ny);
    return {
        nx: (nx * c - ny * s) / length,
        ny: (nx * s + ny * c) / length,
        depth: radius + (inside ? distance : -distance)
    };
};
Collision.prototype.findNormal = function (x, y) {
    if (this.type === "rect") {
        if (abs(this.rotation) === 0 || abs(this.rotation) === 180) {
            if ((round(y) >= this.y + this.height / 2 - 3 && playerVel.y < 0) || (y <= this.y - this.height / 2 + 3 && playerVel.y > 0)) {
                return new PVector(0, -playerVel.y);
                //I don't like having to use this error margin of 3, it doesn't work out well. But I don't know how to fix it...
            } else {
                return new PVector(-playerVel.x, 0);
            }
        } else if (abs(this.rotation === 90) || abs(this.rotation) === 270) {
        } else {
            var normal = new PVector(playerVel.mag() * sin("something"), playerVel.mag * sin("something"));
        }
    } else if (this.type === "quad") {
    } else if (this.type === "tri") {
    } else if (this.type === "ellipse") {
    }
};
Collision.prototype.entityCollide = function (pos, vel, size, bounce) {
    var reach = size + 0.25;
    var top = this.zMoveTick === tickClock.tick ? min(this.bodyTop, this.priorTop) : this.bodyTop;
    if (this.disabled || !this.blocksPlayers || this.plane || pos.z < this.bodyBase || pos.z >= top - 0.00001 || !this.inBounds(pos.x, pos.y, reach)) {
        return 0;
    }
    var hitMask = 0;
    var velScale = 1;
    if (vel && vel._stepScale !== undefined) {
        velScale = vel._stepScale;
    }
    //Round trunks need continuous contact, including between perimeter samples.
    if (this.type === "ellipse" || this.type === "poly") {
        var contact = this.type === "poly" ? this.polyContact(pos.x, pos.y, reach, true) : this.ellipseContact(pos.x, pos.y, reach, true, vel);
        if (!contact) {
            return 0;
        }
        pos.x += contact.nx * contact.depth;
        pos.y += contact.ny * contact.depth;
        var inward = vel ? vel.x * contact.nx + vel.y * contact.ny : 0;
        if (vel && inward < 0) {
            vel.x -= (1 + (bounce || 0)) * inward * contact.nx;
            vel.y -= (1 + (bounce || 0)) * inward * contact.ny;
        }
        return 2;
    }
    if (this.type === "rect") {
        var dx = pos.x - this.x;
        var dy = pos.y - this.y;
        var c = this._cos;
        var s = this._sin;
        var localX = dx * c + dy * s;
        var localY = dy * c - dx * s;
        var halfW = this._halfW;
        var halfH = this._halfH;
        var pushLocalX = 0;
        var pushLocalY = 0;
        var closestX = constrain(localX, -halfW, halfW);
        var closestY = constrain(localY, -halfH, halfH);
        var cornerDx = localX - closestX;
        var cornerDy = localY - closestY;
        var cornerDistSq = cornerDx * cornerDx + cornerDy * cornerDy;
        if (cornerDistSq <= reach * reach) {
            if (abs(cornerDx) < 0.0001 && abs(cornerDy) < 0.0001) {
                var overlapX = halfW + size + 0.25 - abs(localX);
                var overlapY = halfH + size + 0.25 - abs(localY);
                if (overlapX < overlapY) {
                    var localVelX = vel ? vel.x * c + vel.y * s : 0;
                    var pushSignX = localX < -0.0001 ? -1 : localX > 0.0001 ? 1 : localVelX > 0 ? -1 : 1;
                    pushLocalX = overlapX * pushSignX;
                } else {
                    var localVelY = vel ? vel.y * c - vel.x * s : 0;
                    var pushSignY = localY < -0.0001 ? -1 : localY > 0.0001 ? 1 : localVelY > 0 ? -1 : 1;
                    pushLocalY = overlapY * pushSignY;
                }
            } else {
                var cornerDist = sqrt(max(0.0001, cornerDistSq));
                var cornerPush = reach - cornerDist;
                pushLocalX = (cornerDx / cornerDist) * cornerPush;
                pushLocalY = (cornerDy / cornerDist) * cornerPush;
            }
            var pushWorldX = pushLocalX * c - pushLocalY * s;
            var pushWorldY = pushLocalX * s + pushLocalY * c;
            var pushLen = max(0.0001, sqrt(pushWorldX * pushWorldX + pushWorldY * pushWorldY));
            var normalX = pushWorldX / pushLen;
            var normalY = pushWorldY / pushLen;
            var inwardSpeed = vel ? vel.x * normalX + vel.y * normalY : 0;
            pos.x += pushWorldX;
            pos.y += pushWorldY;
            if (vel && inwardSpeed < 0) {
                vel.x -= inwardSpeed * normalX;
                vel.y -= inwardSpeed * normalY;
            }
            return 2;
        }
    }
    for (var k = 0; k < colSamples.length; k++) {
        var sampleX = pos.x + size * colSamples[k].x;
        var sampleY = pos.y + size * colSamples[k].y;
        if (this.checkCollision(sampleX, sampleY, this._solidMinZ)) {
            hitMask |= 2;
            if (collideMode === "unstable") {
                vel.add(this.findNormal(sampleX + 300, sampleY + 300));
                println(playerVel);
                break;
            } else {
                if (k === 1 || k === 3 || k === 5 || k === 7) {
                    pos.x -= vel.x * velScale;
                    pos.y -= vel.y * velScale;
                    if (bounce) {
                        vel.x -= vel.x * (1 + bounce);
                        vel.y -= vel.y * (1 + bounce);
                    } else {
                        vel.x = 0;
                        vel.y = 0;
                    }
                } else if (k === 0 || k === 4) {
                    pos.x -= vel.x * velScale;
                    if (bounce) {
                        vel.x -= vel.x * (1 + bounce);
                    } else {
                        vel.x = 0;
                    }
                } else if (k === 2 || k === 6) {
                    //if is only for clarity
                    pos.y -= vel.y * velScale;
                    if (bounce) {
                        vel.y -= vel.y * (1 + bounce);
                    } else {
                        vel.y = 0;
                    }
                }
            }
        }
    }
    return hitMask;
};
Collision.prototype.move = function (x, y) {
    if (this.type === "rect" || this.type === "ellipse" || this.type === "poly") {
        this.x += x;
        this.y += y;
    } else {
        this.p1[0] += x;
        this.p1[1] += y;
        this.p2[0] += x;
        this.p2[1] += y;
        this.p3[0] += x;
        this.p3[1] += y;
        if (this.type === "quad") {
            this.p4[0] += x;
            this.p4[1] += y;
        }
    }
    this.refreshCache();
};
Collision.prototype.turn = function (angle) {
    if (this.type === "rect" || this.type === "ellipse" || this.type === "poly") {
        this.rotation += angle;
        this.refreshCache();
    }
};
var zChanger = function (collider, type, zChange, snap) {
    this.collision = new Collision(collider); //Collider is a collision config
    this.type = type || "sudden";
    this.zChange = zChange;
    this.topLanding = collider.topLanding;
    this.snap = snap || false;
};
zChanger.prototype.update = function () {
    if (this.type === "smooth") {
        return;
    }
    var ci = this.collision;
    if (ci.checkCollision(playerPos.x, playerPos.y, round(playerPos.z * 10) / 10)) {
        if (this.snap || (playerPos.z >= floor(ci.lowZ) && playerPos.z <= floor(ci.highZ))) {
            playerPos.z = this.zChange;
        }
    }
};
/**GameObject Constructor**/
var GameObj = function (config) {
    this.x = config.x !== undefined ? config.x : 0;
    this.y = config.y !== undefined ? config.y : 0;
    if (config.lowZ !== undefined) {
        this.lowZ = config.lowZ;
        this.highZ = config.highZ !== undefined ? config.highZ : config.lowZ;
    } else if (config.zValue !== undefined) {
        this.lowZ = config.zValue;
        this.highZ = config.zValue;
    } else {
        this.lowZ = 0;
        this.highZ = 0;
    }
    this.collisions = config.collisions || [];
    this.floorArt = config.floorArt;
    this.castsShadow = config.castsShadow;
    this.tag = config.tag;
    this.renderEveryLayer = config.renderEveryLayer !== undefined ? config.renderEveryLayer : false;
};
//These are placeholder functions. Specific object constructors will inherit from here and override functions
GameObj.prototype.update = function () {
};
GameObj.prototype.render = function () {
    fill(255, 0, 0);
    noStroke();
    ellipse(this.x, this.y, 50, 50);
};
GameObj.prototype.interact = function () {
    if (dist(playerPos.x, playerPos.y, this.x, this.y) <= 100) {
        //Run Code
    }
};
/**Specific Object Constructors**/
//These inherit from the parent GameObj class, and instances of these are put into GameMap instances
var Decoration = function (config) {
    GameObj.call(this, config);
    this.rotation = -(config.rotation !== undefined ? config.rotation : 0);
    this.onRender = config.onRender || function () {
    };
    this.onUpdate = config.onUpdate || function () {
    };
};
Decoration.prototype = Object.create(GameObj.prototype);
Decoration.prototype.update = function () {
    this.onUpdate();
};
Decoration.prototype.render = function () {
    this.onRender();
};
var Wall = function (config) {
    GameObj.call(this, config);
    this.width = config.width !== undefined ? config.width : 50;
    this.height = config.height !== undefined ? config.height : 50;
    this.rotation = -(config.rotation !== undefined ? config.rotation : 0);
    this.color = config.color !== undefined ? config.color : color(150, 150, 160);
    this.borderColor = config.borderColor !== undefined ? config.borderColor : color(0);
    this.borderSize = config.borderSize !== undefined ? config.borderSize : 2;
    this.cornerRadius = config.cornerRadius || 0;
    this.top = config.top !== undefined ? config.top : true;
    this.gapFill = config.gapFill !== undefined ? config.gapFill : false;
    if (config.blocksLasers !== null) {
        this.blocksLasers = config.blocksLasers;
    } else {
        this.blocksLasers = false;
    }
    if (this.top === true) {
        this.collisions = [
            new Collision({
                type: "rect",
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height,
                rotation: this.rotation,
                lowZ: this.lowZ,
                highZ: this.highZ,
                blocksLasers: this.blocksLasers,
                smoothCorners: config.smoothCorners
            }),
            new Collision({
                type: "rect",
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height,
                rotation: this.rotation,
                zValue: this.highZ > this.lowZ ? this.highZ : floor(this.lowZ) + 1,
                plane: true,
                exactSurface: true
            })
        ];
    } else {
        this.collisions = [
            new Collision({
                type: "rect",
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height,
                rotation: this.rotation,
                lowZ: this.lowZ,
                highZ: this.highZ,
                blocksLasers: this.blocksLasers
            })
        ];
    }
};
Wall.prototype = Object.create(GameObj.prototype);
Wall.prototype.render = function () {
    rectMode(CENTER);
    fill(this.color);
    stroke(this.borderColor);
    strokeWeight(this.borderSize);
    pushMatrix();
    translate(this.x, this.y);
    rotate(this.rotation);
    if (this.cornerRadius) {
        rect(0, 0, this.width, this.height, this.cornerRadius);
    } else {
        rect(0, 0, this.width, this.height);
    }
    if (this.gapFill) {
        rect((this.x - camPos.x) / 20, (this.y - camPos.y) / 20, this.width * 1.05, this.height * 1.05);
    }
    popMatrix();
};
var Circle = function (config) {
    GameObj.call(this, config);
    this.width = config.width !== undefined ? config.width : 50;
    this.height = config.height !== undefined ? config.height : 50;
    this.collisions = [
        new Collision({
            type: "ellipse",
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            lowZ: this.lowZ,
            highZ: this.highZ
        })
    ];
    this.color = config.color !== undefined ? config.color : color(150, 150, 160);
};
Circle.prototype = Object.create(GameObj.prototype);
Circle.prototype.render = function () {
    fill(this.color);
    stroke(0);
    strokeWeight(3);
    ellipse(this.x, this.y, this.width, this.height);
};
var Floor = function (config) {
    GameObj.call(this, config);
    this.points = config.points;
    this.width = config.width;
    this.height = config.height;
    this.ellipse = config.ellipse;
    this.rotation = -(config.rotation !== undefined ? config.rotation : 0);
    this.color = config.color !== undefined ? config.color : color(150, 150, 160);
    this.fadeColor = config.fadeColor !== undefined ? config.fadeColor : color(red(this.color), green(this.color), blue(this.color), min(alpha(this.color), 80));
    //Floor collisions seriously need to be reworked
    if (config.collisions) {
        this.collisions = config.collisions;
    } else if (this.width) {
        if (this.ellipse) {
            this.collisions = [
                new Collision({
                    type: "ellipse",
                    x: this.x,
                    y: this.y,
                    width: this.width,
                    height: this.height,
                    rotation: this.rotation,
                    plane: true,
                    lowZ: this.lowZ,
                    highZ: this.highZ
                })
            ];
            this.secondCollision = new Collision({
                type: "ellipse",
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height,
                rotation: this.rotation,
                plane: true,
                lowZ: this.lowZ,
                highZ: this.highZ
            });
        } else {
            this.collisions = [
                new Collision({
                    type: "rect",
                    x: this.x,
                    y: this.y,
                    width: this.width,
                    height: this.height,
                    rotation: this.rotation,
                    plane: true,
                    lowZ: this.lowZ,
                    highZ: this.highZ
                })
            ];
            this.secondCollision = new Collision({
                type: "rect",
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height,
                rotation: this.rotation,
                plane: true,
                lowZ: this.lowZ,
                highZ: this.highZ
            });
        }
    } else if (this.points.length === 8) {
        this.collisions = [
            new Collision({
                type: "quad",
                points: this.points,
                rotation: this.rotation,
                plane: true,
                lowZ: this.lowZ,
                highZ: this.highZ
            })
        ];
        this.secondCollision = new Collision({
            type: "quad",
            points: this.points,
            rotation: this.rotation,
            plane: true,
            lowZ: this.lowZ,
            highZ: this.highZ
        });
    } else {
        this.collisions = [
            new Collision({
                type: "tri",
                points: this.points,
                rotation: this.rotation,
                plane: true,
                lowZ: this.lowZ,
                highZ: this.highZ
            })
        ];
        this.secondCollision = new Collision({
            type: "tri",
            points: this.points,
            rotation: this.rotation,
            plane: true,
            lowZ: this.lowZ,
            highZ: this.highZ
        });
    }
    for (var floorColIndex = 0; floorColIndex < this.collisions.length; floorColIndex++) {
        if (this.collisions[floorColIndex] && this.collisions[floorColIndex].plane) {
            this.collisions[floorColIndex].spawnSurface = true;
        }
    }
    if (this.secondCollision) {
        this.secondCollision.lowZ = -100;
        this.secondCollision.highZ = this.lowZ;
    }
    //Do I want this to be -1?
};
Floor.prototype = Object.create(GameObj.prototype);
Floor.prototype.render = function () {
    noStroke();
    //Floor collision lands actors on floor(lowZ), including fractional-Z decks.
    if (playerPos.z < floor(this.lowZ) - 0.001) {
        var opacity = min(alpha(this.color), constrain(alpha(this.fadeColor), 64, 90));
        fill(red(this.fadeColor), green(this.fadeColor), blue(this.fadeColor), opacity);
    } else {
        fill(this.color);
    }
    if (this.points) {
        var tp = this.points; //Not toilet paper
        if (tp.length === 8) {
            quad(tp[0], tp[1], tp[2], tp[3], tp[4], tp[5], tp[6], tp[7]);
        } else if (tp.length === 6) {
            triangle(tp[0], tp[1], tp[2], tp[3], tp[4], tp[5]);
        } else {
            beginShape();
            for (var i = 0; i < tp.length; i += 2) {
                vertex(tp[i], tp[i + 1]);
            }
            endShape(CLOSE);
        }
    } else if (this.ellipse) {
        pushMatrix();
        translate(this.x, this.y);
        rotate(this.rotation);
        ellipse(0, 0, this.width, this.height);
        popMatrix();
    } else {
        rectMode(CENTER);
        pushMatrix();
        translate(this.x, this.y);
        rotate(this.rotation);
        rect(0, 0, this.width, this.height);
        popMatrix();
    }
};
var Sands = function (config) {
    GameObj.call(this, config);
    this.sands = [];
    for (var k = 0; k < 3000; k++) {
        this.sands.push({
            x: random(-2500, 2500),
            y: random(-2500, 2500),
            size: random(2, 10),
            color: color(random(200, 255), random(150, 200), random(0, 75))
        });
    }
};
Sands.prototype = Object.create(GameObj.prototype);
Sands.prototype.render = function () {
    noStroke();
    for (var k = 0; k < this.sands.length; k++) {
        fill(this.sands[k].color);
        ellipse(this.sands[k].x, this.sands[k].y, this.sands[k].size, this.sands[k].size);
    }
};
Stairs = function (config) {
    GameObj.call(this, config);
    this.stepHeight = config.stepHeight !== undefined ? config.stepHeight : 10;
    this.stepSpace = config.stepSpace !== undefined ? config.stepSpace : 10;
    this.width = config.width || [150, 140]; //Bottom width, top width
    this.height = config.height !== undefined ? config.height : 60;
    this.rotation = -(config.rotation !== undefined ? config.rotation : 0);
    this.color = config.color !== undefined ? config.color : color(150, 150, 160);
    this.railColor = config.railColor !== undefined ? config.railColor : color(120, 120, 130);
    this.railThickness = config.railThickness !== undefined ? config.railThickness : 6;
    this.rails = config.rails !== undefined ? config.rails : true;
    this.blocksLasers = config.blocksLasers !== undefined ? config.blocksLasers : false;
    this.mode = config.mode || "smooth";
    if (config.zChange) {
        if (this.mode === "smooth") {
            this.zChanger = new zChanger(
            {
                type: "rect",
                x: this.x,
                y: this.y,
                width: (this.width[0] + this.width[1]) / 2,
                height: this.height,
                rotation: this.rotation,
                topLanding: config.topLanding
            },
            "smooth",
            config.zChange
            );
        } else {
            this.zChangerTop = new zChanger(
            {
                type: "rect",
                width: this.width[1],
                height: 5,
                x: this.x + (this.height / 2) * cos(-this.rotation + 90),
                y: this.y + (this.height / 2) * sin(-this.rotation - 90),
                rotation: this.rotation
            },
            "sudden",
            config.zChange[1]
            );
            this.zChangerBottom = new zChanger(
            {
                type: "rect",
                width: this.width[0],
                height: 5,
                x: this.x + (this.height / 2) * cos(-this.rotation - 90),
                y: this.y + (this.height / 2) * sin(-this.rotation + 90),
                rotation: this.rotation
            },
            "sudden",
            config.zChange[0]
            );
        }
    }
    if (this.rails) {
        this.collisions = [
            new Collision({
                type: "rect",
                x: this.x - ((this.width[0] + this.width[1]) / 4) * cos(-this.rotation),
                y: this.y + ((this.width[0] + this.width[1]) / 4) * sin(-this.rotation),
                width: this.railThickness,
                height: this.height,
                blocksLasers: this.blocksLasers,
                rotation: this.rotation
            }),
            new Collision({
                type: "rect",
                x: this.x - ((this.width[0] + this.width[1]) / 4) * cos(-this.rotation + 180),
                y: this.y + ((this.width[0] + this.width[1]) / 4) * sin(-this.rotation + 180),
                width: this.railThickness,
                height: this.height,
                blocksLasers: this.blocksLasers,
                rotation: this.rotation
            })
        ];
    }
};
Stairs.prototype = Object.create(GameObj.prototype);
Stairs.prototype.update = function () {
    if (this.zChangerTop) {
        this.zChangerTop.update();
        this.zChangerBottom.update();
    }
};
Stairs.prototype.render = function () {
    pushStyle();
    rectMode(0);
    pushMatrix();
    translate(this.x, this.y);
    rotate(this.rotation);
    fill(this.color);
    noStroke();
    for (var k = 0; k < floor(this.height / (this.stepHeight + this.stepSpace)); k++) {
        var stepWidth = this.width[0] + ((this.width[0] - this.width[1]) / this.height) * (this.height / 2 - this.stepHeight / 2 - k * (this.stepHeight + this.stepSpace)) - (this.width[0] - this.width[1]) / 2;
        rect( -stepWidth / 2, this.height / 2 - this.stepHeight - k * (this.stepHeight + this.stepSpace), stepWidth, this.stepHeight);
    }
    if (this.rails) {
        stroke(this.railColor);
        strokeWeight(this.railThickness);
        line(this.width[1] / -2, this.height / -2, this.width[0] / -2, this.height / 2);
        line(this.width[1] / 2, this.height / -2, this.width[0] / 2, this.height / 2);
    }
    popMatrix();
    popStyle();
};
var SparkParticles2 = function (config) {
    GameObj.call(this, config);
    this.sparks = [];
    this.x = config.x !== undefined ? config.x : 0;
    this.y = config.y !== undefined ? config.y : 0;
    this.dir = -(config.direction !== undefined ? config.direction : 0);
    this.amt = config.rate !== undefined ? config.rate : 170;
    this.spread = config.spread !== undefined ? config.spread : 40;
    this.color = config.color !== undefined ? config.color : color(150, 150, 200, 200);
};
SparkParticles2.prototype = Object.create(GameObj.prototype);
SparkParticles2.prototype.update = function () {
    this.spawnClock = (this.spawnClock || 0) + tickClock.scale;
    if (this.spawnClock >= max(1, this.amt)) {
        this.spawnClock %= max(1, this.amt);
        this.amt = max(1, this.amt + round(random(-5, 5)));
        for (var k = 0; k < random(3, 15); k++) {
            this.sparks.push({
                x: this.x,
                y: this.y,
                colour: this.color ? this.color : random() < 0.5 ? color(255, 255, 0) : color(168, 168, 255),
 //hehe
                r: random(-this.spread, this.spread),
                x2: 0,
                vel: random(3, 7),
                sz: 7,
                life: random(3, 7)
            });
        }
    }
    for (var particleIndex = this.sparks.length - 1; particleIndex >= 0; particleIndex--) {
        var p = this.sparks[particleIndex];
        if (p.life <= 0) {
            p.sz -= p.vel * tickClock.scale;
        }
        p.life -= 0.5 * tickClock.scale;
        p.x2 += p.vel * tickClock.scale;
        if (p.sz <= 0) {
            this.sparks.splice(particleIndex, 1);
        }
    }
};
SparkParticles2.prototype.render = function () {
    for (var particleIndex = 0; particleIndex < this.sparks.length; particleIndex++) {
        var p = this.sparks[particleIndex];
        pushMatrix();
        translate(p.x, p.y);
        rotate(this.dir + p.r);
        for (var s = 0; s < 3; s += lowDetailMode ? 2 : 1) {
            stroke(p.colour, (-s + 3) * 100);
            strokeWeight((s + 1) * 2);
            line(p.x2, 0, p.x2 + p.sz, 0);
        }
        popMatrix();
    }
};
//Having bizzare issues here with layering and colors
var setHeavyProp = function (prop, mass, aimRadius) {
    prop.forceMass = mass;
    prop.forceAimRadius = aimRadius;
    prop.pos = new PVector(prop.x, prop.y, prop.lowZ);
    prop.forceRadius = 0;
    for (var i = 0; i < prop.collisions.length; i++) {
        var col = prop.collisions[i];
        col.lowZ = prop.lowZ;
        col.highZ = prop.lowZ + 0.9;
        col.refreshCache();
        prop.forceRadius = max(prop.forceRadius, dist(prop.x, prop.y, col.x, col.y) + dist(0, 0, col.width, col.height) / 2);
    }
};
var AT_AT = function (config) {
    GameObj.call(this, config);
    this.width = config.width !== undefined ? config.width : 50;
    this.height = config.height !== undefined ? config.height : 50;
    this.rotation = -(config.rotation !== undefined ? config.rotation : 0);
    this.collisions = [
        new Collision({
            type: "rect",
            x: this.x - 24,
            y: this.y - 339,
            width: 124,
            height: 132,
            rotation: 0,
            lowZ: 0,
            highZ: 1
        }), //neck
        new Collision({
            type: "rect",
            x: this.x - 23,
            y: this.y - 456,
            width: 189,
            height: 161,
            rotation: 0,
            lowZ: 0,
            highZ: 1
        }), //head
        new Collision({
            type: "rect",
            x: this.x - 235,
            y: this.y - 203,
            width: 215,
            height: 90,
            rotation: 10,
            lowZ: 0,
            highZ: 1
        }), //top leg
        new Collision({
            type: "rect",
            x: this.x - 415,
            y: this.y - 203,
            width: 183,
            height: 90,
            rotation: -10,
            lowZ: 0,
            highZ: 1
        }), //top leg
        new Collision({
            type: "rect",
            x: this.x - 514,
            y: this.y - 188,
            width: 80,
            height: 164,
            rotation: -10,
            lowZ: 0,
            highZ: 1
        }), //top foot
        new Collision({
            type: "rect",
            x: this.x - 188,
            y: this.y - 203 + 377,
            width: 215,
            height: 90,
            rotation: 33,
            lowZ: 0,
            highZ: 1
        }), //bottom leg
        new Collision({
            type: "rect",
            x: this.x - 309,
            y: this.y - 210 + 377,
            width: 183,
            height: 90,
            rotation: -33,
            lowZ: 0,
            highZ: 1
        }), //bottom leg
        new Collision({
            type: "rect",
            x: this.x - 386,
            y: this.y - 151 + 377,
            width: 80,
            height: 164,
            rotation: -40,
            lowZ: 0,
            highZ: 1
        }), //bottom foot
        new Collision({
            type: "rect",
            x: this.x + 89,
            y: this.y - 184,
            width: 123,
            height: 198,
            rotation: -24,
            lowZ: 0,
            highZ: 1
        }), //back
        new Collision({
            type: "rect",
            x: this.x + 57,
            y: this.y,
            width: 254,
            height: 275,
            rotation: 0,
            lowZ: 0,
            highZ: 1
        }), //back
        new Collision({
            type: "rect",
            x: this.x + 89,
            y: this.y + 180,
            width: 123,
            height: 198,
            rotation: 24,
            lowZ: 0,
            highZ: 1
        }), //back
        new Collision({
            type: "rect",
            x: this.x - 22,
            y: this.y,
            width: 254,
            height: 600,
            rotation: 0,
            lowZ: 0,
            highZ: 1
        }), //body
        new Collision({
            type: "rect",
            x: this.x - 110,
            y: this.y - 570,
            width: 20,
            height: 80,
            rotation: 0,
            lowZ: 0,
            highZ: 1
        })
    ];
    this.color = config.color !== undefined ? config.color : color(150, 150, 160);
    this.borderColor = config.borderColor !== undefined ? config.borderColor : color(0);
    this.borderSize = config.borderSize !== undefined ? config.borderSize : 2;
    this.imgName = config.imgName || "AT_AT_Moss";
    setHeavyProp(this, 26, 620);
};
AT_AT.prototype = Object.create(GameObj.prototype);
AT_AT.prototype.render = function () {
    rectMode(CENTER);
    fill(this.color);
    stroke(this.borderColor);
    strokeWeight(this.borderSize);
    pushMatrix();
    translate(this.x, this.y);
    rotate(this.rotation);
    strokeWeight(20);
    stroke(95, 98, 95);
    line(-110, -530, -110, -610);
    noStroke();
    fill(91, 94, 91);
    rect(-24, -339, 124, 132); //neck
    fill(95, 98, 95);
    rect(-23, -456, 189, 161, 20, 100, 10, 10); //head
    {
        fill(91, 94, 91);
        pushMatrix();
        translate(-235, -203);
        rotate(10);
        rect(0, 0, 215, 90); //top leg
        popMatrix();
        pushMatrix();
        translate(-415, -203);
        rotate(-10);
        rect(0, 0, 183, 90); //top leg
        popMatrix();
        pushMatrix();
        translate(-514, -188);
        rotate(-10);
        fill(95, 98, 95);
        rect(0, 0, 80, 164, 0, 30, 30, 0); //top foot
        popMatrix();
    } //Top leg
    {
        fill(91, 94, 91);
        pushMatrix();
        translate(0, 377);
        pushMatrix();
        translate(-188, -203);
        rotate(33);
        rect(0, 0, 215, 90); //bottom leg
        popMatrix();
        pushMatrix();
        translate(-309, -210);
        rotate(-33);
        rect(0, 0, 183, 90); //bottom leg
        popMatrix();
        pushMatrix();
        translate(-386, -151);
        rotate(-40);
        fill(95, 98, 95);
        rect(0, 0, 80, 164, 0, 30, 30, 0); //bottom foot
        popMatrix();
        popMatrix();
    } //Bottom leg
    {
        fill(95, 98, 95);
        pushMatrix();
        translate(89, -184);
        rotate(-24);
        rect(0, 0, 123, 198);
        popMatrix();
        pushMatrix();
        translate(89, 180);
        rotate(24);
        rect(0, 0, 123, 198);
        popMatrix();
        rect(57, 0, 254, 275, 20); //back
        rect(-22, 0, 254, 600, 20); //body
    } //Body
    drawImg(loadedImages[this.imgName], -149, -300, 1407, 1200);
    pushMatrix();
    translate(-347, -177);
    rotate(-80);
    drawImg(loadedImages[this.imgName], 0, 0, 523, 499);
    popMatrix();
    pushMatrix();
    translate(-332, -264);
    rotate(80);
    drawImg(loadedImages[this.imgName], 0, 0, 523, 306);
    popMatrix();
    pushMatrix();
    translate(-308, 151);
    rotate(-57);
    drawImg(loadedImages[this.imgName], 0, 0, 523, 499);
    popMatrix();
    pushMatrix();
    translate(-259, 80);
    rotate(57);
    drawImg(loadedImages[this.imgName], 0, 0, 523, 306);
    popMatrix();
    pushMatrix();
    translate(-113, -379);
    rotate(-90);
    drawImg(loadedImages[this.imgName], 0, 0, 883, 357);
    popMatrix();
    popMatrix();
};

var BlastDoor = function (config) {
    GameObj.call(this, config);
    this.thickness = config.thickness !== undefined ? config.thickness : 10;
    this.color = config.color !== undefined ? config.color : color(110);
    this.width = config.width !== undefined ? config.width : 200;
    this.dist = config.dist !== undefined ? config.dist : 100;
    this.distZ = config.distZ || [floor(this.lowZ), floor(this.highZ)];
    this.speed = config.speed !== undefined ? config.speed : 0.5;
    this.rotation = -(config.rotation !== undefined ? config.rotation : 0);
    this.timer = 0;
    var panelTop = config.panelTop === undefined ? this.highZ + 1 : min(this.highZ + 1, config.panelTop);
    this.collisions = [
        new Collision({
            type: "rect",
            collisionMode: "live",
            lowZ: this.lowZ,
            highZ: panelTop,
            width: this.width / 2,
            height: this.thickness,
            rotation: this.rotation,
            x: this.x + (this.width / 4) * cos(this.rotation),
            y: this.y + (this.width / 4) * sin(this.rotation),
            smoothCorners: config.smoothCorners
        }),
        new Collision({
            type: "rect",
            collisionMode: "live",
            lowZ: this.lowZ,
            highZ: panelTop,
            width: this.width / 2,
            height: this.thickness,
            rotation: this.rotation,
            x: this.x + (this.width / 4) * cos(this.rotation + 180),
            y: this.y + (this.width / 4) * sin(this.rotation + 180),
            smoothCorners: config.smoothCorners
        })
    ];
    this.collisions[0].door = this;
    this.collisions[1].door = this;
};
BlastDoor.prototype = Object.create(GameObj.prototype);
BlastDoor.prototype.opensOnLayer = function (layer) {
    return layer >= floor(this.distZ[0]) && layer <= floor(this.distZ[1]);
};
BlastDoor.prototype.hasNearbyOpener = function () {
    if (this.opensOnLayer(floor(playerPos.z)) && dist(this.x, this.y, playerPos.x, playerPos.y) < this.dist) {
        return true;
    }
    if (!currentMap || !currentMap.entities) {
        return false;
    }
    var zStart = max(currentMap.killZ, floor(this.distZ[0]));
    var zEnd = min(currentMap.topZ + 1, floor(this.distZ[1]));
    for (var z = zStart; z <= zEnd; z++) {
        var list = currentMap.entities[z];
        if (!list) {
            continue;
        }
        for (var e = 0; e < list.length; e++) {
            var ent = list[e];
            if (!ent || !ent.pos || ent.health === undefined || ent.health <= 0) {
                continue;
            }
            if (dist(this.x, this.y, ent.pos.x, ent.pos.y) < this.dist) {
                return true;
            }
        }
    }
    return false;
};
BlastDoor.prototype.update = function () {
    var tick = tickClock.scale;
    if (this._openerAtMs === undefined || tickClock.gameMs >= this._openerAtMs || tickClock.gameMs < this._lastOpenerMs) {
        this._hasOpener = this.hasNearbyOpener();
        this._lastOpenerMs = tickClock.gameMs;
        this._openerAtMs = tickClock.gameMs + 100;
    }
    if (this.manualUntil !== undefined && tickClock.gameMs >= this.manualUntil) {
        this.manualOpen = undefined;
        this.manualUntil = undefined;
    }
    var hasOpener = this.manualOpen === undefined ? this._hasOpener : this.manualOpen;
    var previousTimer = this.timer;
    if (hasOpener) {
        this.timer = min(this.speed, this.timer + 0.05 * tick);
    } else if (this.timer > 0) {
        this.timer = max(0, this.timer - 0.05 * tick);
    }
    if (this.manualOpen !== undefined && this.manualUntil === undefined && this.timer === (this.manualOpen ? this.speed : 0)) {
        this.manualUntil = tickClock.gameMs + (this.manualOpen ? 3000 : 5000);
    }
    this.collisions[0].width = lerp(this.width / 2, 0, this.timer / this.speed);
    this.collisions[0].x = lerp(this.x + (this.width / 4) * cos(this.rotation), this.x + (this.width / 2) * cos(this.rotation), this.timer / this.speed);
    this.collisions[0].y = lerp(this.y + (this.width / 4) * sin(this.rotation), this.y + (this.width / 2) * sin(this.rotation), this.timer / this.speed);
    this.collisions[0].refreshCache();
    this.collisions[1].width = lerp(this.width / 2, 0, this.timer / this.speed);
    this.collisions[1].x = lerp(this.x + (this.width / 4) * cos(this.rotation + 180), this.x + (this.width / 2) * cos(this.rotation + 180), this.timer / this.speed);
    this.collisions[1].y = lerp(this.y + (this.width / 4) * sin(this.rotation + 180), this.y + (this.width / 2) * sin(this.rotation + 180), this.timer / this.speed);
    this.collisions[1].refreshCache();
    this.collisions[0].disabled = this.collisions[0].width < 0.5;
    this.collisions[1].disabled = this.collisions[1].width < 0.5;
    if (this.timer < previousTimer) {
        crushInDoor(this, (previousTimer - this.timer) * this.width / (2 * this.speed * max(0.001, tick)));
    }
};
BlastDoor.prototype.render = function (layer) {

    pushMatrix();
    translate(this.x, this.y);
    rotate(this.rotation);
    strokeWeight(this.thickness);
    stroke(this.color);
    line(-this.width / 2, 0, lerp(0, -this.width / 2, this.timer / this.speed), 0);
    line(this.width / 2, 0, lerp(0, this.width / 2, this.timer / this.speed), 0);
    popMatrix();
};
var tieWingPoints = [0, -240, 60, -145, 60, 145, 0, 240, -40, 115, -40, -115];
var CrashedTIE = function (config) {
    GameObj.call(this, config);
    this.rotation = -(config.rotation !== undefined ? config.rotation : 0);
    this.collisions = [
        new Collision({
            type: "ellipse",
            x: this.x,
            y: this.y,
            lowZ: this.lowZ - 2,
            highZ: this.highZ + 2,
            width: 200,
            height: 200
        }),
        new Collision({
            type: "poly",
            x: this.x - 170 * cos(this.rotation),
            y: this.y - 170 * sin(this.rotation),
            points: tieWingPoints,
            rotation: this.rotation,
            lowZ: this.lowZ - 2,
            highZ: this.highZ + 2
        }),
        new Collision({
            type: "rect",
            x: this.x + 125 * cos(this.rotation),
            y: this.y + 125 * sin(this.rotation),
            width: 50,
            height: 60,
            rotation: this.rotation,
            lowZ: this.lowZ - 2,
            highZ: this.highZ + 2
        })
    ];
    this.type = config.type;
    setHeavyProp(this, 14, 630);
};
CrashedTIE.prototype = Object.create(GameObj.prototype);
CrashedTIE.prototype.render = function () {
    pushMatrix();
    translate(this.x, this.y);
    rotate(this.rotation);
    //Broken Wing
    stroke(50, 20, 30);
    strokeWeight(6);
    fill(180, 180, 190);
    quad(180, 150, 200, -120, 360, -210, 320, 240);
    triangle(360, -210, 520, -120, 340, 45);
    line(340, 45, 200, -120);
    line(340, 45, 180, 150);
    fill(155);
    triangle(400, 180, 460, 90, 630, 30);
    triangle(550, -170, 620, -130, 620, -10);
    //Base
    strokeWeight(3);
    if (this.type === "sf") {
        stroke(50, 20, 30);
        fill(40, 40, 50);
        ellipse(0, 0, 200, 200);
        quad(-100, -30, -100, 30, -150, 25, -150, -25);
        fill(130, 0, 0);
        ellipse(75, 0, 50, 130);
        quad(100, -30, 100, 30, 150, 25, 150, -25);
        ellipse(340, 45, 70, 70);
    } else if (this.type === "ln") {
        stroke(20, 30, 50);
        fill(120, 120, 130);
        ellipse(0, 0, 200, 200);
        quad(-100, -30, -100, 30, -150, 25, -150, -25);
        quad(100, -30, 100, 30, 150, 25, 150, -25);
        ellipse(340, 45, 70, 70);
    }
    //Window
    stroke(120);
    strokeWeight(4.5);
    fill(60, 60, 70);
    ellipse(0, 75, 140, 45);
    line(0, 85, 0, 50);
    line(0, 85, 60, 63);
    line(0, 85, -60, 63);
    line(0, 85, 60, 90);
    line(0, 85, -60, 90);
    noStroke();
    fill(60, 60, 70, 150);
    quad(20, 120, 35, 105, 55, 140, 30, 160);
    triangle(-90, 120, -20, 130, -65, 135);
    triangle(-20, 160, -5, 150, 15, 185);
    //Wing
    stroke(50, 20, 30);
    strokeWeight(6);
    fill(180, 180, 190);
    beginShape();
    for (var i = 0; i < tieWingPoints.length; i += 2) {
        vertex(tieWingPoints[i] - 170, tieWingPoints[i + 1]);
    }
    endShape(CLOSE);
    line(-170, -240, -170, 240);
    line(-170, 0, -110, -145);
    line(-170, 0, -110, 145);
    strokeWeight(4);
    line(-170, 0, -210, -115);
    line(-170, 0, -210, 115);
    popMatrix();
};
var FireParticles = function (config) {
    GameObj.call(this, config);
    this.rotation = -config.rotation;
    this.particles = [];
};
FireParticles.prototype = Object.create(GameObj.prototype);
FireParticles.prototype.update = function () {
    this.spawnClock = (this.spawnClock || 0) + tickClock.scale;
    while (this.spawnClock >= 7) {
        this.spawnClock -= 7;
        this.particles.push(
        random() > 0.7 ? {
            type: "smoke",
            x: 0,
            y: 0,
            size: random(10, 30),
            fade: 200,
            vx: random(-1.5, 1.5),
            vy: random(-1.5, 1.5)
        } : {
            type: "ember",
            x: 0,
            y: 0,
            size: i % 23 === 0 ? random(25, 75) : random(4, 12),
            vx: random(1, 7),
            vy: random(-3, 3)
        }
        );
    }
    for (var particleIndex = this.particles.length - 1; particleIndex >= 0; particleIndex--) {
        var p = this.particles[particleIndex];
        p.x += p.vx * tickClock.scale;
        p.y += p.vy * tickClock.scale;
        if (p.type === "smoke") {
            p.vx *= pow(0.995, tickClock.scale);
            p.vy *= pow(0.995, tickClock.scale);
            p.size += tickClock.scale;
            p.fade -= tickClock.scale;
            if (p.fade < 20) {
                this.particles.splice(particleIndex, 1);
            }
        } else {
            p.vy += random(-0.1, 0.1) * tickClock.scale;
            p.size -= 0.1 * tickClock.scale;
            if (p.size < 0.3) {
                this.particles.splice(particleIndex, 1);
            }
        }
    }
};
FireParticles.prototype.render = function () {
    pushMatrix();
    translate(this.x, this.y);
    rotate(this.rotation);
    noStroke();
    for (var particleIndex = 0; particleIndex < this.particles.length; particleIndex++) {
        var p = this.particles[particleIndex];
        if (p.type === "smoke") {
            fill(100, p.fade);
        } else {
            fill(255, 0, 0);
        }
        ellipse(p.x, p.y, p.size, p.size);
    }
    popMatrix();
};
var centerRect = function (x, y, w, h) {
    var hw = w / 2;
    var hh = h / 2;
    quad(x - hw, y - hh, x + hw, y - hh, x + hw, y + hh, x - hw, y + hh);
};
var CrashedXwing = function (config) {
    GameObj.call(this, config);
    this.rotation = -(config.rotation !== undefined ? config.rotation : 0);
    this.type = config.type;
    this.color = config.color !== undefined ? config.color : color(180, 0, 0);
    this.collisions = [
        new Collision({
            type: "rect",
            height: 370,
            y: this.y - 65 * cos(this.rotation),
            width: 140,
            x: this.x - 65 * cos(this.rotation + 90),
            rotation: this.rotation,
            lowZ: this.lowZ,
            highZ: this.highZ + 1
        })
        //new Collision({type: "rect", height: 375, width: 50, rotation: this.rotation, lowZ: this.lowZ, highZ: this.highZ + 1, x: this.x - 100 * cos(this.rotation) - 138 * sin(this.rotation), y: this.y - 138 * sin(this.rotation + 90) - 100 * cos(this.rotation + 90)})
        //new Collision({type: "rect", height: 375, width: 50, rotation: this.rotation, lowZ: this.lowZ, highZ: this.highZ + 1, x: this.x - 100 * cos(this.rotation) - 138 * cos(this.rotation + 90), y: this.y - 100 * cos(this.rotation + 90) - 138 * sin(this.rotation + 90)})
        //new Collision({type: "rect", height: 160, width: 50, rotation: this.rotation, lowZ: this.lowZ, highZ: this.highZ + 1, y: this.y - 25 * cos(this.rotation) - 100 * sin(this.rotation), x: this.x - 100 * cos(this.rotation) - 25 * sin(this.rotation)})
    ];
    setHeavyProp(this, 16, 560);
};
CrashedXwing.prototype = Object.create(GameObj.prototype);
CrashedXwing.prototype.render = function () {
    pushMatrix();
    translate(this.x, this.y);
    rotate(this.rotation);
    //Body, Engines
    fill(200);
    stroke(0);
    strokeWeight(3);
    quad(-70, 0, 70, 0, 50, 220, -50, 220);
    centerRect(0, -125, 140, 250);
    centerRect(0, -105, 100, 240);
    line(50, -225, 70, -250);
    line(-50, -225, -70, -250);
    centerRect(-100, -250, 40, 150);
    arc(-100, -325, 40, 20, 180, 360);
    centerRect(100, -250, 40, 150);
    arc(100, -325, 40, 20, 180, 360);
    fill(175);
    centerRect(-100, -75, 60, 240);
    arc(-100, -195, 60, 30, 180, 360);
    centerRect(100, -75, 60, 240);
    arc(100, -195, 60, 30, 180, 360);
    fill(60);
    ellipse(100, 50, 60, 30);
    ellipse(-100, 50, 60, 30);
    //y 50 through -325  height 375, y -138
    //Wings
    fill(195);
    quad(-130, -190, -130, 50, -230, 35, -230, -175);
    fill(210);
    quad(130, -190, 130, 50, 380, 20, 380, -160);
    triangle(-130, -190, -150, -70, -130, -60);
    triangle(-130, -60, -140, -50, -130, -40);
    triangle(-130, -40, -160, 10, -130, 50);
    quad(-300, 420, -440, 400, -430, 120, -220, 140);
    triangle(-430, 120, -432, 90, -330, 130);
    triangle(-330, 130, -325, 120, -305, 132);
    triangle(-305, 132, -285, 110, -240, 137);
    triangle(-240, 137, -220, 110, -220, 140);
    fill(230);
    centerRect(400, -60, 40, 200);
    arc(400, -160, 40, 20, 180, 360);
    quad(30, 520, 60, 540, 25, 560, 20, 530);
    fill(210);
    ellipse(400, 40, 40, 30);
    stroke(220);
    strokeWeight(8);
    line(400, 40, 400, 240);
    line(45, 530, 200, 350);
    fill(255, 0);
    arc(400, 220, 50, 30, 180, 360);
    arc(-70, 375, 40, 60, 130, 280);
    //Windshield
    stroke(0);
    strokeWeight(3);
    fill(140);
    quad(-55, 50, 55, 50, 50, 10, -50, 10);
    fill(70, 70, 90, 200);
    stroke(140);
    strokeWeight(5);
    quad(-55, 50, 55, 50, 40, 220, -40, 220);
    //Sand
    fill(160, 140, 70);
    noStroke();
    ellipse(-50, 240, 90, 50);
    ellipse(40, 230, 130, 40);
    ellipse(10, 250, 100, 50);
    ellipse(-230, -75, 50, 230);
    ellipse(-260, -120, 70, 180);
    ellipse(-250, -30, 40, 200);
    ellipse(10, 540, 40, 90);
    ellipse(0, 540, 30, 60);
    //Wing Paint
    fill(this.color);
    quad(380, 20, 320, 25, 320, -80, 380, -80);
    triangle(380, -80, 240, -80, 240, -100);
    stroke(this.color);
    strokeWeight(8);
    line(240, -100, 240, -175);
    line(270, -95, 270, -170);
    quad(-305, 420, -370, 410, -365, 360, -288, 360);
    triangle(-370, 410, -360, 280, -375, 280);
    line(-375, 280, -430, 275);
    line(-375, 310, -430, 305);
    popMatrix();
};
var junkTypes = [
    {
        mass: 1.5,
        parts: [["ellipse", -10, -25, 40, 40], ["ellipse", -30, 15, 35, 35], ["rect", 20, 20, 50, 50]]
    },
    {
        mass: 1.5,
        parts: [["ellipse", 0, 0, 55, 55], ["ellipse", 50, 0, 40, 40]]
    },
    {
        mass: 3,
        parts: [["rect", 0, 0, 170, 90], ["rect", 30, -60, 80, 50], ["rect", -82.5, -55, dist(-180, 60, 15, -170), 20, atan2(-230, 195)], ["rect", -50, -100, dist(-150, -85, 50, -115), 20, atan2(-30, 200)]]
    },
    {
        mass: 2.5,
        parts: [["ellipse", 0, 0, 70, 150], ["ellipse", -80, 30, 70, 70]]
    },
    {
        mass: 4,
        parts: [["rect", 0, 0, 180, 180]]
    }
];
var JunkPile = function (config) {
    GameObj.call(this, config);
    this.rotation = config.rotation !== undefined ? config.rotation : random(0, 360);
    this.type = config.type || round(random(1, 5));
    var junk = junkTypes[this.type - 1];
    var c = cos(this.rotation);
    var s = sin(this.rotation);
    for (var i = 0; i < junk.parts.length; i++) {
        var part = junk.parts[i];
        var x = part[1];
        var y = part[2];
        this.collisions.push(new Collision({
            type: part[0],
            x: this.x + x * c - y * s,
            y: this.y + x * s + y * c,
            width: part[3],
            height: part[4],
            rotation: this.rotation + (part[5] || 0),
            lowZ: this.lowZ,
            highZ: this.lowZ + 0.9
        }));
    }
    setHeavyProp(this, junk.mass);
};
JunkPile.prototype = Object.create(GameObj.prototype);
JunkPile.prototype.render = function () {
    pushMatrix();
    translate(this.x, this.y);
    rotate(this.rotation);
    switch (this.type) {
        case 1: noStroke();
        fill(180);
        centerRect(20, 20, 50, 50);
        stroke(0);
        strokeWeight(2);
        fill(200, 100, 50);
        ellipse(-10, -25, 40, 40);
        ellipse(-30, 15, 35, 35);
        break;
        case 2: stroke(0);
        strokeWeight(2);
        fill(200, 100, 50);
        ellipse(0, 0, 55, 55);
        ellipse(50, 0, 40, 40);
        break;
        case 3: stroke(200);
        strokeWeight(20);
        line(-180, 60, 15, -170);
        line(-150, -85, 50, -115);
        fill(150);
        noStroke();
        centerRect(0, 0, 170, 90);
        centerRect(30, -60, 80, 50);
        break;
        case 4: stroke(200, 100, 50);
        strokeWeight(70);
        line(0, -40, 0, 40);
        fill(200, 100, 50);
        stroke(0);
        strokeWeight(2);
        ellipse(-80, 30, 70, 70);
        fill(225, 225, 50);
        textSize(50);
        textAlign(CENTER, CENTER);
        text("☣\n☠", 0, 0);
        textSize(80);
        text("☢", -80, 30);
        break;
        case 5: noStroke();
        fill(170);
        centerRect(0, 0, 180, 180);
        fill(200, 90, 50);
        quad(-50, -30, 30, 10, 40, 40, -40, 10);
        quad(80, -80, 60, 20, 0, 30, 20, -40);
        fill(120);
        ellipse(45, 45, 70, 70);
        centerRect(-30, -50, 100, 60);
        stroke(120, 25, 0);
        strokeWeight(12);
        line(-80, 80, 30, -20);
        line(-60, 70, 50, -10);
        break;
    }
    popMatrix();
};
var Box = function (config) {
    GameObj.call(this, config);
    this.isDestructibleCrate = true;
    this.forceMass = config.forceMass || 1;
    this.health = config.health !== undefined ? config.health : 80;
    this.maxHealth = this.health;
    this.destroyed = false;
    this.pos = new PVector(this.x, this.y, this.lowZ);
    this.size = config.size !== undefined ? config.size : 50;
    this.rotation = -(config.rotation !== undefined ? config.rotation : 0);
    this.plane = config.plane !== undefined ? config.plane : false;
    this.collisions = [
        new Collision({
            type: "rect",
            x: this.x,
            y: this.y,
            width: this.size,
            height: this.size,
            rotation: this.rotation,
            lowZ: this.lowZ,
            highZ: this.highZ
        }),
        new Collision({
            type: "rect",
            x: this.x,
            y: this.y,
            width: this.size,
            height: this.size,
            rotation: this.rotation,
            plane: true,
            blocksCeiling: false,
            exactSurface: true,
            zValue: this.highZ > this.lowZ ? this.highZ : floor(this.lowZ) + 1
        })
    ];
    this.collisions[0].crate = this;
    //This project was originally created by @LemoncelloJr and @KingCobraVenom
};
Box.prototype = Object.create(GameObj.prototype);
Box.prototype.render = function () {
    if (this.destroyed) {
        drawCrateWreck(this);
        return;
    }
    pushStyle();
    rectMode(CENTER);
    fill(97, 76, 23);
    stroke(77, 60, 17);
    strokeWeight(7);
    pushMatrix();
    translate(this.x, this.y);
    rotate(this.rotation);
    rect(0, 0, this.size, this.size);
    line(-this.size / 2, -this.size / 2, this.size / 2, this.size / 2);
    line(-this.size / 2, this.size / 2, this.size / 2, -this.size / 2);
    popMatrix();
    popStyle();
};

//Destructible Crates
//Destruction disables shared collision objects immediately, including bucket queries.
var destroyCrate = function (crate) {
    if (crate.destroyed) {
        return;
    }
    crate.debris = [];
    var spread = (crate.size || crate.width || 50) * 0.65;
    for (var fragment = 0; fragment < floor(random(6, 12)); fragment++) {
        var angle = random(360);
        var radius = random(5, spread);
        crate.debris.push({
            x: cos(angle) * radius,
            y: sin(angle) * radius,
            w: random(7, 22),
            h: random(5, 16),
            rotation: random(360),
            shade: random(55, 105),
            triangle: random(1) < 0.45
        });
    }
    crate.destroyed = true;
    crate.health = 0;
    crate.forceMotion = null;
    if (forceGrip && forceGrip.target === crate) {
        forceGrip = null;
        forceGripReadyAt = tickClock.gameMs + forceGripSettings.cooldownMs;
    }
    for (var i = 0; i < crate.collisions.length; i++) {
        crate.collisions[i].disabled = true;
    }
    if (currentMap) {
        currentMap.minimap = null;
        currentMap.crateNavVersion = (currentMap.crateNavVersion || 0) + 1;
    }
};
var damageCrate = function (crate, amount) {
    if (!crate || crate.destroyed || !(amount > 0)) {
        return false;
    }
    crate.health -= amount;
    if (crate.health <= 0) {
        destroyCrate(crate);
        return true;
    }
    return false;
};
var damageCrateImpact = function (crate, speed) {
    return crate && crate.isDestructibleCrate === true && speed > 18 && damageCrate(crate, speed > 45 ? crate.health : (speed - 18) * 3);
};
var blastDamageCrates = function (explosion) {
    var objects = (currentMap.objectsTemp || []).concat(currentMap.placedCrates || []);
    var seen = [];
    var radius = explosion.explosionMax * 0.5;
    for (var i = 0; i < objects.length; i++) {
        var crate = objects[i];
        if (!crate || !crate.isDestructibleCrate || crate.destroyed || seen.indexOf(crate) >= 0) {
            continue;
        }
        seen.push(crate);
        if (abs(explosion.pos.z - crate.pos.z) > 1.6) {
            continue;
        }
        var halfW = (crate.width || crate.size) / 2;
        var halfH = (crate.height || crate.size) / 2;
        var dx = max(0, abs(explosion.pos.x - crate.x) - halfW);
        var dy = max(0, abs(explosion.pos.y - crate.y) - halfH);
        var d = sqrt(dx * dx + dy * dy);
        if (d >= radius) {
            continue;
        }
        applyDamage(crate, explosion.explosionDamageMax * (1 - d / radius), explosion.owner);
        if (crate.health <= 0) {
            destroyCrate(crate);
        }
    }
};
//Snapshot intact cover before the blast destroys it.
var getBlastCrates = function () {
    var all = (currentMap.objectsTemp || []).concat(currentMap.placedCrates || []);
    var result = [];
    for (var i = 0; i < all.length; i++) {
        var c = all[i];
        if (c && c.isDestructibleCrate && !c.destroyed && result.indexOf(c) < 0) {
            result.push(c);
        }
    }
    return result;
};
var crateBlastCover = function (origin, target, crates) {
    for (var i = 0; i < crates.length; i++) {
        var c = crates[i];
        var angle = c.rotation || 0;
        var dx = origin.x - c.x;
        var dy = origin.y - c.y;
        var tx = target.x - c.x;
        var ty = target.y - c.y;
        var a = [dx * cos(angle) + dy * sin(angle), -dx * sin(angle) + dy * cos(angle), origin.z];
        var b = [tx * cos(angle) + ty * sin(angle), -tx * sin(angle) + ty * cos(angle), target.z];
        var hw = (c.width || c.size) / 2;
        var hh = (c.height || c.size) / 2;
        var lo = [-hw, -hh, c.pos.z];
        var hi = [hw, hh, floor(c.highZ) + 1 + c.pos.z - c.lowZ];
        var enter = 0;
        var leave = 1;
        var hit = true;
        var startsInside = true;
        for (var axis = 0; axis < 3; axis++) {
            if (a[axis] < lo[axis] || a[axis] > hi[axis]) {
                startsInside = false;
            }
            var delta = b[axis] - a[axis];
            if (abs(delta) < 0.00001) {
                if (a[axis] < lo[axis] || a[axis] > hi[axis]) {
                    hit = false;
                }
            } else {
                var t1 = (lo[axis] - a[axis]) / delta;
                var t2 = (hi[axis] - a[axis]) / delta;
                enter = max(enter, min(t1, t2));
                leave = min(leave, max(t1, t2));
            }
        }
        if (hit && !startsInside && enter < leave && enter > 0 && leave < 1) {
            return 0.1;
        }
    }
    return 1;
};
drawCrateWreck = function (crate) {
    pushStyle();
    rectMode(CENTER);
    noStroke();
    var debris = crate.debris || [];
    for (var i = 0; i < debris.length; i++) {
        var bit = debris[i];
        pushMatrix();
        translate(crate.x + bit.x, crate.y + bit.y);
        rotate(bit.rotation);
        fill(bit.shade, bit.shade, bit.shade * 0.85);
        if (bit.triangle) {
            triangle(-bit.w / 2, bit.h / 2, 0, -bit.h / 2, bit.w / 2, bit.h / 2);
        } else {
            rect(0, 0, bit.w, bit.h, 2);
        }
        popMatrix();
    }
    popStyle();
};
var moveForceProp = function (crate, x, y, rotation) {
    var turn = angleDifference(rotation, crate.rotation);
    var c = cos(turn);
    var s = sin(turn);
    for (var i = 0; i < crate.collisions.length; i++) {
        var col = crate.collisions[i];
        var dx = col.x - crate.x;
        var dy = col.y - crate.y;
        col.rotation += turn;
        col.move(x + dx * c - dy * s - col.x, y + dx * s + dy * c - col.y);
    }
    crate.x = crate.pos.x = x;
    crate.y = crate.pos.y = y;
    crate.rotation = rotation;
};
var linkForceCol = function (map, col, oldLo, oldHi, remove) {
    var lo = floor(col.lowZ);
    var hi = remove ? lo - 1 : floor(col.highZ);
    for (var layer = oldLo; layer <= oldHi; layer++) {
        if (layer < lo || layer > hi) {
            var all = map.collisionLayers[layer] || [];
            var live = map.liveCollisionLayers[layer] || [];
            var index = all.indexOf(col);
            if (index >= 0) {
                all.splice(index, 1);
            }
            index = live.indexOf(col);
            if (index >= 0) {
                live.splice(index, 1);
            }
        }
    }
    for (var layer = lo; layer <= hi; layer++) {
        if (layer < oldLo || layer > oldHi) {
            (map.collisionLayers[layer] || (map.collisionLayers[layer] = [])).push(col);
            (map.liveCollisionLayers[layer] || (map.liveCollisionLayers[layer] = [])).push(col);
        }
    }
};
var setForceHeight = function (map, prop, z) {
    var dz = z - prop.pos.z;
    if (dz === 0) {
        return;
    }
    var before = floor(prop.pos.z);
    var after = floor(z);
    if (before !== after) {
        var index = (map.objects[before] || []).indexOf(prop);
        if (index >= 0) {
            map.objects[before].splice(index, 1);
            (map.objects[after] || (map.objects[after] = [])).push(prop);
        }
    }
    for (var i = 0; i < prop.collisions.length; i++) {
        var col = prop.collisions[i];
        var lo = floor(col.lowZ);
        var hi = floor(col.highZ);
        col.priorTop = col.plane ? col.surfaceZ : col.bodyTop;
        col.zMoveTick = tickClock.tick;
        if (col.forceLowZ === undefined) {
            col.forceLowZ = col.lowZ - prop.pos.z;
            col.forceHighZ = col.highZ - prop.pos.z;
        }
        col.lowZ = z + col.forceLowZ;
        col.highZ = z + col.forceHighZ;
        col.refreshCache();
        linkForceCol(map, col, lo, hi);
    }
    prop.pos.z = z;
};
var voidProp = function (map, prop) {
    var objects = map.objects[floor(prop.pos.z)] || [];
    var index = objects.indexOf(prop);
    if (index >= 0) {
        objects.splice(index, 1);
    }
    for (var i = 0; i < prop.collisions.length; i++) {
        var col = prop.collisions[i];
        linkForceCol(map, col, floor(col.lowZ), floor(col.highZ), true);
        col.disabled = true;
    }
    prop.voided = true;
    prop.destroyed = true;
    prop.forceMotion = null;
    if (forceGrip && forceGrip.map === map && forceGrip.target === prop) {
        forceGrip = null;
        forceGripReadyAt = tickClock.gameMs + forceGripSettings.cooldownMs;
    }
    map.minimap = null;
    map.crateNavVersion = (map.crateNavVersion || 0) + 1;
};
resetCrates = function (map) {
    map.crateNavVersion = (map.crateNavVersion || 0) + 1;
    map.destroyerGrid = null;
    for (var i = 0; i < (map.objectsTemp || []).length; i++) {
        var crate = map.objectsTemp[i];
        if (!crate.forceMass) {
            continue;
        }
        if (crate.voided) {
            var layer = floor(crate.pos.z);
            (map.objects[layer] || (map.objects[layer] = [])).push(crate);
            for (var j = 0; j < crate.collisions.length; j++) {
                linkForceCol(map, crate.collisions[j], 1, 0);
            }
            crate.voided = false;
            crate.destroyed = false;
        }
        if (crate.isDestructibleCrate) {
            crate.health = crate.maxHealth;
            crate.destroyed = false;
            crate.debris = null;
        }
        crate.forceMotion = null;
        setForceHeight(map, crate, crate.lowZ);
        if (crate.forceHome) {
            moveForceProp(crate, crate.forceHome.x, crate.forceHome.y, crate.forceHome.rotation);
        }
        for (var j = 0; j < crate.collisions.length; j++) {
            crate.collisions[j].disabled = false;
        }
    }
};
//Test both oriented rectangles on their four separating axes.
var crateRectsOverlap = function (a, b, contact) {
    var ar = a.rotation || 0;
    var br = b.rotation || 0;
    var axes = [ar, ar + 90, br, br + 90];
    var bestDepth;
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    for (var i = 0; i < axes.length; i++) {
        var angle = axes[i];
        var nx = cos(angle);
        var ny = sin(angle);
        var separation = dx * nx + dy * ny;
        var extentA = (abs(cos(ar - angle)) * a.width) / 2 + (abs(sin(ar - angle)) * a.height) / 2;
        var extentB = (abs(cos(br - angle)) * b.width) / 2 + (abs(sin(br - angle)) * b.height) / 2;
        var depth = extentA + extentB - abs(separation);
        if (depth <= 0) {
            return false;
        }
        if (contact && (i === 0 || depth < bestDepth)) {
            bestDepth = depth;
            contact.nx = separation < 0 ? -nx : nx;
            contact.ny = separation < 0 ? -ny : ny;
        }
    }
    if (contact) {
        contact.depth = bestDepth;
        var c = cos(ar);
        var s = sin(ar);
        var faceX = -contact.nx * c - contact.ny * s;
        var faceY = contact.nx * s - contact.ny * c;
        var otherX = -dx * c - dy * s;
        var otherY = dx * s - dy * c;
        var otherW = (abs(cos(br - ar)) * b.width + abs(sin(br - ar)) * b.height) / 2;
        var otherH = (abs(sin(br - ar)) * b.width + abs(cos(br - ar)) * b.height) / 2;
        var localX = abs(faceX) > 0.0001 ? (faceX > 0 ? 1 : -1) * a.width / 2 : (max(-a.width / 2, otherX - otherW) + min(a.width / 2, otherX + otherW)) / 2;
        var localY = abs(faceY) > 0.0001 ? (faceY > 0 ? 1 : -1) * a.height / 2 : (max(-a.height / 2, otherY - otherH) + min(a.height / 2, otherY + otherH)) / 2;
        contact.x = localX * c - localY * s;
        contact.y = localX * s + localY * c;
    }
    return true;
};
var collisionVerts = function (col) {
    if (col.type === "poly") {
        return col.vertices;
    }
    if (col.type !== "rect") {
        return col.p1.concat(col.p2, col.p3, col.p4 || []);
    }
    var ax = col._halfW * col._cos;
    var ay = col._halfW * col._sin;
    var bx = -col._halfH * col._sin;
    var by = col._halfH * col._cos;
    return [col.x - ax - bx, col.y - ay - by, col.x + ax - bx, col.y + ay - by, col.x + ax + bx, col.y + ay + by, col.x - ax + bx, col.y - ay + by];
};
var polyOverlap = function (a, b, contact) {
    if (a._maxX <= b._minX || b._maxX <= a._minX || a._maxY <= b._minY || b._maxY <= a._minY) {
        return false;
    }
    var pointsA = collisionVerts(a);
    var pointsB = collisionVerts(b);
    var shapes = [pointsA, pointsB];
    var depth = Infinity;
    for (var shape = 0; shape < shapes.length; shape++) {
        var points = shapes[shape];
        for (var i = 0; i < points.length; i += 2) {
            var j = (i + 2) % points.length;
            var nx = points[j + 1] - points[i + 1];
            var ny = points[i] - points[j];
            var length = sqrt(nx * nx + ny * ny);
            if (length === 0) {
                continue;
            }
            nx /= length;
            ny /= length;
            var minA = Infinity;
            var maxA = -Infinity;
            var minB = Infinity;
            var maxB = -Infinity;
            for (var k = 0; k < pointsA.length; k += 2) {
                var projectionA = pointsA[k] * nx + pointsA[k + 1] * ny;
                minA = min(minA, projectionA);
                maxA = max(maxA, projectionA);
            }
            for (var k = 0; k < pointsB.length; k += 2) {
                var projectionB = pointsB[k] * nx + pointsB[k + 1] * ny;
                minB = min(minB, projectionB);
                maxB = max(maxB, projectionB);
            }
            var forward = maxB - minA;
            var backward = maxA - minB;
            var overlap = min(forward, backward);
            if (overlap <= 0) {
                return false;
            }
            if (contact && overlap < depth) {
                depth = overlap;
                var direction = forward <= backward ? 1 : -1;
                contact.nx = nx * direction;
                contact.ny = ny * direction;
            }
        }
    }
    if (contact) {
        var face = Infinity;
        var low = Infinity;
        var high = -Infinity;
        for (var i = 0; i < pointsA.length; i += 2) {
            var x = pointsA[i] - a.x;
            var y = pointsA[i + 1] - a.y;
            var normal = x * contact.nx + y * contact.ny;
            var tangent = y * contact.nx - x * contact.ny;
            if (normal < face - 0.0001) {
                face = normal;
                low = high = tangent;
            } else if (abs(normal - face) < 0.0001) {
                low = min(low, tangent);
                high = max(high, tangent);
            }
        }
        var centerX = (b._minX + b._maxX) / 2 - a.x;
        var centerY = (b._minY + b._maxY) / 2 - a.y;
        var along = constrain(centerY * contact.nx - centerX * contact.ny, low, high);
        contact.x = face * contact.nx - along * contact.ny;
        contact.y = face * contact.ny + along * contact.nx;
        contact.depth = depth;
    }
    return true;
};
var polyEllipseOverlap = function (poly, oval, contact) {
    if (poly._maxX <= oval._minX || oval._maxX <= poly._minX || poly._maxY <= oval._minY || oval._maxY <= poly._minY) {
        return false;
    }
    var points = [];
    var c = oval._ellipseCos;
    var s = oval._ellipseSin;
    for (var i = 0; i < poly.vertices.length; i += 2) {
        var x = poly.vertices[i] - oval.x;
        var y = poly.vertices[i + 1] - oval.y;
        points.push((x * c + y * s) / oval._halfW, (y * c - x * s) / oval._halfH);
    }
    var hit = circlePolyContact(points, poly.winding, 0, 0, 1, !!contact);
    if (hit && contact) {
        var x = hit.nx * oval._halfW;
        var y = hit.ny * oval._halfH;
        var dx = y * s - x * c;
        var dy = -x * s - y * c;
        var length = sqrt(dx * dx + dy * dy);
        contact.nx = dx / length;
        contact.ny = dy / length;
        contact.depth = hit.depth * length;
        contact.x = oval.x + dx - poly.x;
        contact.y = oval.y + dy - poly.y;
    }
    return !!hit;
};
var crateDoorOverlap = function (a, b) {
    return !a.disabled && !b.disabled && a.width > 0 && b.width > 0 && a.highZ > b.lowZ && b.highZ > a.lowZ && crateRectsOverlap(a, b);
};
var findCrateContact = function (crate, box, layer, radius, contact) {
    contact.crate = null;
    for (var level = layer - 1; level <= floor(box.bodyTop); level++) {
        var cols = currentMap.getNearbyCollisions(level, box.x, box.y, radius) || [];
        for (var i = 0; i < cols.length; i++) {
            var col = cols[i];
            if (col.disabled || col.plane || box._maxX < col._minX || col._maxX < box._minX || box._maxY < col._minY || col._maxY < box._minY || crate.collisions.indexOf(col) >= 0 || box.bodyBase >= col.bodyTop - 0.00001 || box.bodyTop <= col.bodyBase + 0.00001) {
                continue;
            }
            if (col.type === "poly" || (box.type === "poly" && col.type !== "ellipse")) {
                if (polyOverlap(box, col, contact)) {
                    contact.crate = col.crate;
                    return true;
                }
            } else if (col.type === "rect") {
                if (crateRectsOverlap(box, col, contact)) {
                    contact.crate = col.crate;
                    return true;
                }
            } else if (col.type === "ellipse" && col.width === col.height) {
                var next = {
                    x: col.x,
                    y: col.y,
                    z: box.bodyBase
                };
                if (box.entityCollide(next, null, col.width / 2, 0) & 2) {
                    var dx = col.x - next.x;
                    var dy = col.y - next.y;
                    var depth = sqrt(dx * dx + dy * dy);
                    if (depth <= 0.0001) {
                        continue;
                    }
                    contact.nx = dx / depth;
                    contact.ny = dy / depth;
                    contact.depth = depth;
                    contact.x = col.x - box.x + contact.nx * (col.width / 2 - depth);
                    contact.y = col.y - box.y + contact.ny * (col.width / 2 - depth);
                    return true;
                }
            } else if (box.type === "poly") {
                if (polyEllipseOverlap(box, col, contact)) {
                    contact.crate = col.crate;
                    return true;
                }
            } else {
                for (var sideX = -1; sideX <= 1; sideX++) {
                    for (var sideY = -1; sideY <= 1; sideY++) {
                        var sx = sideX * box.width / 2;
                        var sy = sideY * box.height / 2;
                        var x = sx * cos(box.rotation) - sy * sin(box.rotation);
                        var y = sx * sin(box.rotation) + sy * cos(box.rotation);
                        if (col.checkCollision(box.x + x, box.y + y, col._solidMinZ)) {
                            var dx = box.x + x - (col._minX + col._maxX) / 2;
                            var dy = box.y + y - (col._minY + col._maxY) / 2;
                            if (col.type === "ellipse") {
                                var c = cos(col.rotation);
                                var s = sin(col.rotation);
                                var gx = (dx * c + dy * s) / (col.width * col.width);
                                var gy = (-dx * s + dy * c) / (col.height * col.height);
                                dx = gx * c - gy * s;
                                dy = gx * s + gy * c;
                            }
                            var length = sqrt(dx * dx + dy * dy);
                            contact.nx = length > 0.000001 ? dx / length : 1;
                            contact.ny = length > 0.000001 ? dy / length : 0;
                            contact.depth = 3;
                            contact.x = x;
                            contact.y = y;
                            return true;
                        }
                    }
                }
            }
        }
    }
    return false;
};
var applyCrateContact = function (motion, contact, inertia, bounce) {
    var arm = contact.x * contact.ny - contact.y * contact.nx;
    var spinUnit = sin(1);
    var closing = motion.x * contact.nx + motion.y * contact.ny + motion.turn * spinUnit * arm;
    if (closing >= 0) {
        return 0;
    }
    var impulse = -closing * (1 + bounce) / (1 + arm * arm / inertia);
    motion.x += contact.nx * impulse;
    motion.y += contact.ny * impulse;
    motion.turn += arm * impulse / (inertia * spinUnit);
    return impulse / (1 + bounce);
};
var stageCratePush = function (crate, box, radius, actor, pushes, contact) {
    var pos = actor ? actor.pos : playerPos;
    var size = actor ? actor.colSize : hitboxSize;
    var top = box.zMoveTick === tickClock.tick ? min(box.bodyTop, box.priorTop) : box.bodyTop;
    if (pos.z >= top - 0.00001 || pos.z + 0.75 <= box.bodyBase || abs(pos.x - box.x) > radius + size || abs(pos.y - box.y) > radius + size) {
        return true;
    }
    var next = {
        x: pos.x,
        y: pos.y,
        z: max(pos.z, box.bodyBase)
    };
    if (!(box.entityCollide(next, null, size, 0) & 2)) {
        return true;
    }
    contact.caster = !actor && gripProtectsPlayer(crate);
    if (contact.caster || solidAt(next.x, next.y, pos.z, size, crate.collisions)) {
        var dx = pos.x - next.x;
        var dy = pos.y - next.y;
        var depth = sqrt(dx * dx + dy * dy);
        if (depth < 0.0001) {
            return true;
        }
        contact.nx = dx / depth;
        contact.ny = dy / depth;
        contact.x = pos.x - box.x + contact.nx * size;
        contact.y = pos.y - box.y + contact.ny * size;
        contact.actor = actor;
        return false;
    }
    pushes.push({
        actor: actor,
        pos: pos,
        vel: actor ? actor.vel : playerVel,
        next: next
    });
    return true;
};
var sweepZ = function (x, y, radius, from, to, clearance, part, ignored) {
    if (to === from) {
        return to;
    }
    var rising = to > from;
    var first = max(floor(min(from, to)) - 1, min(currentMap.bottomZ, currentMap.killZ) - 2);
    var last = min(floor(max(from, to) + (rising ? clearance : 0)), currentMap.topZ + 2);
    var stop = to;
    for (var layer = first; layer <= last; layer++) {
        var cols = currentMap.getNearbyCollisions(layer, x, y, radius) || [];
        for (var i = 0; i < cols.length; i++) {
            var col = cols[i];
            if ((ignored && ignored.indexOf(col) >= 0) || !col.inBounds(x, y, radius)) {
                continue;
            }
            var z = col.crossZ(from, to, clearance);
            if (z === null || (rising ? z >= stop : z <= stop)) {
                continue;
            }
            var touches;
            if (part && (part.type === "poly" || col.type === "poly") && part.type !== "ellipse" && col.type !== "ellipse") {
                touches = polyOverlap(part, col);
            } else if (part && part.type === "poly") {
                touches = polyEllipseOverlap(part, col);
            } else if (part && part.type === "ellipse" && col.type === "poly") {
                touches = polyEllipseOverlap(col, part);
            } else if (part && col.type === "rect" && part.type !== "poly") {
                touches = crateRectsOverlap(part, col);
            } else if (part && col.type === "ellipse" && col.width === col.height) {
                touches = part.overlapsCircle(col.x, col.y, col.width / 2);
            } else {
                touches = col.overlapsCircle(x, y, part ? min(part.width, part.height) / 2 : radius);
            }
            if (touches) {
                stop = z;
            }
        }
    }
    return stop;
};
var moveEntityZ = function (pos, vel, radius, bounce, step) {
    var next = pos.z + vel.z * step;
    var stop = sweepZ(pos.x, pos.y, radius, pos.z, next, 0.051);
    var grounded = stop !== next && vel.z < 0;
    if (stop > pos.z && grounded) {
        stop = sweepZ(pos.x, pos.y, radius, pos.z, stop, 0.051);
    }
    pos.z = stop;
    if (stop !== next) {
        vel.z = abs(vel.z * bounce) > 0.01 ? -vel.z * bounce : 0;
    }
    return grounded;
};
var forceDeck = function (prop, z) {
    var from = prop.pos.z;
    var stop = z;
    for (var i = 0; i < prop.collisions.length; i++) {
        var part = prop.collisions[i];
        if (!part.plane) {
            var radius = dist(0, 0, part.width, part.height) / 2;
            var clearance = max(0.12, part.bodyTop - from);
            var contact = sweepZ(part.x, part.y, radius, from, z, clearance, part, prop.collisions);
            stop = z > from ? min(stop, contact) : max(stop, contact);
        }
    }
    return stop;
};
var placeForceBoxes = function (prop, boxes, x, y, rotation) {
    var turn = angleDifference(rotation, prop.rotation);
    var c = cos(turn);
    var s = sin(turn);
    for (var i = 0; i < boxes.length; i++) {
        var part = prop.collisions[i];
        var dx = prop.forceRadius ? part.x - prop.x : 0;
        var dy = prop.forceRadius ? part.y - prop.y : 0;
        var box = boxes[i];
        box.rotation = prop.forceRadius ? part.rotation + turn : rotation;
        box.move(x + dx * c - dy * s - box.x, y + dx * s + dy * c - box.y);
    }
};
var findPropContact = function (prop, boxes, layer, contact, x, y) {
    for (var i = 0; i < boxes.length; i++) {
        var box = boxes[i];
        if (findCrateContact(prop, box, layer, box._forceRadius, contact)) {
            contact.x += box.x - x;
            contact.y += box.y - y;
            return true;
        }
    }
    return false;
};
var stagePropPush = function (prop, boxes, actor, pushes, contact, x, y) {
    var count = pushes.length;
    for (var i = 0; i < boxes.length; i++) {
        var box = boxes[i];
        if (!stageCratePush(prop, box, box._forceRadius, actor, pushes, contact)) {
            contact.x += box.x - x;
            contact.y += box.y - y;
            return false;
        }
        if (pushes.length > count) {
            break;
        }
    }
    return true;
};
var propHeadStop = function (prop, actor, z, speed) {
    var pos = actor ? actor.pos : playerPos;
    var size = actor ? actor.colSize : hitboxSize;
    var head = pos.z + 0.75;
    if ((actor ? actor.health <= 0 : playerHealth <= 0 || deathScreenActive) || prop.pos.z < head - 0.01 || z >= head) {
        return z;
    }
    for (var i = 0; i < prop.collisions.length; i++) {
        var part = prop.collisions[i];
        if (part.plane || !part.inBounds(pos.x, pos.y, size)) {
            continue;
        }
        if (part.overlapsCircle(pos.x, pos.y, size)) {
            if (actor) {
                var pressure = prop.pos.z <= head + 0.01 && aiHasSupport(pos.x, pos.y, pos.z) ? 11 : 0;
                crushActor(actor, max(speed, pressure), prop.forceMass, true);
            }
            return min(prop.pos.z, head);
        }
    }
    return z;
};
var stopPropDescent = function (prop, z, speed) {
    z = propHeadStop(prop, null, z, speed);
    for (var layer = floor(prop.pos.z - 0.74); layer >= floor(z - 0.75); layer--) {
        var actors = currentMap.entities[layer] || [];
        for (var i = 0; i < actors.length; i++) {
            if (actors[i] instanceof AIPlayer) {
                z = propHeadStop(prop, actors[i], z, speed);
            }
        }
    }
    return z;
};
var updateForceProp = function (crate) {
    var motion = crate.forceMotion;
    var held = forceGrip && forceGrip.target === crate && forceGrip.map === currentMap;
    var tick = tickClock.scale;
    var speed = sqrt(motion.x * motion.x + motion.y * motion.y);
    var thrown = !held && motion.hits && (speed > 0.8 || abs(motion.turn) > 0.5);
    var oldZ = crate.pos.z;
    var nextZ;
    if (held) {
        var goalZ = forceGrip.height;
        nextZ = lerp(oldZ, goalZ, 1 - pow(0.76, tick * forceGripSettings.strength * forceProfile(skin).strength / sqrt(crate.forceMass)));
        if (abs(nextZ - goalZ) < 0.015) {
            nextZ = goalZ;
        }
    } else {
        var gravityStep = 0.005 * tick;
        motion.z = (motion.z || 0) - gravityStep;
        nextZ = max(currentMap.killZ - 0.01, oldZ + (motion.z + gravityStep * 0.5) * tick);
    }
    var deckZ = forceDeck(crate, nextZ);
    var z = deckZ;
    if (deckZ < oldZ) {
        var fallSpeed = held ? (oldZ - deckZ) / tick : -motion.z;
        z = stopPropDescent(crate, deckZ, fallSpeed * 34);
    }
    var landed = !held && motion.z <= 0 && z === deckZ && z > nextZ;
    if (held) {
        motion.z = (z - oldZ) / tick;
    } else if (z !== nextZ || landed) {
        motion.z = 0;
    }
    setForceHeight(currentMap, crate, z);
    if (z < currentMap.killZ) {
        voidProp(currentMap, crate);
        return true;
    }
    if (held && crate.forceMass >= 5 && z > oldZ) {
        var strain = min(1, (z - oldZ) / (0.018 * tick));
        screenShake = max(screenShake, min(2.6, 1 + crate.forceMass * 0.08) * strain);
    }
    if (floor(z) !== floor(oldZ)) {
        motion.moved = true;
    }
    if (!held && !thrown) {
        if (landed && z === oldZ) {
            crate.forceMotion = null;
            if (motion.moved) {
                currentMap.minimap = null;
                currentMap.crateNavVersion = (currentMap.crateNavVersion || 0) + 1;
            }
        }
        return;
    }
    protectForcePath(crate, motion, tick);
    speed = sqrt(motion.x * motion.x + motion.y * motion.y);
    var turn = motion.turn * tick;
    if (speed * tick < 0.01 && abs(turn) < 0.01) {
        return;
    }
    var radius = gripTargetRadius(crate);
    var layer = floor(crate.pos.z);
    var actors = currentMap.entities[layer] || [];
    var steps = max(1, ceil((speed * tick + radius * abs(turn) * sin(1)) / 4));
    var stepScale = tick / steps;
    var inertia = radius * radius / 3;
    var bounce = thrown ? 0.32 : 0;
    var contact = {
    };
    var boxes = [];
    var parts = crate.forceRadius ? crate.collisions : [crate];
    for (var i = 0; i < parts.length; i++) {
        var part = parts[i];
        var shape = crate.forceRadius ? part : crate.collisions[0];
        var box = new Collision({
            type: shape.type === "poly" ? "poly" : "rect",
            x: part.x,
            y: part.y,
            width: part.width || part.size,
            height: part.height || part.size,
            points: shape.points,
            rotation: part.rotation,
            lowZ: shape.bodyBase,
            highZ: shape.bodyTop
        });
        box.forceLowZ = 0;
        box.bodyBase = shape.bodyBase;
        box.priorTop = shape.priorTop;
        box.zMoveTick = shape.zMoveTick;
        box._forceRadius = dist(0, 0, box.width, box.height) / 2;
        boxes.push(box);
    }
    for (var i = 0; i < steps; i++) {
        protectForcePath(crate, motion, stepScale);
        var rotation = (crate.rotation + motion.turn * stepScale) % 360;
        var x = crate.x + motion.x * stepScale;
        var y = crate.y + motion.y * stepScale;
        placeForceBoxes(crate, boxes, x, y, rotation);
        for (var pass = 0; pass < 4 && findPropContact(crate, boxes, layer, contact, x, y); pass++) {
            var impact = applyCrateContact(motion, contact, inertia, bounce);
            damageCrateImpact(contact.crate, impact);
            if (damageCrateImpact(crate, impact)) {
                return;
            }
            x += contact.nx * (contact.depth + 0.03);
            y += contact.ny * (contact.depth + 0.03);
            placeForceBoxes(crate, boxes, x, y, rotation);
        }
        if (pass === 4 && findPropContact(crate, boxes, layer, contact, x, y)) {
            continue;
        }
        var pushes = [];
        var clear = playerHealth <= 0 || deathScreenActive || stagePropPush(crate, boxes, null, pushes, contact, x, y);
        for (var j = 0; clear && j < actors.length; j++) {
            var actor = actors[j];
            if (actor instanceof AIPlayer && actor.health > 0) {
                clear = stagePropPush(crate, boxes, actor, pushes, contact, x, y);
            }
        }
        if (!clear) {
            var impact = applyCrateContact(motion, contact, inertia, bounce);
            if (!contact.caster) {
                crushActor(contact.actor, impact, crate.forceMass, true);
                if (damageCrateImpact(crate, impact)) {
                    return;
                }
            }
            continue;
        }
        var turnX = cos(motion.turn) - 1;
        var turnY = sin(motion.turn);
        for (var j = 0; j < pushes.length; j++) {
            var hit = pushes[j];
            var dx = hit.next.x - hit.pos.x;
            var dy = hit.next.y - hit.pos.y;
            var depth = sqrt(dx * dx + dy * dy);
            if (depth < 0.001) {
                continue;
            }
            var nx = dx / depth;
            var ny = dy / depth;
            var ox = hit.pos.x - x;
            var oy = hit.pos.y - y;
            var vx = motion.x + ox * turnX - oy * turnY - hit.vel.x;
            var vy = motion.y + ox * turnY + oy * turnX - hit.vel.y;
            var impact = max(0, vx * nx + vy * ny);
            hit.pos.x = hit.next.x;
            hit.pos.y = hit.next.y;
            hit.vel.x += nx * impact * 0.7;
            hit.vel.y += ny * impact * 0.7;
            if (thrown && impact > 9 && hit.actor && hit.actor.team !== playerTeam && !hasSpawnGrace(hit.actor) && motion.hits.indexOf(hit.actor) < 0) {
                motion.hits.push(hit.actor);
                Laser.prototype.damageEntityHit.call({
                    damage: constrain(impact * 2.4, 12, 80),
                    owner: {
                        isPlayer: true,
                        team: playerTeam
                    }
                }, hit.actor);
            }
            if (damageCrateImpact(crate, impact * 0.65)) {
                return;
            }
        }
        moveForceProp(crate, x, y, rotation);
        motion.moved = true;
    }
    if (thrown) {
        var drag = pow(0.93, tick);
        motion.x *= drag;
        motion.y *= drag;
        motion.turn *= drag;
    }
};
var crushDoorActor = function (door, actor, speed) {
    var pos = actor ? actor.pos : playerPos;
    var size = actor ? actor.colSize : hitboxSize;
    if (actor ? actor.health <= 0 : playerHealth <= 0 || deathScreenActive) {
        return;
    }
    for (var i = 0; i < door.collisions.length; i++) {
        var panel = door.collisions[i];
        if (!panel.inBounds(pos.x, pos.y, size)) {
            continue;
        }
        var next = {
            x: pos.x,
            y: pos.y,
            z: pos.z
        };
        if ((panel.entityCollide(next, null, size, 0) & 2) === 0) {
            continue;
        }
        if (!solidAt(next.x, next.y, pos.z, size)) {
            return;
        }
        var nx = -sin(panel.rotation);
        var ny = cos(panel.rotation);
        var side = (pos.x - panel.x) * nx + (pos.y - panel.y) * ny;
        var edge = panel.height / 2 + size + 0.3;
        var front = edge - side;
        var back = -edge - side;
        if (solidAt(pos.x + nx * front, pos.y + ny * front, pos.z, size) && solidAt(pos.x + nx * back, pos.y + ny * back, pos.z, size)) {
            crushActor(actor, speed, 12, false);
        }
        return;
    }
};
crushInDoor = function (door, speed) {
    if (!currentMap) {
        return;
    }
    crushDoorActor(door, null, speed);
    for (var layer = floor(door.lowZ); layer <= floor(door.highZ + 1); layer++) {
        var actors = currentMap.entities[layer] || [];
        for (var i = 0; i < actors.length; i++) {
            if (actors[i] instanceof AIPlayer) {
                crushDoorActor(door, actors[i], speed);
            }
        }
    }
    var crates = getBlastCrates();
    for (var i = 0; i < crates.length; i++) {
        var crate = crates[i];
        for (var c = 0; c < crate.collisions.length && !crate.destroyed; c++) {
            var box = crate.collisions[c];
            if (box.type !== "rect") {
                continue;
            }
            for (var panel = 0; panel < door.collisions.length; panel++) {
                if (crateDoorOverlap(door.collisions[panel], box)) {
                    destroyCrate(crate);
                    break;
                }
            }
        }
    }
};

//World Objects
var KashyyykFloor = function (config) {
    GameObj.call(this, config);
    this.floorArt = true;
    this.patches = [];
    this.zValue = -6;
    var patchCount = config.patchCount !== undefined ? config.patchCount : 3000;
    for (var i = 0; i < patchCount; i++) {
        this.patches.push({
            //These used to reference currentMap.width, but that doesn't work because those properties don't exist in the current map by the time the object is created
            x: random(-5400 / 2 + 300, 5400 / 2 + 300),
            y: random(-5400 / 2 + 300, 5400 / 2 + 300),
            size: random(5, 10),

            //earthy brown
            //mossy green
            color: lerpColor(color(86, 62, 38, 95), color(53, 91, 48, 115), random(0.15, 0.85)),
            shape: random() < 0.5 ? "ellipse" : "rect"
        });
    }
};
KashyyykFloor.prototype = Object.create(GameObj.prototype);
KashyyykFloor.prototype.render = function (layer, bounds) {
    bounds = bounds || getViewBounds(layer !== undefined ? layer : floor(this.lowZ));
    var sandStep = lowDetailMode ? 3 : 1;
    for (var i = 0; i < 60; i += sandStep) {
        pushMatrix();
        translate(-i * 4, 0);
        beginShape();
        fill(237, 184, 78, 255 * (1 - pow(1 - i * 3 / 255, sandStep)));
        noStroke();
        strokeWeight(40);
        vertex(-2200, -currentMap.height / 2 + 300);
        vertex(-2200, currentMap.height / 2 + 300);
        vertex(-1484, currentMap.height / 2 + 300);
        bezierVertex(-1558, 245, -1293, -393, -1638, -currentMap.height / 2 + 300);
        endShape(CLOSE);
        popMatrix();
    }
    noStroke();
    var patchStep = lowDetailMode ? 3 : 1;
    for (var i = 0; i < this.patches.length; i += patchStep) {
        var p = this.patches[i];
        if (bounds && (p.x + p.size < bounds.minX || p.x - p.size > bounds.maxX || p.y + p.size < bounds.minY || p.y - p.size > bounds.maxY)) {
            continue;
        }
        fill(p.color);
        if (p.shape === "ellipse") {
            ellipse(p.x, p.y, p.size, p.size * 0.75);
        } else {
            rectMode(CENTER);
            rect(p.x, p.y, p.size, p.size * 0.4, 5);
        }
    }
    fill(99, 99, 99);
    rect(300, 1675, 535, 315);
    rect(300, 2223, 1800, 800);
};
var SparkParticles = function (config) {
    GameObj.call(this, config);
    this.sparks = [];
    this.x = config.x !== undefined ? config.x : 0;
    this.y = config.y !== undefined ? config.y : 0;
    this.dir = config.direction !== undefined ? config.direction : 0;
    this.amt = config.rate !== undefined ? config.rate : 2;
    this.spread = config.spread !== undefined ? config.spread : 40;
};
SparkParticles.prototype = Object.create(GameObj.prototype);
SparkParticles.prototype.update = function () {
    this.spawnClock = (this.spawnClock || 0) + tickClock.scale;
    while (this.spawnClock >= max(1, this.amt)) {
        this.spawnClock -= max(1, this.amt);
        this.sparks.push({
            x: this.x,
            y: this.y,
            colour: random() < 0.5 ? color(255, 255, 0) : color(168, 168, 255),
            r: random(-this.spread, this.spread),
            x2: 0,
            vel: random(3, 4),
            sz: 7,
            life: 5
        });
    }
    for (var particleIndex = this.sparks.length - 1; particleIndex >= 0; particleIndex--) {
        var p = this.sparks[particleIndex];
        if (p.life <= 0) {
            p.sz -= p.vel * tickClock.scale;
        }
        p.life -= 0.5 * tickClock.scale;
        p.x2 += p.vel * tickClock.scale;
        if (p.sz <= 0) {
            this.sparks.splice(particleIndex, 1);
        }
    }
};
SparkParticles.prototype.render = function () {
    for (var particleIndex = 0; particleIndex < this.sparks.length; particleIndex++) {
        var p = this.sparks[particleIndex];
        pushMatrix();
        translate(p.x, p.y);
        rotate(this.dir + p.r);
        for (var s = 0; s < 3; s += lowDetailMode ? 2 : 1) {
            stroke(p.colour, (-s + 3) * 100);
            strokeWeight((s + 1) * 2);
            line(p.x2, 0, p.x2 + p.sz, 0);
        }
        popMatrix();
    }
};
//Tree constructor
var Tree = function (config) {
    GameObj.call(this, config);
    this.zValue = config.zValue !== undefined ? config.zValue : 1;
    this.width = config.width !== undefined ? config.width : 80;
    this.height = config.height || this.width;
    this.lowZ = config.lowZ !== undefined ? config.lowZ : 0;
    this.highZ = this.zValue;
    this.renderEveryLayer = true;
    this.trunkColor = config.trunkColor !== undefined ? config.trunkColor : color(33, 22, 17); //dark brown
    this.translucent = 255;
    this.canopyColor = config.canopyColor !== undefined ? config.canopyColor : color(random(12, 20), random(74, 80), random(12, 20)); //translucent green
    this.hasPlatform = config.hasPlatform !== undefined ? config.hasPlatform : false;
    this.platformWidth = config.platformWidth || this.width + 40;
    this.platformHeight = config.platformHeight !== undefined ? config.platformHeight : 10;
    this.platformYOffset = config.platformYOffset !== undefined ? config.platformYOffset : 100;
    this.platformColor = config.platformColor !== undefined ? config.platformColor : color(139, 69, 19);
    this.shape = random() < 0.5 ? "tri" : "rect";
    this.rotation = random(0, 360);
    this.collisions = [
        new Collision({
            type: "ellipse",
            x: this.x,
            y: this.y,
            lowZ: this.lowZ,
            highZ: this.highZ,
            width: this.width / 5,
            height: this.height / 5
        })
    ];
};
Tree.prototype = Object.create(GameObj.prototype);
Tree.prototype.update = function () {
    var radius = this.width / 1.78;
    var canopyScreen = worldToScreen(this.x, this.y, this.zValue);
    var playerScreen = worldToScreen(playerPos.x, playerPos.y, playerPos.z);
    var screenRadius = radius * zoom * worldHeightScale(this.zValue);
    var fade = playerPos.z < this.zValue && dist(playerScreen.x, playerScreen.y, canopyScreen.x, canopyScreen.y) < screenRadius + 150;
    var held = !fade && hasForceGrip() && forceGrip.target;
    if (held && held.pos.z < this.zValue) {
        fade = dist(held.pos.x, held.pos.y, this.x, this.y) < radius + gripTargetRadius(held);
    }
    for (var i = 0; !fade && i < activeSaberThrows.length; i++) {
        var saber = activeSaberThrows[i];
        var flight = saber.throwState;
        if (!flight || !flight.isPlayer || flight.map !== currentMap || flight.z >= this.zValue) {
            continue;
        }
        var sample = saber.bladeTrail[saber.bladeTrail.length - 1];
        var tip = sample ? sample.tip : flight;
        fade = saberSweepDist(this.x, this.y, flight.x, flight.y, tip.x, tip.y) < radius;
    }
    this.translucent = lerp(this.translucent, fade ? 175 : 255, 1 - pow(0.9, tickClock.scale));
};
Tree.prototype.render = function (layer) {
    //Draw trunk
    noStroke();
    fill(this.trunkColor);
    ellipse(this.x, this.y, this.width / 5, this.height / 5);
    if (layer !== undefined && layer < floor(this.highZ)) {
        return;
    }
    //Draw canopy
    pushMatrix();
    translate(this.x, this.y);
    rotate(this.rotation);
    fill(this.canopyColor, this.translucent);
    if (this.shape === "tri") {
        pushMatrix();
        scale(this.width / 123);
        beginShape();
        for (var i = 0; i < treeCanopyPoints.length; i++) {
            vertex(treeCanopyPoints[i][0], treeCanopyPoints[i][1]);
        }
        endShape(CLOSE);
        popMatrix();
    } else {
        ellipse(0, 0, this.width, this.width);
    }
    popMatrix();
};
var postHexPoints = [];
for (i = 0; i < 360; i += 60) {
    postHexPoints.push(60 * cos(i), 60 * sin(i));
}
var CommandPost = function (config) {
    GameObj.call(this, config);
    this.controlState = config.controlState || "captured";
    this.controllingTeam = config.controllingTeam !== undefined ? config.controllingTeam : 1; //Idk what this should be
    this.radius = config.radius !== undefined ? config.radius : 500;
    this.collisions = [new Collision({
            type: "poly",
            x: this.x,
            y: this.y,
            points: postHexPoints,
            lowZ: this.lowZ,
            highZ: this.lowZ + 0.7,
            blocksLanding: false
        })];
};
CommandPost.prototype = Object.create(GameObj.prototype);
CommandPost.prototype.render = function () {
    //(this.controllingTeam !== playerTeam) // Again, idk how this should work
    var active = isSupremacy() && this.supPost && currentMap.sup;
    var controlColor = active ? supColor(this.owner) : this.controllingTeam === 1 ? color(80, 80, 255) : color(255, 80, 80);

    strokeWeight(3);
    stroke(controlColor, 160);
    switch (this.controlState) {
        case "neutral": fill(controlColor, 25);
        break;
        case "captured": fill(controlColor, 80);
        break;
        case "contested": fill(controlColor, 50);
        break;
        case "capturing": fill(controlColor, 65 + 15 * sin((tickClock.realMs / tickClock.baseMs) * 6));
        break;
    }
    ellipse(this.x, this.y, this.radius * (active ? 1 : 1 + 0.05 * sin((tickClock.realMs / tickClock.baseMs) * 2)), this.radius * (active ? 1 : 1 + 0.05 * sin((tickClock.realMs / tickClock.baseMs) * 2)));
    var points = postHexPoints;
    pushMatrix();
    translate(this.x, this.y);
    stroke(50);
    fill(90);
    for (var i = 0; i < points.length; i += 2) {
        var next = (i + 2) % points.length;
        quad(points[i], points[i + 1], points[next], points[next + 1], points[next] * 0.5, points[next + 1] * 0.5, points[i] * 0.5, points[i + 1] * 0.5);
    }
    noStroke();
    fill(140);
    beginShape();
    for (var i = 0; i < points.length; i += 2) {
        vertex(points[i] * 0.5, points[i + 1] * 0.5);
    }
    endShape(CLOSE);
    popMatrix();
    if (active) {
        renderSupPost(this);
    }
};
//Define Internal Functions
var deepCopy = function (objb) {
    if (typeof objb !== "object" || objb === null) {
        return objb;
    }
    var copy = Array.isArray(objb) ? [] : {
    };
    for (var key in objb) {
        if (objb.hasOwnProperty(key)) {
            copy[key] = deepCopy(objb[key]);
        }
    }
    return copy;
};
var layerObj = function (config, lowZ, highZ, type) {
    //Objects get so messed up and interconnected that making this function was a nightmare  o_o   appreciate it
    var layeredObjs = [];
    var layerType = type || "Wall";
    for (var k = lowZ; k <= highZ; k++) {
        if (layerType === "Wall") {
            if (k === highZ) {
                layeredObjs.push(
                new Wall({
                    x: config.x,
                    y: config.y,
                    width: config.width,
                    height: config.height,
                    color: config.color,
                    borderColor: config.borderColor,
                    borderSize: config.borderSize,
                    smoothCorners: config.smoothCorners,
                    zValue: k
                })
                );
            } else {
                layeredObjs.push(
                new Wall({
                    x: config.x,
                    y: config.y,
                    width: config.width,
                    height: config.height,
                    color: config.color,
                    borderColor: config.borderColor,
                    borderSize: config.borderSize,
                    smoothCorners: config.smoothCorners,
                    zValue: k,
                    top: "None",
                    gapFill: true
                })
                );
            }
        } else if (layerType === "BlastDoor") {
            layeredObjs.push(
            new BlastDoor({
                x: config.x,
                y: config.y,
                width: config.width,
                thickness: config.thickness,
                color: config.color,
                speed: config.speed,
                dist: config.dist,
                distZ: config.distZ || [k, k],
                rotation: config.rotation,
                smoothCorners: config.smoothCorners,
                zValue: k
            })
            );
        }
    }
    return layeredObjs;
};
/**Entity Constructor**/

//Entities
var Entity = function (config) {
    this.pos = new PVector(config.x !== undefined ? config.x : 0, config.y !== undefined ? config.y : 0, config.z !== undefined ? config.z : 0);
    this.vel = new PVector(config.xVel !== undefined ? config.xVel : 0, config.yVel !== undefined ? config.yVel : 0, config.zVel !== undefined ? config.zVel : 0);
    this.colSize = config.colSize || hitboxSize;
    this.bounce = config.bounce !== undefined ? config.bounce : 0;
    this.slide = config.slide !== undefined ? config.slide : 0.8;
};
Entity.prototype.update = function () {
    var tick = tickClock.scale;
    this.vel.z -= 0.005 * tick;
    this.vel.x *= pow(this.slide, tick);
    this.vel.y *= pow(this.slide, tick);
    //Entities are handled in a loop where i is the layer; thus, we can use i to know if the entity is in the correct array
    this.collide();
    var activeLayer = this._activeLayer !== undefined ? this._activeLayer : floor(this.pos.z);
    if (this.pos.z < currentMap.killZ || this.pos.z > currentMap.topZ + 1) {
        return "delete";
    }
    if (floor(this.pos.z) < activeLayer) {
        return "zDown";
    }
    if (floor(this.pos.z) > activeLayer) {
        return "zUp";
    }
    this.pos.x += this.vel.x * tick;
    this.pos.y += this.vel.y * tick;
    this.touchingFloorCollision = moveEntityZ(this.pos, this.vel, this.colSize, this.bounce, tick);
    return false;
};
Entity.prototype.render = function () {
};
Entity.prototype.collide = function () {
    var z = floor(this.pos.z);
    this.touchingNonFloorCollision = false;
    var collisionOutput = this._collisionOutput || (this._collisionOutput = []);
    for (var layer = z - 1; layer <= z; layer++) {
        var colObj = currentMap.getNearbyCollisions ? currentMap.getNearbyCollisions(layer, this.pos.x, this.pos.y, this.colSize + 4, collisionOutput) : currentMap.collisionLayers ? currentMap.collisionLayers[layer] : null;
        if (colObj && colObj.length !== undefined) {
            for (var colIndx = 0; colIndx < colObj.length; colIndx++) {
                var hit = impactWall(this, colObj[colIndx], this.pos, this.vel, this.colSize, this.bounce);
                if (hit & 2) {
                    this.touchingNonFloorCollision = true;
                }
            }
        }
    }
};
var DashArrow = function (config) {
    Entity.call(this, config);
    this.poolType = null;
    this.rot = config.rot !== undefined ? config.rot : 0;
    this.life = config.life !== undefined ? config.life : 22;
    this.maxLife = this.life;
    this.size = config.size !== undefined ? config.size : 44;
    this.delay = config.delay !== undefined ? config.delay : 0;
    this.followActor = config.followActor || null;
    this.followPlayer = config.followPlayer !== undefined ? config.followPlayer : false;
};
DashArrow.prototype = Object.create(Entity.prototype);
DashArrow.prototype.constructor = DashArrow;
DashArrow.prototype.update = function () {
    if (this.delay > 0) {
        this.delay = max(0, this.delay - tickClock.scale);
        if (this.followPlayer) {
            this.pos.x = playerPos.x;
            this.pos.y = playerPos.y;
            this.pos.z = playerPos.z;
        } else if (this.followActor && this.followActor.pos) {
            this.pos.x = this.followActor.pos.x;
            this.pos.y = this.followActor.pos.y;
            this.pos.z = this.followActor.pos.z;
        }
        return false;
    }
    this.life -= tickClock.scale;
    if (this.life <= 0) {
        return "delete";
    }
    return false;
};
DashArrow.prototype.render = function () {
    if (this.delay > 0) {
        return;
    }
    var a = 105 * constrain(this.life / this.maxLife, 0, 1);
    var s = this.size;
    pushMatrix();
    translate(this.pos.x, this.pos.y);
    rotate(this.rot);
    noStroke();
    fill(190, 245, 255, a * 0.55);
    triangle(s * 0.04, -s * 0.2, s * 0.48, 0, s * 0.04, s * 0.2);
    popMatrix();
};
var skinHasForce = function (name) {
    return name === "Ahsoka Tano" || name === "Yoda" || name === "Luke Skywalker" || name === "Kylo Ren" || name === "Darth Vader" || name === "Darth Maul";
};
var isJediActor = function (actor, isPlayerActor) {
    if (isPlayerActor) {
        return skinHasForce(skin);
    }
    if (!actor) {
        return false;
    }
    return skinHasForce(actor.skin);
};
var spawnDashArrows = function (pos, z, rot, actor, isPlayerActor) {
    if (!currentMap || !currentMap.entities || !pos) {
        return;
    }
    var layer = constrain(floor(z), currentMap.killZ, currentMap.topZ + 1);
    if (!currentMap.entities[layer]) {
        currentMap.entities[layer] = [];
    }
    for (var a = 0; a < jediDashSettings.arrowCount; a++) {
        currentMap.entities[layer].push(
        new DashArrow({
            x: pos.x,
            y: pos.y,
            z: z,
            rot: rot,
            life: 68,
            size: hitboxSize * 4,
            delay: a * jediDashSettings.arrowDelayFrames,
            followActor: actor,
            followPlayer: isPlayerActor
        })
        );
    }
};
dashBill = null;
var billDash = function () {
    if (!dashBill) {
        return;
    }
    var b = dashBill;
    var d = max(0, (playerPos.x - b.x) * b.dx + (playerPos.y - b.y) * b.dy);
    var cost = min(jediDashSettings.forceCost - b.paid, (d / 360) * jediDashSettings.forceCost);
    playerForce = max(0, playerForce - cost);
    b.paid += cost;
    b.x = playerPos.x;
    b.y = playerPos.y;
    b.left -= tickClock.scale;
    if (b.left <= 0 || b.paid >= jediDashSettings.forceCost || playerForce <= 0) {
        if (playerForce <= 0) {
            playerVel.x *= 0.2;
            playerVel.y *= 0.2;
        }
        dashBill = null;
    }
};
var triggerJediDash = function (actor, isPlayerActor) {
    if (!isJediActor(actor, isPlayerActor)) {
        return false;
    }
    var pos = isPlayerActor ? playerPos : actor.pos;
    var vel = isPlayerActor ? playerVel : actor.vel;
    var angle = ((isPlayerActor ? bodyAngle : actor.bodyAngle) || 0) - 90;
    if (!pos || !vel) {
        return false;
    }
    if (isPlayerActor) {
        if (playerForce < jediDashSettings.forceCost) {
            return false;
        }
        dashBill = {
            x: pos.x,
            y: pos.y,
            dx: cos(angle),
            dy: sin(angle),
            left: 24,
            paid: 0
        };
    } else {
        if (actor.maxForce === undefined) {
            actor.maxForce = forceProfile(actor.skin).capacity;
        }
        if (actor.force === undefined) {
            actor.force = actor.maxForce;
        }
        if (actor.force < jediDashSettings.forceCost) {
            return false;
        }
        actor.force = max(0, actor.force - jediDashSettings.forceCost);
    }
    (isPlayerActor ? vel : actor).impactDashUntil = tickClock.gameMs + 650;
    vel.x += cos(angle) * jediDashSettings.burstSpeed;
    vel.y += sin(angle) * jediDashSettings.burstSpeed;
    spawnDashArrows(pos, pos.z, angle, actor, isPlayerActor);
    screenShake = max(screenShake, 1.2);
    return true;
};
playerHasForce = function () {
    return skinHasForce(skin);
};
var tryPlayerJump = function () {
    var pressed = !!gameInput.pressed[inputKeys.jump];
    if (!playerFloorHit || (!keys[inputKeys.jump] && !pressed)) {
        return false;
    }
    var moving = playerVel.x * playerVel.x + playerVel.y * playerVel.y > 0.25;
    var forceJump = pressed && moving && isPlayerSprinting() && playerHasForce() && playerForce >= forceSettings.jumpCost;
    if (forceJump) {
        playerForce -= forceSettings.jumpCost;
        playerPos.z += 0.1;
        playerVel.z = forceSettings.jumpSpeed * forceProfile(skin).jump;
    } else {
        playerPos.z += 0.1 * tickClock.scale;
        playerVel.z += playerJumpHeight * tickClock.scale;
    }
    playerFloorHit = false;
    return true;
};
var updateForceMeter = function () {
    syncPlayerForce();
    trackLightning();
    if (!playerHasForce()) {
        playerForce = playerMaxForce;
        return;
    }
    playerForce = min(playerMaxForce, playerForce + forceSettings.regenSpeed * forceProfile(skin).regen * tickClock.scale);
};
var drawForceMeter = function () {
    if (!playerHasForce()) {
        return;
    }
    var meterW = 260;
    var meterH = 13;
    var meterX = 20;
    var meterY = 30;
    var fillAmount = constrain(playerForce / playerMaxForce, 0, 1);
    var ready = zap.open && !zap.empty && playerForce > 0;
    pushStyle();
    rectMode(CORNER);
    noStroke();
    fill(0, 105);
    rect(meterX - 3, meterY - 3, meterW + 6, meterH + 6, 3);
    fill(12, 26, 42, 210);
    rect(meterX, meterY, meterW, meterH, 2);
    fill(ready ? color(85, 235, 155, 235) : color(84, 210, 255, 235));
    rect(meterX, meterY, meterW * fillAmount, meterH, 2);
    fill(ready ? color(210, 255, 225, 175) : color(210, 248, 255, 175));
    rect(meterX, meterY, meterW * fillAmount, 3, 2);
    stroke(ready ? color(130, 255, 190, 190) : color(175, 232, 255, 190));
    strokeWeight(2);
    noFill();
    rect(meterX, meterY, meterW, meterH, 2);
    fill(0, 230);
    textAlign(CENTER, CENTER);
    textSize(10);
    text("FORCE", meterX + meterW / 2, meterY + meterH / 2);
    if (!zap.open) {
        var y = meterY + meterH + 4;
        noStroke();
        fill(12, 26, 42, 210);
        rect(meterX, y, meterW, meterH, 2);
        fill(125, 145, 255, 235);
        rect(meterX, y, meterW * zapProgress(), meterH, 2);
        stroke(170, 190, 255);
        strokeWeight(2);
        noFill();
        rect(meterX, y, meterW, meterH, 2);
    }
    popStyle();
};
//Specific entity constructors
Laser = function (config) {
    this.reset(config);
};
Laser.prototype = Object.create(Entity.prototype);
Laser.prototype.constructor = Laser;
Laser.prototype.reset = function (config) {
    Entity.call(this, config);
    this.vel.x *= 1.5;
    this.vel.y *= 1.5;
    this.vel.z *= 1.5;
    this.poolType = "laser";
    this.damage = config.damage;
    this.weaponId = config.weaponId || null;
    this.renderFunc = config.renderFunc;
    this.maxDist = config.maxDist;
    this.cullDist = config.cullDist !== undefined ? config.cullDist : 5000;
    this.muzzleOffset = config.muzzleOffset !== undefined ? config.muzzleOffset : 12;
    this.tailMax = config.tailMax !== undefined ? config.tailMax : 90;
    this.travelDist = 0;
    this.drawVelX = this.vel.x;
    this.drawVelY = this.vel.y;
    this.owner = config.owner || null;
    this.shooter = this.owner;
    //death animation flags
    this.dead = false;
    this.deathTime = 0; //counts frames after death
    var spawnStart = new PVector(this.pos.x, this.pos.y, this.pos.z);
    var speed = sqrt(this.vel.x * this.vel.x + this.vel.y * this.vel.y);
    if (speed > 0) {
        this.pos.x += (this.vel.x / speed) * this.muzzleOffset;
        this.pos.y += (this.vel.y / speed) * this.muzzleOffset;
    }
    if (this.raycastWalls(spawnStart, this.pos)) {
        this.pos = spawnStart;
    }
    this.startPos = new PVector(this.pos.x, this.pos.y, this.pos.z);
    this.warnSaberBots(this.pos, this.vel.x, this.vel.y, this.owner, this.vel.z);
};
Laser.prototype.isForceHeld = function () {
    return !this.dead && gripHolds(this.shooter);
};
Laser.prototype.getTailPoint = function () {
    var speed = sqrt(this.drawVelX * this.drawVelX + this.drawVelY * this.drawVelY);
    if (speed <= 0) {
        return {
            x: this.pos.x,
            y: this.pos.y
        };
    }
    var tailLen = constrain(this.travelDist, 8, this.tailMax);
    return {
        x: this.pos.x - (this.drawVelX / speed) * tailLen,
        y: this.pos.y - (this.drawVelY / speed) * tailLen
    };
};
var shotZReach = 0.48;
var saberZReach = 1.4;
var rayCols = function (map, x, y, z, cache) {
    var layer = floor(z);
    var size = map.collisionBuckets ? map.colBucket : 0;
    if (size) {
        var minX = floor((x - 2) / size);
        var maxX = floor((x + 2) / size);
        var minY = floor((y - 2) / size);
        var maxY = floor((y + 2) / size);
        if (cache.layer === layer && cache.minX === minX && cache.maxX === maxX && cache.minY === minY && cache.maxY === maxY) {
            return cache.cols;
        }
        cache.layer = layer;
        cache.minX = minX;
        cache.maxX = maxX;
        cache.minY = minY;
        cache.maxY = maxY;
    }
    cache.cols = map.getNearbyCollisions ? map.getNearbyCollisions(layer, x, y, 2, cache.output || (cache.output = [])) : map.collisionLayers ? map.collisionLayers[layer] : null;
    return cache.cols;
};
var rayDeck = function (map, from, to) {
    var startZ = from.z + 0.5;
    var endZ = to.z + 0.5;
    var dz = endZ - startZ;
    if (dz === 0) {
        return null;
    }
    var closest = null;
    var levels = map.laserDeckLevels || [];
    for (var levelIndex = 0; levelIndex < levels.length; levelIndex++) {
        var level = levels[levelIndex];
        var z = level.z;
        var t = (z - startZ) / dz;
        if (t < 0 || t > 1 || (closest && t >= closest.t)) {
            continue;
        }
        var x = lerp(from.x, to.x, t);
        var y = lerp(from.y, to.y, t);
        for (var layerIndex = 0; layerIndex < level.layers.length; layerIndex++) {
            var cols = map.getNearbyCollisions(level.layers[layerIndex], x, y, 2);
            for (var i = 0; cols && i < cols.length; i++) {
                var col = cols[i];
                if (col.plane && col.blocksLasers && col.surfaceZ === z && col.checkCollision(x, y, floor(col.lowZ))) {
                    closest = {
                        t: t,
                        x: x,
                        y: y,
                        z: z - 0.5,
                        type: "wall",
                        collider: col
                    };
                    break;
                }
            }
        }
    }
    return closest;
};
Laser.prototype.pointHitsLaserWall = function (x, y, z, ignored, cache) {
    var zRounded = round(z * 10) / 10;
    var colObj = rayCols(currentMap, x, y, z, cache || {
    });
    if (colObj) {
        for (var m = 0; m < colObj.length; m++) {
            var col = colObj[m];
            if (!col.plane && col.blocksLasers && (!ignored || ignored.indexOf(col) < 0) && col.checkCollision(x, y, zRounded)) {
                return col;
            }
        }
    }
    return null;
};
Laser.prototype.raycastWalls = function (startPos, endPos, ignored) {
    var dx = endPos.x - startPos.x;
    var dy = endPos.y - startPos.y;
    var dz = (endPos.z || 0) - (startPos.z || 0);
    var distTravel = sqrt(dx * dx + dy * dy);
    var steps = max(1, ceil(max(distTravel / 4, abs(dz) * 4)));
    var lastSafeT = 0;
    var cache = {
    };
    var collider = this.pointHitsLaserWall(startPos.x, startPos.y, startPos.z, ignored, cache);
    if (collider) {
        return {
            t: 0,
            x: startPos.x,
            y: startPos.y,
            z: startPos.z,
            type: "wall",
            collider: collider
        };
    }
    var deck = rayDeck(currentMap, startPos, endPos);
    for (var step = 1; step <= steps; step++) {
        var t = step / steps;
        var x = startPos.x + dx * t;
        var y = startPos.y + dy * t;
        var z = startPos.z + dz * t;
        collider = this.pointHitsLaserWall(x, y, z, ignored, cache);
        if (collider) {
            var lo = lastSafeT;
            var hi = t;
            for (var refine = 0; refine < 6; refine++) {
                var mid = (lo + hi) / 2;
                var nearer = this.pointHitsLaserWall(startPos.x + dx * mid, startPos.y + dy * mid, startPos.z + dz * mid, ignored, cache);
                if (nearer) {
                    hi = mid;
                    collider = nearer;
                } else {
                    lo = mid;
                }
            }
            return deck && deck.t <= hi ? deck : {
                t: hi,
                x: startPos.x + dx * hi,
                y: startPos.y + dy * hi,
                z: startPos.z + dz * hi,
                type: "wall",
                collider: collider
            };
        }
        if (deck && deck.t <= t) {
            return deck;
        }
        lastSafeT = t;
    }
    return null;
};
Laser.prototype.segmentActorHit = function (startPos, endPos, pos, radius) {
    var zMin = 0;
    var zMax = 1;
    var dz = endPos.z - startPos.z;
    if (dz === 0) {
        if (abs(startPos.z - pos.z) > shotZReach) {
            return null;
        }
    } else {
        var low = (pos.z - shotZReach - startPos.z) / dz;
        var high = (pos.z + shotZReach - startPos.z) / dz;
        zMin = max(0, min(low, high));
        zMax = min(1, max(low, high));
        if (zMin > zMax) {
            return null;
        }
    }
    var dx = endPos.x - startPos.x;
    var dy = endPos.y - startPos.y;
    var lenSq = dx * dx + dy * dy;
    var fx = startPos.x - pos.x;
    var fy = startPos.y - pos.y;
    var c = fx * fx + fy * fy - radius * radius;
    if (lenSq <= 0) {
        return c <= 0 ? zMin : null;
    }
    var b = 2 * (fx * dx + fy * dy);
    var discriminant = b * b - 4 * lenSq * c;
    if (discriminant < 0) {
        return null;
    }
    discriminant = sqrt(discriminant);
    var t1 = (-b - discriminant) / (2 * lenSq);
    var t2 = (-b + discriminant) / (2 * lenSq);
    var t = max(zMin, t1);
    return t <= min(zMax, t2) ? t : null;
};
var canBotSwing = function (bot, saber) {
    return !!(bot.health > 0 && saber && saber.isLightsaber && saber.on && !saber.throwState && canAttack(bot) && !forceMovesTarget(bot) && tickClock.gameMs >= (bot.zapUntil || 0) && tickClock.gameMs >= (bot.saberStunUntil || 0));
};
var facesSaberThreat = function (pos, angle, threat, arc) {
    var facing = atan2(threat.x - pos.x, pos.y - threat.y);
    return abs(angleDifference(facing, angle)) <= arc;
};
var rearGuardAngle = function (bot) {
    if (!bot.isJedi || !canBotSwing(bot, bot.weapon) || !currentGun || !currentGun.isLightsaber || !currentGun.on || !hasHeldSaber(currentGun, skin) || (rightHeld && !saberStyle(skin).dual) || inventoryState.selected !== 0 || !canAttack() || !canUseGameInput() || playerHealth <= 0 || !(leftHeld() || mouseClick || currentGun.clicked) || abs(bot.pos.z - playerPos.z) > 0.8) {
        return null;
    }
    var dx = playerPos.x - bot.pos.x;
    var dy = playerPos.y - bot.pos.y;
    var facing = atan2(dx, -dy);
    if (bot.team === playerTeam || dx * dx + dy * dy > 230 * 230 || !facesSaberThreat(bot.pos, bot.bodyAngle, playerPos, 75)) {
        return null;
    }
    return facing;
};
var parryRearSwing = function (bot) {
    var now = tickClock.gameMs;
    if (!bot.rearGuardAt || now < bot.rearGuardAt) {
        return false;
    }
    var facing = rearGuardAngle(bot);
    var saber = bot.weapon;
    if (facing === null || saber.bladeLength < 0.25 || abs(angleDifference(getHandAngle(bot) + saber.swing + saber.spinAngle, facing + 18)) > 38) {
        return false;
    }
    if (now < (bot.rearBlockUntil || 0)) {
        return true;
    }
    if (now < (bot.rearBlockReadyAt || 0) || bot.force < forceSettings.autoDeflectCost) {
        return false;
    }
    bot.force -= forceSettings.autoDeflectCost;
    bot.rearBlockUntil = now + 110;
    bot.rearBlockReadyAt = now + 175;
    saberFlash(lerp(bot.pos.x, playerPos.x, 0.35), lerp(bot.pos.y, playerPos.y, 0.35), bot.pos.z, false);
    screenShake = max(screenShake, 1.2);
    return true;
};
var saberSwinging = function (saber, held) {
    return saber && saber.bladeLength > 0.05 && (held || saber.clicked || abs(saber.spinVelocity) >= 1.5);
};
var playerCanDeflect = function (saber) {
    return canUseGameInput() && !rightHeld && !inventoryState.uiConsumed && saberSwinging(saber, leftHeld() || mouseClick);
};
Laser.prototype.warnSaberBots = function (pos, vx, vy, owner, vz) {
    if (!currentMap || !owner || owner.team === undefined) {
        return;
    }
    var speed = sqrt(vx * vx + vy * vy);
    if (speed < 0.01) {
        return;
    }
    var warningRange = this.weaponId === "Sniper" ? 1500 : 1150;
    var rise = (vz || 0) / speed * warningRange;
    var bottom = floor(pos.z + min(0, rise) - shotZReach);
    var top = floor(pos.z + max(0, rise) + shotZReach);
    var now = tickClock.gameMs;
    for (var z = max(bottom, currentMap.killZ); z <= min(top, currentMap.topZ + 1); z++) {
        var list = currentMap.entities[z] || [];
        for (var i = 0; i < list.length; i++) {
            var bot = list[i];
            if (!bot.isJedi || bot.team === owner.team || !canBotSwing(bot, bot.weapon)) {
                continue;
            }
            var dx = bot.pos.x - pos.x;
            var dy = bot.pos.y - pos.y;
            var ahead = vx * dx + vy * dy;
            if (ahead <= 0 || ahead > speed * warningRange || abs(vx * dy - vy * dx) > speed * (bot.colSize + 45) || abs(pos.z + rise * ahead / (speed * warningRange) - bot.pos.z) > shotZReach) {
                continue;
            }
            if (!currentMap.traceSight(bot.pos, pos)) {
                continue;
            }
            if (now >= (bot.saberThreatUntil || 0)) {
                bot.saberThreatAt = now + (this.weaponId === "Sniper" ? 20 : 100) * getBotAwareness(bot).reactionScale;
            }
            bot.saberThreatUntil = now + 560;
            if (this.weaponId === "Sniper") {
                bot.saberThreatSniperUntil = now + 560;
                bot.saberThreatX = pos.x;
                bot.saberThreatY = pos.y;
            }
        }
    }
};
Laser.prototype.getActorLightsaber = function (actor, isPlayerActor) {
    if (!canAttack(isPlayerActor ? null : actor)) {
        return null;
    }
    if (isPlayerActor) {
        return inventoryState.selected === 0 && playerHealth > 0 && currentGun && currentGun.isLightsaber && currentGun.on && hasHeldSaber(currentGun, skin) ? currentGun : null;
    }
    if (!actor) {
        return null;
    }
    if (actor.currentGun && actor.currentGun.isLightsaber) {
        return actor.currentGun;
    }
    if (actor.weapon && actor.weapon.isLightsaber) {
        return actor.weapon;
    }
    return null;
};
Laser.prototype.isEnemyLaserFor = function (actor, isPlayerActor) {
    if (!this.owner || this.owner.team === undefined) {
        return false;
    }
    var targetTeam = isPlayerActor ? playerTeam : actor.team;
    return targetTeam !== undefined && this.owner.team !== targetTeam;
};
Laser.prototype.isMovingToward = function (startPos, endPos, x, y) {
    return ((endPos.x - startPos.x) * (x - startPos.x) + (endPos.y - startPos.y) * (y - startPos.y) > 0);
};
Laser.prototype.dualSaberContact = function (saber, pos, angle, skinName, startPos, endPos) {
    var nearest = null;
    var blade = saberStyle(skinName);
    for (var side = -1; side <= 1; side += 2) {
        if (!heldSaberSide(saber, side)) {
            continue;
        }
        var hand = saberGrip(skinName, side);
        var grip = saberPoint(pos.x, pos.y, angle, hand.x, hand.y);
        var rotation = angle + saberHeldAngle(saber, skinName, side);
        var scale = 180 / 390 * (side < 0 ? blade.offhandScale : 1);
        var base = saberPoint(grip.x, grip.y, rotation, 0, blade.base * scale);
        var tip = saberPoint(grip.x, grip.y, rotation, 0, (blade.tip - blade.reach * saber.bladeLength) * scale);
        var steps = max(1, ceil(dist(base.x, base.y, tip.x, tip.y) / 7));
        for (var i = 0; i <= steps; i++) {
            var point = {
                x: lerp(base.x, tip.x, i / steps),
                y: lerp(base.y, tip.y, i / steps),
                z: pos.z
            };
            var t = this.segmentActorHit(startPos, endPos, point, 6);
            if (t !== null && t !== undefined && (!nearest || t < nearest.t)) {
                nearest = { t: t, side: side };
            }
        }
    }
    return nearest;
};
Laser.prototype.tryDualSaberBlock = function (actor, isPlayerActor, startPos, endPos, maxT) {
    var saber = this.getActorLightsaber(actor, isPlayerActor);
    if (!saber || saber.bladeLength < 0.05 || !this.isEnemyLaserFor(actor, isPlayerActor)) {
        return null;
    }
    var pos = isPlayerActor ? playerPos : actor.pos;
    var name = isPlayerActor ? skin : actor.skin;
    var angle = getHandAngle(isPlayerActor ? null : actor);
    var contact = this.dualSaberContact(saber, pos, angle, name, startPos, endPos);
    var force = isPlayerActor ? playerForce : actor.force;
    if (!contact || contact.t > maxT || force < forceSettings.autoDeflectCost) {
        return null;
    }
    return {
        t: contact.t,
        x: lerp(startPos.x, endPos.x, contact.t),
        y: lerp(startPos.y, endPos.y, contact.t),
        z: lerp(startPos.z, endPos.z, contact.t),
        type: isPlayerActor ? "playerSaber" : "entitySaber",
        absorb: contact.side < 0,
        forceCost: forceSettings.autoDeflectCost,
        forceActor: isPlayerActor ? null : actor,
        reflectRot: angle - 90,
        owner: isPlayerActor ? { isPlayer: true, team: playerTeam } : actor,
        saber: saber
    };
};
Laser.prototype.tryAutoSaberDeflect = function (actor, isPlayerActor, startPos, endPos, hitT) {
    var saber = this.getActorLightsaber(actor, isPlayerActor);
    if ((isPlayerActor ? !playerCanDeflect(saber) : !canBotSwing(actor, saber) || !saberSwinging(saber)) || !this.isEnemyLaserFor(actor, isPlayerActor)) {
        return null;
    }
    if ((isPlayerActor ? skin : actor.skin) === "Ahsoka Tano") {
        return this.tryDualSaberBlock(actor, isPlayerActor, startPos, endPos, hitT);
    }
    var pos = isPlayerActor ? playerPos : actor.pos;
    if (!pos || !this.isMovingToward(startPos, endPos, pos.x, pos.y)) {
        return null;
    }
    var incomingFrom = {
        x: pos.x - (endPos.x - startPos.x),
        y: pos.y - (endPos.y - startPos.y)
    };
    if (!facesSaberThreat(pos, isPlayerActor ? bodyAngle : actor.bodyAngle, incomingFrom, 75)) {
        return null;
    }
    var duelBlock = inSaberDuel(isPlayerActor ? null : actor);
    var deflectForce = isPlayerActor ? playerForce : actor.force || 0;
    if (!duelBlock && deflectForce < forceSettings.autoDeflectCost) {
        return null;
    }
    var facingAngle = getHandAngle(isPlayerActor ? null : actor);
    var autoDeflectRoll = random();
    var health = isPlayerActor ? playerHealth : actor.health;
    var maxHealth = isPlayerActor ? playerMaxHealth : actor.maxHealth;
    var autoDeflectChance = constrain(0.44 + (1 - constrain(health / max(1, maxHealth), 0, 1)) * 0.18, 0.44, 0.62);
    if (!isPlayerActor && actor.isJedi && this.weaponId === "Sniper" && tickClock.gameMs >= actor.saberThreatAt && tickClock.gameMs < actor.saberThreatSniperUntil) {
        autoDeflectChance = 0.85;
    }
    if (!duelBlock && autoDeflectRoll >= autoDeflectChance) {
        return null;
    }
    if (isPlayerActor) {
        playerForce = max(0, playerForce - (duelBlock ? 0.05 : forceSettings.autoDeflectCost));
    } else {
        actor.force = max(0, actor.force - (duelBlock ? 0.05 : forceSettings.autoDeflectCost));
    }
    if (!duelBlock && isPlayerActor && this.owner && this.owner.pos && playerHasForce() && playerForce >= forceSettings.dangerSenseCost) {
        var laserSpeed = sqrt(this.vel.x * this.vel.x + this.vel.y * this.vel.y);
        if (this.damage >= forceSettings.dangerSenseThreatDamage && laserSpeed >= forceSettings.dangerSenseThreatSpeed && dist(this.owner.pos.x, this.owner.pos.y, playerPos.x, playerPos.y) >= forceSettings.dangerSenseThreatDistance && autoDeflectRoll < autoDeflectChance) {
            playerForce = max(0, playerForce - forceSettings.dangerSenseCost);
            dangerSense = max(dangerSense, forceSettings.dangerSenseSlowMoFrames);
            screenShake = max(screenShake, 0.6);
        }
    }
    saber.on = true;
    var reflectRot = (facingAngle || 0) - 90;
    if (!duelBlock) {
        var impactX = startPos.x + (endPos.x - startPos.x) * hitT;
        var impactY = startPos.y + (endPos.y - startPos.y) * hitT;
        var laserSide = atan2(impactY - pos.y, impactX - pos.x) % 360;
        if (laserSide < 0) {
            laserSide += 360;
        }
        var playerFacing = reflectRot % 360;
        if (playerFacing < 0) {
            playerFacing += 360;
        }
        var laserFrontDiff = (laserSide - playerFacing) % 360;
        if (laserFrontDiff > 180) {
            laserFrontDiff -= 360;
        }
        if (laserFrontDiff < -180) {
            laserFrontDiff += 360;
        }
        if (abs(laserFrontDiff) > 90) {
            reflectRot = (playerFacing + 180) % 360;
        } else {
            reflectRot = playerFacing;
        }
    }
    if (duelBlock) {
        reflectRot = this.owner && this.owner.pos ? atan2(this.owner.pos.y - pos.y, this.owner.pos.x - pos.x) : atan2(-this.vel.y, -this.vel.x);
    }
    var owner = isPlayerActor ? {
        isPlayer: true,
        team: playerTeam
    } : actor;
    return {
        t: hitT,
        x: startPos.x + (endPos.x - startPos.x) * hitT,
        y: startPos.y + (endPos.y - startPos.y) * hitT,
        z: startPos.z + (endPos.z - startPos.z) * hitT,
        type: isPlayerActor ? "playerSaber" : "entitySaber",
        reflectRot: reflectRot,
        owner: owner,
        saber: saber,
        duelBlock: duelBlock
    };
};
Laser.prototype.damageEntityHit = function (ent) {
    var beforeHealth = ent.health !== undefined ? ent.health : 0;
    var beforeShield = ent.shield !== undefined ? ent.shield : 0;
    applyDamage(ent, this.damage, this.owner);
    var done = max(0, beforeHealth + beforeShield - ((ent.health !== undefined ? ent.health : 0) + (ent.shield !== undefined ? ent.shield : 0)));
    if (this.owner && this.owner.aiMemory && done > 0 && ent.team !== undefined) {
        if (ent.team === this.owner.team) {
            this.owner.aiMemory.pendingReward -= done * 0.12;
        } else {
            this.owner.aiMemory.pendingReward += done * 0.08;
            if (beforeHealth > 0 && ent.health <= 0) {
                this.owner.aiMemory.pendingReward += 8;
            }
        }
    }
    if (this.owner && this.owner.isPlayer && ent.isMatchBot && ent.team !== playerTeam && done > 0) {
        ent.playerCreditDamage = (ent.playerCreditDamage || 0) + done;
        ent.playerCreditDamageMax = max(1, (ent.maxHealth || 100) + (ent.maxShield || 0));
    }
    if (ent.isMatchBot && beforeHealth > 0 && ent.health <= 0 && !ent.creditPaid) {
        if (!ent.tdmScorePaid && this.owner && this.owner.team !== undefined) {
            awardTDMKill(this.owner.team, ent.team);
            ent.tdmScorePaid = true;
        }
        if (ent.team !== playerTeam && ent.playerCreditDamage > 0) {
            var damagePercent = constrain(ent.playerCreditDamage / max(1, ent.playerCreditDamageMax || (ent.maxHealth || 100) + (ent.maxShield || 0)), 0, 1);
            var killBaseCredits = (floor(random(18, 31)) + matchState.playerKills * 5) * 5;
            var earnedCredits = max(1, floor(killBaseCredits * damagePercent));
            matchState.playerKills++;
            recordAchievement("kills", 1);
            ent.creditPaid = true;
            addCreditChange(earnedCredits, ent.pos.x, ent.pos.y - 82);
        } else if (this.owner && this.owner.isPlayer && ent.team === playerTeam) {
            ent.creditPaid = true;
            addCreditChange(-floor(random(40, 71)), ent.pos.x, ent.pos.y - 82);
        }
    }
};
Laser.prototype.raycastPlayerSaber = function (startPos, endPos, closest) {
    if (!this.isEnemyLaserFor(null, true) || abs(playerPos.z - endPos.z) > shotZReach || !playerCanDeflect(this.getActorLightsaber(null, true))) {
        return closest;
    }
    if (skin === "Ahsoka Tano") {
        return this.tryDualSaberBlock(null, true, startPos, endPos, closest ? closest.t : 1) || closest;
    }
    var saberRange = (hitboxSize * 2) / 3 + (currentGun.range || 0);
    var saberDx = endPos.x - playerPos.x;
    var saberDy = endPos.y - playerPos.y;
    if (saberDx * saberDx + saberDy * saberDy > saberRange * saberRange || (closest && closest.t <= 1)) {
        return closest;
    }
    if (inSaberDuel(null)) {
        return this.tryAutoSaberDeflect(null, true, startPos, endPos, 1) || closest;
    }
    var saberX = endPos.x;
    var saberY = endPos.y;
    var laserSide = atan2(saberY - playerPos.y, saberX - playerPos.x) % 360;
    if (laserSide < 0) {
        laserSide += 360;
    }
    var playerFacing = (getHandAngle(null) - 90) % 360;
    if (playerFacing < 0) {
        playerFacing += 360;
    }
    var laserFrontDiff = (laserSide - playerFacing) % 360;
    if (laserFrontDiff > 180) {
        laserFrontDiff -= 360;
    }
    if (laserFrontDiff < -180) {
        laserFrontDiff += 360;
    }
    if (abs(laserFrontDiff) > 90) {
        return closest;
    }
    return {
        t: 1,
        x: saberX,
        y: saberY,
        z: endPos.z,
        type: "playerSaber",
        reflectRot: abs(laserFrontDiff) > 90 ? (playerFacing + 180) % 360 : playerFacing
    };
};
Laser.prototype.raycastEntities = function (startPos, endPos) {
    var bottom = floor(min(startPos.z, endPos.z) - shotZReach);
    var top = floor(max(startPos.z, endPos.z) + shotZReach);
    var closest = null;
    var rayOutput = this._rayEntityOutput || (this._rayEntityOutput = []);
    for (var zLayer = bottom; zLayer <= top; zLayer++) {
        var entList = queryEntityGrid(currentMap, min(startPos.x, endPos.x), min(startPos.y, endPos.y), max(startPos.x, endPos.x), max(startPos.y, endPos.y), zLayer, zLayer, rayOutput, true);
        for (var e = 0; e < entList.length; e++) {
            var ent = entList[e];
            if (ent && ent.pos && ent.health !== undefined) {
                if (ent === this.owner || isAllyAttack(ent, this.owner)) {
                    continue;
                }
                var entT = this.segmentActorHit(startPos, endPos, ent.pos, ent.colSize);
                if (entT !== null && (!closest || entT < closest.t)) {
                    closest = {
                        t: entT,
                        x: startPos.x + (endPos.x - startPos.x) * entT,
                        y: startPos.y + (endPos.y - startPos.y) * entT,
                        z: startPos.z + (endPos.z - startPos.z) * entT,
                        type: "entity",
                        ent: ent
                    };
                }
            }
        }
    }
    closest = this.raycastPlayerSaber(startPos, endPos, closest);
    if (this.owner && this.owner.team !== undefined && this.owner.team !== playerTeam && playerHealth > 0 && (!this.owner.pos || dist(this.owner.pos.x, this.owner.pos.y, playerPos.x, playerPos.y) > hitboxSize)) {
        var playerT = this.segmentActorHit(startPos, endPos, playerPos, hitboxSize);
        if (playerT !== null && (!closest || ((closest.type !== "playerSaber" || skin === "Ahsoka Tano") && playerT < closest.t))) {
            closest = {
                t: playerT,
                x: startPos.x + (endPos.x - startPos.x) * playerT,
                y: startPos.y + (endPos.y - startPos.y) * playerT,
                z: startPos.z + (endPos.z - startPos.z) * playerT,
                type: "player"
            };
        }
    }
    return closest;
};
Laser.prototype.collide = function (startPos, endPos) {
    if (!startPos) {
        startPos = this.pos;
    }
    if (!endPos) {
        endPos = this.pos;
    }
    var wallHit = this.raycastWalls(startPos, endPos);
    var entityHit = this.raycastEntities(startPos, endPos);
    var hit = null;
    if (wallHit && (!hit || wallHit.t < hit.t)) {
        hit = wallHit;
    }
    if (entityHit && (!hit || entityHit.t < hit.t)) {
        hit = entityHit;
    }
    if (!hit) {
        return false;
    }
    if (hit.type === "entity") {
        hit = this.tryAutoSaberDeflect(hit.ent, false, startPos, endPos, hit.t) || hit;
    } else if (hit.type === "player") {
        hit = this.tryAutoSaberDeflect(null, true, startPos, endPos, hit.t) || hit;
    }
    this.pos.x = hit.x;
    this.pos.y = hit.y;
    this.pos.z = hit.z;
    if (hit.type === "entity") {
        this.damageEntityHit(hit.ent);
    } else if (hit.collider && hit.collider.crate) {
        damageCrate(hit.collider.crate, this.damage * 0.65);
    } else if (hit.type === "playerSaber" || hit.type === "entitySaber") {
        if (hit.forceCost) {
            if (hit.forceActor) {
                hit.forceActor.force = max(0, hit.forceActor.force - hit.forceCost);
            } else {
                playerForce = max(0, playerForce - hit.forceCost);
            }
        }
        if (hit.absorb) {
            saberFlash(hit.x, hit.y, hit.z, false);
            return true;
        }
        if (hit.duelBlock) {
            duelDeflectPulse(hit);
        } else if (hit.type === "entitySaber") {
            saberFlash(hit.x, hit.y, hit.z, false);
        }
        var reflectRot = hit.reflectRot !== undefined ? hit.reflectRot : bodyAngle - 90;
        var reflectSpeed = max(20, sqrt(this.vel.x * this.vel.x + this.vel.y * this.vel.y));
        this.vel.x = cos(reflectRot) * reflectSpeed;
        this.vel.y = sin(reflectRot) * reflectSpeed;
        this.vel.z = 0;
        this.owner = hit.owner || {
            isPlayer: true,
            team: playerTeam
        };
        this.startPos = new PVector(this.pos.x, this.pos.y, this.pos.z);
        this.travelDist = 0;
        this.warnSaberBots(this.pos, this.vel.x, this.vel.y, this.owner);
        screenShake = max(screenShake, 1.5);

        return false;
    } else if (hit.type === "player") {
        var prevPlayerVitals = playerHealth + playerShield;
        if (this.damage > 0) {
            var pLaserDmgTmp = {
                health: playerHealth,
                maxHealth: playerMaxHealth,
                shield: playerShield,
                maxShield: playerMaxShield,
                isPlayerTarget: true,
                pos: playerPos,
                damageSource: this.pos,
                skin: skin,
                damageMult: playerDamageMult !== undefined ? playerDamageMult : 1
            };
            applyDamage(pLaserDmgTmp, this.damage, this.owner);
            playerHealth = pLaserDmgTmp.health;
            playerShield = pLaserDmgTmp.shield;
        }
        if (prevPlayerVitals > 0 && playerHealth <= 0 && !deathScorePaid && this.owner && this.owner.team !== undefined) {
            awardTDMKill(this.owner.team, playerTeam);
            deathScorePaid = true;
        }
        if (this.owner && this.owner.aiMemory) {
            this.owner.aiMemory.pendingReward += max(0, prevPlayerVitals - (playerHealth + playerShield)) * 0.08;
            if (prevPlayerVitals > 0 && playerHealth <= 0) {
                this.owner.aiMemory.pendingReward += 8;
            }
        }
    }
    return true;
};
Laser.prototype.update = function () {
    //If laser is already dead, run death timer
    if (this.dead) {
        this.deathTime += tickClock.scale;
        if (this.deathTime > 60) {
            //1 second at 60 FPS
            return "delete";
        }
        return false;
    }
    if (this.isForceHeld()) {
        return false;
    }
    //Normal movement
    var prevPos = new PVector(this.pos.x, this.pos.y, this.pos.z);
    this.drawVelX = this.vel.x;
    this.drawVelY = this.vel.y;
    this.pos.x += this.vel.x * tickClock.scale;
    this.pos.y += this.vel.y * tickClock.scale;
    this.pos.z += this.vel.z * tickClock.scale;
    this.travelDist += dist(prevPos.x, prevPos.y, this.pos.x, this.pos.y);
    //Only real raycast hits should make the impact flash.
    if (this.collide(prevPos, this.pos)) {
        this.dead = true;
        this.deathTime = 0;
        //Stop moving but stay visible
        this.vel.x = 0;
        this.vel.y = 0;
        this.vel.z = 0;
        return false;
    }
    if (dist(this.startPos.x, this.startPos.y, this.pos.x, this.pos.y) > this.cullDist) {
        return "delete";
    }
    return false;
};
Laser.prototype.render = function (layer, bounds) {
    addSimpleLight(this.pos.x, this.pos.y, 50, 0.16, this.pos.z);

    this.renderFunc(this, bounds);
};

//Ai Actors
var botCombatRange = function (bot) {
    if (bot.weapon && bot.weapon.weaponId === "Sniper") {
        return 1050;
    }
    return aiSettings.preferredCombatRange * (bot.temper ? bot.temper.range : 1);
};
var aiQuietApproach = function (bot, distance) {
    if (bot.weapon && bot.weapon.weaponId === "Sniper") {
        return false;
    }
    if (bot.temper.role !== "sneak" || distance <= (bot.isJedi ? 260 : botCombatRange(bot) * 1.12)) {
        return false;
    }
    var attention = getBotAwareness(bot).attention;
    return !attention || tickClock.gameMs >= attention.until;
};
var aiSideApproach = function (bot, goal, power, seekCover) {
    var role = bot.temper.role;
    if (role !== "flanker" && role !== "sneak") {
        return false;
    }
    var dx = goal.x - bot.pos.x;
    var dy = goal.y - bot.pos.y;
    var distance = sqrt(dx * dx + dy * dy);
    if (distance < (bot.isJedi ? 240 : botCombatRange(bot)) || distance > 950 || abs(goal.z - bot.pos.z) > 0.8) {
        return false;
    }
    var angle = atan2(dy, dx);
    var side = bot.sneakSide || bot.temper.side;
    var checkCover = role === "sneak" && seekCover && tickClock.gameMs >= (bot.sneakCheckAt || 0);
    var best = null;
    for (var i = 0; i < 2; i++) {
        var heading = angle + side * (role === "flanker" ? 62 : 43);
        var x = bot.pos.x + cos(heading) * 130;
        var y = bot.pos.y + sin(heading) * 130;
        if (!solidAt(x, y, bot.pos.z, bot.colSize) && !solidAt((bot.pos.x + x) / 2, (bot.pos.y + y) / 2, bot.pos.z, bot.colSize) && aiHasSupport(x, y, bot.pos.z, bot.pos)) {
            var point = {
                x: x,
                y: y,
                z: bot.pos.z
            };
            if (!best) {
                best = point;
            }
            if (!checkCover || !currentMap.traceSight(goal, point)) {
                best = point;
                if (checkCover) {
                    bot.sneakSide = side;
                }
                break;
            }
        }
        side = -side;
    }
    if (checkCover) {
        bot.sneakCheckAt = tickClock.gameMs + 520;
    }
    if (!best) {
        return false;
    }
    aiMoveToward(bot, best, power, true);
    return true;
};
var aiCombatAdvance = function (bot, target, power) {
    var role = bot.temper.role;
    power *= role === "rusher" ? 1.4 : role === "sneak" ? 0.68 : 1;
    var waypoint = aiDoorWaypoint(bot, target.pos);
    if (waypoint || !aiSideApproach(bot, target.pos, power, true)) {
        aiMoveToward(bot, waypoint || target.pos, power, true);
    }
};
var aiGuardPosition = function (bot, target) {
    if (bot.isJedi || bot.temper.role !== "guard" || bot.inPlayerSquad) {
        return false;
    }
    var post = currentMap.sup && currentMap.sup.posts[bot.team];
    var home = post || bot.guardHome;
    var distance = dist(bot.pos.x, bot.pos.y, home.x, home.y);
    if (target && distance < 235 && dist(target.pos.x, target.pos.y, home.x, home.y) < 340) {
        return false;
    }
    bot.supSlot = bot.temper.roam;
    moveSupBot(bot, home, 0.85);
    return true;
};
angleDifference = function (target, current) {
    return atan2(sin(target - current), cos(target - current));
};
turnTowardAngle = function (current, target, limit) {
    return current + constrain(angleDifference(target, current), -limit, limit);
};
turnPlayerToward = function (angle) {
    if (playerAimTick !== tickClock.tick) {
        playerAimTick = tickClock.tick;
        playerAimTurned = 0;
    }
    var limit = max(0, movementSettings.turnDegreesPerTick * tickClock.scale - playerAimTurned);
    var turn = constrain(angleDifference(angle, bodyAngle), -limit, limit);
    bodyAngle += turn;
    playerAimTurned += abs(turn);
};
getHandPose = function (actor) {
    var now = tickClock.gameMs;
    var name = actor ? actor.skin : skin;
    var headAngle = actor ? actor.bodyAngle : bodyAngle;
    var pos = actor ? actor.pos : playerPos;
    var gun = actor ? actor.weapon : currentGun;
    var pose = actor ? actor.handPose : playerHandPose;
    if (!pose || pose.map !== currentMap || pose.skin !== name || now < pose.updatedAt || dist(pos.x, pos.y, pose.x, pose.y) > 600) {
        pose = {
            map: currentMap,
            skin: name,
            gun: gun,
            history: [{
                    time: now - handDelayMs,
                    angle: headAngle
            }],
            updatedAt: now,
            x: pos.x,
            y: pos.y,
            aimAngle: headAngle,
            angle: headAngle,
            kick: 0,
            recoilAngle: 0,
            recoveryMs: 120,
            flashAt: now - 90
        };
        if (actor) {
            actor.handPose = pose;
        } else {
            playerHandPose = pose;
        }
    }
    var elapsed = max(0, now - pose.updatedAt);
    var recovery = pow(0.05, elapsed / max(1, pose.recoveryMs));
    pose.kick *= recovery;
    pose.recoilAngle *= recovery;
    pose.updatedAt = now;
    pose.x = pos.x;
    pose.y = pos.y;
    if (pose.gun !== gun) {
        pose.gun = gun;
        pose.kick = 0;
        pose.recoilAngle = 0;
        pose.flashAt = now - 90;
    }
    var sway = actor ? sin(now / tickClock.baseMs * 8 + actor.counter) * constrain(sqrt(actor.vel.x * actor.vel.x + actor.vel.y * actor.vel.y) / 5, 0, 1) * 1.4 : walkSway * 0.65;
    var angle = headAngle + (isB2Droid(name) ? 0 : sway);
    var history = pose.history;
    var last = history[history.length - 1];
    if (last.time === now) {
        last.angle = angle;
    } else {
        history.push({
            time: now,
            angle: angle
        });
    }
    var delayedAt = now - (isB2Droid(name) ? 0 : handDelayMs);
    while (history.length > 2 && history[1].time <= delayedAt) {
        history.shift();
    }
    var first = history[0];
    var next = history[1] || first;
    var blend = constrain((delayedAt - first.time) / max(0.001, next.time - first.time), 0, 1);
    pose.aimAngle = isB2Droid(name) ? headAngle : first.angle + angleDifference(next.angle, first.angle) * blend;
    pose.angle = pose.aimAngle + pose.recoilAngle;
    return pose;
};
getHandAngle = function (actor) {
    return getHandPose(actor).angle;
};
addWeaponRecoil = function (gun, owner) {
    if (!owner || (!owner.isPlayer && (!owner.pos || owner.bodyAngle === undefined))) {
        return;
    }
    var pose = getHandPose(owner.isPlayer ? null : owner);
    var recoil = gun.recoil;
    pose.recoveryMs = recoil.recoveryMs;
    pose.kick = min(recoil.kick * 2.5, pose.kick + recoil.kick);
    pose.recoilAngle = constrain(pose.recoilAngle + recoil.angle * (random(1) < 0.5 ? -1 : 1), -recoil.angle * 2, recoil.angle * 2);
    pose.angle = pose.aimAngle + pose.recoilAngle;
    pose.flashAt = tickClock.gameMs;
    if (owner.isPlayer) {
        cameraState.recoil = min(1.5, cameraState.recoil + recoil.camera);
    }
};
drawActorHands = function (actor) {
    var pose = getHandPose(actor);
    var name = actor ? actor.skin : skin;
    var headAngle = actor ? actor.bodyAngle : bodyAngle;
    var item = actor ? null : getHeldItem();
    var gripping = !actor && hasForceGesture();
    if (!actor) {
        var reaching = gripping && !item && currentGun && currentGun.isLightsaber;
        forceHandBlend = constrain(forceHandBlend + tickClock.renderDeltaMs / 150 * (reaching ? 1 : -1), 0, 1);
    }
    var armAim = 0;
    if (isB2Droid(name)) {
        armAim = actor ? pose.recoilAngle : getB2MouseAim(playerPos, headAngle - 90, pose.recoilAngle, pose.kick).delta;
    }
    pushMatrix();
    if (!isB2Droid(name)) {
        rotate(angleDifference(pose.angle, headAngle));
        translate(0, pose.kick);
    }
    if (item) {
        drawHeldItem(item);
    } else {
        var flash = constrain(1 - (tickClock.gameMs - pose.flashAt) / 90, 0, 1);
        var gun = actor ? actor.weapon : currentGun;
        var forceHand = gripping ? 1 : 0;
        if (!actor && gun && gun.isLightsaber) {
            forceHand = forceHandBlend;
        }
        renderBlaster(gun, name, actor ? actor.gunPose : playerGunPose, armAim, isB2Droid(name) ? pose.kick : 0, flash, forceHand);
    }
    if (!actor) {
        drawZapReady();
    }
    popMatrix();
    if (item && (item.isFist || item.isLightning)) {
        drawZapWorld();
    }
};
getAITargetKey = function (target) {
    if (target.isPlayerTarget) {
        return "player";
    }
    if (!target._aiTargetId) {
        target._aiTargetId = "ent" + aiTargetSerial++;
    }
    return target._aiTargetId;
};
getBotAwareness = function (bot) {
    if (!bot.awareness || bot.awareness.map !== currentMap) {
        bot.awareness = {
            map: currentMap,
            tracks: {
            },

            contact: null,
            focusKey: "",
            attention: null,
            reactionScale: random(0.85, 1.2),
            turnSpeed: aiSettings.turnDegreesPerTick * random(0.85, 1.15),
            scanOffset: 0,
            scanHeading: bot.bodyAngle,
            scanUntil: 0,
            aimKey: "",
            aimX: bot.pos.x,
            aimY: bot.pos.y,
            aimSampleAt: 0,
            aimSampleMs: random(110, 190),
            aimError: 0,
            aimErrorGoal: 0,
            aimErrorAt: 0,
            aimUpdatedAt: -1,
            aimAngle: bot.bodyAngle,
            burstShots: 0,
            burstRestUntil: 0,
            blockedSince: null,
            strafeUntil: 0,
            spaceX: 0,
            spaceY: 0,
            moveScale: 0.82
        };
    }
    return bot.awareness;
};
var aiSightRange = function (bot) {
    return bot.weapon && bot.weapon.weaponId === "Sniper" ? 3000 : aiSettings.targetSearchRange;
};
aiCanObserve = function (bot, target) {
    if (!target || !target.pos || target.isMemoryTarget) {
        return false;
    }
    var dx = target.pos.x - bot.pos.x;
    var dy = target.pos.y - bot.pos.y;
    return dx * dx + dy * dy <= aiSightRange(bot) * aiSightRange(bot);
};
aiTargetUsesSaber = function (target) {
    if (!target) {
        return false;
    }
    var weapon = target.isPlayerTarget ? currentGun : target.weapon || target.currentGun;
    return target.isMemoryTarget ? !!target.isSaberThreat : !!(weapon && weapon.isLightsaber && weapon.on);
};
aiReactToHit = function (bot, attacker) {
    var pos = attacker && (attacker.isPlayer || attacker.isPlayerTarget ? playerPos : attacker.pos);
    if (!pos || bot.health <= 0) {
        return;
    }
    var awareness = getBotAwareness(bot);
    awareness.attention = {
        x: pos.x,
        y: pos.y,
        reactAt: tickClock.gameMs + random(180, 330),
        until: tickClock.gameMs + 2200
    };
};
aiUpdateAim = function (bot, target) {
    var awareness = getBotAwareness(bot);
    var now = tickClock.gameMs;
    if (!target || target.isMemoryTarget || awareness.aimUpdatedAt === now) {
        return;
    }
    awareness.aimUpdatedAt = now;
    var key = getAITargetKey(target);
    if (awareness.aimKey !== key) {
        awareness.aimKey = key;
        awareness.aimSampleAt = 0;
        awareness.burstShots = 0;
        awareness.blockedSince = null;
        bot.aimWarmup = 0;
    }
    if (now >= awareness.aimSampleAt) {
        var sniper = bot.weapon && bot.weapon.weaponId === "Sniper";
        var targetVel = target.isPlayerTarget ? playerVel : target.vel;
        var flight = sniper ? min(9, dist(bot.pos.x, bot.pos.y, target.pos.x, target.pos.y) / max(1, bot.weapon.laserSpeed)) : 0;
        awareness.aimX = target.pos.x + (targetVel ? targetVel.x * flight : 0);
        awareness.aimY = target.pos.y + (targetVel ? targetVel.y * flight : 0);
        awareness.aimZ = target.pos.z;
        awareness.aimVz = target.isPlayerTarget ? playerVel.z : target.vel ? target.vel.z : 0;
        awareness.aimSampleAt = now + awareness.aimSampleMs;
    }
    if (now >= awareness.aimErrorAt) {
        var distance = dist(bot.pos.x, bot.pos.y, awareness.aimX, awareness.aimY);
        awareness.aimErrorGoal = random(-2.5, 2.5) * (0.7 + distance / 1000);
        awareness.aimErrorAt = now + random(500, 950);
    }
    awareness.aimError = lerp(awareness.aimError, awareness.aimErrorGoal, 1 - pow(0.93, tickClock.scale));
    awareness.aimAngle = atan2(awareness.aimX - bot.pos.x, -(awareness.aimY - bot.pos.y)) + awareness.aimError;
};
aiUpdateFacing = function (bot) {
    if (inSaberDuel(bot) || tickClock.gameMs < (bot.zapUntil || 0) || tickClock.gameMs < (bot.saberStunUntil || 0)) {
        return;
    }
    var awareness = getBotAwareness(bot);
    var now = tickClock.gameMs;
    var view = getAIPerception(bot);
    var target = view.visibleTarget || view.nearestTarget;
    var moving = sqrt(bot.vel.x * bot.vel.x + bot.vel.y * bot.vel.y) > 0.8;
    var moveAngle = moving ? atan2(bot.vel.x, -bot.vel.y) : bot.bodyAngle;
    var desired = bot.bodyAngle;
    var distance = target ? dist(bot.pos.x, bot.pos.y, target.pos.x, target.pos.y) : 999999;
    var disengaging = target && moving && distance > aiSettings.closeThreatRange && bot.aiMemory && (bot.aiMemory.action === "retreat" || bot.aiMemory.action === "regroup") && bot.gunPose < 0.72;
    awareness.moveScale = 0.82;
    if (target && !disengaging && (!target.isMemoryTarget || distance > 110)) {
        if (view.visibleTarget) {
            aiUpdateAim(bot, target);
            desired = awareness.aimAngle;
        } else {
            desired = atan2(target.pos.x - bot.pos.x, -(target.pos.y - bot.pos.y));
        }
        if (moving && abs(angleDifference(moveAngle, desired)) > 65) {
            awareness.moveScale = 0.58;
        } else if (bot.gunPose > 0.72) {
            awareness.moveScale = 0.65;
        }
    } else if (awareness.attention && now >= awareness.attention.reactAt && now < awareness.attention.until) {
        desired = atan2(awareness.attention.x - bot.pos.x, -(awareness.attention.y - bot.pos.y));
    } else {
        if (now >= awareness.scanUntil) {
            awareness.scanOffset = random(-60, 60);
            awareness.scanHeading = bot.bodyAngle + awareness.scanOffset;
            awareness.scanUntil = now + random(850, 1800);
        }
        desired = moving ? moveAngle + awareness.scanOffset : awareness.scanHeading;
        if (disengaging) {
            desired = moveAngle;
            awareness.moveScale = 0.95;
        }
    }
    bot.bodyAngle = turnTowardAngle(bot.bodyAngle, desired, awareness.turnSpeed * tickClock.scale);
};
aiFireBurst = function (bot, target) {
    if (!target || target.isMemoryTarget || aiQuietApproach(bot, dist(bot.pos.x, bot.pos.y, target.pos.x, target.pos.y)) || !aiCanSeeTarget(bot, target)) {
        return false;
    }
    var awareness = getBotAwareness(bot);
    var now = tickClock.gameMs;
    aiUpdateAim(bot, target);
    if (aiSegHitsAlly(bot, target)) {
        if (awareness.blockedSince === null) {
            awareness.blockedSince = now;
        }
        return false;
    }
    awareness.blockedSince = null;
    var handAngle = getHandAngle(bot);
    var sniper = bot.weapon && bot.weapon.weaponId === "Sniper";
    if (abs(angleDifference(awareness.aimAngle, handAngle)) > (sniper ? 24 : aiSettings.aimShootTolerance)) {
        return false;
    }
    bot.wantsToShoot = true;
    var gun = bot.getBlaster();
    if (!gun || !gun.shootFrom || gun.shotTime > 0 || gun.reloadTime > 0 || bot.aimWarmup < (sniper ? 3 : bot.aimWarmupFrames) || now < awareness.burstRestUntil) {
        return false;
    }
    if (awareness.burstShots <= 0) {
        awareness.burstShots = bot.temper.role === "sneak" ? floor(random(2, 4)) : floor(random(3, 7));
    }
    var travel = min(10, dist(bot.pos.x, bot.pos.y, awareness.aimX, awareness.aimY) / (gun.laserSpeed * 1.5));
    var aimZ = awareness.aimZ + constrain(awareness.aimVz * travel, -0.45, 0.45);
    if (rayDeck(currentMap, bot.pos, {
        x: awareness.aimX,
        y: awareness.aimY,
        z: aimZ
    })) {
        return false;
    }
    var fired = gun.shootFrom(bot.pos, handAngle - 90, bot, {
        damage: gun.damage * aiSettings.botDamageScale,
        lightningFear: !!target.isPlayerTarget,
        target: target,
        aimZ: aimZ
    });
    if (fired) {
        awareness.burstShots--;
        if (awareness.burstShots <= 0) {
            awareness.burstRestUntil = now + (sniper ? random(80, 180) : bot.temper.role === "sneak" ? random(430, 800) : random(280, 650));
        }
    }
    return fired;
};
aiApplySpacing = function (bot) {
    var awareness = getBotAwareness(bot);
    var allies = getAIPerception(bot).nearbyAllies;
    var pushX = 0;
    var pushY = 0;
    for (var i = 0; i < allies.length; i++) {
        var ally = allies[i];
        if (ally.health <= 0 || abs(ally.pos.z - bot.pos.z) > 0.3) {
            continue;
        }
        var dx = bot.pos.x + bot.vel.x * 5 - ally.pos.x - (ally.vel ? ally.vel.x * 5 : 0);
        var dy = bot.pos.y + bot.vel.y * 5 - ally.pos.y - (ally.vel ? ally.vel.y * 5 : 0);
        var distance = sqrt(dx * dx + dy * dy);
        var space = max(aiSettings.botSpacingRange, ((bot.colSize || 30) + (ally.colSize || 30)) * 2.7);
        if (distance >= space) {
            continue;
        }
        if (distance < 0.1) {
            dx = getAITargetKey(bot) < getAITargetKey(ally) ? -1 : 1;
            dy = 0;
            distance = 1;
        }
        var pressure = pow(1 - distance / space, 2) * 2.5;
        pushX += dx / distance * pressure;
        pushY += dy / distance * pressure;
    }
    var length = sqrt(pushX * pushX + pushY * pushY);
    if (length > 1.2) {
        pushX *= 1.2 / length;
        pushY *= 1.2 / length;
    }
    var blend = 1 - pow(0.72, tickClock.scale);
    awareness.spaceX = lerp(awareness.spaceX, pushX, blend);
    awareness.spaceY = lerp(awareness.spaceY, pushY, blend);
    bot.vel.x += awareness.spaceX * getBotMoveAccel() * tickClock.scale;
    bot.vel.y += awareness.spaceY * getBotMoveAccel() * tickClock.scale;
};

var makeBotTemper = function (role) {
    role = role || aiRoles[floor(random(0, aiRoles.length))];
    var push = role === "rusher" ? 1.33 : role === "flanker" ? 1.07 : 0.86;
    var range = role === "guard" ? 1.14 : role === "flanker" ? 0.96 : 0.73;
    return {
        role: role,
        push: push + random(-0.09, 0.09),
        range: range + random(-0.06, 0.06),
        side: random(1) < 0.5 ? -1 : 1,
        roam: random(0, 360),
        delay: random(650, 1300)
    };
};
AIPlayer = function (config) {
    Entity.call(this, config);
    var traits = getSkinTraits(config.skin);
    this.graceUntilMs = tickClock.gameMs + spawnGraceMs;
    this.health = config.health !== undefined ? config.health : 100 * aiSettings.botHealthScale;
    this.maxHealth = config.maxHealth !== undefined ? config.maxHealth : this.health;
    this.maxShield = config.maxShield !== undefined ? config.maxShield : (traits.shield || baseShield) * aiSettings.botHealthScale;
    this.shield = config.shield !== undefined ? config.shield : this.maxShield;
    this.shieldRegen = config.shieldRegen !== undefined ? config.shieldRegen : ((baseShieldRegen * 2) / 3) * aiSettings.botHealthScale * (traits.shieldRegenMult || 1);
    this.healthRegenFullShield = config.healthRegenFullShield !== undefined ? config.healthRegenFullShield : ((pHpRegenFull * 2) / 3) * aiSettings.botHealthScale;
    this.healthRegenLowShield = config.healthRegenLowShield !== undefined ? config.healthRegenLowShield : ((pHpRegenLow * 2) / 3) * aiSettings.botHealthScale;
    this.weapon = config.weapon;
    this.skin = config.skin;
    this.isJedi = skinHasForce(this.skin);
    this.maxForce = config.maxForce !== undefined ? config.maxForce : forceProfile(this.skin).capacity;
    this.force = config.force !== undefined ? config.force : this.maxForce;
    this.bodyAngle = config.bodyAngle !== undefined ? config.bodyAngle : random(0, 360);
    this.counter = random(0, 100000);
    this.temper = config.temper || makeBotTemper(config.role);
    if (this.isJedi && this.temper.role === "guard") {
        this.temper = makeBotTemper(random(1) < 0.5 ? "rusher" : "flanker");
    }
    this.damageMult = 1;
    this.usesPlayerSpeed = config.walkSpeed === undefined;
    this.walkSpeed = config.walkSpeed !== undefined ? config.walkSpeed : getBotMoveAccel();
    this.team = config.team !== undefined ? config.team : 0;
    if (this.temper.role === "guard") {
        var home = currentMap && currentMap._matchClusterSpawns && currentMap._matchClusterSpawns[this.team] || this.pos;
        this.guardHome = {
            x: home.x,
            y: home.y,
            lowZ: home.z,
            zone: 220
        };
    }
    this.wallTouch = 0;
    this.gunPose = 0;
    this.wantsToShoot = false;
    this.maxDetonatorCount = config.maxDetonatorCount !== undefined ? config.maxDetonatorCount : 2;
    this.detonatorCount = config.detonatorCount !== undefined ? config.detonatorCount : this.maxDetonatorCount;
    this.maxMedkitCount = config.maxMedkitCount !== undefined ? config.maxMedkitCount : 1;
    this.medkitCount = config.medkitCount !== undefined ? config.medkitCount : this.maxMedkitCount;
    this.medkitBuffFrames = 0;
    this.inPlayerSquad = false;
    this.aimWarmup = 0;
    this.aimWarmupFrames = config.aimWarmupFrames !== undefined ? config.aimWarmupFrames : 9;
    this.aiMemory = {
        target: null,
        targetId: "",
        lastPos: new PVector(this.pos.x, this.pos.y, this.pos.z),
        stuckTimer: 0,
        recentHealth: this.health || 0,
        recentShield: this.shield || 0,
        recentTargetVitals: 0,
        action: "hold",
        previousAction: "hold",
        stateKey: "idle",
        previousStateKey: "idle",
        rewardTotal: 0,
        lastReward: 0,
        pendingReward: 0,
        exploration: aiSettings.explorationRate,
        debugLabel: "idle",
        q: {
        },

        decisionFrame: 0,
        strafeDir: this.temper.side,
        idleAngle: random(0, 360),
        idleStepTimer: floor(random(15, 45)),
        idleStepPower: 0.6,
        squadAngle: random(0, 360),
        squadDrift: random(-40, 40),
        squadStepTimer: floor(random(25, 70)),
        squadStepPower: 0.35,
        detonatorCooldown: floor(random(90, aiSettings.botDetonatorCooldown)),
        medkitCooldown: floor(random(60, 180)),
        actionAge: 0
    };
    this.getBlaster();
};
AIPlayer.prototype = Object.create(Entity.prototype);
AIPlayer.prototype.getBlaster = function () {
    if (this.isJedi) {
        if (!this.weapon || !this.weapon.isLightsaber) {
            this.weapon = new Lightsaber({
            });
        }
        return this.weapon;
    }
    var template = isB2Droid(this.skin) ? B2WristBlaster : F_11D;
    if ((!this.weapon || !this.weapon.shootFrom || (isB2Droid(this.skin) && this.weapon.weaponId !== "B2_Wrist")) && template) {
        this.weapon = new Blaster({
            weaponId: template.weaponId,
            laserSpeed: template.laserSpeed,
            damage: template.damage,
            laserRender: template.laserRender,
            fireRate: template.fireRate,
            shotsAllowed: template.shotsAllowed,
            reloadSpeed: template.reloadSpeed,
            renderFunc: template.renderFunc,
            maxDist: template.maxDist,
            accuracy: template.accuracy,
            recoil: template.recoil,
            auto: template.auto,
            renderZoom: template.renderZoom,
            scopeFov: template.scopeFov
        });
    }
    return this.weapon;
};
AIPlayer.prototype.updateBlaster = function () {
    var gun = this.getBlaster();
    if (gun && gun.tick) {
        gun.tick();
    }
    var tick = tickClock.scale;
    var reloading = gun && gun.reloadTime > 0;
    this.gunPose = lerp(this.gunPose, reloading ? 0 : this.wantsToShoot ? 1 : sqrt(this.vel.x * this.vel.x + this.vel.y * this.vel.y) > 0.12 ? 0 : 0.35, constrain((this.wantsToShoot ? 0.24 : 0.15) * tick, 0, 1));
    if (this.wantsToShoot && !reloading && this.gunPose > 0.72) {
        this.aimWarmup = min(this.aimWarmupFrames, this.aimWarmup + tick);
    } else {
        this.aimWarmup = max(0, this.aimWarmup - tick * 2);
    }
    this.wantsToShoot = false;
};
var isGridEntity = function (ent) {
    return ent && ent.pos && (ent.health !== undefined || ent.fuse !== undefined);
};
var syncEntityGrid = function (map, ent, removed) {
    var grid = map._entityGrid;
    if (!grid || !isGridEntity(ent)) {
        return;
    }
    var key = floor(ent.pos.z) + ":" + floor(ent.pos.x / grid.size) + ":" + floor(ent.pos.y / grid.size);
    var old = ent._gridMap === map && grid.buckets[ent._gridKey];
    if (old && old[ent._gridIndex] === ent) {
        if (!removed && ent._gridKey === key) {
            grid.radius = max(grid.radius, ent.colSize || hitboxSize);
            return;
        }
        var last = old.pop();
        if (last !== ent) {
            old[ent._gridIndex] = last;
            last._gridIndex = ent._gridIndex;
        }
    }
    ent._gridMap = null;
    if (removed) {
        return;
    }
    var bucket = grid.buckets[key];
    if (!bucket) {
        bucket = [];
        grid.buckets[key] = bucket;
        grid.keys.push(key);
    }
    ent._gridMap = map;
    ent._gridKey = key;
    ent._gridIndex = bucket.length;
    bucket.push(ent);
    grid.radius = max(grid.radius, ent.colSize || hitboxSize);
};
var rebuildEntityGrid = function (map) {
    var grid = map._entityGrid;
    if (!grid) {
        grid = {
            size: 256,
            buckets: {
            },
            keys: [],
            radius: 0
        };
        map._entityGrid = grid;
    }
    for (var k = grid.keys.length - 1; k >= 0; k--) {
        var key = grid.keys[k];
        if (grid.buckets[key].length === 0) {
            delete grid.buckets[key];
            grid.keys.splice(k, 1);
        } else {
            grid.buckets[key].length = 0;
        }
    }
    grid.radius = 0;
    for (var layer in map.entities) {
        if (!map.entities.hasOwnProperty(layer)) {
            continue;
        }
        var list = map.entities[layer];
        for (var i = 0; i < list.length; i++) {
            syncEntityGrid(map, list[i], false);
        }
    }
};
var queryEntityGrid = function (map, left, top, right, bottom, lowZ, highZ, output, padded) {
    output.length = 0;
    var grid = map._entityGrid;
    var padding = padded ? grid && map._entityGridActive ? grid.radius : 0 : 0;
    for (var layer = lowZ; layer <= highZ; layer++) {
        if (!grid || !map._entityGridActive) {
            var all = map.entities[layer] || [];
            for (var i = 0; i < all.length; i++) {
                var ent = all[i];
                if (!isGridEntity(ent)) {
                    continue;
                }
                var radius = padded ? ent.colSize || hitboxSize : 0;
                if (ent.pos.x + radius >= left && ent.pos.x - radius <= right && ent.pos.y + radius >= top && ent.pos.y - radius <= bottom) {
                    output.push(ent);
                }
            }
            continue;
        }
        var minX = floor((left - padding) / grid.size);
        var maxX = floor((right + padding) / grid.size);
        var minY = floor((top - padding) / grid.size);
        var maxY = floor((bottom + padding) / grid.size);
        for (var y = minY; y <= maxY; y++) {
            for (var x = minX; x <= maxX; x++) {
                var bucket = grid.buckets[layer + ":" + x + ":" + y];
                for (var n = 0; bucket && n < bucket.length; n++) {
                    var candidate = bucket[n];
                    var pad = padded ? candidate.colSize || hitboxSize : 0;
                    if (candidate.pos.x + pad >= left && candidate.pos.x - pad <= right && candidate.pos.y + pad >= top && candidate.pos.y - pad <= bottom) {
                        output.push(candidate);
                    }
                }
            }
        }
    }
    return output;
};

var aiHasLineOfSight = function (bot, target) {
    if (!bot || !target || !target.pos || (target.isPlayerTarget ? playerHealth <= 0 : target.health <= 0)) {
        return false;
    }
    if (!target.isPlayerTarget && !target._aiTargetId) {
        target._aiTargetId = "ent" + aiTargetSerial++;
    }
    var key = target.isPlayerTarget ? "player" : target._aiTargetId;
    if (!bot._sightCache || bot._sightMap !== currentMap) {
        bot._sightCache = {
        };
        bot._sightMap = currentMap;
    }
    var cached = bot._sightCache[key];
    if (cached && tickClock.gameMs < cached.untilMs && abs(cached.fromZ - bot.pos.z) < 0.25 && abs(cached.toZ - target.pos.z) < 0.25) {
        return cached.visible;
    }
    var visible = !currentMap || currentMap.traceSight(bot.pos, target.pos);
    bot._sightCache[key] = {
        visible: visible,
        untilMs: tickClock.gameMs + aiSettings.perceptionIntervalMs,
        fromZ: bot.pos.z,
        toZ: target.pos.z
    };
    return visible;
};
var perceptionQueue = {
    map: null,
    jobs: [],
    cursor: 0,
    maxUnits: 96,
    budgetMs: 4
};
var emptyPerception = function () {
    return {
        nearestTarget: null,
        visibleTarget: null,
        ally: null,
        crowdingCombat: null,
        crowdingIdle: null,
        detonator: null,
        nearbyAllies: [],
        allyCount: 0,
        nearbyEnemyCount: 0
    };
};
getAIPerception = function (bot) {
    var layer = floor(bot.pos.z);
    var cached = bot._perceptionMap === currentMap && bot._perceptionLayer === layer ? bot._perception : null;
    if (cached && tickClock.gameMs < bot._perceptionUntilMs) {
        return cached;
    }
    if (perceptionQueue.map !== currentMap) {
        for (var q = 0; q < perceptionQueue.jobs.length; q++) {
            perceptionQueue.jobs[q].bot._perceptionJob = null;
        }
        perceptionQueue.map = currentMap;
        perceptionQueue.jobs.length = 0;
        perceptionQueue.cursor = 0;
    }
    if (!bot._perceptionJob) {
        var job = {
            bot: bot,
            map: currentMap,
            layer: layer,
            view: null
        };
        bot._perceptionJob = job;
        perceptionQueue.jobs.push(job);
    }
    return cached || (bot._emptyPerception || (bot._emptyPerception = emptyPerception()));
};
var runPerceptionJobs = function (map) {
    var queue = perceptionQueue;
    if (queue.map !== map || !queue.jobs.length) {
        return;
    }
    rebuildEntityGrid(map);
    var deadline = millis() + queue.budgetMs;
    map._entityGridActive = true;
    try {
        for (var unit = 0; unit < queue.maxUnits && queue.jobs.length && millis() < deadline; unit++) {
            queue.cursor %= queue.jobs.length;
            var job = queue.jobs[queue.cursor];
            var bot = job.bot;
            var bucket = map._entityGrid.buckets[bot._gridKey];
            var invalid = bot._perceptionJob !== job || job.map !== map || bot.health <= 0 || floor(bot.pos.z) !== job.layer || bot._gridMap !== map || !bucket || bucket[bot._gridIndex] !== bot;
            if (invalid || stepPerceptionJob(job)) {
                if (bot._perceptionJob === job) {
                    bot._perceptionJob = null;
                }
                queue.jobs.splice(queue.cursor, 1);
            } else {
                queue.cursor++;
            }
        }
    } finally {
        map._entityGridActive = false;
    }
};

var stepPerceptionJob = function (job) {
    var bot = job.bot;
    var layer = floor(bot.pos.z);
    var now = tickClock.gameMs;
    var awareness = getBotAwareness(bot);
    if (!job.view) {
        var view = {
            nearestTarget: null,
            visibleTarget: null,
            ally: null,
            crowdingCombat: null,
            crowdingIdle: null,
            detonator: null,
            nearbyAllies: [],
            allyCount: 0,
            nearbyEnemyCount: 0
        };
        bot._sightCache = {
        };
        var candidates = [];
        var allyDist = 900;
        var combatDist = aiSettings.botSpacingRange;
        var idleDist = aiSettings.idleSpreadRange;
        var detonatorDist = aiSettings.detonatorAvoidRange;
        if (playerHealth > 0 && playerTeam === bot.team && abs(playerPos.z - bot.pos.z) < 0.3 && dist(bot.pos.x, bot.pos.y, playerPos.x, playerPos.y) < aiSettings.botSpacingRange * 2) {
            view.nearbyAllies.push({
                isPlayerTarget: true,
                pos: playerPos,
                vel: playerVel,
                colSize: hitboxSize,
                health: playerHealth
            });
        }
        if (playerHealth > 0 && playerTeam !== bot.team && (!inSaberDuel(null) || bot === duel.foe)) {
            var playerDist = dist(bot.pos.x, bot.pos.y, playerPos.x, playerPos.y);
            if (playerDist < aiSightRange(bot)) {
                candidates.push({
                    distance: playerDist,
                    target: {
                        isPlayerTarget: true,
                        team: playerTeam,
                        pos: playerPos,
                        health: playerHealth,
                        shield: playerShield,
                        colSize: hitboxSize
                    }
                });
            }
        }

        var range = max(max(aiSightRange(bot), 900), max(aiSettings.botSpacingRange * 2, max(aiSettings.idleSpreadRange, aiSettings.detonatorAvoidRange)));
        var list = queryEntityGrid(currentMap, bot.pos.x - range, bot.pos.y - range, bot.pos.x + range, bot.pos.y + range, max(currentMap.killZ, currentMap.bottomZ), currentMap.topZ + 1, [], false);
        job.view = view;
        job.candidates = candidates;
        job.list = list;
        job.index = 0;
        job.sightIndex = 0;
        job.allyDist = allyDist;
        job.combatDist = combatDist;
        job.idleDist = idleDist;
        job.detonatorDist = detonatorDist;
        job.visibleDistance = 999999;
        return false;
    }
    var view = job.view;
    var candidates = job.candidates;
    var allyDist = job.allyDist;
    var combatDist = job.combatDist;
    var idleDist = job.idleDist;
    var detonatorDist = job.detonatorDist;
    var list = job.list;
    var stop = min(list.length, job.index + 12);
    for (var index = job.index; index < stop; index++) {
        var ent = list[index];
        if (!ent || ent === bot || !ent.pos) {
            continue;
        }
        var alive = ent.health > 0;
        var explosive = ent.fuse !== undefined && ent.armDelay !== undefined && ent.explosionMax !== undefined && ent.explosionDamageMax !== undefined && !ent.damageDone;
        if (!alive && !explosive) {
            continue;
        }
        var distance = dist(bot.pos.x, bot.pos.y, ent.pos.x, ent.pos.y);
        if (alive) {
            if (ent.team !== bot.team && distance < aiSightRange(bot) && !duelTarget(ent)) {
                performanceStats.targetCandidates++;
                candidates.push({
                    distance: distance,
                    target: ent
                });
            }
            if (abs(ent.pos.z - bot.pos.z) < 0.3) {
                if (ent.team === bot.team) {
                    if (distance < aiSettings.botSpacingRange * 2) {
                        view.nearbyAllies.push(ent);
                    }
                    if (distance <= 360) {
                        view.allyCount++;
                    }
                    if (distance < allyDist) {
                        view.ally = ent;
                        allyDist = distance;
                    }
                    if (distance < combatDist) {
                        view.crowdingCombat = ent;
                        combatDist = distance;
                    }
                    if (distance < idleDist) {
                        view.crowdingIdle = ent;
                        idleDist = distance;
                    }
                }
            }
        }
        if (explosive && distance < detonatorDist && abs(ent.pos.z - bot.pos.z) < 1.5 && (distance < 100 || aiCanObserve(bot, ent))) {
            view.detonator = ent;
            detonatorDist = distance;
        }
    }
    job.index = stop;
    job.allyDist = allyDist;
    job.combatDist = combatDist;
    job.idleDist = idleDist;
    job.detonatorDist = detonatorDist;
    if (stop < list.length) {
        return false;
    }
    var visibleDistance = job.visibleDistance;
    var sightStop = min(candidates.length, job.sightIndex + 1);
    for (var candidateIndex = job.sightIndex; candidateIndex < sightStop; candidateIndex++) {
        var candidate = candidates[candidateIndex];
        var target = candidate.target;
        if (!aiCanObserve(bot, target) || !aiHasLineOfSight(bot, target)) {
            continue;
        }
        var key = getAITargetKey(target);
        var track = awareness.tracks[key];
        if (!track || now - track.lastSeenAt > 300) {
            var delay = track && now - track.lastSeenAt < aiSettings.targetMemoryMs ? random(140, 250) : random(aiSettings.reactionMinMs, aiSettings.reactionMaxMs) * awareness.reactionScale + candidate.distance * 0.22;
            track = {
                noticeAt: now + delay,
                lastSeenAt: now,
                confirmed: false
            };
            awareness.tracks[key] = track;
        }
        track.lastSeenAt = now;
        if (now < track.noticeAt) {
            continue;
        }
        track.confirmed = true;
        if (candidate.distance <= 420) {
            view.nearbyEnemyCount++;
        }
        var preference = candidate.distance * (key === awareness.focusKey ? 0.7 : 1);
        if (preference < visibleDistance) {
            view.visibleTarget = target;
            visibleDistance = preference;
        }
    }
    job.sightIndex = sightStop;
    job.visibleDistance = visibleDistance;
    if (sightStop < candidates.length) {
        return false;
    }
    if (view.visibleTarget) {
        var seen = view.visibleTarget;
        awareness.focusKey = getAITargetKey(seen);
        awareness.contact = {
            isMemoryTarget: true,
            _aiTargetId: awareness.focusKey,
            team: seen.team,
            pos: {
                x: seen.pos.x,
                y: seen.pos.y,
                z: seen.pos.z
            },
            health: seen.health,
            shield: seen.shield || 0,
            isSaberThreat: aiTargetUsesSaber(seen),
            until: now + aiSettings.targetMemoryMs
        };
        view.nearestTarget = seen;
    } else if (awareness.contact && now < awareness.contact.until) {
        view.nearestTarget = awareness.contact;
    }
    for (var trackKey in awareness.tracks) {
        if (now - awareness.tracks[trackKey].lastSeenAt > aiSettings.targetMemoryMs) {
            delete awareness.tracks[trackKey];
        }
    }
    var firstScan = !bot._perception;
    bot._perception = view;
    bot._perceptionMap = currentMap;
    bot._perceptionLayer = layer;
    bot._perceptionUntilMs = tickClock.gameMs + (firstScan ? 50 + (bot.counter % 50) : aiSettings.perceptionIntervalMs);
    performanceStats.perceptionScans++;
    return true;
};

aiCanSeeTarget = function (bot, target) {
    if (!target || !aiCanObserve(bot, target)) {
        return false;
    }
    var track = getBotAwareness(bot).tracks[getAITargetKey(target)];
    return !!(track && track.confirmed && tickClock.gameMs - track.lastSeenAt <= aiSettings.perceptionIntervalMs * 1.5 && aiHasLineOfSight(bot, target));
};
var aiTraceAllies = function (bot, target) {
    if (!bot || !target || !target.pos || !currentMap || !currentMap.entities) {
        return false;
    }
    var zMin = floor(min(bot.pos.z, target.pos.z) - shotZReach);
    var zMax = floor(max(bot.pos.z, target.pos.z) + shotZReach);
    var allyOutput = bot._allyQueryOutput || (bot._allyQueryOutput = []);
    for (var z = zMin; z <= zMax; z++) {
        var list = queryEntityGrid(currentMap, min(bot.pos.x, target.pos.x), min(bot.pos.y, target.pos.y), max(bot.pos.x, target.pos.x), max(bot.pos.y, target.pos.y), z, z, allyOutput, true);
        if (!list) {
            continue;
        }
        for (var e = 0; e < list.length; e++) {
            var ent = list[e];
            if (!ent || ent === bot || ent === target || !ent.pos || ent.health === undefined || ent.health <= 0 || ent.team !== bot.team) {
                continue;
            }
            var t = Laser.prototype.segmentActorHit(bot.pos, target.pos, ent.pos, (ent.colSize || hitboxSize) * 0.95);
            if (t !== null && t < 0.98) {
                return true;
            }
        }
    }
    return false;
};
aiSegHitsAlly = function (bot, target) {
    var cache = bot._friendlyCheck;
    if (cache && cache.target === target && tickClock.gameMs < cache.untilMs) {
        return cache.blocked;
    }
    var blocked = aiTraceAllies(bot, target);
    bot._friendlyCheck = {
        target: target,
        blocked: blocked,
        untilMs: tickClock.gameMs + aiSettings.friendlyCheckMs
    };
    return blocked;
};
var aiFindNearestEnemy = function (bot, onlyVisible) {
    var view = getAIPerception(bot);
    var target = onlyVisible ? view.visibleTarget : view.nearestTarget;
    if (!target || (target.isPlayerTarget ? playerHealth <= 0 : target.health <= 0)) {
        return null;
    }
    if (target.isPlayerTarget) {
        target.pos = playerPos;
        target.health = playerHealth;
        target.shield = playerShield;
    }
    return target;
};
var aiCanThrowDetonator = function (bot, target, visible, targetDist) {
    if (duelTarget(target)) {
        return false;
    }
    if (!bot || !canAttack(bot) || !bot.aiMemory || !target || !target.pos || !visible || !Detonator) {
        return false;
    }
    if ((bot.detonatorCount || 0) <= 0) {
        return false;
    }
    if (bot.aiMemory.detonatorCooldown > 0) {
        return false;
    }
    if (targetDist < aiSettings.botDetonatorMinRange || targetDist > aiSettings.botDetonatorMaxRange || aiQuietApproach(bot, targetDist)) {
        return false;
    }
    if (target.isMemoryTarget || !aiCanSeeTarget(bot, target) || abs(angleDifference(atan2(target.pos.x - bot.pos.x, -(target.pos.y - bot.pos.y)), bot.bodyAngle)) > aiSettings.aimThrowTolerance) {
        return false;
    }
    if (aiSegHitsAlly(bot, target)) {
        return false;
    }
    var allyNearTarget = false;
    if (currentMap && currentMap.entities) {
        var allyNearMinZ = max(currentMap.killZ, floor(target.pos.z || bot.pos.z) - 2);
        var allyNearMaxZ = min(currentMap.topZ + 1, floor(target.pos.z || bot.pos.z) + 2);
        for (var allyNearZ = allyNearMinZ; allyNearZ <= allyNearMaxZ && !allyNearTarget; allyNearZ++) {
            var allyNearList = currentMap.entities[allyNearZ];
            if (!allyNearList) {
                continue;
            }
            for (var allyNearE = 0; allyNearE < allyNearList.length; allyNearE++) {
                var allyNearEnt = allyNearList[allyNearE];
                if (!allyNearEnt || allyNearEnt === bot || !allyNearEnt.pos || allyNearEnt.health <= 0 || allyNearEnt.team !== bot.team) {
                    continue;
                }
                if (dist(target.pos.x, target.pos.y, allyNearEnt.pos.x, allyNearEnt.pos.y) < 280) {
                    allyNearTarget = true;
                    break;
                }
            }
        }
    }
    if (allyNearTarget) {
        return false;
    }
    return true;
};
var aiIdleSpread = function (bot, crowdingAlly) {
    if (!bot.aiMemory) {
        return;
    }
    if (crowdingAlly && crowdingAlly.pos) {
        aiMoveAway(bot, crowdingAlly.pos, 0.45);
        return;
    }
    bot.aiMemory.idleStepTimer -= tickClock.scale;
    if (bot.aiMemory.idleStepTimer <= 0) {
        bot.aiMemory.idleAngle += random(-95, 95);
        bot.aiMemory.idleStepPower = random(1) < 0.4 ? 0 : random(0.3, 0.7);
        bot.aiMemory.idleStepTimer = floor(random(75, 160));
    }
    if (bot.aiMemory.idleStepPower === 0) {
        return;
    }
    var idleAccel = min(bot.walkSpeed * (0.26 + bot.aiMemory.idleStepPower * 0.28) * getSkinTraits(bot.skin).move, getBotMoveAccel()) * tickClock.scale;
    bot.vel.x += cos(bot.aiMemory.idleAngle) * idleAccel;
    bot.vel.y += sin(bot.aiMemory.idleAngle) * idleAccel;
};
var aiRunLearningBot = function (bot) {
    if (!bot.aiMemory) {
        bot.aiMemory = {
            target: null,
            targetId: "",
            lastPos: new PVector(bot.pos.x, bot.pos.y, bot.pos.z),
            stuckTimer: 0,
            recentHealth: bot.health || 0,
            recentShield: bot.shield || 0,
            recentTargetVitals: 0,
            action: "hold",
            previousAction: "hold",
            stateKey: "idle",
            previousStateKey: "idle",
            rewardTotal: 0,
            lastReward: 0,
            pendingReward: 0,
            exploration: aiSettings.explorationRate,
            debugLabel: "idle",
            q: {
            },

            decisionFrame: 0,
            strafeDir: bot.temper ? bot.temper.side : random() < 0.5 ? -1 : 1,
            idleAngle: random(0, 360),
            idleStepTimer: floor(random(15, 45)),
            idleStepPower: 0.6,
            squadAngle: random(0, 360),
            squadDrift: random(-40, 40),
            squadStepTimer: floor(random(25, 70)),
            squadStepPower: 0.35,
            detonatorCooldown: floor(random(90, aiSettings.botDetonatorCooldown)),
            medkitCooldown: floor(random(60, 180)),
            actionAge: 0
        };
    }
    var memory = bot.aiMemory;
    if (memory.detonatorCooldown > 0) {
        memory.detonatorCooldown = max(0, memory.detonatorCooldown - tickClock.scale);
    }
    var moved = dist(bot.pos.x, bot.pos.y, memory.lastPos.x, memory.lastPos.y);
    if (moved < 1.25 && sqrt(bot.vel.x * bot.vel.x + bot.vel.y * bot.vel.y) < 0.25) {
        memory.stuckTimer += tickClock.scale;
    } else {
        memory.stuckTimer = max(0, memory.stuckTimer - 2 * tickClock.scale);
    }
    memory.lastPos.x = bot.pos.x;
    memory.lastPos.y = bot.pos.y;
    memory.lastPos.z = bot.pos.z;
    var target = aiFindNearestEnemy(bot, true);
    var visible = !!target;
    if (!target) {
        target = aiFindNearestEnemy(bot, false);
    }
    var targetId = "";
    if (target) {
        if (target.isPlayerTarget) {
            targetId = "player";
        } else {
            if (!target._aiTargetId) {
                target._aiTargetId = "ent" + aiTargetSerial;
                aiTargetSerial++;
            }
            targetId = target._aiTargetId;
        }
    }
    if (target && !visible) {
        visible = aiCanSeeTarget(bot, target);
    }
    var view = getAIPerception(bot);
    var allyCount = view.allyCount;
    var nearbyEnemyCount = view.nearbyEnemyCount;
    var ally = view.ally && view.ally.health > 0 ? view.ally : null;
    var crowdingAlly = target ? view.crowdingCombat : view.crowdingIdle;
    if (crowdingAlly && crowdingAlly.health <= 0) {
        crowdingAlly = null;
    }
    var detonator = view.detonator && !view.detonator.damageDone ? view.detonator : null;
    var targetDist = target && target.pos ? dist(bot.pos.x, bot.pos.y, target.pos.x, target.pos.y) : 999999;
    var targetSaber = aiTargetUsesSaber(target);
    var role = bot.temper.role;
    var quiet = target && aiQuietApproach(bot, targetDist);
    var healthRatio = constrain((bot.health || 0) / max(1, bot.maxHealth || 100), 0, 1);
    var danger = 0;
    danger += (1 - constrain(((bot.health || 0) + (bot.shield || 0)) / max(1, (bot.maxHealth || 100) + (bot.maxShield || 0)), 0, 1)) * 2.3;
    danger += (1 - healthRatio) * 1.35;
    if (target && target.pos) {
        var dangerTargetD = dist(bot.pos.x, bot.pos.y, target.pos.x, target.pos.y);
        if (visible) {
            danger += 0.8;
        }
        if (dangerTargetD < botCombatRange(bot) * 0.55) {
            danger += 0.9;
        }
        if (targetSaber && dangerTargetD < aiSettings.lightsaberFearRange) {
            danger += 2.2 * constrain(1 - dangerTargetD / aiSettings.lightsaberFearRange, 0, 1);
        }
    }
    if (allyCount <= 0) {
        danger += 0.35;
    }
    if (nearbyEnemyCount > allyCount) {
        danger += (nearbyEnemyCount - allyCount) * 0.42;
    } else if (allyCount > nearbyEnemyCount) {
        danger -= min(0.45, (allyCount - nearbyEnemyCount) * 0.12);
    }
    if (bot.aiMemory && bot.aiMemory.stuckTimer > 25) {
        danger += 0.5;
    }
    if (detonator && detonator.pos) {
        danger += 1.1 * constrain(1 - dist(bot.pos.x, bot.pos.y, detonator.pos.x, detonator.pos.y) / aiSettings.detonatorAvoidRange, 0, 1);
    }
    var squadPrioPlayer = false;
    if (bot && bot.inPlayerSquad) {
        var playerPrioDist = dist(bot.pos.x, bot.pos.y, playerPos.x, playerPos.y);
        if (target && visible && targetDist < aiSettings.closeThreatRange) {
            squadPrioPlayer = false;
        } else if (playerPrioDist > aiSettings.squadPriorityRange) {
            squadPrioPlayer = true;
        } else if (playerPrioDist > aiSettings.squadFollowComfortRange && (!target || targetDist > botCombatRange(bot) * 0.85)) {
            squadPrioPlayer = true;
        }
    }
    if (squadPrioPlayer) {
        target = null;
        targetId = "";
        visible = false;
        targetDist = 999999;
    }
    var stateRangeBucket = "none";
    if (target) {
        var idealRange = targetSaber ? aiSettings.lightsaberKeepAwayRange : botCombatRange(bot);
        stateRangeBucket = targetDist < idealRange * 0.6 ? "close" : targetDist < idealRange * 1.35 ? "ideal" : "far";
    }
    var stateKey = ((bot.health || 0) + (bot.shield || 0) < ((bot.maxHealth || 100) + (bot.maxShield || 0)) * 0.45 ? "low" : "ok") + "|" + stateRangeBucket + "|" + (visible ? "seen" : "hidden") + "|" + (danger > 1.7 ? "danger" : "safe") + "|" + (nearbyEnemyCount > allyCount ? "pressured" : allyCount > nearbyEnemyCount ? "supported" : allyCount > 0 ? "paired" : "solo") + "|" + (bot.aiMemory && bot.aiMemory.stuckTimer > 25 ? "stuck" : "free") + "|" + (targetSaber ? "saber" : "normal");
    var reward = 0.01;
    reward += ((bot.health || 0) + (bot.shield || 0) - (memory.recentHealth + memory.recentShield)) * 0.012;
    if ((bot.health || 0) <= 0) {
        reward -= 8;
    }
    if (target) {
        var rewardVitals = target.isPlayerTarget ? max(0, playerHealth) + max(0, playerShield) : max(0, target.health || 0) + max(0, target.shield || 0);
        var damageDone = memory.recentTargetVitals - rewardVitals;
        var rewardTargetId = "";
        if (target.isPlayerTarget) {
            rewardTargetId = "player";
        } else {
            if (!target._aiTargetId) {
                target._aiTargetId = "ent" + aiTargetSerial;
                aiTargetSerial++;
            }
            rewardTargetId = target._aiTargetId;
        }
        if (memory.targetId === rewardTargetId && damageDone > 0) {
            reward += damageDone * 0.08;
        }
        if (memory.targetId === rewardTargetId && memory.recentTargetVitals > 0 && rewardVitals <= 0) {
            reward += 8;
        }
        memory.recentTargetVitals = rewardVitals;
    } else {
        memory.recentTargetVitals = 0;
        reward -= 0.02;
    }
    if (visible && target) {
        reward += 0.04;
    }
    if (allyCount > 0) {
        reward += 0.025;
    }
    if (crowdingAlly && !target) {
        reward -= 0.08;
    }
    if (detonator && detonator.pos) {
        reward -= aiSettings.detonatorPenalty * constrain(1 - dist(bot.pos.x, bot.pos.y, detonator.pos.x, detonator.pos.y) / aiSettings.detonatorAvoidRange, 0, 1);
    }
    if (memory.stuckTimer > 25) {
        reward -= 0.08;
    }
    if (memory.pendingReward) {
        reward += memory.pendingReward;
        memory.pendingReward = 0;
    }
    memory.recentHealth = bot.health || 0;
    memory.recentShield = bot.shield || 0;
    reward *= aiSettings.rewardScale;
    memory.lastReward = reward;
    memory.rewardTotal += reward;
    if (memory.previousStateKey && memory.previousAction) {
        if (!memory.q[memory.previousStateKey]) {
            memory.q[memory.previousStateKey] = {
            };
        }
        if (memory.q[memory.previousStateKey][memory.previousAction] === undefined) {
            memory.q[memory.previousStateKey][memory.previousAction] = 0;
        }
        var oldQ = memory.q[memory.previousStateKey][memory.previousAction];
        var future = -999999;
        for (var qIndex = 0; qIndex < aiTacticalActions.length; qIndex++) {
            if (!memory.q[stateKey]) {
                memory.q[stateKey] = {
                };
            }
            if (memory.q[stateKey][aiTacticalActions[qIndex]] === undefined) {
                memory.q[stateKey][aiTacticalActions[qIndex]] = 0;
            }
            future = max(future, memory.q[stateKey][aiTacticalActions[qIndex]]);
        }
        memory.q[memory.previousStateKey][memory.previousAction] = oldQ + aiSettings.learningRate * (reward + aiSettings.discount * future - oldQ);
    }
    memory.decisionFrame -= tickClock.scale;
    var detonatorDist = detonator && detonator.pos ? dist(bot.pos.x, bot.pos.y, detonator.pos.x, detonator.pos.y) : 999999;
    if (detonator && detonatorDist < aiSettings.detonatorUrgentRange) {
        memory.action = "avoidDetonator";
        memory.decisionFrame = max(1, floor(aiSettings.decisionFrames / 2));
    } else if (targetSaber && targetDist < aiSettings.lightsaberKeepAwayRange) {
        memory.action = "retreat";
        memory.decisionFrame = max(1, floor(aiSettings.decisionFrames / 2));
    } else if (squadPrioPlayer) {
        memory.action = "regroup";
        memory.decisionFrame = max(1, floor(aiSettings.decisionFrames / 2));
    } else if (!target && crowdingAlly) {
        memory.action = "spreadOut";
        memory.decisionFrame = aiSettings.decisionFrames;
    } else if (memory.decisionFrame <= 0 || memory.targetId !== targetId || memory.stuckTimer > 35) {
        memory.previousStateKey = stateKey;
        memory.previousAction = memory.action;
        if (random() < memory.exploration) {
            var choices = target ? targetDist > botCombatRange(bot) * 1.3 ? ["advance", "chaseEnemy", "strafe"] : visible ? ["hold", "shootEnemy", "strafe"] : ["advance", "hold"] : ["hold", "regroup"];
            memory.action = choices[floor(random(0, choices.length))];
        } else {
            var bestAction = "hold";
            var bestScore = -999999;
            for (var chooseIndex = 0; chooseIndex < aiTacticalActions.length; chooseIndex++) {
                var action = aiTacticalActions[chooseIndex];
                if (!memory.q[stateKey]) {
                    memory.q[stateKey] = {
                    };
                }
                if (memory.q[stateKey][action] === undefined) {
                    memory.q[stateKey][action] = 0;
                }
                var preferred = botCombatRange(bot);
                var score = memory.q[stateKey][action] + (action === memory.action ? 0.65 : 0);
                var saberThreat = targetSaber && targetDist < aiSettings.lightsaberFearRange;
                var supportAdv = allyCount - nearbyEnemyCount;
                var lowHpPress = 1 - healthRatio;
                if (action === "unstuck") {
                    score += memory.stuckTimer > 25 ? 4 : -2;
                } else if (action === "avoidDetonator") {
                    score += detonator ? 2.1 : -4;
                    score += danger > 1.9 ? 0.6 : 0;
                } else if (action === "spreadOut") {
                    score += crowdingAlly ? 3.4 : -1.2;
                    score += !target ? 1.1 : -0.2;
                } else if (action === "throwDetonator") {
                    score += target && visible ? 1.8 : -4;
                    score += targetDist >= aiSettings.botDetonatorMinRange && targetDist <= aiSettings.botDetonatorMaxRange ? 2.2 : -2.5;
                    score += saberThreat ? 0.9 : 0;
                } else if (action === "shootEnemy") {
                    score += target && visible ? 3 : -3;
                    score += targetDist < preferred * 1.35 ? 1 : -1.5;
                    score += saberThreat ? 1.1 : 0;
                } else if (action === "chaseEnemy") {
                    score += target ? 1.2 : -2;
                    score += targetDist > preferred * 1.2 ? 2.2 : -0.6;
                    score -= saberThreat ? 3.2 : 0;
                } else if (action === "advance") {
                    score += target ? 0.9 : -0.3;
                    score += targetDist > preferred ? 1 : -0.4;
                    score -= saberThreat ? 2.4 : 0;
                } else if (action === "retreat") {
                    score += danger > 1.5 ? 2.7 : -1.1;
                    score += targetDist < preferred * 0.65 ? 1.3 : 0;
                    score += saberThreat ? 3.8 * constrain(1 - targetDist / aiSettings.lightsaberFearRange, 0, 1) : 0;
                } else if (action === "strafe") {
                    score += target && visible ? 1.5 : -0.4;
                    score += targetDist < preferred * 1.5 ? 0.5 : 0;
                    score += saberThreat ? 1.2 : 0;
                } else if (action === "regroup") {
                    score += allyCount <= 0 ? 1.6 : -0.4;
                    score += danger > 1.2 ? 0.9 : 0;
                } else if (action === "hold") {
                    score += target && visible && targetDist >= preferred * 0.7 && targetDist <= preferred * 1.3 ? 1.2 : -0.2;
                    score += saberThreat && targetDist > aiSettings.lightsaberKeepAwayRange ? 0.5 : 0;
                }
                var bold = bot.temper ? bot.temper.push - 1 : 0;
                if (action === "advance" || action === "chaseEnemy") {
                    score += bold * 1.5;
                    if (target && targetDist > preferred) {
                        score += role === "rusher" ? 2.8 : quiet || role === "flanker" ? 2.1 : 0;
                    }
                }
                if (action === "retreat" || action === "hold") {
                    score -= bold;
                }
                if (quiet && (action === "shootEnemy" || action === "hold" || action === "strafe")) {
                    score -= 2.5;
                }
                if (action === "retreat") {
                    score += lowHpPress * 3.1;
                    score += supportAdv < 0 ? min(2.8, abs(supportAdv) * 0.9) : 0;
                } else if (action === "regroup") {
                    score += lowHpPress * 2.2;
                    score += supportAdv < 0 ? min(2.4, abs(supportAdv) * 0.8) : 0;
                } else if (action === "shootEnemy") {
                    score += supportAdv > 0 ? min(1.8, supportAdv * 0.45) : 0;
                    score -= lowHpPress * 1.5;
                    score -= supportAdv < 0 ? min(2.1, abs(supportAdv) * 0.7) : 0;
                } else if (action === "hold") {
                    score += supportAdv > 0 && healthRatio > 0.5 ? min(1.2, supportAdv * 0.35) : 0;
                    score -= supportAdv < 0 && healthRatio < 0.35 ? 1.2 : 0;
                } else if (action === "advance" || action === "chaseEnemy") {
                    score += supportAdv > 0 && healthRatio > 0.62 ? min(1.9, supportAdv * 0.55) : 0;
                    score -= lowHpPress * (action === "chaseEnemy" ? 2.3 : 1.8);
                    score -= supportAdv < 0 ? min(2.6, abs(supportAdv) * 0.85) : 0;
                } else if (action === "strafe") {
                    score += supportAdv >= 0 ? min(0.9, allyCount * 0.18) : 0;
                    score += healthRatio < 0.55 ? 0.6 : 0;
                } else if (action === "throwDetonator") {
                    score += supportAdv < 0 ? min(1.1, abs(supportAdv) * 0.35) : 0;
                    score += lowHpPress * 0.7;
                }
                if (bot.inPlayerSquad && target && visible) {
                    if (action === "shootEnemy") {
                        score += aiSettings.squadShootBias;
                    } else if (action === "strafe" || action === "hold") {
                        score += aiSettings.squadShootBias * 0.35;
                    }
                }
                if (action === "throwDetonator" && !aiCanThrowDetonator(bot, target, visible, targetDist)) {
                    score -= 6;
                }
                if (score > bestScore) {
                    bestScore = score;
                    bestAction = action;
                }
            }
            memory.action = bestAction;
        }
        if (memory.action !== "throwDetonator" && aiCanThrowDetonator(bot, target, visible, targetDist) && random() < aiSettings.botDetonatorThrowChance) {
            memory.action = "throwDetonator";
        }
        memory.decisionFrame = aiSettings.decisionFrames * random(0.85, 1.6);
        memory.actionAge = 0;
        if (memory.targetId !== targetId) {
            memory.recentTargetVitals = target ? target.isPlayerTarget ? max(0, playerHealth) + max(0, playerShield) : max(0, target.health || 0) + max(0, target.shield || 0) : 0;
        }
    }
    memory.target = target;
    memory.targetId = targetId;
    memory.stateKey = stateKey;
    memory.actionAge += tickClock.scale;
    memory.debugLabel = memory.action + " r:" + round(memory.rewardTotal);
    if (!target && !crowdingAlly && ally && dist(bot.pos.x, bot.pos.y, ally.pos.x, ally.pos.y) > aiSettings.idleSpreadRange * 2.2) {
        memory.action = "regroup";
    }
    if (squadPrioPlayer) {
        aiFollowSquad(bot, crowdingAlly);
    } else if (detonatorDist >= aiSettings.detonatorUrgentRange && aiGuardPosition(bot, target)) {
        if (visible) {
            aiFireBurst(bot, target);
        }
    } else {
        var appliedAction = memory.action;
        var awareness = getBotAwareness(bot);
        if (awareness.blockedSince !== null && tickClock.gameMs - awareness.blockedSince > 350 && target && visible) {
            appliedAction = "strafe";
        }
        var actionTargetPos = target && target.pos ? target.pos : null;
        var actionTargetDist = actionTargetPos ? dist(bot.pos.x, bot.pos.y, actionTargetPos.x, actionTargetPos.y) : 999999;
        if (detonator && detonator.pos && dist(bot.pos.x, bot.pos.y, detonator.pos.x, detonator.pos.y) < aiSettings.detonatorUrgentRange) {
            aiMoveAway(bot, detonator.pos, 1.35);
        }
        if (targetSaber && actionTargetDist < aiSettings.lightsaberKeepAwayRange) {
            aiMoveAway(bot, actionTargetPos, 1.55);
        }
        if (appliedAction === "avoidDetonator" && detonator && detonator.pos) {
            aiMoveAway(bot, detonator.pos, 1.8);
        } else if (appliedAction === "spreadOut") {
            aiIdleSpread(bot, crowdingAlly);
        } else if (appliedAction === "advance" && actionTargetPos && !(targetSaber && actionTargetDist < aiSettings.lightsaberFearRange)) {
            aiCombatAdvance(bot, target, 0.75);
        } else if (appliedAction === "chaseEnemy" && actionTargetPos && !(targetSaber && actionTargetDist < aiSettings.lightsaberFearRange)) {
            aiCombatAdvance(bot, target, 1.15);
        } else if (appliedAction === "retreat" && actionTargetPos) {
            aiMoveAway(bot, actionTargetPos, targetSaber ? 1.55 : 1.1);
        } else if (appliedAction === "strafe" && actionTargetPos) {
            var actionDx = actionTargetPos.x - bot.pos.x;
            var actionDy = actionTargetPos.y - bot.pos.y;
            var actionD = sqrt(actionDx * actionDx + actionDy * actionDy);
            if (actionD > 0.001) {
                var strafeAccel = min(bot.walkSpeed * 0.4 * getSkinTraits(bot.skin).move, getBotMoveAccel()) * tickClock.scale;
                bot.vel.x += (-actionDy / actionD) * strafeAccel * memory.strafeDir;
                bot.vel.y += (actionDx / actionD) * strafeAccel * memory.strafeDir;
            }
            if (tickClock.gameMs >= awareness.strafeUntil) {
                if (random(1) < 0.65) {
                    memory.strafeDir *= -1;
                }
                awareness.strafeUntil = tickClock.gameMs + random(1200, 2400);
            }
        } else if (appliedAction === "regroup" && ally && ally.pos) {
            aiMoveToward(bot, ally.pos, 0.9);
        } else if (appliedAction === "unstuck") {
            var escapeAngle = bot.bodyAngle + 90 + memory.strafeDir * 70;
            var escapeAccel = min(bot.walkSpeed * 1.4 * getSkinTraits(bot.skin).move, getBotMoveAccel()) * tickClock.scale;
            bot.vel.x += cos(escapeAngle) * escapeAccel;
            bot.vel.y += sin(escapeAngle) * escapeAccel;
        }
        if (appliedAction === "throwDetonator" && target && target.pos) {
            var throwDist = dist(bot.pos.x, bot.pos.y, target.pos.x, target.pos.y);
            if (aiCanThrowDetonator(bot, target, visible, throwDist) && currentMap && currentMap.entities) {
                var throwLayer = constrain(floor(bot.pos.z), currentMap.killZ, currentMap.topZ + 1);
                var throwRot = atan2(target.pos.y - bot.pos.y, target.pos.x - bot.pos.x);
                var throwPower = constrain(throwDist / 28, 10, 26);
                var detConfig = {
                    x: bot.pos.x,
                    y: bot.pos.y,
                    z: bot.pos.z + 1,
                    xVel: cos(throwRot) * throwPower,
                    yVel: sin(throwRot) * throwPower,
                    zVel: 0.1,
                    r: random(-4, 4),
                    explosionDamageMax: 150 * aiSettings.botDamageScale,
                    owner: bot
                };
                if (!currentMap.entities[throwLayer]) {
                    currentMap.entities[throwLayer] = [];
                }
                currentMap.entities[throwLayer].push(getPoolDetonator(detConfig));
                bot.detonatorCount = max(0, (bot.detonatorCount || 0) - 1);
                bot.aiMemory.detonatorCooldown = aiSettings.botDetonatorCooldown;
                bot.aiMemory.pendingReward -= 0.08;
            }
        }
        var charging = role === "rusher" && (appliedAction === "advance" || appliedAction === "chaseEnemy") && actionTargetDist < botCombatRange(bot) * 1.65;
        if ((charging || appliedAction === "shootEnemy" || appliedAction === "hold" || appliedAction === "strafe" || (appliedAction === "retreat" && actionTargetDist < aiSettings.closeThreatRange)) && target && visible) {
            aiFireBurst(bot, target);
        }
        if (!target && !crowdingAlly) {
            aiIdleSpread(bot, null);
        }
    }
    if (bot.weapon && bot.weapon.weaponId === "Sniper" && target && target.pos) {
        var sniperDx = target.pos.x - bot.pos.x;
        var sniperDy = target.pos.y - bot.pos.y;
        var sniperDistance = max(1, sqrt(sniperDx * sniperDx + sniperDy * sniperDy));
        if (sniperDistance < 650) {
            var sniperSide = floor(tickClock.gameMs / 450) % 2 ? 1 : -1;
            var sniperStep = {
                x: bot.pos.x - sniperDx / sniperDistance * 90 - sniperDy / sniperDistance * sniperSide * 80,
                y: bot.pos.y - sniperDy / sniperDistance * 90 + sniperDx / sniperDistance * sniperSide * 80,
                z: bot.pos.z
            };
            if (!solidAt(sniperStep.x, sniperStep.y, sniperStep.z, bot.colSize, null, true) && aiHasSupport(sniperStep.x, sniperStep.y, sniperStep.z)) {
                aiMoveToward(bot, sniperStep, 1.3, true);
            }
        } else if (sniperDistance > 1450) {
            aiMoveToward(bot, target.pos, 0.8, true);
        }
        if (visible) {
            aiFireBurst(bot, target);
        }
    }
    if (!(detonator && detonatorDist < aiSettings.detonatorUrgentRange)) {
        aiFollowSquad(bot, crowdingAlly);
    }
};
var aiRunFallbackBot = function (bot) {
    var target = aiFindNearestEnemy(bot, true);
    var fallbackVisible = !!target;
    if (!target) {
        target = aiFindNearestEnemy(bot, false);
    }
    var view = getAIPerception(bot);
    var crowdingAlly = target ? view.crowdingCombat : view.crowdingIdle;
    if (crowdingAlly && crowdingAlly.health <= 0) {
        crowdingAlly = null;
    }
    var detonator = view.detonator && !view.detonator.damageDone ? view.detonator : null;
    if (bot.aiMemory && bot.aiMemory.detonatorCooldown > 0) {
        bot.aiMemory.detonatorCooldown = max(0, bot.aiMemory.detonatorCooldown - tickClock.scale);
    }
    if (detonator && dist(bot.pos.x, bot.pos.y, detonator.pos.x, detonator.pos.y) < aiSettings.detonatorUrgentRange) {
        aiMoveAway(bot, detonator.pos, 1.7);
    }
    if (crowdingAlly) {
        aiIdleSpread(bot, crowdingAlly);
    }
    var fbDetUrgent = detonator && dist(bot.pos.x, bot.pos.y, detonator.pos.x, detonator.pos.y) < aiSettings.detonatorUrgentRange;
    if (!fbDetUrgent && aiGuardPosition(bot, target)) {
        if (target) {
            aiFireBurst(bot, target);
        }
        return;
    }
    if (!target || !target.pos) {
        if (!crowdingAlly) {
            aiIdleSpread(bot, null);
        }
        if (!fbDetUrgent) {
            aiFollowSquad(bot, crowdingAlly);
        }
        return;
    }
    var d = dist(bot.pos.x, bot.pos.y, target.pos.x, target.pos.y);
    if (!fallbackVisible) {
        fallbackVisible = aiCanSeeTarget(bot, target);
    }
    var fbTargetSaber = aiTargetUsesSaber(target);
    var fbPrioPlayer = false;
    if (bot && bot.inPlayerSquad) {
        var fbPlayerDist = dist(bot.pos.x, bot.pos.y, playerPos.x, playerPos.y);
        if (target && fallbackVisible && d < aiSettings.closeThreatRange) {
            fbPrioPlayer = false;
        } else if (fbPlayerDist > aiSettings.squadPriorityRange) {
            fbPrioPlayer = true;
        } else if (fbPlayerDist > aiSettings.squadFollowComfortRange && (!target || d > botCombatRange(bot) * 0.85)) {
            fbPrioPlayer = true;
        }
    }
    if (fbPrioPlayer) {
        if (!fbDetUrgent) {
            aiFollowSquad(bot, crowdingAlly);
        }
        return;
    }
    if (fbTargetSaber && d < aiSettings.lightsaberKeepAwayRange) {
        aiMoveAway(bot, target.pos, 1.55);
    } else if (d > botCombatRange(bot) && !(fbTargetSaber && d < aiSettings.lightsaberFearRange)) {
        aiCombatAdvance(bot, target, 0.8);
    } else if (d < botCombatRange(bot) * 0.55 || (fbTargetSaber && d < aiSettings.lightsaberFearRange)) {
        aiMoveAway(bot, target.pos, fbTargetSaber ? 1.25 : 0.7);
    }
    if (fallbackVisible) {
        aiFireBurst(bot, target);
    }
    if (aiCanThrowDetonator(bot, target, fallbackVisible, d) && random() < aiSettings.botDetonatorThrowChance * 0.6) {
        if (currentMap && currentMap.entities) {
            var fbThrowLayer = constrain(floor(bot.pos.z), currentMap.killZ, currentMap.topZ + 1);
            var fallbackThrowRot = atan2(target.pos.y - bot.pos.y, target.pos.x - bot.pos.x);
            var fbThrowPower = constrain(d / 28, 10, 26);
            var fallbackDetConfig = {
                x: bot.pos.x,
                y: bot.pos.y,
                z: bot.pos.z + 1,
                xVel: cos(fallbackThrowRot) * fbThrowPower,
                yVel: sin(fallbackThrowRot) * fbThrowPower,
                zVel: 0.1,
                r: random(-4, 4),
                explosionDamageMax: 150 * aiSettings.botDamageScale,
                owner: bot
            };
            if (!currentMap.entities[fbThrowLayer]) {
                currentMap.entities[fbThrowLayer] = [];
            }
            currentMap.entities[fbThrowLayer].push(getPoolDetonator(fallbackDetConfig));
            bot.detonatorCount = max(0, (bot.detonatorCount || 0) - 1);
            bot.aiMemory.detonatorCooldown = aiSettings.botDetonatorCooldown;
            bot.aiMemory.pendingReward -= 0.08;
        }
    }
    if (!fbDetUrgent) {
        aiFollowSquad(bot, crowdingAlly);
    }
};

var aiJumpPath = function (bot, vx, vy) {
    var radius = bot.colSize;
    var start = bot.pos;
    var base = start.z + aiNavSettings.jumpLift;
    var point = {
        x: start.x,
        y: start.y,
        z: base
    };
    for (var t = 1; t <= aiNavSettings.jumpFrames; t += 2) {
        var oldX = point.x;
        var oldY = point.y;
        var oldZ = point.z;
        point.x = start.x + vx * t;
        point.y = start.y + vy * t;
        if (solidAt(point.x, point.y, oldZ, radius)) {
            return false;
        }
        var nextZ = base + aiNavSettings.jumpSpeed * t - aiNavSettings.gravity * t * (t + 1) / 2;
        point.z = sweepZ(point.x, point.y, radius, oldZ, nextZ, 0.051);
        var hit = point.z !== nextZ;
        if (nextZ > oldZ) {
            if (hit) {
                return false;
            }
            continue;
        }
        var stairZ = rampLanding(point, oldX, oldY, oldZ, hit);
        if (hit || stairZ !== null) {
            var z = stairZ === null ? point.z : stairZ;
            var landingX = point.x + vx * 2;
            var landingY = point.y + vy * 2;
            return z > currentMap.killZ && z >= start.z - 0.6 && aiHasSupport(point.x, point.y, z) && aiHasSupport(landingX, landingY, z, point) && !solidAt(landingX, landingY, z, radius);
        }
    }
    return false;
};
var aiTryJump = function (bot, dx, dy, gap) {
    var now = tickClock.gameMs;
    if (aiJumpChecksLeft <= 0 || now < (bot.nextJumpMs || 0) || now < (bot.jumpCheckAt || 0) || abs(bot.vel.z) > 0.015) {
        return false;
    }
    var speed = getPlayerMaxSpeed() * 0.82;
    var look = max(bot.colSize + 30, speed * 11);
    if (!gap && !solidAt(bot.pos.x + dx * look, bot.pos.y + dy * look, bot.pos.z, bot.colSize, null, true)) {
        bot.jumpCheckAt = now + 85;
        return false;
    }
    bot.jumpCheckAt = now + random(180, 300);
    var vx = dx * speed;
    var vy = dy * speed;
    if (!aiHasSupport(bot.pos.x, bot.pos.y, bot.pos.z)) {
        return false;
    }
    aiJumpChecksLeft--;
    if (!aiJumpPath(bot, vx, vy)) {
        return false;
    }
    bot.jumpPlan = {
        vx: vx,
        vy: vy,
        until: now + (aiNavSettings.jumpFrames + 3) * tickClock.baseMs
    };
    bot.pos.z += aiNavSettings.jumpLift;
    bot.vel.z = aiNavSettings.jumpSpeed;
    bot.touchingFloorCollision = false;
    bot.nextJumpMs = now + aiNavSettings.jumpCooldownMs;
    return true;
};
AIPlayer.prototype.update = function () {
    this.renderPrevX = this.pos.x;
    this.renderPrevY = this.pos.y;
    if (this.usesPlayerSpeed) {
        this.walkSpeed = getBotMoveAccel();
    }
    this.counter += tickClock.scale;
    var forceMoved = forceMovesTarget(this);
    this.updateBlaster();
    if (!forceMoved && !this.isJedi) {
        aiUpdateFacing(this);
    }
    getHandPose(this);
    if (this.aiMemory && this.aiMemory.medkitCooldown > 0) {
        this.aiMemory.medkitCooldown = max(0, this.aiMemory.medkitCooldown - tickClock.scale);
    }
    if (this.medkitBuffFrames > 0) {
        this.medkitBuffFrames = max(0, this.medkitBuffFrames - tickClock.scale);
        this.damageMult = 0.8;
    } else {
        this.damageMult = 1;
    }
    if (this.health > 0 && this.medkitCount > 0 && this.aiMemory && this.aiMemory.medkitCooldown <= 0) {
        var medkitView = getAIPerception(this);
        var aiNearbyAllies = medkitView.allyCount;
        var aiNearbyEnemies = medkitView.nearbyEnemyCount;
        var aiHealthRatio = constrain(this.health / max(1, this.maxHealth || 100), 0, 1);
        if (aiHealthRatio < 0.42 || (aiHealthRatio < 0.62 && aiNearbyEnemies > aiNearbyAllies)) {
            this.health = min(this.maxHealth, this.health + 30);
            this.medkitCount--;
            this.medkitBuffFrames = 200;
            this.damageMult = 0.8;
            this.aiMemory.medkitCooldown = 420;
        }
    }
    var active = !forceMoved && gameStage === "Play" && matchState.phase === "live" && !stageTransition.active;
    if (active) {
        if (this.isJedi) {
            updateJediBot(this);
        } else if (aiSettings.useLearningBots) {
            aiRunLearningBot(this);
        } else {
            aiRunFallbackBot(this);
        }
        if (isSupremacy()) {
            updateSupBot(this);
        }
        if (!inSaberDuel(this)) {
            aiApplySpacing(this);
        }
    }
    var tick = tickClock.scale;
    if (this.isJedi) {
        this.force = min(this.maxForce, this.force + forceSettings.regenSpeed * forceProfile(this.skin).regen * tick);
    }
    var canJump = active && !inSaberDuel(this) && tickClock.gameMs >= max(max(this.zapUntil || 0, this.saberStunUntil || 0), this.dashUntil || 0);
    if (this.jumpPlan && (!canJump || tickClock.gameMs >= this.jumpPlan.until)) {
        this.jumpPlan = null;
    }
    var oldX = this.pos.x;
    var oldY = this.pos.y;
    var oldZ = this.pos.z;
    var flatSpeedPrePhys = sqrt(this.vel.x * this.vel.x + this.vel.y * this.vel.y);
    if (!forceMoved && !this.jumpPlan && this.touchingFloorCollision && flatSpeedPrePhys > 0.15) {
        var dx = this.vel.x / flatSpeedPrePhys;
        var dy = this.vel.y / flatSpeedPrePhys;
        var look = this.colSize + 30;
        var floorAhead = aiHasSupport(this.pos.x + dx * look, this.pos.y + dy * look, this.pos.z, this.pos);
        var jumping = canJump && aiTryJump(this, dx, dy, !floorAhead);
        if (!floorAhead && !jumping) {
            var edgeAnchor = this.inPlayerSquad ? playerPos : currentMap ? currentMap.spawnPos : null;
            var edgeAnchorX = edgeAnchor ? edgeAnchor.x : 0;
            var edgeAnchorY = edgeAnchor ? edgeAnchor.y : 0;
            var edgeDx = edgeAnchorX - this.pos.x;
            var edgeDy = edgeAnchorY - this.pos.y;
            var edgeD = max(0.001, sqrt(edgeDx * edgeDx + edgeDy * edgeDy));
            var edgePush = (this.inPlayerSquad ? 1.5 : 1.05) * playerSpeed * tick;
            this.vel.x = this.vel.x * 0.15 + (edgeDx / edgeD) * edgePush;
            this.vel.y = this.vel.y * 0.15 + (edgeDy / edgeD) * edgePush;
        }
    }
    this.vel.z -= aiNavSettings.gravity * tick;
    var drag = tickClock.gameMs < (this.forceThrowUntil || 0) ? 0.92 : movementSettings.drag;
    this.vel.x *= pow(drag, tick);
    this.vel.y *= pow(drag, tick);
    //Cap combined pursuit, strafing and separation at player sprint speed.
    if (!forceMoved) {
        var botMaxSpeed = getPlayerMaxSpeed() * getBotAwareness(this).moveScale;
        if (this.isJedi && tickClock.gameMs < (this.dashUntil || 0)) {
            botMaxSpeed = max(botMaxSpeed, 35);
        }
        if (tickClock.gameMs < (this.zapUntil || 0)) {
            botMaxSpeed *= 0.1;
        }
        var botFlatSpeed = sqrt(this.vel.x * this.vel.x + this.vel.y * this.vel.y);
        if (botFlatSpeed > botMaxSpeed) {
            this.vel.x *= botMaxSpeed / botFlatSpeed;
            this.vel.y *= botMaxSpeed / botFlatSpeed;
        }
        this.vel.z = constrain(this.vel.z, -0.35, 0.18);
    }
    if (this.jumpPlan) {
        this.vel.x = this.jumpPlan.vx;
        this.vel.y = this.jumpPlan.vy;
    }
    if (abs(this.vel.x) < 0.001) {
        this.vel.x = 0;
    }
    if (abs(this.vel.y) < 0.001) {
        this.vel.y = 0;
    }
    var touchedFloor = false;
    var touchedSolid = false;
    var motionScale = tickClock.scale;
    var maxComp = max(max(abs(this.vel.x), abs(this.vel.y)), abs(this.vel.z)) * motionScale;
    var steps = max(1, ceil(maxComp / 6));
    if (forceMoved) {
        steps = max(steps, ceil(abs(this.vel.z) * motionScale / 0.06));
    }
    var stepScale = motionScale / steps;
    var priorStepScale = this.vel._stepScale;
    for (var step = 0; step < steps; step++) {
        this.vel._stepScale = stepScale;
        this.collide();
        if (forceMoved) {
            protectForcePath(this, this.vel, stepScale);
        }
        if (this.touchingNonFloorCollision) {
            touchedSolid = true;
        }
        if (this.vel.x !== 0) {
            this.pos.x += this.vel.x * stepScale;
            this.collide();
            if (this.touchingNonFloorCollision) {
                touchedSolid = true;
            }
        }
        if (this.vel.y !== 0) {
            this.pos.y += this.vel.y * stepScale;
            this.collide();
            if (this.touchingNonFloorCollision) {
                touchedSolid = true;
            }
        }
        if (this.vel.z !== 0) {
            touchedFloor = moveEntityZ(this.pos, this.vel, this.colSize, this.bounce, stepScale) || touchedFloor;
        }
    }
    var rampZ = !forceMoved && this.vel.z <= 0 ? rampLanding(this.pos, oldX, oldY, oldZ, touchedFloor) : null;
    if (rampZ !== null) {
        this.pos.z = rampZ;
        this.vel.z = 0;
        touchedFloor = true;
    }
    if (this.jumpPlan && (touchedFloor || touchedSolid)) {
        this.jumpPlan = null;
    }
    if (priorStepScale === undefined) {
        this.vel._stepScale = 1;
    } else {
        this.vel._stepScale = priorStepScale;
    }
    this.touchingFloorCollision = touchedFloor;
    this.touchingNonFloorCollision = touchedSolid;
    softCharCollide(this, false);
    if (!forceMoved) {
        this.vel.z = constrain(this.vel.z, -0.35, 0.18);
    }
    var activeLayer = this._activeLayer !== undefined ? this._activeLayer : floor(this.pos.z);
    if (this.pos.z < currentMap.killZ || floor(this.pos.z) > currentMap.topZ + 1 || this.health <= 0) {
        return "delete";
    }
    if (floor(this.pos.z) < activeLayer) {
        return "zDown";
    }
    if (floor(this.pos.z) > activeLayer) {
        return "zUp";
    }
    if (this.health !== undefined) {
        if (this.maxHealth === undefined) {
            this.maxHealth = this.health;
        }
        if (this.health < 0) {
            this.health = 0;
        }
        if (this.health > this.maxHealth) {
            this.health = this.maxHealth;
        }
        if (this.maxShield === undefined) {
            this.maxShield = 0;
        }
        if (this.shield === undefined) {
            this.shield = this.maxShield;
        }
        if (this.shield < 0) {
            this.shield = 0;
        }
        if (this.shield > this.maxShield) {
            this.shield = this.maxShield;
        }
        if (this.maxShield > 0 && this.shield < this.maxShield) {
            this.shield = min(this.maxShield, this.shield + this.shieldRegen * tickClock.scale);
        }
        this.health = min(this.maxHealth, this.health + (this.maxShield <= 0 || this.shield >= this.maxShield ? this.healthRegenFullShield : this.healthRegenLowShield) * tickClock.scale);
    }
    if (this.health <= 0) {
        return "delete";
    }
    if (this.weapon && this.weapon.isLightsaber) {
        this.weapon.sampleHeldTrail(this.pos, getHandAngle(this), this.skin, this);
    }
    return false;
};
AIPlayer.prototype.render = function () {
    if (this.inPlayerSquad) {
        noFill();
        stroke(70, 155, 255, 230);
        strokeWeight(4);
        ellipse(this.pos.x, this.pos.y, this.colSize * 2.8, this.colSize * 2.8);
        stroke(170, 220, 255, 140);
        strokeWeight(2);
        ellipse(this.pos.x, this.pos.y, this.colSize * 2.15, this.colSize * 2.15);
    }
    pushStyle();
    pushMatrix();
    var shocked = tickClock.gameMs < (this.zapUntil || 0);
    var phase = tickClock.gameMs + this.counter;
    var sx = shocked ? sin(phase * 4.7) * 4 : 0;
    var sy = shocked ? cos(phase * 6.1) * 4 : 0;
    var renderAlpha = constrain(tickClock.accumulatorMs / tickClock.stepMs, 0, 1);
    var actorDrawX = this.renderPrevX === undefined || abs(this.pos.x - this.renderPrevX) > 30 ? this.pos.x : lerp(this.renderPrevX, this.pos.x, renderAlpha);
    var actorDrawY = this.renderPrevY === undefined || abs(this.pos.y - this.renderPrevY) > 30 ? this.pos.y : lerp(this.renderPrevY, this.pos.y, renderAlpha);
    translate(actorDrawX + sx, actorDrawY + sy);
    drawActorShadow(this.skin, this.bodyAngle, 60);
    rotate(this.bodyAngle + (shocked ? sin(phase * 3.3) * 5 : 0));
    noTint();
    var forceGlow = beginForceGlow(this);
    drawPlayer(this.skin, 60, true);
    drawActorHands(this);
    endForceGlow(forceGlow);
    noTint();
    if (shocked) {
        noStroke();
        fill(225, 248, 255, 75 + 140 * abs(sin(phase * 1.8)));
        ellipse(0, 0, 65, 65);
    }
    popMatrix();
    popStyle();
    if (this.weapon && this.weapon.isLightsaber && !this.weapon.throwState) {
        this.weapon.renderBladeTrail();
    }
    noTint();
    drawActorHitFlash(this);
    drawSpawnGrace(this.pos.x, this.pos.y, isB2Droid(this.skin) ? 68 : 43, this);
    var barW = 58;
    var barH = 6;
    var barX = this.pos.x - barW / 2;
    var healthY = this.pos.y - 76;
    var shieldY = healthY + barH + 3;
    var healthPct = constrain(this.health / max(1, this.maxHealth), 0, 1);
    var shieldPct = this.maxShield > 0 ? constrain(this.shield / this.maxShield, 0, 1) : 0;
    rectMode(CORNER);
    noStroke();
    fill(0, 150);
    rect(barX - 1, healthY - 1, barW + 2, barH + 2, 2);
    fill(60, 12, 10, 220);
    rect(barX, healthY, barW, barH, 2);
    fill(235, 35, 20, 235);
    rect(barX, healthY, barW * healthPct, barH, 2);
    fill(0, 130);
    rect(barX - 1, shieldY - 1, barW + 2, barH + 2, 2);
    fill(12, 18, 55, 210);
    rect(barX, shieldY, barW, barH, 2);
    fill(95, 150, 255, 235);
    rect(barX, shieldY, barW * shieldPct, barH, 2);
    if (aiSettings.debugLearning && this.aiMemory) {
        fill(255, 235, 120, 230);
        textAlign(CENTER, CENTER);
        textSize(10);
        text(this.aiMemory.debugLabel, this.pos.x, this.pos.y - 94);
    }
};

//Blast Occlusion
//Snapshot physical wall and door panels once per explosion; crates remain partial cover.
var getBlastBlockers = function () {
    var objects = currentMap.objectsTemp || [];
    var blockers = [];
    for (var i = 0; i < objects.length; i++) {
        var object = objects[i];
        if (!object || object.isDestructibleCrate || !(object instanceof Wall || object instanceof BlastDoor)) {
            continue;
        }
        for (var c = 0; c < object.collisions.length; c++) {
            var panel = object.collisions[c];
            if (!panel.disabled && !panel.plane && panel.blocksLasers && panel.type === "rect" && panel.width > 0) {
                blockers.push(panel);
            }
        }
    }
    return blockers;
};
var isBlastBlocked = function (origin, target, blockers) {
    for (var i = 0; i < blockers.length; i++) {
        var panel = blockers[i];
        var angle = panel.rotation || 0;
        var dx = origin.x - panel.x;
        var dy = origin.y - panel.y;
        var tx = target.x - panel.x;
        var ty = target.y - panel.y;
        var start = [ dx * cos(angle) + dy * sin(angle), -dx * sin(angle) + dy * cos(angle), origin.z ];
        var end = [tx * cos(angle) + ty * sin(angle), -tx * sin(angle) + ty * cos(angle), target.z];
        var lower = [-panel.width / 2, -panel.height / 2, panel.lowZ];
        var upper = [panel.width / 2, panel.height / 2, panel.highZ];
        var enter = 0;
        var leave = 1;
        for (var axis = 0; axis < 3; axis++) {
            var delta = end[axis] - start[axis];
            if (abs(delta) < 0.000001) {
                if (start[axis] < lower[axis] || start[axis] > upper[axis]) {
                    leave = -1;
                    break;
                }
            } else {
                var a = (lower[axis] - start[axis]) / delta;
                var b = (upper[axis] - start[axis]) / delta;
                enter = max(enter, min(a, b));
                leave = min(leave, max(a, b));
            }
        }
        if (enter <= leave && leave > 0.00001 && enter < 0.99999) {
            return true;
        }
    }
    return false;
};

//Explosives
var Billy = function (config) {
    Entity.call(this, config);
    this.slide = 0.999;
};
Billy.prototype = Object.create(Entity.prototype);
Billy.prototype.render = function () {
    fill(255, 0, 0);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 50, 50);
};
Detonator = function (config) {
    this.reset(config);
};
Detonator.prototype = Object.create(Entity.prototype);
Detonator.prototype.constructor = Detonator;
Detonator.prototype.reset = function (config) {
    Entity.call(this, config);
    this.poolType = "detonator";
    this.slide = 0.959;
    this.bounce = 0.5;
    this.rv = config.rv !== undefined ? config.rv : 0;
    this.rVel = config.r !== undefined ? config.r : 0;
    this.armDelay = config.armDelay !== undefined ? config.armDelay : 40;
    this.fuse = config.fuse !== undefined ? config.fuse : 100;
    this.exploding = false;
    this.explosionTime = 0;
    this.explosionGrowFrames = 10;
    this.explosionFadeFrames = 50;
    this.explosionMax = 500 + random(-60, 60);
    this.explosionDamageMax = config.explosionDamageMax !== undefined ? config.explosionDamageMax : 150;
    this.owner = config.owner || null;
    this.damageDone = false;
    this.forceThrowUntil = 0;
};
Detonator.prototype.doExplosionDamage = function () {
    if (this.owner && !canAttack(this.owner)) {
        return;
    }
    screenShake = max(screenShake, 25 * constrain(1 - dist(playerPos.x, playerPos.y, this.pos.x, this.pos.y) / 900, 0, 1));
    var blastCoverCrates = getBlastCrates();
    var blastBlockers = getBlastBlockers();
    blastDamageCrates(this);
    var layer = floor(this.pos.z);
    var radius = this.explosionMax * 0.5;
    var knockMax = 12;
    var maxZPush = 0.18;
    var maxXY = 25;
    for (var zl = layer - 2; zl <= layer + 2; zl++) {
        var list = currentMap.entities[zl];
        if (!list) {
            continue;
        }
        for (var e = 0; e < list.length; e++) {
            var ent = list[e];
            if (!ent || !ent.pos) {
                continue;
            }
            var dz = abs(floor(ent.pos.z) - layer);
            if (dz > 2) {
                continue;
            }
            var dxy = dist(this.pos.x, this.pos.y, ent.pos.x, ent.pos.y);
            var t = 1 - dxy / radius;
            t = constrain(t, 0, 1);
            if (ent !== this && ent.isLandmine && t > 0 && abs(ent.pos.z - this.pos.z) < 0.8) {
                ent.triggerBlast();
            }
            var cover = isAllyAttack(ent, this.owner) || hasSpawnGrace(ent) || isBlastBlocked(this.pos, ent.pos, blastBlockers) ? 0 : crateBlastCover(this.pos, ent.pos, blastCoverCrates);
            if (ent.health !== undefined) {
                var dmg = this.explosionDamageMax * t * cover;
                if (dmg > 0) {
                    var beforeHealth = ent.health;
                    var beforeShield = ent.shield !== undefined ? ent.shield : 0;
                    applyDamage(ent, dmg, this.owner);
                    var done = max(0, beforeHealth + beforeShield - ((ent.health !== undefined ? ent.health : 0) + (ent.shield !== undefined ? ent.shield : 0)));
                    if (this.owner && this.owner.aiMemory && done > 0 && ent.team !== undefined) {
                        if (ent.team === this.owner.team) {
                            this.owner.aiMemory.pendingReward -= done * 0.12;
                        } else {
                            this.owner.aiMemory.pendingReward += done * 0.08;
                            if (beforeHealth > 0 && ent.health <= 0) {
                                this.owner.aiMemory.pendingReward += 8;
                            }
                        }
                    }
                    if (this.owner && this.owner.isPlayer && ent.isMatchBot && ent.team !== playerTeam && done > 0) {
                        ent.playerCreditDamage = (ent.playerCreditDamage || 0) + done;
                        ent.playerCreditDamageMax = max(1, (ent.maxHealth || 100) + (ent.maxShield || 0));
                    }
                    if (ent.isMatchBot && beforeHealth > 0 && ent.health <= 0 && !ent.creditPaid) {
                        if (!ent.tdmScorePaid && this.owner && this.owner.team !== undefined) {
                            awardTDMKill(this.owner.team, ent.team);
                            ent.tdmScorePaid = true;
                        }
                        if (ent.team !== playerTeam && ent.playerCreditDamage > 0) {
                            var damagePercent = constrain(ent.playerCreditDamage / max(1, ent.playerCreditDamageMax || (ent.maxHealth || 100) + (ent.maxShield || 0)), 0, 1);
                            var killBaseCredits = (floor(random(18, 31)) + matchState.playerKills * 5) * 5;
                            var earnedCredits = max(1, floor(killBaseCredits * damagePercent));
                            matchState.playerKills++;
                            recordAchievement("kills", 1);
                            ent.creditPaid = true;
                            addCreditChange(earnedCredits, ent.pos.x, ent.pos.y - 82);
                        } else if (this.owner && this.owner.isPlayer && ent.team === playerTeam) {
                            ent.creditPaid = true;
                            addCreditChange(-floor(random(40, 71)), ent.pos.x, ent.pos.y - 82);
                        }
                    }
                }
            }
            if (ent.vel) {
                var strength = knockMax * t;
                if (strength > 0) {
                    var entKnockDx = ent.pos.x - this.pos.x;
                    var entKnockDy = ent.pos.y - this.pos.y;
                    var entKnockDist = sqrt(entKnockDx * entKnockDx + entKnockDy * entKnockDy);
                    if (entKnockDist < 0.0001) {
                        entKnockDist = 0.0001;
                    }
                    var entKnockNx = entKnockDx / entKnockDist;
                    var entKnockNy = entKnockDy / entKnockDist;
                    ent.vel.x += constrain(entKnockNx * strength * 20, -maxXY, maxXY) * cover;
                    ent.vel.y += constrain(entKnockNy * strength * 20, -maxXY, maxXY) * cover;
                    ent.vel.z += (maxZPush / 1.15) * cover;
                    ent.pos.z += 0.15 * cover;
                    if (currentMap._entityGridActive) {
                        syncEntityGrid(currentMap, ent, false);
                    }
                    if (ent.vel.x > maxXY) {
                        ent.vel.x = maxXY;
                    }
                    if (ent.vel.x < -maxXY) {
                        ent.vel.x = -maxXY;
                    }
                    if (ent.vel.y > maxXY) {
                        ent.vel.y = maxXY;
                    }
                    if (ent.vel.y < -maxXY) {
                        ent.vel.y = -maxXY;
                    }
                }
            }
        }
    }
    var casterSafe = this.owner && this.owner.isPlayer && gripProtectsPlayer(this);
    if (!casterSafe && abs(playerPos.z - this.pos.z) <= 2) {
        var tp = constrain(1 - dist(this.pos.x, this.pos.y, playerPos.x, playerPos.y) / radius, 0, 1);
        var playerCover = isAllyAttack({
            isPlayerTarget: true
        }, this.owner) || hasSpawnGrace({
            isPlayerTarget: true
        }) || isBlastBlocked(this.pos, playerPos, blastBlockers) ? 0 : crateBlastCover(this.pos, playerPos, blastCoverCrates);
        var pdmg = this.explosionDamageMax * tp * playerCover;
        if (pdmg > 0) {
            var prevPlayerVitals = playerHealth + playerShield;
            var pExplDmgTmp = {
                health: playerHealth,
                maxHealth: playerMaxHealth,
                shield: playerShield,
                maxShield: playerMaxShield,
                isPlayerTarget: true,
                pos: playerPos,
                damageSource: this.pos,
                skin: skin,
                damageMult: playerDamageMult !== undefined ? playerDamageMult : 1
            };
            applyDamage(pExplDmgTmp, pdmg, this.owner);
            playerHealth = pExplDmgTmp.health;
            playerShield = pExplDmgTmp.shield;
            if (prevPlayerVitals > 0 && playerHealth <= 0 && !deathScorePaid && this.owner && this.owner.team !== undefined) {
                awardTDMKill(this.owner.team, playerTeam);
                deathScorePaid = true;
            }
            if (this.owner && this.owner.aiMemory) {
                this.owner.aiMemory.pendingReward += max(0, prevPlayerVitals - (playerHealth + playerShield)) * 0.08;
                if (prevPlayerVitals > 0 && playerHealth <= 0) {
                    this.owner.aiMemory.pendingReward += 8;
                }
            }
        }
        var pStrength = knockMax * tp;
        if (pStrength > 0) {
            var playerKnockDx = playerPos.x - this.pos.x;
            var playerKnockDy = playerPos.y - this.pos.y;
            var playerKnockDist = sqrt(playerKnockDx * playerKnockDx + playerKnockDy * playerKnockDy);
            if (playerKnockDist < 0.0001) {
                playerKnockDist = 0.0001;
            }
            var playerKnockNx = playerKnockDx / playerKnockDist;
            var playerKnockNy = playerKnockDy / playerKnockDist;
            playerVel.x += constrain(playerKnockNx * pStrength * 20, -maxXY, maxXY) * playerCover;
            playerVel.y += constrain(playerKnockNy * pStrength * 20, -maxXY, maxXY) * playerCover;
            playerVel.z += (maxZPush / 1.15) * playerCover;
            if (playerVel.x > maxXY) {
                playerVel.x = maxXY;
            }
            if (playerVel.x < -maxXY) {
                playerVel.x = -maxXY;
            }
            if (playerVel.y > maxXY) {
                playerVel.y = maxXY;
            }
            if (playerVel.y < -maxXY) {
                playerVel.y = -maxXY;
            }
        }
    }
};
Detonator.prototype.update = function () {
    var tick = tickClock.scale;
    if (this.exploding) {
        this.explosionTime += 0.3 * tick;
        if (!this.damageDone) {
            this.damageDone = true;
            this.doExplosionDamage();
        }
        if (this.explosionTime >= this.explosionGrowFrames + this.explosionFadeFrames) {
            return "delete";
        }
        return false;
    }
    var held = forceGrip && forceGrip.target === this && forceGrip.map === currentMap;
    if (!held) {
        if (this.armDelay > 0) {
            this.armDelay = max(0, this.armDelay - tick);
        } else {
            this.fuse -= tick;
        }
    }
    this.rv += this.rVel * tick;
    this.vel.z -= 0.005 * tick;
    this.vel.x *= pow(this.slide, tick);
    this.vel.y *= pow(this.slide, tick);
    var forceMoved = forceMovesTarget(this);
    if (!forceMoved) {
        this.collide();
    }
    var activeLayer = this._activeLayer !== undefined ? this._activeLayer : floor(this.pos.z);
    if (floor(this.pos.z) < currentMap.killZ || floor(this.pos.z) > currentMap.topZ + 1) {
        return "delete";
    } else if (!forceMoved && floor(this.pos.z) < activeLayer) {
        return "zDown";
    } else if (!forceMoved && floor(this.pos.z) > activeLayer) {
        return "zUp";
    }
    var steps = forceMoved ? max(1, ceil(max(max(abs(this.vel.x), abs(this.vel.y)) / 6, abs(this.vel.z) / 0.06) * tick)) : 1;
    var stepScale = tick / steps;
    for (var step = 0; step < steps; step++) {
        if (forceMoved) {
            this.vel._stepScale = stepScale;
            this.collide();
            protectForcePath(this, this.vel, stepScale);
        }
        this.pos.x += this.vel.x * stepScale;
        this.pos.y += this.vel.y * stepScale;
        this.touchingFloorCollision = moveEntityZ(this.pos, this.vel, this.colSize, this.bounce, stepScale);
        if (forceMoved) {
            this.collide();
        }
    }
    if (forceMoved) {
        this.vel._stepScale = undefined;
    }
    if (!held && this.fuse <= 0 && this.armDelay <= 0) {
        this.exploding = true;
        this.explosionTime = 0;
        this.vel.x = 0;
        this.vel.y = 0;
        this.vel.z = 0;
    }
    return false;
};
var drawExplosion = function (explosive, bloom) {
    var t = explosive.explosionTime;
    var grow = constrain(t / explosive.explosionGrowFrames, 0, 1);
    var fade = constrain((t - explosive.explosionGrowFrames) / explosive.explosionFadeFrames, 0, 1);
    var diameter = explosive.explosionMax * (1 - pow(1 - grow, 3));
    var power = 1 - fade;
    var pos = explosive.pos;
    addSimpleLight(pos.x, pos.y, diameter * 0.65, power * 0.7, pos.z);

    var outer = lerpColor(color(255, 220, 120, 220), color(255, 80, 40, 0), fade);
    noStroke();
    fill(red(outer), green(outer), blue(outer), alpha(outer) * power);
    ellipse(pos.x, pos.y, diameter, diameter);
    fill(255, 255, 255, (200 + 35 * bloom) * power * power);
    var core = diameter * (0.45 + 0.04 * bloom);
    ellipse(pos.x, pos.y, core, core);
};
Detonator.prototype.render = function () {
    if (this.exploding) {
        drawExplosion(this, 1);
        return;
    }
    pushMatrix();
    translate(this.pos.x, this.pos.y);
    rotate(this.rv);
    drawImg(loadedImages.thermal_detonator, -20, -20, 40, 40);
    popMatrix();
};
var Landmine = function (config) {
    Entity.call(this, config);
    this.isLandmine = true;
    this.slide = 0;
    this.bounce = 0;
    this.rv = config.rv !== undefined ? config.rv : 0;
    this.rVel = config.r !== undefined ? config.r : 0;
    this.exploding = false;
    this.explosionTime = 0;
    this.explosionGrowFrames = 10;
    this.explosionFadeFrames = 50;
    this.explosionMax = 500 + random(-60, 60);
    this.type = config.type || "blue";
    this.owner = config.owner || null;
    this.armDelay = config.armDelay !== undefined ? config.armDelay : 45;
    this.triggerRadius = config.triggerRadius !== undefined ? config.triggerRadius : 85;
    this.nextTriggerMs = 0;
    this.explosionDamageMax = config.explosionDamageMax !== undefined ? config.explosionDamageMax : 150;
    this.damageDone = false;
};
Landmine.prototype = Object.create(Entity.prototype);
Landmine.prototype.triggerBlast = function () {
    if (this.exploding) {
        return false;
    }
    this.exploding = true;
    this.explosionTime = 0;
    this.armDelay = 0;
    this.vel.mult(0);
    return true;
};
Landmine.prototype.update = function () {
    var tick = tickClock.scale;
    if (this.exploding) {
        this.explosionTime += 0.3 * tick;
        if (!this.damageDone) {
            this.damageDone = true;
            Detonator.prototype.doExplosionDamage.call(this);
        }
        if (this.explosionTime >= this.explosionGrowFrames + this.explosionFadeFrames) {
            return "delete";
        }
        return false;
    }
    this.armDelay = max(0, this.armDelay - tick);
    if (this.armDelay === 0 && tickClock.gameMs >= this.nextTriggerMs) {
        this.nextTriggerMs = tickClock.gameMs + 100;
        var ownerTeam = this.owner ? this.owner.team : undefined;
        var mineLayer = floor(this.pos.z);
        var triggered = playerHealth > 0 && ownerTeam !== playerTeam && abs(playerPos.z - this.pos.z) < 0.6 && dist(playerPos.x, playerPos.y, this.pos.x, this.pos.y) <= this.triggerRadius;
        var nearby = currentMap.entities[mineLayer] || [];
        for (var mineIndex = 0; mineIndex < nearby.length && !triggered; mineIndex++) {
            var actor = nearby[mineIndex];
            if (actor !== this && actor.health > 0 && actor.team !== ownerTeam && actor.pos && abs(actor.pos.z - this.pos.z) < 0.6 && dist(actor.pos.x, actor.pos.y, this.pos.x, this.pos.y) <= this.triggerRadius) {
                triggered = true;
            }
        }
        if (triggered) {
            this.exploding = true;
            this.explosionTime = 0;
            this.vel.mult(0);
            return false;
        }
    }
    this.rv += this.rVel * tick;
    this.vel.z -= 0.005 * tick;
    this.vel.x *= pow(0.2, tick);
    this.vel.y *= pow(0.2, tick);
    this.collide();
    var activeLayer = this._activeLayer !== undefined ? this._activeLayer : floor(this.pos.z);
    if (floor(this.pos.z) < currentMap.killZ || floor(this.pos.z) > currentMap.topZ + 1) {
        return "delete";
    } else if (floor(this.pos.z) < activeLayer) {
        return "zDown";
    } else if (floor(this.pos.z) > activeLayer) {
        return "zUp";
    }
    this.pos.x += this.vel.x * tick;
    this.pos.y += this.vel.y * tick;
    this.touchingFloorCollision = moveEntityZ(this.pos, this.vel, this.colSize, this.bounce, tick);
    if (abs(this.vel.x) < 0.001) {
        this.vel.x = 0;
    }
    if (abs(this.vel.y) < 0.001) {
        this.vel.y = 0;
    }
    return false;
};
Landmine.prototype.render = function () {
    if (this.exploding) {
        drawExplosion(this, 0);
        return;
    }
    pushMatrix();
    translate(this.pos.x, this.pos.y);
    rotate(this.rv);
    drawImg(this.type === "blue" ? loadedImages.blue_landmine_sprite : loadedImages.red_landmine_sprite, -35, -35, 70, 70);
    popMatrix();
};
var JetParticle = function (config) {
    Entity.call(this, config);
    this.life = config.life !== undefined ? config.life : 30;
    this.s = config.s !== undefined ? config.s : 10;
    this.sShrink = config.sShrink !== undefined ? config.sShrink : 0.35;
    this.col = config.col !== undefined ? config.col : color(255, 180, 60, 170);
    this.slide = config.slide !== undefined ? config.slide : 0.92; //a little drag
    this.bounce = 0;
};
JetParticle.prototype = Object.create(Entity.prototype);
JetParticle.prototype.update = function () {
    var tick = tickClock.scale;
    this.vel.z -= 0.002 * tick;
    this.vel.x *= pow(this.slide, tick);
    this.vel.y *= pow(this.slide, tick);
    var activeLayer = this._activeLayer !== undefined ? this._activeLayer : floor(this.pos.z);
    if (floor(this.pos.z) < currentMap.killZ || floor(this.pos.z) > currentMap.topZ + 1) {
        return "delete";
    } else if (floor(this.pos.z) < activeLayer) {
        return "zDown";
    } else if (floor(this.pos.z) > activeLayer) {
        return "zUp";
    }
    this.pos.x += this.vel.x * tick;
    this.pos.y += this.vel.y * tick;
    this.pos.z += this.vel.z * tick;
    this.s -= this.sShrink * tick;
    this.life -= tick;
    if (this.life <= 0 || this.s <= 0) {
        return "delete";
    }
    return false;
};
JetParticle.prototype.render = function () {
    noStroke();
    fill(255, 245, 160, min(210, alpha(this.col) + 45));
    ellipse(this.pos.x, this.pos.y, this.s * 0.45, this.s * 0.45);
    fill(this.col);
    ellipse(this.pos.x, this.pos.y, this.s, this.s);
    fill(255, 90, 25, alpha(this.col) * 0.45);
    ellipse(this.pos.x, this.pos.y, this.s * 1.35, this.s * 1.35);
};

//Camera And Map
var perspectiveSettings = {
    heightAbovePlayer: 16,
    roofClearance: 4,
    nearDistance: 1
};
var worldHeightScale = function (z) {
    var cameraZ = max(playerPos.z + perspectiveSettings.heightAbovePlayer, currentMap ? currentMap.topZ + perspectiveSettings.roofClearance : playerPos.z + perspectiveSettings.heightAbovePlayer);
    var focusDistance = cameraZ - playerPos.z;
    return focusDistance / max(perspectiveSettings.nearDistance, cameraZ - z);
};
worldToScreen = function (x, y, z) {
    var layerScale = worldHeightScale(z === undefined ? playerPos.z : z);
    var dx = (x - camPos.x) * zoom * layerScale;
    var dy = (y - camPos.y) * zoom * layerScale * cameraState.pitch;
    return {
        x: width / 2 + cameraState.shakeX + dx * cos(cameraState.roll) - dy * sin(cameraState.roll),
        y: height / 2 + cameraState.shakeY + dx * sin(cameraState.roll) + dy * cos(cameraState.roll)
    };
};
screenToWorld = function (x, y, z) {
    var dx = x - width / 2 - cameraState.shakeX;
    var dy = y - height / 2 - cameraState.shakeY;
    var planeScale = worldHeightScale(z === undefined ? playerPos.z : z);
    return {
        x: camPos.x + (dx * cos(cameraState.roll) + dy * sin(cameraState.roll)) / max(0.001, zoom * planeScale),
        y: camPos.y + (-dx * sin(cameraState.roll) + dy * cos(cameraState.roll)) / max(0.001, zoom * cameraState.pitch * planeScale)
    };
};
var isPlayerSprinting = function () {
    return !!keys[inputKeys.sprint] && (inventoryState.selected !== 0 || !currentGun || currentGun.isLightsaber || playerGunPose < 0.72);
};
var updateCamera = function (live) {
    var scoped = live && rightHeld && !squadCommandMode && inventoryState.selected === 0 && currentGun && !currentGun.isLightsaber;
    var baseZoom = scoped ? (currentGun.renderZoom === undefined ? defaultZoom * 0.42 : currentGun.renderZoom) : defaultZoom;
    var moving = constrain(dist(0, 0, playerVel.x, playerVel.y) / 10, 0, 1);
    var sprinting = live && isPlayerSprinting() ? moving : 0;
    var targetZoom = baseZoom * (1 - sprinting * 0.14 - cameraState.recoil * 0.025);
    if (squadCommandMode) {
        targetZoom = max(0.08, baseZoom * 0.42);
    }
    var fighting = live && !squadCommandMode && inSaberDuel(null);
    var slow = live && !squadCommandMode && (dangerSense > 0 || tickClock.realMs < duel.slowUntil || (duel.incoming && !duel.incoming.returning && tickClock.realMs - duel.incoming.warnAt < 1200));
    var close = fighting || slow;
    var focusTarget = fighting ? duel.foe.pos : slow && duel.incoming ? duel.incoming : null;
    if (close) {
        targetZoom = max(targetZoom, baseZoom * (fighting ? (slow ? 1.7 : 1.45) : 1.5));
        if (focusTarget) {
            targetZoom = min(targetZoom, min((width * 0.7) / (abs(focusTarget.x - playerPos.x) + 340), (height * 0.65) / (abs(focusTarget.y - playerPos.y) + 340)));
        }
    }
    //Keep a distant thrown saber in view, easing back naturally on its return.
    if (live) {
        for (var saberIndex = 0; saberIndex < activeSaberThrows.length; saberIndex++) {
            var flight = activeSaberThrows[saberIndex].throwState;
            if (!flight || flight.isPlayer !== true || flight.owner || flight.map !== currentMap) {
                continue;
            }
            var flightX = abs(flight.x - playerPos.x);
            var flightY = abs(flight.y - playerPos.y);
            var flightDistance = sqrt(flightX * flightX + flightY * flightY);
            var distanceZoom = baseZoom / (1 + max(0, flightDistance - 120) / 650);
            var fitZoom = min((width * 0.36) / (flightX + 180), (height * 0.36) / (flightY + 180));
            targetZoom = min(targetZoom, max(0.08, min(distanceZoom, fitZoom)));
        }
    }
    var reset = !cameraState.ready || cameraState.map !== currentMap || dist(camPos.x, camPos.y, playerPos.x, playerPos.y) > 1400;
    if (reset) {
        cameraState.ready = true;
        cameraState.map = currentMap;
        camPos.x = playerPos.x;
        camPos.y = playerPos.y;
        cameraState.roll = 0;
        cameraState.pitch = 1;
        cameraState.recoil = 0;
        zoom = targetZoom;
    }
    var activeFov = scoped && currentGun.scopeFov !== undefined ? currentGun.scopeFov : fov;
    var lookX = constrain(mouseX - width / 2, -width * 0.42, width * 0.42) / (activeFov * max(0.4, zoom));
    var lookY = constrain(mouseY - height / 2, -height * 0.42, height * 0.42) / (activeFov * max(0.4, zoom));
    var lookCos = cos(cameraState.roll);
    var lookSin = sin(cameraState.roll);
    var follow = uiEase(close ? 0.15 : scoped ? 0.14 : 0.09);
    var centerX = focusTarget ? (playerPos.x + focusTarget.x) / 2 : playerPos.x;
    var centerY = focusTarget ? (playerPos.y + focusTarget.y) / 2 : playerPos.y;
    if (close) {
        lookX *= 0.2;
        lookY *= 0.2;
    }
    camPos.x = lerp(camPos.x, centerX + (live ? lookX * lookCos + lookY * lookSin + playerVel.x * 3 : 0), follow);
    camPos.y = lerp(camPos.y, centerY + (live ? -lookX * lookSin + lookY * lookCos + playerVel.y * 3 : 0), follow);
    camPos.z = playerPos.z;
    zoom = lerp(zoom, targetZoom, uiEase(close ? 0.16 : 0.1));
    var targetRoll = live && !close && !scoped && !squadCommandMode ? constrain(-playerVel.x * 0.4, -5, 5) : 0;
    cameraState.roll = lerp(cameraState.roll, targetRoll, uiEase(0.06));
    cameraState.pitch = lerp(cameraState.pitch, 1 - sprinting * 0.045, uiEase(0.08));
    cameraState.recoil *= pow(0.8, tickClock.renderScale);
    cameraState.shakeX = random(-screenShake, screenShake) * zoom;
    cameraState.shakeY = random(-screenShake, screenShake) * zoom;
};
var updatePlayerAim = function () {
    var aim = screenToWorld(mouseX, mouseY);
    if (dist(aim.x, aim.y, playerPos.x, playerPos.y) > 2) {
        turnPlayerToward(atan2(aim.x - playerPos.x, -(aim.y - playerPos.y)));
    }
    if (keys[inputKeys.right] || keys[inputKeys.arrowRight] || keys[inputKeys.left] || keys[inputKeys.arrowLeft] || keys[inputKeys.down] || keys[inputKeys.arrowDown] || keys[inputKeys.up] || keys[inputKeys.arrowUp]) {
        walkSway = sin((tickClock.gameMs / tickClock.baseMs) * ((isPlayerSprinting() ? movementSettings.sprintMultiplier : 1) * 10)) * 4;
    } else {
        walkSway = 0;
    }
    getHandPose(null);
};
var updatePlayerStats = function () {
    if (playerHealth <= 0) {
        playerDie();
        return;
    }
    playerShield = constrain(playerShield, 0, playerMaxShield);
    playerHealth = constrain(playerHealth, 0, playerMaxHealth);
    playerShield = min(playerMaxShield, playerShield + playerShieldRegen * tickClock.scale);
    var regen = playerMaxShield <= 0 || playerShield >= playerMaxShield ? pHpRegenFull : pHpRegenLow;
    playerHealth = min(playerMaxHealth, playerHealth + regen * tickClock.scale);
};
/**GameMap Constructor**/
var GameMap = function (config) {
    //Set up some values
    this.baseColor = config.baseColor !== undefined ? config.baseColor : color(255);
    this.onBackgroundRender = config.onBackgroundRender || function () {
    };
    this.zChangers = config.zChangers || [];
    this.width = config.width;
    this.height = config.height;
    //Add game objects
    this.objectsTemp = [].concat(config.objects);
    this.objects = {
    };
    this.rangeObjects = [];
    this.doors = [];
    for (var i = 0; i < this.objectsTemp.length; i++) {
        if (this.objectsTemp[i] instanceof BlastDoor) {
            this.doors.push(this.objectsTemp[i]);
        }
        //If they have a single zValue, push them to the array
        if (this.objectsTemp[i].forceMass || floor(this.objectsTemp[i].lowZ) === floor(this.objectsTemp[i].highZ)) {
            if (this.objects[floor(this.objectsTemp[i].lowZ)]) {
                //Add to existing layer
                this.objects[floor(this.objectsTemp[i].lowZ)].push(this.objectsTemp[i]);
            } else {
                //Create a new layer
                this.objects[floor(this.objectsTemp[i].lowZ)] = [this.objectsTemp[i]];
            }
        } else {
            //Push the object to rangeObjects, and add their index to the layering scheme
            this.rangeObjects.push(this.objectsTemp[i]);
            for (var j = floor(this.objectsTemp[i].lowZ); j <= floor(this.objectsTemp[i].highZ); j++) {
                if (this.objects[j]) {
                    //Add index to an existing layer
                    this.objects[j].push(this.rangeObjects.length - 1);
                } else {
                    //Create a new layer
                    this.objects[j] = [this.rangeObjects.length - 1];
                }
            }
        }
    }
    //Tree canopies render overhead; register their solid trunks on lower layers too.
    for (var treeIndex = 0; treeIndex < this.objectsTemp.length; treeIndex++) {
        var treeObject = this.objectsTemp[treeIndex];
        if (treeObject instanceof Tree) {
            var trunk = treeObject.collisions[0];
            var trunkObject = new Decoration({
                lowZ: trunk.lowZ,
                highZ: trunk.highZ,
                castsShadow: false,
                collisions: [trunk]
            });
            for (var trunkLayer = floor(trunk.lowZ); trunkLayer <= floor(trunk.highZ); trunkLayer++) {
                if (trunkLayer === floor(treeObject.lowZ)) {
                    continue;
                }
                if (!this.objects[trunkLayer]) {
                    this.objects[trunkLayer] = [];
                }
                this.objects[trunkLayer].push(trunkObject);
            }
        }
    }
    //Get the game map's z range
    if (config.bottomZ !== undefined && config.topZ !== undefined) {
        this.bottomZ = config.bottomZ;
        this.topZ = config.topZ;
    } else {
        this.bottomZ = 0;
        this.topZ = 0;
        for (var k = 0; k < this.objectsTemp.length; k++) {
            if (floor(this.objectsTemp[k].lowZ) < this.bottomZ) {
                this.bottomZ = floor(this.objectsTemp[k].lowZ);
            }
            if (floor(this.objectsTemp[k].highZ) > this.topZ) {
                this.topZ = floor(this.objectsTemp[k].highZ);
            }
        }
    }
    if (config.bottomZ !== undefined) {
        this.bottomZ = config.bottomZ;
    }
    if (config.topZ !== undefined) {
        this.topZ = config.topZ;
    }
    //Sort each layer by Z values
    for (var i = this.bottomZ; i <= this.topZ; i++) {
        if (this.objects[i]) {
            this.objects[i].sort(this.lowSort.bind(this));
        }
    }
    this.collisionLayers = {
    };
    this.collisionBuckets = {
    };
    this.liveCollisionLayers = {
    };
    this._collisionQueryId = 0;
    this.colBucket = colBucket;
    for (var layerKey in this.objects) {
        if (this.objects.hasOwnProperty(layerKey)) {
            this.collisionLayers[layerKey] = [];
            this.liveCollisionLayers[layerKey] = [];
            for (var objIndex = 0; objIndex < this.objects[layerKey].length; objIndex++) {
                var entry = this.objects[layerKey][objIndex];
                var obj = typeof entry === "number" ? this.rangeObjects[entry] : entry;
                var mapObjCollisions = obj.collisions;
                if (mapObjCollisions && !obj.forceMass) {
                    for (var colIndex = 0; colIndex < mapObjCollisions.length; colIndex++) {
                        var collision = mapObjCollisions[colIndex];
                        this.collisionLayers[layerKey].push(collision);
                    }
                }
            }
            var layerCols = this.collisionLayers[layerKey];
            var layerBuckets = {
            };
            for (var layerColIndex = 0; layerColIndex < layerCols.length; layerColIndex++) {
                var layerCol = layerCols[layerColIndex];
                if (!layerCol) {
                    continue;
                }
                if (layerCol.liveCollision) {
                    this.liveCollisionLayers[layerKey].push(layerCol);
                    continue;
                }
                var minCellX = floor(layerCol._minX / this.colBucket);
                var maxCellX = floor(layerCol._maxX / this.colBucket);
                var minCellY = floor(layerCol._minY / this.colBucket);
                var maxCellY = floor(layerCol._maxY / this.colBucket);
                for (var cellX = minCellX; cellX <= maxCellX; cellX++) {
                    for (var cellY = minCellY; cellY <= maxCellY; cellY++) {
                        var cellKey = cellX + "," + cellY;
                        if (!layerBuckets[cellKey]) {
                            layerBuckets[cellKey] = [];
                        }
                        layerBuckets[cellKey].push(layerCol);
                    }
                }
            }
            this.collisionBuckets[layerKey] = layerBuckets;
        }
    }
    for (var i = 0; i < this.objectsTemp.length; i++) {
        var obj = this.objectsTemp[i];
        if (obj.forceMass) {
            for (var j = 0; j < obj.collisions.length; j++) {
                linkForceCol(this, obj.collisions[j], 1, 0);
            }
        }
    }
    this.laserDeckLevels = [];
    var deckLevels = {
    };
    for (var layerKey in this.collisionLayers) {
        if (!this.collisionLayers.hasOwnProperty(layerKey)) {
            continue;
        }
        var cols = this.collisionLayers[layerKey];
        for (var colIndex = 0; colIndex < cols.length; colIndex++) {
            var col = cols[colIndex];
            if (!col.plane || !col.blocksLasers) {
                continue;
            }
            var levelKey = ":" + col.surfaceZ;
            var level = deckLevels[levelKey];
            if (!level) {
                level = deckLevels[levelKey] = {
                    z: col.surfaceZ,
                    layers: []
                };
                this.laserDeckLevels.push(level);
            }
            if (level.layers.indexOf(+layerKey) < 0) {
                level.layers.push(+layerKey);
            }
        }
    }
    //Setup positioning
    this.spawnPos = config.spawnPosition || new PVector();
    this.killZ = config.killZ !== undefined ? config.killZ : this.bottomZ - 1;
    this.offsetX = config.offsetX !== undefined ? config.offsetX : 0;
    this.offsetY = config.offsetY !== undefined ? config.offsetY : 0;
    this.offsetZ = config.offsetZ !== undefined ? config.offsetZ : 0;
    //Setup Entities
    this.entities = {
    };
    for (var i = min(this.bottomZ, this.killZ) - 2; i < this.topZ + 3; i++) {
        this.entities[i] = [];
    }
};
GameMap.prototype.toggleDoorAt = function (mx, my) {
    var layer = floor(playerPos.z);
    var aim = screenToWorld(mx, my);
    var selected = null;
    var nearest = 999999;
    for (var i = 0; i < this.doors.length; i++) {
        var door = this.doors[i];
        var bottom = floor(door.lowZ);
        var top = floor(door.highZ);
        if (layer < bottom || layer > top || dist(playerPos.x, playerPos.y, door.x, door.y) > forceGripSettings.range * forceProfile(skin).range) {
            continue;
        }
        var scale = bottom !== top && !door.renderEveryLayer ? worldHeightScale(playerPos.z) : worldHeightScale(layer);
        var x = camPos.x + (aim.x - camPos.x) / scale - door.x;
        var y = camPos.y + (aim.y - camPos.y) / scale - door.y;
        var along = x * cos(door.rotation) + y * sin(door.rotation);
        var across = abs(y * cos(door.rotation) - x * sin(door.rotation));
        var pad = 5 / max(0.001, zoom * scale);
        if (abs(along) <= door.width / 2 + pad && across <= door.thickness / 2 + pad && across < nearest) {
            selected = door;
            nearest = across;
        }
    }
    if (!selected) {
        return false;
    }
    var open = selected.manualOpen === undefined ? selected.timer <= 0 : !selected.manualOpen;
    var c = cos(selected.rotation);
    var s = sin(selected.rotation);
    for (var i = 0; i < this.doors.length; i++) {
        var door = this.doors[i];
        var x = door.x - selected.x;
        var y = door.y - selected.y;
        if (door.rotation === selected.rotation && door.width === selected.width && abs(x * c + y * s) < 1 && abs(y * c - x * s) <= (door.thickness + selected.thickness) / 2) {
            door.forceGlowMap = this;
            door.forceGlowUntil = tickClock.gameMs + 650;
            door.manualOpen = open;
            door.manualUntil = undefined;
        }
    }
    return true;
};
GameMap.prototype.lowSort = function (a, b) {
    var first = typeof a === "number" ? this.rangeObjects[a] : a;
    var second = typeof b === "number" ? this.rangeObjects[b] : b;
    //Floor collision uses integer surface heights. Paint that surface before
    //its ground art and props, even when its configured Z has a tiny offset.
    var firstZ = first instanceof Floor ? floor(first.lowZ) : first.lowZ;
    var secondZ = second instanceof Floor ? floor(second.lowZ) : second.lowZ;
    if (firstZ !== secondZ) {
        return firstZ - secondZ;
    }
    if (first instanceof Floor && !(second instanceof Floor)) {
        return -1;
    }
    if (second instanceof Floor && !(first instanceof Floor)) {
        return 1;
    }
    return (first.lowZ + (first.renderOrderOffset || 0) - second.lowZ - (second.renderOrderOffset || 0));
};
GameMap.prototype.getNearbyCollisions = function (layer, x, y, radius, output) {
    var layerBuckets = this.collisionBuckets ? this.collisionBuckets[layer] : null;
    var liveCols = this.liveCollisionLayers ? this.liveCollisionLayers[layer] : null;
    var queryRadius = radius || 0;
    var found = output || [];
    found.length = 0;
    if (!layerBuckets) {
        var all = this.collisionLayers && this.collisionLayers[layer] || liveCols || [];
        for (var copyIndex = 0; copyIndex < all.length; copyIndex++) {
            found.push(all[copyIndex]);
        }
        return found;
    }
    var minCellX = floor((x - queryRadius) / this.colBucket);
    var maxCellX = floor((x + queryRadius) / this.colBucket);
    var minCellY = floor((y - queryRadius) / this.colBucket);
    var maxCellY = floor((y + queryRadius) / this.colBucket);
    if (minCellX === maxCellX && minCellY === maxCellY && (!liveCols || !liveCols.length)) {
        var singleBucket = layerBuckets[minCellX + "," + minCellY];
        for (var singleIndex = 0; singleBucket && singleIndex < singleBucket.length; singleIndex++) {
            found.push(singleBucket[singleIndex]);
        }
        return found;
    }
    var queryId = ++this._collisionQueryId;
    for (var cellX = minCellX; cellX <= maxCellX; cellX++) {
        for (var cellY = minCellY; cellY <= maxCellY; cellY++) {
            var bucket = layerBuckets[cellX + "," + cellY];
            if (!bucket) {
                continue;
            }
            for (var bucketIndex = 0; bucketIndex < bucket.length; bucketIndex++) {
                var col = bucket[bucketIndex];
                if (col._lastBucketQueryId === queryId) {
                    continue;
                }
                col._lastBucketQueryId = queryId;
                found.push(col);
            }
        }
    }
    if (liveCols && liveCols.length) {
        for (var liveIndex = 0; liveIndex < liveCols.length; liveIndex++) {
            found.push(liveCols[liveIndex]);
        }
    }
    return found;
};
GameMap.prototype.traceSight = function (from, to) {
    if (!from || !to || rayDeck(this, from, to)) {
        return false;
    }
    var dx = to.x - from.x;
    var dy = to.y - from.y;
    var dz = to.z - from.z;
    var steps = max(1, ceil(max(sqrt(dx * dx + dy * dy) / 18, abs(dz) * 2)));
    var cache = {
    };
    for (var step = 0; step <= steps; step++) {
        performanceStats.sightSamples++;
        var t = step / steps;
        var x = from.x + dx * t;
        var y = from.y + dy * t;
        var z = from.z + dz * t;
        var zRounded = round(z * 10) / 10;
        var cols = rayCols(this, x, y, z, cache);
        for (var i = 0; cols && i < cols.length; i++) {
            var col = cols[i];
            if (!col.plane && col.blocksLasers && col.checkCollision(x, y, zRounded)) {
                return false;
            }
        }
    }
    return true;
};
GameMap.prototype.update = function () {
    if (currentMap === this && !hasCommsHeadset() && squadEnabled) {
        syncSquadHeadset();
    }
    prepMap(this);
    performanceStats.targetCandidates = 0;
    performanceStats.sightSamples = 0;
    var updateStart = millis();
    for (var objectIndex = 0; objectIndex < this.objectsTemp.length; objectIndex++) {
        var obj = this.objectsTemp[objectIndex];
        if (obj.forceMotion) {
            updateForceProp(obj);
        }
        obj.update();
    }
    var placed = this.placedCrates || [];
    for (var i = 0; i < placed.length; i++) {
        if (placed[i].forceMotion && updateForceProp(placed[i])) {
            placed.splice(i, 1);
            i--;
        }
    }
    rebuildEntityGrid(this);
    this._entityGridActive = true;
    try {
        var pending = this._updateQueue || (this._updateQueue = []);
        var pendingCount = 0;
        var updateBottom = min(this.bottomZ, this.killZ) - 2;
        var updateTop = this.topZ + 3;
        for (var occupiedLayer in this.entities) {
            if (this.entities.hasOwnProperty(occupiedLayer) && this.entities[occupiedLayer].length) {
                updateBottom = min(updateBottom, +occupiedLayer);
                updateTop = max(updateTop, (+occupiedLayer) + 1);
            }
        }
        for (var layer = updateBottom; layer < updateTop; layer++) {
            var list = this.entities[layer];
            if (!list) {
                continue;
            }
            var count = list.length;
            for (var entityIndex = 0; entityIndex < count; entityIndex++) {
                var queued = pending[pendingCount] || (pending[pendingCount] = {
                });
                queued.entity = list[entityIndex];
                queued.layer = layer;
                pendingCount++;
            }
        }
        for (var pendingIndex = 0; pendingIndex < pendingCount; pendingIndex++) {
            var entry = pending[pendingIndex];
            var ent = entry.entity;
            entry.entity = null;
            ent._activeLayer = entry.layer;
            var result;
            try {
                result = ent.update();
            } finally {
                ent._activeLayer = undefined;
            }
            var nextLayer = ent.pos ? floor(ent.pos.z) : entry.layer;
            if (result === "delete" || nextLayer !== entry.layer) {
                var sourceList = this.entities[entry.layer];
                var sourceIndex = sourceList.indexOf(ent);
                if (sourceIndex !== -1) {
                    sourceList.splice(sourceIndex, 1);
                }
            }
            syncEntityGrid(this, ent, result === "delete");
            if (result === "delete") {
                if (forceGrip && forceGrip.target === ent && forceGrip.map === this) {
                    forceGrip = null;
                    forceGripReadyAt = tickClock.gameMs + forceGripSettings.cooldownMs;
                }
                ent._perceptionJob = null;
                ent._perception = null;
                ent._sightCache = null;
                ent._friendlyCheck = null;
                if (ent.isMatchBot && (matchState.gameMode === "Team Deathmatch" || isSupremacy())) {
                    matchState.botRespawns.push({
                        timer: deathRespawnAt,
                        team: ent.team,
                        skin: ent.skin,
                        temper: ent.temper,
                        walkSpeed: ent.usesPlayerSpeed ? undefined : ent.walkSpeed,
                        wasPlayerSquad: ent.wasPlayerSquad || ent.inPlayerSquad,
                        inPlayerSquad: ent.wasPlayerSquad || ent.inPlayerSquad
                    });
                }
                recycleProjectile(ent);
                continue;
            }
            if (nextLayer === entry.layer) {
                continue;
            }
            if (!this.entities[nextLayer]) {
                this.entities[nextLayer] = [];
            }
            this.entities[nextLayer].push(ent);
        }
    } finally {
        this._entityGridActive = false;
    }
    updateBotRespawns();
    performanceStats.updateMs = millis() - updateStart;
};
getViewBounds = function (layer) {
    var layerScale = worldHeightScale(layer);
    if (mapFetch || layerScale < 0.01) {
        return null;
    }
    var viewScale = 2 * max(0.001, zoom) * min(1, layerScale);
    var radius = (sqrt(width * width + height * height) / viewScale + 120 + screenShake) / max(0.01, cameraState.pitch);
    return {
        minX: camPos.x - radius,
        maxX: camPos.x + radius,
        minY: camPos.y - radius,
        maxY: camPos.y + radius
    };
};
var isMapObjVisible = function (obj, layer, bounds) {
    if (mapFetch || obj.gapFill) {
        return true;
    }
    bounds = bounds || getViewBounds(layer);
    if (!bounds) {
        return true;
    }
    if (obj instanceof Tree) {
        var radius = max(obj.width, obj.height) * 0.75 + 10;
        if (obj.x + radius >= bounds.minX && obj.x - radius <= bounds.maxX && obj.y + radius >= bounds.minY && obj.y - radius <= bounds.maxY) {
            return true;
        }
    } else {
        if (!obj.collisions || !obj.collisions.length || !(obj instanceof Wall || obj instanceof Floor || obj instanceof Circle || obj instanceof Box)) {
            return true;
        }
        for (var colIndex = 0; colIndex < obj.collisions.length; colIndex++) {
            var col = obj.collisions[colIndex];
            if (col._minX === undefined || (col._maxX >= bounds.minX && col._minX <= bounds.maxX && col._maxY >= bounds.minY && col._minY <= bounds.maxY)) {
                return true;
            }
        }
    }
    performanceStats.culledObjects++;
    return false;
};
gripTargetRadius = function (target) {
    if (target.forceRadius) {
        return target.forceRadius;
    }
    if (target.forceMass) {
        var w = target.width || target.size;
        var h = target.height || target.size;
        return sqrt(w * w + h * h) / 2;
    }
    return target instanceof Detonator ? 20 : target.colSize;
};


// BEGIN BASIC LIGHTING
var simpleLighting = {
    active: false,
    lights: 0
};
var addSimpleLight = function (x, y, radius, power, z) {
    if (!simpleLighting.active || simpleLighting.lights >= 6 || power <= 0) {
        return;
    }
    var screen = worldToScreen(x, y, z);
    if (screen.x < -120 || screen.y < -120 || screen.x > width + 120 || screen.y > height + 120) {
        return;
    }
    simpleLighting.lights++;
    var reach = constrain(radius, 8, 65);
    var rings = gameSettings.lightingQuality + 2;
    pushStyle();
    noStroke();
    ellipseMode(CENTER);
    for (var i = rings; i > 0; i--) {
        var size = reach * 2 * i / rings;
        fill(255, 190, 85, 28 * constrain(power, 0, 1) / rings);
        ellipse(x, y, size, size);
    }
    popStyle();
};
drawSimpleShadow = function (x, y, w, h) {
    pushStyle();
    noStroke();
    ellipseMode(CENTER);
    fill(5, 8, 11, 35);
    ellipse(x, y + 4, w * 0.5, h * 0.3);
    popStyle();
};
var drawActorShadow = function (skin, angle, size, hasJetpack) {
    var day = gameSettings.dayNight ? constrain(sin(((14 + tickClock.gameMs / 50000) % 24 - 6) * 15) * 2, 0, 1) : 1;
    var shadowName = skinImageNames[skin];
    var shadowImage = shadowName && loadedImages[shadowName + "_shadow"];
    if (shadowImage && day > 0.08) {
        pushStyle();
        pushMatrix();
        translate(13 * day, 10 * day);
        scale(1, 0.68);
        rotate(angle);
        image(shadowImage, -size, -size, size * 2, size * 2);
        if (hasJetpack && loadedImages.jetpack_sprite_shadow) {
            image(loadedImages.jetpack_sprite_shadow, -50, -10, 100, 100);
        }
        popMatrix();
        popStyle();
    }
    drawSimpleShadow(0, 0, size, size * 0.8);
};
var drawTreeShadow = function (tree) {
    if (!simpleLighting.active) {
        return;
    }
    var day = gameSettings.dayNight ? constrain(sin(((14 + tickClock.gameMs / 50000) % 24 - 6) * 15) * 2, 0, 1) : 1;
    pushStyle();
    noStroke();
    ellipseMode(CENTER);
    fill(0, 38);
    ellipse(tree.x, tree.y, tree.width / 4, tree.height / 4);
    if (day > 0.05) {
        var length = constrain(tree.highZ - tree.lowZ, 0.4, 2.5) * lerp(38, 16, day);
        var opacity = 20 + day * 25;
        pushMatrix();
        translate(tree.x + length, tree.y + length * 0.55);
        rotate(tree.rotation);
        fill(0, opacity);
        if (tree.shape === "tri") {
            scale(tree.width / 123);
            beginShape();
            for (var i = 0; i < treeCanopyPoints.length; i++) {
                vertex(treeCanopyPoints[i][0], treeCanopyPoints[i][1]);
            }
            endShape(CLOSE);
        } else {
            ellipse(0, 0, tree.width, tree.height);
        }
        popMatrix();
    }
    popStyle();
};
var finishSimpleLighting = function (map) {
    var active = simpleLighting.active;
    simpleLighting.active = false;
    if (!active) {
        return;
    }
    var day = gameSettings.dayNight ? constrain(sin(((14 + tickClock.gameMs / 50000) % 24 - 6) * 15) * 2, 0, 1) : 1;
    var shade = map === StarDestroyer ? 12 : lerp(48, 0, day);
    if (shade <= 0) {
        return;
    }
    pushStyle();
    pushMatrix();
    resetMatrix();
    rectMode(CORNER);
    noStroke();
    fill(12, 18, 28, shade);
    rect(0, 0, width, height);
    popMatrix();
    popStyle();
};

// END BASIC LIGHTING
var applyWorldHeight = function (height, baseLayer) {
    var base = baseLayer === undefined ? playerPos.z : baseLayer;
    translate(camPos.x, camPos.y);
    scale(worldHeightScale(base + height) / worldHeightScale(base));
    translate(-camPos.x, -camPos.y);
};
var beginForceGlow = function (target) {
    if (!target || (!gripHolds(target) && !(target.forceGlowMap === currentMap && tickClock.gameMs < (target.forceGlowUntil || 0)))) {
        return null;
    }
    var ctx = externals.context;
    ctx.save();
    ctx.shadowColor = "rgba(90, 190, 255, 0.95)";
    ctx.shadowBlur = (lowDetailMode ? 12 : 22) + sin(tickClock.gameMs * 0.18) * 2;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    return ctx;
};
var endForceGlow = function (ctx) {
    if (ctx) {
        ctx.restore();
    }
};
var renderWorldObject = function (map, obj, layer, bounds, renderBase) {
    var ctx = typeof externals !== "undefined" && externals.context;
    var roofDetail = !(obj instanceof Wall) && !(obj instanceof Floor) && !(obj instanceof Tree) && floor(obj.lowZ) > floor(playerPos.z) && (obj.floorArt === true || obj.floorArt === layer);
    if (ctx && roofDetail) {
        ctx.save();
        ctx.globalAlpha *= 80 / 255;
    }
    var forceGlow = beginForceGlow(obj);
    try {
        renderWorldObjectContent(map, obj, layer, bounds, renderBase);
    } finally {
        endForceGlow(forceGlow);
        if (ctx && roofDetail) {
            ctx.restore();
        }
    }
};
var renderWorldObjectContent = function (map, obj, layer, bounds, renderBase) {
    if (simpleLighting.active && layer === floor(obj.lowZ)) {
        if (obj instanceof Tree) {
            drawTreeShadow(obj);
        }
    }
    if (!obj.forceMass || obj.destroyed) {
        obj.render(layer, bounds);
        return;
    }

    pushMatrix();
    var base = renderBase === undefined ? layer : renderBase;
    applyWorldHeight(obj.pos.z - base, base);
    obj.render(layer, bounds);
    popMatrix();
};
GameMap.prototype.render = function () {
    prepMap(this);
    var renderStart = millis();
    performanceStats.culledObjects = 0;
    background(this.baseColor);
    this.onBackgroundRender();
    simpleLighting.lights = 0;
    simpleLighting.active = true;


    //Render game
    pushMatrix();
    //Center the canvas
    translate(width / 2 + cameraState.shakeX, height / 2 + cameraState.shakeY);
    rotate(cameraState.roll);
    scale(zoom, zoom * cameraState.pitch);
    var playerLayer = floor(playerPos.z);
    var renderTop = max(this.topZ + 2, playerLayer + 1);
    for (var entityLayer in this.entities) {
        if (this.entities.hasOwnProperty(entityLayer) && this.entities[entityLayer].length) {
            renderTop = max(renderTop, (+entityLayer) + 1);
        }
    }
    for (var i = min(this.bottomZ, this.killZ); i < renderTop; i++) {
        if (!this.entities[i]) {
            this.entities[i] = [];
        }

        var layerView = getViewBounds(i);
        if (mapFetch) {
            if (this.objects[i]) {
                pushMatrix();
                translate(-camPos.x, -camPos.y);
                for (var j = 0; j < this.objects[i].length; j++) {
                    if (typeof this.objects[i][j] === "number") {
                        this.rangeObjects[this.objects[i][j]].render(i, layerView);
                    } else {
                        this.objects[i][j].render(i, layerView);
                    }
                }
                popMatrix();
            }
        } else {
            //Check if there is an array for this layer
            if (this.objects[i] || this.entities[i].length > 0) {
                pushMatrix();
                scale(worldHeightScale(i));
                translate(-camPos.x, -camPos.y);
                //Loop through objects on the layer
                var objects = this.objects[i] || [];
                for (var j = 0; j < objects.length; j++) {
                    var entry = objects[j];
                    var spansLayers = typeof entry === "number";
                    var obj = spansLayers ? this.rangeObjects[entry] : entry;
                    if (!isMapObjVisible(obj, i, layerView)) {
                        continue;
                    }
                    var objBottom = floor(obj.lowZ);
                    var objTop = floor(obj.highZ);
                    if (!spansLayers || (obj.renderEveryLayer && i >= objBottom && i <= objTop) || (objTop <= playerLayer && i === objTop) || (objBottom > playerLayer && i === objBottom)) {
                        renderWorldObject(this, obj, i, layerView);
                    } else if (i === playerLayer) {
                        popMatrix();
                        pushMatrix();
                        translate(-camPos.x, -camPos.y);
                        renderWorldObject(this, obj, i, layerView, playerPos.z);
                        popMatrix();
                        pushMatrix();
                        scale(worldHeightScale(i));
                        translate(-camPos.x, -camPos.y);
                    }
                }
                drawBloodLayer(i, layerView);
                //Loop through the entities
                for (var j = 0; j < this.entities[i].length; j++) {
                    var entity = this.entities[i][j];
                    var raised = entity.pos.z !== i;
                    if (raised) {
                        pushMatrix();
                        //Do I need to be using the absolute sign?
                        applyWorldHeight(entity.pos.z - i, i);
                    }
                    var forceGlow = entity instanceof AIPlayer ? null : beginForceGlow(entity);
                    try {
                        entity.render(i, layerView);
                    } finally {
                        endForceGlow(forceGlow);
                    }
                    if (raised) {
                        popMatrix();
                    }
                }
                popMatrix();
            }
            drawSaberLayer(i);
            drawCombatHitLayer(i);
            //Render the player if it is their layer
            if (i === floor(playerPos.z)) {
                pushMatrix();
                var renderAlpha = constrain(tickClock.accumulatorMs / tickClock.stepMs, 0, 1);
                var playerDrawX = playerRenderPrevX === null || abs(playerPos.x - playerRenderPrevX) > 30 ? playerPos.x : lerp(playerRenderPrevX, playerPos.x, renderAlpha);
                var playerDrawY = playerRenderPrevY === null || abs(playerPos.y - playerRenderPrevY) > 30 ? playerPos.y : lerp(playerRenderPrevY, playerPos.y, renderAlpha);
                translate(playerDrawX - camPos.x, playerDrawY - camPos.y);
                var pack = jetpackEquipped && getSelectedCharData().equipment;
                drawActorShadow(skin, bodyAngle, 60, pack);
                drawSpawnGrace(0, 0, isB2Droid(skin) ? 68 : 43, {
                    isPlayerTarget: true
                });
                rotate(bodyAngle);
                if (pack) {
                    drawImg(loadedImages.jetpack_sprite, -50, -10, 100, 100);
                }
                drawPlayer(skin, 60, true);
                drawCharCosmetic(equippedCosmetic, 60);
                drawActorHands(null);
                popMatrix();
                if (currentGun && currentGun.isLightsaber && hasHeldSaber(currentGun, skin) && inventoryState.selected === 0) {
                    pushMatrix();
                    translate(-camPos.x, -camPos.y);
                    currentGun.renderBladeTrail();
                    popMatrix();
                }
            }
        }
    }
    popMatrix();

    finishSimpleLighting(this);
    performanceStats.renderMs = millis() - renderStart;
};
GameMap.prototype.playerCollide = function () {
    var output = this._playerCollisionOutput || (this._playerCollisionOutput = []);
    for (var j = floor(playerPos.z) - 1; j <= floor(playerPos.z); j++) {
        var layerCollisions = this.getNearbyCollisions ? this.getNearbyCollisions(j, playerPos.x, playerPos.y, hitboxSize + 4, output) : this.collisionLayers ? this.collisionLayers[j] : null;
        if (layerCollisions) {
            for (var l = 0; l < layerCollisions.length; l++) {
                impactWall(null, layerCollisions[l], playerPos, playerVel, hitboxSize, 0);
            }
        }
    }
};
GameMap.prototype.getMinimap = function () {
    pushMatrix();
    background(this.baseColor);
    translate(width / 2, height / 2);
    scale(width / this.width, height / this.height);
    translate(-this.offsetX, -this.offsetY);
    var previousMapFetch = mapFetch;
    mapFetch = true;
    try {
        for (var layer = min(this.bottomZ, this.killZ); layer < this.topZ + 2; layer++) {
            if (this.objects[layer]) {
                for (var objIndex = 0; objIndex < this.objects[layer].length; objIndex++) {
                    if (typeof this.objects[layer][objIndex] === "number") {
                        this.rangeObjects[this.objects[layer][objIndex]].render();
                    } else {
                        this.objects[layer][objIndex].render();
                    }
                }
            }
        }
        this.minimap = get();
    } finally {
        mapFetch = previousMapFetch;
        popMatrix();
    }
};
GameMap.prototype.drawMinimap = function () {
    image(this.minimap, 0, 0, width, height);
    return get(width / 2 + ((playerPos.x - this.offsetX) / this.width) * width - 75, height / 2 + ((playerPos.y - this.offsetY) / this.height) * height - 75, 150, 150);
};
/**GameMap Instances**/

//Map Factory
var makeMapObjects = function (Constructor, rows, keys, defaults) {
    var out = [];
    for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
        var config = defaults ? Object.create(defaults) : {};
        for (var keyIndex = 0; keyIndex < keys.length; keyIndex++) {
            if (rows[rowIndex][keyIndex] !== undefined) {
                config[keys[keyIndex]] = rows[rowIndex][keyIndex];
            }
        }
        out.push(new Constructor(config));
    }
    return out;
};

var destroyerLayout = {
    width: 5200,
    height: 6200,
    walls: [
        { x: -2400, y: 0, w: 100, h: 5700 },
        { x: 2400, y: 0, w: 100, h: 5700 },
        { x: 0, y: 2800, w: 4900, h: 100 },
        { x: -800, y: -2150, w: 90, h: 900 },
        { x: -800, y: -850, w: 90, h: 900 },
        { x: -800, y: 850, w: 90, h: 900 },
        { x: -800, y: 2150, w: 90, h: 900 },
        { x: 800, y: -2150, w: 90, h: 900 },
        { x: 800, y: -850, w: 90, h: 900 },
        { x: 800, y: 850, w: 90, h: 900 },
        { x: 800, y: 2150, w: 90, h: 900 },
        { x: -2125, y: 0, w: 450, h: 90 },
        { x: -1125, y: 0, w: 650, h: 90 },
        { x: 2125, y: 0, w: 450, h: 90 },
        { x: 1125, y: 0, w: 650, h: 90 },
        { x: -950, y: -1700, w: 380, h: 90 },
        { x: -950, y: -400, w: 380, h: 90 },
        { x: -950, y: 400, w: 380, h: 90 },
        { x: -950, y: 1700, w: 380, h: 90 },
        { x: 950, y: -1700, w: 380, h: 90 },
        { x: 950, y: -400, w: 380, h: 90 },
        { x: 950, y: 400, w: 380, h: 90 },
        { x: 950, y: 1700, w: 380, h: 90 },
        { x: -1575, y: -2800, w: 1650, h: 100 },
        { x: 1575, y: -2800, w: 1650, h: 100 },
        { x: 0, y: -2800, w: 1500, h: 90, lowZ: 0, highZ: 1.5, kind: "underbridge" },
        { x: -750, y: -2560, w: 90, h: 880, lowZ: 2, highZ: 5, kind: "commandBay" },
        { x: 750, y: -2560, w: 90, h: 880, lowZ: 2, highZ: 5, kind: "commandBay" },
        { x: 0, y: -3000, w: 1590, h: 100, lowZ: 2, highZ: 5, kind: "commandBay" }
    ],
    props: [
        { x: -1400, y: -2250, w: 330, h: 130, kind: "console" },
        { x: -1400, y: -1000, w: 330, h: 130, kind: "console" },
        { x: -1400, y: -650, w: 330, h: 130, kind: "console" },
        { x: 1460, y: -2180, w: 450, h: 500, kind: "reactor", forceMass: 5 },
        { x: 1460, y: -820, w: 450, h: 500, kind: "reactor", forceMass: 5 },
        { x: -1500, y: 650, w: 240, h: 220, kind: "cargo" },
        { x: -1200, y: 1000, w: 240, h: 220, kind: "cargo" },
        { x: -1550, y: 2150, w: 240, h: 220, kind: "cargo" },
        { x: -1150, y: 2350, w: 240, h: 220, kind: "cargo" },
        { x: 1380, y: 750, w: 350, h: 160, kind: "bench" },
        { x: 1750, y: 1100, w: 180, h: 260, kind: "cargo" },
        { x: -350, y: -800, w: 170, h: 130, kind: "cover" },
        { x: 350, y: 800, w: 170, h: 130, kind: "cover" },
        { x: -350, y: 1600, w: 170, h: 130, kind: "cover" },
        { x: -2200, y: -2150, w: 150, h: 280, kind: "cabinet" },
        { x: 2200, y: -1100, w: 150, h: 280, kind: "cabinet" },
        { x: -2200, y: 900, w: 150, h: 280, kind: "cabinet" },
        { x: 2200, y: 2350, w: 150, h: 280, kind: "cabinet" },
        { x: 0, y: -580, w: 270, h: 220, kind: "console" },
        { x: 0, y: 580, w: 270, h: 220, kind: "console" },
        { x: 0, y: -2750, w: 420, h: 140, kind: "console" },
        { x: -1800, y: 650, w: 210, h: 210, kind: "cargo" },
        { x: -1900, y: 2200, w: 200, h: 200, kind: "cargo" },
        { x: 1250, y: 2100, w: 200, h: 320, kind: "cabinet" },
        { x: 1750, y: 2250, w: 280, h: 150, kind: "bench" }
    ],
    waypoints: [
        [0, 2450],
        [0, -2450],
        [-2050, -2400],
        [2050, -2400],
        [-2050, 2400],
        [2050, 2400],
        [-1550, 0],
        [1550, 0],
        [0, -1500],
        [0, 0],
        [0, 1500]
    ],
    zones: [
        [-1600, -1500, "OPERATIONS"],
        [1600, -1500, "REACTOR"],
        [-1600, 1500, "CARGO"],
        [1600, 1500, "MAINTENANCE"],
        [0, -2500, "COMMAND"],
        [0, 2500, "HANGAR ENTRY"]
    ]
};
var drawDestroyerDeck = function () {
    pushStyle();
    rectMode(CENTER);
    noStroke();
    fill(34, 40, 47);
    rect(0, 0, 4800, 5600);
    fill(22, 28, 35);
    rect(-2080, 0, 380, 5430);
    rect(2080, 0, 380, 5430);
    fill(43, 50, 59);
    rect(0, 0, 1420, 5380);
    fill(33, 41, 50);
    rect(-1510, -1530, 1260, 2140, 26);
    fill(29, 37, 43);
    rect(1510, -1530, 1260, 2140, 26);
    fill(43, 43, 40);
    rect(-1510, 1530, 1260, 2140, 26);
    fill(36, 43, 51);
    rect(1510, 1530, 1260, 2140, 26);
    for (var y = -1500; y <= 1500; y += 1500) {
        fill(48, 55, 64);
        rect(0, y, 4550, y === 0 ? 430 : 300, 10);
    }
    popStyle();
};
var drawBulkhead = function (w) {
    pushStyle();
    rectMode(CENTER);
    stroke(36, 44, 54);
    strokeWeight(5);
    fill(111, 121, 133);
    rect(w.x, w.y, w.width, w.height, 3);
    popStyle();
};
var drawDestroyerProp = function (p) {
    pushStyle();
    rectMode(CENTER);
    noStroke();
    var x = p.x;
    var y = p.y;
    var w = p.w;
    var h = p.h;
    fill(16, 22, 29);
    rect(x, y, w, h, 8);
    if (p.kind === "holo") {
        fill(58, 71, 84);
        rect(x, y, w - 12, h - 12, 18);
        fill(26, 41, 55);
        ellipse(x, y, w * 0.8, h * 0.8);
        noFill();
        stroke(83, 145, 177);
        strokeWeight(5);
        ellipse(x, y, w * 0.66, h * 0.66);
        ellipse(x, y, w * 0.4, h * 0.4);
        line(x - w * 0.33, y, x + w * 0.33, y);
        line(x, y - h * 0.33, x, y + h * 0.33);
        noStroke();
        fill(144, 183, 198);
        triangle(x, y - h * 0.2, x - w * 0.15, y + h * 0.17, x + w * 0.15, y + h * 0.17);
    } else if (p.kind === "reactor") {
        fill(59, 70, 81);
        rect(x, y, w - 14, h - 14, 10);
        fill(29, 39, 48);
        rect(x, y, w * 0.76, h * 0.89, 14);
        for (var unit = -1; unit <= 1; unit += 2) {
            var rx = x + unit * w * 0.19;
            fill(79, 90, 101);
            rect(rx, y, w * 0.29, h * 0.79, 28);
            fill(36, 46, 57);
            rect(rx, y, w * 0.32, 18, 3);
        }
        fill(49, 72, 87);
        rect(x, y + h * 0.39, 50, 35, 4);
        fill(107, 163, 185);
        rect(x, y + h * 0.39, 28, 14, 2);
    } else if (p.kind === "console") {
        fill(62, 74, 87);
        rect(x, y, w - 12, h - 12, 7);
        var screens = w > 250 ? 3 : 2;
        for (var k = 0; k < screens; k++) {
            var sx = x - w * 0.31 + (k * w * 0.62) / max(1, screens - 1);
            fill(12, 25, 38);
            rect(sx, y - h * 0.14, (w / screens) * 0.73, h * 0.46, 4);
            fill(68, 126, 151);
            rect(sx, y - h * 0.14, (w / screens) * 0.57, h * 0.31, 2);
        }
    } else if (p.kind === "shuttle") {
        fill(46, 57, 67);
        rect(x, y, w - 10, h - 10, 8);
        for (var q = -1; q <= 1; q += 2) {
            fill(113, 100, 67);
            rect(x + q * w * 0.43, y, 12, h * 0.81);
        }
        fill(85, 95, 106);
        beginShape();
        vertex(x, y - h * 0.43);
        vertex(x - w * 0.41, y + h * 0.34);
        vertex(x + w * 0.41, y + h * 0.34);
        endShape(CLOSE);
        fill(160, 169, 178);
        beginShape();
        vertex(x, y - h * 0.43);
        vertex(x - w * 0.23, y + h * 0.31);
        vertex(x + w * 0.23, y + h * 0.31);
        endShape(CLOSE);
        fill(195, 201, 207);
        beginShape();
        vertex(x, y - h * 0.42);
        vertex(x - 24, y + h * 0.25);
        vertex(x + 24, y + h * 0.25);
        endShape(CLOSE);
        fill(34, 51, 68);
        rect(x, y - h * 0.16, 65, 94, 13);
        fill(89, 137, 160);
        rect(x, y - h * 0.2, 45, 20, 4);
        fill(43, 56, 70);
        rect(x - w * 0.18, y + h * 0.33, 62, 32, 8);
        rect(x + w * 0.18, y + h * 0.33, 62, 32, 8);
    } else if (p.kind === "cargo") {
        fill(87, 87, 76);
        rect(x, y, w - 12, h - 12, 5);
        stroke(58, 65, 63);
        strokeWeight(11);
        line(x - w * 0.34, y - h * 0.34, x + w * 0.34, y + h * 0.34);
        line(x + w * 0.34, y - h * 0.34, x - w * 0.34, y + h * 0.34);
        noStroke();
        fill(43, 53, 59);
        rect(x, y, 44, 54, 4);
        for (var corner = -1; corner <= 1; corner += 2) {
            fill(53, 62, 67);
            rect(x + corner * w * 0.4, y, 16, h - 22);
        }
    } else {
        fill(74, 87, 100);
        rect(x, y, w - 12, h - 12, 5);
        fill(41, 55, 67);
        rect(x, y, w * 0.54, 22, 3);
    }
    popStyle();
};
var drawCommandDeck = function () {
    var a = playerPos.z < 2 - 0.001 ? 130 : 255;
    pushStyle();
    rectMode(CENTER);
    stroke(126, 139, 151, a);
    strokeWeight(8);
    noFill();
    rect(0, -2560, 1450, 830, 16);
    noStroke();
    fill(9, 20, 34, a);
    rect(0, -2900, 1300, 145, 18);
    for (var pane = -1; pane <= 1; pane++) {
        fill(35, 55, 77, a);
        rect(pane * 405, -2900, 388, 108, 4);
    }
    popStyle();
};

var destroyerDeckScale = 0.55;
var buildDestroyerObjs = function () {
    var deck = destroyerLayout;
    var objects = [
        new Floor({ x: 0, y: 0, width: 4800 * destroyerDeckScale, height: 5600 * destroyerDeckScale, zValue: 0.0001, color: color(0, 0), fadeColor: color(0, 0) })
    ];
    objects.push(
    new Decoration({
        zValue: 0,
        floorArt: true,
        onRender: function () {
            pushMatrix();
            scale(destroyerDeckScale);
            drawDestroyerDeck();
            popMatrix();
        }
    })
    );
    for (var i = 0; i < deck.walls.length; i++) {
        var w = deck.walls[i];
        var bulkhead = new Wall({
            x: w.x * destroyerDeckScale,
            y: w.y * destroyerDeckScale,
            width: w.w * destroyerDeckScale,
            height: w.h * destroyerDeckScale,
            cornerRadius: 3 * destroyerDeckScale,
            borderSize: 5 * destroyerDeckScale,
            lowZ: w.lowZ || 0,
            highZ: w.highZ !== undefined ? w.highZ : abs(w.x) > 2300 || abs(w.y) >= 2800 ? 5 : 3.2,
            blocksLasers: true,
            top: false,
            renderEveryLayer: true
        });
        bulkhead.deckVisual = { x: w.x, y: w.y, width: w.w, height: w.h };
        bulkhead.render = function () {
            pushMatrix();
            scale(destroyerDeckScale);
            drawBulkhead(this.deckVisual);
            popMatrix();
        };
        objects.push(bulkhead);
    }
    for (var j = 0; j < deck.props.length; j++) {
        var p = deck.props[j];
        var raised = abs(p.x) < 600 && p.y < -2100;
        var prop = new Wall({
            x: p.x * destroyerDeckScale,
            y: p.y * destroyerDeckScale,
            width: p.w * destroyerDeckScale,
            height: p.h * destroyerDeckScale,
            cornerRadius: 8 * destroyerDeckScale,
            borderSize: 0,
            lowZ: raised ? 2.01 : 0,
            highZ: raised ? 3.15 : 1.15,
            blocksLasers: true,
            top: false
        });
        prop.deckVisual = p;
        prop.forceMass = p.forceMass || (p.kind === "cargo" ? 1 : 0);
        if (p.kind === "cargo") {
            prop.isDestructibleCrate = true;
            prop.collisions[0].crate = prop;
            prop.health = 100;
            prop.maxHealth = 100;
            prop.destroyed = false;
        }
        if (prop.forceMass) {
            prop.pos = new PVector(prop.x, prop.y, prop.lowZ);
        }
        prop.render = function () {
            if (this.lowZ >= 2 && playerPos.z < 1.95) {
                return;
            }
            if (this.destroyed) {
                drawCrateWreck(this);
                return;
            }
            pushMatrix();
            translate(this.x, this.y);
            rotate(this.rotation);
            scale(destroyerDeckScale);
            translate(-this.deckVisual.x, -this.deckVisual.y);
            drawDestroyerProp(this.deckVisual);
            popMatrix();
        };
        objects.push(prop);
    }
    for (var side = -1; side <= 1; side += 2) {
        for (var dy = -1500; dy <= 1500; dy += 3000) {
            var door = new BlastDoor({
                x: side * 800 * destroyerDeckScale,
                y: dy * destroyerDeckScale,
                width: 400 * destroyerDeckScale,
                thickness: 32 * destroyerDeckScale,
                rotation: 90,
                lowZ: 0,
                highZ: 3.2,
                dist: 260,
                distZ: [0, 3],
                speed: 0.5,
                renderEveryLayer: true
            });
            for (var dc = 0; dc < door.collisions.length; dc++) {
                door.collisions[dc].destroyerDoor = true;
            }
            door.renderOrderOffset = -0.001;
            door.isDestroyerDoor = true;
            objects.push(door);
        }
    }
    objects.push(
    new Floor({
        x: 0,
        y: -2560 * destroyerDeckScale,
        width: 1500 * destroyerDeckScale,
        height: 880 * destroyerDeckScale,
        zValue: 2,
        color: color(45, 55, 67),
        fadeColor: color(45, 55, 67, 130)
    })
    );
    objects.push(
    new Decoration({
        zValue: 2.001,
        floorArt: true,
        onRender: function () {
            pushMatrix();
            scale(destroyerDeckScale);
            drawCommandDeck();
            popMatrix();
        }
    })
    );
    for (var stairSide = -1; stairSide <= 1; stairSide += 2) {
        var stair = new Stairs({
            x: stairSide * 400 * destroyerDeckScale,
            y: -1950 * destroyerDeckScale,
            width: [360 * destroyerDeckScale, 360 * destroyerDeckScale],
            height: 500 * destroyerDeckScale,
            topLanding: 24,
            lowZ: 0,
            highZ: 2,
            zChange: [0, 2],
            rails: true,
            railThickness: 8,
            color: color(86, 99, 113),
            railColor: color(135, 147, 157),
            stepHeight: 12,
            stepSpace: 9
        });
        stair.isDestroyerStair = true;
        objects.push(stair);
    }
    return objects;
};
StarDestroyer = new GameMap({
    baseColor: color(5, 8, 15),
    spawnPosition: new PVector(0, 2450 * destroyerDeckScale, 0.05),
    killZ: -3,
    width: destroyerLayout.width * destroyerDeckScale,
    height: destroyerLayout.height * destroyerDeckScale,
    objects: buildDestroyerObjs()
});

//Supremacy
var makeSupremacyCamp = function () {
    var x = 300;
    var y = -1765;
    return [
        new CommandPost({ x: x, y: y, zValue: 0, radius: 480, controllingTeam: -1, controlState: "neutral" }),
        new Wall({ x: x - 160, y: y - 290, width: 200, height: 28, cornerRadius: 6, lowZ: 0, highZ: 0.65, color: color(88, 93, 82) }),
        new Wall({ x: x + 160, y: y - 290, width: 200, height: 28, cornerRadius: 6, lowZ: 0, highZ: 0.65, color: color(88, 93, 82) }),
        new Wall({ x: x - 290, y: y, width: 28, height: 260, cornerRadius: 6, lowZ: 0, highZ: 0.65, color: color(88, 93, 82) }),
        new Wall({ x: x + 290, y: y, width: 28, height: 260, cornerRadius: 6, lowZ: 0, highZ: 0.65, color: color(88, 93, 82) }),
        new Box({ x: x - 210, y: y - 190, size: 65, lowZ: 0, highZ: 0.7 }),
        new Box({ x: x - 145, y: y - 210, size: 48, lowZ: 0, highZ: 0.7 }),
        new Box({ x: x + 220, y: y + 175, size: 60, lowZ: 0, highZ: 0.7 }),
        new Decoration({
            zValue: 0.01,
            onRender: function () {
                pushStyle();
                rectMode(CENTER);
                stroke(42, 51, 57);
                strokeWeight(3);
                for (var i = 0; i < 3; i++) {
                    fill(104, 119, 119);
                    ellipse(x + 170 + i * 32, y - 220, 27, 27);
                    stroke(180, 192, 174);
                    line(x + 161 + i * 32, y - 220, x + 179 + i * 32, y - 220);
                    stroke(42, 51, 57);
                }
                fill(63, 77, 69);
                rect(x - 220, y + 180, 80, 43, 4);
                stroke(180, 187, 144);
                line(x - 250, y + 180, x - 190, y + 180);
                popStyle();
            }
        })
    ];
};

//Maps
Jakku = new GameMap({
    baseColor: color(220, 180, 30),
    spawnPosition: new PVector(-200, -500, 3.5),
    killZ: -3,
    width: 5000,
    height: 5000,
    objects: [
        //Base
        new Decoration({
            floorArt: true,
            onRender: function () {
                drawImg(loadedImages.Jakku_Sand, -2500, -2500, 5000, 5000);
            },
            zValue: 0.00001
        }),
        //new Floor ({width: 10000, height: 10000, zValue: 0.0001, color: color(255, 0), fadeColor: color(255, 0)}),
        //new Decoration ({onRender: function(){fill(255, 0, 0); ellipse(-100, -100, 50, 50);}, zValue: 0.5}),
        //new Sands ({zValue: 0.00001}),
        new Floor({ x: -2225, width: 550, height: 5000, zValue: 0.0001, color: color(255, 0), fadeColor: color(255, 0) }),
        new Floor({ x: 475, width: 4050, height: 5000, zValue: 0.0001, color: color(255, 0), fadeColor: color(255, 0) }),
        new Floor({ x: -1750, width: 500, y: -2125, height: 750, zValue: 0.0001, color: color(255, 0), fadeColor: color(255, 0) }),
        new Floor({ x: -1750, width: 500, y: 1500, height: 2000, zValue: 0.0001, color: color(255, 0), fadeColor: color(255, 0) }),
        //Small Platform
        new Floor({ x: 300, y: 300, rotation: 30, color: color(150, 50, 0), fadeColor: color(150, 50, 0, 150), height: 500, width: 300, zValue: 1 }),
        new Wall({ x: 425, y: 230, rotation: 30, color: color(120, 25, 0), borderColor: color(100, 15, 0), width: 10, height: 500, blocksLasers: false, lowZ: 0.9, highZ: 1.2 }),
        new Wall({ x: 170, y: 80, rotation: 30, color: color(120, 25, 0), borderColor: color(100, 15, 0), width: 300, height: 10, blocksLasers: false, lowZ: 0.9, highZ: 1.2 }),
        new Wall({ x: 423, y: 515, rotation: 30, color: color(120, 25, 0), borderColor: color(100, 15, 0), width: 300, height: 10, blocksLasers: false, lowZ: 0.9, highZ: 1.2 }),
        new Wall({ x: 85, y: 220, rotation: 30, color: color(120, 25, 0), borderColor: color(100, 15, 0), width: 10, height: 150, blocksLasers: false, lowZ: 0.9, highZ: 1.2 }),
        new Wall({ x: 260, y: 520, rotation: 30, color: color(120, 25, 0), borderColor: color(100, 15, 0), width: 10, height: 150, blocksLasers: false, lowZ: 0.9, highZ: 1.2 }),
        new Stairs({
            x: 140,
            y: 385,
            rotation: -60,
            width: [220, 200],
            railColor: color(120, 25, 0),
            color: color(140, 40, 0),
            railThickness: 8,
            zChange: [0, 1],
            topLanding: 24,
            lowZ: 0.5,
            highZ: 1.1,
            mode: "smooth"
        }),
        new JunkPile({ x: 360, y: 450, lowZ: 0.3, highZ: 1.3, type: 4, rotation: 30 }),
        new JunkPile({ x: 300, y: 100, lowZ: 0.3, highZ: 1.3, type: 2, rotation: 200 }),
        //new Stairs({x: -150, y: 385, rotation: 70, mode: "smooth", zChange: [0, 1], zValue: 0.5, height: 400}),
        //Ground Ramp
        new Decoration({
            x: -700,
            y: 0,
            lowZ: 0.1,
            highZ: 3,
            floorArt: 3,
            castsShadow: false,
            onRender: function () {
                noStroke();
                fill(230, 170, 45);
                beginShape();
                vertex(this.x + 150, this.y + 400);
                curveVertex(this.x + 135, this.y + 200);
                vertex(this.x + 150, this.y);
                curveVertex(this.x + 135, this.y - 300);
                vertex(this.x + 150, this.y - 600);
                vertex(this.x - 150, this.y - 600);
                curveVertex(this.x - 135, this.y - 300);
                vertex(this.x - 150, this.y);
                curveVertex(this.x - 195, this.y + 200);
                vertex(this.x - 150, this.y + 400);
                endShape();
                ellipse(this.x, this.y - 500, 375, 425);
                fill(200, 150, 15);
                beginShape();
                vertex(this.x + 100, this.y + 400);
                curveVertex(this.x + 90, this.y + 200);
                vertex(this.x + 100, this.y);
                curveVertex(this.x + 90, this.y - 200);
                vertex(this.x + 100, this.y - 400);
                vertex(this.x - 100, this.y - 400);
                curveVertex(this.x - 90, this.y - 200);
                vertex(this.x - 100, this.y);
                curveVertex(this.x - 130, this.y + 200);
                vertex(this.x - 100, this.y + 400);
                endShape();
                ellipse(this.x, this.y - 500, 250, 350);
                ellipse(this.x - 25, this.y + 200, 250, 75);
            },
            collisions: [
                new Collision({ x: -700, y: -210, lowZ: 0.1, highZ: 1.1, type: "rect", height: 480, width: 250 }),
                new Collision({ x: -700, y: -500, height: 400, width: 350, type: "ellipse", lowZ: 0.1, highZ: 2.1 })
            ]
        }),
        new Floor({ x: -700, y: -500, width: 375, height: 425, ellipse: true, zValue: 3, castsShadow: true, color: color(255, 0), fadeColor: color(255, 0) }),
        //Bridge
        new Floor({ x: -200, width: 800, y: -525, height: 200, color: color(140, 140, 130), fadeColor: color(140, 140, 130, 150), zValue: 3 }),
        //Raised platform
        new SparkParticles2({ x: 280, y: -765, rate: 170, color: color(150, 150, 200, 200), direction: 140, zValue: 3.05 }),
        new Floor({
            points: [200, -625, 200, -425, 450, -350, 450, -1100],
            color: color(150, 50, 0),
            fadeColor: color(150, 50, 0, 150),
            zValue: 3.05
        }),
        new Floor({ x: 675, width: 452, y: -600, height: 500, color: color(150, 50, 0), fadeColor: color(150, 50, 0, 150), zValue: 3.05 }),
        //new Wall({x: 450, y: -850, height: 500, lowZ: 3.2, highZ: 5.2, borderColor: color(1, 1, 1, 0), color: color(1, 1, 1, 0)}),
        //new Wall({x: 450, y: -400, height: 100, lowZ: 3.2, highZ: 5.2, borderColor: color(1, 1, 1, 0), color: color(1, 1, 1, 0)}),
        new Wall({ x: 900, y: -600, color: color(120, 25, 0), borderColor: color(100, 15, 0), width: 20, height: 500, blocksLasers: false, zValue: 3.1 }),
        new Wall({ x: 692, y: -360, color: color(120, 25, 0), borderColor: color(100, 15, 0), width: 435, height: 20, blocksLasers: false, zValue: 3.1 }),
        new Wall({ x: 545, y: -840, color: color(120, 25, 0), borderColor: color(100, 15, 0), width: 135, height: 20, blocksLasers: false, zValue: 3.1 }),
        new Decoration({
            zValue: 3,
            onRender: function () {
                //Hanging / Broken metal
                strokeWeight(10);
                stroke(120, 25, 0);
                fill(120, 25, 0);
                //Main platform
                line(290, -800, 260, -850);
                line(245, -700, 200, -710);
                line(200, -625, 190, -650);
                line(350, -900, 360, -975);
                line(190, -630, 420, -1050);
                line(620, -850, 610, -875);
                line(680, -850, 670, -875);
                line(740, -850, 730, -875);
                line(800, -850, 790, -875);
                line(475, -875, 790, -875);
                //Pit bay bridges
                line(-2070, 440, -2060, 410);
                line(-1900, 440, -2060, 410);
                line(-2070, 240, -2020, 270);
                line(-1910, 240, -1950, 260);
                line(-1930, 240, -2090, 275);
                arc(-2260, -525, 80, 180, 240, 550);
                line(-2100, -1750, -2070, -1770);
                line(-2070, -1770, -1900, -1775);
                line(-1900, -1775, -1900, -1750);
                line(-1980, -1750, -1950, -1780);
                line(-2030, -1790, -2020, -1750);
            }
        }),
        new SparkParticles2({ x: 850, y: -850, direction: 90, zValue: 3.05 }),
        //Hallway
        new Floor({ x: -1045, y: -525, width: 450, height: 200, color: color(140, 140, 130), fadeColor: color(140, 140, 130, 150), zValue: 3 }),
        //new Floor({x: -1120, y: -875, width: 250, height: 700, color: color(140, 140, 130), fadeColor: color(140, 140, 130, 150), zValue: 1.1}),
        new Wall({ x: -1120, y: -875, width: 250, height: 700, color: color(140, 140, 130), zValue: 0.5, borderColor: color(255, 0) }),
        new Stairs({
            x: -1120,
            y: -825,
            width: [200, 210],
            height: 400,
            topLanding: 24,
            zChange: [1, 3],
            mode: "smooth",
            railColor: color(130, 130, 140),
            railThickness: 8,
            lowZ: 1.2,
            highZ: 3.2,
            rotation: 180
        }),
        new Stairs({
            x: -910,
            y: -1125,
            width: [200, 210],
            height: 90,
            topLanding: 55,
            mode: "smooth",
            railColor: color(130, 130, 140),
            railThickness: 8,
            zChange: [0, 1],
            zValue: 0.5,
            rotation: 90
        }),
        //new BlastDoor({rotation: 90, zValue: 1.1, x: -1000, y: -1125, speed: 1}),
        //new BlastDoor({rotation: 90, zValue: 3.3, x: -1000, y: -525, speed: 2}),
        new Wall({ x: -1250, y: -525, height: 200, lowZ: 1.2, highZ: 2.2, borderColor: color(255, 0) }),
        new Wall({ x: -975, y: -525, height: 200, lowZ: 0.2, highZ: 2.2, borderColor: color(255, 0) }),
        //If this project was not created by Lemon and CoderGuy, or spun off from the original, it is plagiarism
        //Pit Bay and Bridges
        new Wall({ color: color(150, 50, 0), borderColor: color(100, 50, 0), zValue: 0.5, x: -1370, width: 250, height: 2500, y: -750 }),
        new Wall({ color: color(150, 50, 0), borderColor: color(100, 15, 0), zValue: 0.5, x: -2125, width: 250, height: 2500, y: -750 }),
        new Wall({ color: color(150, 50, 0), borderColor: color(100, 15, 0), zValue: 0.5, x: -1747.5, width: 1004, height: 250, y: 625 }),
        new Wall({ color: color(150, 50, 0), borderColor: color(100, 15, 0), zValue: 0.5, x: -1747.5, width: 502, height: 250, y: -1875 }),
        new Floor({ color: color(130, 40, 0), fadeColor: color(130, 40, 0, 150), x: -1760, y: -525, height: 200, width: 1000, zValue: 3.05 }),
        new Floor({ color: color(130, 40, 0), fadeColor: color(130, 40, 0, 150), x: -2000, y: -655, width: 200, height: 2190, zValue: 3.05 }),
        //new SparkParticles2({zValue: 3, x: -2000, y: -1750, direction: 9}),
        new SparkParticles2({ x: -2000, y: -1750, direction: 90, zValue: 3 }),
        //Rails
        //Previously had lowZ 0.4 highZ 1.2
        new Wall({ x: -1500, y: -625, color: color(120, 25, 0), borderColor: color(100, 15, 0), width: 30, height: 2250, blocksLasers: false, zValue: 1.2 }),
        new Wall({ x: -2000, y: -625, color: color(120, 25, 0), borderColor: color(100, 15, 0), width: 30, height: 2250, blocksLasers: false, zValue: 1.2 }),
        new Wall({ x: -1750, y: 500, color: color(120, 25, 0), borderColor: color(100, 15, 0), width: 525, height: 30, blocksLasers: false, zValue: 1.2 }),
        new Wall({ x: -1750, y: -1750, color: color(120, 25, 0), borderColor: color(100, 15, 0), width: 525, height: 30, blocksLasers: false, zValue: 1.2 }),
        new Wall({ x: -1750, y: -2000, color: color(120, 25, 0), borderColor: color(100, 15, 0), width: 1025, height: 30, blocksLasers: false, zValue: 1.2 }),
        new Wall({ x: -2250, y: -625, color: color(120, 25, 0), borderColor: color(100, 15, 0), width: 30, height: 2750, blocksLasers: false, zValue: 1.2 }),
        new Wall({ x: -1750, y: 750, color: color(120, 25, 0), borderColor: color(100, 15, 0), width: 1025, height: 30, blocksLasers: false, zValue: 1.2 }),
        new Wall({ x: -1250, y: 150, color: color(120, 25, 0), borderColor: color(100, 15, 0), width: 30, height: 1200, blocksLasers: false, zValue: 1.2 }),
        //Rail posts
        new Decoration({
            zValue: 0.9,
            onRender: function () {
                var scale = -0.1 * (floor(playerPos.z) - 0.5);
                noStroke();
                fill(120, 25, 0);
                for (var railIter = 500; railIter >= -1750; railIter -= 150) {
                    ellipse(-2000, railIter, 30, 30);
                    ellipse( -2000 + (-2000 - camPos.x) / 15, railIter + (railIter - camPos.y) / 15, 45, 45);
                    ellipse(-1500, railIter, 30, 30);
                    ellipse( -1500 + (-1500 - camPos.x) / 15, railIter + (railIter - camPos.y) / 15, 45, 45);
                    ellipse(-2250, railIter, 30, 30);
                    ellipse( -2250 + (-2250 - camPos.x) / 15, railIter + (railIter - camPos.y) / 15, 45, 45);
                    if (railIter > -400) {
                        ellipse(-1250, railIter, 30, 30);
                        ellipse( -1250 + (-1250 - camPos.x) / 15, railIter + (railIter - camPos.y) / 15, 45, 45);
                    }
                }
                for (railIter = -2250; railIter < -1250; railIter += 150) {
                    ellipse(railIter, 750, 30, 30);
                    ellipse(railIter, -2000, 30, 30);
                }
                ellipse(-2250, -1900, 30, 30);
                ellipse(-2250, 650, 30, 30);
                ellipse(-1250, 650, 30, 30);
                ellipse(-1850, 500, 30, 30);
                ellipse(-1650, 500, 30, 30);
                ellipse(-1850, -1750, 30, 30);
                ellipse(-1650, -1750, 30, 30);
            }
        }),
        //Pit
        new CrashedTIE({ zValue: -2.4, type: "ln", x: -1750, y: -750, rotation: -90 }),
        new JunkPile({ x: -1850, y: -1250, zValue: -2.4 }),
        new JunkPile({ x: -1700, y: -1600, zValue: -2.4 }),
        new JunkPile({ x: -1900, y: 400, zValue: -2.4 }),
        new JunkPile({ x: -1650, y: 150, zValue: -2.4 }),
        //Raised Platforms
        new Stairs({
            zChange: [0, 1.4],
            rotation: 180,
            lowZ: 0.6,
            highZ: 1.6,
            width: [700, 680],
            height: 120,
            topLanding: 48,
            y: 766,
            x: -300
        }),
        new Wall({ lowZ: 0.4, highZ: 1.4, width: 2400, height: 1200, y: 1460, x: -1100 }),
        new Decoration({
            zValue: 1.5,
            onRender: function () {
                drawImg(loadedImages.Jakku_Platform_Sand, -2300, 860, 2400, 1200);
            }
        }),
        new Stairs({
            zChange: [1.4, 4],
            rotation: 90,
            height: 300,
            topLanding: 24,
            width: [200, 210],
            x: -1500,
            y: 1000,
            lowZ: 2.6,
            highZ: 3.6,
            color: color(120),
            railColor: color(150),
            stepHeight: 15
        }),
        new Stairs({
            zChange: [1.4, 4],
            rotation: 90,
            height: 300,
            topLanding: 24,
            width: [200, 210],
            x: -1500,
            y: 1920,
            lowZ: 2.6,
            highZ: 3.6,
            color: color(120),
            railColor: color(150),
            stepHeight: 15
        }),
        //-1650  -2300
        new Floor({ width: 650, height: 1200, y: 1460, x: -1975, zValue: 4, color: color(120, 110, 130), fadeColor: color(120, 110, 130, 120) }),
        new Floor({
            color: color(130, 40, 0),
            fadeColor: color(130, 40, 0, 150),
            zValue: 3.05,
            points: [-2120, 860, -1880, 860, -1900, 440, -2100, 440]
        }),
        new SparkParticles2({ zValue: 3, y: 440, x: -2000, direction: 90 }),
        new Wall({ x: -1975, width: 650, y: 2060, zValue: 4.5 }),
        new Wall({ x: -2300, height: 1200, y: 1460, zValue: 4.5 }),
        //Graveyard
        new AT_AT({ x: 150, y: -1750, zValue: 0.5, imgName: "AT_AT_Sand" }),
        new CrashedTIE({ x: 1500, y: 500, zValue: 0.5, rotation: -30, type: "sf" }),
        new FireParticles({ x: 1550, y: 400, zValue: 0.7 }),
        new FireParticles({ x: 1800, y: 700, zValue: 0.7 }),
        new Decoration({
            x: 1560,
            y: 370,
            rotation: -30,
            zValue: 0.3,
            onRender: function () {
                pushMatrix();
                translate(this.x, this.y);
                rotate(this.rotation);
                stroke(190, 150, 60);
                strokeWeight(5);
                fill(255, 0);
                arc(0, 0, 400, 1500, 180, 270);
                arc(400, 0, 400, 1500, 180, 270);
                arc(0, 0, 230, 100, 0, 180);
                arc(20, -150, 230, 100, 0, 180);
                arc(40, -300, 230, 100, 0, 180);
                arc(60, -450, 230, 100, 0, 180);
                popMatrix();
            }
        }),
        new CrashedTIE({ type: "ln", x: 1800, y: -1900, zValue: 0.5, rotation: 45 }),
        new CrashedXwing({ x: 1100, y: 1700, zValue: 0.5, rotation: 45 }),
        new CrashedXwing({ x: 1300, y: -700, zValue: 0.5, rotation: 260, color: color(0, 0, 200) }),
        //Junk
        new JunkPile({ zValue: 1.6, x: -1000, y: 1000, type: 4 }),
        new JunkPile({ zValue: 1.6, x: -70, y: 1700, type: 3, rotation: 110 }),
        new JunkPile({ zValue: 1.6, x: -550, y: 1900, type: 5 }),
        new JunkPile({ zValue: 1.6, x: -2000, y: 1300, type: 1 }),
        new JunkPile({ zValue: 1.6, x: -1500, y: 1500, type: 2 }),
        new JunkPile({ zValue: 4.3, x: -1800, y: 1650 }),
        new JunkPile({ zValue: 4.3, x: -2050, y: 1250, type: 2 }),
        new JunkPile({ zValue: 4.3, x: -2100, y: 1900, type: 4 })
    ] .concat(
    layerObj(
    { y: -725, height: 750, x: 450, borderColor: color(150, 150, 160) },
    0.5,
    2.5
    )
    ) .concat(
    layerObj(
    { x: 450, y: -850, height: 500, borderColor: color(150, 150, 160) },
    3.2,
    5.2
    )
    ) .concat(
    layerObj(
    { x: 450, y: -400, height: 100, borderColor: color(150, 150, 160) },
    3.2,
    5.2
    )
    ) .concat(
    layerObj(
    { x: -975, y: -825, height: 400, borderColor: color(150, 150, 160) },
    0.2,
    5.2
    )
    ) .concat(
    layerObj(
    { x: -1250, y: -825, height: 400, borderColor: color(150, 150, 160) },
    0.2,
    5.2
    )
    ) .concat(
    layerObj(
    { x: -1045, y: -425, width: 450, borderColor: color(150, 150, 160) },
    0.2,
    5.2
    )
    ) .concat(
    layerObj(
    { x: -1120, y: -1862.5, width: 250, height: 1275, borderColor: color(150, 150, 160) },
    0.2,
    5.2
    )
    ) .concat(
    layerObj(
    { x: -2100, y: -675, height: 2400, width: 200, borderColor: color(120, 120, 130), color: color(120, 120, 130) }, -2.2,
    0.2
    )
    ) .concat(
    layerObj(
    { x: -1400, y: -675, height: 2400, width: 200, borderColor: color(120, 120, 130), color: color(120, 120, 130) }, -2.2,
    0.2
    )
    ) .concat(
    layerObj(
    { x: -1750, y: -1850, height: 200, width: 750, borderColor: color(120, 120, 130), color: color(120, 120, 130) }, -2.2,
    0.2
    )
    ) .concat(
    layerObj(
    { x: -1750, y: 600, height: 200, width: 750, borderColor: color(120, 120, 130), color: color(120, 120, 130) }, -2.2,
    0.2
    )
    ) .concat(
    layerObj(
    {
        rotation: 90,
        x: -1000,
        y: -1125,
        speed: 1,
        thickness: 25,
        distZ: [0, 3.1]
    },
    1.1,
    3.1,
    "BlastDoor"
    )
    ) .concat(
    layerObj(
    {
        rotation: 90,
        x: -1000,
        y: -525,
        speed: 2,
        thickness: 25,
        distZ: [2.3, 5.3]
    },
    3.3,
    5.3,
    "BlastDoor"
    )
    ),
    zChangers: [
        new zChanger(
        { x: -700, y: -50, type: "rect", width: 300, height: 900, lowZ: 0, highZ: 3, topLanding: 24 },
        "smooth",
        [0, 3]
        ),
        new zChanger(
        { x: -2000, y: 650, type: "rect", width: 220, height: 420, lowZ: 3, highZ: 4, rotation: 180, topLanding: 24 },
        "smooth",
        [3, 4]
        )
    ]
});
Kashyyyk = new GameMap({
    //Background Color
    baseColor: lerpColor(color(60, 40, 25), color(30, 70, 40), 0.3),
    spawnPosition: new PVector(300, 2235, 0),
    killZ: -2,
    width: 5400,
    height: 5400,
    offsetX: 300,
    offsetY: 300,
    //spawnPosition: new PVector(130, -165, 0),
    //Objects
    objects: [
        new Floor({ x: 300, y: 300, width: 5400, height: 5400, zValue: 0.0001, color: color(255, 0), fadeColor: color(255, 0) }),
        new KashyyykFloor({})
    ] .concat(
    makeMapObjects(
    Tree,
    [
        [-454, 1120, 327, 3],
        [1577, 449, 494, 3],
        [-782, 1426, 381, 3],
        [867, 920, 450, 3],
        [-1082, -504, 236, 3],
        [-1008, 283, 253, 3],
        [351, 1002, 489, 3],
        [-874, -1008, 302, 3],
        [-1170, -782, 270, 3],
        [-1150, 1467, 255, 3],
        [88, -847, 333, 3],
        [-575, 818, 330, 1],
        [-1160, 1706, 264, 3],
        [653, -1127, 368, 3],
        [724, 327, 201, 3],
        [-299, 810, 306, 3],
        [-232, -397, 299, 3],
        [-1045, 1234, 305, 3],
        [1305, 633, 321, 3],
        [1119, 834, 235, 3],
        [1638, -975, 206, 3],
        [-164, 584, 200, 3],
        [-891, 1737, 325, 3],
        [-313, 1453, 335, 3],
        [-721, 1161, 406, 3],
        [-856, -700, 274, 3],
        [-529, 1485, 404, 3],
        [-598, 194, 338, 3],
        [-351, -226, 255, 3],
        [-990, 763, 461, 3],
        [-1055, -174, 221, 3],
        [-713, -308, 418, 3],
        [42, -486, 391, 3],
        [704, 1281, 393, 3],
        [407, -899, 428, 3],
        [820, 522, 256, 3],
        [973, 1257, 255, 3],
        [1178, -1139, 412, 3],
        [-1090, 479, 256, 3],
        [-743, -17, 353, 3],
        [644, 666, 428, 3],
        [950, 1544, 438, 3],
        [-213, -654, 362, 3],
        [-318, -1065, 442, 3],
        [-482, 509, 476, 3],
        [-562, -602, 319, 3],
        [-35, 368, 400, 3],
        [1155, 1089, 317, 3],
        [-919, 1012, 225, 3],
        [-208, 48, 351, 3]
    ],
    ["x", "y", "width", "zValue"],
    { zValue: 3 }
    )
    ) .concat(
    makeMapObjects(
    Wall,
    [
        [300, 5400 / 2 + 325, 5400, 50, color(0), undefined, undefined],
        [300, -5400 / 2 + 275, 5400, 50, color(0), undefined, undefined],
        [5400 / 2 + 325, 300, 50, 5400 + 100, color(0), undefined, undefined],
        [-5400 / 2 + 275, 300, 50, 5400 + 100, color(0), undefined, undefined],
        [115, 1525, 210, 30, color(15), color(15), 0.1],
        [485, 1525, 210, 30, color(15), color(15), 0.1],
        [25, 1675, 30, 281, color(15), color(15), 0.1],
        [575, 1675, 30, 281, color(15), color(15), 0.1],
        [300 - 500, 1830, 800, 30, color(15), color(15), 0.1],
        [300 + 500, 1830, 800, 30, color(15), color(15), 0.1],
        [300 - 900, 1830 + 400, 30, 830, color(15), color(15), 0.1],
        [300 + 900, 1830 + 400, 30, 830, color(15), color(15), 0.1],
        [300, 1830 + 800, 1800, 30, color(15), color(15), 0.1],
        [115, 1525, 210, 30, color(20), color(20), 1],
        [485, 1525, 210, 30, color(20), color(20), 1],
        [25, 1675, 30, 281, color(20), color(20), 1],
        [575, 1675, 30, 281, color(20), color(20), 1],
        [300 - 500, 1830, 800, 30, color(20), color(20), 1],
        [300 + 500, 1830, 800, 30, color(20), color(20), 1],
        [300 - 900, 1830 + 400, 30, 830, color(20), color(20), 1],
        [300 + 900, 1830 + 400, 30, 830, color(20), color(20), 1],
        [300, 1830 + 800, 1800, 30, color(20), color(20), 1],
        [115, 1525, 210, 30, color(25), color(25), 2],
        [485, 1525, 210, 30, color(25), color(25), 2],
        [25, 1675, 30, 281, color(25), color(25), 2],
        [575, 1675, 30, 281, color(25), color(25), 2],
        [300 - 500, 1830, 800, 30, color(25), color(25), 2],
        [300 + 500, 1830, 800, 30, color(25), color(25), 2],
        [300 - 900, 1830 + 400, 30, 830, color(25), color(25), 2],
        [300 + 900, 1830 + 400, 30, 830, color(25), color(25), 2],
        [300, 1830 + 800, 1800, 30, color(25), color(25), 2]
    ],
    ["x", "y", "width", "height", "color", "borderColor", "zValue"]
    )
    ) .concat([
            //Shop Desk
        new Wall({ x: 300 + 650, y: 1830 + 569, width: 80, height: 430, color: color(22), borderColor: color(22), zValue: 0.1 })
            //Shop NPC
            //Doors
    ]) .concat(
    makeMapObjects(
    BlastDoor,
    [
        [0, 1525, 0.7, 30],
        [1.999, 1525, 0.7, 30],
        [0.999, 1525, 0.7, 30],
        [2.999, 1525, 0.7, 30],
        [0, 1837, 0.5, 16],
        [0, 1822, 0.5, 16],
        [0.999, 1822, 0.5, 16],
        [0.999, 1837, 0.5, 16],
        [1.999, 1822, 0.5, 16],
        [1.999, 1837, 0.5, 16],
        [2.999, 1822, 0.5, 16],
        [2.999, 1837, 0.5, 16]
    ],
    ["zValue", "y", "speed", "thickness"],
    { rotation: 0, x: 300, color: color(56, 56, 56), panelTop: 2.999, distZ: [0, 2], dzm: false }
    )
    ) .concat([
        new Floor({
            points: [12.5, 1509.5, 587.5, 1509.5, 587.5, 1813, 1215, 1813, 1215, 2643, -455, 2643, -455, 2550, -575, 2550, -575, 2430, -455, 2430, -455, 1813, 12.5, 1813],
            collisions: makeMapObjects(Collision, [[380, 2228, 1670, 830], [300, 1661.25, 575, 303.5], [-515, 2490, 120, 120]], ["x", "y", "width", "height"], { type: "rect", zValue: 3, plane: true }),
            zValue: 3,
            color: color(25),
            fadeColor: color(0, 1)
        }),
        new Stairs({ x: -510, y: 2250, rotation: 180, width: [130, 130], height: 360, topLanding: 24, zChange: [0, 3], lowZ: 0, highZ: 3, color: color(135, 135, 135), rails: false })
    ]) .concat([
        new Box({ x: 420, y: -782, size: 70 }),
        new CommandPost({ x: 300, y: 2365, zValue: 0, controlState: "capturing" }),
        new AT_AT({ x: 2428, y: 1162 })
            //new Decoration ({onRender: function(){blaster(127, 1766, 68, 40);}, zValue: 0.00001}),
            //new sparkParticles({x: 200, y: 200, direction: 68})
    ]) .concat(makeSupremacyCamp())
});
/**Create Blasters**/

//Weapons
Blaster = function (config) {
    this.weaponId = config.weaponId || "F_11D";
    this.displayName = config.displayName || this.weaponId.replace(/_/g, "-");
    this.spriteId = config.spriteId || this.weaponId;
    this.laserSpeed = config.laserSpeed;
    this.damage = config.damage;
    this.pellets = config.pellets || 1;
    this.laserRender = config.laserRender;
    this.fireRate = config.fireRate;
    this.shotTime = 0;
    this.shotsAllowed = config.shotsAllowed;
    this.shots = 0;
    this.reloadSpeed = config.reloadSpeed;
    this.reloadTime = 0;
    this.renderFunc = config.renderFunc;
    this.maxDist = config.maxDist;
    this.accuracy = config.accuracy;
    this.recoil = config.recoil || recoilProfiles[this.weaponId] || recoilProfiles.F_11D;
    this.auto = config.auto !== undefined ? config.auto : false;
    this.renderZoom = config.renderZoom;
    this.scopeFov = config.scopeFov;
};
Blaster.prototype.tick = function () {
    if (this.shotTime > 0) {
        this.shotTime = max(0, this.shotTime - tickClock.scale);
    }
    if (this.reloadTime > 0) {
        this.reloadTime = max(0, this.reloadTime - tickClock.scale);
        //When reload finishes, reset shots
        if (this.reloadTime === 0) {
            this.shots = 0;
        }
    }
};
Blaster.prototype.tryReload = function () {
    if (this.reloadTime > 0) {
        return false;
    }
    if (this.shots <= 0 || this.shots >= this.shotsAllowed) {
        return false;
    }
    this.reloadTime = this.reloadSpeed;
    return true;
};
Blaster.prototype.update = function () {
    var firingPose = canUseGameInput() && (leftHeld() || mouseClick);
    if (currentGun && currentGun.isLightsaber) {
        playerGunPose = 1;
    } else {
        var reloading = currentGun && currentGun.reloadTime > 0;
        var poseScreen = worldToScreen(playerPos.x, playerPos.y);
        playerGunPose = lerp(playerGunPose, reloading ? 0 : firingPose ? 1 : dist(mouseX, mouseY, poseScreen.x, poseScreen.y) < 170 ? 0 : 1, constrain((firingPose ? 0.32 : 0.18) * tickClock.scale, 0, 1));
    }
    var repeatFire = gameSettings.firingMode === 0 ? this.auto : gameSettings.firingMode === 1;
    if (firingPose && (mouseClick || repeatFire)) {
        this.shoot(playerPos, getHandAngle(null) - 90);
    }
    this.tick();
};
Blaster.prototype.render = function () {
    pushStyle();
    pushMatrix();
    rectMode(CORNER);
    this.renderFunc();
    popMatrix();
    popStyle();
};
var assistShot = function (x, y, z, angle, speed) {
    var lead = gameSettings.aimAssist === 2;
    var limit = lead ? 9 : 7;
    var best = limit;
    var result = angle;
    var aim = screenToWorld(mouseX, mouseY);
    var cursorAngle = atan2(aim.y - y, aim.x - x);
    var origin = {
        x: x,
        y: y,
        z: z
    };
    var targets = currentMap.entities[floor(z)] || [];
    for (var i = 0; i < targets.length; i++) {
        var target = targets[i];
        if (!target.isMatchBot || target.team === playerTeam || target.health <= 0 || hasSpawnGrace(target) || floor(target.pos.z) !== floor(z)) {
            continue;
        }
        var dx = target.pos.x - x;
        var dy = target.pos.y - y;
        var rangeSq = dx * dx + dy * dy;
        if (rangeSq > 900 * 900 || abs(angleDifference(atan2(dy, dx), cursorAngle)) > limit) {
            continue;
        }
        var time = lead && target.vel && speed > 0 ? min(12, sqrt(rangeSq) / speed) : 0;
        var tx = target.pos.x;
        var ty = target.pos.y;
        for (var step = 0; time > 0 && step < 2; step++) {
            tx = target.pos.x + target.vel.x * time;
            ty = target.pos.y + target.vel.y * time;
            time = min(12, dist(x, y, tx, ty) / speed);
        }
        var turn = angleDifference(atan2(ty - y, tx - x), angle);
        if (abs(turn) >= best) {
            continue;
        }
        var screen = worldToScreen(target.pos.x, target.pos.y, target.pos.z);
        if (screen.x < 0 || screen.x > width || screen.y < 0 || screen.y > height || Laser.prototype.raycastWalls.call(Laser.prototype, origin, target.pos)) {
            continue;
        }
        if (time > 0 && (tx !== target.pos.x || ty !== target.pos.y) && Laser.prototype.raycastWalls.call(Laser.prototype, origin, {
            x: tx,
            y: ty,
            z: z
        })) {
            continue;
        }
        best = abs(turn);
        result = angle + (lead ? constrain(turn, -4.5, 4.5) : constrain(turn * 0.5, -2.5, 2.5));
    }
    return result;
};
Blaster.prototype.shootFrom = function (pos, rot, owner, overrides) {
    if (owner && (gripHolds(owner) || !canAttack(owner))) {
        return false;
    }
    if (owner && tickClock.gameMs < (owner.zapUntil || 0)) {
        return false;
    }
    if (!pos) {
        return false;
    }
    var cfg = overrides || {
    };
    if (owner && !owner.isPlayer && duelTarget(cfg.target || (owner.aiMemory && owner.aiMemory.target)) && this.reloadTime === 0 && this.shotTime === 0) {
        this.shotTime = 12;
        return false;
    }
    var damage = this.damage;
    var laserSpeed = this.laserSpeed;
    var accuracy = this.accuracy;
    var maxDist = this.maxDist;
    var fireRate = this.fireRate;
    if (cfg.damage !== undefined) {
        damage = cfg.damage;
    }
    if (cfg.laserSpeed !== undefined) {
        laserSpeed = cfg.laserSpeed;
    }
    if (cfg.accuracy !== undefined) {
        accuracy = cfg.accuracy;
    }
    if (cfg.maxDist !== undefined) {
        maxDist = cfg.maxDist;
    }
    if (cfg.fireRate !== undefined) {
        fireRate = cfg.fireRate;
    }
    if (cfg.lightningFear && channelingZap() && this.reloadTime === 0 && this.shotTime === 0 && random(1) < 0.7) {
        this.shotTime = max(12, fireRate);
        return false;
    }
    //Only allow shooting if not reloading and fire cooldown is done
    if (this.reloadTime === 0 && this.shotTime === 0) {
        var layer = constrain(floor(pos.z), currentMap.killZ, currentMap.topZ + 1);
        if (!currentMap.entities[layer]) {
            currentMap.entities[layer] = [];
        }
        var weaponPose = owner && (owner.isPlayer || (owner.pos && owner.bodyAngle !== undefined)) ? getHandPose(owner.isPlayer ? null : owner) : null;
        var recoilKick = weaponPose ? weaponPose.kick : 0;
        var muzzleX = pos.x - cos(rot) * recoilKick;
        var muzzleY = pos.y - sin(rot) * recoilKick;
        if (this.weaponId === "B2_Wrist") {
            //Right wrist: the same local coordinates as the enlarged arm sprite.
            var wristSide = (133 * 60 * 1.65) / 212;
            var wristPivot = (20 * 60 * 1.65) / 212;
            var wristForward = (150 * 60 * 1.65) / 212 - recoilKick;
            var bodyForward = owner && owner.isPlayer ? bodyAngle - 90 : owner && owner.bodyAngle !== undefined ? owner.bodyAngle - 90 : rot;
            muzzleX = pos.x + cos(bodyForward) * wristPivot - sin(bodyForward) * wristSide + cos(rot) * wristForward;
            muzzleY = pos.y + sin(bodyForward) * wristPivot + cos(bodyForward) * wristSide + sin(rot) * wristForward;
            if (owner && owner.isPlayer) {
                var armAim = getB2MouseAim(pos, bodyForward, weaponPose.recoilAngle, recoilKick);
                muzzleX = armAim.x;
                muzzleY = armAim.y;
                rot = armAim.angle;
            }
        }
        if (gameSettings.aimAssist && owner && owner.isPlayer) {
            rot = assistShot(muzzleX, muzzleY, pos.z, rot, laserSpeed * 1.5);
        }
        var zVel = cfg.aimZ === undefined ? 0 : (cfg.aimZ - pos.z) * laserSpeed / max(60, dist(muzzleX, muzzleY, cfg.target.pos.x, cfg.target.pos.y));
        //Fire the laser
        for (var pellet = 0; pellet < this.pellets; pellet++) {
            var shotAngle = rot + (this.pellets > 1 ? map(pellet, 0, this.pellets - 1, -accuracy, accuracy) + random(-1, 1) : random(-accuracy, accuracy));
            var laserConfig = {
                weaponId: this.weaponId,
                muzzleOffset: this.weaponId === "B2_Wrist" ? 0 : 12,
                x: muzzleX,
                y: muzzleY,
                z: pos.z,
                xVel: cos(shotAngle) * laserSpeed,
                yVel: sin(shotAngle) * laserSpeed,
                zVel: zVel,
                damage: damage,
                renderFunc: this.laserRender,
                maxDist: maxDist,
                owner: owner || null
            };
            currentMap.entities[layer].push(getPooledLaser(laserConfig));
        }
        //Increment shot count and set fire cooldown
        addWeaponRecoil(this, owner);
        this.shotTime = fireRate;
        this.shots++;
        //Check if we've reached max shots for the magazine
        if (this.shots >= this.shotsAllowed) {
            //Start reload
            this.reloadTime = this.reloadSpeed;
            this.shots = this.shotsAllowed;
            //Don't reset shots yet - keep them at max until
            //reload finishes
        }
        return true;
    }
    return false;
};
Blaster.prototype.shoot = function (pos, rot) {
    return this.shootFrom(
    pos,
    rot,
    {
        isPlayer: true,
        team: playerTeam
    },
    null
    );
};
var blasterBoltGlow = null;
var bakeBoltGlow = function () {
    var buffer = createGraphics(64, 32, P2D);
    var opacity = [];
    for (var y = 0; y < 32; y++) {
        var dy = (y + 0.5 - 16) / 16;
        for (var x = 0; x < 64; x++) {
            var dx = max(0, abs(x + 0.5 - 32) - 22) / 10;
            var falloff = max(0, 1 - dx * dx - dy * dy);
            opacity.push(round(215 * falloff * falloff * falloff));
        }
    }
    buffer.background(255, 37, 53);
    blasterBoltGlow = buffer.get(0, 0, 64, 32);
    blasterBoltGlow.mask(opacity);
};
F_11D = new Blaster({
    weaponId: "F_11D",
    fireRate: 10,
    shotsAllowed: 30,
    reloadSpeed: 120,
    laserSpeed: 50,
    damage: 10,
    maxDist: 300,
    accuracy: 4,
 //degrees
    laserRender: function (laser, bounds) {
        var t = laser.deathTime;
        if (!laser.dead) {
            var tail = laser.getTailPoint();
            var x = laser.pos.x;
            var y = laser.pos.y;
            if (bounds && (max(x, tail.x) + 22 < bounds.minX || min(x, tail.x) - 22 > bounds.maxX || max(y, tail.y) + 22 < bounds.minY || min(y, tail.y) - 22 > bounds.maxY)) {
                return;
            }
            var dx = tail.x - x;
            var dy = tail.y - y;
            var length = sqrt(dx * dx + dy * dy);
            pushStyle();
            translate(x, y);
            rotate(atan2(dy, dx));
            if (blasterBoltGlow) {
                imageMode(CORNER);
                noTint();
                image(blasterBoltGlow, -12, -24, length + 24, 48);
            }
            strokeCap(ROUND);
            strokeWeight(12);
            stroke(255, 80, 95, 205);
            line(0, 0, length, 0);
            strokeWeight(7.5);
            stroke(255, 190, 195, 245);
            line(0, 0, length, 0);
            strokeWeight(4.5);
            stroke(255, 253, 250);
            line(0, 0, length, 0);
            popStyle();

            return;
        }
        var prog = t / 3;
        var fade = 1 - prog / 2;
        var Size = 1 + prog * 50;
        noStroke();
        fill(255, 50, 50, 120 * fade);
        ellipse(laser.pos.x, laser.pos.y, Size, Size);
        fill(255, 200, 200, 200 * fade);
        ellipse(laser.pos.x, laser.pos.y, Size * 0.5, Size * 0.5);
        fill(255, 255, 255, 255 * fade);
        ellipse(laser.pos.x, laser.pos.y, Size * 0.2, Size * 0.2);
        var tailLen = 5;
        strokeWeight(4 * fade);
        stroke(255, 120, 120, 255 * fade);
        line(laser.pos.x, laser.pos.y, laser.pos.x - laser.vel.x * tailLen, laser.pos.y - laser.vel.y * tailLen);
    },

    renderFunc: function () {
        translate(0, -11);
        pushStyle();
        noStroke();
        rectMode(CORNER);
        fill(30);
        rect(87, 6, 29, 9, 5);
        rect(111, 5, 5, 11, 50);
        rect(99, 5, 13, 11, 50);
        rect(59, -7, 28, 10, 5);
        rect(15, 13, 28, 10, 5);
        rect(-7, 1, 28, 18, 5);
        fill(255);
        rect(0, 0, 100, 20, 5);
        fill(30);
        rect(41, 3, 60, 2, 5);
        rect(41, 9, 62, 2, 5);
        rect(41, 15, 59, 2, 5);
        rect(8, 3, 28, 14, 5);
        popStyle();
    }
});
Sniper = function (x, y, s) {
    pushStyle();
    rectMode(CORNER);
    pushMatrix();
    translate(x, y);
    translate(0, -10);
    scale(s / 100);
    noStroke();
    fill(10);
    rect(95, 5, 59, 10, 5);
    rect(145, 3, 10, 14, 5, 0, 0, 5);
    rect(63, 0, 28, 10, 23);
    fill(128, 128, 128);
    rect(0, 2.5, 100, 15, 5);
    fill(10);
    rect(118, 7, 62, 5, 5);
    rect(4, 5, 15, 10, 0, 5, 5, 0);
    rect(9, 6, 78, 8, 5);
    rect(70, 5, 25, 10, 5, 0, 0, 5);
    popMatrix();
    popStyle();
};
var sniperSprite = Sniper;
Sniper = new Blaster({
    weaponId: "Sniper",
    fireRate: 38,
    shotsAllowed: 6,
    reloadSpeed: 78,
    laserSpeed: 140,
    damage: 120,
    maxDist: 1250,
    accuracy: 0.3,
    auto: false,
    renderZoom: 0.25,
    scopeFov: 0.7,
    laserRender: F_11D.laserRender,
    renderFunc: function () {
        sniperSprite(0, 0, 100);
    }
});
var E11 = new Blaster({
    weaponId: "E11",
    displayName: "E-11",
    spriteId: "F_11D",
    fireRate: 10,
    shotsAllowed: 30,
    reloadSpeed: 120,
    laserSpeed: 50,
    damage: 10,
    maxDist: 300,
    accuracy: 5,
 //degrees
    laserRender: F_11D.laserRender,
    renderFunc: function () {
        noStroke();
        fill(30);
        rect(87, 4, 29, 12, 5);
        rect(59, -7, 28, 10, 5);
        rect(15, 13, 28, 10, 5);
        rect(-7, 1, 28, 18, 5);
        fill(48, 48, 48);
        rect(0, 0, 100, 20, 5);
        fill(30);
        rect(41, 3, 60, 2, 5);
        rect(41, 9, 62, 2, 5);
        rect(41, 15, 59, 2, 5);
        rect(8, 3, 28, 14, 5);
    }
});
drawB2BlasterIcon = function () {
    pushStyle();
    rectMode(CORNER);
    stroke(100);
    strokeWeight(2);
    fill(65);
    rect(0, -13, 61, 26, 5);
    rect(59, -11, 45, 8, 2);
    rect(59, 3, 45, 8, 2);
    noStroke();
    fill(90);
    rect(8, -8, 39, 4, 2);
    fill(35);
    rect(98, -10, 6, 6);
    rect(98, 4, 6, 6);
    popStyle();
};
B2WristBlaster = new Blaster({
    weaponId: "B2_Wrist",
    displayName: "Wrist Blaster",
    spriteId: "B2_Wrist",
    fireRate: 8,
    shotsAllowed: 40,
    reloadSpeed: 100,
    laserSpeed: 55,
    damage: 16,
    maxDist: 450,
    accuracy: 4,
    auto: true,
    laserRender: F_11D.laserRender,
    renderFunc: function () {
        rectMode(CORNER);
        stroke(31, 40, 49);
        strokeWeight(3);
        fill(100, 122, 139);
        rect(0, -10, 68, 40, 8);
        fill(54, 68, 80);
        rect(58, -6, 45, 12, 3);
        rect(58, 15, 45, 12, 3);
        fill(20, 28, 34);
        rect(97, -5, 8, 10, 2);
        rect(97, 16, 8, 10, 2);
    }
});
var syncPlayerWeapon = function () {
    syncPlayerForce();
    if (isB2Droid(skin)) {
        currentGun = B2WristBlaster;
    } else if (currentGun === B2WristBlaster) {
        currentGun = character === "Jedi" ? new Lightsaber({
        }) : F_11D;
    }
};
Lightsaber = function (config) {
    config = config || {
    };
    this.isLightsaber = true;
    this.displayName = "Lightsaber";
    this.spriteId = "lightsaber";
    this.damage = config.damage !== undefined ? config.damage : 14;
    this.range = config.range !== undefined ? config.range : 185;
    this.arc = config.arc !== undefined ? config.arc : 118;
    this.accuracy = 0;
    this.shotsAllowed = 1;
    this.shots = 0;
    this.reloadTime = 0;
    this.reloadSpeed = 18;
    this.shotTime = 0;
    this.fireRate = config.fireRate !== undefined ? config.fireRate : 22;
    this.saberAngle = 0;
    this.swing = -40;
    this.clicked = false;
    this.halfWay = false;
    this.randomNumber = 0;
    this.wasMousePressed = false;
    this.swingDidDamage = false;
    this.spinAngle = 0;
    this.spinVelocity = 0;
    this.aimVelocity = 0;
    this.on = true;
    this.bladeLength = 1;
    this.throwState = null;
    this.throwReadyAt = 0;
    this.dualThrows = null;
    this.nextThrowSide = 1;
    this.bladeTrail = [];
};

Lightsaber.prototype.tick = function () {
    this.bladeLength += ((this.on ? 1 : 0) - this.bladeLength) * (1 - pow(movementSettings.drag, tickClock.scale));
    if (this.shotTime > 0) {
        this.shotTime = max(0, this.shotTime - tickClock.scale);
    }
    if (!this.clicked) {
        this.swing += (-40 - this.swing) * 0.25;
    } else if (this.randomNumber === 0) {
        if (this.halfWay === false) {
            this.swing += 7 * tickClock.scale;
        } else {
            this.swing -= 7 * tickClock.scale;
        }
        if (this.swing <= -40 && this.halfWay) {
            this.halfWay = false;
            this.clicked = false;
            this.swing = -40;
            this.randomNumber = floor(random(0, 3));
        }
        if (this.swing >= 100 && !this.halfWay) {
            this.halfWay = true;
        }
    } else if (this.randomNumber === 1) {
        this.swing += 10 * tickClock.scale;
        if (this.swing >= 320) {
            this.halfWay = false;
            this.clicked = false;
            this.swing = -40;
            this.randomNumber = floor(random(0, 3));
        }
    } else {
        this.swing -= 10 * tickClock.scale;
        if (this.swing <= -400) {
            this.halfWay = false;
            this.clicked = false;
            this.swing = -40;
            this.randomNumber = floor(random(0, 3));
        }
    }
};
var extinguishSaber = function (saber) {
    saber.dualPose = null;
    saber.on = false;
    saber.bladeLength = 0;
    saber.clicked = false;
    saber.spinVelocity = 0;
    saber.spinAngle = 0;
    saber.wasMousePressed = false;
    saber.bladeTrail = [];
};
Lightsaber.prototype.updateSpin = function (held, speed) {
    if (held) {
        this.spinVelocity += (speed - this.spinVelocity) * (1 - pow(0.82, tickClock.scale));
    } else {
        this.spinVelocity *= pow(0.72, tickClock.scale);
        if (abs(this.spinVelocity) < 0.15) {
            this.spinVelocity = 0;
            this.spinAngle += angleDifference(0, this.spinAngle) * 0.18;
        }
    }
    this.spinAngle = (this.spinAngle + this.spinVelocity * tickClock.scale) % 360;
};
Lightsaber.prototype.holdSwing = function (held, skinName, speed) {
    this.updateSpin(held, (speed || 34) * (saberStyle(skinName).spinScale || 1));
    if (held) {
        this.clicked = true;
    }
};
Lightsaber.prototype.sampleSwing = function (pos, angle, skinName, actor) {
    var last = this.contactSpinTick === tickClock.tick - 1 && this.bladeTrail[this.bladeTrail.length - 1];
    this.sampleHeldTrail(pos, angle, skinName, actor);
    var index = this.bladeTrail.indexOf(last);
    this.contactSpinTick = tickClock.tick;
    return index < 0 ? max(0, this.bladeTrail.length - 1) : index;
};
var spinBladeHits = function (trail, first, x, y, radius) {
    for (var i = first; i < trail.length; i++) {
        var sample = trail[i];
        if (sample.primaryHeld !== false && saberSweepDist(x, y, sample.base.x, sample.base.y, sample.tip.x, sample.tip.y) <= radius) {
            return true;
        }
        if (sample.guardLeft && saberSweepDist(x, y, sample.guardLeft.x, sample.guardLeft.y, sample.guardRight.x, sample.guardRight.y) <= radius) {
            return true;
        }
        if (sample.offhandBase && saberSweepDist(x, y, sample.offhandBase.x, sample.offhandBase.y, sample.offhandTip.x, sample.offhandTip.y) <= radius) {
            return true;
        }
        if (sample.rearBase && saberSweepDist(x, y, sample.rearBase.x, sample.rearBase.y, sample.rearTip.x, sample.rearTip.y) <= radius) {
            return true;
        }
    }
    return false;
};
Lightsaber.prototype.update = function () {
    if (!canAttack()) {
        this.clicked = false;
        this.spinVelocity = 0;
        this.tick();
        return;
    }
    var dashHits = dashBill && dashBill.spinHits;
    if (!hasHeldSaber(this, skin) || (rightHeld && !saberStyle(skin).dual && !dashHits)) {
        this.tick();
        return;
    }
    if (!this.on && (mouseClick || gameInput.mousePressed || leftHeld())) {
        this.on = true;
        this.tick();
        return;
    }
    playerGunPose = 1;
    if (runPlayerDuel(this)) {
        return;
    }
    var handAngle = getHandAngle(null);
    var diff = handAngle - this.saberAngle;
    diff = atan2(sin(diff), cos(diff));
    this.aimVelocity = abs(diff);
    this.saberAngle += diff * 0.2;
    var spinning = this.on && (leftHeld() || dashHits);
    this.holdSwing(spinning, skin, dashHits ? 48 : 34);
    if (spinning) {
        this.wasMousePressed = true;
        if (this.shotTime <= 0) {
            this.swingDidDamage = false;
            this.shotTime = this.fireRate;
        }
    } else if (this.on && mouseClick && !this.wasMousePressed && this.shotTime <= 0) {
        this.clicked = true;
        this.halfWay = false;
        this.swingDidDamage = false;
        this.randomNumber = floor(random(0, 3));
        this.wasMousePressed = true;
        this.shotTime = this.fireRate;
    } else if (!leftHeld()) {
        this.wasMousePressed = false;
    }
    var attacking = this.on && (spinning || (this.clicked && !this.swingDidDamage));
    var attackAngle = handAngle - 90 + this.swing + this.spinAngle;
    this.tick();
    if (attacking) {
        var reach = this.range;
        var sweepStart = 0;
        var sweep = spinning || saberStyle(skin).staff || saberStyle(skin).dual;
        if (sweep) {
            if (this.bladeLength < 0.05) {
                return;
            }
            sweepStart = this.sampleSwing(playerPos, handAngle, skin);
            reach = 200;
        }
        for (var z = currentMap.killZ; z < currentMap.topZ + 2; z++) {
            var list = currentMap.entities[z];
            if (!list) {
                continue;
            }
            for (var e = 0; e < list.length; e++) {
                var ent = list[e];
                if (!ent || !ent.isMatchBot || ent.team === playerTeam || ent.health <= 0 || abs(ent.pos.z - playerPos.z) > saberZReach || hasSpawnGrace(ent)) {
                    continue;
                }
                var dx = ent.pos.x - playerPos.x;
                var dy = ent.pos.y - playerPos.y;
                var d = sqrt(dx * dx + dy * dy);
                var radius = ent.colSize || hitboxSize;
                if (d > reach + radius || (dashHits && dashHits.indexOf(ent) >= 0)) {
                    continue;
                }
                var contact = sweep ? spinBladeHits(this.bladeTrail, sweepStart, ent.pos.x, ent.pos.y, radius + saberCoreWidth * 90 / 390) : abs(angleDifference(atan2(dy, dx), attackAngle)) <= this.arc / 2;
                if (contact && !Laser.prototype.raycastWalls.call(Laser.prototype, playerPos, ent.pos)) {
                    this.swingDidDamage = true;
                    if (dashHits) {
                        dashHits.push(ent);
                    }
                    if (parryRearSwing(ent)) {
                        continue;
                    }
                    var damage = this.damage * saberPower(null);
                    var beforeHealth = ent.health;
                    var beforeShield = ent.shield || 0;
                    applyDamage(ent, damage, {
                        isPlayer: true,
                        team: playerTeam
                    });
                    if (ent.vel && d > 0.001 && !hasSpawnGrace(ent)) {
                        var shove = 1.35;
                        ent.vel.x += (dx / d) * shove;
                        ent.vel.y += (dy / d) * shove;
                        ent.vel.z = max(ent.vel.z || 0, 0.025);
                    }
                    var done = max(0, beforeHealth + beforeShield - ((ent.health || 0) + (ent.shield || 0)));
                    if (done > 0) {
                        ent.playerCreditDamage = (ent.playerCreditDamage || 0) + done;
                        ent.playerCreditDamageMax = max(1, (ent.maxHealth || 100) + (ent.maxShield || 0));
                    }
                    if (beforeHealth > 0 && ent.health <= 0 && !ent.creditPaid) {
                        if (!ent.tdmScorePaid) {
                            awardTDMKill(playerTeam, ent.team);
                            ent.tdmScorePaid = true;
                        }
                        var damagePercent = constrain(ent.playerCreditDamage / max(1, ent.playerCreditDamageMax || (ent.maxHealth || 100) + (ent.maxShield || 0)), 0, 1);
                        var killBaseCredits = (floor(random(18, 31)) + matchState.playerKills * 5) * 5;
                        var earnedCredits = max(1, floor(killBaseCredits * damagePercent));
                        matchState.playerKills++;
                        recordAchievement("kills", 1);
                        ent.creditPaid = true;
                        addCreditChange(earnedCredits, ent.pos.x, ent.pos.y - 82);
                    }
                    screenShake = max(screenShake, 3);
                }
            }
        }
    }
};
Lightsaber.prototype.tryReload = function () {
    return false;
};
Lightsaber.prototype.render = function (skinName, forceHand) {
    pushStyle();
    rectMode(CENTER);
    var blade = saberStyle(skinName);
    for (var side = blade.dual ? -1 : 1; side <= 1; side += 2) {
        var grip = saberGrip(skinName, side);
        var bladeScale = side < 0 ? blade.offhandScale : 1;
        pushMatrix();
        translate(grip.x, grip.y);
        if (heldSaberSide(this, side)) {
            pushMatrix();
            rotate(saberHeldAngle(this, skinName, side));
            lightsaber(0, 0, 180 * bladeScale, 0, skinName, this.on, this.bladeLength);
            if (this === currentGun && this.on) {
                drawZapBlade(0, 0, 0, skinName, this.bladeLength);
            }
            popMatrix();
        }
        if (blade.dual) {
            var hand = getHandColors(skinName);
            stroke(hand.stroke);
            strokeWeight(1.5);
            fill(hand.fill);
            ellipseMode(CENTER);
            ellipse(0, 0, 12.5, 12.5);
        } else {
            drawSaberGrip(skinName, forceHand);
        }
        popMatrix();
    }
    popStyle();
};
//Expanded Arsenal
//Hand-drawn overhead counterparts to CoderGuyxLemoncelloJr's KA icons.
//Reference links and gameplay balance are documented in README.md beside this file.
var drawShotgun = function () {
    pushStyle();
    rectMode(CORNER);
    stroke(25);
    strokeWeight(2);
    fill(49);
    rect(-9, -8, 35, 16, 5);
    rect(23, -12, 40, 24, 3);
    fill(57);
    rect(63, -9, 30, 18, 3);
    fill(40);
    rect(93, -5, 31, 10, 2);
    rect(118, -7, 9, 14, 2);
    noStroke();
    fill(78);
    rect(29, -7, 27, 14, 2);
    popStyle();
};
var drawDL44 = function () {
    pushStyle();
    rectMode(CORNER);
    stroke(20, 23, 27);
    strokeWeight(2);
    fill(105, 68, 39);
    quad(-12, -8, 15, -10, 19, 10, -9, 9);
    fill(60, 66, 72);
    rect(9, -11, 40, 22, 3);
    fill(67, 75, 82);
    rect(47, -5, 35, 10, 2);
    fill(73, 80, 86);
    quad(80, -6, 99, -12, 102, 12, 80, 6);
    fill(29, 33, 38);
    rect(98, -12, 4, 24, 1);
    fill(28, 33, 39);
    rect(17, -21, 47, 10, 4);
    noStroke();
    fill(100, 116, 125);
    rect(60, -19, 3, 6, 1);
    popStyle();
};
var drawBowcaster = function () {
    pushMatrix();
    translate(20, 0);
    scale(1.3);
    translate(-20, 0);
    stroke(25);
    strokeWeight(5);
    noFill();
    //Tips sweep back toward the stock; the center mount points forward.
    beginShape();
    vertex(57, -38);
    vertex(74, -24);
    vertex(83, 0);
    vertex(74, 24);
    vertex(57, 38);
    endShape();
    strokeWeight(1);
    stroke(104);
    line(57, -38, 40, 0);
    line(40, 0, 57, 38);
    stroke(25);
    strokeWeight(2);
    fill(48);
    ellipse(57, -38, 16, 16);
    ellipse(57, 38, 16, 16);
    rect(-9, -8, 34, 16, 3);
    rect(21, -12, 56, 24, 3);
    rect(76, -5, 45, 10, 2);
    fill(78);
    rect(28, -6, 41, 12, 2);
    fill(26);
    rect(34, -4, 30, 8, 2);
    fill(100);
    rect(37, -3, 21, 2);
    popMatrix();
};
Shotgun = new Blaster({
    weaponId: "Shotgun",
    displayName: "Shotgun",
    fireRate: 42,
    shotsAllowed: 6,
    reloadSpeed: 130,
    laserSpeed: 48,
    damage: 20,
    maxDist: 240,
    accuracy: 12,
    pellets: 6,
    laserRender: F_11D.laserRender,
    renderFunc: drawShotgun
});
DL44 = new Blaster({
    weaponId: "DL44",
    displayName: "DL-44",
    fireRate: 22,
    shotsAllowed: 12,
    reloadSpeed: 95,
    laserSpeed: 65,
    damage: 28,
    maxDist: 420,
    accuracy: 2,
    laserRender: F_11D.laserRender,
    renderFunc: drawDL44
});
Bowcaster = new Blaster({
    weaponId: "Bowcaster",
    displayName: "Bowcaster",
    fireRate: 45,
    shotsAllowed: 8,
    reloadSpeed: 140,
    laserSpeed: 58,
    damage: 44,
    maxDist: 650,
    accuracy: 1,
    laserRender: F_11D.laserRender,
    renderFunc: drawBowcaster
});

//Throw And Trail
var saberThrowConfig = {
    range: 1600,
    minRange: 300,
    cursorRangeScale: 1.5,
    steerDegrees: 7,
    speed: 21,
    returnSpeed: 26,
    spin: 29,
    cooldownMs: 4000,
    hitMs: 130,
    damage: 28
};
var saberTrailConfig = {
    maxSamples: 48,
    lifeMs: 95,
    guardLifeMs: 42
};
var saberPoint = function (x, y, angle, dx, dy) {
    return {
        x: x + cos(angle) * dx - sin(angle) * dy,
        y: y + sin(angle) * dx + cos(angle) * dy
    };
};
Lightsaber.prototype.sampleBladeTrail = function (x, y, angle, skinName, heldAngle, offhandAngle) {
    if (!this.bladeTrail || this.trailSkin !== skinName) {
        this.bladeTrail = [];
    }
    var now = tickClock.gameMs;
    while (this.bladeTrail.length && now - this.bladeTrail[0].time > saberTrailConfig.lifeMs) {
        this.bladeTrail.shift();
    }
    var length = this.throwState ? 1 : this.bladeLength;
    if ((!this.on && !this.throwState) || length < 0.05) {
        return;
    }
    var blade = saberStyle(skinName);
    var scaleFactor = 180 / 390 * (this.bladeScale || 1);
    var baseY = blade.base * scaleFactor;
    var last = this.bladeTrail[this.bladeTrail.length - 1];
    if (last && last.time === now) {
        return;
    }
    if (last && dist(last.x, last.y, x, y) > 500) {
        this.bladeTrail = [];
        last = null;
    }
    var steps = 1;
    var turn = 0;
    if (last) {
        turn = angleDifference(angle, last.angle);
        var tip = saberPoint(x, y, angle, 0, (blade.tip - blade.reach * length) * scaleFactor);
        steps = min(8, max(1, max(ceil(abs(turn) / 7), ceil(dist(last.tip.x, last.tip.y, tip.x, tip.y) / 12))));
    }
    for (var sub = 1; sub <= steps; sub++) {
        var t = sub / steps;
        var sx = last ? last.x + (x - last.x) * t : x;
        var sy = last ? last.y + (y - last.y) * t : y;
        var sa = last ? last.angle + turn * t : angle;
        var sl = last ? lerp(last.length, length, t) : length;
        var sample = {
            base: saberPoint(sx, sy, sa, 0, baseY),
            tip: saberPoint(sx, sy, sa, 0, (blade.tip - blade.reach * sl) * scaleFactor),
            x: sx,
            y: sy,
            angle: sa,
            length: sl,
            time: last ? last.time + (now - last.time) * t : now
        };
        if (blade.dual && heldAngle !== undefined) {
            sample.primaryHeld = heldSaberSide(this, 1);
        }
        if (blade.dual && heldAngle !== undefined && heldSaberSide(this, -1)) {
            var body = last && last.heldAngle !== undefined ? last.heldAngle + angleDifference(heldAngle, last.heldAngle) * t : heldAngle;
            var otherGrip = saberPoint(sx, sy, body, -66, 0);
            var otherAngle = offhandAngle === undefined ? 2 * body - sa + (blade.offhandReverse ? 180 : 0) : last && last.offhandAngle !== undefined ? last.offhandAngle + angleDifference(offhandAngle, last.offhandAngle) * t : offhandAngle;
            sample.offhandAngle = otherAngle;
            var otherScale = scaleFactor * blade.offhandScale;
            sample.heldAngle = body;
            sample.offhandBase = saberPoint(otherGrip.x, otherGrip.y, otherAngle, 0, blade.base * otherScale);
            sample.offhandTip = saberPoint(otherGrip.x, otherGrip.y, otherAngle, 0, (blade.tip - blade.reach * sl) * otherScale);
        }
        if (blade.guard) {
            sample.guardBase = saberPoint(sx, sy, sa, 0, -19 * scaleFactor);
            sample.guardLeft = saberPoint(sx, sy, sa, -50 * sl * scaleFactor, -19 * scaleFactor);
            sample.guardRight = saberPoint(sx, sy, sa, 50 * sl * scaleFactor, -19 * scaleFactor);
        }
        if (blade.staff) {
            sample.rearBase = saberPoint(sx, sy, sa, 0, -baseY);
            sample.rearTip = saberPoint(sx, sy, sa, 0, (blade.reach * sl - blade.tip) * scaleFactor);
        }
        this.bladeTrail.push(sample);
    }
    while (this.bladeTrail.length > saberTrailConfig.maxSamples) {
        this.bladeTrail.shift();
    }
    this.trailSkin = skinName;
};
Lightsaber.prototype.sampleHeldTrail = function (pos, angle, skinName, actor) {
    updateAhsokaPose(this, pos, skinName, actor);
    if (!hasHeldSaber(this, skinName)) {
        return;
    }
    var hand = saberGrip(skinName, 1);
    var grip = saberPoint(pos.x, pos.y, angle, hand.x, hand.y);
    this.sampleBladeTrail(grip.x, grip.y, angle + saberHeldAngle(this, skinName, 1), skinName, angle, saberStyle(skinName).dual ? angle + saberHeldAngle(this, skinName, -1) : undefined);

};
var saberTrailMotion = function (distance, elapsed, guard) {
    var speed = distance * tickClock.baseMs / max(0.001, elapsed);
    var onset = guard ? 12 : 28;
    var fullSpeed = guard ? 48 : 148;
    var strength = constrain((speed - onset) / (fullSpeed - onset), 0, 1);
    return strength * strength * (3 - 2 * strength);
};
var drawSaberRibbon = function (trail, first, baseKey, tipKey, redBlade, guard, greenBlade, whiteBlade) {
    var life = guard ? saberTrailConfig.guardLifeMs : saberTrailConfig.lifeMs;
    var end = trail.length - 1;
    var start = end;
    var motion = 0;
    var lastDX = 0;
    var lastDY = 0;
    for (var i = end; i > first; i--) {
        var a = trail[i - 1];
        var b = trail[i];
        var age = (tickClock.gameMs - b.time) / life;
        if (age >= 1) {
            break;
        }
        var dx = b[tipKey].x - a[tipKey].x;
        var dy = b[tipKey].y - a[tipKey].y;
        var strength = saberTrailMotion(sqrt(dx * dx + dy * dy), b.time - a.time, guard);
        var visibility = strength - age;
        if (motion > 0 && (visibility <= 0 || dx * lastDX + dy * lastDY < 0)) {
            break;
        }
        if (visibility > 0) {
            motion = max(motion, visibility);
            lastDX = dx;
            lastDY = dy;
        }
        start = i - 1;
    }
    if (motion < 0.015) {
        return;
    }
    var roots = [];
    var trim = (guard ? 0.3 : 0.09) + 0.12 * (1 - motion);
    for (var i = start; i <= end; i++) {
        var sample = trail[i];
        var age = constrain((tickClock.gameMs - sample.time) / life, 0, 1);
        var tail = max(age, (end - i) / (end - start));
        var t = lerp(trim, 1, pow(tail, 1.7));
        roots.push({
            x: lerp(sample[baseKey].x, sample[tipKey].x, t),
            y: lerp(sample[baseKey].y, sample[tipKey].y, t)
        });
    }
    noStroke();
    fill(255, 255, 255, (guard ? 48 : 242) * motion);
    beginShape();
    for (var i = start; i <= end; i++) {
        vertex(trail[i][tipKey].x, trail[i][tipKey].y);
    }
    for (var i = roots.length - 1; i >= 0; i--) {
        vertex(roots[i].x, roots[i].y);
    }
    endShape(CLOSE);
    noFill();
    var outlineAlpha = guard ? 55 : redBlade ? 145 : 190;
    stroke(whiteBlade ? 215 : redBlade ? 255 : greenBlade ? 65 : 48, whiteBlade ? 235 : redBlade ? 45 : greenBlade ? 235 : 139, whiteBlade ? 255 : redBlade ? 38 : greenBlade ? 90 : 255, outlineAlpha * motion);
    var glowWidth = (saberCoreWidth + (lowDetailMode ? 18 : 19) * 1.3) * 180 / 390;
    strokeWeight(guard ? 1 : redBlade ? glowWidth : glowWidth * 0.65);
    beginShape();
    for (var i = start; i <= end; i++) {
        vertex(trail[i][tipKey].x, trail[i][tipKey].y);
    }
    endShape();
    beginShape();
    for (var i = 0; i < roots.length; i++) {
        vertex(roots[i].x, roots[i].y);
    }
    endShape();
};
Lightsaber.prototype.renderBladeTrail = function () {
    var trail = this.bladeTrail || [];
    var first = 0;
    while (first < trail.length && tickClock.gameMs - trail[first].time > saberTrailConfig.lifeMs) {
        first++;
    }
    if (trail.length - first < 2) {
        return;
    }
    pushStyle();
    noStroke();
    var blade = saberStyle(this.trailSkin);
    if (blade.guard) {
        drawSaberRibbon(trail, first, "guardBase", "guardLeft", true, true);
        drawSaberRibbon(trail, first, "guardBase", "guardRight", true, true);
    }
    if (blade.staff) {
        drawSaberRibbon(trail, first, "rearBase", "rearTip", true, false);
    }
    if (blade.dual && trail[first].offhandBase) {
        drawSaberRibbon(trail, first, "offhandBase", "offhandTip", false, false, false, true);
    }
    if (trail[first].primaryHeld !== false) {
        drawSaberRibbon(trail, first, "base", "tip", blade.light === "red", false, blade.light === "green", blade.light === "white");
    }
    drawZapTrail(this, trail, first);
    popStyle();
};
Lightsaber.prototype.tryThrow = function () {
    if (saberStyle(skin).dual && !this.parentSaber) {
        if (currentGun !== this || !this.on || !canAttack() || !canUseGameInput() || inventoryState.selected !== 0 || (dashBill && dashBill.spinHits)) {
            return false;
        }
        if (!this.dualThrows) {
            this.dualThrows = {};
        }
        for (var attempt = 0; attempt < 2; attempt++) {
            var side = attempt ? -this.nextThrowSide : this.nextThrowSide;
            var saber = this.dualThrows[side];
            if (!saber) {
                saber = new Lightsaber({
                });
                Object.defineProperty(saber, "parentSaber", { value: this });
                saber.dualSide = side;
                saber.bladeScale = side < 0 ? saberStyle(skin).offhandScale : 1;
                this.dualThrows[side] = saber;
            }
            if (saber.throwState || tickClock.gameMs < saber.throwReadyAt) {
                continue;
            }
            if (saber.tryThrow()) {
                this.nextThrowSide = -side;
                this.bladeTrail = [];
                return true;
            }
        }
        return false;
    }
    if (!canAttack()) {
        return false;
    }
    if (!canUseGameInput() || inventoryState.selected !== 0 || (currentGun !== this && currentGun !== this.parentSaber) || !this.on || this.throwState || (dashBill && dashBill.spinHits) || tickClock.gameMs < (this.throwReadyAt || 0)) {
        return false;
    }
    if (playerForce <= 0) {
        return false;
    }
    var aim = screenToWorld(mouseX, mouseY);
    var dx = aim.x - playerPos.x;
    var dy = aim.y - playerPos.y;
    var d = sqrt(dx * dx + dy * dy);
    if (d < 1) {
        dx = sin(bodyAngle);
        dy = -cos(bodyAngle);
        d = 1;
    }
    var hand = this.parentSaber ? saberGrip(skin, this.dualSide) : { x: 0, y: 0 };
    var start = saberPoint(playerPos.x, playerPos.y, getHandAngle(null), hand.x, hand.y);
    this.throwState = {
        x: start.x,
        y: start.y,
        z: playerPos.z,
        dx: dx / d,
        dy: dy / d,
        traveled: 0,
        targetRange: constrain(d * saberThrowConfig.cursorRangeScale, saberThrowConfig.minRange, saberThrowConfig.range),
        returning: false,
        angle: bodyAngle,
        age: 0,
        map: currentMap,
        skin: skin,
        team: playerTeam,
        isPlayer: true,
        hits: []
    };
    this.bladeTrail = [];
    this.clicked = false;
    this.spinVelocity = 0;
    activeSaberThrows.push(this);
    Laser.prototype.warnSaberBots(this.throwState, this.throwState.dx, this.throwState.dy, {
        team: playerTeam
    });
    recordAchievement("throws", 1);
    return true;
};
var finishSaberThrow = function (saber) {
    var ratio = saber.throwState ? constrain(saber.throwState.traveled / saberThrowConfig.range, 0, 1) : 0;
    saber.throwState = null;
    saber.bladeTrail = [];
    saber.throwReadyAt = tickClock.gameMs + saberThrowConfig.cooldownMs * ratio;
    if (saber.parentSaber) {
        saber.parentSaber.bladeTrail = [];
    }
};
saberSweepDist = function (px, py, ax, ay, bx, by) {
    var dx = bx - ax;
    var dy = by - ay;
    var t = constrain(((px - ax) * dx + (py - ay) * dy) / max(0.0001, dx * dx + dy * dy), 0, 1);
    return dist(px, py, ax + t * dx, ay + t * dy);
};
var damageByPlayer = function (ent, amount, team) {
    var beforeHealth = ent.health;
    var beforeShield = ent.shield || 0;
    applyDamage(ent, amount, {
        isPlayer: true,
        team: team
    });
    var done = max(0, beforeHealth + beforeShield - ((ent.health || 0) + (ent.shield || 0)));
    ent.playerCreditDamage = (ent.playerCreditDamage || 0) + done;
    ent.playerCreditDamageMax = max(1, (ent.maxHealth || 100) + (ent.maxShield || 0));
    if (beforeHealth > 0 && ent.health <= 0 && !ent.creditPaid) {
        if (!ent.tdmScorePaid) {
            awardTDMKill(team, ent.team);
            ent.tdmScorePaid = true;
        }
        var fraction = constrain(ent.playerCreditDamage / ent.playerCreditDamageMax, 0, 1);
        var credits = max(1, floor((floor(random(18, 31)) + matchState.playerKills * 5) * 5 * fraction));
        matchState.playerKills++;
        recordAchievement("kills", 1);
        ent.creditPaid = true;
        addCreditChange(credits, ent.pos.x, ent.pos.y - 82);
    }
};
var hitWithThrownSaber = function (ent, state) {
    if (state.owner) {
        hitJediTarget(state.owner, ent, saberThrowConfig.damage);
        return;
    }
    damageByPlayer(ent, saberThrowConfig.damage * saberPower(state.owner || null), state.team);
};
var updateSaberThrows = function () {
    for (var i = activeSaberThrows.length - 1; i >= 0; i--) {
        var saber = activeSaberThrows[i];
        var state = saber.throwState;
        var owner = state && state.owner;
        var pos = owner ? owner.pos : playerPos;
        if (!state || state.map !== currentMap || (owner ? owner.health <= 0 : playerHealth <= 0) || matchState.phase !== "live") {
            if (state) {
                finishSaberThrow(saber);
            }
            activeSaberThrows.splice(i, 1);
            continue;
        }
        state.age += tickClock.scale;
        if (state.age > 240) {
            finishSaberThrow(saber);
            activeSaberThrows.splice(i, 1);
            continue;
        }
        var oldX = state.x;
        var oldY = state.y;
        var step = saberThrowConfig.speed * tickClock.scale;
        if (state.returning) {
            var dx = pos.x - state.x;
            var dy = pos.y - state.y;
            var d = sqrt(dx * dx + dy * dy);
            step = saberThrowConfig.returnSpeed * tickClock.scale;
            if (d <= step + 18) {
                finishSaberThrow(saber);
                activeSaberThrows.splice(i, 1);
                continue;
            }
            state.x += (dx / d) * step;
            state.y += (dy / d) * step;
            state.z += (pos.z - state.z) * min(1, 0.25 * tickClock.scale);
        } else {
            var cursor = owner ? state.target && state.target.pos ? state.target.pos : pos : screenToWorld(mouseX, mouseY);
            var aimX = cursor.x - state.x;
            var aimY = cursor.y - state.y;
            state.targetRange = constrain(dist(pos.x, pos.y, cursor.x, cursor.y) * saberThrowConfig.cursorRangeScale, saberThrowConfig.minRange, saberThrowConfig.range);
            if (aimX * aimX + aimY * aimY > 24 * 24) {
                var heading = atan2(state.dy, state.dx);
                var desired = atan2(aimY, aimX);
                var turn = atan2(sin(desired - heading), cos(desired - heading));
                heading += constrain(turn, -saberThrowConfig.steerDegrees * tickClock.scale, saberThrowConfig.steerDegrees * tickClock.scale);
                state.dx = cos(heading);
                state.dy = sin(heading);
            }
            step = max(0, min(min(step, state.targetRange - state.traveled), ((owner ? owner.force : playerForce) / max(0.0001, forceSettings.saberThrowCost)) * saberThrowConfig.range));
            state.x += state.dx * step;
            state.y += state.dy * step;
            //Stop outbound travel at solid geometry; return can always reach its owner.
            var cols = currentMap.getNearbyCollisions ? currentMap.getNearbyCollisions(floor(state.z), state.x, state.y, step + 8) : [];
            for (var c = 0; c < (cols || []).length; c++) {
                if (!cols[c].blocksLasers || cols[c].plane) {
                    continue;
                }
                for (var n = 1; n <= 4; n++) {
                    if (cols[c].checkCollision(oldX + ((state.x - oldX) * n) / 4, oldY + ((state.y - oldY) * n) / 4, state.z)) {
                        state.x = oldX;
                        state.y = oldY;
                        state.returning = true;
                        break;
                    }
                }
                if (state.returning) {
                    break;
                }
            }
            var moved = dist(oldX, oldY, state.x, state.y);
            state.traveled += moved;
            var cost = (moved / saberThrowConfig.range) * forceSettings.saberThrowCost;
            if (owner) {
                owner.force = max(0, owner.force - cost);
            } else {
                playerForce = max(0, playerForce - cost);
            }
            if ((owner ? owner.force : playerForce) <= 0 || state.traveled >= state.targetRange) {
                state.returning = true;
            }
        }
        var blade = saberStyle(state.skin);
        var staff = blade.staff || !!saber.parentSaber;
        var last = staff && saber.bladeTrail[saber.bladeTrail.length - 1];
        state.angle = (state.angle + saberThrowConfig.spin * tickClock.scale * (blade.spinScale || 1)) % 360;
        saber.sampleBladeTrail(state.x, state.y, state.angle, state.skin);
        var first = staff ? max(0, saber.bladeTrail.indexOf(last)) : 0;
        if (state.parried || parryThrownSaber(state, oldX, oldY)) {
            continue;
        }
        //Swept spinning blade volume prevents tunneling at low frame rates.
        for (var z = currentMap.killZ; z < currentMap.topZ + 2; z++) {
            var list = currentMap.entities[z] || [];
            if (owner && playerTeam !== state.team && playerHealth > 0 && z === floor(playerPos.z)) {
                if (!state.playerTarget) {
                    state.playerTarget = jediPlayerTarget();
                }
                state.playerTarget.pos = playerPos;
                state.playerTarget.health = playerHealth;
                list = list.slice();
                list.push(state.playerTarget);
            }
            for (var e = 0; e < list.length; e++) {
                var ent = list[e];
                if (!ent || !ent.isMatchBot || ent.team === state.team || ent.health <= 0 || abs(ent.pos.z - state.z) > saberZReach) {
                    continue;
                }
                var radius = ent.colSize || hitboxSize;
                if (saberSweepDist(ent.pos.x, ent.pos.y, oldX, oldY, state.x, state.y) > 150 + radius) {
                    continue;
                }
                if (staff && !spinBladeHits(saber.bladeTrail, first, ent.pos.x, ent.pos.y, radius + saberCoreWidth * 90 / 390)) {
                    continue;
                }
                var hit = null;
                for (var h = 0; h < state.hits.length; h++) {
                    if (state.hits[h].ent === ent) {
                        hit = state.hits[h];
                        break;
                    }
                }
                if (hit && tickClock.gameMs < hit.ready) {
                    continue;
                }
                if (Laser.prototype.raycastWalls.call(Laser.prototype, state, ent.pos)) {
                    continue;
                }
                if (!hit) {
                    hit = {
                        ent: ent,
                        ready: 0
                    };
                    state.hits.push(hit);
                }
                hit.ready = tickClock.gameMs + saberThrowConfig.hitMs;
                hitWithThrownSaber(ent, state);
            }
        }
    }
};
drawSaberLayer = function (layer) {
    pushMatrix();
    translate(-camPos.x, -camPos.y);
    for (var i = 0; i < activeSaberThrows.length; i++) {
        var saber = activeSaberThrows[i];
        var state = saber.throwState;
        if (!state || floor(state.z) !== layer) {
            continue;
        }
        pushMatrix();
        applyWorldHeight(state.z - playerPos.z, playerPos.z);
        lightsaber(state.x, state.y, 180 * (saber.bladeScale || 1), state.angle, state.skin, true, 1);

        saber.renderBladeTrail();
        if (!state.owner) {
            drawZapBlade(state.x, state.y, state.angle, state.skin, 1);
        }
        popMatrix();
    }
    popMatrix();
    renderDuelFX(layer);
};

/**Create Abilities**/

//Jedi
jediPlayerTarget = function () {
    return {
        isMatchBot: true,
        isPlayerTarget: true,
        team: playerTeam,
        pos: playerPos,
        health: playerHealth,
        maxHealth: playerMaxHealth,
        shield: playerShield,
        maxShield: playerMaxShield,
        skin: skin,
        damageMult: playerDamageMult,
        colSize: hitboxSize
    };
};
hitJediTarget = function (bot, target, damage) {
    if (!canAttack(bot) || target.team === bot.team || target.health <= 0) {
        return;
    }
    if (target.isPlayerTarget) {
        target = jediPlayerTarget();
        target.damageSource = bot.pos;
    }
    damage *= saberPower(bot);
    var before = target.health;
    applyDamage(target, damage * aiSettings.botDamageScale, bot);
    if (target.isPlayerTarget) {
        playerHealth = target.health;
        playerShield = target.shield;
    }
    if (before > 0 && target.health <= 0 && !(target.isPlayerTarget ? deathScorePaid : target.tdmScorePaid)) {
        awardTDMKill(bot.team, target.team);
        if (target.isPlayerTarget) {
            deathScorePaid = true;
        } else {
            target.tdmScorePaid = true;
        }
    }
};
var throwJediSaber = function (bot, target) {
    if (!canAttack(bot)) {
        return false;
    }
    var saber = bot.weapon;
    var d = dist(bot.pos.x, bot.pos.y, target.pos.x, target.pos.y);
    if (saber.throwState || tickClock.gameMs < (saber.throwReadyAt || 0) || bot.force < forceSettings.saberThrowCost) {
        return false;
    }
    saber.throwState = {
        x: bot.pos.x,
        y: bot.pos.y,
        z: bot.pos.z,
        dx: (target.pos.x - bot.pos.x) / max(1, d),
        dy: (target.pos.y - bot.pos.y) / max(1, d),
        traveled: 0,
        targetRange: constrain(d * 1.5, 300, saberThrowConfig.range),
        returning: false,
        angle: bot.bodyAngle,
        age: 0,
        map: currentMap,
        skin: bot.skin,
        team: bot.team,
        hits: [],
        owner: bot,
        target: target
    };
    saber.bladeTrail = [];
    saber.clicked = false;
    saber.spinVelocity = 0;
    activeSaberThrows.push(saber);
    Laser.prototype.warnSaberBots(saber.throwState, saber.throwState.dx, saber.throwState.dy, bot);
    return true;
};
var moveJediBot = function (bot, pos) {
    var power = bot.temper.role === "sneak" ? 0.68 : bot.temper.push;
    var waypoint = aiDoorWaypoint(bot, pos);
    if (waypoint) {
        aiMoveToward(bot, waypoint, power);
        return;
    }
    if (aiSideApproach(bot, pos, power, true)) {
        return;
    }
    var angle = atan2(pos.y - bot.pos.y, pos.x - bot.pos.x);
    var side = bot.jediSide || 1;
    var turns = [0, 40 * side, 80 * side, -40 * side, -80 * side, 130 * side];
    for (var i = 0; i < turns.length; i++) {
        var a = angle + turns[i];
        var x = bot.pos.x + cos(a) * 95;
        var y = bot.pos.y + sin(a) * 95;
        if (solidAt(x, y, bot.pos.z, bot.colSize, null, true) || !aiHasSupport(x, y, bot.pos.z)) {
            continue;
        }
        aiMoveToward(bot, {
            x: x,
            y: y
        }, power);
        return;
    }
    aiMoveToward(bot, pos, power * 0.4, true);
};
var swingJediSaber = function (bot, first) {
    var saber = bot.weapon;
    var target = playerTeam !== bot.team && playerHealth > 0 && abs(playerPos.z - bot.pos.z) <= saberZReach ? jediPlayerTarget() : null;
    var hit = false;
    for (var z = floor(bot.pos.z - saberZReach); z <= floor(bot.pos.z + saberZReach); z++) {
        var list = currentMap.entities[z] || [];
        var includePlayer = target && z === floor(playerPos.z);
        for (var i = 0; i < list.length + (includePlayer ? 1 : 0); i++) {
            var e = i === list.length ? target : list[i];
            if (!e.isMatchBot || e.team === bot.team || e.health <= 0 || abs(e.pos.z - bot.pos.z) > saberZReach || hasSpawnGrace(e)) {
                continue;
            }
            var dx = e.pos.x - bot.pos.x;
            var dy = e.pos.y - bot.pos.y;
            var radius = e.colSize || hitboxSize;
            var reach = 200 + radius;
            if (dx * dx + dy * dy > reach * reach || !spinBladeHits(saber.bladeTrail, first, e.pos.x, e.pos.y, radius + saberCoreWidth * 90 / 390) || Laser.prototype.raycastWalls.call(Laser.prototype, bot.pos, e.pos)) {
                continue;
            }
            hit = true;
            hitJediTarget(bot, e, saber.damage);
        }
    }
    return hit;
};
var incomingSaberFor = function (bot) {
    var best = null;
    var range = 620;
    for (var i = 0; i < activeSaberThrows.length; i++) {
        var state = activeSaberThrows[i].throwState;
        if (!state || state.parried || state.map !== currentMap || state.team === bot.team || abs(state.z - bot.pos.z) > 0.8) {
            continue;
        }
        var dx = bot.pos.x - state.x;
        var dy = bot.pos.y - state.y;
        var d = sqrt(dx * dx + dy * dy);
        if (d >= range) {
            continue;
        }
        var vx = state.dx;
        var vy = state.dy;
        if (state.returning) {
            var owner = state.owner ? state.owner.pos : playerPos;
            var speed = max(1, dist(owner.x, owner.y, state.x, state.y));
            vx = (owner.x - state.x) / speed;
            vy = (owner.y - state.y) / speed;
        }
        if (dx * vx + dy * vy <= 0 || abs(dx * vy - dy * vx) > 195 || (state !== bot.guardThrow && Laser.prototype.raycastWalls.call(Laser.prototype, state, bot.pos))) {
            continue;
        }
        best = state;
        range = d;
    }
    return best;
};
var zapGuardFacing = function (bot) {
    return atan2(playerPos.x - bot.pos.x, bot.pos.y - playerPos.y);
};
var canGuardZap = function (bot) {
    return bot.isJedi && bot.force >= forceSettings.lightningBlockCost && abs(bot.pos.z - playerPos.z) <= 0.8 && canBotSwing(bot, bot.weapon) && !inSaberDuel(bot) && abs(angleDifference(zapGuardFacing(bot), bot.bodyAngle)) <= 75;
};
var poseSaberGuard = function (bot, facing) {
    var saber = bot.weapon;
    bot.bodyAngle = turnTowardAngle(bot.bodyAngle, facing, getBotAwareness(bot).turnSpeed * tickClock.scale);
    saber.clicked = false;
    saber.spinAngle = 0;
    saber.spinVelocity = 0;
    saber.swing = turnTowardAngle(saber.swing, angleDifference(facing + 18, getHandAngle(bot)), 24 * tickClock.scale);
};
updateJediBot = function (bot) {
    var saber = bot.getBlaster();
    var now = tickClock.gameMs;
    bot.wantsToShoot = false;
    bot.gunPose = 1;
    if (bot.health <= 0 || now < (bot.zapUntil || 0) || now < (bot.saberStunUntil || 0) || !canAttack(bot)) {
        saber.clicked = false;
        saber.holdSwing(false, bot.skin);
        bot.saberSpinUntil = 0;
        return;
    }
    saber.on = true;
    if (inSaberDuel(bot)) {
        bot.saberSpinUntil = 0;
        updateDuelActor(bot);
        return;
    }
    var zapThreat = now < (bot.zapGuardUntil || 0) && canGuardZap(bot);
    if (zapThreat && now >= bot.zapGuardAt) {
        poseSaberGuard(bot, zapGuardFacing(bot));
        return;
    }
    var incoming = !saber.throwState && bot.force >= forceSettings.autoDeflectCost ? incomingSaberFor(bot) : null;
    if (incoming !== bot.guardThrow) {
        bot.guardThrow = incoming;
        if (incoming) {
            bot.throwGuardAt = now + 95 * getBotAwareness(bot).reactionScale;
        }
    }
    if (incoming && now >= bot.throwGuardAt) {
        var facing = atan2(incoming.x - bot.pos.x, bot.pos.y - incoming.y);
        bot.bodyAngle = turnTowardAngle(bot.bodyAngle, facing, getBotAwareness(bot).turnSpeed * tickClock.scale);
        saber.holdSwing(true, bot.skin);
        return;
    }
    aiUpdateFacing(bot);
    var rearFacing = bot.team === playerTeam ? null : rearGuardAngle(bot);
    if (rearFacing === null) {
        bot.rearGuardAt = 0;
    } else if (now < (bot.rearBlockUntil || 0) || (bot.force >= forceSettings.autoDeflectCost && now >= (bot.rearBlockReadyAt || 0))) {
        if (!bot.rearGuardAt && currentMap.traceSight(bot.pos, playerPos)) {
            bot.rearGuardAt = now + 85 * getBotAwareness(bot).reactionScale;
        }
        if (bot.rearGuardAt) {
            poseSaberGuard(bot, rearFacing);
            if (dist(bot.pos.x, bot.pos.y, playerPos.x, playerPos.y) > 175) {
                moveJediBot(bot, playerPos);
            }
            return;
        }
    }
    var underFire = now >= bot.saberThreatAt && now < bot.saberThreatUntil && bot.force >= forceSettings.autoDeflectCost;
    if (underFire && now < bot.saberThreatSniperUntil && bot.saberThreatX !== undefined) {
        var threatFacing = atan2(bot.saberThreatX - bot.pos.x, bot.pos.y - bot.saberThreatY);
        bot.bodyAngle = turnTowardAngle(bot.bodyAngle, threatFacing, getBotAwareness(bot).turnSpeed * 2 * tickClock.scale);
    }
    var target = aiFindNearestEnemy(bot, true);
    var visible = !!target && aiCanSeeTarget(bot, target);
    bot.jediTarget = visible ? target : null;
    bot.jediSide = bot.jediSide || bot.temper.side;
    if (!visible) {
        target = aiFindNearestEnemy(bot, false);
    }
    if (!target || target.health <= 0) {
        bot.saberSpinUntil = 0;
        saber.clicked = false;
        saber.holdSwing(underFire && !saber.throwState, bot.skin);
        if (!aiGuardPosition(bot, null)) {
            aiIdleSpread(bot, getAIPerception(bot).crowdingIdle);
        }
        return;
    }
    var d = dist(bot.pos.x, bot.pos.y, target.pos.x, target.pos.y);
    var face = atan2(target.pos.x - bot.pos.x, -(target.pos.y - bot.pos.y));
    var turn = angleDifference(face, bot.bodyAngle);
    var cautious = bot.health < bot.maxHealth * (0.35 / bot.temper.push) || bot.force < 12;
    var holding = aiGuardPosition(bot, target);
    if (saber.throwState) {
        bot.saberSpinUntil = 0;
        saber.holdSwing(false, bot.skin);
        if (d < 350 || cautious) {
            saber.throwState.returning = true;
        }
        if (holding) {
            return;
        }
        if (d < 400) {
            aiMoveAway(bot, target.pos, 0.8);
        } else if (d > 750) {
            moveJediBot(bot, target.pos);
        }
        return;
    }
    if (!holding && ((cautious && d < 300) || d < 85)) {
        aiMoveAway(bot, target.pos, 0.8);
    } else if (!holding && d > 170) {
        moveJediBot(bot, target.pos);
    } else if (!holding && saber.shotTime > 0) {
        var a = bot.bodyAngle + bot.jediSide * 90;
        aiMoveToward(bot, {
            x: bot.pos.x + sin(a) * 90,
            y: bot.pos.y - cos(a) * 90
        }, 0.5);
    }
    var heightDiff = abs(bot.pos.z - target.pos.z);
    if (!visible || cautious || d > 215 || heightDiff > saberZReach || hasSpawnGrace(target)) {
        bot.saberSpinUntil = 0;
    } else if (d <= 205 && abs(turn) <= 35 && saber.shotTime <= 0 && now >= (bot.saberSpinReadyAt || 0)) {
        bot.saberSpinUntil = now + random(420, 620);
        bot.saberSpinReadyAt = bot.saberSpinUntil + random(450, 700);
    }
    var spinning = underFire || now < (bot.saberSpinUntil || 0);
    saber.clicked = spinning;
    saber.holdSwing(spinning, bot.skin);
    if (spinning) {
        var first = saber.sampleSwing(bot.pos, getHandAngle(bot), bot.skin, bot);
        if (saber.shotTime <= 0 && swingJediSaber(bot, first)) {
            saber.shotTime = saber.fireRate;
        }
        return;
    }
    if (!visible || abs(turn) > 35 || heightDiff > saberZReach || hasSpawnGrace(target) || zapThreat || incoming || now < bot.saberThreatUntil || aiQuietApproach(bot, d)) {
        return;
    }
    if (!holding && !cautious && d > 300 && d < 600 && bot.force >= jediDashSettings.forceCost + 12 && now >= (bot.dashReady || 0)) {
        var a = bot.bodyAngle - 90;
        var clear = true;
        var reach = min(200, d - 150);
        for (var step = 24; step <= reach; step += 24) {
            var x = bot.pos.x + cos(a) * step;
            var y = bot.pos.y + sin(a) * step;
            if (solidAt(x, y, bot.pos.z, bot.colSize) || !aiHasSupport(x, y, bot.pos.z)) {
                clear = false;
                break;
            }
        }
        if (clear && triggerJediDash(bot, false)) {
            bot.dashUntil = now + 230;
            bot.dashReady = now + 2400;
        }
    } else if (!cautious && d > 450 && d < 1100 && bot.force >= forceSettings.saberThrowCost + 12) {
        throwJediSaber(bot, target);
    }
};

//Inventory
var Ability = function (config) {
    this.rechargeTime = config.rechargeTime !== undefined ? config.rechargeTime : 0;
    this.rechargeCount = 0;
    this.duration = config.duration !== undefined ? config.duration : 0;
    this.durationCount = 0;
    this.canDeactivate = config.canDeactivate !== undefined ? config.canDeactivate : false;
    this.onActivate = config.onActivate || function () {
    };
    this.onDeactivate = config.onDeactivate || function () {
    };
    this.whileActive = config.whileActive || function () {
    };
    this.onRender = config.onRender || function () {
    };
    this.activatorKey = config.activatorKey !== undefined ? config.activatorKey : 0;
    this.pressed = false;
    this.maxUses = config.maxUses;
    this.remainingUses = config.remainingUses !== undefined ? config.remainingUses : this.maxUses;
    this.sprite = null;
};
Ability.prototype.update = function () {
    var tick = tickClock.scale;
    var down = canUseGameInput() && !!(keys[this.activatorKey] || gameInput.pressed[this.activatorKey]);
    if (this.heldItem) {
        down = canUseGameInput() && getHeldItem() === this && (mouseClick === true || leftHeld()) && !inventoryState.uiConsumed && !squadCommandMode && tickClock.gameMs >= inventoryState.readyAt;
        if (this.durationCount > 0 && (!canUseGameInput() || getHeldItem() !== this || squadCommandMode)) {
            this.durationCount = 0;
            this.rechargeCount = this.rechargeTime;
            if (this.itemName !== "Medkit" && this.maxUses !== undefined) {
                this.remainingUses = min(this.maxUses, this.remainingUses + 1);
            }
        }
    }
    var pressed = down && !this.pressed;
    this.pressed = down;
    this.rechargeCount = max(0, this.rechargeCount - tick);
    if (this.durationCount > 0) {
        this.whileActive();
        this.durationCount = max(0, this.durationCount - tick);
        if (pressed && this.canDeactivate) {
            this.durationCount = 0;
        }
        if (this.durationCount === 0) {
            this.onDeactivate();
            this.rechargeCount = this.rechargeTime;
            if (this.heldItem && getHeldItem() === this) {
                returnToWeapon();
            }
        }
        return;
    }
    if (pressed && ((this.itemName !== "Grenade" && this.itemName !== "Mine") || canAttack()) && this.rechargeCount === 0 && (this.maxUses === undefined || this.remainingUses > 0) && (!this.canUse || this.canUse())) {
        this.onActivate();
        if (this.maxUses !== undefined) {
            this.remainingUses = max(0, this.remainingUses - 1);
        }
        this.durationCount = this.duration;
        if (this.durationCount <= 0) {
            this.onDeactivate();
            this.rechargeCount = this.rechargeTime;
            if (this.heldItem && getHeldItem() === this) {
                returnToWeapon();
            }
        }
    }
};
Ability.prototype.render = function (x, y) {
    fill(0, 100);
    noStroke();
    strokeWeight(3);
    ellipse(x, y, 40, 40);
    if (this.sprite !== null) {
        drawImg(loadedImages[this.sprite], x - 15, y - 15, 30, 30);
    }
    noStroke();
    if (this.durationCount > 0) {
        fill(255, 100);
        arc(x, y, 40, 40, -90, 360 * (this.durationCount / this.duration) - 90);
    } else if (this.rechargeCount > 0) {
        fill(220, 0, 0, 200);
        arc(x, y, 40, 40, -90, 360 * (this.rechargeCount / this.rechargeTime) - 90);
    }
    if (this.maxUses !== undefined) {
        textAlign(CENTER, CENTER);
        textSize(12);
        fill(0, 100);
        rect(x + 30, y, 19, 19, 3);
        fill(this.remainingUses > 0 ? 255 : color(255, 120, 120));
        text(this.remainingUses, x + 30, y);
    }
};
var Medkit = function (config) {
    Ability.call(this, config);
    this.rechargeTime = config.rechargeTime !== undefined ? config.rechargeTime : 500;
    this.duration = 0;
    this.heldItem = true;
    this.itemName = "Medkit";
    this.maxUses = config.maxUses !== undefined ? config.maxUses : 4;
    this.remainingUses = config.remainingUses !== undefined ? config.remainingUses : this.maxUses;
    this.canUse = function () {
        return playerHealth < playerMaxHealth;
    };
    this.onActivate = config.onActivate || function () {
        playerHealth = min(playerMaxHealth, playerHealth + 30);
    };
    this.whileActive = config.whileActive || function () {
    };
    this.onDeactivate = config.onDeactivate || function () {
    };
    this.activatorKey = config.activatorKey !== undefined ? config.activatorKey : inputKeys.medkit;
    this.sprite = "medkit_1";
};
Medkit.prototype = Object.create(Ability.prototype);
var throwDetonator = function () {
    if (!canAttack()) {
        return;
    }
    var layer = floor(playerPos.z);
    var throwAim = screenToWorld(mouseX, mouseY);
    var throwPower = constrain(dist(throwAim.x, throwAim.y, playerPos.x, playerPos.y) * defaultZoom, 0, 420) / 10;
    var detConfig = {
        x: playerPos.x,
        y: playerPos.y,
        z: playerPos.z + 1,
        xVel: cos(bodyAngle - 90) * throwPower,
        yVel: sin(bodyAngle - 90) * throwPower,
        zVel: 0.1,
        r: random(-4, 4),
        owner: {
            isPlayer: true,
            team: playerTeam
        }
    };
    if (!currentMap.entities[layer]) {
        currentMap.entities[layer] = [];
    }
    currentMap.entities[layer].push(getPoolDetonator(detConfig));
}; //Spawns detonator
var ThrowDetonator = function (config) {
    Ability.call(this, config);
    this.rechargeTime = config.rechargeTime !== undefined ? config.rechargeTime : 179;
    this.duration = 0;
    this.heldItem = true;
    this.itemName = "Grenade";
    this.maxUses = config.maxUses !== undefined ? config.maxUses : 4;
    this.remainingUses = config.remainingUses !== undefined ? config.remainingUses : this.maxUses;
    this.onActivate = config.onActivate || function () {
    };
    this.onDeactivate = config.onDeactivate || function () {
        throwDetonator();
    };
    this.activatorKey = config.activatorKey !== undefined ? config.activatorKey : inputKeys.detonator;
    //a little something I thought I'd add
    this.sprite = "thermal_detonator";
}; //Defines detonator
ThrowDetonator.prototype = Object.create(Ability.prototype);
var emitJetpackFX = function (count) {
    var layer = constrain(floor(playerPos.z), currentMap.killZ, currentMap.topZ + 1);
    if (!currentMap.entities[layer]) {
        currentMap.entities[layer] = [];
    }
    for (var n = 0; n < count; n++) {
        var ang = random(0, 360);
        var sp = random(0.6, 2.0);
        currentMap.entities[layer].push(
        new JetParticle({
            x: playerPos.x + random(-6, 6),
            y: playerPos.y + random(-6, 6),
            z: playerPos.z + 0.02 + random(-0.05, 0.05),
            xVel: cos(ang) * sp * 3,
            yVel: sin(ang) * sp * 3,
            zVel: -random(0.02, 0.09) + random(-0.01, 0.01),
            s: random(20, 34),
            life: 20 + round(random(0, 18)),
            col: color(255, random(120, 210), 40, 205)
        })
        );
    }
};
var Jetpack = function (config) {
    Ability.call(this, config);
    this.duration = config.duration !== undefined ? config.duration : 100;
    this.durationCount = config.durationCount !== undefined ? config.durationCount : this.duration;
    this.activatorKey = config.activatorKey !== undefined ? config.activatorKey : inputKeys.jump;
    this.thrustAt = -120;
    this.whileActive = config.whileActive || function () {
        this.particleClock = (this.particleClock || 0) + 3 * tickClock.scale;
        var particleCount = floor(this.particleClock);
        this.particleClock -= particleCount;
        emitJetpackFX(particleCount);
        var ceilingRoom = currentMap.topZ + flyCeilExtra - playerPos.z;
        if (ceilingRoom > 0.01) {
            var liftScale = constrain(ceilingRoom / flyCeilSoft, 0.18, 1);
            if (playerVel.z < 0.05 * liftScale + 0.008) {
                playerVel.z += 0.01 * liftScale * tickClock.scale;
            }
        } else if (playerVel.z > 0.012) {
            playerVel.z *= 0.55;
        }
        this.durationCount = max(0, this.durationCount - 0.4 * tickClock.scale);
    };
    this.sprite = "jetpack_icon";
};
Jetpack.prototype = Object.create(Ability.prototype);
Jetpack.prototype.update = function () {
    this.durationCount = min(this.duration, this.durationCount + 0.1 * tickClock.scale);
    if (canUseGameInput() && (keys[this.activatorKey] || gameInput.pressed[this.activatorKey]) && this.durationCount > 0) {
        this.thrustAt = tickClock.gameMs;
        this.whileActive();
    }
};

var PlantLandmine = function (placement) {
    if (!canAttack()) {
        return;
    }
    var layer = floor(playerPos.z);
    var mine = new Landmine({
        x: placement ? placement.x : playerPos.x + sin(bodyAngle) * (hitboxSize + 35),
        y: placement ? placement.y : playerPos.y - cos(bodyAngle) * (hitboxSize + 35),
        z: placement ? placement.z + 0.05 : floor(playerPos.z) + 0.05,
        xVel: 0,
        yVel: 0,
        zVel: 0,
        rv: placement && placement.rotation !== undefined ? placement.rotation : bodyAngle,
        r: 0,
        owner: {
            isPlayer: true,
            team: playerTeam
        }
    });
    if (!currentMap.entities[layer]) {
        currentMap.entities[layer] = [];
    }
    currentMap.entities[layer].push(mine);
};
var isPlacementValid = function (spot, item) {
    if (!spot || !currentMap || abs(playerPos.z - spot.z) > 0.16 || abs(playerVel.z) > 0.015 || dist(playerPos.x, playerPos.y, spot.x, spot.y) > 190) {
        return false;
    }
    var radius = item.itemName === "Crate" ? 38 : 18;
    if (dist(playerPos.x, playerPos.y, spot.x, spot.y) < hitboxSize + 35 - 0.001 || (currentMap.placedCrates && currentMap.placedCrates.length >= 20 && item.itemName === "Crate")) {
        return false;
    }
    var cols = currentMap.getNearbyCollisions(floor(spot.z), spot.x, spot.y, radius + 2) || [];
    var offsets = [
        [0, 0],
        [-radius, -radius],
        [radius, -radius],
        [-radius, radius],
        [radius, radius]
    ];
    for (var pointIndex = 0; pointIndex < offsets.length; pointIndex++) {
        var angle = spot.rotation || 0;
        var x = spot.x + offsets[pointIndex][0] * cos(angle) - offsets[pointIndex][1] * sin(angle);
        var y = spot.y + offsets[pointIndex][0] * sin(angle) + offsets[pointIndex][1] * cos(angle);
        var supported = false;
        for (var colIndex = 0; colIndex < cols.length; colIndex++) {
            if (cols[colIndex].plane && cols[colIndex].checkCollision(x, y, spot.z)) {
                supported = true;
                break;
            }
        }
        if (!supported || solidAt(x, y, spot.z + 0.35, 5)) {
            return false;
        }
    }
    var nearbyActors = currentMap.entities[floor(spot.z)] || [];
    for (var actorIndex = 0; actorIndex < nearbyActors.length; actorIndex++) {
        var actor = nearbyActors[actorIndex];
        if (item.itemName !== "Mine" && actor.isMatchBot && actor.health > 0 && actor.pos && dist(actor.pos.x, actor.pos.y, spot.x, spot.y) < radius + (actor.colSize || hitboxSize)) {
            return false;
        }
        if (actor instanceof Landmine && actor.pos && dist(actor.pos.x, actor.pos.y, spot.x, spot.y) < radius + 22) {
            return false;
        }
    }
    return true;
};
var getItemPlacement = function (item) {
    var reach = hitboxSize + 35;
    var spot = {
        x: playerPos.x + sin(bodyAngle) * reach,
        y: playerPos.y - cos(bodyAngle) * reach,
        z: floor(playerPos.z),
        rotation: bodyAngle,
        valid: false
    };
    spot.valid = isPlacementValid(spot, item);
    return spot;
};
var addPlacedCrate = function (spot) {
    var crate = new Box({
        x: spot.x,
        y: spot.y,
        size: 70,
        rotation: -(spot.rotation || 0),
        lowZ: spot.z,
        highZ: spot.z + 0.8
    });
    var layer = floor(spot.z);
    if (!currentMap.objects[layer]) {
        currentMap.objects[layer] = [];
    }
    if (!currentMap.collisionLayers[layer]) {
        currentMap.collisionLayers[layer] = [];
    }
    if (!currentMap.liveCollisionLayers[layer]) {
        currentMap.liveCollisionLayers[layer] = [];
    }
    currentMap.objects[layer].push(crate);
    for (var colIndex = 0; colIndex < crate.collisions.length; colIndex++) {
        crate.collisions[colIndex]._placedCrate = true;
        linkForceCol(currentMap, crate.collisions[colIndex], 1, 0);
    }
    if (!currentMap.placedCrates) {
        currentMap.placedCrates = [];
    }
    currentMap.placedCrates.push(crate);
    currentMap.crateNavVersion = (currentMap.crateNavVersion || 0) + 1;
    currentMap.minimap = null;
};
clearPlacedCrates = function (map) {
    if (!map || !map.placedCrates) {
        return;
    }
    for (var layer in map.objects) {
        if (map.objects.hasOwnProperty(layer)) {
            map.objects[layer] = map.objects[layer].filter(function (obj) {
                return map.placedCrates.indexOf(obj) < 0;
            });
        }
    }
    for (var layer in map.liveCollisionLayers) {
        if (map.liveCollisionLayers.hasOwnProperty(layer)) {
            map.liveCollisionLayers[layer] = map.liveCollisionLayers[layer].filter(function (col) {
                return !col._placedCrate;
            });
            map.collisionLayers[layer] = map.collisionLayers[layer].filter(function (col) {
                return !col._placedCrate;
            });
        }
    }
    map.placedCrates = [];
    map.crateNavVersion = (map.crateNavVersion || 0) + 1;
    map.minimap = null;
};
var PlaceCrate = function (config) {
    Ability.call(this, config);
    this.heldItem = true;
    this.itemName = "Crate";
    this.placeable = true;
    this.duration = 0;
    this.rechargeTime = 0;
    this.maxUses = config.maxUses !== undefined ? config.maxUses : 12;
    this.remainingUses = this.maxUses;
    this.canUse = function () {
        return getItemPlacement(this).valid;
    };
    this.onActivate = function () {
        this.placement = getItemPlacement(this);
    };
    this.onDeactivate = function () {
        if (isPlacementValid(this.placement, this)) {
            addPlacedCrate(this.placement);
        } else {
            this.remainingUses++;
        }
    };
};
PlaceCrate.prototype = Object.create(Ability.prototype);
var PlaceLandmine = function (config) {
    Ability.call(this, config);
    this.rechargeTime = 0;
    this.duration = 0;
    this.heldItem = true;
    this.itemName = "Mine";
    this.placeable = true;
    this.maxUses = config.maxUses !== undefined ? config.maxUses : 4;
    this.remainingUses = config.remainingUses !== undefined ? config.remainingUses : this.maxUses;
    this.canUse = function () {
        return getItemPlacement(this).valid;
    };
    this.onActivate = function () {
        this.placement = getItemPlacement(this);
    };
    this.onDeactivate = function () {
        if (isPlacementValid(this.placement, this)) {
            PlantLandmine(this.placement);
        } else {
            this.remainingUses++;
        }
    };
    this.activatorKey = config.activatorKey !== undefined ? config.activatorKey : inputKeys.landmine;
    this.sprite = "blue_landmine_sprite";
};
PlaceLandmine.prototype = Object.create(Ability.prototype);
/**Character and Save Data**/
currentGun = new Lightsaber({
});
playerMaxHealth = 85;
playerHealth = playerMaxHealth;
characterData = {
    //Bought strings use 0 for unbought, 1 for bought, 2 for selected
    Assault: {
        level: 1,
        guns: [deepCopy(F_11D)],
        gunsBought: "2",
        abilities: [
            new Medkit({
            }),
            new ThrowDetonator({
            }),
            new PlaceLandmine({
            }),
            new PlaceCrate({
            })
        ],

        equipment: new Jetpack({
        }),

        abilitiesBought: "2222",
        skins: [
            ["Clone Trooper"],
            [""],
            ["Rebel Trooper"],
            ["Shoretrooper"],
            [""],
            ["First Order Stormtrooper"]
        ],

        skinsBought: ["2", "2", "2", "2", "2", "2"]
    },

    Specialist: {
        level: 1,
        guns: [Sniper],
        gunsBought: "2",
        abilities: [
            new Medkit({
            }),
            new ThrowDetonator({
            }),
            new PlaceLandmine({
            }),
            new PlaceCrate({
            })
        ],

        equipment: new Jetpack({
        }),

        abilitiesBought: "2222",
        skins: [
            ["First Order Stormtrooper"],
            [""],
            ["Rebel Trooper"],
            [""],
            [""],
            ["Shoretrooper"]
        ],

        skinsBought: ["2", "2", "2", "2", "2", "2"]
    },

    Heavy: {
        level: 1,
        guns: [deepCopy(F_11D)],
        gunsBought: "2",
        abilities: [
            new Medkit({
            }),
            new ThrowDetonator({
            }),
            new PlaceLandmine({
            }),
            new PlaceCrate({
            })
        ],

        equipment: null,
        abilitiesBought: "2222",
        skins: [[""], [""], [""], ["Heavy Shoretrooper"], [""], [""]],
        skinsBought: ["2", "2", "2", "2", "2", "2"]
    },

    Jedi: {
        level: 1,
        guns: [new Lightsaber({
            })],

        gunsBought: "2",
        abilities: [
            new Medkit({
            }),
            new ThrowDetonator({
            }),
            new PlaceLandmine({
            }),
            new PlaceCrate({
            })
        ],

        equipment: new Jetpack({
        }),

        abilitiesBought: "2222",
        skins: [["Kylo Ren"], [""], [""], [""], [""], ["Luke Skywalker"]],
        skinsBought: ["2", "2", "2", "2", "2", "2"]
    }
};
getHeldItem = function () {
    var data = getSelectedCharData();
    return inventoryState.selected > 0 ? data.abilities[inventoryState.selected - 1] || null : null;
};
var hotbarTop = function () {
    var pause = pauseButtonBounds();
    return pause.y + pause.height + 46;
};
var selectHeldItem = function (slot, keepHeldClick) {
    if (slot < 0 || slot > getSelectedCharData().abilities.length) {
        return;
    }
    if (inventoryState.selected === 0 && slot !== 0) {
        inventoryState.lastWeapon = currentGun;
    }
    if (slot === 0 && inventoryState.selected !== 0 && currentGun.isLightsaber) {
        extinguishSaber(currentGun);
    }
    inventoryState.selected = slot;
    var nextItem = slot > 0 ? getSelectedCharData().abilities[slot - 1] : null;
    inventoryState.readyAt = tickClock.gameMs + (nextItem && nextItem.duration === 0 ? 0 : 180);
    inventoryState.suppressClick = leftHeld() && !keepHeldClick;
};
returnToWeapon = function () {
    if (inventoryState.lastWeapon) {
        currentGun = inventoryState.lastWeapon;
    }
    if (inventoryState.selected !== 0 && currentGun.isLightsaber) {
        extinguishSaber(currentGun);
    }
    inventoryState.selected = 0;
    inventoryState.suppressClick = true;
    inventoryState.uiConsumed = true;
};
var handleInvInput = function () {
    if (!leftHeld() && mouseClick !== true) {
        inventoryState.suppressClick = false;
    }
    inventoryState.uiConsumed = !!inventoryState.suppressClick;
    var data = getSelectedCharData();
    if (gameInput.pressed[inputKeys.cosmetics]) {
        inventoryState.cosmeticsOpen = !inventoryState.cosmeticsOpen;
    }
    for (var slot = 0; slot <= data.abilities.length; slot++) {
        if (gameInput.pressed[49 + slot]) {
            selectHeldItem(slot, true);
        }
    }
    for (var itemIndex = 0; itemIndex < data.abilities.length; itemIndex++) {
        if (gameInput.pressed[data.abilities[itemIndex].activatorKey]) {
            selectHeldItem(itemIndex + 1, true);
        }
    }
    inventoryState.uiConsumed = !!inventoryState.suppressClick;
    var overBar = mouseX >= width - 77 && mouseX <= width - 9 && mouseY >= hotbarTop() - 37 && mouseY <= hotbarTop() + (data.abilities.length * 70 + 61) * 0.85;
    var overGear = inventoryState.cosmeticsOpen && abs(mouseX - width / 2) <= 110 && abs(mouseY - height / 2) <= 74;
    inventoryState.uiConsumed = inventoryState.uiConsumed || overBar || overGear;
    if (mouseClick === true && (overBar || overGear)) {
        if (overGear) {
            var ownedGear = ownedCosmetics();
            var row = floor((mouseY - (height / 2 - 12)) / 40);
            if (abs(mouseX - width / 2) <= 94 && row >= 0 && row < ownedGear.length && mouseY <= height / 2 - 12 + row * 40 + 36) {
                toggleCosmetic(ownedGear[row].id);
            }
        } else if (overBar && mouseY >= hotbarTop() - 7) {
            selectHeldItem(constrain(floor((mouseY - hotbarTop()) / 59.5), 0, data.abilities.length));
        } else if (overBar) {
            inventoryState.cosmeticsOpen = !inventoryState.cosmeticsOpen;
        }
        inventoryState.suppressClick = true;
        mouseClick = null;
    }
};
var drawItemIcon = function (item, x, y, size) {
    if (item && item.sprite && loadedImages[item.sprite]) {
        drawImg(loadedImages[item.sprite], x - size / 2, y - size / 2, size, size);
    } else if (item && item.itemName === "Crate") {
        rectMode(CENTER);
        fill(97, 76, 23);
        stroke(170, 143, 72);
        strokeWeight(2);
        rect(x, y, size * 0.8, size * 0.8, 2);
        line(x - size * 0.35, y - size * 0.35, x + size * 0.35, y + size * 0.35);
        line(x + size * 0.35, y - size * 0.35, x - size * 0.35, y + size * 0.35);
    }
};
drawHeldItem = function (item) {
    if (item.isFist || item.isLightning) {
        drawForceHands(item);
        return;
    }
    pushMatrix();
    pushStyle();
    //Same forward offset, local orientation, and footprint as the placed object.
    var itemSize = item.placeable ? 70 : item.itemName === "Grenade" ? 40 : 30;
    translate(0, item.placeable ? -(hitboxSize + itemSize / 2) : -43);
    if (item.itemName === "Crate") {
        Box.prototype.render.call({
            x: 0,
            y: 0,
            size: 70,
            rotation: 0,
            destroyed: false
        });
    } else {
        drawItemIcon(item, 0, 0, itemSize);
    }
    var hand = getHandColors(skin);
    stroke(hand.stroke);
    strokeWeight(3);
    fill(hand.fill);
    var handX = item.placeable ? 26 : itemSize * 0.48;
    var handY = item.placeable ? itemSize / 2 - 7 : 6;
    handX = itemSize / 2 - 2;
    handY = item.placeable ? 12 : 4;
    if (isB2Droid(skin)) {
        rectMode(CENTER);
        strokeWeight(2);
        rect(-handX, handY, 15, 22, 4);
        rect(handX, handY, 15, 22, 4);
    } else {
        strokeWeight(2);
        ellipse(-handX, handY, 13, 16);
        ellipse(handX, handY, 13, 16);
    }

    popStyle();
    popMatrix();
};
var drawInventoryHUD = function (data) {
    var x = width - 48;
    var top = hotbarTop();
    pushMatrix();
    translate(width - 43, top);
    scale(0.85);
    translate(-x, -top);
    rectMode(CENTER);
    for (var slot = 0; slot <= data.abilities.length; slot++) {
        var item = slot === 0 ? null : data.abilities[slot - 1];
        var y = top + slot * 70 + 30;
        var selected = inventoryState.selected === slot;
        stroke(selected ? color(100, 200, 255, 170) : color(150, 180, 205, 65));
        strokeWeight(selected ? 3 : 1);
        fill(selected ? color(24, 64, 87, 80) : color(18, 25, 35, 32));
        rect(x, y, 78, 62, 5);
        if (item) {
            if (item.isFist || item.isLightning) {
                fill(150, 210, 255);
                textAlign(CENTER, CENTER);
                textSize(11);
                fill(item.isLightning && zap.open ? color(110, 255, 190) : color(150, 210, 255));
                text(item.isFist ? "FISTS" : zap.open ? playerForce >= 1 ? "READY [LMB]" : "LOW FORCE" : floor(zapProgress() * 100) + "%", x, y - 5);
            } else {
                drawItemIcon(item, x, y - 5, 29);
            }
        } else if (currentGun.weaponId === "B2_Wrist") {
            pushMatrix();
            translate(x - 31, y - 5);
            scale(0.6);
            drawB2BlasterIcon();
            popMatrix();
        } else if (currentGun.isLightsaber && skin === "Darth Maul") {
            lightsaber(x, y - 5, 32, 48, skin, true, 0.8);
        } else if (currentGun.isLightsaber && skin === "Darth Vader") {
            drawVaderSaber(x, y - 5, 54);
        } else if (currentGun.isLightsaber) {
            drawImg(loadedImages[skin === "Ahsoka Tano" ? "saber_hotbar_white" : skin === "Kylo Ren" ? "saber_hotbar_red" : skin === "Yoda" ? "saber_hotbar_green" : "saber_hotbar_blue"], x - 24, y - 29, 48, 48);
        } else {
            pushMatrix();
            translate(x - 24, y - 10);
            scale(0.42);
            currentGun.render();
            popMatrix();
        }
        noStroke();
        fill(225, 235, 245, 180);
        textSize(10);
        textAlign(LEFT, TOP);
        text(slot + 1, x - 32, y - 25);
        textAlign(CENTER, CENTER);
        if (!item || selected || (abs(mouseX - (width - 43)) <= 33.15 && abs(mouseY - (top + (y - top) * 0.85)) <= 26.35)) {
            text(item ? item.itemName : currentGun.isLightsaber ? "Saber" : "Blaster", x, y + 21);
        }
        if (item) {
            textAlign(RIGHT, TOP);
            fill(item.remainingUses > 0 ? color(200, 235, 255) : color(255, 115, 100));
            if (!item.isFist && !item.isLightning) {
                text(item.remainingUses, x + 31, y - 25);
            }
            var progress = item.durationCount > 0 ? 1 - item.durationCount / item.duration : item.rechargeCount > 0 ? 1 - item.rechargeCount / item.rechargeTime : 1;
            rectMode(CORNER);
            fill(15, 20, 28, 40);
            rect(x - 33, y + 28, 66, 3);
            fill(item.durationCount > 0 ? color(110, 240, 175) : color(85, 170, 230));
            rect(x - 33, y + 28, 66 * constrain(progress, 0, 1), 3);
            rectMode(CENTER);
        }
    }
    noStroke();
    fill(18, 25, 35, 40);
    rect(x, top - 28, 78, 30, 5);
    fill(190, 220, 245);
    textAlign(CENTER, CENTER);
    textSize(10);
    text("J  HATS", x, top - 28);
    popMatrix();
    var held = getHeldItem();
    if (held && (held.durationCount > 0 || held.remainingUses <= 0)) {
        fill(18, 25, 35, 50);
        rect(width / 2, height - 26, 110, 26, 5);
        fill(220, 235, 250, 210);
        textSize(11);
        text(held.remainingUses <= 0 && held.durationCount <= 0 ? "EMPTY" : held.itemName === "Medkit" ? "HEALING" : held.placeable ? "PLACING" : "THROWING", width / 2, height - 26);
    }
    if (inventoryState.cosmeticsOpen) {
        var panelX = width / 2;
        var panelY = height / 2;
        fill(17, 25, 36, 85);
        stroke(130, 180, 215, 100);
        strokeWeight(1);
        rect(panelX, panelY, 220, 148, 6);
        noStroke();
        fill(220, 235, 250, 210);
        textSize(12);
        text("HATS", panelX, panelY - 52);
        textAlign(RIGHT, CENTER);
        textSize(10);
        text("J", panelX + 94, panelY - 52);
        textAlign(CENTER, CENTER);
        var ownedGear = ownedCosmetics();
        if (!ownedGear.length) {
            textSize(11);
            text("BUY COSMETICS IN THE SHOP", panelX, panelY + 8);
        }
        for (var i = 0; i < ownedGear.length; i++) {
            var accessory = ownedGear[i];
            var rowY = panelY + 6 + i * 40;
            var available = accessory.id !== "jetpack" || !!data.equipment;
            fill(35, 60, 80, 120);
            rectMode(CENTER);
            rect(panelX, rowY, 188, 36, 4);
            fill(200, 230, 250, 220);
            textSize(10);
            textAlign(CENTER, CENTER);
            text(accessory.name.toUpperCase() + "  " + (!available ? "N/A" : isCosmeticEquipped(accessory) ? "ON" : "OFF"), panelX, rowY);
        }
    }
};
startCharShop = function (nextCharacter) {
    if (stageTransition.active) {
        return;
    }
    mouseClick = null;
    if (!characterData[nextCharacter]) {
        getSelectedCharData();
        return;
    }
    character = nextCharacter;
    if (nextCharacter === "Jedi") {
        currentGun = new Lightsaber({
        });
        skin = "Kylo Ren";
        playerSpeed = 1.1;
        playerMaxHealth = (100 * 2) / 3;
        playerHealth = min(playerHealth, playerMaxHealth);
    } else if (nextCharacter === "Specialist") {
        currentGun = shopState.weaponsOwned.Sniper ? Sniper : F_11D;
        skin = "First Order Stormtrooper";
        playerSpeed = 1.02;
        playerMaxHealth = 85;
        playerHealth = min(playerHealth, playerMaxHealth);
    } else if (nextCharacter === "Heavy") {
        currentGun = F_11D;
        skin = "Heavy Shoretrooper";
        playerSpeed = 0.9;
        playerMaxHealth = 100;
        playerHealth = min(playerHealth, playerMaxHealth);
    } else if (nextCharacter === "Assault") {
        currentGun = F_11D;
        skin = "First Order Stormtrooper";
        playerSpeed = 1;
        playerMaxHealth = 100;
        playerHealth = min(playerHealth, playerMaxHealth);
    }
    resetPlayerShield();
    if (currentGun && currentGun.shootFrom) {
        currentGun.shots = 0;
        currentGun.shotTime = 0;
        currentGun.reloadTime = 0;
    }
    saveGameData();
    currentMenu = null;
    holoHeight = -25;
    startStageTrans("Shop", function () {
        currentMenu = null;
        holoHeight = -25;
    });
};
/**Main Program**/
var editorTipVisible = true;

//Shop
var shopPriceMult = 25;
var resistanceLogo = function (x, y, s, r) {
    pushStyle();
    pushMatrix();
    translate(x, y);
    scale(s / 405);
    rotate(r);
    noStroke();
    fill(0);
    beginShape();
    vertex(-100, -150);
    curveVertex(-137, -146);
    curveVertex(-174, -96);
    curveVertex(-197, -36);
    curveVertex(-194, 50);
    curveVertex(-148, 138);
    curveVertex(-90, 179);
    curveVertex(0, 202);
    curveVertex(84, 180);
    curveVertex(157, 127);
    curveVertex(201, 15);
    curveVertex(181, -88);
    curveVertex(136, -147);
    vertex(114, -156);
    vertex(125, -150);
    curveVertex(150, -106);
    curveVertex(150, -36);
    curveVertex(123, 13);
    curveVertex(68, 28);
    curveVertex(31, 2);
    curveVertex(47, -64);
    curveVertex(80, -108);
    vertex(81, -114);
    vertex(60, -132);
    vertex(52, -132);
    vertex(28, -108);
    vertex(35, -151);
    vertex(33, -163);
    vertex(2, -200);
    vertex(-2, -200);
    vertex(-33, -163);
    vertex(-35, -151);
    vertex(-28, -108);
    vertex(-52, -132);
    vertex(-60, -132);
    vertex(-80, -110);
    vertex(-80, -104);
    vertex(-52, -69);
    curveVertex(-28, -6);
    curveVertex(-39, 24);
    curveVertex(-90, 29);
    curveVertex(-138, 0);
    curveVertex(-158, -73);
    curveVertex(-140, -140);
    vertex(-52, -150);
    endShape(CLOSE);
    popMatrix();
    popStyle();
};
var imperialLogo = function (x, y, s, r) {
    pushStyle();
    pushMatrix();
    translate(x, y);
    scale(s / 400);
    rotate(r);
    noFill();
    stroke(0);
    strokeWeight(20);
    ellipse(0, 0, 380, 380);
    strokeWeight(15);
    for (var i = 0; i < 6; i++) {
        pushMatrix();
        rotate(i * (360 / 6));
        line(0, 142, 0, 181);
        strokeWeight(37);
        strokeCap(SQUARE);
        arc(0, 0, 290, 290, 79, 102);
        rotate(360 / 12);
        strokeWeight(90);
        arc(0, 0, 216, 216, 69, 113);
        popMatrix();
    }
    popMatrix();
    popStyle();
};
var drawShopTeamLogo = function (skinName, x, y, size) {
    if (skinName === "Clone Trooper" || skinName === "Luke Skywalker" || skinName === "Yoda" || skinName === "Ahsoka Tano") {
        resistanceLogo(x, y, size, 0);
    } else {
        imperialLogo(x, y, size, 0);
    }
};
var shopCatalog = [
    {
        name: "Stormtrooper",
        skin: "First Order Stormtrooper",
        basePrice: 0,
        role: "Assault",
        description: "Standard infantry armor"
    },
    {
        name: "Clone Trooper",
        skin: "Clone Trooper",
        basePrice: 500,
        role: "Assault",
        description: "Republic infantry armor"
    },
    {
        name: "Rebel Trooper",
        skin: "Rebel Trooper",
        basePrice: 300,
        role: "Assault",
        description: "Rebel Alliance infantry"
    },
    {
        name: "Shoretrooper",
        skin: "Shoretrooper",
        basePrice: 450,
        role: "Assault",
        description: "Imperial coastal defense armor"
    },
    {
        name: "Heavy Shoretrooper",
        skin: "Heavy Shoretrooper",
        basePrice: 650,
        role: "Heavy",
        description: "Heavy coastal defense armor"
    },
    {
        name: "Shadowtrooper",
        skin: "Shadowtrooper",
        basePrice: 750,
        role: "Assault",
        description: "Black Imperial armor"
    },
    {
        name: "Battle Droid",
        skin: "Battle Droid",
        basePrice: 350,
        role: "Assault",
        description: "Light Separatist infantry"
    },
    {
        name: "Super Battle Droid",
        skin: "Super Battle Droid",
        basePrice: 800,
        role: "Heavy",
        description: "Heavy infantry with reinforced shields"
    },
    {
        name: "Darth Vader",
        skin: "Darth Vader",
        basePrice: 1500,
        role: "Jedi",
        description: "Dark Lord of the Sith"
    },
    {
        name: "Luke Skywalker",
        skin: "Luke Skywalker",
        basePrice: 1200,
        role: "Jedi",
        description: "Jedi of the Rebellion"
    },
    {
        name: "Yoda",
        skin: "Yoda",
        basePrice: 1600,
        role: "Jedi",
        description: "Republic Jedi Master"
    },
    {
        name: "Ahsoka Tano",
        skin: "Ahsoka Tano",
        basePrice: 1350,
        role: "Jedi",
        description: "Twin white lightsabers"
    },
    {
        name: "Darth Maul",
        skin: "Darth Maul",
        basePrice: 1000,
        role: "Jedi",
        description: "Double-bladed Sith warrior"
    }
];
equippedCosmetic = "none";
hasCommsHeadset = function () {
    return equippedCosmetic === "headset";
};
syncSquadHeadset = function () {
    if (hasCommsHeadset()) {
        return;
    }
    squadEnabled = false;
    squadCommandMode = false;
    if (!currentMap || !currentMap.entities) {
        return;
    }
    for (var layer in currentMap.entities) {
        var list = currentMap.entities[layer];
        for (var i = 0; i < list.length; i++) {
            if (list[i].inPlayerSquad) {
                list[i].wasPlayerSquad = true;
                list[i].inPlayerSquad = false;
            }
        }
    }
};
var shopCosmetics = [
    {
        name: "Jetpack",
        id: "jetpack",
        description: "Your existing class jetpack",
        basePrice: 400
    },
    {
        name: "Comms Headset",
        id: "headset",
        description: "Headphones and a microphone",
        basePrice: 200
    },
    {
        name: "None",
        id: "none",
        description: "Remove your headset",
        basePrice: 0
    }
];
isCosmeticEquipped = function (item) {
    return item.id === "jetpack" ? jetpackEquipped && !!getSelectedCharData().equipment : equippedCosmetic === item.id;
};
var drawShopJetpack = function () {
    for (var i = 0; i < imagesToLoad.length; i++) {
        if (imagesToLoad[i].name === "jetpack_sprite") {
            pushStyle();
            pushMatrix();
            translate(0, 30);
            scale(0.5);
            translate(-95, -80);
            imagesToLoad[i].display();
            popMatrix();
            popStyle();
            break;
        }
    }
};
drawCharCosmetic = function (id, size) {
    if (!id || id === "none") {
        return;
    }
    pushStyle();
    pushMatrix();
    scale(size / 60);
    rectMode(CENTER);
    strokeWeight(1.5);
    stroke(45);
    fill(80);
    if (id === "headset") {
        noFill();
        stroke(65);
        strokeWeight(4);
        arc(0, 1, 54, 49, 0, 180);
        fill(55);
        strokeWeight(1.5);
        rect(-27, -3, 9, 20, 3);
        rect(27, -3, 9, 20, 3);
        line(27, -9, 20, -24);
        line(20, -24, 11, -24);
    }
    popMatrix();
    popStyle();
};
var shopChangeTab = function (tab) {
    if (shopState.tab === tab) {
        return;
    }
    shopState.slideDirection = tab > shopState.tab ? 1 : -1;
    shopState.tab = tab;
    shopState.transitionStart = millis();
    shopState.message = "";
};
mouseScrolled = function () {
    if (gameStage === "Shop") {
        shopState.wheelDelta = (shopState.wheelDelta || 0) - mouseScroll * 80;
    }
};
var drawShopCharacter = function (item, size, cosmetic) {
    pushStyle();
    pushMatrix();
    scale(size / 60);
    var previewSkin = cosmetic ? skin : item.skin;
    if (cosmetic && item.id === "jetpack") {
        drawShopJetpack();
    }
    drawPlayerVector(previewSkin, 60, true);
    drawCharCosmetic(cosmetic ? item.id : equippedCosmetic, 60);
    var gun = cosmetic || item.skin === skin ? currentGun : item.role === "Jedi" ? null : F_11D;
    if (isB2Droid(previewSkin)) {
        drawB2Hands(60);
    } else if ((gun && gun.isLightsaber) || (!cosmetic && item.role === "Jedi")) {
        if (saberStyle(previewSkin).dual) {
            var previewSaber = new Lightsaber({
            });
            previewSaber.bladeLength = 0.35;
            previewSaber.render(previewSkin);
        } else {
            pushMatrix();
            translate(27, -28);
            lightsaber(0, 0, 180, 0, previewSkin, true, 0.25);
            drawSaberGrip(previewSkin);
            popMatrix();
        }
    } else {
        renderBlaster(gun || F_11D, previewSkin, 0);
    }
    popMatrix();
    popStyle();
};
var shopWeapons = [
    {
        id: "F_11D",
        name: "F-11D",
        basePrice: 0,
        gun: F_11D,
        description: "Automatic infantry blaster"
    },
    {
        id: "E11",
        name: "E-11",
        basePrice: 300,
        gun: E11,
        description: "Standard Imperial blaster"
    },
    {
        id: "Sniper",
        name: "Sniper",
        basePrice: 1000,
        gun: Sniper,
        description: "Long-range precision rifle"
    },
    {
        id: "Shotgun",
        name: "Shotgun",
        basePrice: 600,
        gun: Shotgun,
        description: "6 bolts / short-range spread"
    },
    {
        id: "DL44",
        name: "DL-44",
        basePrice: 700,
        gun: DL44,
        description: "28 damage / heavy pistol"
    },
    {
        id: "Bowcaster",
        name: "Bowcaster",
        basePrice: 1400,
        gun: Bowcaster,
        description: "44 damage / accurate heavy bolt"
    },
    {
        id: "lightsaber",
        name: "Lightsaber",
        basePrice: 0,
        gun: new Lightsaber({
        }),

        description: "Bound to Jedi and Sith"
    }
];
var shopWeaponList = function () {
    if (isB2Droid(skin)) {
        return [
            {
                id: "B2_Wrist",
                name: "Wrist Blaster",
                basePrice: 0,
                gun: B2WristBlaster,
                description: "Built into the right arm"
            }
        ];
    }
    return character === "Jedi" ? shopWeapons : shopWeapons.slice(0, shopWeapons.length - 1);
};
var equipShopWeapon = function (id) {
    var available = shopWeaponList();
    for (var i = 0; i < available.length; i++) {
        if (available[i].id === id) {
            var weapon = available[i];
            if (!shopState.weaponsOwned[id] && weapon.basePrice > 0) {
                var price = shopPrice(weapon);
                if (playerCredits < price) {
                    shopState.message = "Not enough credits";
                    return false;
                }
                playerCredits -= price;
                shopState.weaponsOwned[id] = true;
            }
            currentGun = weapon.gun;
            inventoryState.selected = 0;
            shopState.message = "Weapon equipped";
            saveGameData();
            return true;
        }
    }
    return false;
};
var drawShopGunIcon = function (weapon, size) {
    pushStyle();
    pushMatrix();
    rectMode(CORNER);
    if (weapon.gun.isLightsaber) {
        lightsaber(-size * 0.3, 0, size, 90, skin, true, 0.7);
    } else {
        scale(size / 155);
        translate(-65, 0);
        weapon.gun.render();
    }
    popMatrix();
    popStyle();
};
shopState = {
    transitionStart: -1000,
    slideDirection: 1,
    selected: 0,
    cosmeticSelected: 0,
    weaponSelected: 0,
    scroll: [0, 0, 0],
    scrollTarget: [0, 0, 0],
    pointerDown: false,
    dragY: 0,
    pressedY: 0,
    pressedX: 0,
    pressTime: 0,
    tab: 0,
    weaponsOwned: {
        F_11D: true
    },

    cosmeticsOwned: {
        none: true
    },

    owned: {
        "First Order Stormtrooper": true
    },

    message: ""
};
shopPrice = function (item) {
    return item.basePrice * shopPriceMult * (item.role === "Jedi" ? 10 : 1);
};
ownedCosmetics = function () {
    var result = [];
    for (var i = 0; i < shopCosmetics.length; i++) {
        if (shopCosmetics[i].id !== "none" && shopState.cosmeticsOwned[shopCosmetics[i].id]) {
            result.push(shopCosmetics[i]);
        }
    }
    return result;
};
toggleCosmetic = function (id) {
    if (!shopState.cosmeticsOwned[id]) {
        return false;
    }
    if (id === "jetpack") {
        if (!getSelectedCharData().equipment) {
            return false;
        }
        jetpackEquipped = !jetpackEquipped;
    } else {
        equippedCosmetic = equippedCosmetic === id ? "none" : id;
        syncSquadHeadset();
    }
    saveGameData();
    return true;
};
var shopActivate = function () {
    if (shopState.tab === 2) {
        var accessory = shopCosmetics[shopState.cosmeticSelected];
        if (accessory.id === "jetpack" && !getSelectedCharData().equipment) {
            shopState.message = "Unavailable for this class";
            return false;
        }
        if (!shopState.cosmeticsOwned[accessory.id]) {
            if (playerCredits < shopPrice(accessory)) {
                shopState.message = "Not enough credits";
                return false;
            }
            playerCredits -= shopPrice(accessory);
            shopState.cosmeticsOwned[accessory.id] = true;
        }
        toggleCosmetic(accessory.id);
        shopState.message = "Cosmetic equipped";
        return true;
    }
    var item = shopCatalog[shopState.selected];
    if (!item) {
        return false;
    }
    var price = shopPrice(item);
    if (!shopState.owned[item.skin]) {
        if (playerCredits < price) {
            shopState.message = "Not enough credits";
            return false;
        }
        playerCredits -= price;
        shopState.owned[item.skin] = true;
    }
    character = item.role;
    skin = item.skin;
    currentGun = character === "Jedi" ? new Lightsaber({
    }) : F_11D;
    playerSpeed = character === "Heavy" ? 0.9 : character === "Jedi" ? 1.1 : 1;
    playerMaxHealth = character === "Jedi" ? (100 * 2) / 3 : 100;
    playerHealth = min(playerHealth, playerMaxHealth);
    resetPlayerShield();
    syncPlayerWeapon();
    inventoryState.selected = 0;
    shopState.message = "Equipped";
    saveGameData();
    return true;
};
var drawShop = function () {
    pushStyle();
    pushMatrix();
    scale(width / 850, height / 700);
    var mx = (mouseX * 850) / width;
    var my = (mouseY * 700) / height;
    var click = mouseClick === true && !stageTransition.active;
    var tabIndex = shopState.tab;
    var listTop = 143;
    var listBottom = 636;
    var cardHeight = 224;
    var rowGap = 15;
    var perRow = 3;
    var rowHeight = cardHeight + rowGap;
    var inside = function (x, y, w, h) {
        return mx >= x && mx <= x + w && my >= y && my <= y + h;
    };
    background(240);
    rectMode(CORNER);
    noStroke();
    fill(160);
    rect(0, 122, 850, 578);
    fill(240);
    beginShape();
    vertex(472, 122);
    bezierVertex(530, 280, 510, 660, 694, 660);
    vertex(850, 660);
    vertex(850, 122);
    endShape(CLOSE);
    textFont(mainFont, 18);
    textAlign(LEFT, CENTER);
    fill(65);
    triangle(24, 34, 36, 24, 36, 44);
    text("BACK", 46, 35);
    stroke(170);
    strokeWeight(1);
    line(123, 20, 123, 52);
    noStroke();
    textSize(36);
    text("SHOP", 144, 36);
    textAlign(RIGHT, CENTER);
    textSize(19);
    text(shopNumber(playerCredits) + " CREDITS", 823, 36);
    textAlign(LEFT, CENTER);
    textSize(16);
    fill(shopState.tab === 0 ? 35 : 120);
    text("CHARACTERS", 28, 91);
    fill(shopState.tab === 1 ? 35 : 120);
    text("EQUIPMENT", 192, 91);
    fill(shopState.tab === 2 ? 35 : 120);
    text("COSMETICS", 337, 91);
    stroke(165);
    line(16, 114, 468, 114);
    strokeWeight(4);
    stroke(65);
    line(shopState.tab === 0 ? 18 : shopState.tab === 1 ? 185 : 330, 114, shopState.tab === 0 ? 173 : shopState.tab === 1 ? 311 : 464, 114);
    noStroke();
    if (click && inside(15, 17, 101, 42)) {
        mouseClick = null;
        startStageTrans("Menu", function () {
            currentMenu = null;
        });
    } else if (click && inside(18, 72, 155, 42)) {
        shopChangeTab(0);
        mouseClick = null;
    } else if (click && inside(185, 72, 126, 42)) {
        shopChangeTab(1);
        mouseClick = null;
    }
    if (click && inside(330, 72, 134, 42)) {
        shopChangeTab(2);
        mouseClick = null;
    }
    if (mouseIsPressed && !shopState.pointerDown) {
        shopState.pointerDown = true;
        shopState.dragY = my;
        shopState.pressedY = my;
        shopState.pressedX = mx;
        shopState.pressTime = millis();
    } else if (!mouseIsPressed) {
        shopState.pointerDown = false;
    }
    var activeCatalog = shopState.tab === 0 ? shopCatalog : shopState.tab === 2 ? shopCosmetics : shopWeaponList();
    var totalRows = ceil(activeCatalog.length / perRow);
    var maxScroll = max(0, totalRows * rowHeight - (listBottom - listTop));
    if (shopState.pointerDown && abs(my - shopState.dragY) > 1) {
        shopState.scrollTarget[tabIndex] = constrain(shopState.scrollTarget[tabIndex] - (my - shopState.dragY), 0, maxScroll);
        shopState.dragY = my;
    }
    if (shopState.pointerDown && abs(my - shopState.pressedY) > 6) {
        click = false;
        mouseClick = null;
    }
    if (shopState.wheelDelta) {
        if (inside(16, listTop, 452, listBottom - listTop)) {
            shopState.scrollTarget[tabIndex] = constrain(shopState.scrollTarget[tabIndex] + shopState.wheelDelta, 0, maxScroll);
        }
        shopState.wheelDelta = 0;
    }
    shopState.scroll[tabIndex] += (shopState.scrollTarget[tabIndex] - shopState.scroll[tabIndex]) * 0.24;
    if (abs(shopState.scrollTarget[tabIndex] - shopState.scroll[tabIndex]) < 0.4) {
        shopState.scroll[tabIndex] = shopState.scrollTarget[tabIndex];
    }
    var transition = constrain((millis() - shopState.transitionStart) / 240, 0, 1);
    var slide = 32 * pow(1 - transition, 3) * shopState.slideDirection;
    pushMatrix();
    translate(slide, 0);
    click = click && transition >= 1 && mouseClick === true;
    if (shopState.tab !== 1) {
        var cosmetics = shopState.tab === 2;
        var catalog = cosmetics ? shopCosmetics : shopCatalog;
        var selection = cosmetics ? shopState.cosmeticSelected : shopState.selected;
        var sc = shopState.scroll[tabIndex];
        var shopContext = typeof externals !== "undefined" ? externals.context : null;
        if (shopContext) {
            shopContext.save();
            shopContext.beginPath();
            shopContext.rect(16, listTop, 452, listBottom - listTop);
            shopContext.clip();
        }
        for (var i = 0; i < catalog.length; i++) {
            var item = catalog[i];
            var x = 16 + (i % 3) * 155;
            var y = listTop + floor(i / 3) * rowHeight - sc;
            if (y + cardHeight < listTop || y > listBottom) {
                continue;
            }
            rectMode(CORNER);
            fill(selection === i ? 248 : 240);
            stroke(selection === i ? 55 : 218);
            strokeWeight(selection === i ? 3 : 1);
            rect(x, y, 143, 224, 7);
            noStroke();
            if (!cosmetics) {
                drawShopTeamLogo(item.skin, x + 122, y + 23, 25);
            }
            pushMatrix();
            translate(x + 71, y + 88);
            rotate(180);
            drawShopCharacter(item, 60, cosmetics);
            popMatrix();
            fill(40);
            textAlign(CENTER, CENTER);
            textSize(item.name.length > 15 ? 13 : 16);
            text(item.name, x + 71, y + 169);
            textSize(15);
            fill(110);
            text((cosmetics ? shopState.cosmeticsOwned[item.id] : shopState.owned[item.skin]) ? (cosmetics ? isCosmeticEquipped(item) : skin === item.skin) ? "EQUIPPED" : "OWNED" : shopNumber(shopPrice(item)), x + 71, y + 201);
            if (click && inside(x, y, 143, 224) && my >= listTop && my <= listBottom) {
                if (cosmetics) {
                    shopState.cosmeticSelected = i;
                } else {
                    shopState.selected = i;
                }
                selection = i;
                shopState.message = "";
                shopState.scrollTarget[tabIndex] = constrain(floor(i / 3) * rowHeight - 95, 0, maxScroll);
                mouseClick = null;
            }
        }
        if (shopContext) {
            shopContext.restore();
        }
        var selected = catalog[selection];
        pushMatrix();
        translate(685, 295);
        rotate(180);
        drawShopCharacter(selected, 112, cosmetics);
        popMatrix();
        if (!cosmetics) {
            drawShopTeamLogo(selected.skin, 802, 171, 42);
        }
        textAlign(CENTER, CENTER);
        fill(35);
        textSize(selected.name.length > 15 ? 21 : 25);
        text(selected.name.toUpperCase(), 683, 433);
        fill(100);
        textSize(16);
        text(selected.description, 683, 469);
        var owned = cosmetics ? shopState.cosmeticsOwned[selected.id] : shopState.owned[selected.skin];
        var equipped = owned && (cosmetics ? isCosmeticEquipped(selected) : skin === selected.skin);
        var affordable = owned || playerCredits >= shopPrice(selected);
        rectMode(CORNER);
        fill(equipped || !affordable ? 145 : 65);
        rect(568, 510, 232, 48, 5);
        fill(255);
        textSize(owned ? 21 : 17);
        text(cosmetics && selected.id === "jetpack" && equipped ? "UNEQUIP" : equipped ? "EQUIPPED" : owned ? "EQUIP" : "BUY  " + shopNumber(shopPrice(selected)), 684, 534);
        fill(100);
        textSize(14);
        text(shopState.message || (!affordable ? "Earn more credits in battle" : ""), 684, 583);
        if (click && (!equipped || (cosmetics && selected.id === "jetpack")) && inside(568, 510, 232, 48)) {
            shopActivate();
            mouseClick = null;
        }
    } else {
        var weapons = shopWeaponList();
        shopState.weaponSelected = constrain(shopState.weaponSelected, 0, weapons.length - 1);
        var weaponPage = floor(shopState.weaponSelected / 6);
        var scw = shopState.scroll[1];
        var weaponContext = typeof externals !== "undefined" ? externals.context : null;
        if (weaponContext) {
            weaponContext.save();
            weaponContext.beginPath();
            weaponContext.rect(16, listTop, 452, listBottom - listTop);
            weaponContext.clip();
        }
        for (var w = 0; w < weapons.length; w++) {
            var weapon = weapons[w];
            var wx = 16 + (w % 3) * 155;
            var wy = listTop + floor(w / 3) * rowHeight - scw;
            if (wy + cardHeight < listTop || wy > listBottom) {
                continue;
            }
            rectMode(CORNER);
            fill(240);
            stroke(shopState.weaponSelected === w ? 55 : 218);
            strokeWeight(shopState.weaponSelected === w ? 3 : 1);
            rect(wx, wy, 143, 224, 7);
            pushMatrix();
            translate(wx + 71, wy + 84);
            drawShopGunIcon(weapon, 110);
            popMatrix();
            noStroke();
            fill(40);
            textAlign(CENTER, CENTER);
            textSize(17);
            text(weapon.name, wx + 71, wy + 169);
            fill(110);
            textSize(14);
            text(currentGun === weapon.gun || (weapon.id === "lightsaber" && currentGun.isLightsaber) ? "EQUIPPED" : shopState.weaponsOwned[weapon.id] || weapon.basePrice === 0 ? "OWNED" : shopNumber(shopPrice(weapon)), wx + 71, wy + 201);
            if (click && inside(wx, wy, 143, 224) && my >= listTop && my <= listBottom) {
                shopState.weaponSelected = w;
                shopState.message = "";
                shopState.scrollTarget[1] = constrain(floor(w / 3) * rowHeight - 95, 0, maxScroll);
                mouseClick = null;
            }
        }
        if (weaponContext) {
            weaponContext.restore();
        }
        var selectedWeapon = weapons[shopState.weaponSelected];
        pushMatrix();
        translate(685, 290);
        drawShopGunIcon(selectedWeapon, 210);
        popMatrix();
        noStroke();
        fill(35);
        textAlign(CENTER, CENTER);
        textSize(26);
        text(selectedWeapon.name.toUpperCase(), 684, 433);
        fill(100);
        textSize(15);
        text(selectedWeapon.description, 684, 469);
        var weaponEquipped = currentGun === selectedWeapon.gun || (selectedWeapon.id === "lightsaber" && currentGun.isLightsaber);
        rectMode(CORNER);
        fill(weaponEquipped ? 145 : 65);
        rect(568, 510, 232, 48, 5);
        fill(255);
        textSize(21);
        text(weaponEquipped ? "EQUIPPED" : shopState.weaponsOwned[selectedWeapon.id] || selectedWeapon.basePrice === 0 ? "EQUIP" : "BUY " + shopNumber(shopPrice(selectedWeapon)), 684, 534);
        fill(100);
        textSize(13);
        text(shopState.message || (character === "Jedi" ? "Jedi and Sith can equip sabers." : "Lightsabers require a Jedi or Sith."), 684, 586);
        if (click && !weaponEquipped && inside(568, 510, 232, 48)) {
            equipShopWeapon(selectedWeapon.id);
            mouseClick = null;
        }
    }
    popMatrix();
    popMatrix();
    popStyle();
};

//Lightning
var zapArcs = [];
var zapSparks = [];
var zapBolts = [];
var ZapSpark = function (x, y) {
    var a = random(0, 360);
    var s = random(1, 4);

    this.x = x;
    this.y = y;
    this.vx = cos(a) * s;
    this.vy = sin(a) * s;
    this.life = random(8, 20);
};

ZapSpark.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;

    this.vx *= 0.94;
    this.vy *= 0.94;

    this.life--;
};

ZapSpark.prototype.draw = function () {
    noStroke();

    fill(140, 205, 255, constrain(this.life * 14, 0, 255));

    ellipse(this.x, this.y, 3, 3);
};

var addZapSparks = function (x, y, count) {
    for (var i = 0; i < count && zapSparks.length < 120; i++) {
        zapSparks.push(new ZapSpark(x, y));
    }
};

var ZapArc = function (x, y, a, b, power) {
    this.x = x;
    this.y = y;
    this.a = a;
    this.b = b;
    this.power = power;
    this.life = 5;
    this.maxLife = 5;
};

ZapArc.prototype.update = function () {
    this.life--;
};

ZapArc.prototype.draw = function () {
    var fade = this.life / this.maxLife;

    stroke(52, 119, 255, 56 * fade);
    strokeWeight(58 * this.power);
    line(this.x, this.y, this.a, this.b);

    stroke(90, 180, 255, 140 * fade);
    strokeWeight(8 * this.power * 2);
    line(this.x, this.y, this.a, this.b);

    stroke(235, 248, 255, 255 * fade);
    strokeWeight(max(0.4, 3 * this.power * 2));
    line(this.x, this.y, this.a, this.b);
};

var addZapArc = function (x, y, a, b, power) {
    if (zapArcs.length < 600) {
        zapArcs.push(new ZapArc(x, y, a, b, power));
    }
};

var ZapBolt = function (x, y, target, power) {
    this.x = x;
    this.y = y;
    this.target = target;
    this.power = power;
    this.life = 0;
    this.done = false;
};

var zapWall = function (a, b) {
    return Laser.prototype.raycastWalls.call(Laser.prototype, a, b);
};
var zapRoute = function (a, b) {
    var hit = zapWall(a, b);
    if (!hit) {
        return [b];
    }
    var dx = b.x - a.x;
    var dy = b.y - a.y;
    var d = max(1, dist(a.x, a.y, b.x, b.y));
    var best = null;
    var len = 801;
    for (var off = 32; off <= 128; off += 32) {
        for (var side = -1; side <= 1; side += 2) {
            var p = {
                x: hit.x - (dy / d) * off * side + (dx / d) * 12,
                y: hit.y + (dx / d) * off * side + (dy / d) * 12,
                z: a.z
            };
            var n = dist(a.x, a.y, p.x, p.y) + dist(p.x, p.y, b.x, b.y);
            if (n <= 800 && n <= d + 160 && n < len && !zapWall(a, p) && !zapWall(p, b)) {
                best = [p, b];
                len = n;
            }
        }
    }
    return best;
};
var zapGuardPoint = function (bot) {
    var now = tickClock.gameMs;
    if (now < (bot.zapGuardAt || 0) || now >= (bot.zapGuardUntil || 0) || !canGuardZap(bot)) {
        return null;
    }
    var saber = bot.weapon;
    var handAngle = getHandAngle(bot);
    var angle = handAngle + saber.swing + saber.spinAngle;
    if (saber.bladeLength < 0.25 || abs(angleDifference(angle, zapGuardFacing(bot) + 18)) > 26) {
        return null;
    }
    var hand = saberGrip(bot.skin, 1);
    var grip = saberPoint(bot.pos.x, bot.pos.y, handAngle, hand.x, hand.y);
    var blade = saberStyle(bot.skin);
    var bladeY = lerp(blade.base, blade.tip - blade.reach * saber.bladeLength, 0.55) * 180 / 390;
    return saberPoint(grip.x, grip.y, angle, 0, bladeY);
};
ZapBolt.prototype.update = function () {
    if (this.done) {
        return;
    }
    this.life++;
    if (!canAttack() || hasSpawnGrace(this.target.ent) || !this.route || this.life > 15 || !this.target.alive) {
        this.done = true;
        return;
    }
    var end = this.route[this.route.length - 1];
    var target = this.target.ent;
    var guard = zapGuardPoint(target);
    end.x = guard ? guard.x : this.target.x;
    end.y = guard ? guard.y : this.target.y;
    var head = {
        x: this.x,
        y: this.y,
        z: this.z
    };
    if (zapWall(head, this.route[0])) {
        this.done = true;
        return;
    }
    for (var i = 0; i < 12 && !this.done; i++) {
        var p = this.route[0];
        var dx = p.x - this.x;
        var dy = p.y - this.y;
        var d = max(0.001, sqrt(dx * dx + dy * dy));
        var step = min(12, d);
        var nx = this.x + (dx / d) * step;
        var ny = this.y + (dy / d) * step;
        var jitter = d > 24 ? random(-7, 7) : 0;
        var a = {
            x: this.x,
            y: this.y,
            z: this.z
        };
        var b = {
            x: nx - (dy / d) * jitter,
            y: ny + (dx / d) * jitter,
            z: this.z
        };
        if (zapWall(a, b)) {
            b.x = nx;
            b.y = ny;
            if (zapWall(a, b)) {
                this.done = true;
                break;
            }
        }
        addZapArc(this.x, this.y, b.x, b.y, this.power);
        if (random(1) < 0.11) {
            var ang = atan2(dy, dx) + random(-85, 85);
            var len = random(10, 30);
            var tip = {
                x: b.x + cos(ang) * len,
                y: b.y + sin(ang) * len,
                z: this.z
            };
            if (!zapWall(b, tip)) {
                addZapArc(b.x, b.y, tip.x, tip.y, this.power * 0.16);
            }
        }
        this.x = b.x;
        this.y = b.y;
        if (d <= 12) {
            this.route.shift();
            if (!this.route.length) {
                if (guard) {
                    target.force = max(0, target.force - forceSettings.lightningBlockCost);
                    addZapSparks(this.x, this.y, 6);
                } else {
                    if (tickClock.gameMs >= (target.zapGuardUntil || 0) || !canGuardZap(target)) {
                        target.zapUntil = tickClock.gameMs + 1000;
                    }
                    damageZap(target, this.power * 10);
                    addZapSparks(this.x, this.y, 3);
                }
                this.done = true;
            }
        }
    }
};

var zapCost = 600;
var zapWait = 60000;
zapProgress = function () {
    return zap.open ? 1 : constrain(min(zap.spent / zapCost, zap.start < 0 ? 0 : (tickClock.gameMs - zap.start) / zapWait), 0, 1);
};
zap = {
    spent: 0,
    start: -1,
    prev: 100,
    open: false,
    empty: false,
    next: 0,
    punch: 0,
    side: 1
};
resetLightning = function () {
    zapArcs = [];
    zapSparks = [];
    zapBolts = [];
    zap.spent = 0;
    zap.start = -1;
    zap.open = false;
    zap.empty = false;
    zap.next = 0;
    zap.prev = playerMaxForce;
};
trackLightning = function () {
    if (zap.open && playerForce <= 0) {
        zap.empty = true;
    }
    if (playerForce >= playerMaxForce) {
        zap.empty = false;
    }
    for (var i = zapBolts.length - 1; i >= 0; i--) {
        var b = zapBolts[i];
        var e = b.target.ent;
        b.target.x = e.pos.x;
        b.target.y = e.pos.y;
        b.target.alive = e.health > 0;
        b.update();
        if (b.done) {
            zapBolts.splice(i, 1);
        }
    }
    var lists = [zapArcs, zapSparks];
    for (var j = 0; j < lists.length; j++) {
        for (var i = lists[j].length - 1; i >= 0; i--) {
            lists[j][i].update();
            if (lists[j][i].life <= 0) {
                lists[j].splice(i, 1);
            }
        }
    }
    if (zap.start < 0) {
        zap.start = tickClock.gameMs;
        zap.prev = playerForce;
    }
    if (!zap.open) {
        zap.spent += max(0, zap.prev - playerForce);
    }
    zap.open = skin !== "Ahsoka Tano" && (zap.open || (zap.spent >= zapCost && tickClock.gameMs - zap.start >= zapWait));
    if (skin === "Ahsoka Tano") {
        zap.spent = 0;
    }
    zap.prev = min(playerMaxForce, playerForce + forceSettings.regenSpeed * forceProfile(skin).regen * tickClock.scale);
};
var forceHandY = function (side) {
    var t = constrain((zap.punch - tickClock.gameMs) / 240, 0, 1);
    return -38 - (zap.side === side ? sin(t * 180) * (side < 0 ? 30 : 40) : 0);
};
var fireZapHands = function () {
    if (skin === "Ahsoka Tano") {
        return 0;
    }
    if (!canAttack()) {
        return 0;
    }
    var list = currentMap.entities[floor(playerPos.z)] || [];
    var used = null;
    var count = 0;
    var pose = getHandPose(null);
    var b2 = isB2Droid(skin);
    var angle = b2 ? bodyAngle : pose.angle;
    var kick = b2 ? 0 : pose.kick;
    var a = angle - 90;
    var aim = screenToWorld(mouseX, mouseY);
    var reach = dist(aim.x, aim.y, playerPos.x, playerPos.y);
    var pointer = worldToScreen(playerPos.x + cos(a) * reach, playerPos.y + sin(a) * reach);
    for (var h = -1; h <= 1; h += 2) {
        var start = saberPoint(playerPos.x, playerPos.y, angle, h * 17, forceHandY(h) + kick);
        start.z = playerPos.z;
        if (zapWall(playerPos, start)) {
            continue;
        }
        var best = null;
        var route = null;
        var score = 99999;
        for (var pass = 0; pass < 2 && !best; pass++) {
            for (var i = 0; i < list.length; i++) {
                var e = list[i];
                if (!e.isMatchBot || e.health <= 0 || hasSpawnGrace(e) || e.team === playerTeam || (!pass && e === used)) {
                    continue;
                }
                var dx = e.pos.x - playerPos.x;
                var dy = e.pos.y - playerPos.y;
                var d = sqrt(dx * dx + dy * dy);
                var screen = worldToScreen(e.pos.x, e.pos.y, e.pos.z);
                var near = dist(screen.x, screen.y, pointer.x, pointer.y);
                if (d > 800 || near > 180 || (dx * cos(a) + dy * sin(a)) / max(1, d) < 0.78) {
                    continue;
                }
                var n = near - h * (-dx * sin(a) + dy * cos(a)) * 0.1 + random(0, 12);
                if (n >= score) {
                    continue;
                }
                var path = zapRoute(start, {
                    x: e.pos.x,
                    y: e.pos.y,
                    z: e.pos.z
                });
                if (path) {
                    best = e;
                    route = path;
                    score = n;
                }
            }
        }
        if (!best) {
            continue;
        }
        if (canGuardZap(best)) {
            var now = tickClock.gameMs;
            if (now >= (best.zapGuardUntil || 0)) {
                best.zapGuardAt = now + 55 * getBotAwareness(best).reactionScale;
            }
            best.zapGuardUntil = now + 220;
        }
        var bolt = new ZapBolt(start.x, start.y, {
            x: best.pos.x,
            y: best.pos.y,
            alive: true,
            r: 14,
            ent: best
        }, 0.5);
        bolt.route = route;
        bolt.z = playerPos.z;
        zapBolts.push(bolt);
        used = best;
        count++;
    }
    if (count) {
        screenShake = max(screenShake, 1.8 + count * 0.3);
    }
    return count;
};
var forceHit = function (range, dmg, fx) {
    if (!canAttack()) {
        return 0;
    }
    if (fx) {
        return fireZapHands();
    }
    var list = currentMap.entities[floor(playerPos.z)] || [];
    var best = null;
    var score = -99999;
    for (var i = 0; i < list.length; i++) {
        var e = list[i];
        if (!e.isMatchBot || e.health <= 0 || e.team === playerTeam) {
            continue;
        }
        var dx = e.pos.x - playerPos.x;
        var dy = e.pos.y - playerPos.y;
        var d = sqrt(dx * dx + dy * dy);
        var dot = (dx * cos(bodyAngle - 90) + dy * sin(bodyAngle - 90)) / max(1, d);
        if (d <= range && dot > 0.78 && dot * 160 - d * 0.16 > score) {
            best = e;
            score = dot * 160 - d * 0.16;
        }
    }
    if (best) {
        damageZap(best, dmg);
    }
};
damageZap = function (best, dmg) {
    var old = saberThrowConfig.damage;
    saberThrowConfig.damage = dmg;
    hitWithThrownSaber(best, {
        team: playerTeam
    });
    saberThrowConfig.damage = old;
};
channelingZap = function () {
    var item = getHeldItem();
    return !!(skin !== "Ahsoka Tano" && canAttack() && item && item.isFist && zap.open && !zap.empty && leftHeld() && playerForce > 0 && playerHealth > 0 && !currentGun.throwState && canUseGameInput() && !inventoryState.uiConsumed && !squadCommandMode && tickClock.gameMs >= inventoryState.readyAt);
};
var forceItem = function (light) {
    var item = new Ability({
    });
    item.heldItem = true;
    item.isLightning = light;
    item.isFist = !light;
    item.itemName = light ? "Lightning" : "Fists";
    item.update = function () {
        if (getHeldItem() !== this || !canUseGameInput() || inventoryState.uiConsumed || squadCommandMode || playerHealth <= 0 || tickClock.gameMs < inventoryState.readyAt) {
            return;
        }
        if (light) {
            selectHeldItem(1);
            return;
        }
        if (!canAttack()) {
            return;
        }
        if (leftHeld() && zap.open && skin !== "Ahsoka Tano") {
            if (playerForce >= playerMaxForce) {
                zap.empty = false;
            }
            if (zap.empty || currentGun.throwState) {
                return;
            }
            if (tickClock.gameMs >= zap.next) {
                var count = forceHit(800, 5, true);
                if (count) {
                    playerForce = max(0, playerForce - (0.3 * 3.9 * count) / 2);
                    if (playerForce === 0) {
                        zap.empty = true;
                    }
                }
                zap.next = tickClock.gameMs + 65;
            }
        } else if (leftHeld() && tickClock.gameMs >= zap.next) {
            zap.side *= -1;
            zap.punch = tickClock.gameMs + 240;
            forceHit(zap.side > 0 ? 85 : 70, zap.side > 0 ? 12 : 18, false);
            zap.next = tickClock.gameMs + 330;
        }
    };
    return item;
};
drawForceHands = function (item) {
    pushStyle();
    var c = getHandColors(skin);
    stroke(c.stroke);
    strokeWeight(2);
    fill(c.fill);
    var leftY = forceHandY(-1);
    var rightY = forceHandY(1);
    ellipse(-17, leftY, 16, 20);
    ellipse(17, rightY, 16, 20);
    var glow = hasForceGesture() ? 1 : 0;
    if (zap.open && !zap.empty && playerForce > 0 && playerHealth > 0) {
        var lightningGlow = channelingZap() ? 1.2 + sin(tickClock.gameMs * 0.8) * 0.14 : 0.45;
        glow = max(glow, lightningGlow);
    }
    if (skin === "Yoda" && glow > 0) {
        noStroke();
        fill(70, 230, 100, 18 * glow);
        ellipse(-17, leftY, 42, 42);
        ellipse(17, rightY, 42, 42);
        fill(155, 255, 165, 35 * glow);
        ellipse(-17, leftY, 23, 25);
        ellipse(17, rightY, 23, 25);
    }

    popStyle();
};
characterData.Jedi.abilities.unshift(forceItem(false));

drawZapWorld = function () {
    if (!zapArcs.length && !zapSparks.length) {
        return;
    }
    pushStyle();
    pushMatrix();
    rotate(-bodyAngle);
    translate(-playerPos.x, -playerPos.y);
    var groups = [];
    for (var i = 0; i < 10; i++) {
        groups.push([]);
    }
    for (var i = 0; i < zapArcs.length; i++) {
        var arc = zapArcs[i];
        var bucket = constrain(ceil(arc.life) - 1, 0, 4) + (arc.power < 0.1 ? 5 : 0);
        groups[bucket].push(arc);
    }

    var ctx = typeof externals !== "undefined" && externals.context;
    if (ctx && ctx.stroke) {
        ctx.save();
        ctx.lineCap = "round";
        for (var i = 0; i < groups.length; i++) {
            var list = groups[i];
            if (!list.length) {
                continue;
            }
            var power = list[0].power;
            var fade = ((i % 5) + 1) / 5;
            ctx.beginPath();
            for (var j = 0; j < list.length; j++) {
                var arc = list[j];
                ctx.moveTo(arc.x, arc.y);
                ctx.lineTo(arc.a, arc.b);
            }
            if (!lowDetailMode) {
                ctx.strokeStyle = "rgba(40,102,255," + 0.11 * fade + ")";
                ctx.lineWidth = 76 * power;
                ctx.stroke();
            }
            ctx.strokeStyle = "rgba(52,119,255," + 0.23 * fade + ")";
            ctx.lineWidth = 54 * power;
            ctx.stroke();
            ctx.strokeStyle = "rgba(102,181,255," + 0.65 * fade + ")";
            ctx.lineWidth = 20 * power;
            ctx.stroke();
            ctx.strokeStyle = "rgba(238,249,255," + fade + ")";
            ctx.lineWidth = max(0.4, 6 * power);
            ctx.stroke();
        }
        ctx.restore();
    } else {
        for (var i = 0; i < zapArcs.length; i++) {
            zapArcs[i].draw();
        }
    }
    for (var i = 0; i < zapSparks.length; i++) {
        zapSparks[i].draw();
    }
    popMatrix();
    popStyle();
};

var zapNoise = function (n) {
    var v = sin(n * 127.1 + 311.7) * 43758.5453;
    return v - floor(v);
};
drawZapReady = function () {
    if (skin === "Ahsoka Tano") {
        return;
    }
    if (!zap.open || zap.empty || playerForce <= 0 || playerHealth <= 0 || !playerHasForce()) {
        return;
    }
    var item = getHeldItem();
    var t = floor(tickClock.gameMs / 65);
    pushStyle();
    pushMatrix();
    var points;
    if (item) {
        var size = item.placeable ? 70 : item.itemName === "Grenade" ? 40 : 30;
        var y = item.placeable ? -(hitboxSize + size / 2) + 12 : -39;
        points = item.isFist ? [[-17, forceHandY(-1)], [17, forceHandY(1)]] : [
            [-size / 2 + 2, y],
            [size / 2 - 2, y]
        ];
    } else if (currentGun.isLightsaber) {
        points = [
            [27, -25],
            [27, -12]
        ];
    } else {
        var pose = 1 - constrain(playerGunPose, 0, 1);
        translate(-15 * pose, -35 - 4 * pose);
        rotate(-90 + 70 * pose);
        points = [
            [10, 4],
            [35, 3.5]
        ];
    }
    for (var h = 0; h < 2; h++) {
        var seed = t * 7 + h * 193;
        if (zapNoise(seed) > 0.42) {
            continue;
        }
        var size = 5 + zapNoise(seed + 23) * 7;
        var x = points[h][0] - size;
        var y = points[h][1];
        for (var i = 1; i <= 5; i++) {
            var nx = points[h][0] - size + i * size * 0.4;
            var ny = points[h][1] + (zapNoise(seed + i * 37) - 0.5) * 18;
            if (skin === "Yoda") {
                stroke(85, 230, 110, 100);
            } else {
                stroke(90, 175, 255, 100);
            }
            strokeWeight(4);
            line(x, y, nx, ny);
            if (skin === "Yoda") {
                stroke(205, 255, 210, 235);
            } else {
                stroke(220, 245, 255, 235);
            }
            strokeWeight(1);
            line(x, y, nx, ny);
            x = nx;
            y = ny;
        }
    }
    popMatrix();
    popStyle();
};

drawZapBlade = function (x, y, angle, skinName, length) {
    if (skinName === "Ahsoka Tano") {
        return;
    }
    if (!zap.open || zap.empty || playerForce <= 0 || playerHealth <= 0 || length < 0.05) {
        return;
    }
    pushStyle();
    pushMatrix();
    translate(x, y);
    rotate(angle);
    scale(180 / 390);
    var blade = saberStyle(skinName);
    var base = blade.base;
    var tip = blade.tip - blade.reach * length;
    var t = floor(tickClock.gameMs / 45);
    var paths = [[0, base, 0, tip, 12]];
    if (blade.guard) {
        paths.push([0, -19, 50 * length, -19, 4], [0, -19, -50 * length, -19, 4]);
    }
    if (blade.staff) {
        paths.push([0, -base, 0, -tip, 12]);
    }
    for (var p = 0; p < paths.length; p++) {
        var a = paths[p];
        var px = a[0];
        var py = a[1];
        for (var i = 1; i <= a[4]; i++) {
            var f = i / a[4];
            var jitter = i === a[4] ? 0 : (zapNoise(t * 13 + i * 29 + p * 97) - 0.5) * 22;
            var nx = a[0] + (a[2] - a[0]) * f + (a[0] === a[2] ? jitter : 0);
            var ny = a[1] + (a[3] - a[1]) * f + (a[0] === a[2] ? 0 : jitter);
            stroke(75, 160, 255, 120);
            strokeWeight(9);
            line(px, py, nx, ny);
            stroke(220, 248, 255, 240);
            strokeWeight(2.5);
            line(px, py, nx, ny);
            px = nx;
            py = ny;
        }
    }
    popMatrix();
    popStyle();
};

drawZapTrail = function (saber, trail, first) {
    if (saber.trailSkin === "Ahsoka Tano") {
        return;
    }
    if (saber !== currentGun || !saber.on || !zap.open || zap.empty || playerForce <= 0 || playerHealth <= 0) {
        return;
    }
    var step = max(1, ceil((trail.length - first - 1) / 8));
    var t = floor(tickClock.gameMs / 55);
    for (var i = first; i + step < trail.length; i += step) {
        var a = trail[i];
        var b = trail[i + step];
        var age = (tickClock.gameMs - a.time) / saberTrailConfig.lifeMs;
        var fade = saberTrailMotion(dist(a.tip.x, a.tip.y, b.tip.x, b.tip.y), b.time - a.time, false) - age;
        if (fade < 0.015) {
            continue;
        }
        var f = 0.65 + zapNoise(i * 31 + t) * 0.3;
        var x = lerp(a.base.x, a.tip.x, f);
        var y = lerp(a.base.y, a.tip.y, f);
        var tx = lerp(b.base.x, b.tip.x, f);
        var ty = lerp(b.base.y, b.tip.y, f);
        var dx = tx - x;
        var dy = ty - y;
        var len = max(1, sqrt(dx * dx + dy * dy));
        var sx = x;
        var sy = y;
        for (var j = 1; j <= 4; j++) {
            var jitter = j === 4 ? 0 : (zapNoise(t * 17 + i * 47 + j * 19) - 0.5) * 10;
            var nx = sx + (dx * j) / 4 - (dy / len) * jitter;
            var ny = sy + (dy * j) / 4 + (dx / len) * jitter;
            stroke(80, 170, 255, 65 * fade);
            strokeWeight(4);
            line(x, y, nx, ny);
            stroke(220, 245, 255, 180 * fade);
            strokeWeight(1);
            line(x, y, nx, ny);
            x = nx;
            y = ny;
        }
    }
};

//Supremacy
isSupremacy = function () {
    return matchState.gameMode === "Supremacy";
};
supColor = function (team) {
    return team < 0 ? color(215, 225, 232) : team === playerTeam ? color(65, 170, 255) : color(255, 75, 65);
};
initSupremacy = function () {
    if (!isSupremacy()) {
        return;
    }
    var posts = [];
    var objects = currentMap.objectsTemp || [];
    for (var i = 0; i < objects.length; i++) {
        if (objects[i] instanceof CommandPost) {
            posts.push(objects[i]);
        }
    }
    while (posts.length < 2) {
        var pos = supPoint(currentMap.offsetX || 0, (currentMap.offsetY || 0) + (posts.length ? -1 : 1) * currentMap.height * 0.3, 90) || supPoint(currentMap.spawnPos.x, currentMap.spawnPos.y, 90);
        if (!pos) {
            break;
        }
        var post = new CommandPost({
            x: pos.x,
            y: pos.y,
            zValue: pos.z,
            radius: 480,
            controllingTeam: -1
        });
        currentMap.objectsTemp.push(post);
        if (!currentMap.objects[pos.z]) {
            currentMap.objects[pos.z] = [];
        }
        currentMap.objects[pos.z].push(post);
        posts.push(post);
        if (!currentMap.collisionLayers[pos.z]) {
            currentMap.collisionLayers[pos.z] = [];
        }
        if (!currentMap.collisionBuckets[pos.z]) {
            currentMap.collisionBuckets[pos.z] = {
            };
        }
        for (var c = 0; c < post.collisions.length; c++) {
            var col = post.collisions[c];
            var buckets = currentMap.collisionBuckets[pos.z];
            currentMap.collisionLayers[pos.z].push(col);
            for (var bx = floor(col._minX / currentMap.colBucket); bx <= floor(col._maxX / currentMap.colBucket); bx++) {
                for (var by = floor(col._minY / currentMap.colBucket); by <= floor(col._maxY / currentMap.colBucket); by++) {
                    var key = bx + "," + by;
                    if (!buckets[key]) {
                        buckets[key] = [];
                    }
                    buckets[key].push(col);
                }
            }
        }
    }
    posts = posts.slice(0, 2);
    posts.sort(function (a, b) {
        return b.y - a.y;
    });
    for (var i = 0; i < posts.length; i++) {
        var p = posts[i];
        p.supPost = true;
        p.label = String.fromCharCode(65 + i);
        p.owner = -1;
        p.value = 0;
        p.controllingTeam = -1;
        p.radius = 480;
        p.zone = 240;
        p.controlState = "neutral";
        p.counts = [0, 0];
        p.status = "Neutral";
    }
    currentMap.sup = {
        posts: posts,
        points: [0, 0]
    };
    currentMap.minimap = null;
};
var inSupZone = function (p, pos) {
    return abs(pos.z - p.lowZ) <= 0.12 && dist(pos.x, pos.y, p.x, p.y) <= p.zone;
};
var updateSupremacy = function () {
    if (!isSupremacy() || !currentMap.sup || matchState.phase !== "live") {
        return;
    }
    var state = currentMap.sup;
    var owned = [0, 0];
    for (var i = 0; i < state.posts.length; i++) {
        var p = state.posts[i];
        var counts = [0, 0];
        if (playerHealth > 0 && !deathScreenActive && inSupZone(p, playerPos)) {
            counts[playerTeam]++;
        }
        var list = currentMap.entities[floor(p.lowZ)] || [];
        for (var j = 0; j < list.length; j++) {
            var e = list[j];
            if (e.isMatchBot && e.health > 0 && (e.team === 0 || e.team === 1) && inSupZone(p, e.pos)) {
                counts[e.team]++;
            }
        }
        p.counts = counts;
        if (counts[0] && counts[1]) {
            p.status = "Contested";
            p.controlState = "contested";
        } else if (counts[0] || counts[1]) {
            var team = counts[0] ? 0 : 1;
            var dir = team === 0 ? 1 : -1;
            var before = p.value;
            p.value = constrain(p.value + (dir * tickClock.scale) / 480, -1, 1);
            if (p.owner >= 0 && (p.owner === 0 ? p.value <= 0 : p.value >= 0)) {
                p.owner = -1;
            }
            if (p.value >= 1) {
                p.owner = 0;
            }
            if (p.value <= -1) {
                p.owner = 1;
            }
            p.status = p.owner === team && abs(p.value) === 1 ? "Controlled" : before * dir < 0 ? "Neutralizing" : "Capturing";
            p.controlState = p.status === "Controlled" ? "captured" : "capturing";
        } else {
            p.status = p.owner < 0 ? "Neutral" : "Controlled";
            p.controlState = p.owner < 0 ? "neutral" : "captured";
        }
        p.controllingTeam = p.owner;
        if (p.owner >= 0) {
            owned[p.owner]++;
        }
    }
    var advantage = owned[0] - owned[1];
    if (advantage) {
        var team = advantage > 0 ? 0 : 1;
        state.points[team] = min(matchState.scoreLimit, state.points[team] + (abs(advantage) * tickClock.scale) / 60);
        matchState.teamScores[team] = floor(state.points[team]);
        if (state.points[team] >= matchState.scoreLimit) {
            matchState.phase = "ending";
            matchState.winnerTeam = team;
            matchState.endingFrame = 0;
            if (team === playerTeam && !matchState.creditsAwarded) {
                matchState.creditsAwarded = true;
                matchState.lastCreditAward = 750;
                addCreditChange(750);
            }
            settleCreditDisplay();
        }
    }
};
renderSupPost = function (p) {
    pushStyle();
    pushMatrix();
    translate(p.x, p.y);
    var c = supColor(p.owner);
    var spin = tickClock.gameMs * 0.06;
    noFill();
    stroke(c);
    strokeWeight(3);
    ellipse(0, 0, p.zone * 2, p.zone * 2);
    if (abs(p.value) > 0) {
        stroke(supColor(p.value > 0 ? 0 : 1));
        strokeWeight(6);
        arc(0, 0, p.zone * 2 - 10, p.zone * 2 - 10, -90, -90 + abs(p.value) * 360);
    }
    noStroke();
    fill(red(c), green(c), blue(c), 35);
    quad(-16, -12, 16, -12, 38, -105, -38, -105);
    noFill();
    stroke(c);
    strokeWeight(3);
    ellipse(0, -83, 70, 70);
    strokeWeight(5);
    arc(0, -83, 70, 70, spin, spin + 65);
    fill(c);
    textAlign(CENTER, CENTER);
    textSize(34);
    text(p.label, 0, -85);
    if (p.status === "Contested") {
        fill(255, 220, 140);
        textSize(16);
        textAlign(CENTER, CENTER);
        text("Contested", 0, -135);
    }
    popMatrix();
    popStyle();
};
var drawSupHUD = function () {
    if (!isSupremacy() || !currentMap.sup) {
        return;
    }
    pushStyle();
    textAlign(CENTER, CENTER);
    textSize(11);
    fill(220, 230, 240);
    text("SUPREMACY · HOLD THE POSTS", width / 2, 57);
    var posts = currentMap.sup.posts;
    var inside = null;
    for (var i = 0; i < posts.length; i++) {
        var p = posts[i];
        var x = width / 2 + (i - (posts.length - 1) / 2) * 56;
        stroke(supColor(p.owner));
        strokeWeight(2);
        fill(12, 22, 34, 190);
        ellipse(x, 95, 38, 38);
        fill(supColor(p.owner));
        textSize(19);
        text(p.label, x, 94);
        if (p.status === "Contested") {
            fill(255, 215, 130);
            textSize(9);
            text("!", x + 19, 77);
        }
        if (playerHealth > 0 && inSupZone(p, playerPos)) {
            inside = p;
        }
    }
    if (inside && matchState.phase === "live" && !deathScreenActive) {
        var y = height - 112;
        var c = inside.status === "Contested" ? color(255, 215, 130) : supColor(playerTeam);
        rectMode(CENTER);
        noStroke();
        fill(9, 18, 29, 205);
        rect(width / 2, y + 8, 190, 76, 8);
        noFill();
        stroke(80, 95, 115);
        strokeWeight(4);
        ellipse(width / 2 - 57, y, 32, 32);
        stroke(c);
        arc(width / 2 - 57, y, 32, 32, -90, -90 + abs(inside.value) * 360);
        fill(c);
        textSize(16);
        text(inside.label, width / 2 - 57, y - 1);
        textAlign(LEFT, CENTER);
        textSize(12);
        text(inside.status, width / 2 - 28, y);
        fill(210, 225, 240);
        textSize(10);
        textAlign(CENTER, CENTER);
        text(inside.status === "Contested" ? "Clear enemies from the ring" : "Stay inside the capture ring", width / 2, y + 32);
    }
    popStyle();
};
var drawSupMinimap = function (canvas) {
    if (!isSupremacy() || !currentMap.sup) {
        return;
    }
    var posts = currentMap.sup.posts;
    for (var i = 0; i < posts.length; i++) {
        var p = posts[i];
        var x = 75 + ((p.x - playerPos.x) * minimapView.size) / currentMap.width;
        var y = 75 + ((p.y - playerPos.y) * minimapView.size) / currentMap.height;
        x = constrain(x, 10, 140);
        y = constrain(y, 10, 140);
        canvas.fill(10, 18, 29, 220);
        canvas.stroke(supColor(p.owner));
        canvas.strokeWeight(2);
        canvas.ellipse(x, y, 18, 18);
        canvas.fill(supColor(p.owner));
        canvas.textAlign(CENTER, CENTER);
        canvas.textSize(11);
        canvas.text(p.label, x, y - 1);
    }
};
moveSupBot = function (bot, post, weight) {
    var slot = bot.supSlot || 0;
    var dx = post.x + cos(slot) * post.zone * 0.25 - bot.pos.x;
    var dy = post.y + sin(slot) * post.zone * 0.25 - bot.pos.y;
    var d = sqrt(dx * dx + dy * dy);
    if (d < post.zone * 0.6 && abs(bot.pos.z - post.lowZ) < 0.12) {
        return;
    }
    var destination = {
        x: bot.pos.x + dx,
        y: bot.pos.y + dy,
        z: post.lowZ
    };
    var waypoint = aiDoorWaypoint(bot, destination);
    if (waypoint) {
        aiMoveToward(bot, waypoint, weight);
        return;
    }
    if (aiSideApproach(bot, destination, weight, false)) {
        return;
    }
    var angle = atan2(dy, dx);
    var side = bot.supSide || 1;
    var turns = [0, 45 * side, 90 * side, 135 * side, -45 * side, -90 * side, 180];
    for (var i = 0; i < turns.length; i++) {
        var a = angle + turns[i];
        var clear = true;
        for (var step = 28; step <= 140; step += 28) {
            if (solidAt(bot.pos.x + cos(a) * step, bot.pos.y + sin(a) * step, bot.pos.z, bot.colSize, null, true)) {
                clear = false;
                break;
            }
        }
        if (clear) {
            var power = getBotMoveAccel() * (weight === undefined ? 1 : weight) * tickClock.scale;
            bot.vel.x += cos(a) * power;
            bot.vel.y += sin(a) * power;
            return;
        }
    }
    bot.supSide = -side;
};
var chooseSupPost = function (bot) {
    var posts = currentMap.sup.posts;
    var goal = bot.supGoal;
    var now = tickClock.gameMs;
    if (goal && posts.indexOf(goal) !== -1) {
        if (inSupZone(goal, bot.pos) && (goal.owner !== bot.team || abs(goal.value) < 1)) {
            return goal;
        }
        if (goal.owner !== bot.team && now < (bot.supThink || 0)) {
            return goal;
        }
        if (goal.owner === bot.team && inSupZone(goal, bot.pos)) {
            bot.supLast = goal;
        }
    }
    var attack = false;
    var best = null;
    var score = 999999;
    for (var i = 0; i < posts.length; i++) {
        if (posts[i].owner !== bot.team) {
            attack = true;
        }
    }
    for (var i = 0; i < posts.length; i++) {
        var p = posts[i];
        if (attack && p.owner === bot.team) {
            continue;
        }
        var n = dist(bot.pos.x, bot.pos.y, p.x, p.y) + (p === bot.supLast ? 10000 : 0);
        if (n < score) {
            score = n;
            best = p;
        }
    }
    bot.supGoal = best;
    bot.supThink = now + bot.temper.delay;
    return best;
};
updateSupBot = function (bot) {
    if (!currentMap.sup || (bot.temper.role === "guard" && !bot.inPlayerSquad) || inSaberDuel(bot) || tickClock.gameMs < (bot.zapUntil || 0)) {
        return;
    }
    if (bot.supSide === undefined) {
        bot.supSide = bot.temper.side;
    }
    bot.supSlot = bot.temper.roam;
    var goal = chooseSupPost(bot);
    if (!goal || (bot.isJedi && tickClock.gameMs < (bot.dashUntil || 0))) {
        return;
    }
    var view = getAIPerception(bot);
    if (view.detonator && dist(bot.pos.x, bot.pos.y, view.detonator.pos.x, view.detonator.pos.y) < aiSettings.detonatorUrgentRange) {
        return;
    }
    var target = aiFindNearestEnemy(bot, true);
    var weight = 1.3;
    if (target && dist(bot.pos.x, bot.pos.y, target.pos.x, target.pos.y) < botCombatRange(bot) * 1.3) {
        if (bot.health < bot.maxHealth * 0.25) {
            return;
        }
        weight = 0.25;
    }
    moveSupBot(bot, goal, weight * bot.temper.push);
};

//Duel
duel = {
    foe: null,
    last: 0,
    start: 0,
    span: 420,
    hit: false,
    move: -1,
    recover: 0,
    slowUntil: 0,
    incoming: null,
    flashes: []
};
resetSaberDuel = function () {
    endDuel();
    duel.incoming = null;
    duel.flashes = [];
    duel.slowUntil = 0;
    duel.recover = 0;
};
endDuel = function () {
    if (!duel.foe) {
        return;
    }
    var blade = duel.foe.weapon;
    if (blade) {
        if (duel.bBlade) {
            blade.swing = -40 + angleDifference(blade.swing, -40);
        }
        blade.clicked = false;
        blade.spinVelocity = 0;
        blade.spinAngle = 0;
    }
    if (currentGun && currentGun.isLightsaber) {
        if (duel.aBlade) {
            currentGun.swing = -40 + angleDifference(currentGun.swing, -40);
        }
        currentGun.clicked = false;
        currentGun.swingDidDamage = false;
        currentGun.spinVelocity = 0;
        currentGun.spinAngle = 0;
    }
    duel.foe = null;
    duel.last = 0;
    duel.aBlade = null;
    duel.bBlade = null;
};
var duelHeld = function () {
    return ((leftHeld() || mouseClick) && !rightHeld && !(dashBill && dashBill.spinHits) && !inventoryState.uiConsumed && canUseGameInput());
};
var saberCharged = function (actor) {
    if ((actor ? actor.skin : skin) === "Ahsoka Tano") {
        return false;
    }
    return actor ? !!actor.lightningReady && actor.force > 0 : zap.open && !zap.empty && playerForce > 0;
};
saberPower = function (actor) {
    return saberCharged(actor) ? 1.15 : 1;
};
var heldDuelSaber = function () {
    return currentGun && currentGun.isLightsaber && currentGun.on && hasHeldSaber(currentGun, skin) && inventoryState.selected === 0 && playerHealth > 0 && canAttack() ? currentGun : null;
};
var validDuelFoe = function (foe) {
    return !!(foe && foe.health > 0 && foe.team !== playerTeam && canAttack(foe) && foe.weapon && foe.weapon.isLightsaber && foe.weapon.on && hasHeldSaber(foe.weapon, foe.skin) && abs(foe.pos.z - playerPos.z) < 0.8 && dist(foe.pos.x, foe.pos.y, playerPos.x, playerPos.y) < 275 && facesSaberThreat(playerPos, bodyAngle, foe.pos, 75) && facesSaberThreat(foe.pos, foe.bodyAngle, playerPos, 75) && tickClock.gameMs >= (foe.saberStunUntil || 0) && !Laser.prototype.raycastWalls.call(Laser.prototype, playerPos, foe.pos));
};
inSaberDuel = function (actor) {
    if (actor && !actor.isPlayerTarget && !actor.isPlayer && actor !== duel.foe) {
        return false;
    }
    return !!(duel.foe && duelHeld() && heldDuelSaber() && validDuelFoe(duel.foe) && tickClock.realMs - duel.last < 350 && (!actor || actor.isPlayerTarget || actor.isPlayer || actor === duel.foe));
};
duelTarget = function (target) {
    return !!target && inSaberDuel(target);
};
saberFlash = function (x, y, z, charged) {
    duel.flashes.push({
        x: x,
        y: y,
        z: z,
        at: tickClock.realMs,
        charged: charged
    });
    if (duel.flashes.length > 12) {
        duel.flashes.shift();
    }
};
var pickDuelBlade = function (skinName, previous) {
    if (!saberStyle(skinName).staff) {
        return null;
    }
    var wasRear = !!(previous && previous.rear);
    var rear = !!previous && !wasRear && random() < 0.25;
    return {
        rear: rear,
        turning: rear !== wasRear,
        angle: null
    };
};
var beginDuelSwing = function () {
    var move = floor(random(0, 4));
    if (move === duel.move) {
        move = (move + 1 + floor(random(0, 3))) % 4;
    }
    duel.aBlade = pickDuelBlade(skin, duel.aBlade);
    duel.bBlade = pickDuelBlade(duel.foe.skin, duel.bBlade);
    duel.a0 = currentGun.swing + (duel.aBlade ? currentGun.spinAngle : 0);
    duel.b0 = duel.foe.weapon.swing + (duel.bBlade ? duel.foe.weapon.spinAngle : 0);
    duel.move = move;
    duel.dir = move % 2 ? 1 : -1;
    duel.windA = random(42, 64);
    duel.windB = random(30, 57);
    duel.backA = random(16, 27);
    duel.backB = random(12, 24);
    duel.off = random(-18, 18);
    duel.along = random(-10, 10);
    duel.windAt = random(0.18, 0.27);
    duel.start = tickClock.gameMs;
    duel.span = random(220, 290);
    duel.hit = false;
};
var recordDuelInput = function () {
    if (!heldDuelSaber() || inventoryState.uiConsumed || !canUseGameInput() || rightHeld) {
        endDuel();
        return;
    }
    if (!duelHeld() || tickClock.gameMs < duel.recover) {
        endDuel();
        return;
    }
    if (validDuelFoe(duel.foe)) {
        duel.last = tickClock.realMs;
        return;
    }
    endDuel();
    var list = currentMap.entities[floor(playerPos.z)] || [];
    var best = 231;
    for (var i = 0; i < list.length; i++) {
        var e = list[i];
        if (!validDuelFoe(e)) {
            continue;
        }
        var dx = e.pos.x - playerPos.x;
        var dy = e.pos.y - playerPos.y;
        var d = sqrt(dx * dx + dy * dy);
        if (d < best && (dx * cos(bodyAngle - 90) + dy * sin(bodyAngle - 90)) / max(1, d) > 0.35) {
            best = d;
            duel.foe = e;
        }
    }
    if (duel.foe) {
        duel.last = tickClock.realMs;
        beginDuelSwing();
    }
};
var duelSwingPath = function (start, wind, contact, back, p, at) {
    var a;
    var b;
    var t;
    if (p < at) {
        a = start;
        b = wind;
        t = p / at;
    } else if (p < 0.56) {
        a = wind;
        b = contact;
        t = (p - at) / (0.56 - at);
    } else {
        a = contact;
        b = back;
        t = (p - 0.56) / 0.44;
    }
    return lerp(a, b, t * t * (3 - 2 * t));
};
var duelBladeSwing = function (start, contact, wind, back, p, at, staff) {
    if (staff) {
        contact += staff.rear ? 180 : 0;
        var anchor = staff.angle === null ? start - (staff.turning ? 0 : wind) : staff.angle;
        staff.angle = anchor + angleDifference(contact, anchor);
        contact = staff.angle;
        if (staff.turning) {
            return duelSwingPath(start, start, contact, contact + back, p, 0);
        }
    }
    return duelSwingPath(start, contact + wind, contact, contact + back, p, at);
};
var poseDuelSabers = function () {
    if (!duel.foe) {
        return;
    }
    var p = constrain((tickClock.gameMs - duel.start) / duel.span, 0, 1);
    var angle = atan2(duel.foe.pos.y - playerPos.y, duel.foe.pos.x - playerPos.x);
    var side = duel.off;
    var x = (playerPos.x + duel.foe.pos.x) / 2 - sin(angle) * side + cos(angle) * duel.along;
    var y = (playerPos.y + duel.foe.pos.y) / 2 + cos(angle) * side + sin(angle) * duel.along;
    var aSide = saberStyle(skin).dual && !heldSaberSide(currentGun, 1) ? -1 : 1;
    var bSide = saberStyle(duel.foe.skin).dual && !heldSaberSide(duel.foe.weapon, 1) ? -1 : 1;
    var aHand = saberGrip(skin, aSide);
    var bHand = saberGrip(duel.foe.skin, bSide);
    var a = saberPoint(playerPos.x, playerPos.y, getHandAngle(null), aHand.x, aHand.y);
    var b = saberPoint(duel.foe.pos.x, duel.foe.pos.y, getHandAngle(duel.foe), bHand.x, bHand.y);
    var contact = atan2(y - a.y, x - a.x) + 90 - getHandAngle(null);
    var other = atan2(y - b.y, x - b.x) + 90 - getHandAngle(duel.foe);
    if (aSide < 0) {
        contact = 180 - contact;
    }
    if (bSide < 0) {
        other = 180 - other;
    }
    contact = atan2(sin(contact), cos(contact));
    other = atan2(sin(other), cos(other));
    duel.contact = {
        x: x,
        y: y,
        z: playerPos.z
    };
    currentGun.swing = duelBladeSwing(duel.a0, contact, duel.dir * duel.windA, duel.dir * duel.backA, p, 0.22, duel.aBlade);
    duel.foe.weapon.swing = duelBladeSwing(duel.b0, other, -duel.dir * duel.windB, -duel.dir * duel.backB, p, duel.windAt, duel.bBlade);
    currentGun.clicked = true;
    currentGun.spinAngle = 0;
    currentGun.spinVelocity = 0;
    currentGun.swingDidDamage = true;
    duel.foe.weapon.clicked = true;
    duel.foe.weapon.spinAngle = 0;
    duel.foe.weapon.spinVelocity = 0;
};
var clashSabers = function () {
    var foe = duel.foe;
    var charged = saberCharged(null);
    var enemyCharged = saberCharged(foe);
    var x = duel.contact.x;
    var y = duel.contact.y;
    saberFlash(x, y, playerPos.z, charged || enemyCharged);
    screenShake = max(screenShake, 1.2);
    var pressure = (0.1 * duel.span) / 420;
    var a = pressure * (enemyCharged ? 1.2 : 1) * (charged ? 0.9 : 1);
    var b = pressure * (charged ? 1.2 : 1) * (enemyCharged ? 0.9 : 1);
    playerForce = max(0, playerForce - a);
    foe.force = max(0, foe.force - b);
    if (playerForce === 0 || foe.force === 0) {
        if (foe.force === 0) {
            damageByPlayer(foe, currentGun.damage * saberPower(null), playerTeam);
            foe.saberStunUntil = tickClock.gameMs + 650;
        } else {
            hitJediTarget(foe, jediPlayerTarget(), foe.weapon.damage);
        }
        duel.recover = tickClock.gameMs + 650;
        endDuel();
    }
};
runPlayerDuel = function (saber) {
    if (tickClock.gameMs < duel.recover) {
        saber.clicked = false;
        saber.tick();
        return true;
    }
    recordDuelInput();
    if (!inSaberDuel(null)) {
        endDuel();
        return false;
    }
    saber.tick();
    turnPlayerToward(atan2(duel.foe.pos.x - playerPos.x, -(duel.foe.pos.y - playerPos.y)));
    poseDuelSabers();
    var p = (tickClock.gameMs - duel.start) / duel.span;
    if (p >= 0.56 && !duel.hit) {
        duel.hit = true;
        clashSabers();
    }
    if (duel.foe && p >= 1) {
        beginDuelSwing();
    }
    poseDuelSabers();
    return true;
};
updateDuelActor = function (bot) {
    bot.wantsToShoot = false;
    bot.gunPose = 1;
    bot.bodyAngle = turnTowardAngle(bot.bodyAngle, atan2(playerPos.x - bot.pos.x, -(playerPos.y - bot.pos.y)), getBotAwareness(bot).turnSpeed * tickClock.scale);
    var d = dist(bot.pos.x, bot.pos.y, playerPos.x, playerPos.y);
    if (d > 185) {
        aiMoveToward(bot, playerPos, 0.6);
    } else if (d < 110) {
        aiMoveAway(bot, playerPos, 0.6);
    } else {
        var x = bot.pos.x + cos(bot.bodyAngle) * duel.dir * 50;
        var y = bot.pos.y + sin(bot.bodyAngle) * duel.dir * 50;
        if (!solidAt(x, y, bot.pos.z, bot.colSize) && aiHasSupport(x, y, bot.pos.z)) {
            aiMoveToward(bot, {
                x: x,
                y: y
            }, 0.18);
        }
    }
    poseDuelSabers();
};
duelDeflectPulse = function (hit) {
    duel.slowUntil = max(duel.slowUntil, tickClock.realMs + 320);
    saberFlash(hit.x, hit.y, hit.z, true);
};
var duelTimeScale = function () {
    if (gameStage !== "Play" || matchState.phase !== "live" || stageTransition.active || deathScreenActive) {
        resetSaberDuel();
        return 1;
    }
    if (duel.foe && !inSaberDuel(null)) {
        endDuel();
    }
    duel.incoming = null;
    var scale = tickClock.realMs < duel.slowUntil ? 0.035 : 1;
    if (playerHealth <= 0 || !playerHasForce() || !canAttack()) {
        return scale;
    }
    for (var i = 0; i < activeSaberThrows.length; i++) {
        var s = activeSaberThrows[i].throwState;
        if (!s || s.team === playerTeam || s.returning || s.parried || s.map !== currentMap || abs(s.z - playerPos.z) > 0.8) {
            continue;
        }
        var dx = playerPos.x - s.x;
        var dy = playerPos.y - s.y;
        var d = sqrt(dx * dx + dy * dy);
        if (d > 420 || (dx * s.dx + dy * s.dy) / max(1, d) < 0.5 || Laser.prototype.raycastWalls.call(Laser.prototype, {
            x: s.x,
            y: s.y,
            z: s.z
        }, playerPos)) {
            continue;
        }
        if (s.warnAt === undefined) {
            s.warnAt = tickClock.realMs;
        }
        duel.incoming = s;
        if (tickClock.realMs - s.warnAt < 1200) {
            scale = min(scale, 0.18);
        }
    }
    return scale;
};
var canParryThrow = function (pos, angle, state, oldX, oldY) {
    var dx = oldX - pos.x;
    var dy = oldY - pos.y;
    return abs(pos.z - state.z) <= 0.8 && dx * (state.x - oldX) + dy * (state.y - oldY) < 0 && abs(angleDifference(atan2(dy, dx), angle - 90)) <= 50 && saberSweepDist(pos.x, pos.y, oldX, oldY, state.x, state.y) <= 235 && !Laser.prototype.raycastWalls.call(Laser.prototype, state, pos);
};
parryThrownSaber = function (state, oldX, oldY) {
    if (state.parried) {
        return false;
    }
    var target = null;
    if (!state.returning && state.team !== playerTeam && playerCanDeflect(heldDuelSaber()) && canParryThrow(playerPos, bodyAngle, state, oldX, oldY)) {
        target = jediPlayerTarget();
    }
    for (var layer = floor(state.z - 0.8); !target && layer <= floor(state.z + 0.8); layer++) {
        var list = currentMap.entities[layer] || [];
        for (var i = 0; i < list.length; i++) {
            var e = list[i];
            if (e.isJedi && e.team !== state.team && e.force >= forceSettings.autoDeflectCost && canBotSwing(e, e.weapon) && saberSwinging(e.weapon) && canParryThrow(e.pos, e.bodyAngle, state, oldX, oldY)) {
                target = e;
                break;
            }
        }
    }
    if (!target) {
        return false;
    }
    state.returning = true;
    state.parried = true;
    if (target.isPlayerTarget) {
        recordAchievement("parries", 1);
        playerForce = max(0, playerForce - 0.1);
    } else {
        target.force = max(0, target.force - forceSettings.autoDeflectCost);
    }
    saberFlash(state.x, state.y, state.z, target.isPlayerTarget && saberCharged(null));
    return true;
};
renderDuelFX = function (layer) {
    pushStyle();
    pushMatrix();
    translate(-camPos.x, -camPos.y);
    for (var i = 0; i < duel.flashes.length; i++) {
        var fx = duel.flashes[i];
        var age = tickClock.realMs - fx.at;
        if (floor(fx.z) !== layer || age < 0 || age > 130) {
            continue;
        }
        pushMatrix();
        applyWorldHeight(fx.z - playerPos.z, playerPos.z);
        var fade = 1 - age / 130;
        var r = 12 + age * 0.12;
        noStroke();
        fill(fx.charged ? color(145, 220, 255, 140 * fade) : color(255, 220, 145, 140 * fade));
        ellipse(fx.x, fx.y, r * 3, r * 3);
        fill(255, 244, 205, 200 * min(1, fade * 1.5));
        ellipse(fx.x, fx.y, r * 2, r * 2);
        fill(255, 255, 250, 255 * min(1, fade * 2));
        ellipse(fx.x, fx.y, r * 1.2, r * 1.2);
        popMatrix();
    }
    popMatrix();
    popStyle();
};
var drawDuelHUD = function () {
    if (!duel.incoming) {
        return;
    }
    pushStyle();
    rectMode(CENTER);
    noStroke();
    fill(12, 20, 32, 195);
    rect(width / 2, 122, 280, 32, 5);
    fill(225, 240, 255);
    textSize(12);
    textAlign(CENTER, CENTER);
    text(heldDuelSaber() ? "FACE THE SABER · HOLD TO DEFLECT" : "DANGER SENSE · INCOMING SABER", width / 2, 122);
    popStyle();
};

//Impact Damage
var impactMass = function (a) {
    return a && a.mass > 0 ? a.mass : 80 * pow(((a && a.colSize) || hitboxSize) / hitboxSize, 2);
};
var impactSafe = function (a) {
    return tickClock.gameMs < (a ? a.impactDashUntil || 0 : playerVel.impactDashUntil || 0);
};
var impactHurt = function (a, damage, forceImpact) {
    if (damage < 0.5 || impactSafe(a)) {
        return;
    }
    var target = a || jediPlayerTarget();
    if (target.health === undefined || target.health <= 0) {
        return;
    }
    if (a && a.team !== playerTeam && (forceImpact || forceMovesTarget(a))) {
        Laser.prototype.damageEntityHit.call({
            damage: damage,
            owner: {
                isPlayer: true,
                team: playerTeam
            }
        }, a);
    } else {
        applyDamage(target, damage, null);
    }
    if (!a) {
        playerHealth = target.health;
        playerShield = target.shield;
    }
};
crushActor = function (actor, speed, mass, forceImpact) {
    var stamp = actor || playerVel;
    var now = tickClock.gameMs;
    if (speed < 0.8 || now < (stamp.crushReadyAt || 0)) {
        return;
    }
    stamp.crushReadyAt = now + 110;
    impactHurt(actor, constrain(speed * (1.3 + sqrt(mass)), 2, 65), forceImpact);
};
impactWall = function (a, wall, pos, vel, size, bounce) {
    var vx = vel.x;
    var vy = vel.y;
    var hit = wall.entityCollide(pos, vel, size, bounce);
    if (!(hit & 2)) {
        return hit;
    }
    var dx = vx - vel.x;
    var dy = vy - vel.y;
    var speed = sqrt(dx * dx + dy * dy) / (1 + (bounce || 0));
    if (wall.crate) {
        damageCrateImpact(wall.crate, speed);
    }
    if ((a && a.health === undefined) || (!a && gripProtectsPlayer(wall.crate))) {
        return hit;
    }
    var stamp = a || playerVel;
    if (speed > 9 && tickClock.gameMs >= (stamp.impactWallAt || 0)) {
        stamp.impactWallAt = tickClock.gameMs + 120;
        impactHurt(a, (impactMass(a) / 80) * (speed * speed - 81) * 0.12);
    }
    return hit;
};
impactBodies = function (a, b, nx, ny) {
    if (!b.vel || impactSafe(a) || impactSafe(b)) {
        return;
    }
    var vel = a ? a.vel : playerVel;
    var speed = -((vel.x - b.vel.x) * nx + (vel.y - b.vel.y) * ny);
    if (speed <= 9) {
        return;
    }
    var ma = impactMass(a);
    var mb = impactMass(b);
    var reduced = (ma * mb) / (ma + mb);
    var energy = (reduced / 80) * (speed * speed - 81) * 0.12;
    var impulse = reduced * speed;
    impactHurt(a, (energy * mb) / (ma + mb), forceMovesTarget(b));
    vel.x += (nx * impulse) / ma;
    vel.y += (ny * impulse) / ma;
    impactHurt(b, (energy * ma) / (ma + mb), forceMovesTarget(a));
    b.vel.x -= (nx * impulse) / mb;
    b.vel.y -= (ny * impulse) / mb;
};

//Game Loop
var drawEditorTip = function () {
    background(12, 18, 26);
    pushStyle();
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    noStroke();
    fill(28, 40, 54, 210);
    var panelWidth = min(700, width - 32);
    rect(width / 2, height / 2, panelWidth, 190, 12);
    fill(235, 245, 255);
    textFont(basicMainFont, 22);
    text("Recommended", width / 2, height / 2 - 63);
    textSize(15);
    text("Use this link for the best view:", width / 2, height / 2 - 29);
    var playLink = "https://www.khanacademy.org/computer-programming/pjs/6054169438175232?editor=no";
    textSize(13);
    if (textWidth(playLink) > panelWidth - 32) {
        playLink = "https://www.khanacademy.org/\ncomputer-programming/pjs/6054169438175232?editor=no";
        textSize(min(13, ((panelWidth - 32) * 13) / textWidth("computer-programming/pjs/6054169438175232?editor=no")));
    }
    text(playLink, width / 2, height / 2 + 8);
    fill(150, 205, 235);
    textSize(13);
    text("Click to continue", width / 2, height / 2 + 66);
    popStyle();
};
mousePressed = function () {
    if (editorTipVisible && gameStage === "Menu" && !runtimeFailed) {
        editorTipVisible = false;
        return;
    }
    if (gameStage === "Play" && !runtimeFailed && (typeof mouseButton === "undefined" || mouseButton !== RIGHT)) {
        if (pauseState.active) {
            handlePauseClick(mouseX, mouseY);
            return;
        }
        if (!stageTransition.active && overPauseButton(mouseX, mouseY)) {
            setGamePaused(true);
            return;
        }
    }
    if (pauseState.active || pauseState.blockMouseUntilRelease) {
        return;
    }
    if (creditsMusic.enabled && (gameStage === "Menu" || gameStage === "FullCredits")) {
        ensureCreditsAudio();
    }
    if (typeof mouseButton !== "undefined" && mouseButton === RIGHT && gameStage === "Play") {
        if (canUseGameInput() && currentGun && inventoryState.selected === 0) {
            rightHeld = true;
            gameInput.saberThrow = !!currentGun.isLightsaber;
        }
        return;
    }
    if (canUseGameInput()) {
        gameInput.mousePressed = true;
    } else if (gameStage !== "Play") {
        menuClickPending = true;
    }
};
mouseReleased = function () {
    if (mouseButtons === null) {
        rightHeld = false;
    } else if (leftHeld()) {
        return;
    }
    if (pauseState.active || pauseState.blockMouseUntilRelease) {
        pauseState.blockMouseUntilRelease = false;
        mouseClick = false;
        mouseRelease = null;
        clearGameInput();
        return;
    }
    if (gameStage === "Play") {
        gameInput.mouseReleased = true;
    }
};
var bindMouseButtons = function () {
    var canvas = typeof externals !== "undefined" && externals.context && externals.context.canvas;
    if (!canvas || !canvas.addEventListener) {
        return;
    }
    var track = function (event) {
        if (event.type === "contextmenu") {
            if (gameStage === "Play") {
                event.preventDefault();
            }
            return;
        }
        mouseButtons = event.type === "mouseleave" ? 0 : event.buttons;
        if ((mouseButtons & 2) === 0) {
            rightHeld = false;
        }
    };
    var events = ["mousedown", "mouseup", "mousemove", "mouseleave", "contextmenu"];
    for (var i = 0; i < events.length; i++) {
        if (canvas.battlefrontMouse) {
            canvas.removeEventListener(events[i], canvas.battlefrontMouse, true);
        }
        canvas.addEventListener(events[i], track, true);
    }
    canvas.battlefrontMouse = track;
};
bindMouseButtons();
keyPressed = function () {
    if (gameStage === "Menu" && gameDataPanel && keyCode === inputKeys.escape) {
        if (!keys[keyCode]) {
            closeGameDataPanel();
        }
        keys[keyCode] = true;
        return;
    }
    if (gameStage === "Menu" && currentMenu === "MenuAchievements" && achievementUI.selected >= 0 && keyCode === inputKeys.escape) {
        achievementUI.selected = -1;
        keys[keyCode] = true;
        return;
    }
    if (editorTipVisible && gameStage === "Menu" && !runtimeFailed) {
        if (keyCode === 13 || keyCode === 27) {
            editorTipVisible = false;
        }
        return;
    }
    if (creditsMusic.enabled && (gameStage === "Menu" || gameStage === "FullCredits")) {
        ensureCreditsAudio();
    }
    if (runtimeFailed) {
        if (keyCode === inputKeys.escape) {
            runtimeFailed = false;
            pauseState.active = false;
            pauseState.resuming = false;
            pauseState.frame = null;
            pauseState.blockMouseUntilRelease = false;
            tickClock.lastMs = null;
            tickClock.accumulatorMs = 0;
            clearGameInput();
            gameStage = "Menu";
            currentMenu = null;
            stageTransition.active = false;
            stageTransition.afterSwitch = null;
            squadCommandMode = false;
            mapFetch = false;
            mouseClick = null;
        }
        return;
    }
    if (gameStage === "Play" && !stageTransition.active && (keyCode === inputKeys.escape || keyCode === 80)) {
        if (!keys[keyCode]) {
            if (pauseState.resuming) {
                pauseState.resuming = false;
            } else if (pauseState.settings && keyCode === inputKeys.escape) {
                pauseState.settings = false;
                pauseState.saveStatus = "";
            } else if (pauseState.active) {
                beginGameResume();
            } else {
                setGamePaused(true);
            }
        }
        keys[keyCode] = true;
        return;
    }
    if (pauseState.active) {
        if (keyCode === 13) {
            beginGameResume();
        }
        keys[keyCode] = true;
        return;
    }
    if (!keys[keyCode] && canUseGameInput()) {
        gameInput.pressed[keyCode] = true;
    }
    if (keyCode === inputKeys.escape && (gameStage === "Play" || gameStage === "Shop" || gameStage === "FullCredits")) {
        if (gameStage === "FullCredits") {
            if (!stageTransition.active) {
                startStageTrans("Menu", function () {
                    fullCreditsFrame = 0;
                    creditsMusic.started = false;
                    currentMenu = null;
                    if (currentMap) {
                        resetMatchForHome();
                    }
                });
            }
            keys[keyCode] = true;
            return;
        }
        startStageTrans("Menu", function () {
            currentMenu = null;
            holoHeight = -25;
            if (currentMap) {
                resetMatchForHome();
            }
        });
    }
    keys[keyCode] = true;
};
keyReleased = function () {
    keys[keyCode] = false;
};

var testCan = createGraphics(150, 150, P2D);
testCan.background(255, 0);
testCan.fill(255, 0, 0);
testCan.ellipse(75, 75, 150, 150);
//Minimap canvas
var ensureMinimap = function () {
    if (!minimapView.canvas) {
        minimapView.canvas = createGraphics(150, 150, P2D);
    }
    return minimapView.canvas;
};
minimapView.drawMap = function () {
    var canvas = ensureMinimap();
    canvas.background(0);
    var size = minimapView.size;
    var x = 75 - size / 2 - (playerPos.x - currentMap.offsetX) * size / currentMap.width;
    var y = 75 - size / 2 - (playerPos.y - currentMap.offsetY) * size / currentMap.height;
    var minimap = minimapView.minimap;
    if (minimap.sourceImg) {
        canvas.externals.context.drawImage(minimap.sourceImg, x, y, size, size);
    } else {
        canvas.image(minimap, x, y, size, size);
    }
    canvas.noStroke();
    if (currentMap && currentMap.entities) {
        for (var blipZ = currentMap.killZ; blipZ < currentMap.topZ + 2; blipZ++) {
            var blipList = currentMap.entities[blipZ];
            if (!blipList) {
                continue;
            }
            for (var blipI = 0; blipI < blipList.length; blipI++) {
                var blipEnt = blipList[blipI];
                if (!blipEnt || !blipEnt.isMatchBot || !blipEnt.pos || blipEnt.health <= 0 || blipEnt.team === undefined) {
                    continue;
                }
                var blipX = 75 + ((blipEnt.pos.x - playerPos.x) * minimapView.size) / currentMap.width;
                var blipY = 75 + ((blipEnt.pos.y - playerPos.y) * minimapView.size) / currentMap.height;
                if (blipX < -5 || blipX > 155 || blipY < -5 || blipY > 155) {
                    continue;
                }
                if (blipEnt.team === playerTeam) {
                    if (blipEnt.inPlayerSquad) {
                        canvas.noFill();
                        canvas.stroke(85, 170, 255, 230);
                        canvas.strokeWeight(3);
                        canvas.ellipse(blipX, blipY, 13, 13);
                        canvas.noStroke();
                    }
                    canvas.fill(70, 155, 255, 235);
                } else {
                    canvas.fill(255, 55, 45, 235);
                }
                canvas.ellipse(blipX, blipY, 5, 5);
            }
        }
    }
    canvas.fill(80, 180, 255, 255);
    canvas.ellipse(75, 75, 6, 6);
    drawSupMinimap(canvas);
};
var drawMinimapImage = function (x, y, size, opacity) {
    var map = minimapView.canvas;
    var source = map.externals && map.externals.context;
    var ctx = typeof externals !== "undefined" && externals.context;
    if (source && source.canvas && ctx && ctx.drawImage) {
        ctx.save();
        ctx.globalAlpha *= opacity / 255;
        ctx.drawImage(source.canvas, round(x), round(y), size, size);
        ctx.restore();
    } else {
        tint(255, 255, 255, opacity);
        image(map, x, y, size, size);
        noTint();
    }
};
var getMatchAliveBots = function () {
    if (!currentMap) {
        return 0;
    }
    if (currentMap._aliveCountAtMs !== undefined && tickClock.gameMs < currentMap._aliveCountAtMs) {
        return currentMap._aliveBotCount;
    }
    var count = 0;
    for (var layer = currentMap.killZ; layer < currentMap.topZ + 2; layer++) {
        var list = currentMap.entities[layer] || [];
        for (var index = 0; index < list.length; index++) {
            if (list[index].isMatchBot && list[index].health > 0) {
                count++;
            }
        }
    }
    currentMap._aliveBotCount = count;
    currentMap._aliveCountAtMs = tickClock.gameMs + 100;
    return count;
};
var updateMinimapView = function () {
    ensureMinimap();
    if (stageTransition.active || !currentMap) {
        return;
    }
    var rebuild = !currentMap.minimap;
    if (rebuild) {
        currentMap.getMinimap();
    }
    if (rebuild || minimapView.minimap !== currentMap.minimap || tickClock.realMs >= (minimapView.nextUpdateMs || 0)) {
        minimapView.minimap = currentMap.minimap;
        minimapView.drawMap();
        minimapView.nextUpdateMs = tickClock.realMs + 100;
    }
};
var consumeGameActions = function () {
    if (!canUseGameInput()) {
        return;
    }
    handleInvInput();
    recordDuelInput();
    if (gameInput.saberThrow && currentGun.isLightsaber) {
        currentGun.tryThrow();
    }
    if ((inventoryState.selected === 0 || (getHeldItem() && getHeldItem().isFist)) && gameInput.pressed[inputKeys.dash]) {
        if (!(dashBill && dashBill.spinHits)) {
            var spin = skin === "Darth Maul" && heldDuelSaber();
            if (triggerJediDash(null, true) && spin) {
                dashBill.spinHits = [];
                endDuel();
            }
        }
    }
    if (inventoryState.selected === 0 && gameInput.pressed[inputKeys.reload] && currentGun.tryReload) {
        currentGun.tryReload();
    }
};
var canGripTarget = function (target) {
    if (!target.pos || target.health <= 0 || target.exploding || dist(playerPos.x, playerPos.y, target.pos.x, target.pos.y) > forceGripSettings.range * forceProfile(skin).range) {
        return false;
    }
    if (target instanceof Detonator) {
        return true;
    }
    if (target.forceMass) {
        return !target.destroyed;
    }
    if (!(target instanceof AIPlayer) || target.team === playerTeam || hasSpawnGrace(target)) {
        return false;
    }
    if (isJediActor(target, false)) {
        return skin === "Darth Vader" && tickClock.gameMs >= (target.forceGripImmuneUntil || 0);
    }
    return true;
};
var updateTelekinesis = function () {
    if (!canUseGameInput() || !playerHasForce() || playerHealth <= 0 || !canAttack() || squadCommandMode || inventoryState.uiConsumed || inSaberDuel(null) || currentGun.throwState) {
        forceGrip = null;
        return;
    }
    var held = keys[inputKeys.telekinesis];
    var now = tickClock.gameMs;
    var profile = forceProfile(skin);
    var startCost = forceGripSettings.startCost / profile.control;
    var cost = forceGripSettings.holdCost * tickClock.scale / profile.control;
    if (!forceGrip && (!held || !gameInput.pressed[inputKeys.telekinesis] || now < forceGripReadyAt || playerForce < startCost + cost)) {
        return;
    }
    if (!forceGrip && currentMap.toggleDoorAt(mouseX, mouseY)) {
        playerForce -= startCost;
        forceGripReadyAt = now + forceGripSettings.cooldownMs;
        forceDoorUntil = forceGripReadyAt;
        return;
    }
    var aim = screenToWorld(mouseX, mouseY);
    if (!forceGrip) {
        var playerLayer = floor(playerPos.z);
        var list = [];
        var props = currentMap.objectsTemp;
        for (var i = 0; i < props.length; i++) {
            if (props[i].forceMass && !props[i].destroyed) {
                list.push(props[i]);
            }
        }
        list = list.concat(currentMap.placedCrates || []);
        for (var layer = playerLayer - 4; layer <= playerLayer + 4; layer++) {
            var entities = currentMap.entities[layer] || [];
            for (var e = 0; e < entities.length; e++) {
                if (entities[e] instanceof Detonator || entities[e] instanceof AIPlayer) {
                    list.push(entities[e]);
                }
            }
        }
        var best = null;
        var bestDistance = 99999;
        for (var i = 0; i < list.length; i++) {
            var candidate = list[i];
            var radius = candidate.forceAimRadius || gripTargetRadius(candidate);
            var screen = worldToScreen(candidate.pos.x, candidate.pos.y, candidate.pos.z);
            var pointerDistance = dist(mouseX, mouseY, screen.x, screen.y) / max(0.001, zoom);
            if (pointerDistance < bestDistance && pointerDistance <= radius + forceGripSettings.aimPad && abs(candidate.pos.z - playerPos.z) <= 4 && canGripTarget(candidate)) {
                best = candidate;
                bestDistance = pointerDistance;
            }
        }
        if (!best) {
            return;
        }
        var resistingJedi = best instanceof AIPlayer && isJediActor(best, false);
        var grabCost = startCost * (resistingJedi ? 2.5 : 1);
        if (playerForce < grabCost + cost) {
            return;
        }
        playerForce -= grabCost;
        if (best.forceMass) {
            best.forceHome = best.forceHome || {
                x: best.x,
                y: best.y,
                rotation: best.rotation
            };
            best.forceMotion = best.forceMotion || {
                x: 0,
                y: 0,
                z: 0,
                turn: 0,
                moved: false
            };
            best.forceMotion.hits = null;
        } else {
            best.forceThrowUntil = 0;
        }
        forceGrip = {
            target: best,
            map: currentMap,
            spinSeed: random(360)
        };
        if (resistingJedi) {
            var defender = forceProfile(best.skin);
            forceGrip.resistance = 7 + defender.strength * 3;
            forceGrip.escapeAt = now + constrain(1700 / defender.control + (profile.strength - defender.strength) * 250, 900, 2200);
        }
        if (skin === "Darth Maul" && best instanceof AIPlayer) {
            forceGrip.chokeUntil = now + 850;
            forceGrip.x = best.pos.x;
            forceGrip.y = best.pos.y;
        }
    }
    var target = forceGrip.target;
    var mass = target.forceMass;
    var strength = forceGripSettings.strength * profile.strength;
    var resistance = forceGrip.resistance || 1;
    var response = strength / ((mass || 1) * resistance);
    if (forceGrip.escapeAt) {
        cost *= 3;
        strength /= resistance;
        if (now >= forceGrip.escapeAt) {
            target.forceGripImmuneUntil = now + 2200;
            target.forceThrowUntil = 0;
            target.vel.x *= 0.3;
            target.vel.y *= 0.3;
            target.vel.z = min(0, target.vel.z);
            forceGrip = null;
            forceGripReadyAt = now + 1200;
            return;
        }
    }
    var velocity = mass ? target.forceMotion : target.vel;
    var valid = forceGrip.map === currentMap && canGripTarget(target);
    var choke = forceGrip.chokeUntil;
    var release = !held || (choke && now >= choke);
    var dx = aim.x - playerPos.x;
    var dy = aim.y - playerPos.y;
    var reach = sqrt(dx * dx + dy * dy);
    var angle = reach > 2 ? atan2(dy, dx) : bodyAngle - 90;
    var clearance = hitboxSize + gripTargetRadius(target);
    if (release || !valid || playerForce < cost) {
        forceGrip = null;
        forceGripReadyAt = now + (choke ? 1800 : forceGripSettings.cooldownMs);
        if (release && valid) {
            var push = forceGripSettings.throwSpeed * response * (choke ? 1.65 : 1);
            velocity.x += cos(angle) * push;
            velocity.y += sin(angle) * push;
            protectForcePath(target, velocity, 0);
            if (mass) {
                velocity.hits = [];
            } else {
                velocity.z += 0.08 * strength;
                target.forceThrowUntil = now + forceGripSettings.throwMs;
                if (target instanceof Detonator) {
                    target.owner = {
                        isPlayer: true,
                        team: playerTeam
                    };
                }
            }
            if (choke) {
                damageByPlayer(target, 18, playerTeam);
            }
            screenShake = max(screenShake, 1.6);
        }
        return;
    }
    playerForce -= cost;
    forceGrip.height = min(playerPos.z + (choke ? 0.75 : 0.45), currentMap.topZ + 1);
    reach = constrain(reach, clearance + 12, forceGripSettings.range * profile.range - 30);
    var pullX = (choke ? forceGrip.x : playerPos.x + cos(angle) * reach) - target.pos.x;
    var pullY = (choke ? forceGrip.y : playerPos.y + sin(angle) * reach) - target.pos.y;
    var tick = tickClock.scale;
    var drag = pow(0.48, tick);
    velocity.x = velocity.x * drag + pullX * 0.16 * tick * response;
    velocity.y = velocity.y * drag + pullY * 0.16 * tick * response;
    var turn = (6 * sin(now * 0.19 + forceGrip.spinSeed) + 4 * sin(now * 0.073 + forceGrip.spinSeed * 2)) / profile.control;
    if (mass) {
        velocity.turn = lerp(velocity.turn, turn * response, 1 - pow(0.8, tick));
    } else {
        velocity.z = velocity.z * drag + ((forceGrip.height - target.pos.z) * 0.18 * strength + 0.005) * tick;
        if (target instanceof Detonator) {
            target.rVel = turn * strength;
        } else if (!choke) {
            target.bodyAngle = (target.bodyAngle + turn * tick * strength) % 360;
        }
    }
};
var prepRenderClock = function (now) {
    if (pauseState.active) {
        tickClock.lastMs = now;
        tickClock.renderDeltaMs = 0;
        tickClock.renderScale = 0;
        tickClock.accumulatorMs = 0;
        return;
    }
    var elapsed = tickClock.lastMs === null ? 0 : max(0, now - tickClock.lastMs);
    tickClock.lastMs = now;
    if (gameStage !== "Play") {
        fpsSample.startedAt = null;
    } else if (fpsSample.startedAt === null) {
        fpsSample.startedAt = now;
        fpsSample.frames = 0;
        fpsSample.value = null;
    } else {
        fpsSample.frames++;
        var sampleMs = now - fpsSample.startedAt;
        if (sampleMs >= 500) {
            fpsSample.value = round(fpsSample.frames * 1000 / sampleMs);
            fpsSample.startedAt = now;
            fpsSample.frames = 0;
        }
    }
    if (elapsed > tickClock.maxGapMs) {
        elapsed = 0;
        tickClock.accumulatorMs = 0;
        forceGrip = null;
        clearGameInput();
        keys = {
        };
        keys[inputKeys.sprint] = false;
    }
    tickClock.renderDeltaMs = elapsed;
    tickClock.renderScale = elapsed / tickClock.baseMs;
    tickClock.realMs += elapsed;
    tickClock.accumulatorMs += elapsed;
};
var updateGameTick = function () {
    playerRenderPrevX = playerPos.x;
    playerRenderPrevY = playerPos.y;
    syncPlayerWeapon();
    if (gameStage !== "Play" || !currentMap) {
        return;
    }
    prepMap(currentMap);
    if (!currentGun) {
        currentGun = new Lightsaber({
        });
    }
    var playSkinName = ("" + skin).toLowerCase();
    if (playSkinName.indexOf("rebel") >= 0 || playSkinName.indexOf("clone") >= 0 || playSkinName === "luke skywalker" || playSkinName === "yoda" || playSkinName === "ahsoka tano") {
        playerTeam = 0;
    } else {
        playerTeam = 1;
    }
    if (matchState.gameMode === "Sniper Duel") {
        playerTeam = 99;
    }
    if (matchState.phase === "countdown" && !stageTransition.active) {
        playerVel.mult(0);
        if (currentMap._matchPlayerSpawn) {
            playerPos.x = currentMap._matchPlayerSpawn.x;
            playerPos.y = currentMap._matchPlayerSpawn.y;
            playerPos.z = currentMap._matchPlayerSpawn.z;
        }
        if (!matchState.countdownStarted) {
            matchState.countdownStarted = true;
            matchState.countdownFrame = 0;
        } else {
            matchState.countdownFrame += tickClock.scale;
            if (matchState.countdownFrame >= matchState.countdownStepFrames * 4) {
                matchState.phase = "live";
                beginSpawnGrace();
                matchState.countdownFrame = 0;
            }
        }
    }
    if (matchState.phase === "ending" && !stageTransition.active) {
        matchState.endingFrame += tickClock.scale;
        if (matchState.endingFrame >= matchState.endingHoldFrames) {
            startStageTrans("Menu", function () {
                resetMatchForHome();
            });
        }
    }
    var gameplayLive = gameStage === "Play" && matchState.phase === "live" && !stageTransition.active;
    var playerPhysActive = gameplayLive && !deathScreenActive;
    if (matchState.gameMode === "Battle Royale") {
        getMatchAliveBots();
    }
    if (!gameplayLive || deathScreenActive || !keys[inputKeys.unstick]) {
        stuckHoldCount = 0;
        if (!keys[inputKeys.unstick]) {
            stuckHoldLock = false;
        }
    }
    if (gameplayLive) {
        updateForceMeter();
    }
    //Handle Keyboard Inputs
    updatePlayerAim();
    consumeGameActions();
    updateTelekinesis();
    if (canUseGameInput()) {
        var moveAcceleration = getPlayerMoveAccel(isPlayerSprinting(), !!getHeldItem());
        if (skin === "Ahsoka Tano" && currentGun.isLightsaber && currentGun.dualPose && isPlayerSprinting() && inventoryState.selected === 0) {
            moveAcceleration *= 1 + currentGun.dualPose.run * 0.2;
        }
        if (keys[inputKeys.up] || keys[inputKeys.arrowUp]) {
            //Up / W
            playerVel.y -= moveAcceleration * tickClock.scale;
        }
        if (keys[inputKeys.down] || keys[inputKeys.arrowDown]) {
            //Down / S
            playerVel.y += moveAcceleration * tickClock.scale;
        }
        if (keys[inputKeys.left] || keys[inputKeys.arrowLeft]) {
            //Left / A
            playerVel.x -= moveAcceleration * tickClock.scale;
        }
        if (keys[inputKeys.right] || keys[inputKeys.arrowRight]) {
            //Right / D
            playerVel.x += moveAcceleration * tickClock.scale;
        }
    }
    if (gameplayLive) {
        //Change Velocity and Position, Handle Collisions
        currentMap.update();
        if (!deathScreenActive) {
            updatePlayerStats();
        }
        if (matchState.gameMode === "Sniper Duel" && matchState.phase === "live") {
            var survivors = playerHealth > 0 ? 1 : 0;
            var lastTeam = playerHealth > 0 ? playerTeam : -2;
            for (var sniperLayer = currentMap.killZ; sniperLayer < currentMap.topZ + 2; sniperLayer++) {
                var sniperList = currentMap.entities[sniperLayer] || [];
                for (var sniperIndex = 0; sniperIndex < sniperList.length; sniperIndex++) {
                    var sniperActor = sniperList[sniperIndex];
                    if (sniperActor.isMatchBot && sniperActor.health > 0) {
                        survivors++;
                        lastTeam = sniperActor.team;
                    }
                }
            }
            matchState.snipersAlive = survivors;
            if (survivors <= 1) {
                matchState.phase = "ending";
                matchState.winnerTeam = lastTeam;
                matchState.endingFrame = 0;
            }
        }
        if (matchState.gameMode === "Battle Royale" && matchState.phase === "live") {
            if (playerHealth <= 0) {
                matchState.phase = "ending";
                matchState.winnerTeam = -2;
                matchState.endingFrame = 0;
                settleCreditDisplay();
            } else {
                var liveBattleBots = getMatchAliveBots();
                if (liveBattleBots <= 0) {
                    matchState.phase = "ending";
                    matchState.winnerTeam = playerTeam;
                    matchState.endingFrame = 0;
                    if (!matchState.creditsAwarded) {
                        matchState.lastCreditAward = floor(random(120, 181)) * 5 + matchState.playerKills * floor(random(10, 18)) * 5;
                        addCreditChange(matchState.lastCreditAward);
                        matchState.creditsAwarded = true;
                    }
                    settleCreditDisplay();
                }
            }
        }
        if (matchState.gameMode === "Team Deathmatch" && gameStage === "Play" && matchState.phase === "live" && !stageTransition.active && !deathScreenActive) {
            if (matchState.teamScores[0] >= matchState.scoreLimit) {
                matchState.phase = "ending";
                matchState.winnerTeam = 0;
                matchState.endingFrame = 0;
            } else if (matchState.teamScores[1] >= matchState.scoreLimit) {
                matchState.phase = "ending";
                matchState.winnerTeam = 1;
                matchState.endingFrame = 0;
            }
        }
    }
    gameplayLive = gameStage === "Play" && matchState.phase === "live" && !stageTransition.active;
    playerPhysActive = gameplayLive && !deathScreenActive;
    if (playerPhysActive) {
        var oldX = playerPos.x;
        var oldY = playerPos.y;
        var oldZ = playerPos.z;
        playerVel.z -= 0.005 * tickClock.scale;
        playerVel.x *= pow(movementSettings.drag, tickClock.scale);
        playerVel.y *= pow(movementSettings.drag, tickClock.scale);
        if (collideMode === "unstable") {
            currentMap.playerCollide();
            playerPos.x += playerVel.x * tickClock.scale;
            playerPos.y += playerVel.y * tickClock.scale;
            var landed = moveEntityZ(playerPos, playerVel, hitboxSize, 0, tickClock.scale);
            softCharCollide(null, true);
            currentMap.playerCollide();
            playerFloorHit = landed;
        } else {
            var playerMotionScale = tickClock.scale;
            var playerMaxComp = max(max(abs(playerVel.x), abs(playerVel.y)), abs(playerVel.z)) * playerMotionScale;
            var playerSteps = max(1, ceil(playerMaxComp / 6));
            var playerStepScale = playerMotionScale / playerSteps;
            var priorPStep = playerVel._stepScale;
            var hitPlayerFloor = false;
            for (var playerStep = 0; playerStep < playerSteps; playerStep++) {
                playerVel._stepScale = playerStepScale;
                currentMap.playerCollide();
                if (playerVel.x !== 0) {
                    playerPos.x += playerVel.x * playerStepScale;
                    currentMap.playerCollide();
                }
                if (playerVel.y !== 0) {
                    playerPos.y += playerVel.y * playerStepScale;
                    currentMap.playerCollide();
                }
                if (playerVel.z !== 0) {
                    hitPlayerFloor = moveEntityZ(playerPos, playerVel, hitboxSize, 0, playerStepScale) || hitPlayerFloor;
                }
                softCharCollide(null, true);
                currentMap.playerCollide();
            }
            playerFloorHit = hitPlayerFloor;
            if (priorPStep === undefined) {
                playerVel._stepScale = 1;
            } else {
                playerVel._stepScale = priorPStep;
            }
            if (abs(playerVel.x) < 0.001) {
                playerVel.x = 0;
            }
            if (abs(playerVel.y) < 0.001) {
                playerVel.y = 0;
            }
            if (abs(playerVel.z) < 0.001) {
                playerVel.z = 0;
            }
            var playerCeiling = currentMap.topZ + flyCeilExtra;
            var pCeilSoftStart = playerCeiling - flyCeilSoft;
            if (playerPos.z > pCeilSoftStart && playerVel.z > 0) {
                playerVel.z *= 1 - constrain((playerPos.z - pCeilSoftStart) / max(0.0001, flyCeilSoft), 0, 1) * 0.82;
            }
            if (playerPos.z > playerCeiling) {
                playerPos.z = playerCeiling + (playerPos.z - playerCeiling) * 0.22;
                if (playerVel.z > 0) {
                    playerVel.z *= 0.18;
                }
                playerVel.z = min(playerVel.z, 0.012);
            }
            if (playerPos.z > playerCeiling + flyCeilBuffer) {
                playerPos.z = playerCeiling + flyCeilBuffer;
                playerVel.z = min(playerVel.z, 0);
            }
        }
        var rampZ = playerVel.z <= 0 ? rampLanding(playerPos, oldX, oldY, oldZ, playerFloorHit) : null;
        if (rampZ !== null) {
            playerPos.z = rampZ;
            playerVel.z = 0;
            playerFloorHit = true;
        }
        tryPlayerJump();
    }
    if (gameplayLive && !deathScreenActive) {
        billDash();
    }
    if (gameplayLive) {
        updateSupremacy();
    }
    //Some zChangers are handled here, others are parts of GameObjs
    if (gameplayLive) {
        for (var i = 0; i < currentMap.zChangers.length; i++) {
            currentMap.zChangers[i].update();
        }
    }
    //Kill the player if they are below killZ
    if (gameplayLive && !deathScreenActive && playerPos.z < currentMap.killZ) {
        playerDie();
    }
    updatePlayerAim();
    if (gameplayLive && !deathScreenActive) {
        getSelectedCharData();
        if (keys[inputKeys.unstick] && !stuckHoldLock) {
            stuckHoldCount = min(stuckHoldFrames, stuckHoldCount + tickClock.scale);
            if (stuckHoldCount >= stuckHoldFrames) {
                stuckHoldLock = true;
                if (solidAt(playerPos.x, playerPos.y, playerPos.z, hitboxSize * 0.84)) {
                    playerVel.mult(0);
                    var stuckRespawnCount = playerDeaths;
                    startStageTrans("Play", function () {
                        playerDie(true);
                        playerDeaths = stuckRespawnCount;
                    });
                }
                stuckHoldCount = 0;
            }
        }
        var activeCharData = characterData[character];
        if (!inventoryState.uiConsumed && matchState.gameMode !== "Battle Royale" && handleSquadClick()) {
            inventoryState.uiConsumed = true;
        }
        if ((inventoryState.uiConsumed || squadCommandMode || inventoryState.selected !== 0 || !canUseGameInput()) && currentGun && currentGun.tick) {
            currentGun.tick();
        } else {
            currentGun.update();
        }
        updateSaberThrows();
        if (currentGun && currentGun.isLightsaber && inventoryState.selected === 0) {
            currentGun.sampleHeldTrail(playerPos, getHandAngle(null), skin);
        }
        for (var heldIndex = 0; heldIndex < activeCharData.abilities.length; heldIndex++) {
            activeCharData.abilities[heldIndex].update();
        }
        if (jetpackEquipped && activeCharData.equipment) {
            activeCharData.equipment.update();
        }
    }
    screenShake *= pow(0.9, tickClock.scale);
    for (var popupIndex = creditPopups.length - 1; popupIndex >= 0; popupIndex--) {
        creditPopups[popupIndex].life -= tickClock.scale;
        if (creditPopups[popupIndex].life <= 0) {
            creditPopups.splice(popupIndex, 1);
        }
    }
    if (deathScreenActive && !stageTransition.active) {
        deathScreenFrame += tickClock.wallStepMs / tickClock.baseMs;
        if (matchState.gameMode !== "Sniper Duel" && deathScreenFrame >= deathRespawnAt && !deathTransStarted) {
            deathTransStarted = true;
            startStageTrans("Play", function () {
                playerDie(true);
            });
        }
    }
};
var advanceGameTicks = function () {
    if (pauseState.active) {
        tickClock.accumulatorMs = 0;
        return;
    }
    var renderClick = mouseClick;
    var renderRelease = mouseRelease;
    var start = millis();
    aiScansLeft = -1;
    aiJumpChecksLeft = 2;
    tickClock.stepsThisFrame = 0;
    while (tickClock.accumulatorMs + 0.000001 >= tickClock.stepMs && tickClock.stepsThisFrame < tickClock.maxSteps) {
        tickClock.accumulatorMs = max(0, tickClock.accumulatorMs - tickClock.stepMs);
        tickClock.wallStepMs = tickClock.stepMs;
        var timeScale = gameStage === "Play" && squadCommandMode ? 0.1 : 1;
        var combatScale = duelTimeScale();
        if (gameStage === "Play" && matchState.phase === "live" && !stageTransition.active && dangerSense > 0) {
            combatScale = min(combatScale, forceSettings.dangerSenseSlowMoScale);
            dangerSense = max(0, dangerSense - tickClock.wallStepMs / tickClock.baseMs);
        } else if (gameStage !== "Play" || matchState.phase !== "live") {
            dangerSense = 0;
        }
        timeScale *= combatScale;
        tickClock.deltaMs = tickClock.stepMs * timeScale;
        tickClock.scale = tickClock.deltaMs / tickClock.baseMs;
        tickClock.gameMs += tickClock.deltaMs;
        tickClock.tick++;
        tickClock.stepsThisFrame++;
        mouseClick = gameInput.mousePressed;
        mouseRelease = gameInput.mouseReleased;
        updateGameTick();
        clearGameInput();
        if (millis() - start >= tickClock.updateBudgetMs) {
            break;
        }
    }
    if (tickClock.accumulatorMs >= tickClock.stepMs) {
        tickClock.accumulatorMs %= tickClock.stepMs;
    }
    if (gameStage === "Play" && currentMap) {
        runPerceptionJobs(currentMap);
    }
    aiScansLeft = -1;
    mouseClick = renderClick;
    mouseRelease = renderRelease;
};
var drawRuntimeError = function () {
    resetMatrix();
    noTint();
    rectMode(CORNER);
    background(0);
    fill(255, 120, 120);
    textFont(basicMainFont, 13);
    textAlign(LEFT, TOP);
    text("Runtime error — press Escape to return to the menu", 12, 12, width - 24, 42);
    text(runtimeErrMsg, 12, 64, width - 24, height - 76);
};
var gameSaveKey = "battlefront.profile.v1";
var oldAchievementKey = "battlefront.achievements.v1";
var captureGameData = function () {
    var savedGun = sniperDuelLoadout ? sniperDuelLoadout.gun : currentGun;
    return {
        version: 1,
        credits: playerCredits,
        stats: achievementStats,
        skins: shopState.owned,
        weapons: shopState.weaponsOwned,
        cosmetics: shopState.cosmeticsOwned,
        skin: skin,
        character: sniperDuelLoadout ? sniperDuelLoadout.character : character,
        weapon: savedGun.isLightsaber ? "lightsaber" : savedGun.weaponId,
        cosmetic: equippedCosmetic,
        jetpack: jetpackEquipped,
        speed: playerSpeed,
        maxHealth: playerMaxHealth,
        music: creditsMusic.enabled,
        lowDetail: lowDetailMode,
        aimAssist: gameSettings.aimAssist,
        firingMode: gameSettings.firingMode,
        bloodSplatter: bloodSplatterEnabled,
        planet: planetList[planetNum],
        mode: matchGameModes[matchModeIndex]
    };
};
var defaultGameData = JSON.stringify(captureGameData());
var restoreOwnedItems = function (owned, defaults, catalog, key) {
    for (var i = 0; owned && i < catalog.length; i++) {
        var id = catalog[i][key];
        if (owned[id] === true) {
            defaults[id] = true;
        }
    }
    return defaults;
};
var applyGameData = function (saved) {
    sniperDuelLoadout = null;
    var defaults = JSON.parse(defaultGameData);
    loadAchievementStats(saved.stats);
    playerCredits = typeof saved.credits === "number" && isFinite(saved.credits) ? saved.credits : defaults.credits;
    shopState.owned = restoreOwnedItems(saved.skins, defaults.skins, shopCatalog, "skin");
    shopState.weaponsOwned = restoreOwnedItems(saved.weapons, defaults.weapons, shopWeapons, "id");
    shopState.cosmeticsOwned = restoreOwnedItems(saved.cosmetics, defaults.cosmetics, shopCosmetics, "id");
    character = characterData.hasOwnProperty(saved.character) ? saved.character : defaults.character;
    skin = skinImageNames.hasOwnProperty(saved.skin) ? saved.skin : defaults.skin;
    equippedCosmetic = saved.cosmetic === "headset" && shopState.cosmeticsOwned.headset ? "headset" : defaults.cosmetic;
    jetpackEquipped = saved.jetpack === true && !!shopState.cosmeticsOwned.jetpack;
    playerSpeed = typeof saved.speed === "number" && isFinite(saved.speed) && saved.speed > 0 ? saved.speed : defaults.speed;
    playerMaxHealth = typeof saved.maxHealth === "number" && isFinite(saved.maxHealth) && saved.maxHealth > 0 ? saved.maxHealth : defaults.maxHealth;
    playerHealth = playerMaxHealth;
    resetPlayerShield();
    var available = shopWeaponList();
    currentGun = character === "Jedi" ? new Lightsaber({
    }) : F_11D;
    for (var i = 0; i < available.length; i++) {
        var weapon = available[i];
        if (weapon.id === saved.weapon && (weapon.basePrice === 0 || shopState.weaponsOwned[weapon.id])) {
            currentGun = weapon.gun.isLightsaber ? new Lightsaber({
            }) : weapon.gun;
            break;
        }
    }
    syncPlayerWeapon();
    inventoryState.selected = 0;
    inventoryState.lastWeapon = null;
    creditsMusic.enabled = typeof saved.music === "boolean" ? saved.music : defaults.music;
    lowDetailMode = typeof saved.lowDetail === "boolean" ? saved.lowDetail : defaults.lowDetail;
    gameSettings.aimAssist = saved.aimAssist === 1 || saved.aimAssist === 2 ? saved.aimAssist : defaults.aimAssist;
    gameSettings.firingMode = saved.firingMode === 1 || saved.firingMode === 2 ? saved.firingMode : defaults.firingMode;
    bloodSplatterEnabled = saved.bloodSplatter === true;
    planetNum = max(0, planetList.indexOf(saved.planet));
    matchModeIndex = max(0, matchGameModes.indexOf(saved.mode));
    settleCreditDisplay();
};
saveGameData = function () {
    gameSaveDirty = true;
    gameSaveSoon = false;
    gameSaveAt = tickClock.realMs;
    if (!gameSaveStorage) {
        return false;
    }
    try {
        if (gameSaveStorage.getItem(gameSaveKey) !== gameSaveSnapshot) {
            gameSaveDirty = false;
            gameSaveError = "Save changed in another tab. Reload to continue saving.";
            return false;
        }
        var snapshot = JSON.stringify(captureGameData());
        gameSaveStorage.setItem(gameSaveKey, snapshot);
        gameSaveSnapshot = snapshot;
        gameSaveDirty = false;
        gameSaveError = "";
        return true;
    } catch (error) {
        gameSaveError = "The browser could not save your progress.";
        return false;
    }
};
var parseGameData = function (raw) {
    try {
        return JSON.parse(raw || "null");
    } catch (error) {
        return null;
    }
};
var loadGameData = function () {
    try {
        if (typeof localStorage === "undefined") {
            return;
        }
        gameSaveStorage = localStorage;
        gameSaveSnapshot = gameSaveStorage.getItem(gameSaveKey);
        var saved = parseGameData(gameSaveSnapshot);
        if (saved && saved.version === 1) {
            applyGameData(saved);
            return;
        }
        var legacy = parseGameData(gameSaveStorage.getItem(oldAchievementKey));
        if (legacy && legacy.stats) {
            loadAchievementStats(legacy.stats);
            saveGameData();
        }
    } catch (error) {
        gameSaveStorage = null;
    }
};
clearGameData = function () {
    if (!gameSaveStorage) {
        gameSaveError = "Browser storage is unavailable. The save was not cleared.";
        return false;
    }
    try {
        gameSaveStorage.removeItem(oldAchievementKey);
        gameSaveStorage.removeItem(gameSaveKey);
    } catch (error) {
        gameSaveError = "The browser could not clear your save.";
        return false;
    }
    if (currentMap) {
        resetMatchForHome();
    }
    stopCreditsMusic();
    applyGameData(JSON.parse(defaultGameData));
    shopState.tab = 0;
    shopState.selected = 0;
    shopState.cosmeticSelected = 0;
    shopState.weaponSelected = 0;
    shopState.scroll = [0, 0, 0];
    shopState.scrollTarget = [0, 0, 0];
    shopState.message = "";
    gameSaveDirty = false;
    gameSaveSoon = false;
    gameSaveError = "";
    gameSaveSnapshot = null;
    gameSaveAt = tickClock.realMs;
    return true;
};
loadGameData();
var kaLimitSet = false;
draw = function () {
    if (!kaLimitSet && gameStage === "Play") {
        var key = "KAInfiniteLoopSetTimeout";
        var setLimit = this && this[key];
        if (typeof setLimit === "function") {
            setLimit(1000);
        }
        kaLimitSet = true;
    }
    if (runtimeFailed) {
        drawRuntimeError();
        return;
    }
    try {
        if (pauseState.active) {
            fpsSample.startedAt = null;
            drawPauseMenu();
            return;
        }
        if (!leftHeld()) {
            pauseState.blockMouseUntilRelease = false;
        }
        prepRenderClock(millis());
        if (editorTipVisible && gameStage === "Menu") {
            drawEditorTip();
            return;
        }
        var creditDiff = playerCredits - creditDisplay.value;
        var creditStep = 0;
        if (abs(creditDiff) > 0.01) {
            var creditMaxStep = max(0.4, abs(creditDiff) * 0.12) * tickClock.renderScale;
            creditStep = constrain(creditDiff, -creditMaxStep, creditMaxStep);
            creditDisplay.value += creditStep;
        } else {
            creditDisplay.value = playerCredits;
        }
        creditDisplay.speed = lerp(creditDisplay.speed, creditStep, uiEase(0.25));
        //Handle clicks
        if (mouseClick) {
            mouseClick = null;
        }
        if (mouseRelease) {
            mouseRelease = null;
        }
        var pressed = gameStage === "Play" ? leftHeld() : mouseIsPressed;
        if (pressed) {
            if (mouseClick === false) {
                mouseClick = true;
                mouseRelease = false;
                if (canUseGameInput()) {
                    gameInput.mousePressed = true;
                }
            }
        }
        if (!pressed) {
            if (mouseRelease === false) {
                mouseRelease = true;
                mouseClick = false;
            }
        }
        if (menuClickPending) {
            mouseClick = true;
            menuClickPending = false;
        }
        advanceGameTicks();
        tickAchievements();
        //Load Images
        if (gameStage === "ImageLoad") {
            advanceAssetLoad();
            loadScreen();
            text(round(assetLoad.done / assetLoad.total * 100) + "%", width / 2, height / 2 + 200);
            if (assetLoad.done === assetLoad.total) {
                gameStage = "Menu";
            }
        } else if (gameStage === "Menu") {
            dragAchievements();
            if (mouseIsPressed) {
                menuRotVel += (pmouseX - mouseX) * menuDragPower;
            }
            if (currentMenu !== "MenuAchievements") {
                if (!achievementUI.dragging) {
                    achievementUI.down = false;
                    achievementUI.velocity = 0;
                }
                achievementUI.selected = -1;
                achievementUI.expansion = 0;
            }
            menu();
        } else if (gameStage === "FullCredits") {
            drawFullCredits();
        } else if (gameStage === "Shop") {
            drawShop();
        }
        //Game Level
        else {
            if (!currentMap) {
                currentMap = getSelectedMap();
                if (!currentMap) {
                    gameStage = "Menu";
                    return;
                }
            }
            textFont(matchFont, 20);
            prepMap(currentMap);
            if (!currentGun) {
                currentGun = new Lightsaber({
                });
            }
            var gameplayLive = gameStage === "Play" && matchState.phase === "live" && !stageTransition.active;
            updateCamera(gameplayLive);
            updatePlayerAim();
            updateMinimapView();
            pushMatrix();
            //Render the game map
            currentMap.render();
            popMatrix();
            drawDamageRim();
            if (gameplayLive && inventoryState.selected === 0) {
                var playerScreen = worldToScreen(playerPos.x, playerPos.y);
                crosshair(mouseX, mouseY, playerScreen.x, playerScreen.y, atan2(mouseY - playerScreen.y, mouseX - playerScreen.x), "spread", currentGun.accuracy);
            }
            if (gameplayLive) {
                drawForceMeter();
            }
            //This program was created by ✝ 𝕮𝕲𝕏𝕷𝕮𝕵 ✝. If the project you see was not created by them or spun off from the original, it has been stolen
            drawCombatHUD();
            //Render UI
            pushMatrix();
            translate(width - 616, height - 660);
            //Player Health
            var chunks = 10;
            var filledChunks = ceil(playerHealth / (playerMaxHealth / chunks));
            //background
            fill(0, 40);
            noStroke();
            pushMatrix();
            translate(344, 496 - 25);
            quad(0, 20, 20, 0, 253, 0, 233, 20);
            popMatrix();
            //draw chunks
            for (var i = 0; i < chunks; i++) {
                if (i < filledChunks) {
                    fill(255, i * 10, 0, 165); //filled
                } else {
                    noFill(); //empty
                }
                pushMatrix();
                translate(356 + i * 22, 500 - 25);
                scale(0.6);
                quad(0, 20, 20, 0, 50, 0, 30, 20);
                popMatrix();
            }
            //Player Shield
            var filledChunks2 = ceil(playerShield / (playerMaxShield / chunks));
            //background
            fill(0, 40);
            noStroke();
            pushMatrix();
            translate(344, 496);
            quad(0, 20, 20, 0, 253, 0, 233, 20);
            popMatrix();
            //draw chunks
            for (var i = 0; i < chunks; i++) {
                if (i < filledChunks2) {
                    fill(130 + i * 3, 130 + i * 3, 255, 165); //filled
                } else {
                    noFill(); //empty
                }
                pushMatrix();
                translate(356 + i * 22, 500);
                scale(0.6);
                quad(0, 20, 20, 0, 50, 0, 30, 20);
                popMatrix();
            }
            popMatrix();
            pushMatrix();
            translate(width - 600, height - 650);
            //draw weapon stuff
            fill(!currentGun.isLightsaber && currentGun.shots >= currentGun.shotsAllowed ? 100 : 0, 0, 0, 70);
            strokeWeight(1);
            rectMode(CENTER);
            stroke(255, 255, 255, 100);
            rect(hudLayout.weaponX, hudLayout.weaponY, 215, 90, 5);
            line(375, 597, 565, 597);
            noStroke();
            fill(255, 5);
            quad(470 - 215 / 2, 580, 470 - 215 / 2, 555, 490, 575 + 45, 445, 575 + 45);
            rectMode(0);
            var hudWeaponSprite = currentGun.spriteId === "lightsaber" ? skin === "Kylo Ren" ? "Kylo Ren Lightsaber" : "Lightsaber" : currentGun.spriteId;
            if (hudWeaponSprite === "Sniper") {
                pushMatrix();
                translate(414, 573);
                scale(0.35);
                sniperSprite(0, 0, 100);
                popMatrix();
            } else if (hudWeaponSprite === "Lightsaber" && skin === "Ahsoka Tano") {
                lightsaber(408, 573, 56, 66, skin, true, 0.8);
                lightsaber(438, 573, 44, 246, skin, true, 0.8);
            } else if (hudWeaponSprite === "Lightsaber" && skin === "Darth Maul") {
                lightsaber(418, 573, 64, 66, skin, true, 0.8);
            } else if (hudWeaponSprite === "Lightsaber" && skin === "Darth Vader") {
                drawVaderSaber(418, 573, 90);
            } else if (hudWeaponSprite === "Lightsaber") {
                lightsaber(418, 567, 0.32, 90, skin, true);
            } else {
                weaponSprite(425, currentGun.isLightsaber ? 645 : 573, 80, currentGun.isLightsaber ? -90 : 0, hudWeaponSprite, !currentGun.isLightsaber && currentGun.shots >= currentGun.shotsAllowed ? color(255, 0, 0, 85) : color(255, 80), !currentGun.isLightsaber && currentGun.shots >= currentGun.shotsAllowed ? color(255, 0, 0) : color(255));
            }
            fill(!currentGun.isLightsaber && currentGun.shots >= currentGun.shotsAllowed ? color(255, 0, 0) : color(255));
            textSize(13);
            textAlign(LEFT, CENTER);
            text(inventoryState.selected === 0 ? currentGun.isLightsaber && skin === "Ahsoka Tano" ? "DUAL SABERS" : currentGun.isLightsaber && skin === "Darth Maul" ? "SABERSTAFF" : currentGun.displayName.toUpperCase() : "", 492, 550);
            var weaponStatus = !currentGun.isLightsaber ? currentGun.shotsAllowed - currentGun.shots + "  /  " + currentGun.shotsAllowed : currentGun.throwState ? "IN FLIGHT" : tickClock.gameMs < (currentGun.throwReadyAt || 0) ? "THROW " + ceil((currentGun.throwReadyAt - tickClock.gameMs) / 1000) + "s" : currentGun.on ? skin === "Ahsoka Tano" ? "LMB ATTACK" : "RMB THROW" : "LMB IGNITE";
            if (currentGun.isLightsaber && saberStyle(skin).dual) {
                var heldCount = (heldSaberSide(currentGun, 1) ? 1 : 0) + (heldSaberSide(currentGun, -1) ? 1 : 0);
                weaponStatus = currentGun.on ? heldCount ? heldCount + " HELD / RMB THROW" : "BOTH IN FLIGHT" : "LMB IGNITE";
            }
            textSize(currentGun.isLightsaber ? 12 : 20);
            if (currentGun.isLightsaber) {
                textSize(12 * min(1, 72 / max(1, textWidth(weaponStatus))));
            }
            text(weaponStatus, 492, 570);
            textSize(8);
            fill(!currentGun.isLightsaber && currentGun.shots >= currentGun.shotsAllowed ? color(255, 0, 0, 100) : color(255, 100));
            popMatrix();
            //Shots left
            fill(255, 255, 255);
            if (!currentGun.isLightsaber && currentGun.shots >= currentGun.shotsAllowed) {
                fill(255, 0, 0);
            }
            drawMatchCounters();
            if (gameplayLive && stuckHoldCount > 0 && !deathScreenActive) {
                rectMode(CENTER);
                noStroke();
                fill(18, 22, 30, 220);
                rect(width / 2, 43, 170, 30, 5);
                fill(255, 235, 170, 230);
                textAlign(CENTER, CENTER);
                textSize(13);
                text("UNSTICK IN " + round((stuckHoldFrames - stuckHoldCount) / 6) / 10, width / 2, 43);
            }
            var tdmX = 16;
            var tdmY = 50;
            var tdmW = 190;
            var tdmH = 15;
            if (matchState.gameMode === "Sniper Duel") {
                rectMode(CORNER);
                noStroke();
                fill(32, 38, 48, 120);
                rect(tdmX, tdmY + 14, tdmW, 26, 3);
                fill(255, 245, 180, 220);
                textAlign(LEFT, CENTER);
                textSize(13);
                text("SNIPERS LEFT " + (matchState.snipersAlive || 0) + " / 8", tdmX + 9, tdmY + 27);
            } else if (matchState.gameMode === "Battle Royale") {
                var aliveBots = currentMap._aliveBotCount || 0;
                rectMode(CORNER);
                noStroke();
                fill(32, 38, 48, 70);
                rect(tdmX, tdmY + 14, tdmW, 26, 3);
                fill(255, 245, 180, 220);
                textAlign(LEFT, CENTER);
                textSize(13);
                text("ALIVE " + (aliveBots + (playerHealth > 0 ? 1 : 0)) + " / 24", tdmX + 9, tdmY + 27);
            } else {
                drawSquadButton();
                var myTdmScore = matchState.teamScores[playerTeam] || 0;
                var enemyTeam = playerTeam === 0 ? 1 : 0;
                var enemyTdmScore = matchState.teamScores[enemyTeam] || 0;
                rectMode(CORNER);
                noStroke();
                fill(0, 0, 0, 135);
                fill(255, 245, 180, 220);
                textAlign(LEFT, TOP);
                textSize(11);
                fill(32, 38, 48, 70);
                rect(tdmX, tdmY + 14, tdmW, tdmH, 3);
                rect(tdmX, tdmY + 30, tdmW, tdmH, 3);
                fill(55, 155, 255, 230);
                rect(tdmX, tdmY + 14, tdmW * constrain(myTdmScore / matchState.scoreLimit, 0, 1), tdmH, 3);
                fill(255, 70, 70, 225);
                rect(tdmX, tdmY + 30, tdmW * constrain(enemyTdmScore / matchState.scoreLimit, 0, 1), tdmH, 3);
                textAlign(RIGHT, CENTER);
                textSize(10);
                fill(185, 225, 255);
                text(myTdmScore, tdmX + tdmW - 5, tdmY + 20);
                fill(255, 175, 175);
                text(enemyTdmScore, tdmX + tdmW - 5, tdmY + 37);
            }
            //Minimap
            noFill();
            stroke(0, 100);
            strokeWeight(5);
            rectMode(CENTER);
            rect(95, height - 95, 155, 155, 5);
            hudLayout.minimapY = height - 170;
            drawMinimapImage(hudLayout.minimapX, hudLayout.minimapY, hudLayout.minimapSize, mouseX <= 180 && mouseY >= height - 180 ? 100 : 165);
            pushStyle();

            drawUiText((fpsSample.value === null ? "--" : fpsSample.value) + " FPS", hudLayout.minimapX, hudLayout.minimapY - 12, 12, "left", "middle", color(225, 248, 255), color(0, 210), 3);
            popStyle();
            getSelectedCharData();
            var hudCharacterData = characterData[character];
            drawInventoryHUD(hudCharacterData);
            drawSupHUD();
            drawDuelHUD();
            if (deathScreenActive) {
                var deathProgress = constrain(deathScreenFrame / deathRespawnAt, 0, 1);
                rectMode(CENTER);
                noStroke();
                fill(0, 0, 0, 95 + deathProgress * 90);
                rect(width / 2, height / 2, width + 40, height + 40);
                textAlign(CENTER, CENTER);
                stroke(0, 190);
                strokeWeight(7);
                fill(255, 105, 90, 235);
                textSize(62);
                text("DEAD", width / 2, height / 2 - 18);
                noStroke();
                fill(255, 230, 180, 210);
                textSize(21);
                text(matchState.gameMode === "Sniper Duel" ? "ELIMINATED" : "RESPAWNING", width / 2, height / 2 + 43);
            }
            fill(255, 255, 255);
            for (var creditPopupI = creditPopups.length - 1; creditPopupI >= 0; creditPopupI--) {
                var popup = creditPopups[creditPopupI];
                var popupProgress = 1 - popup.life / popup.maxLife;
                var popupScreen = worldToScreen(popup.x, popup.y);
                var popupX = popupScreen.x;
                var popupY = popupScreen.y - popupProgress * 45;
                var popupAlpha = 255 * (1 - popupProgress);
                textAlign(CENTER, CENTER);
                textSize(22 + sin(popupProgress * 180) * 8);
                stroke(0, popupAlpha * 0.7);
                strokeWeight(5);
                if (popup.amount > 0) {
                    fill(120, 255, 150, popupAlpha);
                    text("+₹" + popup.amount, popupX, popupY);
                } else {
                    fill(255, 95, 95, popupAlpha);
                    text("-₹" + abs(popup.amount), popupX, popupY);
                }
                noStroke();
            }
            if (matchState.phase === "countdown" && matchState.countdownStarted && !stageTransition.active) {
                var countStep = matchState.countdownStepFrames;
                var countLabel = "GO";
                if (matchState.countdownFrame < countStep) {
                    countLabel = "3";
                } else if (matchState.countdownFrame < countStep * 2) {
                    countLabel = "2";
                } else if (matchState.countdownFrame < countStep * 3) {
                    countLabel = "1";
                }
                var countFrame = matchState.countdownFrame % matchState.countdownStepFrames;
                var countProgress = countFrame / matchState.countdownStepFrames;
                countProgress = constrain(countProgress, 0, 1);
                var countCenterY = height / 2 - 18;
                var countY = countProgress < 0.5 ? lerp(-120, countCenterY, 1 - pow(1 - countProgress / 0.5, 3)) : lerp(countCenterY, height + 140, pow((countProgress - 0.5) / 0.5, 3));
                textAlign(CENTER, CENTER);
                textSize(30);
                stroke(0, 170);
                strokeWeight(5);
                fill(255, 245, 180, 225);
                drawUiText(("" + matchState.gameMode).toUpperCase(), width / 2, countY - 108, 30, "center", "middle", color(255, 245, 180, 225), color(0, 170), 5);
                textSize(126);
                stroke(0, 180);
                strokeWeight(8);
                fill(255, 245, 180, 235);
                pushMatrix();
                translate(width / 2, countY);
                rotate(countY - countCenterY);
                drawUiText(countLabel, 0, 0, 126, "center", "middle", color(255, 245, 180, 235), color(0, 180), 8);
                popMatrix();
                noStroke();
            }
            if (matchState.phase === "ending") {
                var winnerLabel = matchState.winnerTeam === -1 ? "DRAW" : matchState.winnerTeam === playerTeam ? "YOU WIN" : "YOU LOSE";
                if (matchState.gameMode === "Battle Royale" && matchState.winnerTeam !== playerTeam) {
                    winnerLabel = "ELIMINATED";
                }
                var winnerProgress = matchState.endingFrame / matchState.endingHoldFrames;
                winnerProgress = constrain(winnerProgress, 0, 1);
                var winnerCenterY = height / 2 - 18;
                var winnerY = winnerProgress < 0.5 ? lerp(-120, winnerCenterY, 1 - pow(1 - winnerProgress / 0.5, 3)) : lerp(winnerCenterY, height + 140, pow((winnerProgress - 0.5) / 0.5, 3));
                textAlign(CENTER, CENTER);
                textSize(72);
                stroke(0, 180);
                strokeWeight(8);
                fill(255, 245, 180, 230);
                drawUiText(winnerLabel, width / 2, winnerY, 72, "center", "middle", color(255, 245, 180, 230), color(0, 180), 8);
                noStroke();
                if (matchState.lastCreditAward > 0) {
                    textSize(24);
                    fill(255, 230, 130, 220);
                    drawUiText("+₹ " + matchState.lastCreditAward, width / 2, winnerY + 70, 24, "center", "middle", color(255, 230, 130, 220));
                }
            }
        }
        if (gameStage === "Play" && !stageTransition.active) {
            drawPauseButton();
        }
        drawStageTrans();
        if (!stageTransition.active && (gameStage === "Play" || gameStage === "Menu")) {
            drawNotice();
        }
    } catch (e) {
        runtimeErrMsg = String(e) + (e && e.stack ? "\n" + e.stack : "");
        runtimeFailed = true;
        tickClock.accumulatorMs = 0;
        clearGameInput();
        keys = {
        };
        keys[inputKeys.sprint] = false;
        stopCreditsMusic(true);
        drawRuntimeError();
    }
};
/**End Code**/

window.BattlefrontV3Callbacks = {
    draw: draw,
    mousePressed: mousePressed,
    mouseReleased: mouseReleased,
    mouseScrolled: typeof mouseScrolled === 'function' ? mouseScrolled : null,
    keyPressed: keyPressed,
    keyReleased: keyReleased
};
