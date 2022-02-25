`Use Strict`;

//Programme principal

window.onload = go;

//Propriétés du monstre

var nom;
var life;
var money;
var awake;

//Associer les boutons a des variables

var h_newLife = document.getElementById("b1");
var h_run = document.getElementById("b2");
var h_fight = document.getElementById("b3");
var h_sleep = document.getElementById("b4");
var h_eat =  document.getElementById("b5")
var h_show = document.getElementById("b6");
var h_work = document.getElementById("b7")
var h_kill = document.getElementById("k");

var actionbox = document.getElementById("actionbox");
var monster = document.getElementById("monster");
var image = document.getElementById("image");

//Tableau des fonctions pour hasard

var tableau = new Array();
tableau[0] = run;
tableau[1] = fight;
tableau[2] = work;
tableau[3] = sleep;
tableau[4] = eat;

//Fonctions principales

function init(n, l, m) {
    nom = n;
    life = l;
    money = m;
    awake = true;
}

function go() {

    //initialisation + affichage des caractéristiques de base
    init("Poulpaf", 10, 10);
    showme();
    displayStatus(life, money, awake);

    //association des boutons aux fonctions
    h_run.onclick = run;
    h_fight.onclick = fight
    h_work.onclick = work;
    h_sleep.onclick = sleep;
    h_eat.onclick = eat;
    h_show.onclick = showme;

    h_newLife.onclick = newLife;
    h_kill.onclick = kill;

    //lancement de hasard

    setInterval(hasard, 12000);
}

function log(message) {
    let p = document.createElement("p");
    let n = document.createTextNode(message);
    p.appendChild(n);
    actionbox.prepend(p);
}

function displayStatus(life, money, awake) {
    let q = document.querySelectorAll("li");
    q[0].textContent = `Vie : ${life}`;
    q[1].textContent = `Argent : ${money}`;
    if (awake) {
        q[2].textContent = `Réveillé`;
    }
    else {
        q[2].textContent = `Endormi`;

    }

    //Modification du css

    if (life <= 2) {
        monster.style.backgroundColor = "red";
    }
    if (life <= 5 && life > 2) {
        monster.style.backgroundColor = "orange";
    }
    if (life <= 8 && life > 5) {
        monster.style.backgroundColor = "blue";
    }
    if (life > 8) {
        monster.style.backgroundColor = "green";
    }

    monster.style.borderWidth = `${money}px`;

}

function hasard() {
    if (awake) {
        let func = tableau[Math.floor(Math.random() * 5)];
        func();
    }
}

//Fonctions pour les boutons

function run() {
    if (life === 0) {
        log("Poulpaf n'est plus parmi nous...");
    }
    else {
        if (awake === true) {
            log("Poulpaf pique un sprint");
            image.setAttribute("src", "img/crevé.png");
            if (life >= 1) {
                life--;
                if (life === 0) {
                    log("Ce sprint lui a coûté la vie...");
                    image.setAttribute("src", "img/mort.png");

                }
            }
        }
        else log("Poulpaf fait encore dodo");
    }
    displayStatus(life, money, awake);
}

function fight() {
    if (life === 0) {
        log("Poulpaf n'est plus parmi nous...");
    }
    else {
        if (awake === true) {
            log("Poulpaf est déter, il va se taper");
            image.setAttribute("src", "img/vnr.png");

            if (life > 3) {
                life -= 3;
                log("Ouch ça fait mal");
            }
            else {
                life = 0;
                log("Poulpaf n'a pas survécu à ce combat...");
                image.setAttribute("src", "img/mort.png");
            }
        }
        else log("Poulpaf fait encore dodo");
    }
    displayStatus(life, money, awake);
}

function sleep() {
    if (awake) {
        if (life != 0) {
            awake = false;
            displayStatus(life, money, awake);
            log("Poulpaf va au dodo")
            image.setAttribute("src", "img/dodo.png");
    
            setTimeout(function(){ 
                life++;
                awake = true;
                displayStatus(life, money, awake);
                log("Il a bien dormi, Poulpaf est plein d'énergie !");
                image.setAttribute("src", "img/base.png");
    
            }, 7000);
        }
        else log("Il n'est plus parmi nous...")
    }
    else log("Il fait déja dodo !")

}
    

function work() {
    if (life === 0) {
        log("Poulpaf n'est plus parmi nous...");
    }
    else {
        if (awake === true) {
            if (life > 1) {
                life--;
                money += 2;
                log("Poulpaf va au taff");
                image.setAttribute("src", "img/taf.png");

            }
            else {
                life = 0;
                log("Il se sera tué à la tâche...");
                image.setAttribute("src", "img/mort.png");
            }
        }
        else log("Poulpaf fait encore dodo");
    }
    displayStatus(life, money, awake);
}

function eat() {
    if (life === 0) {
        log("Poulpaf n'est plus parmi nous...");
    }
    else {
        if (awake === true) {
            if (money >= 3) {
                money -= 3;
                life += 2;
                log("Poulpaf a mangé un HotDog, il est repus");
                image.setAttribute("src", "img/mange.png");

            }
            else log("Poulpaf n'a plus d'argent, fais le bosser !");
        }
        else log("Poulpaf fait encore dodo")
    }
    displayStatus(life, money, awake);
}

function showme() {
    let state;
    if (awake === true) {
        state = "éveillé";
    } else state = "endormi";
    window.alert(`Le monstre s'appelle ${nom}, possède ${life} pv, possède ${money} argent et est actuellement ${state}`);
}

function newLife() {
    if (life === 0) {
    init("Poulpaf", 10, 10);
    log("Poulpaf ressuscite");
    image.setAttribute("src", "img/base.png");
    }
    displayStatus(life, money, awake);
}

function kill() {
    if (life === 0) {
        log("On ne peut pas tuer un mort !");
    }
    else {
        life = 0;
        log("Vous avez assassiné Poulpaf...");
        image.setAttribute("src", "img/mort.png");
    }
    displayStatus(life, money, awake);
}


