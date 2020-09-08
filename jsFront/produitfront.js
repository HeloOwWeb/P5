// JavaScript source code Page produit
// R�cup�ration de la variable ID du lien produit s�lectionn�
//lienBDD = require('./front.js');
//console.log(idSelectionneLienProduit);

//const lienBDD = "http://localhost:3000/api/teddies/" + idSelectionneLienProduit;
const lienBDD = "http://localhost:3000/api/teddies/5beaacd41c9d440000a57d97";
//fetch(url) : r�cup�rer la ressource situ�e � l'adresse url
const bddTeddyProduit = fetch(lienBDD);
// Cr�ation des variables d'emplacement
const titre = document.querySelector('h1');
const img = document.querySelector('section img');
const prix = document.getElementById('prix');
const quantite = document.getElementById('quantite');
// Variable nom, id,url image et prix
let nomProduit;
let idProduit;
let prixProduit;
let urlImageProduit;
//Couleurs
const couleur = document.getElementById('couleur');
let newSelectEmplacement;
const tabColoris = [];
let x = 0;
let nbCouleurTeddy;
let newOption;
//Fin
const description = document.getElementById('description');
//SousTOTAL
const quantiteSelect = document.getElementById("quantiteValeur");
const sousTotalAJour = document.getElementById("soustotal");
//varirable pour le localStorage
const tabLocal = [];

//cr�ation des champs option et ajout des coloris
function selectForm() {
    newOption = document.createElement("option");
    newSelectEmplacement.appendChild(newOption);
    newOption.textContent = tabColoris[x];
}

// Lien avec la BDD
bddTeddyProduit.then(function (reponse) {
    // cr�ation de ma variable comportant mon objet JSON BDD
    const jsonTabBdd = reponse.json();
    return jsonTabBdd;
})
    .then(function (jsonTabBdd) {
        nomProduit = jsonTabBdd.name;
        idProduit = jsonTabBdd._id;
        prixProduit = jsonTabBdd.price;
        urlImageProduit = jsonTabBdd.imageUrl;
        titre.textContent = nomProduit;
        img.src = urlImageProduit;
        description.textContent += jsonTabBdd.description;
        return jsonTabBdd;

    })
    .then(function (jsonTabBdd) {
        //R�cup�ration du nombre de couleurs
        const nbCouleurTeddy = jsonTabBdd.colors.length;
        //Ajout dans le tableau
        for (let i = 0; i < nbCouleurTeddy; i++) {
            tabColoris.push(jsonTabBdd.colors[i]);
        }
        //cr�ation de l'element select
        newSelectEmplacement = document.createElement("select");
        couleur.appendChild(newSelectEmplacement);
        // Injection des couleurs
        while (x < nbCouleurTeddy) {
            new selectForm();
            x++;
        }
        return jsonTabBdd;
    })
    .then(function (jsonTabBdd) {
        prix.textContent += prixProduit + " EUR";
        let sousTotal = prixProduit;
        sousTotalAJour.textContent += sousTotal;
        quantiteSelect.addEventListener("change", function () {
            let sousTotal = prixProduit;
            sousTotal = quantiteSelect.value * prixProduit;
            sousTotalAJour.textContent = sousTotal;
        });
        return jsonTabBdd;
    })
    .then(function (jsonTabBdd) {
        tabLocal.push(nomProduit, prixProduit, idProduit, urlImageProduit, quantiteSelect.value, newOption.value);
    });
console.log(tabLocal);

