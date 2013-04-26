var w,h;
var svg;
var pieces_list;
var nodes =[], links= [], connections= [], before_info = [];
var tour_id;
var force, link,node;

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

      svg = d3.select("#chart").append("svg");
      w = 600, h= 700;
      svg.attr("viewbox",function(){return "0 0 " + w + " " + h + " ";})
          .attr("preserveAspectRation","xMinYMin");

      //w=h=300;
      constructNodeLinks();
      createItemsChart(nodes,links);
  };
})();

//links -> {source, target, distance}
function constructNodeLinks()
{
    //TODO: replace with GO art
    nodes.push({"id":-1,"title":"GO", "group":"NODE", "charge":-500, "image":"/assets/PITTSBURGHER.png"});
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
        .attr("x", -50)
        .attr("y", -50)
        .attr("height", 100)
        .attr("width",100)
        .attr("onclick",function(d)
        {
            return "return aboutPieces("+d.id+")";
        });
    force.start();
    //alert("in restart");
}

$(window).resize(function()
{
    //alert("window resize");
    //createItemsChart(nodes,links);
    //restart();
});