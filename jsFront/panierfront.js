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
    nouvelleLigneTab.appendChild(nouvelleColonneProduit);
    nouvelleColonneProduit.appendChild(nouveauNomProduit);
    nouveauNomProduit.innerHTML = nom;
    const imgProduit = document.createElement('img');
    imgProduit.src = url;
    imgProduit.classList.add("img-thumbnail");
    imgProduit.classList.add("w-100");
    imgProduit.classList.add("shadow");
    nouvelleColonneProduit.appendChild(imgProduit);
    const idProduit = document.createElement("em");
    nouvelleColonneProduit.appendChild(idProduit);
    idProduit.innerHTML = "<br />"+ id + "<br />";

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
    //insertion des datas products pour envoi POST
    if (quantite > 1) {
        for (y = 0; y < quantite; y++) {
            products.push(id);
        }
    } else {
        products.push(id);
    }
    
    //TOTAL
    const totalCommande = document.getElementById("total");
    sum += multiply;
    totalCommande.textContent = sum + " EUR";
}
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

validerBouton.addEventListener("click", function () {
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
            return response.json();
        })
        .then(function (json) {
            orderID = json.orderId;
            let count = json.products.length;
            for (let i = 0; i < count; i++) {
                total += json.products[i].price;
            }
            prixTotalCommande = total / 100;
            function RedirectionJavascript(a, b) {
                document.location.href = "confirmation.html?order=" + a + "&total=" + b;
            }
            RedirectionJavascript(orderID, prixTotalCommande);
            return orderID, prixTotalCommande;            
        });
});