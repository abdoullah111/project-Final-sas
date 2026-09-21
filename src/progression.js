function normaliserNom(nom) {
    if (nom === null || nom === undefined || nom.trim() === "") {
        return null;
    } else {
        return nom.trim().replace(/[^\p{L}\p{N}\s]/gu, '').toLowerCase();
    }
}

function ajouterApprenant(apprenants, nouvelApprenant) {
    const { id, nomComplet, ville } = nouvelApprenant;
    let existe = false;
    for (const a of apprenants) {
        if (a.id === id) {
            existe = true;
            break;
        }
    }
    if (existe) {
        return { succes: false, message: `Un apprenant avec l'id ${id} existe déjà.` };
    } else if (!nomComplet || !ville) {
        return { succes: false, message: "Le nom complet et la ville sont obligatoires." };
    }

    const apprenant = {
        id,
        nomComplet: normaliserNom(nomComplet),
        ville: ville.trim(),
        resultats: []
    };
    apprenants.push(apprenant);
    return { succes: true, message: `Apprenant ${apprenant.nomComplet} ajouté avec succès.` };


}

function validerResultat(resultat) {
    const { jour, exercicesTermines, totalExercices } = resultat;

    if (!Number.isInteger(jour) || jour < 1 || jour > 7) {
        return { valide: false, message: "Le jour doit être un nombre compris entre 1 et 7." };
    }

    if (!Number.isInteger(exercicesTermines) || !Number.isInteger(totalExercices)) {
        return { valide: false, message: "Les exercices doivent être des nombres entiers." };
    }

    if (exercicesTermines < 0 || totalExercices < 0) {
        return { valide: false, message: "Les nombres d'exercices ne peuvent pas être négatifs." };
    }

    if (exercicesTermines > totalExercices) {
        return { valide: false, message: "Le nombre d'exercices terminés dépasse le total proposé." };
    }

    return { valide: true, message: "Résultat valide." };
}

function recherchById(apprenants, id) {
    const idNum = Number(id);
    for (const a of apprenants) {
        if (a.id === idNum) {
            return a;
        }
    }
    return null;
}

function recherchByName(apprenants, name) {
    if (name === null || name === undefined || name.trim() === "") {
        return [];
    }

    const byUser = normaliserNom(name);
    const result = [];

    for (const a of apprenants) {
        if (normaliserNom(a.nomComplet).includes(byUser)) {
            result.push(a);
        }
    }
    return result;
}

function enregistrerResultat(apprenants, id, resultat) {
    const apprenant = recherchById(apprenants, id);

    if (!apprenant) {
        return { succes: false, message: `Aucun apprenant trouvé avec l'id ${id}.` };
    }

    const validation = validerResultat(resultat);
    if (!validation.valide) {
        return { succes: false, message: validation.message };
    }

    let resultatExistant = null;
    for (const r of apprenant.resultats) {
        if (r.jour === resultat.jour) {
            resultatExistant = r;
            break;
        }
    }  

    if (resultatExistant) {
        resultatExistant.exercicesTermines = resultat.exercicesTermines;
        resultatExistant.totalExercices = resultat.totalExercices;
        resultatExistant.challengeTermine = resultat.challengeTermine;
        return { succes: true, message: `Le résultat du jour ${resultat.jour} a été modifié avec succès.` };
    } else {
        apprenant.resultats.push(resultat);
        return { succes: true, message: `Le résultat du jour ${resultat.jour} a été ajouté avec succès.` };
    }
}

function calculerProgression(apprenant) {
    let exercicesTermines = 0;
    let exercicesProposes = 0;
    let challengesTermines = 0;

    for (const resultat of apprenant.resultats) {
        exercicesTermines += resultat.exercicesTermines;
        exercicesProposes += resultat.totalExercices;
        if (resultat.challengeTermine === true) {
            challengesTermines++;
        }
    }

    let progression = 0;
    if (exercicesProposes > 0) {
        progression = (exercicesTermines / exercicesProposes) * 100;
    }

    const jours = apprenant.resultats.length;

    return {
        exercicesTermines,
        exercicesProposes,
        progression,
        challengesTermines,
        jours
    };
}

function filtrerParNiveau(apprenants, niveau) {
    const resultat = [];
    for (const apprenant of apprenants) {
        const stats = calculerProgression(apprenant);
        let niveauApprenant;
        if (stats.progression >= 80) {
            niveauApprenant = "Solide";
        } else if (stats.progression >= 50) {
            niveauApprenant = "En progression";
        } else {
            niveauApprenant = "À renforcer";
        }
        if (niveauApprenant === niveau){
            resultat.push(apprenant);
        }
    }
    return resultat;
}

function trierParProgression(apprenants) {
    const resultat = [...apprenants];
    resultat.sort((a, b) => {
        const progressionA = calculerProgression(a).progression;
        const progressionB = calculerProgression(b).progression;
        return progressionB - progressionA;
    });
    return resultat;
}

function trierParNom(apprenants) {
    const resultat = [...apprenants];
    resultat.sort((a, b) => a.nomComplet.localeCompare(b.nomComplet));
    return resultat;
}

function afficherTableauDeBord(apprenants) {
    const totalApprenants = apprenants.length;

    let totalProgression = 0;
    for (const apprenant of apprenants) {
        const stats = calculerProgression(apprenant);
        totalProgression += stats.progression;
    }

    let moyenneProgression = 0;
    if (totalApprenants > 0) {
        moyenneProgression = totalProgression / totalApprenants;
    }

    let solide = 0;
    let enProgression = 0;
    let aRenforcer = 0;
    for (const apprenant of apprenants) {
        const stats = calculerProgression(apprenant);
        if (stats.progression >= 80) {
            solide++;
        } else if (stats.progression >= 50) {
            enProgression++;
        } else {
            aRenforcer++;
        }
    }

    console.log(`Nombre total d'apprenants : ${totalApprenants}`);
    console.log(`Moyenne de progression : ${moyenneProgression.toFixed(2)}%`);
    console.log(`Solide : ${solide}`);
    console.log(`En progression : ${enProgression}`);
    console.log(`À renforcer : ${aRenforcer}`);
    console.log("");

    const tries = trierParProgression(apprenants);
    for (const apprenant of tries) {
        const stats = calculerProgression(apprenant);
        console.log(`${apprenant.nomComplet}: ${stats.progression.toFixed(2)}%`);

        const joursManquants = 7 - stats.jours;
        const challengesManquants = stats.jours - stats.challengesTermines;

        console.log(`  Jours manquants : ${joursManquants}`);
        console.log(`  Challenges manquants : ${challengesManquants}`);
    }
}

module.exports = {
    normaliserNom,
    ajouterApprenant,
    validerResultat,
    recherchById,
    recherchByName,
    enregistrerResultat,
    calculerProgression,
    filtrerParNiveau,
    trierParProgression,
    trierParNom,
    afficherTableauDeBord
};