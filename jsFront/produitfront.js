// JavaScript source code Page produit
// R�cup�ration de la variable ID du lien produit s�lectionn�
//idSelectionneLienProduit = require('./front.js');
//console.log(idSelectionneLienProduit);

//const lienBDD = "http://localhost:3000/api/teddies/" + idSelectionneLienProduit;
const lienBDD = "http://localhost:3000/api/teddies/5be9c8541c9d440000665243";
//fetch(url) : r�cup�rer la ressource situ�e � l'adresse url
const bddTeddyProduit = fetch(lienBDD);
// Cr�ation des variables d'emplacement
const titre = document.querySelector('h1');
const img = document.querySelector('section img');
const prix = document.getElementById('prix');
const quantite = document.getElementById('quantite');
const couleur = document.getElementById('couleur');
const description = document.getElementById('description');

// Lien avec la BDD
bddTeddyProduit.then(function (reponse) {
    // cr�ation de ma variable comportant mon objet JSON BDD
    const jsonTabBdd = reponse.json();
    return jsonTabBdd;
})
    .then(function (jsonTabBdd) {
        titre.textContent = jsonTabBdd.name;
        img.src = jsonTabBdd.imageUrl;
        prix.textContent += jsonTabBdd.price + " EUR";
        couleur.textContent += jsonTabBdd.colors;
        description.textContent += jsonTabBdd.description;
    });