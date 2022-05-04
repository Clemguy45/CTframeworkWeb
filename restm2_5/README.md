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

$ cd restm2_5

```
## Lancer le synfony 

```bash
// Dans un terminal
$ docker-compose up --build

// Dans une autre console, pour aller dans le conteneur
$ docker exec -ti my-web-container bash

$ symfony composer install

$ symfony server:start --no-tls --d

$ symfony console doctrine:database:drop --force

$ symfony console doctrine:database:create

$ symfony console doctrine:schema:update --force

$ cd var/

$ chmod 777 data.db

$ cd ..

$ symfony console doctrine:fixtures:load

```

-------------
Ce qui suit est la partie Symfony de notre projet du dépôt restM2_5
---------------
Disponible dans les README.md du dépôt angular :
>####Question 1  
>####Question 2
>####Question 3
>####Question 4
>####Question 5
>####Question 6
>####Question 10
>####Question 11
>####Question 12
>####Question 13
>####Question 14
---------------

## Question 7
_____________________
> Ce qui suit sera également écrit dans le README.md du dépôt Angular (angM2_5)
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
------
Côté Angular :
------
Pour commencer nous avons créé un nouveau composant **Categorie** avec sa classe et son service:
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
