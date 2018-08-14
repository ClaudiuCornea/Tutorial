## Echelles

### Table des matières
1. [Echelle linéaire](https://github.com/ClaudiuCornea/Tutorial/blob/master/Tutorial%20d3/Echelles.md#echelle-lin%C3%A9aire)
2. [Echelle dynamique](https://github.com/ClaudiuCornea/Tutorial/blob/master/Tutorial%20d3/Echelles.md#echelle-dynamique)
3. [Echelle de temps](https://github.com/ClaudiuCornea/Tutorial/blob/master/Tutorial%20d3/Echelles.md#echelle-de-temps)
4. [Echelle ordinale](https://github.com/ClaudiuCornea/Tutorial/blob/master/Tutorial%20d3/Echelles.md#echelle-ordinale)
5. [Echelle à bandes](https://github.com/ClaudiuCornea/Tutorial/blob/master/Tutorial%20d3/Echelles.md#echelle-%C3%A0-bandes)
6. [Autres échelles](https://github.com/ClaudiuCornea/Tutorial/blob/master/Tutorial%20d3/Echelles.md#autres-%C3%A9chelles)
7. [Afficher l'échelle](https://github.com/ClaudiuCornea/Tutorial/blob/master/Tutorial%20d3/Echelles.md#afficher-l%C3%A9chelle)


Jusqu'à maintenant nous nous sommes contentés d'afficher les données
sans se soucier des échelles. Elles sont utiles pour l'affichage
des données dans notre svg car pour tout afficher dans l'espace 
limité qu'est le svg il faut tout proportionner afin de pouvoir
afficher toutes les données des plus grandes au plus petites.
Pour définir une échelle en d3 il nous faut définir le domaine
de nos données, c'est à dire la plage de données comprises entre
la valeur la plus petite et la valeur la plus élevée des données.
Et nous avons besoin de définir aussi la zone du svg que nous 
allons utiliser pour le graphique.

### Echelle linéaire

L'échelle linéaire est l'échelle que nous allons utiliser le plus
souvent et c'est l'échelle que tout le monde connaît, elle est composée
d'une suite de nombres qui se suivent.
Prenons nos données définies précédemment pour créer les échelles de notre
graphique, n'oubliez pas qu'un graphique a deux échelles une x et une y.
Nous allons le faire de manière statique, nous connaissons toutes nos données.
```javascript
let x_scale = d3
    .scaleLinear()
    .domain([0 , 3])
    .range([0 , 1000]);
let y_scale = d3
    .scaleLinear()
    .domain([20,0])
    .range([0,500]);
```
_Pour l'échelle de l'axe y le domaine est inversé._
Maintenant appliquons l'échelle définie précédemment à nos données,
il suffit juste de faire appel à la variable que nous avons créee
comme nous faisons appel à une fonction avec comme argument la donnée
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
[Lien CodePen.](https://codepen.io/claudiucornea/pen/qyvJeY)

### Echelle dynamique

Nous avons nous même défini les valeurs minimales et maximales de nos échelles
mais dans la plupart des cas nous ne pouvons pas le faire pour de multiples
raisons, alors automatisons celà.
```javascript
    .domain([d3.min(data, function(d){return(d.x);}),
        d3.max(data, function(d){return(d.x);})]);
        //ou bien
    .domain(d3.extent(data, function(d){return(d.x);}));
```
*N'essayez pas avec nos données (data_obj) ça ne va pas fonctionner du fait qu'il n'y a pas assez de données.*
_d3.extent() est à utiliser avec les données non numériques._

### Echelle de temps

Si jamais nous voulons utiliser des dates à la place des nombres
sur un axe nous avons une fonction prédéfinie en d3, trés semblable
à l'échelle précédente. Mais avant de l'utiliser nous devons transformer
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
[Lien CodePen.](https://codepen.io/claudiucornea/pen/djLZrE)

### Echelle ordinale

Contrairement à ce que nous avons vu jusqu'à présent avec un domaine
et une partie du svg nécesaire pour définir l'échelle, nous n'avons
pas besoin de l'un ni de l'autre.
Ici nous n'utilisons pas les données mais plutôt un tableau avec les élements
qui nous intéressent et que nous allons utiliser pour définir "_la plage de données_",
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
Nous utilisons souvent ce type d'échelle pour jouer avec les
couleurs, pour créer des axes avec du texte, ...        
[Lien CodePen.](https://codepen.io/claudiucornea/pen/QBPmMN)

### Echelle à bandes

L'échelle à bandes est fortement utilisée pour la création d'histogrammes
car elle nous fourni la largeur optimale des bâtonnets en fonction de
l'espace disponible pour le graphique et en fonction de la quantité de données.
De ce fait nos histogrammes vont avoir un rendu optimisé.
Ses paramètres sont identiques pour l'échelle linéaire, le seul
changement est au niveau du domaine, nous devons lui donner toutes les données
sous la forme d'un tableau, on utilisera un _.map_.
```javascript
let band_scale = d3
    .scaleBand()
    .domain(data_obj.map(function(d){return(d.x);}))
    .range([0 , width]);
```
Nous avons parlé du fait que la taille des bâtonnets de l'histogramme
nous est donné par l'échelle.
```javascript
.style("width", width / data_obj.length) //Jusqu'à présent
.style("width", band_scale.bandwidth()) //Avec l'échelle à bandes
``````
[Lien CodePen.](https://codepen.io/claudiucornea/pen/RBdqRO)

### Autres échelles

Il existe d'autres échelles définie dans d3, comme l'échelle logarythmique.
Elles sont toutes définies et fonctionnent de la même manière que nous avons
vu précédemment.
Toutes les fonctions liées aux échelles n'ont pas été expliquées, à vous de décrouvrir les autres.

### Afficher l'échelle

Nous avons vu comment définir les échelles, maintenant nous allons
voir comment les afficher dans notre svg.
Mais en premier lieu il faut faire de la place pour les afficher
dans le svg, nous allons donc définir des margins.
```javascript
let margin ={
    "top" : 20,
    "right" : 20,
    "bottom" : 20,
    "left" : 20
    };
```
Voyons ce qui va changer pour nous si nous rajoutons des margins à notre
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
Maintenant créons nos axes et ajoutons-les sur le svg.
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
Nous définissons l'axe en fonction de l'échelle et nous indiquons
dans quels sens doit se faire l'écriture de l'échelle, informations
vers le bas/haut/droite/gauche. Et ensuite avec une translation nous
la mettons au bon endroit lors de son ajout sur le svg.        
[Lien CodePen.](https://codepen.io/claudiucornea/pen/ajMQwK)
