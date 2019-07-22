var userData = new Array();
let submitbtn = document.getElementById("login_form");


window.onload = () => {
  load();
}

var load = () => {
    loadJSON("assets/MOCK_DATA.json",(data) => {
        userData = data;
        makeList(userData);
        uniqueList();
        createCityOption();
        createStateOption();
    });
}

var loadJSON = (path,success,error) => {
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = () =>{
        if (xmlHttpRequest.readyState == XMLHttpRequest.DONE && xmlHttpRequest.status == 200) {
            
            if (success) {
                success(JSON.parse(xmlHttpRequest.responseText));
            } else {
                error(xmlHttpRequest);
            }
            
        }
    }

    xmlHttpRequest.open("GET",path,true);
    xmlHttpRequest.send();
}

    let newCities = new Array();
    let newStates = new Array();

var uniqueList = () => {
    
    var cities = new Array();
    var states = new Array();
    
    userData.forEach(element => {
        cities.push(element.city);
    });
    userData.forEach(element => {
        states.push(element.state);
    });
    newCities = [...new Set(cities)];
    newStates = [...new Set(states)];    
}

var createCityOption = () => {
    var cityList = "<option value = 'noCity' >choose city</option>";
    newCities.forEach(city => {
        cityList += `<option value = "${city}">${city}</option>`;
    });
    document.getElementById('cityOptions').innerHTML = cityList;
}

var createStateOption = () => {
    var stateList = "<option value = 'noState' >choose state</option>";
    newStates.forEach(state => {
        stateList += `<option value = "${state}">${state}</option>`;
    });
    document.getElementById('stateOptions').innerHTML = stateList;
}



var makeList = (userData) => {
    var listData = "";
    userData.forEach(element => {
        listData += `<tr>
                            <td>${element.city}</td>
                            <td>${element.phone}</td>
                            <td>${element.state}</td>
                            <td>${element.country}</td>
                        
                        </tr>`;
    });
    document.getElementById('user-data').innerHTML = listData;
}


var formSubmit = (e) => {
    e.preventDefault();
    var city = document.getElementById('cityOptions').value;
    var state = document.getElementById('stateOptions').value;
    var country = document.getElementById('countryOptions').value;
    
    var newData = new Array();
    
    newData = [];

   userData.forEach(element => {
       if (city == 'noCity' && state != 'noState' && country != 'noCountry') {
        if (element.country == country && element.state == state) {
            newData.push(element);
       }
    }else if(city == 'noCity' && state == 'noState' && country != 'noCountry'){
        if (element.country == country) {
            newData.push(element);
        }
    }else if (city == 'noCity' && country == 'noCountry' && state != 'noState') {
        if (element.state == state) {
            newData.push(element);
        }
    }
    else if(state == 'noState' && city != 'noCity' && country != 'noCountry'){

       if (element.city == city && element.country == country) {
            newData.push(element);
       }
    }else if (state == 'noState' && country == 'noCountry' && city != 'noCity') {
        if (element.city == city) {
            newData.push(element);
            
        }
    }
    else if(country == 'noCountry' && city != 'noCity' && state != 'noState'){
        if (element.city == city && element.state == state) {
            newData.push(element);
        }

    }
   });
   
   console.log(newData);
   

   if (newData.length == 0) {
     document.getElementById('message').style.display = "block";
     makeList(userData);
   } else {
    document.getElementById('message').style.display = "none";
    makeList(newData);
   }
}

//event listners
submitbtn.addEventListener('submit',formSubmit);

