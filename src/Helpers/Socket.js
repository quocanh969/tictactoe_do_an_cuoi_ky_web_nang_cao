import openSocket from 'socket.io-client';

export const socketService = {
    joinGame,
}

const socket = openSocket('http://localhost:8080/');

socket.on('newGame', (data) => {
    console.log('new game');
    console.log(data);
})

socket.on('player1', (data) => {
    console.log('data p1:');
    console.log(data);
    dispatch({type:'PLAYER_ONE',id:data.P1ID, name:data.P1name})
});

socket.on('player2', (data) => {
    console.log('data p2:');
    console.log(data);
    dispatch({type:'PLAYER_ONE',id:data.P1ID, name:data.P1name})
});

function joinGame(id, name) {
    socket.emit('joinGame', { id: id, name: name });
}