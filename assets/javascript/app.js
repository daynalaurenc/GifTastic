var topics = ["Gossip Girl", "Grownish", "Pretty Little Liars", "13 Reasons Why", "Boy Meets World", "Degrassi", "Riverdale", "The Vampire Diaries", "American Vandal", "Friday Night Lights", "Saved by the Bell"];


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

        // var $div = $('<div>');
        var i = 0;

        var results = response.data;
        app.empty();

        for(i=0; i<results.length; i++) {

        still = results[i].images.fixed_height_still.url;
        animate = results[i].images.fixed_height.url;
        
        
        var $rating = results[i].rating;
        var rating = $('<p>').text("Rating: " + $rating);
        var localDiv = $('<div>');
        localDiv.append(rating);

        console.log(rating);

        // var $container = $('.container');
        
        // $container.html(`
        //     <div class="row">
        //         <div class="col-sm">
        //             Hello
        //         </div>
        //         <div class="col-sm">
        //             Hello
        //         </div>
        //     </div>
        // `);
        
        $img = $('<img>');
        $img.attr('data-still', still);
        $img.attr('data-animate', animate);
        $img.attr('src', still);
        $img.attr('data-state', 'still');
        
        localDiv.append($img);
        // $div.append(localDiv);
        $('#shows-view').append(localDiv);
    }
    
    $("img").on("click", function() { 
        var state = $(this).attr('data-state');
        console.log(state);
    
        if (state === 'still') {
          var dataAnimate = $(this).attr('data-animate');
          $(this).attr('src', dataAnimate);
          $(this).attr('data-state', 'animate');
        } else {
          var dataStill = $(this).attr('data-still');
          $(this).attr('src', dataStill);
          $(this).attr('data-state', 'still');
    
        }
    });
    
    
});

}

function renderButtons(){
    $('#buttons-view').empty();

    for(var i = 0; i < topics.length; i++) {
        var a = $('<button>');
        a.addClass('show');
        a.attr('data-name', topics[i]);
        a.text(topics[i]);
        $('#buttons-view').append(a);
        $('#tv-input').val('');

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