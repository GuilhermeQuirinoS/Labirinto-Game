var canvas = document.getElementById("myGame");
var ctx = canvas.getContext("2d");
var Zoom = 30;
var tecla = 0;
var fim = {
    x : 55,
    y: 250,
    width: 400,
    height: 60,
    color: "yellow",
};
var player = {
    x: 35,
    y: 35,
    width: 20,
    height: 20,
    color: "red",
};
var walls = []
var maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [-1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];

for(var row in maze) {
    for (var column in maze[row]) {
        var title = maze[row][column];
        if (title === 1) {
            var wall = {
                x: Zoom*column,
                y: Zoom*row,
                width: Zoom,
                height: Zoom,
            };
            walls.push(wall);
        }
    }
}
function blockParede(obj1, obj2){
    var dX = (obj1.x + obj1.width/2) - (obj2.x + obj2.width/2);
    var dY = (obj1.y + obj1.height/2) - (obj2.y + obj2.height/2);

    var somaW = (obj1.width + obj2.width)/2;
    var somaH = (obj1.height + obj2.height)/2;

    if(Math.abs(dX) < somaW && Math.abs(dY) < somaH){
        var sobreposicaoX = somaW - Math.abs(dX);
        var sobreposicaoY = somaH - Math.abs(dY);

        if(sobreposicaoX > sobreposicaoY){
            obj1.y = dY > 0 ? obj1.y + sobreposicaoY : obj1.y - sobreposicaoY;
        }
        else {
            obj1.x = dX > 0 ? obj1.x + sobreposicaoX : obj1.x - sobreposicaoX;
        }
    }
}
function Labirinto() {
    ctx.clearRect(0,0, canvas.width, canvas.height)
    ctx.save();
    for(var row in maze){
        for(var column in maze[row]){
            var title = maze[row][column];
            if(title === 1){
                let x = Zoom*column
                let y = Zoom*row
                ctx.beginPath();
                ctx.fillStyle = "black";
                ctx.fillRect(x, y, Zoom, Zoom);
            }
            else if(title === -1){
                let x = Zoom*column
                let y = Zoom*row
                ctx.beginPath();
                ctx.fillStyle = "green";
                ctx.fillRect(x, y, Zoom, Zoom);
            }
        }
    }
}
function Player(){
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}
document.addEventListener("keydown", function (event){
    tecla = event.keyCode
});

function mensagem() {
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Parabéns, você concluiu o desafio!", 100, 285);
}

function notificacao() {
    ctx.fillStyle = fim.color;
    ctx.fillRect(fim.x,fim.y, fim.width, fim.height);
    mensagem();
}

function movimento() {
    if (tecla === 39) {
        player.x += 3
    } else if (tecla === 37) {
        player.x -= 3
    } else if (tecla === 40) {
        player.y += 3
    } else if (tecla === 38) {
        player.y -= 3
    }
    for (var i in walls) {
        var wall = walls[i]
        blockParede(player, wall);
    }
    if (player.x < 0){
        notificacao();
    } else if (player.x > canvas.width){
        notificacao();
    } else if (player.y < 0){
        notificacao();
    } else if (player.y > canvas.height){
        notificacao();
    }

}


////////////////////////////////////////////////////////////////////////////////////
/* Foram mudados : player, maze, Labirinto(), Player(), mensagem(), notificacao(), movimento(), desenho(), JOGO()*/


var player2 = {
    x: 35,
    y: 35,
    width: 20,
    height: 20,
    color: "blue",
};
var walls2 = []
var maze2 = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, -1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];

for(var row2 in maze2) {
    for (var column2 in maze2[row2]) {
        var title = maze2[row2][column2];
        if (title === 1) {
            var wall = {
                x: Zoom*column2,
                y: Zoom*row2,
                width: Zoom,
                height: Zoom,
            };
            walls2.push(wall);
        }
    }
}

function Labirinto2() {
    ctx.clearRect(0,0, canvas.width, canvas.height)
    ctx.save();
    for(var row in maze2){
        for(var column in maze2[row]){
            var title = maze2[row][column];
            if(title === 1){
                let x = Zoom*column
                let y = Zoom*row
                ctx.beginPath();
                ctx.fillStyle = "black";
                ctx.fillRect(x, y, Zoom, Zoom);
            }
            else if(title === -1){
                let x = Zoom*column
                let y = Zoom*row
                ctx.beginPath();
                ctx.fillStyle = "green";
                ctx.fillRect(x, y, Zoom, Zoom);
            }
        }
    }
}
function Player2(){
    ctx.fillStyle = player2.color;
    ctx.fillRect(player2.x, player2.y, player2.width, player2.height);
}
document.addEventListener("keydown", function (event){
    tecla = event.keyCode
});

function movimento2() {
    if (tecla === 39) {
        player2.x += 3
    } else if (tecla === 37) {
        player2.x -= 3
    } else if (tecla === 40) {
        player2.y += 3
    } else if (tecla === 38) {
        player2.y -= 3
    }
    for (var i in walls2) {
        var wall = walls2[i]
        blockParede(player2, wall);
    }
    if (player2.x < 0){
        notificacao();
    } else if (player2.x > canvas.width){
        notificacao();
    } else if (player2.y < 0){
        notificacao();
    } else if (player2.y > canvas.height){
        notificacao();
    }

}

///////////////////////////////////////////////////////////////////////////////////////////////////////

var player3 = {
    x: 470,
    y: 340,
    width: 20,
    height: 20,
    color: "purple",
};
var walls3 = []
var maze3 = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [-1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];

for(var row3 in maze3) {
    for (var column3 in maze3[row3]) {
        var title = maze3[row3][column3];
        if (title === 1) {
            var wall = {
                x: Zoom*column3,
                y: Zoom*row3,
                width: Zoom,
                height: Zoom,
            };
            walls3.push(wall);
        }
    }
}

function Labirinto3() {
    ctx.clearRect(0,0, canvas.width, canvas.height)
    ctx.save();
    for(var row in maze3){
        for(var column in maze3[row]){
            var title = maze3[row][column];
            if(title === 1){
                let x = Zoom*column
                let y = Zoom*row
                ctx.beginPath();
                ctx.fillStyle = "black";
                ctx.fillRect(x, y, Zoom, Zoom);
            }
            else if(title === -1){
                let x = Zoom*column
                let y = Zoom*row
                ctx.beginPath();
                ctx.fillStyle = "green";
                ctx.fillRect(x, y, Zoom, Zoom);
            }
        }
    }
}
function Player3(){
    ctx.fillStyle = player3.color;
    ctx.fillRect(player3.x, player3.y, player3.width, player3.height);
}
document.addEventListener("keydown", function (event){
    tecla = event.keyCode
});

function movimento3() {
    if (tecla === 39) {
        player3.x += 3
    } else if (tecla === 37) {
        player3.x -= 3
    } else if (tecla === 40) {
        player3.y += 3
    } else if (tecla === 38) {
        player3.y -= 3
    }
    for (var i in walls3) {
        var wall = walls3[i]
        blockParede(player3, wall);
    }
    if (player3.x < 0){
        notificacao();
    } else if (player3.x > canvas.width){
        notificacao();
    } else if (player3.y < 0){
        notificacao();
    } else if (player3.y > canvas.height){
        notificacao();
    }

}

const fase1 = document.getElementById('botao1')
fase1.onclick = () => {
    JOGO();
}

const fase2 = document.getElementById('botao2')
fase2.onclick = () => {
    JOGO2();
}

const fase3 = document.getElementById('botao3')
fase3.onclick = () => {
    JOGO3();
}

const reiniciar = document.getElementById('reiniciar')
reiniciar.onclick = () => {
    location.href = "JOGO.html";
}


function desenho(){
    Labirinto(maze);
    Player();
    movimento();
}

function desenho2(){
    Labirinto2(maze2);
    Player2();
    movimento2();
}

function desenho3(){
    Labirinto3(maze3);
    Player3();
    movimento3();
}

function JOGO(){
    ctx.clearRect(510,600,canvas.width,canvas.height);
    desenho();
    requestAnimationFrame(JOGO);
}

function JOGO2(){
    ctx.clearRect(510,600,canvas.width,canvas.height);
    desenho2();
    requestAnimationFrame(JOGO2);
}

function JOGO3(){
    ctx.clearRect(510,600,canvas.width,canvas.height);
    desenho3();
    requestAnimationFrame(JOGO3);
}