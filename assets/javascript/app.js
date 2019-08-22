$(document).ready(function () {
    L.mapquest.key = "oSQY9xA7Ob4RJhEoBckcPrm67xWsMGjy";

    var currentLocation = "17 Linscott Road, Hingham MA 02043";

    //currentLocation = currentLocation.replace(/ /g, "+").replace(/,/g, "%2C");

    var restaurantAddress = "1217 Main St, Hingham, MA 02043";

    //restaurantAddress = restaurantAddress.replace(/ /g, "+").replace(/,/g, "%2C");

    var mapQueryURL = "https://www.mapquestapi.com/directions/v2/route?key=oSQY9xA7Ob4RJhEoBckcPrm67xWsMGjy&from=" + currentLocation + "&to=" + restaurantAddress + "&outFormat=json&ambiguities=ignore&routeType=fastest&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false";

    $.ajax({
        url: mapQueryURL,
        method: "GET"
    })
        .then(function (response) {
            var mapResults = response.route.locations;

            console.log(mapResults);

            console.log(response);

            var newSteve = $("div");

            newSteve.attr("id", "steve").attr("height", "300px").attr("weight", "300px");

            $("#myCarousel").append(newSteve);

            var map = L.mapquest.map("map", {
                center: [mapResults[0].latLng.lat, mapResults[0].latLng.lng],
                layers: L.mapquest.tileLayer("map"),
                zoom: 12
            });

            L.mapquest.directions().route({
                start: currentLocation,
                end: restaurantAddress
            });

            
        });
});
/*

    var newRow = $("<div>");

    var columnOne = $("<div>");

    var columnTwo = $("<div>");

    var columnThree = $("<div>");

    newRow.addClass("row");

    var foodImage = $("<img>");

    foodImage.attr("img", responseImageURL);

    columnOne.addClass("col-md-3");



    columnTwo.addClass("col-md-6");

    columnThree.addClass("col-md-3");

*/