import axios from "axios";
// import openSocket from 'socket.io-client';

// const  socket = openSocket('http://localhost:5000');

export default{
    saveBar: function(barData){
        return axios.post("/api/bars", barData);
    },
    getBar: function(id){
        return axios.get("/api/bars" + id);
    },
    deleteBar: function(id){
        return axios.delete("/api/bars" + id);
    }
}
// function subscribeToTimer(cb) {
//     socket.on('timer', timestamp => cb(null, timestamp));
//     socket.emit('subscribeToTimer', 1000);
// } 
// export { subscribeToTimer }