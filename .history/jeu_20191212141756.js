'use strict'

// Switch des div lors du click sur Start

var boutonStart =  window.document.getElementById('boutonstart');
var fenetreDeJeu = window.document.getElementById('fenetre');
var fenetreStatut = window.document.getElementById('statut');
var fenetreRegles = window.document.getElementById('regles');
var restart = window.document.getElementById('restart');

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
    this.hauteur ='67px';
    this.largeur = '50px';
    this.src = 'fantome-face.png';
    this.position = 'absolute';
    this.x = 0; //propriété pour le mouvement
    this.y = 0; //propriété pour le mouvement

    this.initialisationFantome = function(){
        var imageFantome = new Image(); //possibilité de mettre ca dans la fonction constructeur
        imageFantome.src = this.src;
        imageFantome.style.height = this.hauteur; 
        imageFantome.style.width = this.largeur;
        imageFantome.style.position = this.position;
        imageFantome.style.left=this.x+"px";
        imageFantome.style.top=this.y+"px";
        fenetreDeJeu.appendChild(imageFantome);
    }
 }   

 var fantome = new FabriqueDeFantome();
 fantome.initialisationFantome();

//  var imageFantome = new Image(); //possibilité de mettre ca dans la fonction constructeur
//  imageFantome.src = fantome.src;
//  imageFantome.height = fantome.hauteur; 
//  imageFantome.width = fantome.largeur;
//  imageFantome.position = fantome.position;
//  document.body.appendChild(imageFantome); // comment la mettre dans la div FenetreDeJeu
//  fenetreDeJeu.appendChild(imageFantome); Erreur indiqué dans la console

//var creationimage = document.createElement(img);
// creationimage.src = imageFantome.src
// fenetreDeJeu.appenChild(creationimage)


//Mouvement du personnage

window.addEventListener("load", function(){
    var container = window.document.getElementById('container');
    container.style.position="absolute";
    container.style.height="160px";
    container.style.width="73px";
    container.style.overflow="hidden";
    container.style.left= "560px";
    container.style.top="450px";  
    
    var imageDetective = window.document.getElementById('img1');
    imageDetective.style.position="absolute";
    imageDetective.style.width="333px";
    

    var imagePositionX = parseInt(container.style.left);
    var imagePositionY= parseInt(container.style.top);
    this.console.log(imagePositionY);
    var imagedivx=0;
    var imagedivy=0;

    // imageObelix.style.left= 0;
    // imageObelix.style.top=0;
    
    // Projectile contre les fantomes

    var attrapeballe = window.document.getElementById('balle');
    attrapeballe.style.position = "absolute";
    attrapeballe.style.height = "20px";
    attrapeballe.style.left = (parseInt(container.style.left) + parseInt(container.style.width) /2) +"px";
    attrapeballe.style.top = (parseInt(container.style.top) + parseInt(container.style.height) /2) +"px";
    








    window.onkeydown = function(event){
        var code= event.keyCode;
        
        switch(code){
            case 37 : 
            // if(parseInt(imagePositionX) <= 0){
            //     imagePositionX = 10;
            // }
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
        }
    }






})