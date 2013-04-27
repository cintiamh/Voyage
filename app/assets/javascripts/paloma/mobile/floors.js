var identity, pieces_list, galleries_list, question_list, answer_list, after_info, connection_list,comment_list;
var gal_pos = [];
var map_position;
var map, initial_floor;

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
  var in_floor = true;

  Paloma.callbacks['mobile']['floors'] = function(params)
  {
      identity = params['iden'];
      pieces_list = params['pieces_list'];
      galleries_list = params["galleries_list"];
      question_list = params["question_list"];
      answer_list = params["answer_list"];
      after_info = params["after_info"];
      connection_list = params["connection_list"];
      comment_list = params["comment_list"];

      var pieces = _L.pieces_list;
      _l.pieces = pieces;

      plot_items();

      if(initial_floor == 1)
      {
          $('#first_tab').addClass('active');
          $('#first_floor').addClass('active');
          $('#first_floor').tab('show');
      }
      else if(initial_floor == 2)
      {
          $('#second_tab').addClass('active');
          $('#second_floor').addClass('active');
          $('#second_floor').tab('show');
      }
      else
      {
          $('#third_tab').addClass('active');
          $('#third_floor').addClass('active');
          $('#third_floor').tab('show');
      }


  };
})();

function plot_items()
{
    $('div').remove('.item_pos');

    //var all_gals = $('area[id]');

    for(var i=0; i<galleries_list.length; i++)
    {
        var sel = 'gal' + i;
        var gal_div = $('#'+sel);
        var area_str = gal_div.attr("coords");
        var area = area_str.split(",");
        var alt = gal_div.attr('alt');
        gal_pos.push({"id":parseInt(i+1), "alt":alt, min_x:area[0], max_x:area[2], min_y:area[1], max_y:area[3] });
    }


    for(i=0; i<pieces_list.length; i++)
    {
        var gal_id = pieces_list[i].gallery_id;
        var gallery = get_position_of_gallery(gal_id);
        var order = gallery.order;
        var sel = 'gal' + order;
        var gal_div = $('#'+sel);
        var area_str = gal_div.attr("coords");
        var area = area_str.split(",");
        gal_pos = {"id":parseInt(i+1), "alt":alt, min_x:area[0], max_x:area[2], min_y:area[1], max_y:area[3] };

        //var pos = get_position_of_gallery(gal_pos, gal);
        var floor = gallery.floor;
        if(i==0){initial_floor = floor;}

        var left_adjust, top_adjust;

        if(floor == 1)
        {
            map_position = $('#Image-Maps_floor_1').position();
            map = $('#1_map');
            left_adjust = 48;//-20;
            top_adjust = -33; //-43
        }
        else if(floor == 2)
        {
            map_position = $('#Image-Maps_floor_2').position();
            map = $('#2_map');
            left_adjust = +45;
            top_adjust = -23//-43;
        }
        else
        {
            map_position = $('#Image-Maps_floor_3').position();
            map = $('#3_map');
            left_adjust = +48;
            top_adjust = -23;
        }
        var left_pos = parseInt(map_position.left + (parseInt(gal_pos.min_x) + parseInt(gal_pos.max_x))/2);
        left_pos += parseInt(left_adjust);
        var left_pos_pc = (left_pos/1170) * 100;
        var top_pos = parseInt(map_position.top + (parseInt(gal_pos.min_y) + parseInt(gal_pos.max_y))/2);
        top_pos += parseInt(top_adjust);
        var top_pos_pc = (top_pos/513) * 100;
        var item_num = parseInt(i+1);
        var item_div = "<div id='item" + i + "' onclick='return atItemDialog(" + i + ")'></div>";
        var div = $(item_div).appendTo(map);
        div.addClass("item_pos");
        //div.addClass("circle not_done");
        div.addClass("circle");
        var id_for_image = parseInt(i+1);
        var bg_img = "url(/assets/Number-" + id_for_image +".png) no-repeat";
        div.css("background",bg_img);
        div.css("background-size","100%");
        //div.append("<br><b>"+item_num+"</b>");
        div.css("left",left_pos_pc + "%");
        div.css("top",top_pos_pc + "%");
        div.css("position","absolute");
    }

   // $("#item0").removeClass("not_done");
    //$("#item0").addClass("next");
}

function get_position_of_gallery(id)
{
    for(var i=0; i<galleries_list.length;i++)
    {
        if(galleries_list[i].id == id)
        {
            return galleries_list[i];
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
    $('#checkin_fb').text("");
    currentItemNumber = i;
    var parent = $('#answers');
    var q = $('#question');

    if(question_list[i].length == 0)
    {
        q.text("Are you really at the piece?");
    }
    else
    {
        q.text(question_list[i].content);
    }

    var answers = answer_list[i];


    /*for(var i=0; i<options.length; i++)
    {
        options[i].remove();
    } */

    $('option').remove();

    var blank_option = "<option></option>";
    var options;
    $(blank_option).appendTo(parent);

    if(answers.length != 0)
    {
        for (var j=0; j<answers.length; j++)
        {
            if(answers[j].correct == true)
            {
                rightAnswer = j;
            }
            options = "<option value='" + j + "'>" + answers[j].content + "</option>";
            $(options).appendTo(parent);
        }
    }
    else
    {
        rightAnswer = 1;
        options = "<option value=1>Yes</option>";
        $(options).appendTo(parent);
    }
    // var submit = "<button type='button' onclick='return checkAnswer(" + rightAnswer + ")'>Submit</button>";
    var item = parseInt(i) + 1;
    var title = $("#itemTitle1");
    title.text(pieces_list[currentItemNumber].title.toUpperCase());
    resizeInfoModalMap('checkin_body');
    $("#checkin").modal('show');

}

function checkAnswer()
{
    var ans = $('#answers').val();
    var fb = $('#checkin_fb');
    if(ans!= "" && ans == rightAnswer)
    {
        //alert("Right answer");
        fb.text("Correct");
        setTimeout(function()
        {
            $("#checkin").modal('hide');
            displayItemInfo();
        },1000);
    }
    else
    {
        //alert("Wrong answer. Try again!");
        fb.text("Wrong answer. Try again!");
    }
}

function displayItemInfo()
{
    //$( "#checkin" ).dialog( "close" );
    var title = $("#itemTitle2");
    var image = $("#item_image");
    var after_info_p = $("#after_info");
    var con_1 = $("#con_1");
    var con_2 = $("#con_2");

    title.text(pieces_list[currentItemNumber].title.toUpperCase());

    image.attr("src",pieces_list[currentItemNumber].image);
    after_info_p.text(after_info[currentItemNumber][0].after);

    var prev = currentItemNumber - 1;
    if(prev < 0) {prev = connection_list.length - 1;}

    if(connection_list.length != 0)
    {
        if(!connection_list[prev]){con_1.text("How are these connected? Post your thoughts in the comments section.");}
        else{con_1.text(connection_list[prev].description);}
        if(!connection_list[currentItemNumber]){con_1.text("How are these connected? Post your thoughts in the comments section.");}
        else{con_2.text(connection_list[currentItemNumber].description);}
    }
    else
    {
        con_1.text("How are these connected?");
        con_2.text("Post your thoughts in the comments section.");
    }
    resizeInfoModalMap('itemInformation_body');
    $("#itemInformation").modal('show');

}

function moveToComments()
{
    $("#itemInformation").modal('hide');
   // $("#comments").modal('show');
}

function closeAllDialogs()
{
    var cur = $("#item"+currentItemNumber);
    var img_done = "url('" + pieces_list[currentItemNumber].image + "')";
    //var img_done = "url(/assets/check_mark_green.png) no-repeat"
    cur.css("background",img_done);
    cur.css("background-image",img_done);
    cur.css("background-size","100%");
    $("#itemInformation").modal('hide');
    if(currentItemNumber == pieces_list.length - 1)
    {
        window.open("../mobile/finish?identity=" + identity, "_self");
    }

}
