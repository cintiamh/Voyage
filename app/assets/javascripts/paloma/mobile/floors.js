var identity, pieces_list, galleries_list, question_list, answer_list, after_info, connection_list;
var gal_pos = [];
var map_position;
var map;

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


  Paloma.callbacks['mobile']['floors'] = function(params)
  {
      identity = params['iden'];
      pieces_list = params['pieces_list'];
      galleries_list = params["galleries_list"];
      question_list = params["question_list"];
      answer_list = params["answer_list"];
      after_info = params["after_info"];
      connection_list = params["connection_list"];

      plot_items();
  };
})();

function plot_items()
{
    for(var i=0; i<galleries_list.length; i++)
    {
        var sel = 'gal' + parseInt(i+1);
        var area_str = $('#'+sel).attr("coords");
        var area = area_str.split(",");
        gal_pos.push({"id":parseInt(i+1), min_x:area[0], max_x:area[2], min_y:area[1], max_y:area[3] });
    }

    map_position = $('#Image-Maps_floor_1').position();
    map = $('#1_map');

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
        div.addClass("circle not_done");
        div.append("<br><b>"+item_num+"</b>");
        div.css("left",left_pos);
        div.css("top",top_pos);
        div.css("position","absolute");
    }

    $("#item0").removeClass("not_done");
    $("#item0").addClass("next");
}

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
    image$("#aboutGalPopup").popup();
    $("#aboutGalPopup").popup("open");

}
var rightAnswer;
var currentItemNumber;
function atItemDialog(i)
{
    currentItemNumber = i;
    var parent = $('#answers');
    var q = $('#question');
    q.text(question_list[i].content);
    var answers = answer_list[i];

    var options = $("option");
    for(var i=0; i<options.length; i++)
    {
        options[i].remove();
    }

    var blank_option = "<option></option>";
    $(blank_option).appendTo(parent);

    for (var j=0; j<answers.length; j++)
    {
        if(answers[j].correct == true)
        {
            rightAnswer = j;
        }
        options = "<option value='" + j + "'>" + answers[j].content + "</option>";
        $(options).appendTo(parent);
    }
    // var submit = "<button type='button' onclick='return checkAnswer(" + rightAnswer + ")'>Submit</button>";
    var item = parseInt(i) + 1;
    $.mobile.changePage("#checkin", {role: "dialog"});
    parent[0].selectedIndex = 0;
    parent.selectmenu("refresh");
}

function checkAnswer()
{
    var ans = $('#answers').val();
    if(ans == rightAnswer)
    {
        alert("Right answer");
        displayItemInfo();
    }
    else
    {
        alert("Wrong answer. Try again!");
    }
}

function displayItemInfo()
{
    //$( "#checkin" ).dialog( "close" );
    var image = $("#item_image");
    var after_info_p = $("#after_info");
    var con_1 = $("#con_1");
    var con_2 = $("#con_2");

    image.attr("src",pieces_list[currentItemNumber].image);
    after_info_p.text(after_info[currentItemNumber][0].after);

    var prev = currentItemNumber - 1;
    if(prev < 0) {prev = connection_list.length - 1;}

    con_1.text(connection_list[prev].description);
    con_2.text(connection_list[currentItemNumber].description);

    $.mobile.changePage("#itemInformation", {role:"dialog"});

}

function closeAllDialogs()
{
    var cur = $("#item"+currentItemNumber);
    var next_item = parseInt(currentItemNumber+1);
    var next = $("#item"+next_item);
    cur.removeClass("not_done");
    cur.removeClass("next");
    cur.addClass("done");
    if(next_item < pieces_list.length)
    {
        next.removeClass("not_done");
        next.addClass("next");
    }
    var options = $("option");
    for(var i=0; i<options.length; i++)
    {
        options[i].remove();
    }
    $( "#checkin" ).dialog( "close" );
    $.mobile.changePage("../pages/floors?identity=" + identity);
}
