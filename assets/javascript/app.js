$(document).ready(function () {
  const mapQuestKey = "1rySJiCRmjd2Eg8yQ16xnYvLxAQAlAyY";

  let address, addressLatitude, addressLongitude, mapVar;

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

    const cuisines = $("#cuisine").val().trim();

    if (address === "") {
      $("#badInput").modal("show");

      return;
    };

    window.location.hash = "results";

    $("#notFooter").removeClass("bg-dark");

    $("body").css('background', 'white');

    $("#carouselExampleIndicators").hide();

    $("#result").removeClass("d-none");

    $(".jumbotron m-0").css({ 'background-color': 'none' });

    $("#cuisine").val("");

    $("#address").val("");

    const longLatQueryURL = "https://www.mapquestapi.com/geocoding/v1/address?key=" + mapQuestKey + "&location=" + address;

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

        CustomEvent = "";


        console.log(cuisines);


        console.log(address);

        ///..."https://developers.zomato.com/api/v2.1/search?entity_id=280&sort=rating&order=asc&q=" +addressLatitude + "cuisines=" + cuisines + "&apikey=967e2e08ce22588b1668ae3b432bf765";
        ///...test api....https://developers.zomato.com/api/v2.1/search?entity_id=%2094741&entity_type=zone&cuisines=55&establishment_type=1
        const queryURL = "https://developers.zomato.com/api/v2.1/search?lat=" + addressLatitude + "&lon=" + addressLongitude + "&q=" + cuisines + "&apikey=967e2e08ce22588b1668ae3b432bf765";

        $.ajax({
          url: queryURL,
          method: "get",
          headers: {
            'user-key': "967e2e08ce22588b1668ae3b432bf765",
          }
        })

          .then(function (data) {

            data = data.restaurants;

            $("#result").empty();

            $.each(data, function (index, value) {
              const res = data[index];

              const parsingNow = index;

              $.each(res, function (index, value) {

                const location = res.restaurant.location;

                const userRating = res.restaurant.user_rating;

                console.log(location);

                let result = "";

                result += "<div class='dataImg'>";

                result += "</div>";

                result += "<p class='ratingText'>" + "<strong>" + userRating.aggregate_rating + "<span class='resultText'>" + "/5.0" + "</span>" + "</strong></p>";

                result += "<br /><br class='hideThis' /><a href=" + value.url + " target='_blank' class='action_link'>" + "<h2>" + value.name + "</strong></h2></a><br />";

                result += "<h4>" + '<strong>' + "Cuisines: " + '</strong>' + value.cuisines + "</h4>" + "<h6>" + location.address + "</h6>";

                const firstPhone = value.phone_numbers.split(",");

                result += "<p class='resultText d-inline'>" + firstPhone[0] + "</p>";

                result += "<a href=" + value.menu_url + " target='_blank' class='action_link menuPush'>" + "Menu" + "</a>";

                let newRow = $("<div>");

                let columnOne = $("<div>");

                let columnTwo = $("<div>");

                let columnThree = $("<div>");

                newRow.addClass("row");

                let foodImage = $("<img>");

                console.log(value);

                foodImage.attr("alt", "'coming soon'").attr("src", value.thumb).addClass("rest-img");

                if (value.thumb === "") {
                  foodImage.attr("src", "assets/images/no-image-available.png").attr("height", "200px").attr("width", "200px").css("background", "#aaaaaa");
                }

                else {
                  foodImage.attr("src", value.thumb);
                };

                columnOne.addClass("col-md-3 d-none d-md-flex align-items-center").append(foodImage);

                columnTwo.addClass("col-md-6 col-8").html(result);

                const currentLocation = address.replace(/ /g, "+");

                let destinationAddress = location.address;

                destinationAddress = destinationAddress.replace(/ /g, "+");

                let mapImage = $("<img>");

                const mapQueryURL = "https://www.mapquestapi.com/staticmap/v5/map?start=" + currentLocation + "&end=" + destinationAddress + "&size=170,170@2x&key=" + mapQuestKey;

                mapImage.attr("src", mapQueryURL).addClass("mapImage mapRealImage").attr("restAddress", location.address).attr("restName", value.name);

                let mapInstruct = $("<h2>");

                mapInstruct.text("Click for Interactive Map").addClass("mapImage mapInstruct").css("opacity", ".7").css("background", "grey").css("color", "white").css("position", "absolute").css("bottom", "-2px").css("font-size", "16px").css("text-align", "center").css("padding", "8px 0");

                let floatingDiv = $("<div>");

                floatingDiv.addClass("floatingDiv float-right").append(mapImage, mapInstruct).css("margin-left", "auto");

                columnThree.addClass("col-md-3 col-4 d-flex align-items-center").addClass("mapColumn").append(floatingDiv);

                newRow.append(columnOne, columnTwo, columnThree);

                if (parsingNow === (data.length - 1)) {
                  $("#result").append(newRow)
                }

                else {
                  $("#result").append(newRow, "<hr size='330'>");
                };
              });
            });
          });
      });
  });

  $("#result").on("click", ".mapImage", function (event) {
    const currentRestaurant = $(this).attr("restName");

    $("#interactiveMapTitle").text("Map to " + currentRestaurant);

    $("#interactiveMap").modal("show");

    console.log(this);

    const endAddress = $(this).attr("restAddress");

    const targetLatLongQueryURL = "https://www.mapquestapi.com/geocoding/v1/address?key=" + mapQuestKey + "&location=" + endAddress;

    $.ajax({
      url: targetLatLongQueryURL,
      method: "GET"
    })
      .then(function (response) {
        let computeLatitude = response.results[0].locations[0].latLng.lat;

        let computeLongitude = response.results[0].locations[0].latLng.lng;

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

        const directions = L.mapquest.directions();

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