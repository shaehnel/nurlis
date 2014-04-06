var requestAnimFrame = (function(){
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();


var game = new Game(400, 300);

var init = function () {
    game.createCanvas();
    game.gameObjects.push(new GameObject(100,100));
    mainLoop();
}

var mainLoop = function () {
    game.update();
    requestAnimFrame(mainLoop);
}

window.onload = init;
window.onmousemove = function(event) {
    event = event || window.event; // IE-ism
    game.handleMouseMove(event);
}

document.getElementById('add-nurli').addEventListener('click', function() {
    var x = Math.random() * (game.width - config.nurliSize * 2) + config.nurliSize; 
    var y = Math.random() * (game.height - config.nurliSize * 2) + config.nurliSize; 
    game.gameObjects.push(new GameObject(x, y));
    console.log(game.gameObjects.length);
});

document.getElementById('remove-nurli').addEventListener('click', function() {
    game.gameObjects.pop();
});