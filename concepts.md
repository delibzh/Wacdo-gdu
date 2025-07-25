# API Wacdo - Documentation et Concepts Clés

---

## CONCEPTS ET COURBE D'APPRENTISAGE : |

## 0. JS && TypeScript synthaxes `Ce fichier README.md me sert aussi  de référence rapide. Il regroupe plusieurs tableaux synthétiques basés sur les concepts clés utilisés dans la création de mon projet (backend Node.js + Express, MongoDB, JWT, etc.)`

`L’objectif est de garder en mémoire les éléments importants, d’avoir une vue d’ensemble structurée et de pouvoir revenir facilement sur un concept si je l’oublie ou si j’ai un doute. `

| Concept / Élément                | Description                                   | Exemple JavaScript                                          | Exemple TypeScript                                                             |           |
| -------------------------------- | --------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------ | --------- |
| **Déclaration variable**         | Variables modifiables ou constantes           | `let age = 30;`<br>`const name = "Guillaume";`              | `let age: number = 30;`<br>`const name: string = "Guillaume";`                 |           |
| **Fonction simple**              | Déclaration d’une fonction                    | `function add(a, b) { return a + b; }`                      | `function add(a: number, b: number): number { return a + b; }`                 |           |
| **Fonction fléchée**             | Syntaxe courte pour fonctions anonymes        | `const greet = (name) => "Hello " + name;`                  | `const greet = (name: string): string => "Hello " + name;`                     |           |
| **Objet littéral**               | Création d’un objet                           | `const user = { id: 1, name: "Jean" };`                     | `const user: { id: number; name: string } = { id: 1, name: "Jean" };`          |           |
| **Tableaux**                     | Liste de valeurs                              | `const nums = [1, 2, 3];`                                   | `const nums: number[] = [1, 2, 3];`                                            |           |
| **Interfaces / Types**           | Définir la forme d’un objet (TS uniquement)   | —                                                           | `interface User { id: number; name: string; }`                                 |           |
| **Classes**                      | Définition d’une classe                       | `class User { constructor(name) { this.name = name; } }`    | `class User { name: string; constructor(name: string) { this.name = name; } }` |           |
| **Import / Export (CommonJS)**   | Importer/exporter des modules (Node.js style) | `const fs = require('fs');` <br> `module.exports = myFunc;` | — (moins utilisé en TS, voir ES Modules)                                       |           |
| **Import / Export (ES Modules)** | Syntaxe standard moderne                      | `import fs from 'fs';` <br> `export function myFunc() {}`   | Même syntaxe que JS                                                            |           |
| **Types primitifs**              | Types de base (TS uniquement)                 | —                                                           | `string`, `number`, `boolean`, `any`, `void`                                   |           |
| **Fonctions async/await**        | Gestion asynchrone                            | `async function foo() { await bar(); }`                     | Même syntaxe                                                                   |           |
| **Gestion des erreurs**          | Try/catch                                     | `try { ... } catch() { ... }`                               | Même syntaxe                                                                   |           |
| **Assertion de type**            | Forcer un type (TS uniquement)                | —                                                           | `const input = someValue as string;`                                           |           |
| **Paramètres optionnels**        | Paramètre non obligatoire (TS uniquement)     | —                                                           | `function fn(name?: string) {}`                                                |           |
| **Union Types**                  | Plusieurs types possibles (TS uniquement)     | —                                                           | \`let id: string                                                               | number;\` |
| **Nullish coalescing**           | Valeur par défaut si null ou undefined        | `const name = input ?? "Default";`                          | Même syntaxe                                                                   |           |

---

## 0.5 JSON :

| Concept / Élément        | Description                                               | Exemple / Notes                                                   |
| ------------------------ | --------------------------------------------------------- | ----------------------------------------------------------------- |
| **Fichier `.json`**      | Format texte léger pour stocker des données structurées   | JSON = JavaScript Object Notation, facile à lire/écrire           |
| **Usage principal**      | Stocker configurations, données, échanges API             | `package.json`, `config.json`, fichiers de données                |
| **Syntaxe de base**      | Clés et valeurs, paires séparées par virgules             | `{ "name": "Guillaume", "age": 30 }`                              |
| **Types de valeurs**     | String, number, boolean, array, object, null              | `"active": true`, `"tags": ["dev", "js"]`                         |
| **Pas de fonctions**     | JSON ne supporte pas fonctions ni commentaires            | Contrairement au JS, JSON est strictement données                 |
| **Lire un fichier JSON** | Avec Node.js, utiliser `fs.readFile` puis `JSON.parse()`  | `const data = JSON.parse(fs.readFileSync('file.json', 'utf-8'));` |
| **Écrire un JSON**       | `JSON.stringify(obj)` convertit un objet JS en texte JSON | `fs.writeFileSync('file.json', JSON.stringify(data));`            |
| **`package.json`**       | Fichier clé d’un projet Node.js avec métadonnées          | Contient scripts, dépendances, version, nom du projet             |
| **Syntaxe JSON vs JS**   | JSON : clés en double quotes obligatoires, JS non         | JSON : `{ "key": "value" }` <br> JS : `{ key: "value" }` possible |
| **Validation JSON**      | Doit être valide sinon erreur (ex: pas de virgule finale) | Outils en ligne ou VSCode intégrés pour valider                   |
| **Utilisation dans API** | Échanges de données (requêtes/réponses en JSON)           | Serveur envoie `res.json(data)` pour envoyer JSON au client       |
| **Avantage**             | Format universel, lisible par humains et machines         | Supporté par presque tous les langages de programmation           |

---

## 1. Bases d’Express (Routes, Requêtes, Réponses)

| Concept / Partie      | Description                                          | Exemple / Notes                                                                        |
| --------------------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Route                 | Chemin URL où le serveur écoute                      | `app.get('/products', productController.getAllProducts)`                               |
| Verbe HTTP            | Action effectuée (GET, POST, PUT, DELETE, PATCH)     | GET = lire, POST = créer, PUT = modifier, DELETE = supprimer                           |
| Paramètres dynamiques | Variables dans l’URL accessibles via `req.params`    | `/products/:id` → `req.params.id`                                                      |
| Body-parser           | Middleware pour parser le corps des requêtes (JSON)  | `app.use(express.json())`                                                              |
| REQ RES NEXT          | Objets fondamentaux dans Express                     | `req` = requête client, `res` = réponse serveur, `next` = passer au middleware suivant |
| Réponse               | Envoi de données au client via `res.status().json()` | `res.status(200).json(data)`                                                           |

---

## 2. Node.js & Modules (Export / Import)

| Syntaxe export           | Syntaxe import                          | Usage                                     |
| ------------------------ | --------------------------------------- | ----------------------------------------- |
| `module.exports = func`  | `const func = require('./file')`        | Export d’une seule fonction               |
| `exports.nomFunc = func` | `const { nomFunc } = require('./file')` | Export multiple fonctions dans un fichier |

---

## 3. Création de Models & Schema Mongoose

| Concept            | Description                                                | Exemple / Notes                                         |
| ------------------ | ---------------------------------------------------------- | ------------------------------------------------------- |
| Schema             | Structure d’un document MongoDB                            | `const userSchema = new mongoose.Schema({...})`         |
| Model              | Objet Mongoose qui permet d’interagir avec la collection   | `const User = mongoose.model('User', userSchema)`       |
| Types              | `String`, `Number`, `Boolean`, `Date`, `Array`, `ObjectId` | Exemple : `{ username: String, age: Number }`           |
| Required           | Indique un champ obligatoire                               | `{ email: { type: String, required: true } }`           |
| Enum               | Valeurs autorisées pour un champ                           | `{ role: { type: String, enum: ['admin', 'client'] } }` |
| Méthodes & Statics | Fonctions personnalisées sur schema/model                  | `userSchema.methods.checkPassword = function() {...}`   |

---

## 4. Gestion des fichiers avec `fs` et `fs.promises`

| Fonction / Module    | Description                                       | Exemple                                           |
| -------------------- | ------------------------------------------------- | ------------------------------------------------- |
| `fs`                 | Module Node.js pour manipuler fichiers (callback) | `fs.readFile('file.txt', (err, data) => { ... })` |
| `fs.promises`        | Version avec promesses pour `async/await`         | `const fs = require('fs').promises;`              |
| Lire un fichier      | Lecture asynchrone                                | `await fs.readFile('file.txt', 'utf-8')`          |
| Supprimer un fichier | Supprimer fichier                                 | `await fs.unlink('path/to/file.jpg')`             |
| Écrire un fichier    | Créer ou modifier un fichier                      | `await fs.writeFile('file.txt', 'contenu')`       |

---

## 5. Gestion des rôles et sécurité dans l’API

| Concept / Outil         | Description                                           | Exemple / Pratique                                                                                  |
| ----------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Hashage de mot de passe | Protéger les mots de passe avec bcrypt                | `bcrypt.hash(password, saltRounds)`                                                                 |
| JWT (JSON Web Token)    | Jeton sécurisé pour authentification stateless        | Générer avec `jsonwebtoken.sign()`, vérifier avec `verify()`                                        |
| Middleware d’auth       | Vérifie la validité du token avant la route           | `authMiddleware(req, res, next)`                                                                    |
| Middleware de rôle      | Vérifie si l’utilisateur a les droits nécessaires     | `roleMiddleware(['admin', 'preparation'])`                                                          |
| Protéger les routes     | Ajouter middlewares d’auth et de rôle                 | `app.post('/products', authMiddleware, roleMiddleware(['admin']), productController.createProduct)` |
| Gestion des erreurs     | Renvoi 401/403 quand l’utilisateur n’est pas autorisé | `res.status(401).json({ message: "Non autorisé" })`                                                 |

---

## 6. Fonctionnement `findById` (et requêtes Mongoose)

| Élément                | Explication                                            |
| ---------------------- | ------------------------------------------------------ |
| `Product.findById(id)` | Cherche un document par son `_id`                      |
| Retour                 | Un objet avec les données, ou `null` si rien trouvé    |
| `id`                   | Doit venir de `req.params.id` ou autre                 |
| Opération asynchrone   | Utilise `await` ou `.then()` pour récupérer la réponse |

---

## 7. Promesses & Async/Await

| Concept          | Description                                   | Exemple                                      |
| ---------------- | --------------------------------------------- | -------------------------------------------- |
| Promise          | Objet qui représente une opération asynchrone | `Product.findById(id).then(...).catch(...)`  |
| `async` function | Fonction qui retourne une promesse            | `async function foo() { ... }`               |
| `await`          | Attend la résolution d’une promesse           | `const product = await Product.findById(id)` |

---

## 8. Tests unitaires avec Jest et Supertest

| Concept / Outil    | Description                                        | Exemple / Commandes                                |
| ------------------ | -------------------------------------------------- | -------------------------------------------------- |
| Jest               | Framework de test JavaScript facile à utiliser     | `npm install jest --save-dev`                      |
| Supertest          | Librairie pour tester les endpoints HTTP           | `npm install supertest --save-dev`                 |
| Script test        | Commande dans `package.json` pour lancer les tests | `"test": "jest"`                                   |
| Test unitaire      | Teste une fonction isolée                          | `test('addition', () => expect(add(2,3)).toBe(5))` |
| Test d’API         | Teste les routes avec requêtes HTTP simulées       | `request(app).get('/products').expect(200)`        |
| Rapport couverture | Statistiques de code testé                         | `jest --coverage`                                  |

---

## 9. Gestion des erreurs (Middleware d’erreur)

| Concept             | Description                                                           | Exemple / Code                                     |
| ------------------- | --------------------------------------------------------------------- | -------------------------------------------------- | --- | ---------------------------------- |
| Middleware d’erreur | Fonction qui capte les erreurs passées via `next(error)`              | `(err, req, res, next) => { ... }`                 |
| `next(error)`       | Transmet l’erreur au middleware d’erreur global                       | `catch(error) { next(error); }`                    |
| Codes d’erreur      | 400, 401, 404, 500 etc.                                               | `res.status(404).json({ message: "Introuvable" })` |
| Erreurs spécifiques | Ex: `CastError` (ID Mongo invalide), `TokenExpiredError` (JWT expiré) | `if (err.name === 'CastError') {...}`              |
| Réponse générique   | Renvoie une erreur 500 si pas d’erreur prévue                         | `res.status(err.status                             |     | 500).json({message: err.message})` |

---

## 10. SWAGGER :

| Concept / Élément         | Description                                                    | Exemple / Notes                                                                              |
| ------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **OpenAPI / Swagger**     | Spécification standard pour documenter et décrire une API REST | Format YAML ou JSON utilisé pour décrire routes, schémas, etc.                               |
| **`info`**                | Informations sur l’API : titre, version, description           | `info: { title: "API Wacdo", version: "1.0.0" }`                                             |
| **`servers`**             | URL(s) de base pour accéder à l’API                            | `servers: [{ url: "http://localhost:3000/api" }]`                                            |
| **`paths`**               | Définition des endpoints (routes)                              | `/products: get: summary: "Liste des produits"`                                              |
| **Méthodes HTTP**         | GET, POST, PUT, DELETE, PATCH pour chaque route                | Sous chaque `path`, définir les méthodes autorisées                                          |
| **`parameters`**          | Variables d’URL, query params, headers                         | `{ in: "path", name: "id", required: true, schema: { type: "string" } }`                     |
| **`requestBody`**         | Corps de la requête (ex : données JSON envoyées)               | `content: { "application/json": { schema: { $ref: "#/components/schemas/ProductInput" } } }` |
| **`responses`**           | Définition des codes HTTP retournés et leur contenu            | `"200": { description: "Succès", content: { ... } }`                                         |
| **`components`**          | Schémas, sécurité, définitions réutilisables                   | `schemas: { ProductInput: { type: "object", properties: { ... } } }`                         |
| **`securitySchemes`**     | Méthodes d’authentification comme JWT Bearer                   | `bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" }`                        |
| **Tester via Swagger UI** | Interface graphique auto-générée pour tester les endpoints     | Permet d’envoyer des requêtes directement depuis le navigateur                               |
| **Tags**                  | Grouper les endpoints par catégories                           | `tags: ["Utilisateurs", "Produits", "Commandes"]`                                            |

# TEST REALISE AVEC SWAGGER : Inscription(✅), Login(✅), getAllUsers(✅), getAllProduct(✅), createProduct(✅), getOneProduct(✅),

# modifyProduct(✅), deleteProduct(✅), createMenu(✅), getAllMenu(✅), createOrder(✅), getOrderbyId(✅), updateOrder(✅), deleteOrder(✅), ++ SCHEMA GOOD

## 11. REQ, RES, NEXT dans Express

| Élément              | Description                                                | Exemples / Utilisation courante                                                                                                                                                                                          |
| -------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`req` (Request)**  | Objet qui contient tout ce que le client envoie au serveur | - `req.params.id` → paramètre d'URL (`/products/:id`)<br>- `req.body` → données envoyées en POST/PUT<br>- `req.query` → paramètres dans l’URL (`?search=burger`)<br>- `req.headers` → en-têtes HTTP (ex : Authorization) |
| **`res` (Response)** | Objet utilisé pour envoyer la réponse au client            | - `res.status(200).json({})` → réponse JSON avec statut 200<br>- `res.send("OK")` → réponse texte<br>- `res.redirect('/login')` → redirection vers une autre route                                                       |
| **`next`**           | Fonction qui passe au middleware ou à la route suivante    | - `next()` → continuer avec le middleware suivant<br>- `next(error)` → passer à la gestion d’erreur globale                                                                                                              |

---

# 12 PARSE JSON :

| Ce que tu envoies dans la requête                 | Type de `Content-Type` | Ce que contient `req.body`                       | Faut-il utiliser `JSON.parse()` ? |
| ------------------------------------------------- | ---------------------- | ------------------------------------------------ | --------------------------------- |
| Uniquement des données JSON                       | `application/json`     | Un objet JavaScript (déjà parsé automatiquement) | Non                               |
| Données **+ image** (ex: formulaire avec fichier) | `multipart/form-data`  | Des chaînes de texte (ex : `product = "{...}"`)  | Oui                               |

# 13 CREATE ORDER Sythaxe découpée :

| Code                                                     | Explication                                                                                                                   |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | --- | ------------------------ | ---------------------------------------------- |
| `exports.createOrder = async (req, res, next)`           | Déclare une fonction asynchrone exportée qui reçoit la requête (`req`), la réponse (`res`) et le middleware suivant (`next`). |
| `try {`                                                  | Démarre un bloc pour gérer les erreurs proprement.                                                                            |
| `const { products, clientInfo, totalPrice } = req.body;` | Récupère les données envoyées par le client.                                                                                  |
| \`if (!products                                          | !Array.isArray(products)                                                                                                      |     | products.length === 0)\` | Vérifie que `products` est une liste non vide. |
| `return res.status(400).json(...)`                       | Si non valide, renvoie une erreur 400 avec un message.                                                                        |
| `const orderId = uuidv4();`                              | Génère un identifiant unique pour la commande.                                                                                |
| `const newOrder = new Order({...})`                      | Crée une nouvelle instance de commande avec les données.                                                                      |
| `await newOrder.save();`                                 | Sauvegarde la commande dans la base MongoDB.                                                                                  |
| `res.status(201).json(newOrder);`                        | Renvoie la commande créée au client (code 201).                                                                               |
| `} catch (error) { next(error); }`                       | En cas d’erreur, on la passe au gestionnaire Express via `next`.                                                              |

# ModifyOrder :

| Ligne de code                                       | Explication                                                                            |
| --------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `exports.modifyOrder = async (req, res, next) => {` | Création d’une route pour **modifier une commande**.                                   |
| `await Order.findOneAndUpdate(...);`                | On cherche la commande par `orderId`, et on met à jour avec les données de `req.body`. |
| `{ new: true }`                                     | Ce paramètre permet de **retourner la version modifiée** de la commande.               |
| `if (!updatedOrder)`                                | Si aucune commande n’est trouvée avec cet `orderId`, on retourne une erreur **404**.   |
| `res.status(200).json(updatedOrder);`               | Sinon, on retourne la commande mise à jour avec un statut **200**.                     |
| `catch (error) { next(error); }`                    | On capture toute erreur et on la transmet au middleware global.                        |

# getOrderById :

| Ligne de code                                                    | Explication                                                                                                          |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `exports.getOrderById = async (req, res, next) => {`             | On crée une fonction asynchrone pour récupérer **une commande** par son `orderId`, passé dans l’URL (`/orders/:id`). |
| `const order = await Order.findOne({ orderId: req.params.id });` | On recherche une commande dont le champ `orderId` correspond au `:id` reçu dans l’URL.                               |
| `if (!order) { ... }`                                            | Si aucune commande n’est trouvée, on retourne une **erreur 404** (ressource non trouvée).                            |
| `res.status(200).json(order);`                                   | Si la commande est trouvée, on la retourne avec le code **200** (succès).                                            |
| `catch (error) { next(error); }`                                 | En cas de bug (ex : problème DB), on envoie l’erreur à ton **middleware `errorHandler`**.                            |

# deleteOrder :

| Code                                                                | Explication                                                          |
| ------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `exports.deleteOrder = async (req, res, next)`                      | Fonction asynchrone exportée qui gère la suppression d’une commande. |
| `try {`                                                             | Démarre un bloc sécurisé pour capturer les erreurs.                  |
| `const order = await Order.findOne({ orderId: req.params.id });`    | Recherche une commande via son `orderId` passé en paramètre d’URL.   |
| `if (!order)`                                                       | Si aucune commande n’est trouvée…                                    |
| `return res.status(404).json({ message: "Commande non trouvée" });` | …renvoie une erreur 404 au client.                                   |
| `await Order.deleteOne({ orderId: req.params.id });`                | Supprime la commande de la base MongoDB.                             |
| `res.status(200).json({ message: "Commande supprimée" });`          | Répond avec un message de succès.                                    |
| `} catch (error) { next(error); }`                                  | En cas d’erreur, passe l’erreur au middleware `errorHandler`.        |

# CommonJS vs ES module :

| Format           | Syntaxe                  | Exemple                                             |
| ---------------- | ------------------------ | --------------------------------------------------- |
| CommonJS         | `require()` / `exports.` | `const fs = require("fs")`<br>`module.exports = {}` |
| ES Modules (ESM) | `import` / `export`      | `import fs from "fs"`<br>`export default {}`        |

// Le message :

    "File is a CommonJS module; it may be converted to an ES module"

        signifie que le fichier utilise la syntaxe CommonJS
        (ancienne norme de Node.js, avec require et module.
        exports ou exports.), et il pourrait être
        converti en syntaxe ES Module (plus récente, avec import
        et export).

| ---------------- | ------------------------ | --------------------------------------------------- |
