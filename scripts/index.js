
var the_temp = document.querySelector("#the_temp");

var cityName = document.querySelector("#cityName");
var continent = document.querySelector("#continent");
var time = document.querySelector("#time");
var currentDate = document.querySelector("#currentDate");

var humidity = document.querySelector("#humidity");
var wind = document.querySelector("#wind");
var cloud = document.querySelector("#cloud");
var icons = document.querySelectorAll("img");


var select = document.querySelector("#selectCity");
var serverResponse;

select.onchange = function() {

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
    		serverResponse = JSON.parse(this.responseText);

			the_temp.innerText = Math.floor(serverResponse.current.temp_c);

			humidity.innerText = serverResponse.current.humidity;
			wind.innerText = Math.floor(serverResponse.current.wind_mph) + " " + serverResponse.current.wind_dir;
			cloud.innerText = Math.floor(serverResponse.current.cloud);

			cityName.innerText = serverResponse.location.name;
			continent.innerText = serverResponse.location.country;

			time.innerText = serverResponse.location.localtime.split(" ")[1];


			var month;
			switch (serverResponse.location.localtime.split(/-|\:| /g)[1]){
				case "01":
					month = "January";
					break;
				case "02":
					month = "February";
					break;
				case "03":
					month = "March";
					break;
				case "04":
					month = "April";
					break;
				case "05":
					month = "May";
					break;
				case "06":
					month = "June";
					break;
				case "07":
					month = "July";
					break;
				case "08":
					month = "August";
					break;
				case "09":
					month = "September";
					break;
				case "10":
					month = "October";
					break;
				case "11":
					month = "November";
					break;
				case "12":
					month = "December";
					break;
			};


			var day = (parseInt(serverResponse.location.localtime.split(/-|\:| /g)[1]) + parseInt(serverResponse.location.localtime.split(/-|\:| /g)[2]) + parseInt(serverResponse.location.localtime.split(/-|\:| /g)[0])) % 7;
			console.log(day);
			switch (day){
				case 1:
					day = "Saturday";
					break;
				case 2:
					day = "Sunday";
					break;
				case 3:
					day = "Monday";
					break;
				case 4:
					day = "Tuesday";
					break;
				case 5:
					day = "Wednesday";
					break;
				case 6:
					day = "Thursday";
					break;
				case 7:
					day = "Friday";
					break;
			};


			currentDate.innerText = day + " " + month + " "+ serverResponse.location.localtime.split(/-|\:| /g)[2] + " " + serverResponse.location.localtime.split(/-|\:| /g)[0];

			icons.forEach(function(img){
				img.setAttribute("src", "http:" + serverResponse.current.condition.icon);
			});
	    };
	};

	xhttp.open("GET", "https://intense-beach-78744.herokuapp.com/?city=" + select.value, true);
	xhttp.send();
};


