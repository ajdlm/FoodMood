$(document).ready(function () {

  $("#newSearch").hide();

  L.mapquest.key = "x4MDUAVZXxsVUQxn9e6yLgY9NetpHoNe";

  $("#cuisine, #address").keyup(function (event) {
    if (event.keyCode === 13) {
        $("#search").click();
    };
});

  $("#search").on("click", function () {

    window.location.hash = '<a href="app.js';

    var address = $("#address").val();

    var cuisines = $('#cuisine').val();

    $("body").css('background', 'white')

    $("#address").hide();

    $("#cuisine").hide();

    $("#search").hide();

    $("#newSearch").show();

    $(".carousel-inner").hide();

   

    $(".jumbotron m-0").css({ 'background-color': 'none' });

    if (address === "" & cuisines === "") {
      return;
    }

    $("#newSearch").on("click",function(){

      location.reload();
  })


    var longLatQueryURL = "https://www.mapquestapi.com/geocoding/v1/address?key=x4MDUAVZXxsVUQxn9e6yLgY9NetpHoNe&location=" + address;

    $.ajax({
      url: longLatQueryURL,
      method: "GET"
    })
      .then(function (response) {
        var addressLatitude = response.results[0].locations[0].latLng.lat;

        var addressLongitude = response.results[0].locations[0].latLng.lng;

        console.log("lat = " + addressLatitude + " while long = " + addressLongitude);


        /// --option two for zip-code vs logtide and  Latitude-----var url=" https://www.zipcodeapi.com/rest/<api_key>/info.<format>/<zip_code>/<units>",

        CustomEvent = "";


        console.log(cuisines)


        console.log(address)

        ///..."https://developers.zomato.com/api/v2.1/search?entity_id=280&sort=rating&order=asc&q=" +addressLatitude + "cuisines=" + cuisines + "&apikey=967e2e08ce22588b1668ae3b432bf765";
        ///...test api....https://developers.zomato.com/api/v2.1/search?entity_id=%2094741&entity_type=zone&cuisines=55&establishment_type=1
        var queryURL ="https://developers.zomato.com/api/v2.1/search?lat="+addressLatitude+"&lon="+addressLongitude+"&q="+cuisines+"&sort=rating"+ "&apikey=967e2e08ce22588b1668ae3b432bf765";
        $.ajax({
          url: queryURL,
          method: "get",
          headers: {
            'user-key': "967e2e08ce22588b1668ae3b432bf765",
          }
        })

          .then(function (data) {

            data = data.restaurants;
            var result = "";

            $.each(data, function (index, value) {
              var res = data[index];

              $.each(res, function (index, value) {

                var location = res.restaurant.location;

                var userRating = res.restaurant.user_rating;

                console.log(location);               

                var result = "";

                result += "<div class='dataImg'>";

                result += "</div>";

                result += "<p " + "<strong>" + userRating.aggregate_rating+"<h7>"+"/5.0"+"</h7>"+ "</strong></p><br>";
                                          
                result += "<a href=" + value.url+" target='_blank' class='action_link'>"+"<h2>" + value.name + "</strong></h2></a>";

                result += "<h4>" +'<strong>'+"Cuisines: "+'</strong>' + value.cuisines + "</h4>"+"<h6>" + location.address + "</h6>" ;

                result += "<h7>" + value.phone_numbers + "</h7>";              

                result += "<a href=" + value.menu_url + " target='_blank' class='action_link'>" + "Menu" + "</a>";

                var newRow = $("<div>");

                var columnOne = $("<div>");

                var columnTwo = $("<div>");

                var columnThree = $("<div>");

                newRow.addClass("row");

                var foodImage = $("<img>");

                foodImage.attr("alt", "'coming soon'").attr("src", value.thumb).addClass("rest-img");

                columnOne.addClass("col-md-3").append(foodImage);

                columnTwo.addClass("col-md-6").html(result);

                var currentLocation = address.replace(/ /g, "+");

                var destinationAddress = location.address;

                destinationAddress = destinationAddress.replace(/ /g, "+");

                var mapImage = $("<img>");

                var mapQueryURL = "https://www.mapquestapi.com/staticmap/v5/map?start=" + currentLocation + "&end=" + destinationAddress + "&size=170,170@2x&key=x4MDUAVZXxsVUQxn9e6yLgY9NetpHoNe";

                mapImage.attr("src", mapQueryURL).attr("height", "200px").attr("width", "200px");

                columnThree.addClass("col-md-3").append(mapImage);

                newRow.append(columnOne, columnTwo, columnThree);

                $(".result").append(newRow, "<hr size='330'>");
              });
            });
          });
      });
  });
});