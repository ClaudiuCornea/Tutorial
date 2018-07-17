let dataset =[5,10,15];

d3.select("body")
    .append("div");

d3.select("body")
    .selectAll("p")
    .data(dataset)
    .enter()
    .append("p")
    .text(function(d){
        return(d);})
    .style("color",function(d){
        console.log(d);
        if(d < 15){
            return("red");
        }else{
            return("black");
        }
    });
    
d3.select("body")
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("class","bar")
    .style("width", "25px")
    .style("height",function(d){
        return(d + "px");
    })
    .style("background-color","black")
    .style("display","inline-block")
    .style("margin","5px");

let width = 500,
    height = 50;
    
let svg = d3.select("body")
            .append("svg")
            .style("width", width)
            .style("height", height);

let cercle = svg.selectAll("circle")
                .data(dataset)
                .enter()
                .append("circle");
                
cercle.style("cx", function(d,i){
        return(i * 100 + 25);})
    .style("cy", height/2)
    .style("r", function(d){
        return(d);});