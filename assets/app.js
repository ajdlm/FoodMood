$(document).ready(function () {
  var mapQuestKey = "x4MDUAVZXxsVUQxn9e6yLgY9NetpHoNe";

  var address;

  var addressLatitude;

  var addressLongitude;

  L.mapquest.key = mapQuestKey;

  $("#cuisine, #address").keyup(function (event) {
    if (event.keyCode === 13) {
      $("#search").click();
    };
  });

  $("#search").on("click", function () {

    window.location.hash = '<a href="app.js';

    address = $("#address").val();

    var cuisines = $('#cuisine').val();

    $("body").css('background', 'white');

    $("#address").val("");

    $("#cuisine").val("");

    $(".carousel-inner").hide();

    $(".jumbotron m-0").css({ 'background-color': 'none' });

    if (address === "" & cuisines === "") {
      return;
    }

    var longLatQueryURL = "https://www.mapquestapi.com/geocoding/v1/address?key=" + mapQuestKey + "&location=" + address;

    $.ajax({
      url: longLatQueryURL,
      method: "GET"
    })
      .then(function (response) {
        addressLatitude = response.results[0].locations[0].latLng.lat;

        addressLongitude = response.results[0].locations[0].latLng.lng;

        console.log("lat = " + addressLatitude + " while long = " + addressLongitude);


        /// --option two for zip-code vs logtide and  Latitude-----var url=" https://www.zipcodeapi.com/rest/<api_key>/info.<format>/<zip_code>/<units>",

        CustomEvent = "";


        console.log(cuisines);


        console.log(address);

        ///...test api....https://developers.zomato.com/api/v2.1/search?entity_id=%2094741&entity_type=zone&cuisines=55&establishment_type=1
        var queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=280&sort=rating&order=asc&q=" + address + "cuisines=" + cuisines + "&apikey=967e2e08ce22588b1668ae3b432bf765";

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

                console.log(location);

                var result = "";

                result += "<div class='dataImg'>";

                result += "</div>";

                result += "<h2>" + value.name + "</h2>" + "<h6>" + location.address + "</h6>" + "<h4>" + "Cuisines: " + value.cuisines + "</h4>";

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

                var mapQueryURL = "https://www.mapquestapi.com/staticmap/v5/map?start=" + currentLocation + "&end=" + destinationAddress + "&size=170,170@2x&key=" + mapQuestKey;

                mapImage.attr("src", mapQueryURL).attr("height", "200px").attr("width", "200px").addClass("mapImage").attr("restAddress", location.address).attr("restName", value.name);

                var mapInstruct = $("<h2>");

                mapInstruct.text("Click for Interactive Map").addClass("mapImage").css("opacity", ".7").css("background", "grey").css("color", "white").css("width", "200px").css("position", "absolute").css("bottom", "-2px").css("font-size", "16px").css("text-align", "center").css("padding", "8px 0");

                columnThree.addClass("col-md-3").addClass("mapColumn").append(mapImage, mapInstruct);

                newRow.append(columnOne, columnTwo, columnThree);

                $(".result").append(newRow, "<br />", "<hr />", "<br />");
              });
            });
          });
      });
  });

  $(".result").on("click", ".mapImage", function (event) {
    var currentRestaurant = $(this).attr("restName");

    $("#interactiveMapHeader").text("Map to " + currentRestaurant);

    $("#interactiveMap").modal("show");

    console.log(this);

    var endAddress = $(this).attr("restAddress");

    var targetLatLongQueryURL = "https://www.mapquestapi.com/geocoding/v1/address?key=" + mapQuestKey + "&location=" + endAddress;

    $.ajax({
      url: targetLatLongQueryURL,
      method: "GET"
    })
      .then(function (response) {
        var computeLatitude = response.results[0].locations[0].latLng.lat;

        var computeLongitude = response.results[0].locations[0].latLng.lng;

        computeLatitude += addressLatitude;

        computeLatitude = computeLatitude / 2;

        computeLongitude += addressLongitude;

        computeLongitude = computeLongitude / 2;

        L.mapquest.map("mapGoesHere", {
          center: [computeLatitude, computeLongitude],
          layers: L.mapquest.tileLayer("map"),
          zoom: 12
        });

        L.mapquest.directions().route({
          start: address,
          end: endAddress
        });
      });
  });
});