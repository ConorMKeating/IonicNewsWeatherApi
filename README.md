# IonicNewsWeatherApi
Developed in Ionic framework, fetches news and weather information from API server and displays based on users choice of location. Final project for Mobile Apps Development module.

This application was developed on the Ionic framework for the Mobile Apps Development module.
It allows a user to access the settings page which accepts inputs for a city and a temperature unit.
Once these have been selected, going back to the home page will display the correct weather details
for that city in the correct units by connecting to the openweathermap.org API. There are also buttons
which will display the news related to the country which is returned from the weather API. This news
is also collected from an API (newsapi.org) once the button is pressed. Another button collects API
data from openweathermap.org to display the next 7 days weather forecast for the city. The user can
go back to the settings page and change cities or temperature units whenever they wish, and the
application will refresh the weather data in home page.

To run this program:<br>
1 Install ionic on local machine.
2 Download project folder.
3 In a command prompt, navigate to the project folder.
4 Enter the command..   ionic serve
