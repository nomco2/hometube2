const socket = new WebSocket(`ws://${window.location.host}`)

socket.addEventListener('oepn', () =>{
    console.log("connected to server");
});