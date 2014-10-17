var xTerms = d3.scale.ordinal().rangeRoundBands([0, width], .1);

var yTerms = d3.scale.linear().range([height, 0]);

var xAxisTerms = d3.svg.axis()
    .scale(xTerms)
    .orient('bottom');

var yAxisTerms = d3.svg.axis()
    .scale(yTerms)
    .orient('left');

var termsSvg = d3.select('div#top_terms').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom*2)
  .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var termsTable = d3.select('div#termstable').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

d3.csv("http://housesofstones.github.io/data/chiangTop_words.csv", function(error, data){
    data.forEach(function(d){
        d.count = +d.count;
    });
    console.log(d3.max(data, function(d){ return d.count; }));
    console.log(data);
    
    xTerms.domain(data.map(function(d){ return d.words; }));
    yTerms.domain([0, d3.max(data, function(d){ return d.count; })]);

    termsSvg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxisTerms)
      .selectAll('text')
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.35em")
        .attr("transform", "rotate(-70)" );

    termsSvg.append('g')
        .attr('class', 'y axis')
        .call(yAxisTerms)
      .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('Count');

    termsSvg.selectAll('bar')
        .data(data)
      .enter().append('rect')
        .attr('class', 'chart_bar')
        .attr('x', function(d){ return xTerms(d.words); })
        .attr('width', xTerms.rangeBand())
        .attr('y', function(d){ return yTerms(d.count); })
        .attr('height', function(d){ return height - yTerms(d.count); })
        .on('mouseover', function(d){
            d3.select(this).style('fill', '#D80913');
            })
        .on('mouseout', function(d){
            d3.select(this).style('fill', '#E35604')
            })
        .on('click', function(d){
            create_label(d.words);
            create_termsTable(d.words);
        });

    termsSvg.append('text')
        .attr('class', 'chart_title')
        .attr('x', width/3)
        .attr('y', 0)
        .style('font-size', '15px')
        .style('fill', '#213CB1')
        .text("The fifty most frequent words in the titles");

    function create_label(d){
        termsSvg.selectAll('.title').remove();

        termsSvg.append('text')
            .attr('class', 'title')
            .attr('x', width/2)
            .attr('y', height + margin.bottom*1.5)
            .style('font-size', '15px')
            .text(d);

        termsSvg.selectAll('.title')
            .transition()
            .text(d);

    }

    function create_termsTable(d){

        d3.csv("http://housesofstones.github.io/data/chiangMai_data.csv", function(error, main_data){

        var termLabels = termsTable.selectAll('.titles')
            .data(main_data.filter(function(e){
                if (e.tokens.indexOf(d) > -1){
                    return e.found_title;
                }
            }));


        termLabels
            .enter().append('text')
            .attr('class', 'titles')
            .attr('x', 20)
            .attr('y', function(d,i){ return (i*15) })
            .text(function(e){ return e.found_title })
            .on('mouseover', function(d){
                d3.select(this)
                .style('fill', 'blue')
                .style('text-decoration', 'underline')
                .style('cursor', 'pointer')
            })
            .on('mouseout', function(d){
                d3.select(this)
                .style('fill', 'black')
                .style('text-decoration', 'none')
                .style('cursor', 'default')
            });

        termLabels
            .data(main_data.filter(function(e){
                if (e.tokens.indexOf(d) > -1){
                    return e.found_title;
                }
            }))
            .transition()
            .duration(400)
            .text(function(e){ return e.found_title });

        termLabels.exit().remove();

    })

}
});