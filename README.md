# FoodMood

# Project 1, Group 1


### Team Members

Antonio\
Abdu\
Adam\
Matt


#### Project Description

FoodMood is a restaurant finder app that allows the user to input their location as well as a specific type of cuisine they are in the mood for. Once it has this information, it will show them results in their area. The application will utilize two APIs, which will retrieve information both about the restaurants and about the routes to the restaurants. This information will ultimately help the user decide on which restaurant to go to for the specific type of cuisine they are in the mood for.

Deployed app at https://ajdlm.github.io/FoodMood/.


#### Key Features

* restaurants near the useer

* details of the restaurants

* locations of the restaurants

* routes to the restaurants from the user


#### Technologies Used

* HTML

* CSS

* JavaScript

* jQuery

* AJAX

* MapQuest.js

* Leaflet.js


#### APIs Used

* Zomato

* MapQuest


#### Outstanding Issues

* Some code remaining in style.css may no longer have any real purpose.

* Because of the size of the food images for the carousel, they don't scale vertically very well on iPads and other very long viewports and little has been done to offset this issue beyond making the footer seem to grow upward to fill the empty space.

* Previously, a thumbnail image would display next to each search result if there was one available, but the property that used to house such images has since been removed. The restaurant objects in the API still contain two properties that might eventually replace it -- "featured_image" and "thumb" -- but in every instance I have seen, neither of these properties is used to store image URLs. As such, for the time being, all search results will be accompanied only by the generic placeholder image from the app's assets folder.