'use strict'

// Switch des div lors du click sur Start

var boutonStart =  window.document.getElementById('boutonstart');
var fenetreDeJeu = window.document.getElementById('fenetre');
var fenetreStatut = window.document.getElementById('statut');
var fenetreRegles = window.document.getElementById('regles');
var restart = window.document.getElementById('restart');
var container = window.document.getElementById('container');
var imageDetective = window.document.getElementById('img1');

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
};

function getRandomIntInterval(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

fenetreDeJeu.style.display = 'none';
fenetreStatut.style.display = 'none';

boutonStart.addEventListener("click",function(){
    if(fenetreDeJeu.style.display == 'none'){
        boutonStart.style.display = 'none';
        fenetreDeJeu.style.display = "";
        fenetreStatut.style.display = "";
        fenetreRegles.style.display = "none";
    }
})


//ReStart
restart.addEventListener("click",function(){
    document.location.reload();
})



// Fonction Constructeur pour génerer les fantomes
 var FabriqueDeFantome = function(){
     
    this.fantome = new Image();
    this.fantome.style.height = "121px";
    this.fantome.style.width = "90px";
    this.fantome.style.opacity ="0.7";
    this.fantome.style.position = "absolute";
    this.fantome.style.left = getRandomInt(800)+"px";
    this.fantome.style.top = getRandomInt(500)+"px";
    this.fantome.src = 'fantome-face.png';

    this.directions = [-1, 1][getRandomInt(2)]
    this.direction = getRandomIntInterval(1, 5);
    this.limit = 1100;
    this.limit2 = 650;

    this.animation = function(){
    if (parseInt(this.fantome.style.left) <= this.limit){

        this.fantome.style.left = (parseInt(this.fantome.style.left)+ this.direction)+"px";
        
    }else{
        this.limit = -100;
        if(parseInt(this.fantome.style.left)>=this.limit){
        this.fantome.style.left = (parseInt(this.fantome.style.left)+ this.direction*-1)+"px";
        }
        if(parseInt(this.fantome.style.left)<=0){
        this.limit=1100;
        }
    }
    if (parseInt(this.fantome.style.top) <= this.limit2){

        this.fantome.style.top = (parseInt(this.fantome.style.top)+ this.direction)+"px";
        
    }else{
        this.limit2 = -100;
        if(parseInt(this.fantome.style.top)<=0){
        this.limit2=650;
        }
        if(parseInt(this.fantome.style.top)>=this.limit2){
        this.fantome.style.top = (parseInt(this.fantome.style.top)+ this.direction*-1)+"px";
        }
        
    }
    
    
    
    requestAnimationFrame(this.animation);
    }.bind(this)

    fenetreDeJeu.appendChild(this.fantome);
    requestAnimationFrame(this.animation);
    return this;
}

//  var fantome = new FabriqueDeFantome;
//  console.log("-------------------------")
//  console.log(fantome)
//  console.log("-------------------------")

//  fantome.animation();
 

//  Apparition de fantomes
 var creationFantome= function(){ 
    let i = 1
    let interval = setInterval(function(){
    if(i<=10){
            new FabriqueDeFantome()
            i++ 
        } else {
            clearInterval(interval)
        }
    }, 5000);
}
creationFantome();

// Fonction constructeur Attrape Fantome
var FabriqueDeBalle = function(){
     
    this.balle = new Image();
    this.balle.style.height = "20px";
    this.balle.style.width = "20px";
    this.balle.style.position = "absolute";
    this.balle.style.left =(parseInt(container.style.left) + parseInt(container.style.width) /2) +"px";
    this.balle.style.top = (parseInt(container.style.top) + parseInt(container.style.height) /2) +"px";
    this.balle.src = 'attrapeFantome.png';
    this.balle.style.display="block";
    
    fenetreDeJeu.appendChild(this.balle);
    return this.balle;
 }  



//Mouvement du personnage

window.addEventListener("load", function(){
    
    container.style.position="absolute";
    container.style.height="160px";
    container.style.width="73px";
    container.style.overflow="hidden";
    container.style.left= "560px";
    container.style.top="450px";  
    
   
    imageDetective.style.position="absolute";
    imageDetective.style.width="333px";
    

    var imagePositionX = parseInt(container.style.left);
    var imagePositionY= parseInt(container.style.top);
    var imagedivx=0;
    var imagedivy=0;


    
    // Projectile contre les fantomes

    // var attrapeballe = window.document.getElementById('balle');
    // attrapeballe.style.position = "absolute";
    // attrapeballe.style.height = "20px";
    // attrapeballe.style.left = (parseInt(container.style.left) + parseInt(container.style.width) /2) +"px";
    // attrapeballe.style.top = (parseInt(container.style.top) + parseInt(container.style.height) /2) +"px";
    // attrapeballe.style.display = 'none';








    window.onkeydown = function(event){
        var code= event.keyCode;
        
        switch(code){
            case 37 : 
            // if(parseInt(imagePositionX) <= 0){
            //     imagePositionX = 10;
            // }
            // arrow left
            imagePositionX -= 10;
            container.style.left = imagePositionX + "px";
            // console.log(imagePositionX);
             imagedivx -= 88;
            imageDetective.style.left=imagedivx+"px";
            imagedivy = -538;
            imageDetective.style.top = imagedivy+"px";
            if(imagedivx <= -254){
                imagedivx = 88;
            }
            
            break;

            case 38 : 
            // if(parseInt(imagePositionY)<=0){
            //     imagePositionY = 10;
            // }
            imagePositionY -= 10;
            container.style.top= imagePositionY + "px";
            // console.log(imagePositionX);
            imagedivx -= 88;
            imageDetective.style.left=imagedivx+"px";
            imagedivy = -176;
            imageDetective.style.top = imagedivy+"px";
            if(imagedivx <= -261){
                imagedivx = 0;
            }
            break;

            case 39 : 
            // if(parseInt(imagePositionX)>=1000){
            //     imagePositionX = 990;
            // }
            imagePositionX += 10;
            container.style.left= imagePositionX +"px";
            // console.log(imagePositionY);
            imagedivx -= 88;
            imageDetective.style.left=imagedivx+"px";
            imagedivy = -358;
            imageDetective.style.top = imagedivy+"px";
            if(imagedivx <= -254){
                imagedivx = 88;
            }
            break;

            case 40: 
            // if(parseInt(imagePositionY)>=650){
            //     imagePositionY=640;
            // }
            imagePositionY +=10;
            container.style.top= imagePositionY +"px";
            // console.log(imagePositionY);
            imagedivx -= 88;
            imageDetective.style.left=imagedivx+"px";
            imagedivy = 0;
            imageDetective.style.top = imagedivy+"px";
            if(imagedivx <= -261){
                imagedivx = 0;
            }
            break;

            case 32: 
            var balle = new FabriqueDeBalle();


            break;
            
        }
    }






})