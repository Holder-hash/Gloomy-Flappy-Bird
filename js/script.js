var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

var bird = new Image();
var bg = new Image();
var fg = new Image();
var topTube = new Image();
var downTube = new Image();

bird.src = 'sprites/bird.png';
bg.src = 'sprites/flappy_bird_bg.png';
fg.src = 'sprites/flappy_bird_fg.png';
topTube.src = 'sprites/flappy_bird_pipeUp.png';
downTube.src = 'sprites/flappy_bird_pipeBottom.png';

var gap = 90;

document.addEventListener("click", () => {
    yPos -= 25;
});

var pipe = [];

pipe[0] = {
    x : canvas.width,
    y : 0
}

var score = 0;

var xPos = 10;
var yPos = 150;
var grav = 1.5;

function game() {
    ctx.drawImage(bg, 0, 0);

    for(var i = 0; i < pipe.length; i++) {
        ctx.drawImage(topTube, pipe[i].x, pipe[i].y);
        ctx.drawImage(downTube, pipe[i].x, pipe[i].y + topTube.height + gap);
       
        pipe[i].x--;
       
        if(pipe[i].x == 90) {
        pipe.push({
        x : canvas.width,
        y : Math.floor(Math.random() * topTube.height) - topTube.height
        });
        }
       
        if(xPos + bird.width >= pipe[i].x
        && xPos <= pipe[i].x + topTube.width
        && (yPos <= pipe[i].y + topTube.height
        || yPos + bird.height >= pipe[i].y + topTube.height + gap) || yPos + bird.height >= canvas.height - fg.height) {
        // location.reload();
            ctx.fillRect(0,0,50,50)
            document.addEventListener('click', (e) => {
                if (e.clientX >= 0 && e.clientX <= 50 && e.clientY >= 0 && e.clientY <= 50)
                alert()
            })
        }
       
        if(pipe[i].x == 5) {
        score++;
        }
        }
       
        ctx.drawImage(fg, 0, canvas.height - fg.height);
        ctx.drawImage(bird, xPos, yPos);
       
        yPos += grav;
       
        ctx.fillStyle = "#000";
        ctx.font = "10px Verdana";
        ctx.fillText("Счет: " + score, 10, 15);
    
    requestAnimationFrame(game)
}

game();