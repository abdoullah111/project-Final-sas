const readline = require('readline');
const apprenants = require('./data.js');
const {
    ajouterApprenant,
    validerResultat,
    normaliserNom,
    recherchById,
    recherchByName,
    enregistrerResultat,
    calculerProgression,
    filtrerParNiveau,
    trierParProgression,
    afficherTableauDeBord,
    trierParNom
} = require('./progression.js');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function poserQuestion(texte) {
    return new Promise((resolve) => {
        rl.question(texte, (reponse) => resolve(reponse));
    });
}

function afficherMenu() {
    console.log("================================");
    console.log("\n|     SAS PROGRESS CONSOLE     |");
    console.log("================================");
    console.log("1. Afficher le tableau de bord");
    console.log("2. Afficher la liste des apprenants");
    console.log("3. Ajouter un apprenant");
    console.log("4. Consulter un apprenant par identifiant");
    console.log("5. Ajouter ou modifier le résultat d'une journée");
    console.log("6. Rechercher un apprenant par nom");
    console.log("7. Filtrer les apprenants par niveau");
    console.log("8. Trier les apprenants par progression décroissante");
    console.log("9. Trier les apprenants par ordre alphabétique");
    console.log("0. Quitter");
    console.log(" ");
}

async function main() {
    let continuer = true;

    while (continuer) {
        afficherMenu();
        const choix = await poserQuestion("Votre choix : ");

        switch (choix) {

            case "1": {
                console.log("-------- Afficher le tableau de bord --------");
                afficherTableauDeBord(apprenants);
                break;
            }

            case "2": {
                console.log("-------- Afficher la liste des apprenants --------");
                for (const apprenant of apprenants) {
                    console.log(`#${apprenant.id} - ${apprenant.nomComplet} (${apprenant.ville})`);
                }
                break;
            }

            case "3": {
                console.log("-------- Ajouter un apprenant --------");
                const idText = await poserQuestion("Identifiant de l'apprenant : ");
                const nomComplet = await poserQuestion("Nom complet : ");
                const ville = await poserQuestion("Ville : ");

                const id = Number(idText);
                const resultat = ajouterApprenant(apprenants, { id, nomComplet, ville });
                console.log(resultat.message);
                break;
            }

            case "4": {
                console.log("-------- Consulter un apprenant par identifiant --------");
                const idText = await poserQuestion("Identifiant de l'apprenant : ");
                const id = Number(idText);
                const apprenant = recherchById(apprenants, id);

                if (!apprenant) {
                    console.log(`Aucun apprenant trouvé avec l'id ${id}.`);
                } else {
                    console.log(apprenant);
                }
                break;
            }

            case "5": {
                console.log("-------- Ajouter ou modifier le résultat d'une journée --------");
                const idText = await poserQuestion("Identifiant de l'apprenant : ");
                const id = Number(idText);

                const jourText = await poserQuestion("Jour (1 à 7) : ");
                const jour = Number(jourText);

                const exercicesTerminesText = await poserQuestion("Exercices terminés : ");
                const exercicesTermines = Number(exercicesTerminesText);

                const totalExercicesText = await poserQuestion("Total d'exercices proposés : ");
                const totalExercices = Number(totalExercicesText);

                const challengeText = await poserQuestion("Challenge terminé (oui/non) : ");
                const challengeTermine = challengeText.trim().toLowerCase() === "oui";

                const resultat = { jour, exercicesTermines, totalExercices, challengeTermine };
                const resultatEnregistrer = enregistrerResultat(apprenants, id, resultat);
                console.log(resultatEnregistrer.message);
                break;
            }

            case "6": {
                console.log("-------- Rechercher un apprenant par nom --------");
                const nom = await poserQuestion("Nom de l'apprenant : ");
                const resultats = recherchByName(apprenants, nom);

                if (resultats.length === 0) {
                    console.log("Aucun apprenant trouvé.");
                } else {
                    for (const apprenant of resultats) {
                        console.log(`#${apprenant.id} - ${apprenant.nomComplet} (${apprenant.ville})`);
                    }
                }
                break;
            }

            case "7": {
                console.log("-------- Filtrer les apprenants par niveau --------");
                const niveau = await poserQuestion("Niveau (Solide / En progression / À renforcer) : ");
                const resultats = filtrerParNiveau(apprenants, niveau);

                if (resultats.length === 0) {
                    console.log("Aucun apprenant trouvé pour ce niveau.");
                } else {
                    for (const apprenant of resultats) {
                        const stats = calculerProgression(apprenant);
                        console.log(`#${apprenant.id} - ${apprenant.nomComplet}: ${stats.progression.toFixed(2)}%`);
                    }
                }
                break;
            }

            case "8": {
                console.log("-------- Trier par progression décroissante --------");
                const resultats = trierParProgression(apprenants);
                for (const apprenant of resultats) {
                    const stats = calculerProgression(apprenant);
                    console.log(`#${apprenant.id} - ${apprenant.nomComplet}: ${stats.progression.toFixed(2)}%`);
                }
                break;
            }

            case "9": {
                console.log("-------- Trier par ordre alphabétique --------");
                const resultats = trierParNom(apprenants);
                for (const apprenant of resultats) {
                    console.log(`#${apprenant.id} - ${apprenant.nomComplet} (${apprenant.ville})`);
                }
                break;
            }

            case "0": {
                console.log("Au revoir !");
                continuer = false;
                break;
            }

            default:
                console.log("Choix invalide.");
                break;
        }
    }

    rl.close();
}

main();