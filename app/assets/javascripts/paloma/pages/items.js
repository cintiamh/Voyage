var w,h;
var svg;
var pieces_list;
var nodes =[], links= [];

(function(){
  // You access variables from before/around filters from _x object.
  // You can also share variables to after/around filters through _x object.
  var _x = Paloma.variableContainer;

  // We are using _L as an alias for the locals container.
  // Use either of the two to access locals from other scopes.
  //
  // Example:
  // _L.otherController.localVariable = 100;
  var _L = Paloma.locals;

  // Access locals for the current scope through the _l object.
  //
  // Example:
  // _l.localMethod(); 
  var _l = _L['pages'];


  Paloma.callbacks['pages']['items'] = function(params)
  {
    pieces_list = params['pieces_list'];
      svg = d3.select("svg");

      var parent = $("div[data-role='content']");
      w = parent.innerWidth() - 20;
      h = parent.height() - 20;

      constructNodeLinks();

      //svg.attr("width",w)
      //    .attr("height",h)
      //    .attr("viewBox", "0 0 750 500");

      svg.attr("viewbox",function(){return "0 0 " + w + " " + h + " ";}) ;

      createItemsChart(nodes, links);
  };


})();

function constructNodeLinks()
{
    nodes.push({"id":-1,"title":"GO"});
    for(var i = 0; i<pieces_list.length; i++)
    {
        nodes.push({"id":i,"title":pieces_list[i].title});

        //links -> {source, target, value}

        links.push({"source":0,"target":i+1,"value":25});

        var target = i+2;
        if(target >= pieces_list.length+1){target = 1;}
        links.push({"source":i+1, "target":target, "value":25})
    }
}

function aboutPieces(i)
{
    var p = d3.select("#info").text(pieces_list[i].about);
    var h = d3.select('#title').text(pieces_list[i].title);
    $("#teaser").popup();
    $("#teaser").popup("open");
}

function createItemsChart(nodes, links)
{
    var force = d3.layout.force()
        .charge(-500)
        .linkDistance(100)
        .size([w, h]);

    force.nodes(nodes)
        .links(links)
        .start();

    var link = svg.selectAll(".link")
        .data(links)
        .enter().append("line")
        .attr("class", "link");


    var node = svg.selectAll(".node")
        .data(nodes)
        .enter().append("g")
        .attr("class", "node")
        .call(force.drag);

    node.append("circle")
        .attr("x",-8)
        .attr("y",-8)
        .attr("r",30)
        .attr("fill","red")
        .attr("onclick",function(d)
        {
            return "return aboutPieces("+d.id+")";
        });

    node.append("text")
        .text(function(d){return d.title;})
        .attr("x", "-0.75em")
        .attr("dy", ".35em");

    force.on("tick", function() {
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node.attr("transform", function(d)
        {
            //if(d.group == 1) {return "translate(0,0)";}
            //else
            return "translate(" + d.x + "," + d.y + ")";
        });
    });//force.on()
}