# Le test d'ADEO

Bonjour, madame ou Monsieur. Merci d'avoir consulté cette repo, tout d'abord, je vais vous expliquer la structure ce project.

Les fichiers de logiciels sont réalisés par typescript dans la répertoire `./src`. Mais vous pouvez exécuter les commands `node app --filter`, `node app --count` et `node app --filter=pattern` directement, sans installer les dépandances, mais faute de coloration. Je vous recommande d'installer `Chalk` à avoir la coloration.

Les demandes de ce test est dans le fichier `./exercises.md`.

## Structure

```bash
├───dist # les résultats du build de Typescript après la transformation
│   ├───src
│   └───utils
├───src   # tous les fichiers des logiciels, aussi réalisés en Typescript
├───test  # stocker tous les tests, y compris les tests unitaires et les tests en simaulant les        commands de command-line. Toutes les fichiers sont réalisés en Typescript
├───utils  # stocker toutes les fonctions utiles
├───package.json
├───exercises.md # les demandes du test
├───tsconfig.json  # les configurations de Typescript
└───app.js # est l'entrée, elle va récupérer tous vous commands et executer
```

## Préquis

Il faur avoir installé `node`, la version est mieux au moins `16.12`.
Seule une dépendance `chalk`, qui fonctionne à afficher les mots avec les colors.
Mais si vous voulez debugger ou exécuter les tests, `npm i` ou `npm install` est nécessaire parce que elles fonctionent par `Typescript` et `ts-jest`.

## Commands

### Les commands qu'il faut pas installer les dépendances

Vous pouvez entrer les commands, tel que `node app --help` à afficher tous les commands accessibles.
`node app --count` peut afficher les résultats de comptoire.
`node app --filter=pattern` peut afficher les élements `amimals` en correspondant `pattern`.

### Les commands qu'il faut installer les dépendances

`npm run test:unit` peut exécuter tous les tests unitaires.
`npm run test:process` peut exécuter tous les tests en simulant les commands
`npm run build` peut re-compiler tous les fichers de typescript sauf les tests, mais il faut avoir les dépendances de Typescript

## Détails

### Sources

#### Validator

La fonction `isValidParameter` de la répertoire `./utils/check` est pour le but de vérifier le command, `process.argv` plus précisement, est si valide ou invalide. Selon la demande, elle accepte uniquement 3 commands `--help`, `--count` et `--filter=pattern`, tous des autres ne sont pas acceptés et le logiciel va montrer les `warnings`. Il y a 3 critère principaux, le premier est d'assurer `process.argv` soit valide, c'est-à-dire il ne peut pas être nullable, le deuxième est de vérifier la taille, il faut être au mois 3. Le final c'est pour vérifier `process.argv[2]`, si ca détecte les `input` sauf `--help`, `--count` et `--filter=pattern`, le logiciel va arrêter. Attentions,  quand il s'ait de `--filter=pattern`, il faut avoir 3 élements, et juste 3, `--filter`, `=` et `pattern`, tous doivent être valides.

#### filter

Vérifier tous les élements de `Country`, et donc tous les élements `Animal` de `People`, qui est l'élment de `Country`. Si rien de `Animal` a le nom `name` ayant le `pattern`, son parent `People` est invalide, et si rien de valid `People`, son parent `Country` est aussi invali, il va être éliminié.

#### Count

Traverser tous les élements de `Country`, tout d'abord le logiciel va compter le nombre d'élements enfants `People`, après le nombre d'éléments enfants `Animal`. Le nom d'élement `name` et le nombre de comptage vont être intégré sous le format `nom comptage`.
