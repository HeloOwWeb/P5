// JavaScript source code Page de confirmation
//clean du localstorage pour la prochaine commande
localStorage.clear();
//emplacement text
const numeroCommandeEmplacement = document.getElementById("numeroConfirmation");
const totalCommandeEmplacement = document.getElementById("totalCommande");

//je récupère mon lien URL après l'info ?
const urlConf = window.location.search;
// je crée mon paramétrage d'analyse
const params = new URLSearchParams(urlConf);
// je récupère l'information qui m'interesse
const orderID = params.get('order');
const prixTotalCommande = params.get('total');

numeroCommandeEmplacement.textContent += orderID;
totalCommandeEmplacement.textContent += prixTotalCommande;