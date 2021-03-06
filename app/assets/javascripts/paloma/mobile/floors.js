var identity, pieces_list, galleries_list, question_list, answer_list, after_info, connection_list, tour_connection_list=[],comment_list;
var gal_pos = [];
var map_position;
var map, initial_floor, history, pieces_by_connections, user_input_comments=[], user_id;

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
      identity = params['iden']; //tour or identity chosen
      pieces_list = params['pieces_list']; //pieces based on the tour and the history id
      galleries_list = params["galleries_list"]; //galleries listed
      question_list = params["question_list"]; //check-in questions for the items
      answer_list = params["answer_list"]; //answer list for the questions
      after_info = params["after_info"]; //information given after the check-in question was answered
      connection_list = params["connection_list"]; //connections between a items or pieces
      comment_list = params["comment_list"]; //previous comments based on the items
      var tour_items = params["tour_items"]; //tour items
      history = params["history"]; //history object
      pieces_by_connections = params["pieces_by_connections"]; //pieces gathered from the connection list

      //Build the tour and the connections
      create_tour_connection_list();

      //Plot items on the map
      plot_items();

      //Set the tab to the floor with the first item
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

function create_tour_connection_list()
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
            var next = -1;
        }
        for(var j=0; j<pieces_by_connections.length; j++)
        {
            for(var k=0; k<pieces_by_connections[j].length; k++)
            {
                if(pieces_by_connections[j][k].id == cur)
                {
                    if(next == -1)
                    {
                        tour_connection_list.push({"cur":cur, "next":-1, "connection":connection_list[j]})
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
           /* if(next == 1000)
            {
                break;
            }*/
        }
    }

}

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

function getPieceById(id)
{
    for(var i=0; i<pieces_list.length; i++)
    {
        if(pieces_list[i].id == id)
        {
            return pieces_list[i];
        }
    }
    return -1;
}


function displayItemInfo()
{


    $("#commentsTab").removeClass("active");
    $("#commentsTab_li").removeClass("active");

    $("#connectionTab").removeClass("active");
    $("#connectionTab_li").removeClass("active");

    $("#itemInfoTab").addClass("active");
    $("#itemInfoTab_li").addClass("active");

    //$( "#checkin" ).dialog( "close" );
    var title = $("#itemTitle2");
    var image = $("#item_image");
    var after_info_p = $("#after_info");
    var con_1 = $("#con_1");
    var con_2 = $("#con_2");
    var new_comm = $("#new_comment");
    var input = $("#usercomment");
    var artist_info = $('#artist_info');
    var period_info = $('#period_info');

    artist_info.text("");

    new_comm.text("");
    input.val("");

    title.text(pieces_list[currentItemNumber].title.toUpperCase());
    image.attr("src",pieces_list[currentItemNumber].image);
    after_info_p.text(after_info[currentItemNumber][0].after);

    if(typeof pieces_list[currentItemNumber].artist != 'undefined' && pieces_list[currentItemNumber].artist != null && pieces_list[currentItemNumber].artist != "")
    {
        artist_info.text("Artist: " + pieces_list[currentItemNumber].artist);
    }
    if(typeof pieces_list[currentItemNumber].period != 'undefined' && pieces_list[currentItemNumber].period != null && pieces_list[currentItemNumber].period != "")
    {
        period_info.text("Year: " + pieces_list[currentItemNumber].period);
    }


    var next = currentItemNumber + 1;
    if(next>pieces_list.length) {next=0;}

    /* if(tour_connection_list.length != 0 && tour_connection_list.length == pieces_list.length)
    {
        if(!tour_connection_list[prev]){con_1.text("How are these connected? Post your thoughts in the comments section.");}
        else{con_1.text(tour_connection_list[prev].description);}
        if(!tour_connection_list[currentItemNumber]){con_1.text("How are these connected? Post your thoughts in the comments section.");}
        else{con_2.text(tour_connection_list[currentItemNumber].description);}
    }  */

    if(tour_connection_list.length != 0)// && tour_connection_list.length == pieces_list.length)
    {
      for(var t=0; t<tour_connection_list.length; t++)
      {
          if(typeof tour_connection_list[t] === 'undefined')
          {
              con_1.text("How are these connected?");
              con_2.text("Post your thoughts in the comments section.");
          }
          if(tour_connection_list[t].next == pieces_list[currentItemNumber].id)
          {
              var first = getPieceById(tour_connection_list[t].cur);
              var second = getPieceById(tour_connection_list[t].next);
              if((first != -1) && (second != -1))
              {
                  $("#btw_con_1").text("Connection between " + first.title + " and " + second.title);
              }


              if(typeof tour_connection_list[t].connection === 'undefined')
              {
                  con_1.text("How are these connected?");
                  con_2.text("Post your thoughts in the comments section.");
              }

            var con_1_text = tour_connection_list[t].connection.description;

              if(typeof con_1_text === 'undefined')
              {
                  con_1_text = "Post your thoughts in the comments sections";
              }
            con_1.text(con_1_text);
          }
          if(tour_connection_list[t].cur == pieces_list[currentItemNumber].id)
          {
              var first = getPieceById(tour_connection_list[t].cur);
              var second = getPieceById(tour_connection_list[t].next);
              if((first != -1) && (second != -1))
              {
                  $("#btw_con_2").text("Connection between " + first.title + " and " + second.title);
              }

              if(typeof tour_connection_list[t].connection === 'undefined')
              {
                  con_1.text("How are these connected?");
                  con_2.text("Post your thoughts in the comments section.");
              }
              var con_2_text = tour_connection_list[t].connection.description;

              if(typeof con_2_text === 'undefined')
              {
                  con_2_text = "Post your thoughts in the comments sections";
              }
              con_2.text(con_2_text);
          }
      }

    }

    else
    {
        con_1.text("How are these connected?");
        con_2.text("Post your thoughts in the comments section.");
    }


    //COMMENTS
    var comm1 = $("#comm1").text("");
    var comm2 = $("#comm2").text("");
    var comm3 = $("#comm3").text("");

    if(comment_list[currentItemNumber].length == 0)
    {
        $("#comm1").text("Be the first one to comment!");
    }

    for(var i=0; i<comment_list[currentItemNumber].length;i++)
    {
        var comm = $("#comm" + parseInt(i+1));
        var content = comment_list[currentItemNumber][i].content;
        if(!(typeof content === 'undefined'))
        {
            comm.text(content);
        }
        if(i==2) break;
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

    //reset tab to info
    //itemInfoTab and itemInfoTab_li
    //commentsTab
    //connectionTab_li

    if(currentItemNumber == pieces_list.length - 1)
    {
        //TODO: input all the comments
        window.open("../mobile/finish?identity=" + identity, "_self");
    }

}

function submit_comment()
{
    var new_comm = $("#new_comment");
    var input = $("#usercomment").val();
    new_comm.text(input);
    //$("#moderation_notice").text("Awaiting comment moderation");
    jQuery.ajax({
        type: "POST",
        url:"../comments",
        data: {"comment":{"content":input,"piece_id":pieces_list[currentItemNumber].id,"tour_id":identity, "user_id":history.user_id}},
        dataType:"json",
        cache: false,
        success: function (result) {
            if(comment_list[currentItemNumber].length == 0)
            {
                $("#comm1").text("");
            }
        } });
}
