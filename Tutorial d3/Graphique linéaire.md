## Graphique linéaire

### Prérequis
1. [Histogrammes]()
2. [Echelles]()

Maintenant que nous savons faire des histogrammes nous allons passer aux
graphiques linéaires. Nous allons réutiliser tout ce que nous avons appris
sur les échelles, c'est valable pour tous les types de graphiques.
Aprés avoir créee le svg, définit les échelles et ajouté les axes, nous
devons définir comment nous allons déssiner notre ligne, point par point.
```javascript
let line_graph = d3
    .line()
    .x(function(d){
        return(x_scale(d.x));
    
    })
    .y(function(d){
        return(y_scale(d.y));
    });
```
Ensuite il suffit de faire comme en Canvas, créer un chemin qui parcourt
nos points un à un afin de créer notre ligne.
```javascript
svg
    .append("path")
    .attr("d",line_graph(data_obj))
```
*Lorsque nous appelons la fonction line_graph, nous lui donnons comme argument l'objet qui contient nos données.*
*Il est important de lui donner un objet car lors de la déclaration de line_graph, nous avons fourni les clés afin d'avoir les données souhaitées.*
Voila, notre ligne est présente, mais elle est invisible pour le moment
car nous n'avons défini aucune couleur.
```javascript
    .style("stroke","green")
    .style("stroke-width", 1)
    .style("fill", "none");
```
Nous allons voir plus tard comment réaliser un graphique avec
une multitude de lignes.       
[Lien CodePen.](https://codepen.io/claudiucornea/pen/EpJXvQ)

* Chapitre suivant
    *  [Diagramme circulaire](https://github.com/ClaudiuCornea/Tutorial/blob/master/Tutorial%20d3/Diagramme%20circulaire.md#diagramme-circulaire)
*  Chapitre précédent
    *  [Echelles](https://github.com/ClaudiuCornea/Tutorial/blob/master/Tutorial%20d3/Echelles.md)