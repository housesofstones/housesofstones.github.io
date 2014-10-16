---
title: Science in the Bookshops of Chiang Mai
author: PMeinshausen
layout: post
permalink: 
jabber_published:
categories:
  - Personal
tags:
  - ethnography
  - travel
  - visualization
---
<!--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">-->
<link rel="stylesheet" href="https://code.jquery.com/ui/1.11.1/themes/smoothness/jquery-ui.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="https://code.jquery.com/ui/1.11.1/jquery-ui.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
<script src="http://d3js.org/d3.v3.min.js"></script>
<script>
    var book_terms = [];
    $(document).ready(function(){
        $.getJSON('http://housesofstones.github.io/data/chiangGraph.json', function(response){
            for (i=0; i<Object.keys(response).length; i++){
                book_terms.push(Object.keys(response)[i]);
            }
        });
    });
    $(function() {
        var availableTags = book_terms;
        $( "#tags" ).autocomplete({
            source: availableTags
        });
    });
</script>
<style>
    body {
        font: 10px sans-serif;
    }
    div {
        margin-top: 20px;
    }
    .node {
        stroke-width: 1.5px;
    }

    .link {
        stroke: #EBC51C;
        stroke-opacity: .6;
    }

    .node {
        fill: #E35604;
    }

    .node text {
        color: #000;
        font: 10px sans-serif;
        pointer-events: none;
    }
    .text_scroll {
        max-height:100px;
        overflow-y:scroll;
        width:700px;
    }
    .axis path,
    .axis line {
        fill: none;
        stroke: #213CB1;
        shape-rendering: crispEdges;
    }

    rect {
        fill: #E35604;
    }
</style>


<div>
    Text

</div>
<div class="panel-group" id="accordion">
  <div class="panel panel-default">
    <div class="panel-heading">
      <h5 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne">
          Photo of Bookshelf
        </a>
      </h5>
    </div>
    <div id="collapseOne" class="panel-collapse collapse">
      <div class="panel-body">
        <img src="https://googledrive.com/host/0B4U5l0y6n26iNHFiakpqLVhjOUk/chiang_1bookshelf1.jpg">
      </div>
    </div>
  </div>
</div>
<div id="chart"></div>
<div class='text_scroll' id="table"></div>
<div id="top_terms"></div>
<div class='text_scroll' id="termstable"></div>
<div class="ui-widget">
    <label for="tags">Tags: </label>
    <input id="tags">
        <button type= "submit" id= "SUBMIT" onclick="update($('#tags').val())" value="SUBMIT">  SUBMIT</button>
</div>
<div id="graph"></div>

<script src="http://housesofstones.github.io/js/scienceChaingMaiYears.js">
</script>
<script src="http://housesofstones.github.io/js/scienceChaingMaiTerms.js">
</script>
<script src="http://housesofstones.github.io/js/scienceChaingMaiGraph.js">
</script>