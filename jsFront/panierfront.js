// JavaScript source code page PANIER
const emplacementProduit = document.getElementById("tbody");

let nom = localStorage.getItem('nom');
let prix = localStorage.getItem('prix');
let id = localStorage.getItem('id');
let url = localStorage.getItem('url');
let quantite = localStorage.getItem('quantite');
let option = localStorage.getItem('option');


function createAchat() {
    const nouvelleLigneTab = document.createElement('tr');
    emplacementProduit.appendChild(nouvelleLigneTab);
    //Emplacement Produit (nom / img / id)
    const nouvelleColonneProduit = document.createElement('td');
    nouvelleColonneProduit.setAttribute("id", "produit");
    nouvelleLigneTab.appendChild(nouvelleColonneProduit);
    nouvelleColonneProduit.textContent = nom;

    //Emplacement Couleur
    const nouvelleColonneCouleur = document.createElement('td');
    nouvelleColonneCouleur.setAttribute("id", "couleur");
    nouvelleLigneTab.appendChild(nouvelleColonneCouleur);
    nouvelleColonneCouleur.textContent = option;

    //Emplacement Quantité
    const nouvelleColonneQuantite = document.createElement('td');
    nouvelleColonneQuantite.setAttribute("id", "quantite");
    nouvelleLigneTab.appendChild(nouvelleColonneQuantite);
    nouvelleColonneQuantite.textContent = quantite;

    //Emplacement Prix
    const nouvelleColonnePrix = document.createElement('td');
    nouvelleColonnePrix.setAttribute("id", "prix");
    nouvelleLigneTab.appendChild(nouvelleColonnePrix);
    nouvelleColonnePrix.textContent = prix;

    //Emplacement Sous Total
    const nouvelleColonneSsTotal = document.createElement('td');
    nouvelleColonneSsTotal.setAttribute("id", "sousTotal");
    nouvelleLigneTab.appendChild(nouvelleColonneSsTotal);
    nouvelleColonneSsTotal.textContent = prix * quantite;
}

console.log(localStorage);
new createAchat;
//création des lignes tab / au tab local