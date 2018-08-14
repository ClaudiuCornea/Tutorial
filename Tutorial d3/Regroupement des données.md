## Regroupement des données

Jusqu'à présent nous avons utilisé des données sous la forme
d'objets, avec seulement deux informations, nos coordonnées.
Malheureusement ce type de donnée nous limite dans la représentation,
Nous allons donc passer à la vitesse supérieure et voir comment
faire des graphiques avec plusieurs lignes par exemple.
Premièrement nous allons avoir des données sous cette forme.
```javascript
let data_complete = [
    {"Client": "ABC",
    "y" : 202,
    "x" : 2000},
    {"Client": "ABC",
    "y" : 215,
    "x" : 2002},
    {"Client": "ABC",
    "y" : 179,
    "x" : 2004},
    {"Client": "ABC",
    "y" : 199,
    "x" : 2006},
    {"Client": "XYZ",
    "y" : 100,
    "x" : 2000},
    {"Client": "XYZ",
    "y" : 215,
    "x" : 2002},
    {"Client": "XYZ",
    "y" : 179,
    "x" : 2004},
    {"Client": "XYZ",
    "y" : 199,
    "x" : 2006}
    ];
```
Avec ce que nous avons vu jusqu'à présent nous ne pourrions
pas exploiter nos données pour une quelconque représentation
graphique.
Avec d3 nous allons réorganiser nos données à l'aide de la
fonction _.nest()_, qui a besoin d'une clé et des données
pour nous réorganiser le tout en fonction de la clé que
nous allons lui donner.
```javascript
let useful_data = d3
    .nest()
    .key(function(d){
        return(d.Client);
    })
    .entries(data_complete);
```
Nos données sont sous la forme suivante à partir de maintenant:
```javascript
useful_data = [
    {"key" : "ABC",
    "values" : [
        {"Client": "ABC",
        "y" : 202,
        "x" : 2000},
        {"Client": "ABC",
        "y" : 215,
        "x" : 2002},
        {"Client": "ABC",
        "y" : 179,
        "x" : 2004},
        {"Client": "ABC",
        "y" : 199,
        "x" : 2006}
        ]
    },
    {"key" : "XYZ",
    "values" : [
        {"Client": "XYZ",
        "y" : 100,
        "x" : 2000},
        {"Client": "XYZ",
        "y" : 215,
        "x" : 2002},
        {"Client": "XYZ",
        "y" : 179,
        "x" : 2004},
        {"Client": "XYZ",
        "y" : 199,
        "x" : 2006}
        ]
    }];
```
Avec les données sous cette forme nous pouvons créer nos 
représentations graphiques, car nos données sont disposées
d'une manière similaire à ce que nous avons vu précédemment,
un objet avec des coordonnées x et y. Nous devons juste parcourir
nos données "Client" par "Client" et ajouter son graphique au
svg utilisé. Nous allons utiliser _.forEach_ pour parcourir
nos données.Voyons ce que cela donne en pratique.
```javascript
useful_data.forEach(function(d,i){
    svg
        .append("path")
        .attr("d",line_graph(d.values))
        .style("stroke","red")
        .style("stroke-width", 1)
        .style("fill", "none");
});
```
Voici la dérnière fonction que nous allons aborder dans ce tutoriel.      
[Lien CodePen.](https://codepen.io/claudiucornea/pen/KBYyXN)
