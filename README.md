# SAS Progress Console

Application console en JavaScript / Node.js pour suivre la progression des apprenants du programme SAS.
## Fonctionnalités

- Afficher le tableau de bord
- Afficher la liste des apprenants
- Ajouter un apprenant
- Consulter un apprenant par identifiant
- Ajouter ou modifier le résultat d'une journée
- Rechercher un apprenant par nom
- Filtrer les apprenants par niveau
- Trier les apprenants par progression décroissante
- Trier les apprenants par ordre alphabétique.

## Structure du projet

```text
Project-final/
├── src/
│   ├── data.js
│   ├── progression.js
│   └── index.js
├── test/
│   └── scenarios.js
└── README.md
```
Description des fichiers:
 data.js : contient les données des apprenants.
 progression.js : contient les fonctions principales de l'application.
 index.js : contient le menu et l'interaction avec l'utilisateur.
 scenarios.js : contient les scénarios de test.
 README.md : présente et explique le projet.

### Tests

Les scénarios de test se trouvent dans le fichier `test/scenarios.js`.

Pour les exécuter :

```bash
node test/scenarios.js

Les tests vérifient notamment :

l'ajout d'un apprenant
le refus d'un identifiant déjà utilisé
la validation d'un résultat
l'ajout et la modification d'un résultat
le calcul de la progression
le cas d'un apprenant sans résultat