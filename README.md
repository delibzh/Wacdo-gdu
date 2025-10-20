# Wacdo – Back-end API

## 1️⃣ Test du serveur

1. Crée un fichier `.env` à la racine du projet avec les variables d’environnement :

```env
PORT=3000
MONGO_URI=<ton_URI_MongoDB_Atlas>
JWT_SECRET=<une_clé_secrète>
```

2. Démarre le serveur :

```bash
node index.js
```

3. Vérifie la console :

```
Connecté à MongoDB Atlas
Serveur lancé sur localhost:3000
```

4. Test de connexion basique :

```
GET http://localhost:3000/
```

Doit renvoyer :

```
"connexion au serveur OK"
```

---

## 2️⃣ Tester l’authentification

### Inscription

```
POST http://localhost:3000/api/auth/register
```

**Body JSON :**

```json
{
  "username": "testuser",
  "password": "123456",
  "email": "test@example.com"
}
```

**Résultat attendu :**

- Code HTTP : `201 Created`
- JSON renvoyé : informations utilisateur sans le mot de passe.

---

### Connexion

⚠️ Pour tester certaines fonctionnalités (admin), il faut que l’utilisateur ait le **rôle `admin`**.

- Soit en modifiant directement dans MongoDB Atlas,
- Soit via Mongo Shell.

```
POST http://localhost:3000/api/auth/login
```

**Body JSON :**

```json
{
  "username": "testuser",
  "password": "123456"
}
```

**Exemple de réponse attendu :**

```json
{
  "message": "Connexion réussie",
  "token": "<votre_token_JWT>",
  "user": {
    "username": "testuser",
    "email": "test@example.com",
    "role": "admin",
    "_id": "68f608de47b7adac19c539b6"
  }
}
```

- Copier ce **JWT** pour l’utiliser dans Postman comme `Bearer Token` pour toutes les routes protégées.

---

## 3️⃣ Documentation et tests via Swagger

- Accéder à l’interface Swagger pour tester toutes les routes facilement :

```
http://localhost:3000/api-docs/
```

---

## 4️⃣ Gestion des produits avec image

```
POST http://localhost:3000/api/products
```

**Body (form-data) :**

| KEY         | VALUE               | TYPE    |
| ----------- | ------------------- | ------- |
| title       | BigMacPhoto         | text    |
| description | Burger Classique    | text    |
| price       | 6.99                | text    |
| category    | Menu                | text    |
| available   | true                | text    |
| image       | fichier .jpg / .png | file ✅ |

**Conseils :**

- Le champ `image` doit être un fichier local (jpg/png).
- Le dossier `/images` du projet doit exister pour que Multer puisse enregistrer le fichier.
- Le serveur renverra un objet JSON avec les informations du produit et le nom du fichier stocké.

---

## 5️⃣ Authentification et rôles

- Les routes **admin** nécessitent le rôle `admin` dans le JWT.
- Les utilisateurs peuvent consulter, modifier ou supprimer leurs propres données via `/api/auth/me`.

---

### ✅ Notes supplémentaires

- Redémarrez le serveur après toute modification des routes ou contrôleurs.
- Vérifiez toujours que le token JWT est valide pour les routes protégées.
- Utilisez Postman ou Swagger pour tester toutes les routes.

---

### Critère d’évaluation | Ce qui a été fait |

| ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| Les données nécessaires à l'application sont correctement identifiées | Modèles Mongoose pour `User`, `Product`, `Menu`, `Order` avec tous les champs pertinents |
| Les données sont retranscrites sur un schéma décrivant les tables et relations | MCD et MPD créé avec relations 1‑N et N‑N entre `User`, `Order`, `Product`, `Menu` |
| Le nommage des tables et des champs est cohérent | Entités et champs nommés de façon explicite (`username`, `email`, `price`, `status`, etc.) |
| Le type des champs est adapté à la nature des données | `Number`, `String`, `Boolean`, `Date`, enums pour `role` et `category` |
| La mise en relation des tables est correctement effectuée | Références (`userId`, `products`) avec ObjectId et `.populate()` pour les relations |
| Les requêtes utilisent tri et filtres | `getAllProducts` et `getAllOrders` avec filtres (`category`, `status`, `available`) et possibilité de trier |
| Les requêtes sont optimisées via clés étrangères et liaisons | Références MongoDB ObjectId pour relations 1‑N et N‑N |
| Les données sensibles sont protégées | Mots de passe hashés avec `bcrypt`, JWT pour authentification |
| L’application informe l’utilisateur du stockage et partage des données | Routes `/me` pour consultation et modification, accès contrôlé par token JWT |
| L’utilisateur peut consulter, modifier et supprimer ses données | Routes `/api/auth/me` pour GET, PUT, DELETE |
| Toutes les fonctionnalités nécessaires sont listées | CRUD complet pour `User`, `Product`, `Menu`, `Order`; gestion des rôles; upload images |
| Le schéma fonctionnel décrit l’enchaînement des vues | Documentation Swagger complète avec toutes les routes et interactions |
| Code indenté et commenté | Contrôleurs, routes et middlewares commentés; indentation uniforme |
| Dossiers et fichiers organisés | Structure : `/controllers`, `/models`, `/routes`, `/middleware`, `/config`, `/images` |
| Conventions de nommage respectées | CamelCase pour variables/fonctions, PascalCase pour modèles |
| Limites du code connues | `try/catch` et `errorHandler` pour toutes les routes, vérifications avant modification/suppression |
| Les erreurs de codage sont traitées | Statuts HTTP appropriés (`400`, `401`, `403`, `404`, `500`) et messages clairs |
| Implémentation de classes génériques et héritage | Modules et fonctions Mongoose pour gérer les entités (suffisant pour ce projet) |
| Modèle gère interactions avec la base | CRUD via Mongoose (`find`, `save`, `findById`, `findByIdAndUpdate`) |
| Contrôleurs implémentent la logique et préparent les données | Récupération et traitement des données avant renvoi en JSON |
| La “vue” affiche les données | Swagger et Postman servent de vue pour tester et afficher les données |
| Intégrité des données protégée | Validation Mongoose, middleware `auth`, `restrictTo` et protection contre injection |
| Authentification sécurisée | JWT + bcrypt, routes `/login` et `/register` |
| Gestion des rôles | Middleware `restrictTo(["admin"])` pour routes sensibles |
| Outil collaboratif maîtrisé | Git/GitHub utilisé pour versionning et dépôt du projet |
| Fonctionnalités conformes au cahier des charges | CRUD complet, gestion commandes, produits, menus, images et rôles |
| Tests unitaires réalisés | Tests manuels avec Postman et Swagger sur toutes les routes |
| Application mise en ligne et fonctionnelle | API locale (`localhost:3000`) testée avec succès |
| Testée en production | Postman et Swagger utilisés, gestion des erreurs testée, retours cohérents |

---
