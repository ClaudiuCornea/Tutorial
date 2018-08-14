## Représentations graphiques

### Table des matières
1. [DOM]
2. [SVG]
3. [Canvas et d3]

Puisque nous commençons à mieux comprendre comment fonctionne d3,
nous allons commencer à l'utiliser pour sa fonction première :
**les représentations graphiques**. Nous allons voir une partie
de ce que nous pouvons faire avec d3.

### DOM

Nous pouvons utiliser d3 pour créer un histogramme directement dans
le DOM, très déconseillé mais nous pouvons le faire.
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
Puisque nous avons ajouté une classe à nos div nous pouvons utiliser
du CSS ou d3 pour leur donner les autres propriétés tel que la hauteur,
la largeur, la couleur, ...
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
Cependant, si on définit la mếme propriété en CSS et en d3,
le second va écraser les valeurs du premier, de ce fait
nous pouvons définir height dans le CSS et en d3, seule
la valeur de d3 sera prise en compte.     
[Lien CodePen, seulement d3.](https://codepen.io/claudiucornea/pen/PBLdeO)     
[Lien CodePen, d3 et CSS.](https://codepen.io/claudiucornea/pen/YjgORZ)


### SVG

Comme nous l'avons expliqué précedemment, faire des représentations
graphiques directement dans le DOM est trés déconseillé. Grâce au d3
nous pouvons exploiter toute la puissance du format svg pour nos
représentations graphiques.
A partir de maintenant nous pouvons mieux définir notre terrain
de jeu et ne plus polluer le DOM avec une multitude de div.
Pour définir la taille du svg nous allons le plus souvent
utiliser des variables car elles nous seront utiles très souvent.
```javascript
let width = 1000,
    height = 500;
let svg = d3
    .select("body")
    .append("svg")
    .style("width", width)
    .style("height", height);
```
[Lien CodePen.](https://codepen.io/claudiucornea/pen/Owqoqv)

### Canvas et d3

Puisque nous travaillons dans un svg nous allons retrouver beaucoup
de similitudes avec le Canvas. Comme par exemple le dessin des cercles.
En Canvas :
```javascript
ctx.arc(x, y, r, begin_angle, end_angle, sens)
```
Nous avons besoin des coordonnées du centre du cercle (x,y), de la taille
du rayon (r), d'un angle de départ et de fin ainsi qu'indiquer dans quel sens
nous voulons dessiner le cercle (horlogé ou anti-horlogé).
Avec d3 nous allons utiliser les mêmes paramètres pour dessiner des cercles.
```javascript
let cercle = svg
    .selectAll("circle")
    .data(data_set)
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
Pour les coordonnées du centre nous avons _cx_ qui est défini en fonction de
l'index de la donnée, nous l'avons multiplié par 100 pour espacer
les cercles les uns des autres et nous avons ajouté 25 pour effectuer
une translation vers la droite.
Pour _cy_ nous avons juste choisi le milieu du svg.
Le rayon est défini par nos données.    
[Lien CodePen.](https://codepen.io/claudiucornea/pen/XBQEXg)
