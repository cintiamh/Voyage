

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


  Paloma.callbacks['pages']['identities'] = function(params)
  {
      var nodes = [];
      var links = [];
     var id = params['tours_list'];
      for(var i = 0; i<id.length; i++)
      {
          nodes.push({"title":id[i].title});
          //links -> {source, target, value}
          var target = i+1;
          if(target >= id.length){target = 0;}
          links.push({"source":i, "target":target, "value":25})
      }

      createChart(nodes, links);
  };


})();

function createChart(nodes, links)
{
    alert("starting chart creation");
    var w = $('#chart').width();
    var h = $('#chart').height();

    var svg = d3.select("svg");

    var force = d3.layout.force()
        .charge(-3000)
        .linkDistance(200)
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
        .attr("r",50)
        .attr("fill","red");

    node.append("text")
        .text(function(d){return d.title;})
        .attr("x", -35)
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
