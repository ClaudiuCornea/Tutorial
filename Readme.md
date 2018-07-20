# Tutorial d3

## DOM et d3

Rien de plus facile que de manipuler le DOM avec d3.
Exemple avec l'ajout d'un paragraphe dans le body.
```javascript
d3
    .select("body")
    .append("p")
```
Ajoutons du texte dans la balise crée.
```javascript
    .text("Je viens de crée mon premier paragraphe en d3.")
```
Ajoutons maintenat une classe.
```javascript
    .attr("class", "begin")
```
Nous pouvons utiliser cette classe pour styliser
le paragraphe avec du CSS ou nous pouvons le faire 
directement avec le d3.
```javascript
    .style("color", "green")
    .style("font-size", "20px");
```

## Fonctions anonymes

La librairie d3 utilise souvent des fonction anonyme
pour des tâches bien différentes, comme pour définir
des coordonnées, une hauteur, ...
Il existe pricipalement deux type des fonctions anonymes :
* _function(d)_
* _function(d,i)_

Nous allons utiliser la seconde car
elle nous fourni plus d'information que la première.
Pour voir son fonctionnement il nous faut des données.
```javascript
let data_set = [5,10,15]
```
Comme dans le premier exemple générons du DOM pour 
mieux comprendre comment ça fonctionne.
```javascript
d3
    .select("body")
    .selectAll("p")
    .data(dataset)
    .enter()
    .append("p")
    .text(function(d,i){
        return("La valeur de d est " + d + " et l'indice de d est " + i);
    })
```
Nous pouvons utiliser les fonctions anonymes pour définir
des attribus ou des propriètés.
```javascript
    .style("color",function(d){
        if(d < 15){
            return("red");
        }else{
            return("black");
        }
    });
```

## Representations Graphiques

Puisque nous commencons à mieux comprendre comment fonctionne d3,
nous allors commencer a l'utiliser pour sa fonction première :
**les representations graphiques**. Nous alons voir une partie
de ce que nous pouvons faire avec d3.

### DOM

Nous pouvons utiliser d3 pour créer un histogramme directement dans
le DOM, très déconseillé mais bon à savoir qu'on peut le faire.
Pour réaliser cet histogramme nous allons créer des div dans le DOM.
```javascript
d3
    .select("body")
    .selectAll("div")
    .data(dataset)
    .enter()
    .append("div")
    .attr("class","rect")
```
Puisque nous avons ajouté une classe a nos div nous pouvons utiliser
du CSS ou d3 pour leur donner les autres propriètés comme hauteur,
largeur, couleur, ...
En d3 :
```javascript
    .style("width", "25px")
    .style("height", function(d){
    return(d + "px");
    })
    .style("background-color","black")
    .style("display","inline-block")
    .style("margin","5px");
```
En CSS : 
```css
.rect{
    width : 25px;
    height : 75px;
    background-color : black;
    display : inline-block;
    margin : 5px
}
```
En conclusion, tout peut-être défini soit en CSS soit en d3.
Cependant, si on défini la mếme proprièté en CSS et en d3,
le second va écraser les valeurs du première, de ce fait
nous pouvons définir height dans le CSS et en d3, seule
la valeur de d3 sera prise en compte.

### SVG

Comme nous l'avons expliqué précedament faire des representations
graphiques directement dans le DOM est trés déconseillé. Grâce au d3
nous pouvons exploîter toute la puissance du format svg pour nos
representations graphiques.
A partir de maintenant nous pouvons mieux définir notre terrain
de jeu et ne plus poluer le DOM avec une multitudes de div.
Pour définir la taille du svg nous allons le plus souvent
utiliser des variables car elles vont nous être utilent très souvent.
```javascript
let width = 500,
    height = 50;
let svg = d3
    .select("body")
    .append("svg")
    .style("width", width)
    .style("height", height);
```
### Canvas et d3

Puisque nous travaillons dans un svg nous allons retrouver beaucoup
de similitudes avec le Canvas. Comme par exemple le dessin des carcles.
En Canvas :
```javascript
ctx.arc(x, y, r, begin_angle, end_angle, sens)
```
Nous avons besoin des coordonnées du centre du cercle (x,y), de la taille
du rayon (r), d'un angle de départ et de fin et indiquer dans quel sens on
veut dessiner le cercle (horlogé ou anti-horlogé).
Avec d3 nous allons utiliser les même paramètres pour dessiner des cercles.
```javascript
let cercle = svg
    .selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle");
cercle
    .style("cx", function(d,i){
        return(i * 100 + 25);
    })
    .style("cy", height/2)
    .style("r", function(d){
        return(d);
    });
```
Pour les coordonnées du centre nous avons cx qui est défini en fonction de
l'index de la donnée, nous avons l'avons multiplier par 100 pour espacer
les cercles les uns des autres et nous avos ajouté 25 pour effectuer
une translation vers la droite.
Pour cy nous avons juste choisi le milieu du svg.
Le rayon est défini par nos données.

## Histogramme

Nous alons voir comment réaliser un simple histogramme avec nos données.
Pour définir les batonnets nous avons besoin de définir les propriètés suivantes :
* height, l'hauteur du batonnet, le seul soucis que nous avons c'est que les batonnets se
    dessient du haut vers le bas, nous allon regler les soucis plus bas
* width, la largeur du batonnet, nous pouvons la définir en pixels ou bien en fonction de la largeur du svg
    ```javascript
    .style("width", width / dataset.lenght [- bar_padding])
    ```
    _rappel : les arguments entre [] sont optionels_
* coordonnées x, nous allons souvent utiliser l'index de la donnée
    ```javascript
    //les batonnets les uns aprés les autres[ avec un margin]
    .style("x", function(d,i){
        return(i * (bar_width [+ bar_margin]));
    })
    //les batonnets équidistant sur tout le svg
    .style("x", function(d, i){
        return(i * (width / dataset.lenght));
    })
    ```
* coordonnées y, nous allons résoudre le soucis des batonnets du haut vers le bas
    nous allons décaler vers le bas le batonnet de toute la hauteur du svg et 
    ensuite soustraire la hauteur que nous donne nos données
    ```javascript
    .style("y", function(d){
        return(height - d);
    })
    ```
* maintenant que notre histogramme est bien crée nous pouvons styliser
   les batonnets comme nous le voulons, en d3 ou en CSS.
Exemple:
```javascript
let bar = svg
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .style("x", function(d,i){
        return(i * (width / dataset.length) );
    })
    .style("y", function(d){
        return(height - d);
    })
    .style("width", width / dataset.length - 1)
    .style("height", function(d){
        return(d);
    })
    .style("fill","red");
```


## Functions d3
Dans cette section vous allez retrouver toutes 
les fonctions utilisées durant le tutorial avec
tout ce qu'il faut pour mieux comprendre 
leurs fonctionnement.
* d3 => appel à la librairie d3
* .select() => selection, pareil qu'en CSS, d'un élément du DOM
* .selectAll() => selection de plusieurs éléments du DOM, s'ils n'existent pas la fonction les considérent comme un ajout futur et les ajoutent à la suite de ceux sectioné
* .append() => création d'un élément du DOM
* .text() => string inséré dans l'élément généré avec append()
* .data() => selection des données
* .enter() => début d'une boucle qui parcourt tous les éléments de data()
* .attr("attribute", "valeur") => ajout d'un attribu HTML
* .style("propertie", "value") => ajout d'une proprièté CSS

* _function(d){return(d);}_ => fonction anonyme renvoie l'élément(d) parcouru par enter()
* _function(d,i){return(d,i);}_ => pareil que la fonction précédente avec l'index(i) de de l'élément en plus