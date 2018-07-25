//DOM et d3
d3
    .select("body")
    .append("p")
    .text("Je viens de crée mon premier paragraphe en d3.")
    .attr("class", "begin")
    .style("color", "green")
    .style("font-size", "20px");

//Fonctions anonymes
let dataset =[5,10,15];
d3
    .select("body")
    .selectAll(".p")
    .data(dataset)
    .enter()
    .append("p")
    .text(function(d,i){
        return("La valeur de d est " + d + " et l'indice de d est " + i);
    })
    .style("color",function(d){
        if(d < 15){
            return("red");
        }else{
            return("black");
        }
    });

//Representations Graphiques
    //DOM  
d3
    .select("body")
    .selectAll(".div")
    .data(dataset)
    .enter()
    .append("div")
    .attr("class","bar")
    .style("width", "25px")
    .style("height",function(d){
        return(d + "px");
    })
    .style("background-color","black")
    .style("display","inline-block")
    .style("margin","5px");

    //SVG
let width = 500,
    height = 50;
let svg = d3
    .select("body")
    .append("svg")
    .style("width", width)
    .style("height", height);

    //Canvas et d3
let cercle = svg
    .selectAll(".circle")
    .data(dataset)
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

//Histogramme        
let bar = svg
    .selectAll(".rect")
    .data(dataset)
    .enter()
    .append("rect")
    .style("x", function(d,i){
        return(i * (width / dataset.length) );
    })
    .style("y", function(d){
        return(height - d);
    })
    .style("width", width / dataset.length - 1)
    .style("height", function(d){
        return(d);
    })
    .style("fill","red")
    //Interactivité
    .on("mouseover", function(){
        d3
            .selectAll(".rect")
            .style("opacity", 0.3);
        d3
            .select(this)
            .style("opacity", 1);
    })
    .on("mouseout",function(){
        d3
            .selectAll(".rect")
            .style("opacity", 1);

    });
    //Label
let label = svg
    .selectAll(".text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d){
        return(d);
    })
    .attr("x", function(d,i){
        return(i * (width / dataset.length) + (width / dataset.length) / 2);
    })
    .attr("y", function(d){
        return(height - d );
    });
    
//Données    
let data_obj = [
    {x : 0,
    y : 5},
    {x : 1,
    y : 10},
    {x: 2,
    y : 15}
];

let margin ={
    "top" : 0,
    "right" : 0,
    "bottom" : 10,
    "left" : 10
    };

let x_scale = d3
    .scaleLinear()
    .domain([0 , 3])
    .range([0 , width]);

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


let x_axis = d3
    .axisBottom(band_scale);
svg
    .append("g")
    .attr("transform", "translate(0 ," + (height - margin.bottom) + ")")
    .call(x_axis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx","-0.5em")
    .attr("dy", "-.55em")
    .attr("transform", "rotate(90)");

let y_axis = d3
    .axisLeft(y_scale);
svg
    .append("g")
    .attr("transform", "translate(" + margin.left + ",0)")
    .call(y_axis);
    
let line_graph = d3
    .line()
    .x(function(d){
        return(x_scale(d.x));
    
    })
    .y(function(d){
        return(y_scale(d.y));
    });
    
svg
    .append("path")
    .attr("d",line_graph(data_obj,x_scale,y_scale))
    .attr("stroke","green")
    .attr("stroke-width", 1)
    .attr("fill", "none");