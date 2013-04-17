var pieces_list, galleries_list, question_list, answer_list;

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
    pieces_list = params['pieces_list'];
    galleries_list = params["galleries_list"];
      question_list = params["question_list"];
      answer_list = params["answer_list"];

    var gal_pos = [];

      for(var i=0; i<galleries_list.length; i++)
      {
          var sel = 'gal' + parseInt(i+1);
          var area_str = $('#'+sel).attr("coords");
          var area = area_str.split(",");
          gal_pos.push({"id":parseInt(i+1), min_x:area[0], max_x:area[2], min_y:area[1], max_y:area[3] });
      }

      var map_position = $('#Image-Maps_floor_1').position();
      var map = $('#map');

      for(i=0; i<pieces_list.length; i++)
      {
          var gal = pieces_list[i].gallery_id;
          var pos = get_position_of_gallery(gal_pos, gal);

          var left_pos = parseInt(map_position.left + (parseInt(gal_pos[pos].min_x) + parseInt(gal_pos[pos].max_x))/2);
          left_pos -= 45;
          var top_pos = parseInt(map_position.top + (parseInt(gal_pos[pos].min_y) + parseInt(gal_pos[pos].max_y))/2);
          top_pos -= 45;
          var item_num = parseInt(i+1);
          var item_div = "<div id='item" + i + "' onclick='return atItemDialog(" + i + ")'></div>";
          var div = $(item_div).appendTo(map);
          div.addClass("circle");
          div.append("<br><b>"+item_num+"</b>");
          div.css("left",left_pos);
          div.css("top",top_pos);
          div.css("position","absolute");
      }


    /*var divtest = $("#d3test");
      left_pos = parseInt(map_position.left + (parseInt(gal_pos[0].min_x) + parseInt(gal_pos[0].max_x))/2);
      divtest.css("left",left_pos);
      divtest.css("top",110);
      divtest.css("position","absolute");*/
      //divtest.css("top",110)

  };


})();

function get_position_of_gallery(gal_pos, id)
{
    for(var i=0; i<gal_pos.length;i++)
    {
        if(gal_pos[i].id == id)
        {
            return i;
        }
    }
    return -1;
}

function galInfo(i)
{
    var aboutGal = d3.select('#aboutGal');
    var textData = galleries_list[i].about;
    aboutGal.text(textData);
    $("#aboutGalPopup").popup();
    $("#aboutGalPopup").popup("open");

}
var rightAnswer;
function atItemDialog(i)
{
    var parent = $('#checkinQuestion');
    var q = $('#question');
    q.text(question_list[i].content);
    var answers = answer_list[i];
    var inputMarkupInit = "<input type='radio' name='checkinAnswer'";
    for (var j=0; j<4; j++)
    {
        if(answers[j].correct == true)
        {
            rightAnswer = j;
        }
        var inputMarkup = "#answerLbl" + j;
        $(inputMarkup).text(answers[j].content);
    }
   // var submit = "<button type='button' onclick='return checkAnswer(" + rightAnswer + ")'>Submit</button>";
    var item = parseInt(i) + 1;
    $.mobile.changePage("#checkin", {role: "dialog"});
}

function checkAnswer()
{
    var check = "#answer"+rightAnswer;
    if($(check).attr("checked") == "checked")
    {
        alert("right answer");
    }
    else
    {
        alert("wrong answer");
    }
}