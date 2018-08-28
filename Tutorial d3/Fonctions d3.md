## Fonctions d3

Dans cette section vous allez retrouver toutes 
les fonctions utilisées durant le tutoriel avec
tout ce qu'il faut pour mieux comprendre 
le fonctionnement.
* d3 => appel à la librairie d3
* .select() => sélection, pareil qu'en CSS, d'un élément du DOM
* .selectAll() => sélection de plusieurs éléments du DOM, s'ils n'existent pas la fonction les considére comme un ajout futur et les ajoute à la suite de ceux sélectionnés
* .append() => création d'un élément du DOM
* .text() => string inséré dans l'élément généré avec append()
* .data() => sélection des données
* .enter() => début d'une boucle qui parcourt tous les éléments de data()
* .attr("attribute", "valeur") => ajout d'un attribut HTML
* .style("propertie", "value") => ajout d'une propriété CSS
* .on("event",function) => lance une fonction si un événement se produit
* .domain() => plage de données qui contient la plus petite et la plus grande valeur des données, les arguments doivent être des entiers
* .range() => partie du svg utilisée pour le graphique

* _function(d){return(d);}_ => fonction anonyme renvoie l'élément(d) parcouru par enter()