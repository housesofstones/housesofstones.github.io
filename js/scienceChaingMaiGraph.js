var graph_width = 600,
    graph_height = 400;

var force = d3.layout.force()
    .charge(-120)
    .linkDistance(120)
    .size([graph_width, graph_height]);


function update(d){

d3.select('div#graph').selectAll('svg').remove();

var graph_svg = d3.select('div#graph').append('svg')
    .attr('width', graph_width)
    .attr('height', graph_height);

d3.json('http://housesofstones.github.io/data/chiangGraph.json', function(error, json){
    
    jsonfile = {};
    nodes = [];
    links = [];
    tempdict = {};
    tempdict['name'] = d;
    nodes.push(tempdict);
    for (i=0; i<json[d].length; i++){
        dict = {};
        dict['name'] = json[d][i].name
        nodes.push(dict);
    }
    for (i=0; i<json[d].length; i++){
        dict = {};
        dict['source'] = 0;
        dict['target'] = i+1;
        dict['size'] = json[d][i].size
        links.push(dict);
    }
    jsonfile['nodes'] = nodes;
    jsonfile['links'] = links;
    
    force
        .nodes(jsonfile.nodes)
        .links(jsonfile.links)
        .start();

    var link = graph_svg.selectAll('.link')
        .data(jsonfile.links)
      .enter().append('line')
        .attr('class', 'link')
        .style('stroke-width', function(d){ return d.size; });

    var node = graph_svg.selectAll('.node')
        .data(jsonfile.nodes)
      .enter().append('g')
        .attr('class', 'node')
        .call(force.drag);

    node.append('circle')
        .attr('r', 7);

    node.append('title')
        .text(function(d){ return d.name; });

    node.append('text')
        .attr('dx', 12)
        .attr('dy', '.35em')
        .text(function(d){ return d.name; });

    node.on('click', function(d){ 
            if (book_terms.indexOf(d.name) > -1){
                return update(d.name);
            } else {
                d3.select(this).style('fill', 'grey');
            } })
        .on('mouseover', function(d){
            d3.select(this).style('cursor', 'pointer');
        })
        .on('mouseout', function(d){
            d3.select(this).style('cursor', 'pointer');
        });

    force.on('tick', function(){
        link.attr('x1', function(d){ return d.source.x; })
            .attr('y1', function(d){ return d.source.y; })
            .attr('x2', function(d){ return d.target.x; })
            .attr('y2', function(d){ return d.target.y; });

        node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    });
            

});

};

update('science');
