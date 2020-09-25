//fetch(url) : récupérer la ressource située à l'adresse url
const bddTeddy = fetch("http://localhost:3000/api/teddies/");
// variable nombre de peluche
let nombreObjetBddTeddy;
// tableau des noms de peluche
const tabNom = [];
const tabPhoto = [];
const tabID = [];
const tabPrix = [];
// Emplacement grille Produits
let carteProduit = document.getElementById("cardProduit");
let nouveauCorpsDeCarte;
let nouveauNomProduit;
let nouvelleImageProduit;
let nouveauPrixProduit;
const urlProduit = "produit.html";
let nouveauLienIDProduit;
let x = 0;

//Create function news elements with class Bootstrap for produit place
function nouveauProduit(emplacement) {
    const nouvelArticle = document.createElement("article");
    nouvelArticle.classList.add("col-12");
    nouvelArticle.classList.add("mb-4");
    nouvelArticle.classList.add("mb-md-5");
    nouvelArticle.classList.add("col-lg-6");
    nouvelArticle.classList.add("col-xl-4");
    const nouvelleCarteProduit = document.createElement("div");
    nouvelleCarteProduit.classList.add("card");
    nouvelleCarteProduit.classList.add("text-center");
    nouveauCorpsDeCarte = document.createElement("div");
    nouveauCorpsDeCarte.classList.add("card-body");
    nouveauCorpsDeCarte.classList.add("border");
    nouveauCorpsDeCarte.classList.add("border-dark");
    //attache
    emplacement.appendChild(nouvelArticle);
    nouvelArticle.appendChild(nouvelleCarteProduit);
    nouvelleCarteProduit.appendChild(nouveauCorpsDeCarte);
    // Création du titre et ajout de l'info
    nouveauNomProduit = document.createElement("h2");
    nouveauNomProduit.classList.add("card-title");
    nouveauCorpsDeCarte.appendChild(nouveauNomProduit);
    nouveauNomProduit.textContent = tabNom[x];
    // Création de l'image et ajout du src
    nouvelleImageProduit = document.createElement("img");
    nouvelleImageProduit.classList.add("img-thumbnail");
    nouvelleImageProduit.classList.add("img-fluid");
    nouvelleImageProduit.classList.add("shadow");
    nouvelleImageProduit.classList.add("py-5");
    nouveauCorpsDeCarte.appendChild(nouvelleImageProduit);
    nouvelleImageProduit.src = tabPhoto[x];
    // Création du Prix et ajout du src & ajout du lien avec l'ID
    nouveauPrixProduit = document.createElement("p");
    nouveauPrixProduit.classList.add("card-text");
    nouveauPrixProduit.classList.add("pt-4");
    nouveauCorpsDeCarte.appendChild(nouveauPrixProduit);
    nouveauPrixProduit.innerHTML = tabPrix[x] /100 + " EUR<br />";
    // création du texte lien page
    const texteLienProduit = "Pour plus de d&eacutetail...";
    // Création et ajout du lien avec l'ID
    nouveauLienIDProduit = document.createElement("p");
    nouveauLienIDProduit.classList.add("card-text");
    nouveauLienIDProduit.classList.add("pb-2");
    nouveauCorpsDeCarte.appendChild(nouveauLienIDProduit);
    nouveauLienIDProduit.innerHTML = "<a class='btn btn-dark btn-lg btn-md' href='" + urlProduit + "?id=" + tabID[x] + "' >" + texteLienProduit + "</a>";
}



//.then(function () { ... }): quand c'est fait, exécuter la fonction spécifiée
bddTeddy.then(function (response) {
    if (response.ok) {
        // création de ma variable comportant mon objet JSON BDD
        const jsonTableauBdd = response.json();
        return jsonTableauBdd;
    } else {
        alert("Probleme de connexion au serveur. Veuillez nous excuser.");
    }
})
    .then(function (jsonTableauBdd) {
        //Récupère le nombre d'objets
        nombreObjetBddTeddy = jsonTableauBdd.length;

        //Ajout dans les tableaux les infos récupérées
        for (let i = 0; i < nombreObjetBddTeddy; i++) {
            tabNom.push(jsonTableauBdd[i].name);
            tabPrix.push(jsonTableauBdd[i].price);
            tabID.push(jsonTableauBdd[i]._id);
            tabPhoto.push(jsonTableauBdd[i].imageUrl);
        }
        return tabNom, tabPrix, tabID, tabPhoto, nombreObjetBddTeddy;
    })
    .then(function (nombreObjetBddTeddy) {
        while (x < nombreObjetBddTeddy) {
            new nouveauProduit(carteProduit);
            x++;
        }
        return nouveauLienIDProduit;
    })
    .catch(function (error) {
        console.log("Problem avec OP fetch: " + error.message);
    });
