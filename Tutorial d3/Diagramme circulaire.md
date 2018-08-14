## Diagramme circulaire

Le diagramme circulaire est défini différemment des graphiques
précédents car nous n'allons plus utiliser des coordonnées pour
définir des points que nous allons exploiter afin d'avoir une
représentation graphique. Nous allons utiliser des arcs de cercle.
Nous allons devoir tout définir d'une autre manière.
Commençons par le svg, le premier changement, nous allons déplacer
nos axes au centre.
```javascript
let svg = d3
    .select("body")
    .append("svg")
    .style("width", width)
    .style("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
```
Maintenant que nous avons un élément au centre du svg, nous allons
délimiter la taille de notre diagramme à l'aide de deux rayons,
un pour l'extérieur du cercle, la limite extérieure du diagramme et l'autre
pour l'intérieur du diagramme, O si nous voulons un diagramme plein (Camenbert)
et une valeur positive si nous voulons un diagramme avec le centre vide (donut).
```javascript
let radius = Math.min(width, height) / 2;
let arc = d3
    .arc()
    .innerRadius(0)
    .outerRadius(radius);
```
Comme vu au début du tutoriel, il nous reste à définir un angle de début
et un angle de fin pour nos arcs de cercle. La librairie d3 possède
une fonction idéale pour cette situation, elle va nous générer toutes
les données dont nous avons besoin à partir de nos données.
```javascript
let pie = d3
    .pie()
    .sort(null)
    .value(function(d){
        return(d.y);
    });
```
*La fonction sort(), trie nos données par ordre croissant, nous lui donnons la valeur null si nous n'avons pas besoin d'effectuer ce tri.*
Voila nous avons tous les éléments du puzzle pour construire notre diagramme
circulaire.
```javascript
let graph = svg
    .selectAll("arc")
    .data(pie(data_obj))
    .enter()
    .append("path")
    .attr("d",arc)
    .style("fill", "blue") 
    .style("stroke","black"); //Séparation entre les différentes parties.
```
[Lien CodePen.](https://codepen.io/claudiucornea/pen/oMOozM)

### Label

Comme vu précédemment, nous pouvons afficher des informations dans
notre graphique pour rendre celui ci plus facile à lire.
Nous allons procéder de la même manière que nous l'avons fait
pour l'histogramme à la différence que puisque nous travaillons
avec des arcs de cercle nous allons en ajouter un spécialement
pour le label.
```javascript
let label_arc = d3
    .arc()
    .innerRadius(radius - 20)
    .outerRadius(radius - 20);
```
Nous avons défini un nouvel arc de cercle plus petit que notre
graphique, et puisque nous voulons que tout soit sur un cercle,
les rayons doivent faire la même taille.
Maintenant nous allons juste afficher les valeurs de nos données
au centre des arcs de cercle créés par nos données.
```javascript
let label_text = svg
    .selectAll("text")
    .data(pie(data_obj))
    .enter()
    .append("text")
    .attr("transform", function(d){
        return("translate(" + label_arc.centroid(d) + ")");
    })
    .text(function(d){
        return(d.data.x);
    });
```
[Lien CodePen.](https://codepen.io/claudiucornea/pen/EpJbXQ)
