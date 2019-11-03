import openSocket from 'socket.io-client';

export const socketService = {
    joinGame,
}

const socket = openSocket('http://localhost:8080/');

function joinGame(id,name){
    socket.emit('joinGame', {id: id, name:name});
}