
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake [0]={
    x: 8 * box,
    y: 8 * box
};


let direcao = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y:Math.floor(Math.random() * 15 + 1) * box
};

function criarBG() {
    context.fillStyle = '#58d12c';
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function corCobra(){
    var hexadecimais = '0123456789ABCDEF' ;
    var cor = '#';
  
    // Pega um número aleatório no array acima
    for (var i = 0; i < 6; i++ ) {
    //E concatena à variável cor
        cor += hexadecimais[Math.floor(Math.random() * 3)];
    }
    return cor;
}

function criarCobra(){
    for(i=0; i<snake.length; i++){
        context.fillStyle = corCobra();
        context.fillRect(snake[i].x,snake[i].y,box,box)
    }
}

function gera_cor(){
    var hexadecimais = '0123456789ABCDEF';
    var cor = '#';
  
    // Pega um número aleatório no array acima
    for (var i = 0; i < 6; i++ ) {
    //E concatena à variável cor
        cor += hexadecimais[Math.floor(Math.random() * 15)];
    }
    return cor;
}
function drawFood(){
    context.fillStyle = gera_cor();
    context.fillRect(food.x, food.y, box, box)
       
}

document.addEventListener("keydown", update) //eventos que "escuta" as teclas clicadas

function update(event){ //impede que a cbora ande p tras e faz com que a cobra tenha moviemntos
    if(event.keyCode == 37 && direcao != "right") direcao = "left";
    if(event.keyCode == 38 && direcao != "down") direcao = "up";
    if(event.keyCode == 39 && direcao != "left") direcao = "right";
    if(event.keyCode == 40 && direcao != "up") direcao = "down";

}

function iniciarJogo(){
    if(snake[0].x > 15 * box && direcao == "right") snake[0].x = 0;
    if(snake[0].x < 0  && direcao == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direcao == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direcao == "up") snake[0].y = 16 * box;


    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
          clearInterval(jogo);       
          document.getElementById("msg").innerHTML = "Você perdeu!"
         // alert('Você perdeu!')
        } 
        
      }

    criarBG();
    criarCobra();
    drawFood();

    let posicaoX = snake[0].x;
    let posicaoY = snake[0].y;

    if(direcao == "right") posicaoX += box;// add um 'box', faz a cobra andar...
    if(direcao == "left") posicaoX -= box;
    if(direcao == "up") posicaoY -= box;
    if(direcao == "down") posicaoY += box;
   

    if (posicaoX != food.x || posicaoY != food.y) {
        snake.pop();
       
      }
      else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
      }
      
    let newHead = {
        x:posicaoX,
        y:posicaoY
       
    }
   
    snake.unshift(newHead);
   
   /* for (var count = 0; count < newHead.length; count++){
        document.getElementById("pontos").innerHTML = newHead
    } tentei pegar o quantidade de vezes que a cobra come e mostrar na tela em 'pontos' mas sem sucesso...
     */

}



let reset = document.querySelector('button')
    reset.addEventListener('click', ()=>{
      location.reload()
    })

let jogo = setInterval(iniciarJogo,100);