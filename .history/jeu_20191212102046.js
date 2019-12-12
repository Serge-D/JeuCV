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
    this.hauteur = '60px';
    this.largeur = '100px';
    this.src = 'fantome-face.png';
    this.position = 'absolute';
    this.x = 0; //propriété pour le mouvement
    this.y = 0; //propriété pour le mouvement
 }   

 var fantome = new FabriqueDeFantome();

 var imageFantome = new Image(); //possibilité de mettre ca dans la fonction constructeur
 imageFantome.src = fantome.src;
 imageFantome.height = fantome.hauteur; 
 imageFantome.width = fantome.largeur;
 imageFantome.position = fantome.position;
//  document.body.appendChild(imageFantome); // comment la mettre dans la div FenetreDeJeu
//  document.body.fenetreDeJeu.appendChild(imageFantome); Erreur indiqué dans la console

//var creationimage = document.createElement(img);
// creationimage.src = imageFantome.src
// fenetreDeJeu.appenChild(creationimage)


//Mouvement du personnage

window.addEventListener("load", function(){
    var container = window.document.getElementById('container');
    console.log(container);
    container.style.position="absolute";
    container.style.height="110px";
    container.style.width="85px";
    container.style.overflow="hidden";

    var imageDetective = window.document.getElementById('img1');
    imageDetective.style.position="absolute";
    

    var imagePositionX = container.offsetLeft;
    var imagePositionY= container.offsetTop;
    var imagedivx=0;
    var imagedivy=0;

    // imageObelix.style.left= 0;
    // imageObelix.style.top=0;
    

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
             imagedivx -= 435;
            imageDetective.style.left=imagedivx+"px";
            if(imagedivx <=522){
                imagedivx = 0;
            }
            
            break;

            case 38 : 
            // if(parseInt(imagePositionY)<=0){
            //     imagePositionY = 10;
            // }
            imagePositionY -= 10;
            container.style.top= imagePositionY + "px";
            // console.log(imagePositionX);
            imagedivx -= 0;
            imageDetective.style.left=imagedivx+"px";
            if(imagedivx <=90){
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
            imagedivx -= 220;
            imageDetective.style.left=imagedivx+"px";
            if(imagedivx <=320){
                imagedivx = 0;
            }
            break;

            case 40: 
            // if(parseInt(imagePositionY)>=650){
            //     imagePositionY=640;
            // }
            imagePositionY +=10;
            container.style.top= imagePositionY +"px";
            // console.log(imagePositionY);
            imagedivx -= 318;
            imageDetective.style.left=imagedivx+"px";
            if(imagedivx <=410){
                imagedivx = 0;
            }
            break;
        }
    }



})