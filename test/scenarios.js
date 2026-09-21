const {
    ajouterApprenant,
    validerResultat,
    enregistrerResultat,
    calculerProgression
} = require("../src/progression.js");

const apprenantsTest = [];

console.log("=== Scénario 1 : Ajout d'un apprenant valide ===");
const resultat1 = ajouterApprenant(apprenantsTest, {
    id: 10,
    nomComplet: "Ahmed Test",
    ville: "Nador"
});
console.log(resultat1);

console.log("\n=== Scénario 2 (cas invalide) : Identifiant déjà utilisé ===");
const resultat2 = ajouterApprenant(apprenantsTest, {
    id: 10,
    nomComplet: "Youssef Test",
    ville: "Nador"
});
console.log(resultat2);

console.log("\n=== Scénario 3 : Validation d'un résultat correct ===");
const resultat3 = validerResultat({
    jour: 3,
    exercicesTermines: 15,
    totalExercices: 20,
    challengeTermine: true
});
console.log(resultat3);

console.log("\n=== Scénario 4 (cas invalide) : Jour hors de la plage 1-7 ===");
const resultat4 = validerResultat({
    jour: 9,
    exercicesTermines: 15,
    totalExercices: 20,
    challengeTermine: true
});
console.log(resultat4);

console.log("\n=== Scénario 5 : Ajout du résultat du jour 1 ===");
const resultat5 = enregistrerResultat(apprenantsTest, 10, {
    jour: 1,
    exercicesTermines: 18,
    totalExercices: 20,
    challengeTermine: true
});
console.log(resultat5);

console.log("\n=== Scénario 6 : Modification du résultat existant du jour 1 ===");
const resultat6 = enregistrerResultat(apprenantsTest, 10, {
    jour: 1,
    exercicesTermines: 20,
    totalExercices: 20,
    challengeTermine: false
});
console.log(resultat6);

console.log("\n=== Scénario 7 : Calcul de la progression après modification ===");
const stats = calculerProgression(apprenantsTest[0]);
console.log(stats);

console.log("\n=== Scénario 8 : Apprenant sans aucun résultat (division par zéro) ===");
const apprenantVide = {
    id: 20,
    nomComplet: "Test Vide",
    ville: "Nador",
    resultats: []
};
const statsVide = calculerProgression(apprenantVide);
console.log(statsVide);

console.log("\n=== Scénario 9 (cas invalide) : Exercices avec nombre décimal ===");
const resultat9 = validerResultat({
    jour: 3,
    exercicesTermines:-1,
    totalExercices: 20,
    challengeTermine: true
});
console.log(resultat9);