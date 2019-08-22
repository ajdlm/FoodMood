$(document).ready(function() {
  
            $("#search").on("click", function() {

                window.location.hash = '<a href="app.js';

                  var address=$("#address").val();
                
                  var cuisines = $('#cuisine').val();

                  $("body").css('background','white')

                  $("#address").val("");

                  $("#cuisine").val("");
                  
                  $(".carousel-inner").hide();

                  $(".jumbotron m-0").css({ 'background-color':'none'});

                  if(address===""& cuisines===""){
                      return;
            }


            /// --option two for zip-code vs logtide and  Latitude-----var url=" https://www.zipcodeapi.com/rest/<api_key>/info.<format>/<zip_code>/<units>",

            CustomEvent="";


            console.log(cuisines)


            console.log(address )

                        ///...test api....https://developers.zomato.com/api/v2.1/search?entity_id=%2094741&entity_type=zone&cuisines=55&establishment_type=1
                        var queryURL="https://developers.zomato.com/api/v2.1/search?entity_id=280&sort=rating&order=asc&q="+address+"cuisines="+cuisines+"&apikey=967e2e08ce22588b1668ae3b432bf765"; 
                                    
                          $.ajax({
                            url: queryURL,
                            method: "get",
                            headers: {
                              'user-key':"967e2e08ce22588b1668ae3b432bf765",
                              }
                          })

             .then( function(data) {
                        
                   data = data.restaurants;
                        var result = "";
                        
                            $.each(data, function(index, value) {
                              var res = data[index];

                                  $.each(res, function(index, value) {

                                            var location = res.restaurant.location;
                                                result += "<div class='dataImg'>";
                                                  result += "</div>";result += "<img class='rest-img' alt='coming soon'src=" + value.thumb + " >"+  "<h2>" + value.name + "</h2>"+ "<h6>" + location.address + "</h6>"+"<h4>"+"Cuisines: "+ value.cuisines+"</h4>";  result += "<div>"; 
                                                  result +="<h7>"+value.phone_numbers+""+"</h7>";"<div>"+"</div>"; result += "<a href=" + value.menu_url + " target='_blank' class='action_link'>" +"Menu" + "</strong></a>"+"<hr/><dv>"                              
                                              });

                                       });
                     $(".result").html(result+"test/ok");
                            console.log(result)
                   });
                      
              });
    });
