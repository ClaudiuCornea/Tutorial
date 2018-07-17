# Tutorial d3

## DOM et d3

Rien de plus facile que de manipuler le DOM avec d3.
Exemple avec l'ajout d'un paragraphe dans le body.
```javascript
d3.select("body")
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
    .style("color", "red")
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
d3.select("body")
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
* .enter() => débout d'une boucle qui parcourt tous les éléments de data()
* .attr("attribute", "valeur") => ajout d'un attribu HTML
* .style("propertie", "value") => ajout d'une proprièté CSS
* 
* _function(d){return(d);}_ => fonction anonyme renvoie l'élément(d) parcouru par enter()
* _function(d,i){return(d,i);}_ => pareil que la fonction précédente avec l'index(i) de de l'élément en plus