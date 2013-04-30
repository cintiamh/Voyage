var w,h;
var svg,vis;
var pieces_list;
var nodes =[], links= [], connection_list= [], before_info = [];
var tour_id, tour;
var force,link,node,width, height, pieces_by_connections=[];


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
      pieces_list = params['pieces_list'];
      connection_list = params['connection_list'];
      tour_id = params['tour_id'];
      tour = params['tour'];
      before_info = params['before_info'];
      pieces_by_connections = params['pieces_by_connections'];
      create_tour_connection_list_graph();
      constructNodeLinks();

      /******* Setting view text********/
      $("#tour_title").text("Your " + tour.title + " Tour");
      $("#tour_descr").text(tour.about);




      /********* NEW CODE ***********/

       width = 500,
       height = 500;
       var curScale = (0.75 - (0.05 * (pieces_list.length - 3))) * 1.5;
      var svg = d3.select("#chart")
          .append("svg")
          .attr("viewBox", "0 0 " + width + " " + height )
          .attr("preserveAspectRatio", "xMidYMid meet")
          .attr("pointer-events", "all")
          .call(d3.behavior.zoom().on("zoom", redraw));

      vis = svg.append('svg:g');

      function redraw() {
          vis.attr("transform","scale(" + curScale + ")");
      }
      draw_graph();
      redraw();
      redraw();
      redraw();


      /********** NEW CODE END *********/

      /********** TOUCH AND CLICK EVENTS *********/
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
        .charge(-1500)
        .linkDistance(function(d){return d.distance;})
        .nodes(nodes)
        .links(links)
        .size([width, height])
        .start();

    var link = vis.selectAll(".link")
        .data(links)
        .enter().append("line")
        .attr("class", "link")
        .style("stroke-width", "5" )
        .style("stroke-dasharray","5, 9");

    var node = vis.selectAll(".node")
        .data(nodes)
        .enter().append("g")
        .call(force.drag);

    node.append("image")
        .attr("class", "node")
        .attr("xlink:href",function(d){return d.image;})
        .attr("width", function(d){
            if(d.group == "CONNECTOR"){ return 30;}
            else if(d.group == "GO_NODE") {return 150;}
            else {return 100;}
        })
        .attr("height",function(d){
            if(d.group == "CONNECTOR"){ return 30;}
            else if(d.group == "GO_NODE") {return 150;}
            else {return 100;}
        })
        .attr("x",function(d){
            if(d.group == "CONNECTOR"){ return "-0.75em";}
            else if(d.group == "GO_NODE") {return "-5em";}
            else {return "-3em";}
        })
        .attr("y",function(d){
            if(d.group == "CONNECTOR"){ return "-0.750em";}
            else if(d.group == "GO_NODE") {return "-5em";}
            else {return "-3em";}
        })
        .attr("class","touch_click")
        .attr("node_id",function(d){return d.id;})
        .on("mouseover", function(d)
        {
            if(d.group == "GO_NODE" )
            {
              var img = d3.select(this);
                img.attr("xlink:href","/assets/go.png")
                   .attr("width",150)
                   .attr("height",150);
            }
        })
        .on("mouseout", function(d)
        {
            if(d.group == "GO_NODE" )
            {
                var img = d3.select(this);
                img.attr("xlink:href", d.image);
            }
        });

    node.append("text")
        .attr("text-anchor", "middle")
        .attr("dx","0.5em")
        .attr("y", "5em")
        .attr("fill","white")
        .attr("font-size","1.5em")
        .attr("class","node_title")
        .text(function(d) {
            if(d.group == "CONNECTOR"){ return "";}
            else if(d.group == "GO_NODE") {return d.title.toUpperCase();}
            else {return "";}
        });


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
    nodes.push({"id":-1,"title":tour.title, "group":"GO_NODE", "charge":-500, "image":tour.image});
    for(var i = 0; i<pieces_list.length; i++)
    {
        //alert("<%= @pieces_list[i].image.url %>");
        //circle case

        if(tour_connection_list.length == 0)
        {
            if(i==pieces_list.length - 1)
            {

                nodes.push({"id":i,"title":pieces_list[i].title, "group":"NODE", "charge":-1000, "image":pieces_list[i].image});
                //nodes.push({"id":-(i+2),"title":"C" + (i+1) + "to 1", "group":"CONNECTOR", "charge":-500});
                nodes.push({"id":-(i+2),"title":"How are these connected?", "group":"CONNECTOR", "charge":-1000, "image":"/assets/connection.jpg"});

                links.push({"source":2*i+1,"target":2*i+2,"distance":100});
                links.push({"source":2*i+2,"target":1,"distance":100});

            }
            else
            {
                //Items
                nodes.push({"id":i,"title":pieces_list[i].title, "group":"NODE", "charge":-1000, "image":pieces_list[i].image});
                //Connections
                //nodes.push({"id":-(i+2),"title":"C" + (i+1) + "to" + (i+2), "group":"CONNECTOR", "charge":-500});
                nodes.push({"id":-(i+2),"title":"How are these connected?", "group":"CONNECTOR", "charge":-1000, "image":"/assets/connection.png"});

                links.push({"source":2*i+1,"target":2*i+2,"distance":10});
                links.push({"source":2*i+2,"target":2*i+3,"distance":10});
            }

            //Each node linked to GO
            links.push({"source":0,"target":2*i+1,"distance":80});
        }

        else
        {
            if(i==pieces_list.length - 1)
            {

                nodes.push({"id":i,"title":pieces_list[i].title, "group":"NODE", "charge":-1000, "image":pieces_list[i].image});
                //nodes.push({"id":-(i+2),"title":"C" + (i+1) + "to 1", "group":"CONNECTOR", "charge":-500});
                if(typeof tour_connection_list[i].connection == 'undefined')
                {nodes.push({"id":-(i+2),"title":"How are these connected?", "group":"CONNECTOR", "charge":-1000, "image":"/assets/connection.png"});}
                else
                {nodes.push({"id":-(i+2),"title":tour_connection_list[i].connection.description, "group":"CONNECTOR", "charge":-1000, "image":"/assets/connection.png"});}

                links.push({"source":2*i+1,"target":2*i+2,"distance":100});
                links.push({"source":2*i+2,"target":1,"distance":100});

            }
            else
            {
                //Items
                nodes.push({"id":i,"title":pieces_list[i].title, "group":"NODE", "charge":-1000, "image":pieces_list[i].image});
                //Connections
                //nodes.push({"id":-(i+2),"title":"C" + (i+1) + "to" + (i+2), "group":"CONNECTOR", "charge":-500});
                if(typeof tour_connection_list[i].connection == 'undefined')
                {nodes.push({"id":-(i+2),"title":"How are these connected?", "group":"CONNECTOR", "charge":-1000, "image":"/assets/connection.png"});}
                else
                {nodes.push({"id":-(i+2),"title":tour_connection_list[i].connection.description, "group":"CONNECTOR", "charge":-1000, "image":"/assets/connection.png"});}

                links.push({"source":2*i+1,"target":2*i+2,"distance":100});
                links.push({"source":2*i+2,"target":2*i+3,"distance":100});
            }

            //Each node linked to GO
            links.push({"source":0,"target":2*i+1,"distance":200});
        }
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
        h.text(pieces_list[i].title.toUpperCase());
        resizeInfoModalMap("teaser_body");
        $("#teaser").modal();
    }
    else if(i < -1)
    {
        var node_list_pos = -(i*2) - 2;
        h.text("CONNECTION");
        p.text(nodes[node_list_pos].title);
        resizeInfoModalMap("teaser_body");
        $("#teaser").modal();
    }
}

function create_tour_connection_list_graph()
{
    //tour_connection_list, connection_list, pieces_by_connections, pieces_list
    var count = 0;
    for(var i =0 ; i<pieces_list.length; i++)
    {
        var cur = pieces_list[i].id;
        if(i+1 != pieces_list.length)
        {
            var next = pieces_list[i+1].id;
        }
        else
        {
            var next = 1000;
        }
        for(var j=0; j<pieces_by_connections.length; j++)
        {
            for(var k=0; k<pieces_by_connections[j].length; k++)
            {
                if(pieces_by_connections[j][k].id == cur)
                {
                    if(next == 1000)
                    {
                        tour_connection_list.push({"cur":cur, "next":0, "connection":connection_list[j]})
                        break;
                    }
                    else
                    {
                        for(var l=0; l<pieces_by_connections[j].length; l++)
                        {
                            if(l != k)
                            {
                                if(pieces_by_connections[j][l].id == next)
                                {
                                    tour_connection_list.push({"cur":cur, "next":next, "connection":connection_list[j]})
                                }
                            }
                        }
                    }

                }
            }
        }
    }

}


