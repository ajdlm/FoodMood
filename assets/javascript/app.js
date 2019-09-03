$(document).ready(function () {
  var mapQuestKey = "jZh3bAxg3v1iflCQUxzPDHK0HMxOxAgF";

  var address, addressLatitude, addressLongitude, mapVar;

  L.mapquest.key = mapQuestKey;

  function fixCarousel() {
    $(".carousel-item > img").each(function (i, img) {
      $(img).css({
        position: "relative",
        left: ($(img).parent().width() - $(img).width()) / 2
      });
    });
  };

  fixCarousel();

  $(window).resize(function () {
    fixCarousel();
  });

  $("#carouselExampleIndicators").on("slid.bs.carousel", function () {
    fixCarousel();
  });

  $("#carouselExampleIndicators").on("slide.bs.carousel", function () {
    setTimeout(function () {
      fixCarousel();
  }, 1);
  });

  $("#cuisine, #address").keyup(function (event) {
    if (event.keyCode === 13) {
      $("#search").click();
    };
  });

  $("#search").on("click", function () {

    address = $("#address").val().trim();

    var cuisines = $('#cuisine').val().trim();

    if (address === "") {
      $("#badInput").modal("show");

      return;
    };

    window.location.hash = "results";

    $("#notFooter").removeClass("bg-dark");

    $("body").css('background', 'white');

    $("#carouselExampleIndicators").hide();

    $(".result").removeClass("d-none");

    $(".jumbotron m-0").css({ 'background-color': 'none' });

    $("#cuisine").val("");

    $("#address").val("");

    var longLatQueryURL = "https://www.mapquestapi.com/geocoding/v1/address?key=" + mapQuestKey + "&location=" + address;

    // location.reload() for changing pages?

    // DELETE THIS document.location.href = "results.html";

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

        ///..."https://developers.zomato.com/api/v2.1/search?entity_id=280&sort=rating&order=asc&q=" +addressLatitude + "cuisines=" + cuisines + "&apikey=967e2e08ce22588b1668ae3b432bf765";
        ///...test api....https://developers.zomato.com/api/v2.1/search?entity_id=%2094741&entity_type=zone&cuisines=55&establishment_type=1
        var queryURL = "https://developers.zomato.com/api/v2.1/search?lat=" + addressLatitude + "&lon=" + addressLongitude + "&q=" + cuisines + "&apikey=967e2e08ce22588b1668ae3b432bf765";

        $.ajax({
          url: queryURL,
          method: "get",
          headers: {
            'user-key': "967e2e08ce22588b1668ae3b432bf765",
          }
        })

          .then(function (data) {

            data = data.restaurants;

            $(".result").empty();

            $.each(data, function (index, value) {
              var res = data[index];

              var parsingNow = index;

              $.each(res, function (index, value) {

                var location = res.restaurant.location;

                var userRating = res.restaurant.user_rating;

                console.log(location);

                var result = "";

                result += "<div class='dataImg'>";

                result += "</div>";

                result += "<p class='ratingText'>" + "<strong>" + userRating.aggregate_rating + "<span class='resultText'>" + "/5.0" + "</span>" + "</strong></p><br>";

                result += "<a href=" + value.url + " target='_blank' class='action_link'>" + "<h2>" + value.name + "</strong></h2></a>";

                result += "<h4>" + '<strong>' + "Cuisines: " + '</strong>' + value.cuisines + "</h4>" + "<h6>" + location.address + "</h6>";

                result += "<p class='resultText d-inline'>" + value.phone_numbers + "</p>";

                result += "<a href=" + value.menu_url + " target='_blank' class='action_link'>" + "Menu" + "</a>";

                var newRow = $("<div>");

                var columnOne = $("<div>");

                var columnTwo = $("<div>");

                var columnThree = $("<div>");

                newRow.addClass("row");

                var foodImage = $("<img>");

                console.log(value);

                foodImage.attr("alt", "'coming soon'").attr("src", value.thumb).addClass("rest-img");

                if (value.thumb === "") {
                  foodImage.attr("src", "assets/images/no-image-available.png").attr("height", "200px").attr("width", "200px").css("background", "#aaaaaa");
                }

                else {
                  foodImage.attr("src", value.thumb);
                };

                columnOne.addClass("col-sm-3 d-flex align-items-center").append(foodImage);

                columnTwo.addClass("col-sm-6").html(result);

                var currentLocation = address.replace(/ /g, "+");

                var destinationAddress = location.address;

                destinationAddress = destinationAddress.replace(/ /g, "+");

                var mapImage = $("<img>");

                var mapQueryURL = "https://www.mapquestapi.com/staticmap/v5/map?start=" + currentLocation + "&end=" + destinationAddress + "&size=170,170@2x&key=" + mapQuestKey;

                mapImage.attr("src", mapQueryURL).addClass("mapImage mapRealImage").attr("restAddress", location.address).attr("restName", value.name);

                var mapInstruct = $("<h2>");

                mapInstruct.text("Click for Interactive Map").addClass("mapImage mapInstruct").css("opacity", ".7").css("background", "grey").css("color", "white").css("position", "absolute").css("bottom", "-2px").css("font-size", "16px").css("text-align", "center").css("padding", "8px 0");

                var floatingDiv = $("<div>");

                floatingDiv.addClass("floatingDiv float-right").append(mapImage, mapInstruct).css("margin-left", "auto");

                columnThree.addClass("col-sm-3 d-flex align-items-center").addClass("mapColumn").append(floatingDiv);

                newRow.append(columnOne, columnTwo, columnThree);

                if (parsingNow === (data.length - 1)) {
                  $(".result").append(newRow)
                }

                else {
                  $(".result").append(newRow, "<hr size='330'>");
                };
              });
            });
          });
      });
  });

  $(".result").on("click", ".mapImage", function (event) {
    var currentRestaurant = $(this).attr("restName");

    $("#interactiveMapTitle").text("Map to " + currentRestaurant);

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

        if (mapVar) {
          mapVar.remove();
        }

        mapVar = L.mapquest.map("mapGoesHere", {
          center: [computeLatitude, computeLongitude],
          layers: L.mapquest.tileLayer("map"),
          zoom: 12
        });

        var directions = L.mapquest.directions();

        directions.setLayerOptions({
          startMarker: {
            icon: "marker",
            iconOptions: {
              size: "md",
              primaryColor: "#000000",
              secondaryColor: "#008000",
              symbol: "A"
            }
          },

          endMarker: {
            icon: "marker",
            iconOptions: {
              size: "md",
              primaryColor: "#000000",
              secondaryColor: "#ff4500",
              symbol: "B"
            }
          }
        });

        directions.route({
          start: address,
          end: endAddress
        });

        mapVar.addControl(L.mapquest.control());
      });
  });
});