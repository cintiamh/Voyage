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
    _L.pieces_list = params['pieces_list'];
      pieces_list = _L.pieces_list;
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

//links -> {source, target, distance}
function constructNodeLinks()
{
    nodes.push({"id":-1,"title":"GO", "group":"NODE", "charge":-250});
    for(var i = 0; i<pieces_list.length; i++)
    {
        //circle case
        if(i==pieces_list.length - 1)
        {
            nodes.push({"id":i,"title":pieces_list[i].title, "group":"NODE", "charge":-500});
            nodes.push({"id":-(i+2),"title":"C" + (i+1) + "to 1", "group":"CONNECTOR", "charge":-500});

            links.push({"source":2*i+1,"target":2*i+2,"distance":100});
            links.push({"source":2*i+2,"target":1,"distance":100});

        }
        else
        {
            //Items
            nodes.push({"id":i,"title":pieces_list[i].title, "group":"NODE", "charge":-500});
            //Connections
            nodes.push({"id":-(i+2),"title":"C" + (i+1) + "to" + (i+2), "group":"CONNECTOR", "charge":-500});

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
        /*$.mobile.ajaxEnabled = false;
        $.mobile.changePage("../pages/floors",{rel:"external"})*/

        /* The above code did was still using AJAx, and was not calling the required controller
        * so using this hardcoded change page technique*/
        window.open("../pages/floors", "_self");

    }
    else if(i >=0 )
    {
        p.text(pieces_list[i].about);
        h.text(pieces_list[i].title);
    }
    else if(i < -1)
    {
       var node_list_pos = -(i*2) - 2;
       h.text(nodes[node_list_pos].title);
    }
    $("#teaser").popup();
    $("#teaser").popup("open");

}

function createItemsChart(nodes, links)
{
    var force = d3.layout.force()
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
        .attr("r",function(d){
            if(d.group == "NODE")
            {return 50;}
            else {return 20;}
        })
        .attr("fill",function(d)
        {
            if(d.group == "NODE")
            {
                return "white";
            }
            else
            {
                return "red"
            }
        })
        .attr("onclick",function(d)
        {
            return "return aboutPieces("+d.id+")";
        });

    node.append("text")
        .text(function(d){
            if(d.group == "NODE")
            {return d.title;}
            else
            {return "";}
        })
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