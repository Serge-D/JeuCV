'use strict'

window.addEventListener("load", function(){
// Mes Id stockées dans des variables

var boutonStart =  window.document.getElementById('boutonstart');
var fenetreDeJeu = window.document.getElementById('fenetre');
var fenetreStatut = window.document.getElementById('statut');
var fenetreRegles = window.document.getElementById('regles');
var restart = window.document.getElementById('restart');
var container = window.document.getElementById('container');
var imageDetective = window.document.getElementById('img1');
var fenetreDeFond = window.document.getElementById('fenetredefond');

//Direction de Balle

var directionDeBalle = null;

//fonctions pour generer des chiffres aléatoires pour ma Fabrique de fantomes
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
};

function getRandomIntInterval(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Gestion de la page d'accueil lorsqu'on appuie sur le bouton start

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

    // this.directions = [-1, 1][getRandomInt(2)]
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
    
    this.directionDeBalle = directionDeBalle[0];
    this.mvt = directionDeBalle[1]
    this.tir = function(){
        
        var deplacement = parseInt(this.balle.style[this.directionDeBalle]) - 5*this.mvt ;
        this.balle.style[this.directionDeBalle] = deplacement + "px";
        
        requestAnimationFrame(this.tir);
    }.bind(this)
    
    this.cleanBalle = null;

    this.removeBalle = function(){
        if(parseInt(this.balle.style.top) < 0){
            this.balle.parentNode.removeChild(this.balle);
            clearInterval(this.cleanBalle)
        }
        if(parseInt(this.balle.style.top) > 750){
            this.balle.parentNode.removeChild(this.balle);
            clearInterval(this.cleanBalle)
        }
        if(parseInt(this.balle.style.left) < 0){
            this.balle.parentNode.removeChild(this.balle);
            clearInterval(this.cleanBalle)
        }
        if(parseInt(this.balle.style.left) > 1200){
            this.balle.parentNode.removeChild(this.balle);
            clearInterval(this.cleanBalle)
        }
    }.bind(this)

    fenetreDeJeu.appendChild(this.balle);
    requestAnimationFrame(this.tir);
    this.cleanBalle = setInterval(this.removeBalle,1000);
    return this.balle;
 }  

//Changement de fenetre
// position: absolute;
// left: -1200px;
// z-index: -1;


 //Collisions 




//Mouvement du personnage

    
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



    window.onkeydown = function(event){
        var code = event.keyCode;
        
        switch(code){
            case 37 : 
            // arrow left
            if(parseInt(imagePositionX) <= 200){
                imagePositionX = 180;
            }
            
            directionDeBalle = ["left",1];

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
            //arrow top
            if(parseInt(imagePositionY)<=0){
                imagePositionY = 10;
            }
            
            directionDeBalle = ["top",1];

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
            //arrow right
            if(parseInt(imagePositionX)>=1010){
                    imagePositionX = 1000;
            }
            if(parseInt(imagePositionX) >= 960 && parseInt(imagePositionY)>=440){
                imagePositionX = 950;
                imagePositionY = 440;
            }
            if(parseInt(imagePositionX) >= 980 && parseInt(imagePositionY)>=420){
                imagePositionX = 970;
                imagePositionY = 420;
            }
            if(parseInt(imagePositionX) >= 1010 && parseInt(imagePositionY)>=400){
                imagePositionX = 1000;
                imagePositionY = 400;
            }
            if(parseInt(imagePositionX) >= 1010 && parseInt(imagePositionY)>=60){
                imagePositionX = 1010;
                imagePositionY = 50;
            }
            // if(parseInt(imagePositionX) >= 960 && parseInt(imagePositionY)>=10){
            //     imagePositionX = 950;
            //     imagePositionY = 10;
            // }
            // if(parseInt(imagePositionX) >= 950 && parseInt(imagePositionY)>=0){
            //     imagePositionX = 940;
            //     imagePositionY = 0;
            // }

            directionDeBalle = ["left",-1];
            
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
            //arrow bottom
            if(parseInt(imagePositionY)>=460){
                imagePositionY=450;
            }
            if(parseInt(imagePositionX) >= 1010 && parseInt(imagePositionY)>=400){
                imagePositionX = 1010;
                imagePositionY = 390;
            }
            if(parseInt(imagePositionX) >= 980 && parseInt(imagePositionY)>=430){
                imagePositionX = 980;
                imagePositionY = 420;
            }
            
            directionDeBalle = ["top",-1];

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