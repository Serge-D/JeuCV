'use strict'

// Switch des div lors du click sur Start

var boutonStart =  window.document.getElementById('boutonstart');
var fenetreDeJeu = window.document.getElementById('fenetre');
var fenetreStatut = window.document.getElementById('statut');
var fenetreRegles = window.document.getElementById('regles');

fenetreDeJeu.style.display = 'none';
fenetreStatut.style.display = 'none';

boutonStart.addEventListener("click",function(){
    if(fenetreDeJeu.style.display == 'none'){
        boutonStart.style.display = 'none';
        fenetreDeJeu.style.display = "";
        fenetreStatut.style.display = "";
        fenetreRegles.style.display = "";
    }
})

// x et y largeur et hauteur 

//Mouvement du personnage

window.addEventListener("load", function(){
    var container = window.document.getElementById('container');
    container.style.position="absolute";
    container.style.height="410px";
    container.style.width="200px";
    container.style.overflow="hidden";
    
    var imageDetective = window.document.getElementById('img1');
    var imagePositionX = imageDetective.offsetLeft;
    var imagePositionY= imageDetective.offsetTop;

    // imageObelix.style.left= 0;
    // imageObelix.style.top=0;
    

    window.onkeydown = function(event){
        var code= event.keyCode;
        
        switch(code){
            case 37 : 
            if(parseInt(imagePositionX) <= 0){
                imagePositionX = 10;
            }
            imagePositionX -= 10;
            imageDetective.style.left = imagePositionX + "px";
            console.log(imagePositionX);
            break;

            case 38 : 
            if(parseInt(imagePositionY)<=0){
                imagePositionY = 10;
            }
            imagePositionY -= 10;
            imageDetective.style.top= imagePositionY + "px";
            console.log(imagePositionX);
            break;

            case 39 : 
            if(parseInt(imagePositionX)>=1000){
                imagePositionX = 990;
            }
            imagePositionX += 10;
            imageDetective.style.left= imagePositionX +"px";
            console.log(imagePositionY);
            break;

            case 40: 
            if(parseInt(imagePositionY)>=650){
                imagePositionY=640;
            }
            imagePositionY +=10;
            imageDetective.style.top= imagePositionY +"px";
            console.log(imagePositionY);
            break;
        }
    }



})