// JavaScript source code page PANIER
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
//Fonction création de la ligne de commande dans le panier
function createAchat() {
    const nouvelleLigneTab = document.createElement('tr');
    emplacementProduit.appendChild(nouvelleLigneTab);
    //Emplacement Produit (nom / img / id)
    const nouvelleColonneProduit = document.createElement('td');
    nouvelleColonneProduit.setAttribute("id", "produit");
    nouvelleLigneTab.appendChild(nouvelleColonneProduit);
    nouvelleColonneProduit.innerHTML = nom + "<br />";
    const imgProduit = document.createElement('img');
    imgProduit.src = url;
    imgProduit.classList.add("img-thumbnail");
    imgProduit.classList.add("w-25");
    nouvelleColonneProduit.appendChild(imgProduit);
    const idProduit = document.createElement("p");
    nouvelleColonneProduit.appendChild(idProduit);
    idProduit.textContent = id;

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
    nouvelleColonnePrix.textContent = prix + " EUR";

    //Emplacement Sous Total
    const nouvelleColonneSsTotal = document.createElement('td');
    nouvelleColonneSsTotal.setAttribute("id", "sousTotal");
    nouvelleLigneTab.appendChild(nouvelleColonneSsTotal);
    multiply = prix * quantite;
    nouvelleColonneSsTotal.textContent = multiply + " EUR";    
}
// Boucle insertion info dans la ligne commande
for (i = 1; i < localStorage.length+1; i++) {
    let detailCommande = localStorage.getItem('ligne' + i);
    let detailCommandeJson = JSON.parse(detailCommande);
    nom = detailCommandeJson.nom;
    prix = detailCommandeJson.prix;
    id = detailCommandeJson.id;
    url = detailCommandeJson.url;
    quantite = detailCommandeJson.quantite;
    option = detailCommandeJson.option;
    new createAchat;

    //TOTAL
    const totalCommande = document.getElementById("total");
    sum += multiply;
    totalCommande.textContent = sum + " EUR";
}

boutonReset.addEventListener("click", function () {
    localStorage.clear();
})

const validerBouton = document.getElementById("valideBouton");
