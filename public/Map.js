function initMap() {
    var BULLS = {
        lat: -40.174,
        lng: 175.384
    }
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: BULLS
    });

    var marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: BULLS
    });

    map.addListener('click', function (mapsMouseEvent) {
        console.log(mapsMouseEvent.latLng.toString())
        marker.setPosition(mapsMouseEvent.latLng)
        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${marker.position.lat()}+${marker.position.lng()}&key=4c0b87285a1d43c09119fa726366c65e`).then(function (response) {
            return response.json();
        }).then(function (obj) {
            console.log(obj)
            let components = obj.results[0].components
            console.log(components)
            var val;
            if (components.city != undefined) val = components.city
            else if (components.town != undefined) val = components.town
            else if (components.county != undefined) val = components.county
            console.log(val)
            var textbox = document.getElementById("textboxSearchBar").value = val;
            document.getElementById("textboxSearchBar").click();
            
        }).catch(function (error) {
            console.error('something went wrong when retrieving the json')
            console.error(error)
        })
    });

    marker.addListener('click', function () {
        map.setZoom(map.zoom + 1);
        map.setCenter(marker.getPosition());
    });
}
