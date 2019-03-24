/*
Pascal Vos
1422537vos
24-03-2019
*/

// ------------------------------------------------------------------------------------------------------------------------------

// Exercise 22 Animated bar chart
var btn_Exercise_22 = document.getElementById("animated_Bar_Chart");
btn_Exercise_22.addEventListener("click", animated_Bar_Chart);

let arr1 = [5, 10, 18, 24, 44, 57, 60]; 
let arr2 = [22, 30, 15, 50]; 
let arr3 = [17,25,70,33,42,51,63,48,36];
let arrData = arr1;

function animated_Bar_Chart()
{  
    if(document.getElementById("Exercise 22 Button 1"))
    {
        console.log("Er bestaan al 3 buttons")
    }
    else
    {
        var amountButtons = [1, 2, 3];
        var buttonText = ["Exercise 22 Button 1", "Exercise 22 Button 2", "Exercise 22 Button 3"];
        //Hij selecteert een element wat niet bestaat anders slaat hij de eerste waarde in de array al over
        d3.select("body").selectAll(".body")
        .data(amountButtons)
        .enter().append("button")
        .text(function(d, i)
        {
           return buttonText[i];
        })
        .attr("id", function(d, i)
        {
           return buttonText[i];
        })
        .style("margin", "auto")
        .style("background-color", "rgb(76, 168, 175)")
        .style("border", 1 + "px solid rgb(80, 180, 175)")
        .style("color","white")
        .style("padding", 10 + "px" + 24 + "px")
        .style("cursor","pointer")
        .style("width", 100 + "%")
        .style("display","block")
        .style("border-bottom", "none")
        .on("mouseover", function() 
        {   
            d3.select(this).style("background-color", "#3e8e41")
        })                  
        .on("mouseout", function() 
        {       
            d3.select(this).style("background-color", "rgb(76, 168, 175)")
        })
        .on("click", function(d, i) 
        {
            var svg = d3.select("#svg1")
            var selectArray = [arr1, arr2, arr3]
            arrData = selectArray[i];
            update_Chart(svg);
            d3.event.stopPropagation();
        });
        d3.select("body").append("svg")
        .attr("id", "svg1")
        .attr("width", "100%")
        .attr("height", 300)
    }  
}

function update_Chart(svg)
{  
    var chart = svg.selectAll("rect")
    .data(arrData)

    chart.transition()  
        .duration(3000)  
        .attr("x", 0)
        //(i + 0.5) is om te zorgen dat eerste bar niet tegen button staat
        // i * 30 omdat de hoogte van elke rect 20px is en om 10px er tussen te krijgen wordt 30 gebruikt
        .attr("y", (d, i) => (i + 0.5) * 30)
        //d * 5 elke waarde in de dataset wordt maal 5 gedaan
        .attr("width", (d, i) => d * 5)
        .attr("height", 20)
        .style("fill","steelblue");
        
    chart.exit().remove();
    
    chart.enter().append("rect")
        .transition()  
            .duration(3000)  
            .attr("x", 0)
            //(i + 0.5) is om te zorgen dat eerste bar niet tegen button staat
            // i * 30 omdat de hoogte van elke rect 20px is en om 10px er tussen te krijgen wordt 30 gebruikt
            .attr("y", (d, i) => (i + 0.5) * 30)
            //d * 5 elke waarde in de dataset wordt maal 5 gedaan
            .attr("width", (d, i) => d * 5)
            .attr("height", 20)
            .style("fill","steelblue")
            .style("margin", "10 px");
}

// ------------------------------------------------------------------------------------------------------------------------------

// Exercise 24a/b/c An apple for the thirst
var btn_Exercise_24 = document.getElementById("apple_For_The_Thirst");
btn_Exercise_24.addEventListener("click", apple_For_The_Thirst);

function apple_For_The_Thirst()
{
    //Controleren of er al een svg met cirkels bestaat, als deze bestaat eerst verwijderen
    if(d3.select("#svg2"))
    {
        d3.select("#svg2").remove()
    }
    d3.select("body")
    .append("svg")
    .attr("id", "svg2")
    .attr("width", 600)
    .attr("height", 600)
    //Viewbox met 20px hoogte vergroot zodat xAs er onder past 
    .attr("viewBox", "0 0 600 640")
   
    var circleData = [];
    for(var i = 0; i < 20; i++)
    {   
        xValue = Math.floor(Math.random() * 100)
        yValue = Math.floor(Math.random() * 100)
        circleData.push({x: xValue,y: yValue, r: 15});   
    }

    var color = d3.scaleSequential()
    .domain([0, 100])
    .interpolator(d3.interpolateRainbow);

    var circleScale = d3.scaleLinear()
    //Wanneer de input waarde 100 is wordt deze omgezet naar de maximale waarde in de range namelijk 600
    //Input 50 wordt 300 etc etc..
    .domain([0, 100])
    .range([0, 600]);

    //Cirkel aanmaken in svg
    var svg = d3.select("#svg2");
    var circles = svg.selectAll(".body")
    .data(circleData)
    .enter().append("circle")

    //Cirkel instellingen aanmaken
    circles.attr("cx", circleData => circleScale(circleData.x))
    .attr("cy", circleData => circleScale(circleData.y))
    .attr("r", circleData => circleData.r)
    .attr("fill", function() 
    {
        return color(Math.floor(Math.random() * 100))
    })
    .on("click", function() 
    {
        d3.select(this).remove();
    });

    var xAsisNumbers = [0, 100];
    
    var xScale = d3.scaleLinear()
    .domain([0, d3.max(xAsisNumbers)])
    .range([0, 600]);

    var xAxis = d3.axisBottom()
    .scale(xScale);

    //Locatie van de xAs
    svg.append("g")
        .attr("transform", "translate(0, 620)")
        .call(xAxis)
}
