var margin = {top: 20, right: 20, bottom: 40, left: 30},
            width = 600 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;

var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);

var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom');

var yAxis = d3.svg.axis()
    .scale(y)
    .orient('left');

var svg = d3.select('div#chart').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom*1.5)
  .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var svgTable = d3.select('div#table').append('svg')
    .attr('width', width + 50 + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


d3.csv("http://housesofstones.github.io/data/chiangMai_data.csv ", function(error, data){

    years = {};
    for (i=0; i<data.length; i++){
        if (!(data[i].date in years)){
            years[data[i].date] = 1;
        } else {
            years[data[i].date] = years[data[i].date] + 1
        }
    }

    bar_data = [];
    for (var key in years){
        bar_dict = {};
        bar_dict['year'] = key;
        bar_dict['value'] = years[key];
        bar_data.push(bar_dict);
    }
    
    x.domain(bar_data.map(function(d){ return d.year; }));
    y.domain([0, d3.max(bar_data, function(d){ return d.value; })]);

    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)
      .selectAll('text')
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.35em")
        .attr("transform", "rotate(-70)" );

    svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
      .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('Count');

    svg.append('text')
        .attr('x', 40)
        .attr('y', 30)
        .style('fill', '#D80913')
        .style('font-size', '10px')
        .text('Select a bar to view');
    svg.append('text')
        .attr('x', 40)
        .attr('y', 45)
        .style('fill', '#D80913')
        .style('font-size', '10px')
        .text('books from that year');

    svg.selectAll('bar')
        .data(bar_data)
      .enter().append('rect')
        .attr('class', 'chart_bar')
        .attr('x', function(d){ return x(d.year); })
        .attr('width', x.rangeBand())
        .attr('y', function(d){ return y(d.value); })
        .attr('height', function(d){ return height - y(d.value); })
        .on('mouseover', function(d){
            d3.select(this).style('fill', '#D80913');
            })
        .on('mouseout', function(d){
            d3.select(this).style('fill', '#E35604')
            })
        .on('click', function(d){
            create_label(d);
            create_table(d);
        });

    svg.append('text')
            .attr('class', 'chart_title')
            .attr('x', width/3)
            .attr('y', 0)
            .style('font-size', '15px')
            .style('fill', '#213CB1')
            .text("Year the book was published");

    function create_label(d){
        svg.selectAll('.title').remove();

        svg.append('text')
            .attr('class', 'title')
            .attr('x', width/2)
            .attr('y', height + margin.bottom*1.4)
            .style('font-size', '15px')
            .text(d.year);

        svg.selectAll('.title')
            .transition()
            .text(d.year);

    }

    function create_table(d){

        var labels = svgTable.selectAll('.titles')
            .data(data.filter(function(el){
                return el.date == d.year;
            }));

        labels
            .enter().append('text')
            .attr('class', 'titles')
            .attr('x', 5)
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
            })
            .on('click', function(e){ return OpenInNewTab(e.link) });

        labels
            .data(data.filter(function(el){
                return el.date == d.year;
            }))
            .transition()
            .duration(400)
            .text(function(e){ return e.found_title });

        labels.exit().remove();

    }

    function OpenInNewTab(url){
        var win = window.open(url, '_blank');
        win.focus();
    }
});