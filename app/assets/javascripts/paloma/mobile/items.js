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

      constructNodeLinks();

      /********* NEW CODE ***********/

       width = 500,
       height = 500;
       var curScale = 0.75 - (0.05 * (pieces_list.length - 3));
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
        .charge(-2000)
        .linkDistance(100)
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
        .attr("width", function(d){
            if(d.group == "CONNECTOR"){ return 25;}
            else {return 100;}
        })
        .attr("height",function(d){
            if(d.group == "CONNECTOR"){ return 25;}
            else {return 100;}
        })
        .attr("x",function(d){
            if(d.group == "CONNECTOR"){ return "-0.75em";}
            else {return "-3em";}
        })
        .attr("y",function(d){
            if(d.group == "CONNECTOR"){ return "-0.75em";}
            else {return "-3em";}
        })
        .attr("class","touch_click")
        .attr("node_id",function(d){return d.id;})
        .call(force.drag);

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
        //alert("<%= @pieces_list[i].image.url %>");
        //circle case

        if(connections.length == 0)
        {
            if(i==pieces_list.length - 1)
            {

                nodes.push({"id":i,"title":pieces_list[i].title, "group":"NODE", "charge":-1000, "image":pieces_list[i].image});
                //nodes.push({"id":-(i+2),"title":"C" + (i+1) + "to 1", "group":"CONNECTOR", "charge":-500});
                nodes.push({"id":-(i+2),"title":"How are these connected?", "group":"CONNECTOR", "charge":-1000, "image":"/assets/DOT.png"});

                links.push({"source":2*i+1,"target":2*i+2,"distance":100});
                links.push({"source":2*i+2,"target":1,"distance":100});

            }
            else
            {
                //Items
                nodes.push({"id":i,"title":pieces_list[i].title, "group":"NODE", "charge":-1000, "image":pieces_list[i].image});
                //Connections
                //nodes.push({"id":-(i+2),"title":"C" + (i+1) + "to" + (i+2), "group":"CONNECTOR", "charge":-500});
                nodes.push({"id":-(i+2),"title":"How are these connected?", "group":"CONNECTOR", "charge":-1000, "image":"/assets/DOT.png"});

                links.push({"source":2*i+1,"target":2*i+2,"distance":100});
                links.push({"source":2*i+2,"target":2*i+3,"distance":100});
            }

            //Each node linked to GO
            links.push({"source":0,"target":2*i+1,"distance":200});
        }

        else
        {
            if(i==pieces_list.length - 1)
            {

                nodes.push({"id":i,"title":pieces_list[i].title, "group":"NODE", "charge":-1000, "image":pieces_list[i].image});
                //nodes.push({"id":-(i+2),"title":"C" + (i+1) + "to 1", "group":"CONNECTOR", "charge":-500});
                if(!connections[i])
                {nodes.push({"id":-(i+2),"title":"How are these connected?", "group":"CONNECTOR", "charge":-1000, "image":"/assets/DOT.png"});}
                else
                {nodes.push({"id":-(i+2),"title":connections[i].description, "group":"CONNECTOR", "charge":-1000, "image":"/assets/DOT.png"});}

                links.push({"source":2*i+1,"target":2*i+2,"distance":100});
                links.push({"source":2*i+2,"target":1,"distance":100});

            }
            else
            {
                //Items
                nodes.push({"id":i,"title":pieces_list[i].title, "group":"NODE", "charge":-1000, "image":pieces_list[i].image});
                //Connections
                //nodes.push({"id":-(i+2),"title":"C" + (i+1) + "to" + (i+2), "group":"CONNECTOR", "charge":-500});
                if(!connections[i])
                {nodes.push({"id":-(i+2),"title":"How are these connected?", "group":"CONNECTOR", "charge":-1000, "image":"/assets/DOT.png"});}
                else
                {nodes.push({"id":-(i+2),"title":connections[i].description, "group":"CONNECTOR", "charge":-1000, "image":"/assets/DOT.png"});}

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



