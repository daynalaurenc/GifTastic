var topics = ["Gossip Girl", "Grownish", "Pretty Little Liars", "13 Reasons Why", "Boy Meets World", "Degrassi", "Moesha", "Saved by the Bell"];


var app = $('#shows-view');
var still = '';
var animate = '';
var gifCondition = '';

function displayShowInfo(){

    var show = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=0CQ7z76xNUtF5tUFrCfTOLCQw48Kn7cv&limit=10";

   $.ajax ({
       url: queryURL,
       method: 'GET'
   }).then(function(response){

        console.log(response);

        var $div = $('<div>');
        var i = 0;

        var results = response.data;
        app.empty();

        for(i=0; i<results.length; i++) {

        still = results[i].images.fixed_height_still.url;
        animater = results[i].images.fixed_height.url;
        
        // var p = $('<p>').text('Rating: ' + $rating + '</p>');
        var $rating = results[i].rating;
        var rating = $('<p> Rating: ' + $rating + '</p>');
        $div.append(rating);

        console.log(rating);

        // $(".gif").on("click", function() { 
        //     var state = $(this).attr('data-state');
        //     console.log(state);
    
        //     if (state === 'still') {
        //       var dataAnimate = $(this).attr('data-animate');
        //       $(this).attr('src', dataAnimate);
        //       $(this).attr('data-state', 'animate');
        //     } else {
        //       var dataStill = $(this).attr('data-still');
        //       $(this).attr('src', dataStill);
        //       $(this).attr('data-state', 'still');
    
        //     }
          



        $img = $('<img>');
        $img.attr('data-still', still);
        $img.attr('data-animate', animate);
        $img.attr('src', still);
        $img.attr('data-state', 'still');

        $div.append($img);

        $('#shows-view').append($div);
        }

        

    });

}

var gifAnimate = function(){
    gifCondition = $(this).data('type');
    still = $(this).data('still');
    animate = $(this).data('animate');

    if(gifCondition === 'still') {
        $(this).attr('src', animate);
        $(this).data('type', 'still');

        console.log(gifCondition);

    } else if(gifCondition === 'animate') {
        $(this).attr('src', still);
        $(this).data('type', 'still');

        console.log(gifCondition);
    }
}

function renderButtons(){
    $('#buttons-view').empty();

    for(var i = 0; i < topics.length; i++) {
        var a = $('<button>');
        a.addClass('show');
        a.attr('data-name', topics[i]);
        a.text(topics[i]);
        $('#buttons-view').append(a);

    }
}

$('#add-show').on('click', function(event) {
    app.empty();
    event.preventDefault();
    var tv = $('#tv-input').val().trim();
    topics.push(tv);
    renderButtons ();
});

$(document).on('click', '.show', displayShowInfo);

renderButtons();