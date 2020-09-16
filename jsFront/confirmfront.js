// JavaScript source code Page de confirmation
//clean du localstorage pour la prochaine commande
localStorage.clear();
//emplacement text
const numeroCommandeEmplacement = document.getElementById("numeroConfirmation");
const totalCommandeEmplacement = document.getElementById("totalCommande");

//je r�cup�re mon lien URL apr�s l'info ?
const urlConf = window.location.search;
// je cr�e mon param�trage d'analyse
const params = new URLSearchParams(urlConf);
// je r�cup�re l'information qui m'interesse
const orderID = params.get('order');
const prixTotalCommande = params.get('total');

numeroCommandeEmplacement.textContent += orderID;
totalCommandeEmplacement.textContent += prixTotalCommande;