var w,h;
var svg;
var tour_list,user_id;
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
  // _l.localMethod();      user_id
  var _l = _L['mobile'];


  Paloma.callbacks['mobile']['identities'] = function(params){
      var nodes = [];
      var links = [];
      tour_list = params['tours_list']; //list of available tours
      user_id = params['user_id']; //current user id

      /******** Build the data structure to create the graph ***********/
      nodes.push({"id":-1,"title":"","image":"/assets/Life Preserver 4.png"})
      for(var i = 0; i<tour_list.length; i++)
      {
          nodes.push({"id":i,"title":tour_list[i].title,"image":tour_list[i].image});
          //links -> {source, target, value}
          links.push({"source":0, "target":i+1, "value":25})
      }
     // svg = d3.select("#chart").append("svg");
      //w = 300;
      //h = 300;

      /********* Build the graph ***********/

      w = 300;
      h = 300;

      var curScale = (0.60 - (0.05 * (tour_list.length - 3)));

      var zoom = d3.behavior.zoom()
              .scale(curScale)
              .on("zoom", redraw);

      svg = d3.select("#chart")
              .append("svg")
              .attr("viewBox", "0 0 " + w + " " + h )
              .attr("preserveAspectRatio", "xMidYMid meet")
              .attr("pointer-events", "all")
              .call(zoom);


      svg = svg.append('svg:g');


      function redraw() {

          //svg.attr("transform", "translate("+
            //  d3.event.translate.join(",")+")scale("+d3.event.scale+")");

          //svg.attr("transform","translate(95,21.62)"+"scale("+curScale+")");
          svg.attr("transform","translate(95,45)"+"scale("+0.4+")");
      }

      draw_graph_iden(nodes, links);
      redraw();

      /********** NEW CODE END *********/

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
            .charge(-1500)
            .linkDistance(200)
            .nodes(nodes)
            .links(links)
            .size([w, h])
            .gravity(0.1)
            .start();

    var link = svg.selectAll(".link")
        .data(links)
        .enter().append("line")
        .attr("class", "link")
        .style("stroke-width", "5" )
        .style("stroke-dasharray","5, 9");

    var node = svg.selectAll(".node")
            .data(nodes)
            .enter().append("g")
            .call(force.drag);

     node.append("image")
        .attr("class", "node")
        .attr("xlink:href",function(d){return d.image;})
        .attr("width",
             function(d){
                 if(d.id == -1)
                 {
                     return 250;
                 }
                 else
                 {
                     return 100;
                 }
             })
        .attr("height",function(d){
             if(d.id == -1)
             {
                 return 250;
             }
             else
             {
                 return 100;
             }
         })
        .attr("text-anchor", "middle")
        .attr("x",function(d){
             if(d.id == -1)
             {
                 return "-8.5em";
             }
             else
             {
                 return "-4em";
             }
         })
        .attr("y",function(d){
             if(d.id == -1)
             {
                 return "-8.5em";
             }
             else
             {
                 return "-4em";
             }
         })
        //.attr("class","touch_click")
        .attr("node_id",function(d){return d.id;})
         .on("click", function(d){return aboutTours(d.id)})
         .on("touchend", function(d){return aboutTours(d.id)});


    node.append("text")
        .attr("text-anchor", "middle")
        .attr("x","-0.5em")
        .attr("y", "4.5em")
        .attr("fill","white")
        .attr("class","node_title")
        .text(function(d) { return d.title.toUpperCase() });

    force.on("tick", function() {
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node.attr("transform", function(d)
        {
            return "translate(" + d.x + "," + d.y + ")";
        });
    });
}

function aboutTours(i)
{
    var picked_identity = tour_list[i].id;
    var link =  "../mobile/items?identity=" + picked_identity;
    jQuery.ajax({
        type: "POST",
        url: "../histories",
        data: {"history":{"tour_id":tour_list[i].id,"user_id":user_id}},
        dataType:"json",
        cache: false,
        success: function (result) {
            window.open(link, "_self");
        } });
}


