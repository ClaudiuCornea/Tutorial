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
    .selectAll(".p")
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
    .selectAll(".div")
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
    .selectAll(".circle")
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
    .selectAll(".rect")
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

### Interactivité

Maintenant que nous avons notre histogramme crée on va rajouter un peu
d'intercativité avec le graphique pour qu'on puisse mieux observer les données.
Par exemple, nous allons mettre en avant le batonnet que nous allons survolé
avec la souris.
En d3, pour garder un seul batonnet opaque, il faut rendre tous les batonnets
trasparent et ensuite changer l'opacité de cellui survolé.
```javascript
    .on("mouseover", function(){
        d3
            .selectAll(".rect")
            .style("opacity", 0.3);
        d3
            .select(this)
            .style("opacity", 1);
    })
```
Sans oublié le cas ou le graphique n'est pas survolé par la souris.
```javascript
    .on("mouseout",function(){
        d3
            .selectAll(".rect")
            .style("opacity", 1);

    })
```
Il suffit de rajouter l'intercativité dans la délaration des batonnets (bar)
pour que cela fonctionnne.

### Label

Parfois il peut-être utile d'afficher le valeur de chaque batonnet dans le graphique.
Pour le faire nous allons simplement ajouter du texte en haut des batonnets.
```javascript
let label = svg
    .selectAll(".text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d){
        return(d);
    })
    .attr("x", function(d,i){
        return(i * (width / dataset.length) + (width / dataset.length) / 2);
    })
    .attr("y", function(d){
        return(height - d );
    });
```
Avec l'intercativité vu précedament vous pouvez faire en sorte que le label
soit visible seulement au survol de la souris.

## Données

Jusqu'à present nous avons travaillé avec des données dans un tableau
a une dimension.
```javascript
let data_set = [5,10,15]
```
Maintenant nous allons voir comment uti un tableau avec des objets
qui contiennent les informations nécesaires pour refaire
le même histogramme que jusqu'à present.
```javascript
let data_obj = [
    {x : 0,
    y : 5},
    {x : 1,
    y : 10},
    {x : 2,
    y : 15}
];
```
Même avec les données sous cette forme, c'est aussi simple qu'avant
il suffit juste de bien indiquer ou chercher l'information.
```javascript
let bar_obj = svg
    .selectAll(".rect")
    .data(data_obj)
    .enter()
    .append("rect")
    .style("x", function(d){
        return(d.x * (width / data_obj.length) );
    })
    .style("y", function(d){
        return(height - d.y);
    })
    .style("width", width / data_obj.length - 1)
    .style("height", function(d){
        return(d.y);
    })
    .style("fill","blue");
```
Comme vous pouvez le voir nous n'avons rien changé a notre graphique
autre le fait que nous utilisons plus l'index car nous avons des
données sous la forme (x,y).

## Echelles

Jusqu'à maintenant nous nous sommes contenté d'afficher les données
sans se soucier des echelles. Elles sont pratiques pour afficher
les données dans notre svg car pour tout afficher dans l'espace 
limité qui est le svg il faut tout proportionné pour pouvoir
afficher toutes les données des plus grandes au plus petites.
Pour définir une echelle en d3 il nous faut définir le domaine
de nos donnée, cad. la plage de donnée comprise entre la valeur
la plus petit et la valeur la plus grand des données.
Et nous avons besoin de définir aussi la zone du svg que nous 
allons utilisé pour le graphique.

### Echelle linéaire

L'echelle linéaire est l'echelle que nous allons utiliser le plus
souvent et c'est l'echelle que tout le monde connaît, elle est composé
d'une suite de nombre qui se suivent.
Prenos nos données défini précédement pour créer les echelles de notre
graphique, n'oubliez pas qu'un graphique a deux echelles une x et une y.
Nous allons le faire de manière statique, nous connaissons toutes nos
données.
```javascript
let x_scale = d3
    .scaleLinear()
    .domain([0 , 3])
    .range([0 , 500]);
let y_scale = d3
    .scaleLinear()
    .domain([20,0])
    .range([0,50]);
```
_Pour l'echelle de l'axe y le domaine est inversée._

maintenant appliquons l'echelle définie précédement a nos données,
il suffit juste de faire appel a la variable que nous avons crée
comme on fait appel a une fonction avec comme arguments la donnée
utilisée.
```javascript
let bar_obj = svg
    .selectAll(".rect")
    .data(data_obj)
    .enter()
    .append("rect")
    .style("x", function(d){
        return(x_scale(d.x));
    })
    .style("y", function(d){
        return(y_scale(d.y));
    })
    .style("width", width / data_obj.length)
    .style("height", function(d){
        return(height - y_scale(d.y));
    })
    .style("fill","blue");
```
#### Echelle dynamique

Nous avons nous même défini les valeurs minimales et maximales de nos echelles
mais dans la plus part des cas on ne pourrait pas le faire pour de multiples
raisons, alors automatisons ça.
```javascript
    .domain([d3.min(data, function(d){return(d.x);}),
        d3.max(data, function(d){return(d.x);})]);
        //ou bien
    .domain(d3.extent(data, function(d){return(d.x);}));
```
*N'essayez pas avec nos donnée (data_obj) ça ne vas pas fonctionné du fait qu'il n'y a pas assez de données.*
_d3.extent() est a utiliser avec les données non numérique._
### Echelle de temps

Si jamais nous voulons utiliser des dates a la place des nombres
sur un axe nous avons une fonction prédéfinie en d3, trés semblables
à l'echelle précédente. Mais avant de l'utiliser nous devons transformer
nos données dans le bon format.
```javascript
let parseTime = d3.timeParse("%Y");
time_data.forEach(function(d){
    d.year = parseTime(d.year);
});
let time_scale = d3
    .scaleTime()
    .range()
    .domain();
```
### echelle ordinale

Contrairement à ce que nous avons vu jusqu'à présent avec un domaine
et une partie du svg nécesaires pour définir l'echelle, ici nous n'avons
pas besoin de l'un ni de l'autre.
Ici nous n'utilions pas les données mais plutôt un tableau avec les elements
qui nous intéressent que nous allons utiliser pour définir "_la plage de données_",
et si nous définissons un domaine il y aura une relation directe entre les deux.
exemple :
```javascript
let ordinal_scale = d3
    .scaleOrdinal()
    .domain([1, 2, 3, 4, 5])
    .range(["one", "two", "three", "four", "five"]);
ordinal_scale(1); //"one"
ordinal_scale(3); //"three"

```
Nous utilisons souvent ce type d'echelle pour jouer avec les
couleurs, pour créer des axes avec du texte, ...

### Echelle à bande

L'echelle à bandes est fortement utilisée pour la création d'histogrammes
car elle nous donne directement les batonnets de celui-ci sans devoir calculer
quoi que ce soit. Ses paramètres sont le même pour l'echelle linéaire, le seul
changement est au niveau du domaine, nous devons lui donner toutes les données
sous la forme d'un tableau, on utilisera un .map.
```javascript
let band_scale = d3
    .scaleBand()
    .domain(data_obj.map(function(d){return(d.x);}))
    .range([0 , width]);
```
Nous avons parlé du fait que la taille des batonnets du histogramme
nous est donnée par l'echelle.
```javascript
.style("width", width / data_obj.length) //Jusqu'à présent
.style("width", band_scale.bandwidth()) //Avec l'echelle à bandes
``````

### Autres echelles

Il existe d'autres echelles définie dans d3, comme l'echelle logarithmique.
Elles sont toutes définie et fonctionnent de la même manière que nous avons
vu précédement.
Je n'ai pas non plus expliqué toutes les fonctions lié aux echelles expliqué
jusqu'à present, à vous de les décrouvrir.


### Afficher l'echelle

Nous avons vu comment définir les echelles, maintenant nous allons
voir comment les afficher dans notre svg.
Mais en premier il faut faire de la place pour les afficher
dans le svg, nous allons donc définir des margins.
```javascript
let margin ={
    "top" : 5,
    "right" : 10,
    "bottom" : 5,
    "left" : 5
    };
```
Voyons ce qui va changer pour nous si nous rajoutons des margins a notre
svg.
```javascript
let band_scale = d3
    .scaleBand()
    .domain(data_obj.map(function(d){return(d.x);}))
    .range([margin.left , width - margin.right]);
let y_scale = d3
    .scaleLinear()
    .domain([20,0])
    .range([margin.top , height - margin.bottom]);
let bar_obj = svg
    .selectAll(".rect")
    .data(data_obj)
    .enter()
    .append("rect")
    .style("x", function(d){
        return(band_scale(d.x));
    })
    .style("y", function(d){
        return(y_scale(d.y));
    })
    .style("width", band_scale.bandwidth())
    .style("height", function(d){
        return(height - margin.bottom - y_scale(d.y));
    })
    .style("fill","blue");
```
maintenant créons nos axes et Ajoutons les sur le svg.
```javascript
let x_axis = d3
    .axisBottom(band_scale);
svg
    .append("g")
    .attr("transform", "translate(0 ," + (height - margin.bottom) + ")")
    .call(x_axis);
let y_axis = d3
    .axisLeft(y_scale);
svg
    .append("g")
    .attr("transform", "translate(" + margin.left + ",0)")
    .call(y_axis);
```
Nous définissons l'axe en fonction de de l'echelle et nous indiquons
dans quels sens doit se faire l'écriture de l'echelle, informations
vers le bas/haut/droite/gauche. Et ensuite avec une translation nous
la mettons au bon endroit lors de son ajout sur le svg.
Nous Pouvons également styliser notre echelle, couleurs, changer
la taille de la police, la rotation et autre, pour le texte affiche.
Exemple : 
```javascript
svg
    .append("g")
    .attr("transform", "translate(0 ," + (height - margin.bottom) + ")")
    .call(x_axis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx","-0.5em")
    .attr("dy", "-.55em")
    .attr("transform", "rotate(90)");
```

## Graphique linéaire



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
* .on("event",function) => lance une fonction si on evenement se produit
* .domain() => plage de données qui contient la plus petite et la plus grande valeur des données, les arguments doivent être des entiers
* .range() => partie du svg utilisée pour le graphique

* _function(d){return(d);}_ => fonction anonyme renvoie l'élément(d) parcouru par enter()
* _function(d,i){return(d,i);}_ => pareil que la fonction précédente avec l'index(i) de de l'élément en plus