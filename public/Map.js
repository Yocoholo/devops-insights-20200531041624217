var map;

var BULLS = {
    lat: -40.174,
    lng: 175.384
}
//-40.174,175.384

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: BULLS
    });
    marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: BULLS
    });
    marker.addListener('dragend', toggleBounce);
}

function toggleBounce() {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    var json = fetch(`https://api.opencagedata.com/geocode/v1/json?q=${marker.position.lat()}+${marker.position.lng()}&key=4c0b87285a1d43c09119fa726366c65e`).then(function(response){
        return response.json();
    }).then(function(obj){
        console.log(obj)
        let components = obj.results[0].components
        console.log(components)
        var value;
        if(components.town != undefined) value = components.town
        else if(components.county != undefined) value = components.county
        else if(components.city != undefined) value = components.city
        var textBox = document.getElementById("textbox");
        textBox.setAttribute("value", value)
    }).catch(function(error){
        console.error('something went wrong when retrieving the json')
        console.error(error)
    })
    marker.setAnimation(null);
}