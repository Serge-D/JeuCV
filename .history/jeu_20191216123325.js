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
var monscore = window.document.getElementById("monscore");

//tableau balle et tableau fantome
var tableauBalle = [];
var tableauFantome = [];


//Sprite et Div Container 

container.style.position="absolute";
container.style.height="160px";
container.style.width="73px";
container.style.overflow="hidden";
container.style.left= "1010px";
container.style.top="240px";  


imageDetective.style.position="absolute";
imageDetective.style.width="333px";


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
 var FabriqueDeFantome = function(fantomeId){
     
    this.fantome = new Image();
    this.fantome.style.height = "121px";
    this.fantome.style.width = "90px";
    this.fantome.style.opacity ="0.7";
    this.fantome.style.position = "absolute";
    this.fantome.style.left = getRandomInt(800)+"px";
    this.fantome.style.top = getRandomInt(500)+"px";
    this.fantome.src = 'fantome-face.png';
    this.id = "fantome_" + fantomeId
    this.clean = function(){
        var that = this;
        this.fantome.parentNode.removeChild(this.fantome);
        var index = tableauFantome.findIndex(function(o){
            return o.id === that.id;
       })
       if (index !== -1) tableauFantome.splice(index, 1);
    }.bind(this)
    // this.directions = [-1, 1][getRandomInt(2)]
    this.direction = getRandomIntInterval(1, 5);
    this.limit = 1100;
    this.limit2 = 650;

    // this.collisionsPersonnage = function(){
    //     let perso1 = {
    //         x : parseInt(container.style.left),
    //         y : parseInt(container.style.top),
    //         width : 73,
    //         height : 160
    //     };
    //     tableauFantome.forEach(function(elt){
    //         // console.log(that)
    //         let perso2 = {
    //             x : parseInt(elt.fantome.style.left),
    //             y : parseInt(elt.fantome.style.top),
    //             width : parseInt(elt.fantome.style.width),
    //             height : parseInt(elt.fantome.style.height)
    //         }
    //         if (perso1.x < perso2.x + perso2.width &&
    //             perso1.x + perso1.width > perso2.x &&
    //             perso1.y < perso2.y + perso2.height &&
    //             perso1.height + perso1.y > perso2.y){
    //                 console.log('yo');
    //             }
    // })}.bind(this)

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
            tableauFantome.push(new FabriqueDeFantome(i));
            console.log(tableauFantome)
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
    this.checkCollision = null;

    this.removeBalle = function(){
        if(parseInt(this.balle.style.top) < 0){
            this.balle.parentNode.removeChild(this.balle);
            tableauBalle.slice()
            clearInterval(this.cleanBalle)
            clearInterval(this.checkCollision);

        }
        if(parseInt(this.balle.style.top) > 750){
            this.balle.parentNode.removeChild(this.balle);
            clearInterval(this.cleanBalle)
            clearInterval(this.checkCollision);

        }
        if(parseInt(this.balle.style.left) < 0){
            this.balle.parentNode.removeChild(this.balle);
            clearInterval(this.cleanBalle)
            clearInterval(this.checkCollision);

        }
        if(parseInt(this.balle.style.left) > 1200){
            this.balle.parentNode.removeChild(this.balle);
            clearInterval(this.cleanBalle)
            clearInterval(this.checkCollision);

        }
    }.bind(this)

    this.collisions = function(){
        var that = this;
        // console.log(this)
        let rect1 = {
            x : parseInt(this.balle.style.left),
            y : parseInt(this.balle.style.top),
            width : 20,
            height : 20
        };
        tableauFantome.forEach(function(elt){
            // console.log(that)
            let rect2 = {
                x : parseInt(elt.fantome.style.left),
                y : parseInt(elt.fantome.style.top),
                width : parseInt(elt.fantome.style.width),
                height : parseInt(elt.fantome.style.height)
            }
            if (rect1.x < rect2.x + rect2.width &&
                rect1.x + rect1.width > rect2.x &&
                rect1.y < rect2.y + rect2.height &&
                rect1.height + rect1.y > rect2.y) {
                    // alert('collisions');
                    that.clean();
                    elt.clean();
                    
                }

        })
    }.bind(this)

    this.clean = function(){
        // console.log(this)
        
        clearInterval(this.checkCollision);
        clearInterval(this.cleanBalle);
        this.balle.parentNode.removeChild(this.balle);

    }.bind(this)

    fenetreDeJeu.appendChild(this.balle);
    requestAnimationFrame(this.tir);
    this.cleanBalle = setInterval(this.removeBalle,1000);
    this.checkCollision = setInterval(this.collisions,200);

    return this;
 }  

//Changement de fenetre
// position: absolute;
// left: -1200px;
// z-index: -1;


// Score 

var score = 0;
setInterval(function(){
    score += 10
    score.to
    monscore.textContent = score;
},1000)




//Mouvement du personnage

    

    

    var imagePositionX = parseInt(container.style.left);
    var imagePositionY= parseInt(container.style.top);
    var imagedivx=0;
    var imagedivy=0;



    window.onkeydown = function(event){
        var code = event.keyCode;
        
        switch(code){
            case 37 : 
            // arrow left
            if(parseInt(imagePositionX) <= 110){
                imagePositionX = 120;
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
            new FabriqueDeBalle();
            // console.log(tableauBalle);


            break;

        }
    }






})