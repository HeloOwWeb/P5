//fetch(url) : r�cup�rer la ressource situ�e � l'adresse url
const bddTeddy = fetch('http://localhost:3000/api/teddies/');
// variable nombre de peluche
let nombreObjetBddTeddy;
// tableau des noms de peluche
const tabNom = [];
const tabPhoto = [];
const tabID = [];
const tabPrix = [];
// Emplacement de ma grille Produits & emplacement du contenu dynamique Produit & emplacement Titre produit & emplacement Description produit
let carteProduit = document.getElementById('cardProduit');
let nouveauCorpsDeCarte;
let nouveauNomProduit;
let nouvelleImageProduit;
let nouveauPrixProduit;
const urlProduit = 'produit.html';
let nouveauLienIDProduit;
let x = 0;

//Cr�ation de ma fonction nouveaux �l�ments avec leur class Bootstrap pour un emplacement produit
function nouveauProduit(emplacement) {
    const nouvelArticle = document.createElement("article");
    nouvelArticle.classList.add("col-12");
    nouvelArticle.classList.add("my-5");
    nouvelArticle.classList.add("col-lg-5");
    const nouvelleCarteProduit = document.createElement("div");
    nouvelleCarteProduit.classList.add("card");
    nouvelleCarteProduit.classList.add("text-center");
    const nouveauCorpsDeCarte = document.createElement("div");
    nouveauCorpsDeCarte.classList.add("card-body");
    nouveauCorpsDeCarte.classList.add("border");
    nouveauCorpsDeCarte.classList.add("border-dark");
    //attache
    emplacement.appendChild(nouvelArticle);
    nouvelArticle.appendChild(nouvelleCarteProduit);
    nouvelleCarteProduit.appendChild(nouveauCorpsDeCarte);
    // Cr�ation du titre et ajout de l'info
    nouveauNomProduit = document.createElement("h2");
    nouveauNomProduit.classList.add("card-title");
    nouveauNomProduit.classList.add("py-4");
    nouveauCorpsDeCarte.appendChild(nouveauNomProduit);
    nouveauNomProduit.textContent = tabNom[x];
    // Cr�ation de l'image et ajout du src
    nouvelleImageProduit = document.createElement("img");
    nouvelleImageProduit.classList.add("img-thumbnail");
    nouvelleImageProduit.classList.add("img-fluid");
    nouvelleImageProduit.classList.add("shadow");
    nouvelleImageProduit.classList.add("py-5");
    nouveauCorpsDeCarte.appendChild(nouvelleImageProduit);
    nouvelleImageProduit.src = tabPhoto[x];
    // Cr�ation du Prix et ajout du src & ajout du lien avec l'ID
    nouveauPrixProduit = document.createElement("p");
    nouveauPrixProduit.classList.add("card-text");
    nouveauPrixProduit.classList.add("pt-4");
    nouveauCorpsDeCarte.appendChild(nouveauPrixProduit);
    nouveauPrixProduit.innerHTML = tabPrix[x] /100 + ' EUR<br />';
    // cr�ation du texte lien page
    const texteLienProduit = "Pour plus de d&eacutetail...";
    // Cr�ation et ajout du lien avec l'ID
    nouveauLienIDProduit = document.createElement("p");
    nouveauLienIDProduit.classList.add("card-text");
    nouveauLienIDProduit.classList.add("pb-4");
    nouveauCorpsDeCarte.appendChild(nouveauLienIDProduit);
    nouveauLienIDProduit.innerHTML = "<a class='btn btn-dark btn-lg btn-md' href='" + urlProduit + "?id=" + tabID[x] + "' >" + texteLienProduit + "</a>";
}



//.then(function () { ... }): quand c'est fait, ex�cuter la fonction sp�cifi�e
bddTeddy.then(function (response) {
    // cr�ation de ma variable comportant mon objet JSON BDD
    const jsonTableauBdd = response.json();
    return jsonTableauBdd;
})
    .then(function (jsonTableauBdd) {
        //R�cup�re le nombre d'objets
        nombreObjetBddTeddy = jsonTableauBdd.length;

        //Ajout dans les tableaux les infos r�cup�r�es
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
    });
