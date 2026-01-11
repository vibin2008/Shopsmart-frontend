function login(){
  console.log("online..")
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  fetch("https://ayla-ropier-consuela.ngrok-free.dev/",{
    method : "POST",
    headers: {
            "Content-Type": "application/json"
        },
    body: JSON.stringify({
            user: username,
            pass: password
        })
      })
    .then(res => res.json())
    .then(data => {
        console.log(data);
    });

}