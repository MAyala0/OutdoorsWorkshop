"use strict";

window.onload = init;
let mountainList = {};
let sunTimes = {};

function init() {
    // get info from JSON files
    $.getJSON("data/mountains.json", function (result) {
        mountainList = result;
        loadMountains();
    })

    document.getElementById("mountainDdl").onchange = loadMountainInfo;

    // function to fill drop downs
    function loadMountains() {
        const mountainDdl = document.getElementById("mountainDdl");
        let length = mountainList.mountains.length;
        for (let i = 0; i < length; i++) {
            let option = document.createElement("OPTION");
            option.text = mountainList.mountains[i].name;
            option.value = mountainList.mountains[i].name;
            mountainDdl.add(option);
        }
    }

    function loadMountainInfo() {
        //reset table 
        document.getElementById("mntnTbl").innerHTML = " ";

        //pull selection
        const mountainDdl = document.getElementById("mountainDdl");
        let mntSelection = mountainDdl.options[mountainDdl.selectedIndex].value;

        //loop through to find match
        let length = mountainList.mountains.length;
        for (let i = 0; i < length; i++) {
            let nameTitle = "<strong>Name";
            let descTitle = "<strong>Description";
            let elevationTitle = "<strong>Elevation";
            if (mountainList.mountains[i].name == mntSelection) {

                //send info over to fill table 
                const table = document.getElementById("mntnTbl");
                addRowInTable(table, nameTitle, mountainList.mountains[i].name);
                addRowInTable(table, descTitle, mountainList.mountains[i].desc);
                addRowInTable(table, elevationTitle, mountainList.mountains[i].elevation);
                displayMntPic(mountainList.mountains[i].img, mountainList.mountains[i].name);

                //send info to getSunTimes
                getSunTimes(mountainList.mountains[i].coords.lat, mountainList.mountains[i].coords.lng);
            }
        }
    }

    //fill in table
    function addRowInTable(table, title, data) {
        let row = table.insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        cell1.innerHTML = title;
        cell2.innerHTML = data;
    }

    function displayMntPic(fileName, mntnName) {
        const mntnImage = document.getElementById("mntnImage");
        mntnImage.style.display = "block";
        mntnImage.src = ("../img/mountains/" + fileName);
        mntnImage.alt = mntnName;
    }

    function getSunTimes(lat, long) {
        // make function to concat url
        let sunLink = "https://api.sunrise-sunset.org/json?lat=" + lat + "&lng=" + long + "&date=today"

        // call get json 
        $.getJSON(sunLink, function (result) {
            sunTimes = result;
            //pull sunset
            let sunset = sunTimes.results.sunset;
            //pull sunrise
            let sunrise = sunTimes.results.sunrise;
            addTimes(sunrise, sunset);
        })
    }

    function addTimes(sunrise, sunset) {
        // add them to div next to picture 
        document.getElementById("riseH").innerHTML = "Sunrise: " + sunrise + " UTC";
        document.getElementById("setH").innerHTML = "Sunset: " + sunset + " UTC";
        document.getElementById("setH").style.display = "block";
        document.getElementById("riseH").style.display = "block";
    }
}

