// JavaScript source code page PANIER
const main = document.getElementById("main");
const infoTextAchat = document.getElementById("infoTextAchat")
const emplacementProduit = document.getElementById("tbody");
const paragrapheInfoVide = document.getElementById("vide");
const boutonReset = document.getElementById("reset");
// Variable pour calcul
let multiply = 0;
let sum = 0;
// Variable de récupération d'info commande
let nom;
let prix;
let id;
let url;
let quantite;
let option;
//variable products
const products = [];

//Fonction création de la ligne de commande dans le panier
function createAchat() {
    const nouvelleLigneTab = document.createElement('tr');
    emplacementProduit.appendChild(nouvelleLigneTab);
    //Emplacement Produit (nom / img / id)
    const nouvelleColonneProduit = document.createElement('td');
    const nouveauNomProduit = document.createElement('h2');
    nouvelleColonneProduit.setAttribute("id", "produit");
    nouvelleColonneProduit.classList.add("text-center");
    nouvelleLigneTab.appendChild(nouvelleColonneProduit);
    nouvelleColonneProduit.appendChild(nouveauNomProduit);
    nouveauNomProduit.innerHTML = nom;
    const imgProduit = document.createElement('img');
    imgProduit.src = url;
    imgProduit.classList.add("img-thumbnail");
    imgProduit.classList.add("w-50");
    imgProduit.classList.add("shadow");
    nouvelleColonneProduit.appendChild(imgProduit);
    const idProduit = document.createElement("em");
    nouvelleColonneProduit.appendChild(idProduit);
    idProduit.innerHTML = "<br />"+ id + "<br />";

    //Emplacement Couleur
    const nouvelleColonneCouleur = document.createElement('td');
    nouvelleColonneCouleur.setAttribute("id", "couleur");
    nouvelleColonneCouleur.classList.add("align-middle");
    nouvelleLigneTab.appendChild(nouvelleColonneCouleur);
    nouvelleColonneCouleur.textContent = option;

    //Emplacement Quantité
    const nouvelleColonneQuantite = document.createElement('td');
    nouvelleColonneQuantite.setAttribute("id", "quantite");
    nouvelleColonneQuantite.classList.add("align-middle");
    nouvelleLigneTab.appendChild(nouvelleColonneQuantite);
    nouvelleColonneQuantite.textContent = quantite;

    //Emplacement Prix
    const nouvelleColonnePrix = document.createElement('td');
    nouvelleColonnePrix.setAttribute("id", "prix");
    nouvelleColonnePrix.classList.add("align-middle");
    nouvelleLigneTab.appendChild(nouvelleColonnePrix);
    nouvelleColonnePrix.textContent = prix + " EUR";

    //Emplacement Sous Total
    const nouvelleColonneSsTotal = document.createElement('td');
    nouvelleColonneSsTotal.setAttribute("id", "sousTotal");
    nouvelleColonneSsTotal.classList.add("align-middle");
    nouvelleLigneTab.appendChild(nouvelleColonneSsTotal);
    multiply = prix * quantite;
    nouvelleColonneSsTotal.textContent = multiply + " EUR";    
    }

//Condition si pas de commande
if (localStorage.length == 0) {
    main.style.display = "none";
    infoTextAchat.style.display = "block";
} else {
    main.style.display = "block";
    infoTextAchat.style.display = "none";
}

    // Boucle insertion info dans la ligne commande
    for (i = 1; i < localStorage.length + 1; i++) {
        let detailCommande = localStorage.getItem('ligne' + i);
        let detailCommandeJson = JSON.parse(detailCommande);
        nom = detailCommandeJson.nom;
        prix = detailCommandeJson.prix;
        id = detailCommandeJson.id;
        url = detailCommandeJson.url;
        quantite = detailCommandeJson.quantite;
        option = detailCommandeJson.option;
        new createAchat;
        //insertion des datas products pour envoi POST
        for (y = 0; y < quantite; y++) {
            products.push(id);
        }

        //TOTAL
        const totalCommande = document.getElementById("total");
        sum += multiply;
        totalCommande.textContent = sum + " EUR";
    }

    console.log(products);

    // bouton reset
    boutonReset.addEventListener("click", function () {
        localStorage.clear();
    })

    //validation formulaire
    // variables d'emplacement
    const validerBouton = document.getElementById("valideBouton");
    const firstName = document.getElementById("firstname");
    const lastName = document.getElementById("name");
    const address = document.getElementById("address");
    const city = document.getElementById("ville");
    const email = document.getElementById("mail");
    const placeID = document.getElementById("id");
    // creation variable récuperer réponse Requete
    let orderID;
    let total = 0;
    let prixTotalCommande = 0;

//Fonction validation formulaire
function validFormDatas(champ, reg, message) {
    champ.setAttribute('required', true);
    champ.addEventListener('change', (valeurSaisie) => {
        let valeur = valeurSaisie.target.value;
        if (reg.test(valeur)) {
            validerBouton.removeAttribute("disabled");
        } else {
            validerBouton.setAttribute("disabled", true);
            alert("Merci de respecter le format attendu suivant " + message);
        }
    })
}

//Fonction de redirection HTML
function RedirectionJavascript(a, b) {
    document.location.href = "confirmation.html?order=" + a + "&total=" + b;
}

//Déclaration des REGEX
const regCP = /^((0[1-9])|([1-8][0-9])|(9[0-8])|(2A)|(2B))[0-9]{3}$/;
const regEMAIL = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
//Récupération des Inputs à vérifier
const inputCP = document.querySelector('input[name="cp"]');
const inputEmail = document.querySelector('input[name="email"]');
//Constante message format attendu
const messageCP = "71510 ou 2A004";
const messageEMAIL = "contact@orinico.fr ou contact@gmail.com";

validFormDatas(inputCP, regCP, messageCP);
validFormDatas(inputEmail, regEMAIL, messageEMAIL);

validerBouton.addEventListener("click", function (e) {
    e.preventDefault();
    
        //Création JSON Contact
        const contact = {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value
        }
        //création requete POST
        fetch("http://localhost:3000/api/teddies/order", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ contact, products })
        })
            .then(function (response) {
                if (response.ok) {
                    validerBouton.removeAttribute("disabled");
                    return response.json();
                } else {
                    alert("Veuillez renseigner l'ensemble des champs Contact pour valider votre commande.");
                    validerBouton.setAttribute("disabled", true);
                }
            })
            .then(function (json) {
                console.log(json);
                orderID = json.orderId;
                let count = json.products.length;
                for (let i = 0; i < count; i++) {
                    total += json.products[i].price;
                }
                prixTotalCommande = total / 100; 
                RedirectionJavascript(orderID, prixTotalCommande);
                return orderID, prixTotalCommande;
            })
            .catch(function (error) {
                console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
            });
    });
