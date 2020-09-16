// JavaScript source code Page produit
//je récupère mon lien URL après l'info ?
const url = window.location.search;
// je crée mon paramétrage d'analyse
const params = new URLSearchParams(url);
// je récupère l'information qui m'interesse
const idURL = params.get('id');
const lienBDD = "http://localhost:3000/api/teddies/" + idURL;
//fetch(url) : récupérer la ressource située à l'adresse url
let bddTeddyProduit = fetch(lienBDD);
// Création des variables d'emplacement
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
let selectCouleur;
//Fin
const description = document.getElementById('description');
//SousTOTAL
const quantiteSelect = document.getElementById("quantiteValeur");
const sousTotalAJour = document.getElementById("soustotal");
//variable pour le localStorage
const validFormulaire = document.getElementById("bouton");

//création des champs option et ajout des coloris
function selectForm() {
    newOption = document.createElement("option");
    newOption.setAttribute("value", tabColoris[x]);
    newSelectEmplacement.appendChild(newOption);
    newOption.textContent = tabColoris[x];
}

// Lien avec la BDD
bddTeddyProduit.then(function (reponse) {
    // création de ma variable comportant mon objet JSON BDD
    const jsonTabBdd = reponse.json();
    return jsonTabBdd;
})
    .then(function (jsonTabBdd) {
        nomProduit = jsonTabBdd.name;
        idProduit = jsonTabBdd._id;
        prixProduit = jsonTabBdd.price / 100;
        urlImageProduit = jsonTabBdd.imageUrl;
        titre.textContent = nomProduit;
        img.src = urlImageProduit;
        description.textContent += jsonTabBdd.description;
        return jsonTabBdd;

    })
    .then(function (jsonTabBdd) {
        //Récupération du nombre de couleurs
        const nbCouleurTeddy = jsonTabBdd.colors.length;
        //Ajout dans le tableau
        for (let i = 0; i < nbCouleurTeddy; i++) {
            tabColoris.push(jsonTabBdd.colors[i]);
        }
        //création de l'element select
        newSelectEmplacement = document.createElement("select");
        newSelectEmplacement.setAttribute("id", "select");
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
        validFormulaire.addEventListener('click', function () {
            let liste;
            let valeurOption;
            liste = document.getElementById("select");
            valeurOption = liste.options[liste.selectedIndex].text;

            const commandeProduit = {
                "nom": nomProduit,
                "prix": prixProduit,
                "id": idProduit,
                "url": urlImageProduit,
                "quantite": quantiteSelect.value,
                "option": valeurOption
            }
            const commandeJSON = JSON.stringify(commandeProduit);
            const ligne = "ligne";
            const ligneID = localStorage.length + 1;
            localStorage[ligne + ligneID] = commandeJSON;
        })
    });

console.log(localStorage);
