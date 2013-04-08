var pieces_list, galleries_list;

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


  Paloma.callbacks['pages']['floors'] = function(params)
  {
    pieces_list = _L.pieces_list;
    galleries_list = params["galleries_list"];

    var gal_pos = [];

      for(var i=0; i<galleries_list.length; i++)
      {
          var sel = 'gal' + parseInt(i+1);
          var area_str = $('#'+sel).attr("coords");
          var area = area_str.split(",");

          //TODO - verify the gallery ID start index
          gal_pos.push({"id":parseInt(i+1), min_x:area[0], max_x:area[2], min_y:area[1], max_y:area[3] });
      }

    var svg = d3.select("svg");




  };


})();