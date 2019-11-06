import openSocket from 'socket.io-client';
import {MyStore} from '../index';
import { moveBotmode, setStateForGameOver } from '../Actions/Action';

const socket = openSocket('http://localhost:8080/');
//const socket = openSocket('https://server-midtern-project.herokuapp.com/');
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
        localStorage.setItem('room',JSON.stringify({room:room,player:1}));
        dispatch({type:'PLAYER_ONE',P1ID:data.P1ID, P1name:data.P1name,P2ID:data.P2ID, P2name:data.P2name,});
    });

    socket.on('playerTwo', (data) => {
        room = data.room;
        console.log("player two");    
        console.log(data);    
        localStorage.setItem('room',JSON.stringify({room:room,player:2}));
        dispatch({type:'PLAYER_TWO',P1ID:data.P1ID, P1name:data.P1name,P2ID:data.P2ID, P2name:data.P2name,});
    });
    // _------------------------------------------------
    
    socket.on('turnPlayed',(data)=>{
        room = data.room;
        console.log("turn played");    
        console.log(data);    
        dispatch(moveBotmode(data.pos));
    });

    // Undo request
    socket.on('handleUndoRequest',(data)=>{
        room = data.room;
        console.log('handle undo request');
        console.log(data);
        dispatch({type:'RECEIVE_UNDO_REQUEST',});
    });

    socket.on('receiveUndoRequest',(data)=>{
        room = data.room;
        console.log('receive undo request');
        console.log(data);
        if(data.isAccept)
        { // Đồng ý
            dispatch({type:'BACK_TO_HISTORY',index:-1});            
        }
        else
        {
            alert("Your oppeonent don't agree for you to undo");
        }
        console.log("resume game");
        dispatch({type:'RESUME_GAME'});

    });

    // Draw request
    socket.on('handleDrawRequest',(data)=>{
        room = data.room;
        console.log('handle draw request');
        console.log(data);
        dispatch({type:'RECEIVE_DRAW_REQUEST',});
    });

    socket.on('receiveDrawRequest',(data)=>{
        room = data.room;
        console.log('receive draw request');
        console.log(data);
        if(data.isAccept)
        { // Đồng ý
            console.log("game over type",)
            dispatch({type:'GAME_OVER',gameOverType:2});            
        }
        else
        {
            alert("Your oppeonent don't agree for a draw match");
        }
        console.log("resume game");
        dispatch({type:'RESUME_GAME'});

    });

    // Give up request
    socket.on('handleGiveUpRequest',(data)=>{
        room = data.room;
        console.log('handle give up request');
        console.log(data);
        alert("Your opponent give up");        
        if(data.player === 1)
        {
            dispatch({type:'SET_STATE_FOR_GAME_OVER',isP1Win:false});
        }
        else
        {
            dispatch({type:'SET_STATE_FOR_GAME_OVER',isP1Win:true});
        }

        dispatch({type:'GAME_OVER',gameOverType:1});        
    });

    // Chat
    socket.on('receiveChatMessage',(data)=>{
        room = data.room;
        console.log('receive chat message');
        console.log(data);
        dispatch({type:'RECEIVE_CHAT_MESSAGE',id:data.id,message:data.message});
    });

    // Xin state info
    socket.on('requireStateInfo',(data)=>{
        room = data.room;
        console.log('give state info');    
        let playground = MyStore.getState().PlaygroundReducer;
        let scket = MyStore.getState().SocketReducer;
        socket.emit('answerStateInfo',{
            Player:data.player,
            room:data.room,
            squares:playground.squares,
            historyMove:playground.historyMove,
            winnerMove:playground.winnerMove,
            selectedStep:playground.selectedStep,
            currentMove:playground.currentMove,
            turnP1:playground.turnP1,
            isASC:playground.isASC,
            isOver:playground.isOver,
            isP1Win:playground.isP1Win,
            P1ID: scket.P1ID,
            P1name: scket.P1name,
            P2ID: scket.P2ID,
            P2name: scket.P2name,            
            chatMessages: scket.chatMessages,
        });
    });
    
    socket.on('receiveStateInfo',(data)=>{
        room = data.room;
        console.log('receive state info');
        console.log(data);      
        dispatch({
            type:'UPDATE_SOCKET_STATE_INFO',
            Player:data.Player,
            P1ID: data.P1ID,
            P1name: data.P1name,
            P2ID: data.P2ID,
            P2name: data.P2name,            
            chatMessages: data.chatMessages,
        })
        dispatch({
            type:'UPDATE_STATE_PLAYGROUND_INFO',
            squares:data.squares,
            historyMove:data.historyMove,
            winnerMove:data.winnerMove,
            selectedStep:data.selectedStep,
            currentMove:data.currentMove,
            turnP1:data.turnP1,
            isASC:data.isASC,
            isOver:data.isOver,
            isP1Win:data.isP1Win,
        });
        dispatch({
            type:'PLAY_AGAINST_HUMAN',
        });
    });
}

export const joinGame = (id, name) => {
    console.log('join game');
    socket.emit('joinGame', { id: id, name: name });
}

export const move = (id, pos) => {
    console.log(room);
    socket.emit('playTurn',{room:room,id:id,pos:pos,});
}

// Undo request
export const sendUndoRequest = () => {
    socket.emit('sendUndoRequest',{room:room});
    console.log("send undo request");
    MyStore.dispatch({type:'PAUSE_GAME'});
    
}

export const answerUndoRequest = (isAccept) => {
    socket.emit('answerUndoRequest',{room:room, isAccept: isAccept});    
    console.log('accept undo request');    
    MyStore.dispatch({type:'ANSWER_UNDO_REQUEST'});    
    if(isAccept)
    {
        console.log('back 1 step');
        MyStore.dispatch({type:'BACK_TO_HISTORY',index:-1});
    }
}

// Draw request
export const sendDrawRequest = () => {
    socket.emit('sendDrawRequest',{room:room});
    MyStore.dispatch({type:'PAUSE_GAME'});
}

export const answerDrawRequest = (isAccept) => {
    socket.emit('answerDrawRequest',{room:room, isAccept: isAccept});    
    console.log('accept draw request');    
    MyStore.dispatch({type:'ANSWER_DRAW_REQUEST'});    
    if(isAccept)
    {
        console.log('back 1 step');
        MyStore.dispatch({type:'GAME_OVER',gameOverType:2});
    }
}

// Give up request
export const sendGiveUpRequest = (player) => {    
    socket.emit('sendGiveUpRequest',{room:room,player:player});
    console.log("player");
    console.log(player);
    if(player === 1)
    {
        MyStore.dispatch({type:'SET_STATE_FOR_GAME_OVER',isP1Win:false});
    }
    else
    {
        MyStore.dispatch({type:'SET_STATE_FOR_GAME_OVER',isP1Win:true});
    }
    MyStore.dispatch({type:'GAME_OVER',gameOverType:1});
}

// Chat
export const sendChatMessage = (id,message) => {
    socket.emit('sendChatMessage',{room:room,id:id,message:message});
    MyStore.dispatch({type:'RECEIVE_CHAT_MESSAGE',id:id,message:message});    
}

// Refresh pages but not leave room
export const sendStateInfoRequire = (room) => {    
    socket.emit('sendStateInfoRequire',{room:room});
}

// Leave Server
export const leaveServer = (player,isEndGame) => {
    console.log('leave room');
    localStorage.removeItem('room');
    socket.emit('leaveServer',{room:room,player:player,isEndGame:isEndGame,});
}

export default configureSocket;