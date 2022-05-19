"use strict";

window.onload = init;
let parkLocations = [];
let parkTypes = [];
let parkList = {};

function init() {
    // get info from JSON files
    $.getJSON("data/locations.json", function (result) {
        parkLocations = result;
        loadLocations();
    })
    $.getJSON("data/parktypes.json", function (result) {
        parkTypes = result;
        loadTypes();

    })
    $.getJSON("data/nationalparks.json", function (result) {
        parkList = result;
    })
    //Note to self: CANNOT ACCESS DATA FROM .GETJSON HERE. IT'S NOT BACK YET!

    // Event handlers
    document.getElementById("searchBtn").onclick = matchParks;
    document.getElementById("typeRadio").onclick = hideDDL;
    document.getElementById("locationRadio").onclick = hideDDL;
    document.getElementById("allRadio").onclick = hideDDL;
}



// Fill search by location drop down:
function loadLocations() {
    const locationDdl = document.getElementById("locationDdl");
    let length = parkLocations.length;
    for (let i = 0; i < length; i++) {
        let option = document.createElement("OPTION");
        option.text = parkLocations[i];
        option.value = parkLocations[i];
        locationDdl.add(option);
    }
}

//fill search by type drop down:
function loadTypes() {
    const typeDdl = document.getElementById("typeDdl");
    let length = parkTypes.length;
    for (let i = 0; i < length; i++) {
        let option = document.createElement("OPTION");
        option.text = parkTypes[i];
        option.value = parkTypes[i];
        typeDdl.add(option);
    }
}

// function - on click of searchBtn - fill in right side with table 
function matchParks() {
    // match based on location selection
    if (document.getElementById("locationRadio").checked) {
        const locationDdl = document.getElementById("locationDdl");
        let selectedLocation = locationDdl.options[locationDdl.selectedIndex].value;
        const table = document.getElementById("parksByLocTble");

        //clear previous selection:
        clearType();
        clearAll();
        table.innerHTML = "";

        //fill table with new selection:
        fillTableHeaders(table);
        let length = parkList.parks.length;
        for (let i = 0; i < length; i++) {

            if (selectedLocation == parkList.parks[i].State) {
                addRowToTable(table, parkList.parks[i]);
            }
        }
    }

    // match based on type of park selection
    if (document.getElementById("typeRadio").checked) {
        const typeDdl = document.getElementById("typeDdl");
        const table = document.getElementById("parksByTypeTble")
        let selectedType = typeDdl.options[typeDdl.selectedIndex].value;

        //clear previous selection:
        clearLocation();
        clearAll();
        table.innerHTML = "";

        //fill table with new selection:
        fillTableHeaders(table)
        let length = parkList.parks.length;
        for (let i = 0; i < length; i++) {
            let parkName = parkList.parks[i].LocationName;
            let foundString = parkName.toLowerCase().indexOf(selectedType.toLowerCase())
            if (foundString != -1) {
                addRowToTable(table, parkList.parks[i]);
            }
        }
    }

    //show all parks 
    if (document.getElementById("allRadio").checked) {
        const table = document.getElementById("allTble")

        //clear previous selection:
        clearLocType();
        table.innerHTML = "";
        document.getElementById("allDiv").style.display = "block";

        //fill table with new selection:
        fillTableHeaders(table)
        let length = parkList.parks.length;
        for (let i = 0; i < length; i++) {
            addRowToTable(table, parkList.parks[i]);
        }
    }
}
// fill in column headers
function fillTableHeaders(table) {
    let row = table.insertRow(-1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    cell1.innerHTML = "<strong> Name";
    cell2.innerHTML = "<strong> Address";
    cell3.innerHTML = "<strong> Phone Number";
}

//fill in table
function addRowToTable(table, parks) {
    let name = parks.LocationName;
    let phone= parks.Phone
    //check for link
    if (parks.Visit != undefined) {
        name = "<a target='_blank' href='" + parks.Visit + "'>" + parks.LocationName + "</a>"
    }
    if (parks.Phone == 0){
        phone = "";
    }
    let row = table.insertRow(-1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    cell1.innerHTML = name;
    cell2.innerHTML = parks.Address + " , " + parks.City + " , " + parks.State + " " + parks.ZipCode;
    cell3.innerHTML = phone;
}

//clears what was displayed when they hit search
function clearType() {
    document.getElementById("locDiv").style.display = "block";
    document.getElementById("typeDiv").style.display = "none";
    document.getElementById("parksByTypeTble").innerHTML = "";
    document.getElementById("typeDdl").value = "99";
}
function clearLocation() {
    document.getElementById("typeDiv").style.display = "block";
    document.getElementById("locDiv").style.display = "none";
    document.getElementById("parksByLocTble").innerHTML = "";
    document.getElementById("locationDdl").value = "99";
}
function clearAll() {
    document.getElementById("allDiv").style.display = "none";
    document.getElementById("allTble").innerHTML = "";
}
function clearLocType() {
    document.getElementById("locDiv").style.display = "none";
    document.getElementById("typeDiv").style.display = "none";
    document.getElementById("parksByTypeTble").innerHTML = "";
    document.getElementById("parksByLocTble").innerHTML = "";
    document.getElementById("locationDdl").value = "99";
    document.getElementById("typeDdl").value = "99";

}
// runs when they change radio selection 
function hideDDL() {
    if (document.getElementById("locationRadio").checked) {
        document.getElementById("locDdlDiv").style.display = "block";
        document.getElementById("typeDdlDiv").style.display = "none";
        document.getElementById("locDiv").style.display = "block";
        document.getElementById("typeDiv").style.display = "none";
        document.getElementById("allDiv").style.display = "none";

    }
    if (document.getElementById("typeRadio").checked) {
        document.getElementById("locDdlDiv").style.display = "none";
        document.getElementById("typeDdlDiv").style.display = "block";
        document.getElementById("typeDiv").style.display = "block";
        document.getElementById("locDiv").style.display = "none"
        document.getElementById("allDiv").style.display = "none";

    }
    if (document.getElementById("allRadio").checked) {
        document.getElementById("typeDdlDiv").style.display = "none";
        document.getElementById("locDdlDiv").style.display = "none";
        document.getElementById("typeDiv").style.display = "none";
        document.getElementById("locDiv").style.display = "none"
        document.getElementById("allDiv").style.display = "block";
    }
}

