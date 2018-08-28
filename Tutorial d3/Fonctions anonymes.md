## Fonctions anonymes

La librairie d3 utilise souvent des fonctions anonymes
pour des tâches bien différentes, comme pour définir
des coordonnées, une hauteur, ...
Il existe principalement deux types de fonctions anonymes :
* _function(d)_
* _function(d,i)_

Nous allons utiliser la seconde car
elle nous fournit plus d'informations que la première.
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
    .data(data_set)
    .enter()
    .append("p")
    .text(function(d,i){
        return("La valeur de d est " + d + " et l'indice de d est " + i + ".");
    })
```
Nous pouvons utiliser les fonctions anonymes pour définir
des attributs ou des propriétés.
```javascript
    .style("color",function(d){
        if(d < 15){
            return("red");
        }else{
            return("black");
        }
    });
```
[Lien CodePen.](https://codepen.io/claudiucornea/pen/YjgOVW)

* Chapitre suivant
    *  [Représentations graphiques](https://github.com/ClaudiuCornea/Tutorial/blob/master/Tutorial%20d3/Repr%C3%A9sentations%20graphiques.md)
*  Chapitre précédent
    *  [DOM et d3](https://github.com/ClaudiuCornea/Tutorial/blob/master/Tutorial%20d3/DOM%20et%20d3.md#dom-et-d3)