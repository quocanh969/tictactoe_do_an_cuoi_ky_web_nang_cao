import openSocket from 'socket.io-client';
import { moveBotmode } from '../Actions/Action';

const socket = openSocket('http://localhost:8080/');
var room = null;
const configureSocket = dispatch => {
    socket.on('connect', () => {
        console.log("connected");
    });
    
    // Kết nối 2 game thủ + tìm trận
    socket.on('newGame', (data) => {
        room = data.room;
        console.log("newgame");
        console.log(data);
        dispatch({type:'NEW_GAME',});
    });

    socket.on('playerOne', (data) => {
        room = data.room;
        console.log("player one");
        console.log(data);
        console.log('room',room);
        socket.emit('noticeBeginMatch',{room:room,});
        dispatch({type:'PLAYER_ONE',P1ID:data.P1ID, P1name:data.P1name,P2ID:data.P2ID, P2name:data.P2name,});
    });

    socket.on('playerTwo', (data) => {
        room = data.room;
        console.log("player two");    
        console.log(data);    
        dispatch({type:'PLAYER_TWO',P1ID:data.P1ID, P1name:data.P1name,P2ID:data.P2ID, P2name:data.P2name,});
    });
    // _------------------------------------------------
    
    socket.on('turnPlayed',(data)=>{
        room = data.room;
        console.log("player two");    
        console.log(data);    
        dispatch(moveBotmode(data.pos));
    });

    socket.on('handleUndoRequest',(data)=>{
        room = data.room;
        console.log('handle undo request');
        console.log(data);
        dispatch({type:'RECEIVE_UNDO_REQUEST',});
    });

    socket.on('handleDrawRequest',(data)=>{
        room = data.room;
        console.log('handle draw request');
        console.log(data);
        dispatch({type:'RECEIVE_DRAW_REQUEST',});
    });

    socket.on('handleGiveUpRequest',(data)=>{
        room = data.room;
        console.log('handle give up request');
        console.log(data);
        dispatch({type:'RECEIVE_GIVE_UP_REQUEST',});
    });
}

export const joinGame = (id, name) => {
    
    socket.emit('joinGame', { id: id, name: name });
}

export const move = (id, pos) => {
    console.log(room);
    socket.emit('playTurn',{room:room,id:id,pos:pos,});
}

export const sendUndoRequest = () => {
    socket.emit('sendUndoRequest',{room:room});
}

export const sendDrawRequest = () => {
    socket.emit('sendDrawRequest',{room:room});
}

export const sendGiveUpRequest = () => {
    socket.emit('sendGiveUpRequest',{room:room});
}

export default configureSocket;