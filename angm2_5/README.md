# CT FrameworkWeb

> **Participants :**  
> Clément Guyot o2163453  
> Audrey Charpentier o2173157  
> Mickael Poudroux o2173838  
> Ophelie Nung o2162453  

## Récupérer le projet

Il faut cloner et installer les dépendances :

```bash
$ git clone [url]

$ cd angm2_5

$ npm i
```

### Question 1
Nous avons créée un nouveau projet **Angular** avec les commandes suivantes :

```bash
$ ng new ct-framework-web --style=scss --routing --skip-install=true

$ npm i
```
### Question 2
Nous avons créée de nouveaux composants **accueil** et **annonce** avec les commandes : 
```bash 
$ ng g component accueil

$ ng g component annonce
```
Nous avons modifié le fichier `app-routing.module.ts` pour créer la route des pages **accueil** et **annonce**.  
Nous avons modifié les fichiers `accueil.component.html` et `annonce.component.html` pour afficher respectivement 'bonjour accueil' et 'bonjour annonce'.
Et nous avons modifié le fichier `app.component.html` pour mettre la balise `<router-outlet></router-outlet>`pour afficher les pages en fonction de la route.

### Question 3
Nous avons installé Bootstrap à l'aide des commandes :  

````bash
$ npm install bootstrap --save

$ npm install ngx-bootstrap --save
````
Nous avons modifié le fichier `angular.json` et nous avons rajouté la route **"node_modules/bootstrap/dist/css/bootstrap.min.css"** dans le paramètre de style.
Nous avons également importé la route **@import "~bootstrap/dist/css/bootstrap.css";** dans le fichier `style.scss`.  

Pour la barre de navigation nous avons modifié le fichier `app.component.html` et ajouté :  

````angular2html
<div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
  <a class="my-0 mr-md-auto font-weight-normal" routerLinkActive="active" routerLink="">Home page</a>
  <nav class="my-2 mr-md-0 mr-md-3">
    <a class="p-2 text-dark" routerLinkActive="active" routerLink="/annonce">Annonce</a>
  </nav>
</div>
````
Nous avons mis l'attribut `routerLinkActive` et `routerLink` dans les balises `<a>` pour lier les routes aux liens de navigation.

### Question 4

Nous avons ajouté au composant **Annonce** dans le fichier `annonce.component.ts` des attributs **id**, **nomProduit**, **description** et **prix**.
Nous avons rempli une annonce par défaut et ajouté un autre attribut **userForm** que nous allons utiliser pour créer le formulaire.
Nous avons créé des méthodes dans le fichier `annonce.component.ts` pour pouvoir afficher l'annonce et la modifier dynamiquement.
Nous avons donc créé les méthodes `getControl()`, `modifierAnnonce()`, `constructor()` et `ngOnInit()`.
Nous avons fait en sorte que le constructeur déclenche la création du formulaire en passant en argument du `constructor()` : public formBuilder: FormBuilder.

Nous avons ensuite complété la page `annonce.component.html` pour que le formulaire corresponde à ce que nous voulions.
Nous avons fait le choix d'afficher l'annonce en haut de page pour vérifier les modification de celle-ci.

### Question 5

Nous avons généré la classe et le service d'**Annonce** grâce aux commandes
```bash
$ ng g class Annonce

$ ng g service Annonce
```
Après avoir installé Faker avec
```bash
$ npm i faker --save

$ npm install @types/faker --save
```
nous avons écrit le constructeur d'**AnnonceService**, qui contenait la génération des 5 annonces par Faker. Enfin, nous avons adapté `annonce.component.html` pour afficher la liste et pouvoir vérifier les générations.

### Question 6
Nous avons tout d'abords créé un nouveau composant nommé `new-annonce` avec la commande :
```bash
$ ng g c new-annonce
```  
Nous avons ajouté les fonctions `emitAnnonce()`, `getAnnonces()`, `addAnnonce()`, `editAnnonce()` et `deleteAnnonce()` afin de les utiliser dans la classe **NewAnnonceComponent**.  
Nous avons implémenté la classe **NewAnnonceComponent** en modifiant le `contructor()` et le `ngOnInit()`. Dans le `contructor()` nous avons appelé 3 service d'Angular et notre service qui sont :

> **Nos Services**  
> FormBuilder  
> AnnonceService  
> Router  
> ActivatedRoute

`ngOnInit()` s'occupe d'appeler la fonction `iniForm()` qui créer notre formulaire, en suite il s'occupe également de récupéré l'id placé dans la barre de navigation avec une fonction du service **ActivatedRoute**. Il déterminera alors si le formulaire passe en mode edit ou create, finalement il recupère les données du formulaire dans ces attributs de classe.  
Pour finir la fonction `submitAnnonce()` récupère les valeurs et en fonction du mode, appelle les fonctions de notre service **AnnonceSevice** appelées `editAnnonce()` et `addAnnonce()`.  
Après excution des fonctions des services, le service **Router** nous renvoie vers la page `/annonce` grâce à ça fonction `navigate()`.  
Nous pouvons supprimer une annonce depuis la page `/annonce` en appuyant sur le boutton supprimer qui en cliquant appelle la fonction `deleteAnnonce()` du service **AnnonceService**.  

## Question 7
_____________________
> Ce qui suit sera également écrit dans le README.md du dépôt Symfony (restm2_5)
_______________________
Nous avons initialisé le projet sur Symfony :
```bash
$ docker-compose up --build --d
$ docker exec -ti my-web-container bash
$ symfony new . --full
$ symfony server:start --no-tls --d
```
Puis nous avons créé l'entité **Annonce** et son contrôleur :
```bash
$ symfony console make:entity Annonce
$ symfony console make:controller AnnonceController
```
Nous avons créé la base de données :
```bash
$ symfony console doctrine:database:create
```
Puis procédé à la migration de la BDD :
```bash
$ symfony console make:migration
$ symfony console doctrine:migration:migrate
```
Enfin nous avons généré et implémenté les fixtures avec Faker
```bash
$ symfony composer require orm-fixtures --dev
$ symfony composer require fakerphp/faker
$ symfony console make:fixture AnnonceFixtures
$ symfony console doctrine:fixtures:load
```

Nous avons déclaré 4 champs dans le contrôleur :
* private $annonceRepository;  
* private $serializer;  
* private $validator;  
* private $em;

Puis implémenté un constructeur
```bash
public function __construct (  
AnnonceRepository $annonceRepository,
SerializerInterface $serializer,
ValidatorInterface $validator,
EntityManagerInterface $em ) { }
```
La fonction `index` a été modifiée pour qu'elle puisse retourner la liste des annonces contenues dans la base de données en format `.json`.  
4 fonctions ont été créées :
* getById()  
* newAnnonce()  
* updateAnnonce()  
* deleteAnnonce()  

Les classes `ValidatorInterface`, `SerializerInterface`, `JsonEncoder`, `ParamConverter`, `Response`, `Request`, `JsonResponse` ont été importées pour leurs fonctionnalités.  


## Question 8 

Du côté symfony nous avons installé nelmio/cors-bundle via la commande.
```bash
$ symfony composer require nelmio/cors-bundle
``` 

Après installation de la dépendance chez symfony. Dans le côté angular nous avons modifié les fichiers
`new-annonce.comtponent.ts` , `annonce.service.ts` et le `annonce.comtponent.ts`.    

Dans le `new-annonce.comtponent.ts` nous avons modifié le `ngOninit()` et le `submitOnAnnonce()`.
Pour implémenter les nouvelles annonces du web-service, car `annonce.service.ts` implémente la classe `HTTPClient` 
qui fait parti d'Angular.    

Le `app.module.ts` implémente les classes `HTTPClientModule` et `HTTPClient`. Le premier est importé par le NgModule
et le deuxième est dans la section Provider.   

Dans le `annonce.service.ts` nous avons modifié toutes ces fonctions pour que les Annonces interrogent le `web-service`.

`annonce.comtponent.ts` à été modifié sur la fonction `deleteAnnonce()`.   

Pour tester nous avons lancé le Docker et le serveur Angular avec les commandes :
```bash 
// Sur le repertoire angm2_5
$ ng serve
// Sur le bash du container Docker
$ synfony server:start --no-tls --d
```
Avec l'adresse `localhost:4200/annonces`

## Question 9
```bash
// Crée un composant Categorie
$ ng g component categorie
// Crée une classe Categorie
$ ng g class categorie
// Crée un service Categorie
$ ng g service categorie
```
Ensuite, nous avons mis `categorie.spec.ts`, `categorie.ts`, `categorie.service.spec.ts`, `categorie.service.ts` dans le dossier **categorie**.

Enfin on a relié le constructeur de `categorie.component.ts` aux différents services et déclarer les attributs de la classe **Categorie**.
`categorie.component.ts` comporte les fonctions : `ngOnInit()`, `editCategorie()` et `deleteCategorie()`.

Puis adapté l'affichage d'`annonce.component.html`, les arguments d'`annonce.component.ts`, d'`annonce.service.ts` et de la classe **Annonce**.  
Dans la liste des annonces, nous affichons maintenant le nom de la catégorie de l'annonce, nous avons pû introduire le nom de la catégorie dans le bon type pour l'afficher grâce à `*ngIf="c.categorie"` rajouté dans sa balise `<input>`.   
Finalement, nous avons ajouté l'accès à la liste des catégories avec affiché le nombre d'annonces de la catégorie à coté.
Nous pouvons avec cette liste de catégories : créer une nouvelle catégorie (dans le barre de navigation du site), modifier une catégorie et supprimer une catégorie.

------
Côté Symfony :
------

Nous avons grâce aux commandes de Symfony, créé l'entity **Categorie** (champs : `id` et `nomCategorie`) et ajouter un champ `categorie` à Annonce, nous les avons ensuite mis en relation.  
Nous avons finalement créé la fixture de **Categorie**, **CategorieFixture** et comme pour **Annonce**, nous en avons généré avec Faker.  
Finalement nous avons créé son contrôleur : **CategorieController**.
```bash
// Créer l\'entity Categorie
$ symfony console make:entity Categorie

// Faire les migrations pour prendre en compte le changement la structure de la BDD
$ symfony console make:migration
$ symfony console make:migrations:migrate

// Modifier l\'entity Annonce pour ajouter une relation ManyToOne avec Categorie
$ symfony console make:entity Annonce

// Génération d\'implémentations de Annonce et Categorie grâce à Faker
$ symfony console doctrine:fixtures:load

// Création du contrôleur de Categorie
$ symfony console make:controller Categorie
```

Nous avons ensuite modifié et ajouté les fonctions nécessaires `__construct()`, `getByIdCategorie`, `newCategorie`, `updateAnnonce` et `deleteCategorie()` dans **CategorieController** en suivant le même modèle que pour **AnnonceController**.

### Question 10 

Nous avons ajouté la possibilité à l'utilisateur d'accéder à la liste des annonces d'une catégorie choisie.  
Pour cela nous avons rajouté un champ **categorieFocus** dans `categorie.component.ts` qui sera la catégorie choisie.
Nous avons également ajouté le service **AnnonceService** à la classe **Catégorie** pour qu'elle puisse récupérer les annonces.
Ensuite, nous avons ajouté les méthodes `editAnonce()` et `deleteAnnonce()` dans le composant **Catégorie** pour pouvoir modifier et supprimer les annonces qui seront affichées après la catégorie choisie.

Finalement, nous avons modifié l'affichage dans le fichier `categorie.component.html`. Nous avions déjà accès à la liste des catégories et à leur nombre d'annonces dans chacune, nous avons donc modifié l'affichage pour que si l'on **clique sur le nom de la catégorie**, nous avons en bas de pages toutes les annonces de cette catégorie affichées ainsi que pour chacune des annonces la possibilité de les modifier ou supprimer avec les boutons à coté de l'annonce.
Pour afficher les annonces, nous avons fait une liste d'annonces en bas de page, comme nous l'avions fait pour la liste d'annonces ou de catégories, avec une condition pour les afficher : la catégorie choisie grâce à la condition `*ngIf="categorieFocus"`.

### Question 11 et Question 12

Nous n'avons pas eut le temps de traiter ces deux questions qui consistent à la création d'un user avec **Angular** et ajouter un champ **auteur** dans l'annonce. 
Ainsi nous aurions dû ajouté le nom du **user** en tant que nom d'auteur de l'annonce.

Les commandes que nous aurions pû utiliser :
```bash
//Créer une classe user 
$ ng g class model/user
// Créer un service auth 
$ ng g s services/auth
// Créer un composant login 
$ ng g c login
// Créer un composant logout 
$ ng g c logout
// Créer une garde cours 
$ ng g guard guards/cours
// Créer un intercepteur http-errors 
$ ng g interceptor interceptors/httpErrors
```

### Question 13

Nous avons ajouté plusieurs contraintes au cours du projet pour bien naviguer dans le site.
Dans nos fichiers d'affichage **html**, nous avons grâce à plusieurs `*ngIf` pour qu'aucune erreur d'affichage se produise. Par exemple, tant que le site charge nous n'essayons pas d'afficher les annonces ou la redirection et affichage d'erreur avec : `*ngIf="erreurMessage"`.  
De plus, pour indiquer à l'utilisateur que notre page charge lors d'affichage des listes ou de services (création, modification et suppression), nous avons ajouté dans notre `style.css` général un `spinner-dual-ring` explicite pour l'utilisateur.  

Il nous manque le fait de restreindre les accès pour un utilisateur non connecté pour afficher les annonces et catégories ainsi que la suppression et modification des annonces qui ne sont pas à lui. 

### Question 14

Nous avons créé un service `CovidGouvService` avec la commande :
```bash
$ ng g service covid/covid-gouv
```
Ensuite, nous avons implémenté la classe **CovidGouvService** avec un attribue URL qui lie l'API du Gouvernement, le constructeur `__construct()` qui importe le service `HTTPClient` et une fonction `getCovid()` pour recupérer le JSON de l'API.  
Nous avons modifier la classe **AccueilComponent** pour recupérer dans la méthode `ngOnInit()` les données du JSON.
Et pour finir nous avons modifié le fichier `accueil.component.html` pour afficher les données sous forme de card.

> ⚠ Attention l'API du Gouvernement n'est pas à jour, il manque le champ `casConfirmés` ⚠