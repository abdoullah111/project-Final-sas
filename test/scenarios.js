const {ajouterApprenant, validerResultat, enregistrerResultat, calculerProgression} = require("../src/progression.js")

const apprenantsTest = [];

const resultat = ajouterApprenant(apprenantsTest, {
    id: 10,
    nomComplet: "Ahmed Test",
    ville: "Nador"
});

console.log(resultat);

const resultat2 = ajouterApprenant(apprenantsTest, {
    id: 10,
    nomComplet: "Youssef Test",
    ville: "Nador"
});

console.log(resultat2);

const resultat3 = validerResultat({
    jour: 3,
    exercicesTermines: 15,
    totalExercices: 20,
    challengeTermine: true
});

console.log(resultat3);


const resultat5 = enregistrerResultat(apprenantsTest, 10, {
    jour: 1,
    exercicesTermines: 18,
    totalExercices: 20,
    challengeTermine: true
});

console.log(resultat5);


const resultat6 = enregistrerResultat(apprenantsTest, 10, {
    jour: 1,
    exercicesTermines: 20,
    totalExercices: 20,
    challengeTermine: false
});

console.log(resultat6);
const stats = calculerProgression(apprenantsTest[0],{
   
})
console.log(stats)

const apprenantVide = {
    id: 20,
    nomComplet: "Test Vide",
    ville: "Nador",
    resultats: []
};

const statsVide = calculerProgression(apprenantVide);

console.log(statsVide);