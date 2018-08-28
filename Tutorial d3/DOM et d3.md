# DOM et d3

Dans ce premier chapitre nous allons voir comment
manipuler le DOM avec d3, nous allons voir qu'il
y a une grande similitude avec le CSS.
Exemple avec l'ajout d'un paragraphe dans le body.
```javascript
d3
    .select("body")
    .append("p")
```
Ajoutons du texte dans la balise créee.
```javascript
    .text("Je viens de crée mon premier paragraphe en d3.")
```
Ajoutons maintenant une classe.
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
[Lien CodePen.](https://codepen.io/claudiucornea/pen/qyvYxO)