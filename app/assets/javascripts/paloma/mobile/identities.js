var w,h;
var svg;
var tour_list;
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
  var _l = _L['mobile'];


  Paloma.callbacks['mobile']['identities'] = function(params){
      var nodes = [];
      var links = [];
      tour_list = params['tours_list'];

      for(var i = 0; i<tour_list.length; i++)
      {
          nodes.push({"id":i,"title":tour_list[i].title,"image":tour_list[i].image});
          //links -> {source, target, value}
          var target = i+1;
          if(target >= tour_list.length){target = 0;}
          links.push({"source":i, "target":target, "value":25})
      }
     // svg = d3.select("#chart").append("svg");
      //w = 300;
      //h = 300;

      /********* NEW CODE ***********/

      w = 500;
      h = 500;

      var zoom = d3.behavior.zoom()
              .scale(0.75)
              .on("zoom", redraw);

      svg = d3.select("#chart")
              .append("svg")
              .attr("viewBox", "0 0 " + w + " " + h )
              .attr("preserveAspectRatio", "xMidYMid meet")
              .attr("pointer-events", "all")
              .call(zoom);


      svg = svg.append('svg:g');


      function redraw() {
          svg.attr("transform",
                           "scale(0.75)");
      }

      draw_graph_iden(nodes, links);
      redraw();

      /********** NEW CODE END *********/

     // svg.attr("viewbox",function(){return "0 0 " + w + " " + h + " ";}) ;
      //createChart(nodes, links);

      //Touch and click events
      $('.touch_click').on('touchstart', function (e) {
          // listen for a touchend event
          e.stopPropagation();
          e.preventDefault();
          //$(e.target).off('click');
          $(e.target).one('touchend', function () {
              var tar = e.target;
              var node_id = $(tar).attr("node_id");
              console.log("touch "+node_id);
              aboutTours(node_id);
              //e.handled = true;
          });

          // cancel it in 150ms
          setTimeout(function () {
              $(e.target).off('touchend');
          }, 150);
      });

      $('.touch_click').click(function (e) {
          if (e.handled != true) {
              var tar = e.target;
              var node_id = $(tar).attr("node_id");
              console.log("click "+node_id);
              aboutTours(node_id);
          }
      });

  };
})();

function draw_graph_iden(nodes, links) {
    var force = d3.layout.force()
            .charge(-1000)
            .linkDistance(80)
            .nodes(nodes)
            .links(links)
            .size([w, h])
            .gravity(0.1)
            .start();

    var node = svg.selectAll(".node")
            .data(nodes)
            .enter().append("image")
            .attr("class", "node")
            .attr("xlink:href",function(d){return d.image;})
            .attr("width", 100)
            .attr("height",100)
            .attr("x","-3em")
            .attr("y","-3em")
            .attr("class","touch_click")
            .attr("node_id",function(d){return d.id;})
            .call(force.drag);

    node.append("title")
            .text(function(d) { return d.name; });

    force.on("tick", function() {
        node.attr("transform", function(d)
        {
            return "translate(" + d.x + "," + d.y + ")";
        });
    });
}

function aboutTours(i)
{
    var p = d3.select("#info").text(tour_list[i].about);
    var h = d3.select('#title').text(tour_list[i].title.toUpperCase());
    $('#iden_image').attr("src",tour_list[i].image);
    var picked_identity = tour_list[i].id;
    var link =  "../mobile/items?identity=" + picked_identity;
    var btn_Link = $('#ident_to_item_link').click(function(){window.open(link, "_self");})
    resizeInfoModalMap("teaser_body");
    $("#teaser").modal();
}

function createChart(nodes, links)
{
    var force = d3.layout.force()
        .charge(-800)
        .linkDistance(90)
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

    node.append("image")
        .attr("xlink:href", function(d) {return d.image;})
        .attr("x", -8)
        .attr("y", -8)
        .attr("height", 100)
        .attr("width",100)
        .attr("node_id",function(d){return d.id;})
        .attr("class","touch_click");
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
    force.start();
}

