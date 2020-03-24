// all of this prior to passing the data() // classwork hair bands

var width = parseInt(d3.select("#scatter").style("width")); //(q4TJ or DK) style "width"?? //pull from "scatter row 22"

var height = width - width / 4; //height of the scatter plot graph

var margin = 25; //Margin spacing for graph

var axislabels = 125;

var leftpadding = 50;
var botpadding = 50;


//canvass of the chart
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("class", "chart");

//fsize and radio of the dots
  var Radiocir;
  function crGet() {
    if (width <= 530) {
      Radiocir = 5;
    }
    else {
      Radiocir = 10;
    }
  }
  crGet();

//Coding the axis for D3... I prefer plotly

//BOTTOM AXIS of the chart

svg.append("g").attr("class", "xlabel");                            
var xlabel = d3.select(".xlabel");

xlabel.attr(
  "transform",
  "translate(" +
    ((width - axislabels) / 2 + axislabels) +
    ", " +
    (height - margin - botpadding) +
    ")"
);

    //labels distance from X-axis

    xlabel
    .append("text")
    .attr("y", -25)
    .attr("data-name", "income")
    .attr("data-axis", "x")
    .attr("class", "Text active x")
    .text("Income");

// LEFT axis

var leftTextX = margin + leftpadding;
var leftTextY = (height + axislabels) / 2 - axislabels;

svg.append("g").attr("class", "ylabels");

var ylabels = d3.select(".ylabels"); // where does .labels come from????

  ylabels.attr(
    "transform",
    "translate(" + leftTextX + ", " + leftTextY + ")rotate(-90)"
  );

// ylabels

//picking lacks healthcare

ylabels
.append("text")
.attr("y", 25)
.attr("data-name", "healthcare")
.attr("data-axis", "y")
.attr("class", "aText inactive y")
.text("Healthcare");
    
    
//Import the csv file to pass the data on all the code above

d3.csv("assets/data/data.csv").then(function(data) {
  visualize(data);
});

function visualize(Dataset) {
  var X = "income";
  var Y = "healthcare";

  var xMin;
  var xMax;
  var yMin;
  var yMax;

    // for x
  function xMinMax() {
    xMin = d3.min(Dataset, function(d) {
      return parseFloat(d[X])*.9; //distance is 4 in total on width...
    });

    xMax = d3.max(Dataset, function(d) {
      return parseFloat(d[X])*1.1;
    });
  }

  //now for y
  function yMinMax() {
    yMin = d3.min(Dataset, function(d) {
      return parseFloat(d[Y])*.9;
    });

    yMax = d3.max(Dataset, function(d) {
      return parseFloat(d[Y])*1.1;
    });
  }

  xMinMax();
  yMinMax();

  //Scales

  var xscale = d3
    .scaleLinear()
    .domain([xMin, xMax])
    .range([margin + axislabels, width - margin]);
  var yscale = d3
    .scaleLinear()
    .domain([yMin, yMax])
    .range([height - margin - axislabels, margin]);
  
  
  // making the axis... F.. not working.

  var xAxis = d3.axisBottom(xscale);
  var yAxis = d3.axisLeft(yscale);
  
  svg
    .append("g")
    .call(xAxis)
    .attr("class", "xAxis")
    .attr("transform", "translate(0," + (height - margin - axislabels) + ")");
  svg
    .append("g")
    .call(yAxis)
    .attr("class", "yAxis")
    .attr("transform", "translate(" + (margin + axislabels) + ", 0)");


  var statedots = svg.selectAll("g statedots").data(Dataset).enter();
  
  statedots
    .append("circle")
    .attr("cx", function(d) {
      return xscale(d[X]);
    })
    .attr("cy", function(d) {
      return yscale(d[Y]);
    })
    .attr("r", Radiocir)
    .attr("class", function(d) {
      return "stateCircle " + d.abbr;
    })

    statedots
    .append("text")
    .text(function(d) {
      return d.abbr;
    })
    
    .attr("dx", function(d) {
      return xscale(d[X]);
    })
    .attr("dy", function(d) {
      return yscale(d[Y]) + Radiocir / 2.5; //radio is 5
    })
    .attr("font-size", Radiocir)
    .attr("class", "stateText")
  }



