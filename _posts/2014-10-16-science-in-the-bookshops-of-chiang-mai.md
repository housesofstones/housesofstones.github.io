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
        font: 10px;
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
    .axis {
        font: 10px;
    }

    rect {
        fill: #E35604;
    }
</style>

<div>
    I spent the weekend before last in <a href="http://en.wikipedia.org/wiki/Chiang_Mai">Chiang Mai</a> and while I was there I wandered into a small used bookshop that catered to backpackers and wanderers. Browsing through the shelves and spotting familiar authors and titles that I haven't had time for in the past several years proved about as soothing and relaxing as a Thai massage. It also reminded me of ethnography, another main interest of mine that I don't give as much attention as I wish I might. So on a whim I decided to engage in a small ethnographic exercise and combine travel, books, ethnography, and data collection.
</div>
<div>
    Taking a look at the shelves marked 'science', I decided to systematically describe the science books that show up in the used bookshops of Chiang Mai. To do that I needed to collect data. The data science that interests me the most starts with the collection of <a href="http://en.wikipedia.org/wiki/In_situ#Experimental_psychology">in situ</a> data, not with a ready-made and cleaned dataset divorced from its context. If the data's original context is not already digitized (online or mobile), then that's even more interesting. I want to know more about the parts of peoples' lives that aren't spent on their phone or computer. That's what ethnography is really good at describing, and data collection is a critical part of ethnography. In the early days of anthropology a big part of ethnographic training had to do with the use of notebooks, tape recorders and other means for systematically recording observations of daily life and other social phenomena. 
</div>
<div>
    Recording each book on the shelf in a notebook would have been the most reliable way of ensuring my sample was accurate and complete, but it wouldn't have scaled well. So I snapped a few pictures of the science bookshelf with my smart phone. Since this was all on the prompting of an idea that had come to me about two minutes before and since taking a picture of a bookshelf seemed entirely unobjectionable, I have to admit I failed to get the informed consent of the bookstore owner. Of course this wouldn't have been ok with an <a href="http://en.wikipedia.org/wiki/Institutional_review_board">IRB</a> and it turned out that it wasn't ok with the owner either. However, the owner let me take the pictures after I agreed to buy a book (though I'm not sure an IRB would have looked on that as an acceptable way of gaining consent either). During the rest of my trip I managed to visit three different bookshops and photograph their science shelves. 
</div>
<!--
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
-->
<script src="https://gist.github.com/PMeinshausen/c088ab28f515176685cb.js"></script>
<div id="chart"></div>
<div class='text_scroll' id="table"></div>
<div id="top_terms" style="margin-top:10px;"></div>
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