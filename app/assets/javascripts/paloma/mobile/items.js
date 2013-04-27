var w,h;
var svg,vis;
var pieces_list;
var nodes =[], links= [], connections= [], before_info = [];
var tour_id;
var force,link,node,width, height;


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


  Paloma.callbacks['mobile']['items'] = function(params){
      _L.pieces_list = params['pieces_list'];
      connections = params['connection_list'];
      tour_id = params['tour_id'];
      before_info = params['before_info'];
      pieces_list = _L.pieces_list;

      var parent = $("div[data-role='content']");
      //w = parent.innerWidth() - 20;
      //h = parent.height() - 20;

     /* svg = d3.select("#chart").append("svg");
      w = 600;
      h = 600;
      svg.attr("viewbox",function(){return "0 0 " + w + " " + h + " ";})
          .attr("preserveAspectRation","xMinYMin");*/

      //w=h=300;
      constructNodeLinks();

      /********* NEW CODE ***********/

       width = 500,
          height = 500;

      var svg = d3.select("#chart")
          .append("svg")
          .attr("viewBox", "0 0 " + width + " " + height )
          .attr("preserveAspectRatio", "xMidYMid meet")
          .attr("pointer-events", "all")
          .call(d3.behavior.zoom().on("zoom", redraw));

      vis = svg.append('svg:g');

      function redraw() {
          vis.attr("transform",
              "translate(" + d3.event.translate + ")"
                  + " scale(" + d3.event.scale + ")");
      }
      draw_graph();


      /********** NEW CODE *********/
     // createItemsChart(nodes,links);

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
              aboutPieces(node_id);
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
              aboutPieces(node_id);
          }
      });
  };
})();

function draw_graph() {
    var force = d3.layout.force()
        .charge(-2000)
        .linkDistance(200)
        .nodes(nodes)
        .links(links)
        .size([width, height])
        .start();

    var link = vis.selectAll(".link")
        .data(links)
        .enter().append("line")
        .attr("class", "link")
        .style("stroke-width", "3" );

    var node = vis.selectAll(".node")
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

//links -> {source, target, distance}
function constructNodeLinks()
{
    //TODO: replace with GO art
    nodes.push({"id":-1,"title":"GO", "group":"NODE", "charge":-500, "image":"/assets/NUMBER-SHEET.png"});
    for(var i = 0; i<pieces_list.length; i++)
    {
        //circle case
        if(i==pieces_list.length - 1)
        {
            nodes.push({"id":i,"title":pieces_list[i].title, "group":"NODE", "charge":-1000, "image":pieces_list[i].image});
            //nodes.push({"id":-(i+2),"title":"C" + (i+1) + "to 1", "group":"CONNECTOR", "charge":-500});
            nodes.push({"id":-(i+2),"title":connections[i].description, "group":"CONNECTOR", "charge":-1000, "image":"/assets/DOT.png"});

            links.push({"source":2*i+1,"target":2*i+2,"distance":100});
            links.push({"source":2*i+2,"target":1,"distance":100});

        }
        else
        {
            //Items
            nodes.push({"id":i,"title":pieces_list[i].title, "group":"NODE", "charge":-1000, "image":pieces_list[i].image});
            //Connections
            //nodes.push({"id":-(i+2),"title":"C" + (i+1) + "to" + (i+2), "group":"CONNECTOR", "charge":-500});
            nodes.push({"id":-(i+2),"title":connections[i].description, "group":"CONNECTOR", "charge":-1000, "image":"/assets/DOT.png"});

            links.push({"source":2*i+1,"target":2*i+2,"distance":100});
            links.push({"source":2*i+2,"target":2*i+3,"distance":100});
        }

        //Each node linked to GO
        links.push({"source":0,"target":2*i+1,"distance":200});
    }
}

function aboutPieces(i)
{
    var p = d3.select("#info");
    var h = d3.select('#title');
    if(i == -1)
    {
        var ident = parseInt(tour_id);// + 1;
          window.open("../mobile/floors?identity=" + ident, "_self");

    }
    else if(i >=0 )
    {
        p.text(before_info[i][0].before);
        h.text(pieces_list[i].title);
        $("#teaser").modal();
    }
    else if(i < -1)
    {
        var node_list_pos = -(i*2) - 2;
        h.text(nodes[node_list_pos].title);
        p.text("");
        $("#teaser").modal();
    }


}

function createItemsChart(nodes, links)
{

    force = d3.layout.force()
        .charge(function(d)
        {
            return d.charge;
        })
        .linkDistance(function (d)
        {
            return d.distance;
        })
        .size([w, h]);

    force.nodes(nodes)
        .links(links)
        .start();

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

    restart();
}

function restart()
{
    link = svg.selectAll(".link")
        .data(links)
        .enter().append("line")
        .attr("class", "link");


    node = svg.selectAll(".node")
        .data(nodes)
        .enter().append("g")
        .attr("class", "node")
        .call(force.drag);

    node.append("image")
        .attr("xlink:href", function(d) {return d.image})
        .attr("x", function(d){
            if (d.group=="CONNECTOR")
            {return -15;}
            else
            {return -50;}
        })
        .attr("y", function(d){
            if (d.group=="CONNECTOR")
            {return -15;}
            else
            {return -50;}
        })
        .attr("height", function(d){
            if (d.group=="CONNECTOR")
            {return 25;}
            else
            {return 100;}
        })
        .attr("width",function(d){
            if (d.group=="CONNECTOR")
            {return 25;}
            else
            {return 100;}
        })
        .attr("class","touch_click")
        .attr("node_id",function(d){return d.id;});
    force.start();
    //alert("in restart");
}

$(window).resize(function()
{
    //alert("window resize");
    //createItemsChart(nodes,links);
    //restart();
});