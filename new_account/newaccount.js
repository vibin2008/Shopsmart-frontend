function get_address(lat, lon) {
    //using openstreet an free api to convert latitude and longitude into address
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
        .then(res => res.json())
        .then(data => {
            var address = data.display_name;
            var response = confirm('Verify Address: \n\n'+address);
            if(response){
                var address_box = document.getElementById('address_box');
                address_box.value = address;
            }
            else{
                alert('Please try to enter address manually !');
            }
        });
}

function geolocation(){
    // using browsers inbuilt navigation.geolocation api to find the users latitude and longitude
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            function(position){
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;
                get_address(latitude,longitude);
            }
        )
    }
}

function check_username(){
    var username = document.getElementById('username').value;
    var msg = document.getElementById('username_msg');
    if (username.length >= 6){
        msg.textContent = '';
        fetch("https://ayla-ropier-consuela.ngrok-free.dev/username_check",{
        method : "POST",
        headers: {
                "Content-Type": "application/json"
            },
        body: JSON.stringify({
                user: username
            })
        })
        .then(res => res.json())
        .then(data => {
            var result = data.status;
            if(result == 'failure'){
                msg.textContent = '*Username Unavailable,try new one'
            }
        });
    }
    else{
        msg.textContent = '*Username should be atleast 6 characters long';
    }
}