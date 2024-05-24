// Déclaration de la variable pour stocker les URL
let myLeads = [];

// Récupération des éléments du DOM par leur ID
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

// Récupération des données du stockage local et affichage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
if (leadsFromLocalStorage) {
  // Si des données sont présentes dans le stockage local, les récupérer et les assigner à myLeads
  myLeads = leadsFromLocalStorage;
  // Appel de la fonction render pour afficher les données
  render(myLeads);
}

// Écouteur d'événement pour le bouton d'onglets
tabBtn.addEventListener("click", function () {
  // Requête pour récupérer les onglets actifs
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // Ajout de l'URL du premier onglet actif à myLeads
    myLeads.push(tabs[0].url);
    // Sauvegarde des données dans le stockage local
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    // Mise à jour de l'affichage en appelant la fonction render
    render(myLeads);
  });
});

// Fonction pour afficher les données
function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    // Construction des éléments de liste avec les URL et les liens
    listItems += `
    <li>
      <a target='_blank' href='${leads[i]}'>
        ${leads[i]}
      </a>
    </li>
    `;
  }
  // Insertion des éléments de liste dans la liste ul du DOM
  ulEl.innerHTML = listItems;
}

// Écouteur d'événement pour le bouton de suppression (double clic)
deleteBtn.addEventListener("dblclick", function () {
  // Suppression de toutes les données du stockage local
  localStorage.clear();
  // Réinitialisation du tableau myLeads à vide
  myLeads = [];
  // Mise à jour de l'affichage en appelant la fonction render
  render(myLeads);
});

// Écouteur d'événement pour le bouton d'ajout
inputBtn.addEventListener("click", function () {
  // Ajout de la valeur de l'élément d'entrée à myLeads
  myLeads.push(inputEl.value);
  // Effacement de la valeur de l'élément d'entrée
  inputEl.value = "";
  // Sauvegarde des données dans le stockage local
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  // Mise à jour de l'affichage en appelant la fonction render
  render(myLeads);
});