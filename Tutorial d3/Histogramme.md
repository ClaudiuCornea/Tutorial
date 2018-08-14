## Histogramme

### Table des matières
1. [Interactivité](https://github.com/ClaudiuCornea/Tutorial/blob/master/Tutorial%20d3/Histogramme.md#interactivit%C3%A9)
2. [Label](https://github.com/ClaudiuCornea/Tutorial/blob/master/Tutorial%20d3/Histogramme.md#label)
3. [Données](https://github.com/ClaudiuCornea/Tutorial/blob/master/Tutorial%20d3/Histogramme.md#donn%C3%A9es)

Nous allons voir comment réaliser un simple histogramme avec nos données.
Pour définir les bâtonnets nous avons besoin de définir les propriétés suivantes :
* _height_, la hauteur du bâtonnet, le seul souci que nous avons c'est que les bâtonnets se
    dessinent du haut vers le bas, nous allons régler les soucis plus bas
* _width_, la largeur du bâtonnet, nous pouvons la définir en pixels ou bien en fonction de la largeur du svg
    ```javascript
    .style("width", width / data_set.lenght [- bar_padding])
    ```
    _rappel : les arguments entre [] sont optionels_
* coordonnée _x_, nous allons souvent utiliser l'index de la donnée
    ```javascript
    //les bâtonnets les uns après les autres [avec un margin]
    .style("x", function(d,i){
        return(i * (bar_width [+ bar_margin]));
    })
    //les bâtonnets équidistants sur tout le svg
    .style("x", function(d, i){
        return(i * (width / data_set.lenght));
    })
    ```
* coordonnée _y_, nous allons résoudre le souci des bâtonnets du haut vers le bas
    nous allons décaler vers le bas le bâtonnet de toute la hauteur du svg et 
    ensuite soustraire la hauteur que nous donnent nos données
    ```javascript
    .style("y", function(d){
        return(height - d);
    })
    ```
* maintenant que notre histogramme est bien crée nous pouvons styliser
   les bâtonnets comme nous le voulons, en d3 ou en CSS.
Exemple:
```javascript
let bar = svg
    .selectAll("rect")
    .data(data_set)
    .enter()
    .append("rect")
    .style("x", function(d,i){
        return(i * (width / data_set.length) );
    })
    .style("y", function(d){
        return(height - d);
    })
    .style("width", width / data_set.length - 1)
    .style("height", function(d){
        return(d);
    })
    .style("fill","red");
```
[Lien CodePen.](https://codepen.io/claudiucornea/pen/GBeYEB)

### Interactivité

Maintenant que nous avons notre histogramme crée nous allons rajouter un peu
d'intercativité dans le graphique afin de mieux observer les données.
Par exemple, nous allons mettre en avant le bâtonnet que nous allons survoler
avec la souris.
En d3, pour garder un seul bâtonnet opaque, il faut rendre tous les bâtonnets
transparents et ensuite changer l'opacité de celui survolé.
```javascript
    .on("mouseover", function(){
        d3
            .selectAll("rect")
            .style("opacity", 0.3);
        d3
            .select(this)
            .style("opacity", 1);
    })
```
Sans oublier le cas où le graphique n'est pas survolé par la souris.
```javascript
    .on("mouseout",function(){
        d3
            .selectAll("rect")
            .style("opacity", 1);

    })
```
Il suffit de rajouter l'interactivité dans la déclaration des bâtonnets (bar)
pour que celà fonctionnne.    
[Lien CodePen.](https://codepen.io/claudiucornea/pen/mjozpG)

### Label

Parfois il est utile d'afficher la valeur de chaque bâtonnet dans le graphique.
Pour le faire nous allons simplement ajouter du texte en haut des bâtonnets.
```javascript
let label = svg
    .selectAll("text")
    .data(data_set)
    .enter()
    .append("text")
    .text(function(d){
        return(d);
    })
    .attr("x", function(d,i){
        return(i * (width / data_set.length) + (width / data_set.length) / 2);
    })
    .attr("y", function(d){
        return(height - d );
    });
```
Avec l'interactivité vu précédemment vous pouvez faire en sorte que le label
soit visible seulement au survol de la souris.     
[Lien CodePen.](https://codepen.io/claudiucornea/pen/VBREdx)

### Données

Jusqu'à présent nous avons travaillé avec des données dans un tableau
à une dimension.
```javascript
let data_set = [5,10,15]
```
Maintenant nous allons voir comment utiliser un tableau avec des objets
qui contiennent les informations nécessaires pour refaire
le même histogramme que jusqu'à présent.
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
il suffit de bien indiquer l'endroit où chercher l'information.
```javascript
let bar_obj = svg
    .selectAll("rect")
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
Comme vous pouvez le voir nous n'avons rien changé à notre graphique
autre que le fait que nous n'utilisons plus l'index car nous avons des
données sous la forme (x,y).      
[Lien CodePen.](https://codepen.io/claudiucornea/pen/vaPVPV)
