import React from 'react';
import Square from './Square';
import logo from '../Assets/img/tic-tac-toe-logo.png';
import { move } from '../Helpers/Socket';

class Playground extends React.Component {
    componentWillMount() {
        this.props.onRestart();
    }

    handleMove(pos) {
        
        let { onMoveOnBotmode } = this.props;
        if (this.props.DashboardReducer.isBotMode) {
            
            // Human
            onMoveOnBotmode(pos);
            // Bot
            onMoveOnBotmode(this.findNextMoveForBot(pos));
        }
        else {// Người vs người  
            let { Player,P1ID, P2ID } = this.props.SocketReducer; 
            
            let { historyMove } = this.props.PlaygroundReducer;
            
            if(historyMove.length % 2 !== (Player - 1))
            {
                onMoveOnBotmode(pos);
                if(Player === 1)
                {
                    move(P1ID,pos);
                }
                else
                {
                    move(P2ID,pos);
                }
            }
        }
    }

    handleHistoryClick(historyState)
    {
        let { isBotMode } = this.props.DashboardReducer;
        let { onBack2History } = this.props;

        if(isBotMode)
        {
            onBack2History(historyState);
        }
        else
        {
            // do nothing
        }
    }

    findNextMoveForBot(pos) {
        let { squares } = this.props.PlaygroundReducer;
        var botPos = pos + 1;
        if (pos === 399) {
            botPos = 0;
        }
        while (squares[botPos].value !== null) {
            botPos++;

            if (botPos === 400) {
                botPos = 0;
            }
        }
        return botPos;
    }

    createTable = () => {
        let { isWaiting } = this.props.SocketReducer;
        let { isBotMode } = this.props.DashboardReducer;

        if (!isBotMode && isWaiting) {
            return (
                <div className="bg-light p-5">
                    WAITING FOR ANOTHER PLAYER ...
                </div>
            );
        }
        else {
            let { squares, winnerMove } = this.props.PlaygroundReducer;

            let winnerPos = 0;
            let table = [];

            // Outer loop to create parent
            for (let i = 0; i < 20; i++) {
                let children = []
                //Inner loop to create children
                for (let j = 0; j < 20; j++) {

                    if (squares[20 * i + j].value !== null) {
                        if (winnerPos < 5 && winnerMove[winnerPos] === i * 20 + j) {
                            children.push(
                                <Square key={20 * i + j} onClick={() => this.handleMove(20 * i + j)} value={squares[20 * i + j].value} className="square square-winnerMove" />
                            )
                            winnerPos += 1;
                        }
                        else {
                            children.push(
                                <Square key={20 * i + j} onClick={() => this.handleMove(20 * i + j)} value={squares[20 * i + j].value} className={squares[20 * i + j].class} />
                            )
                        }
                    }
                    else {
                        children.push(<Square key={20 * i + j} onClick={() => this.handleMove(20 * i + j)} value={'\u00A0'} className={squares[20 * i + j].class} />)
                    }
                }

                //Create the parent and add the children
                table.push(<div className="board-row" key={i}>{children}</div>)
            }

            return table
        }
    }

    createHistoryTable = () => {
        let { isASC, selectedStep, historyMove } = this.props.PlaygroundReducer;     
        let { isBotMode } = this.props.DashboardReducer;   

        const historyTable = historyMove.slice();


        // Kiểm tra hình thức sort là tăng dần hay giảm dần theo thời gian đánh nước đó
        if (!isASC) {
            historyTable.reverse();
        }

        let table = [];
        let row, column;
        for (let i = 0; i < historyTable.length; i++) {
            row = Math.floor(historyTable[i].index / 20) + 1;
            column = historyTable[i].index % 20 + 1;
            if (selectedStep === historyTable[i].step) {
                if (historyTable[i].step === 0) {
                    table.push(<tr className="cursor-pointer font-weight-bold border-bottom border-black" key={i} onClick={() => this.handleHistoryClick(historyTable[i])}><td>{historyTable[i].step}</td><td colSpan="3">GAME START</td></tr>)
                }
                else if (historyTable[i].step % 2 !== 0) {
                    table.push(<tr className="cursor-pointer font-weight-bold border-bottom border-black" key={i} onClick={() => this.handleHistoryClick(historyTable[i])}><td>{historyTable[i].step}</td><td>P1</td><td>{row}</td><td>{column}</td></tr>)
                }
                else {
                    if(isBotMode)
                    {
                        table.push(<tr className="cursor-pointer font-weight-bold border-bottom border-black" key={i} onClick={() => this.handleHistoryClick(historyTable[i])}><td>{historyTable[i].step}</td><td>P2</td><td>{row}</td><td>{column}</td></tr>)
                    }
                    else
                    {
                        // do nothing
                    }
                }
            }
            else {
                if (historyTable[i].step === 0) {
                    table.push(<tr className="cursor-pointer border-bottom border-black" key={i} onClick={() => this.handleHistoryClick(historyTable[i])}><td>{historyTable[i].step}</td><td colSpan="3">GAME START</td></tr>)
                }
                else if (historyTable[i].step % 2 !== 0) {
                    table.push(<tr className="cursor-pointer border-bottom border-black" key={i} onClick={() => this.handleHistoryClick(historyTable[i])}><td>{historyTable[i].step}</td><td>P1</td><td>{row}</td><td>{column}</td></tr>)
                }
                else {
                    if(isBotMode)
                    {
                        table.push(<tr className="cursor-pointer border-bottom border-black" key={i} onClick={() => this.handleHistoryClick(historyTable[i])}><td>{historyTable[i].step}</td><td>P2</td><td>{row}</td><td>{column}</td></tr>)
                    }
                    else
                    {
                        // do nothing
                    }
                }
            }
        }


        return <table style={{ width: '100%' }} cellSpacing="0" cellPadding="5"><thead><tr className="border-bottom border-black bg-secondary text-white"><th>Move#</th><th>Player</th><th>Row</th><th>Column</th></tr></thead><tbody>{table}</tbody></table>
    }

    generateChatBox() {
        return (
            <div className="chatbox mt-0">
                <div className="messages">
                    <div>
                        <p className="rounded-pill">
                        </p>
                    </div>
                </div>

                <span>&nbsp;</span>
                <div className="input-group mb-3 border-top border-dark input-container">
                    <textarea type="text" rows="1" className="form-control" placeholder="Nhập tin nhắn ..." ></textarea>
                    <div className="input-group-append">
                        <button className="btn btn-danger" type="button">
                            Gửi
                    </button>
                    </div>
                </div>
            </div>
        );
    }

    generateHistoryChat(DESClass, ASCClass) {
        let { isChatBoxOpen } = this.props.PlaygroundReducer;
        let { onToggleSort } = this.props;

        if (isChatBoxOpen) {
            return (
                <div>{this.generateChatBox()}</div>
            );
        }
        else {
            return (
                <div>
                    <div className="btn-group btn-group-toggle w-100 my-1">
                        <button className={DESClass} onClick={() => { onToggleSort(false) }}>&#8595; DESC</button>
                        <button className={ASCClass} onClick={() => { onToggleSort(true) }}> ASC &#8593;</button>
                    </div>
                    <div className="history-table h-200px disable">
                        {this.createHistoryTable()}
                    </div>
                </div>
            );
        }
    }

    handleClickUndoRequest(){
        console.log("undo request");        
    }

    handleClickDrawRequest(){
        console.log("draw request");
    }

    handleClickGiveUpRequest(){
        console.log("give up request");
    }

    generateComboButton(){
        let { isOver } = this.props.PlaygroundReducer;
        if(isOver === 0)
        {
            return (
                    <div>
                        <button className="btn btn-dark w-100 d-flex font-weight-bold my-2 align-items-center" onClick={()=>{this.handleClickUndoRequest()}}>
                            <i className="fa fa-undo pull-left "></i>
                            <span className="mx-auto">UNDO</span>
                        </button>
                        <div className="d-flex justify-content-around mt-3">
                            <button style={{ width: '49%' }} className="btn btn-info d-flex font-weight-bold align-items-center" onClick={()=>{this.handleClickDrawRequest()}}>
                                <i className="fa fa-handshake pull-left "></i>
                                <span className="mx-auto">SEND DRAW</span>
                            </button>
                            <button style={{ width: '49%' }} className="btn btn-danger d-flex font-weight-bold align-items-center" onClick={()=>{this.handleClickGiveUpRequest()}}>
                                <i className="fa fa-flag pull-left "></i>
                                <span className="mx-auto">GIVE UP</span>
                            </button>
                        </div>
                    </div>
            );
        }
        else
        {
            return (
                <div>
                    <button className="btn btn-secondary w-100 d-flex font-weight-bold my-2 align-items-center">
                        <i className="fa fa-arrow-left pull-left "></i>               
                        <span className="mx-auto">QUIT</span>
                    </button>
                </div>
            );
        }
    }

    generateTurnPlayer() {
        let { turnP1 } = this.props.PlaygroundReducer;
        let { isWaiting, P1name, P2name } = this.props.SocketReducer;

        if(isWaiting)
        {
            return (
                <div className="font-weight-bold text-center status border-15px-365e46 py-4">
                    <img src={logo} alt="Tic Tac Toe Logo" className="logo"></img>
                </div>
            );
        }
        else
        {
            if (turnP1) {
                return (
                    <div className="font-weight-bold text-center status border-15px-365e46 py-4">
                        <h2 className="text-danger">{P1name}: X</h2>
                        <h5 className="text-primary">VS</h5>
                        <h2>{P2name}: O</h2>
                    </div>
                );
            }
            else {
                return (
                    <div className="font-weight-bold text-center status border-15px-365e46 py-4">
                        <h2>{P1name}: X</h2>
                        <h5 className="text-primary">VS</h5>
                        <h2 className="text-danger">{P2name}: O</h2>
                    </div>
                );
            }
        }
    }

    generateInfoMatch(notice, type, DESClass, ASCClass) {
        let { isChatBoxOpen } = this.props.PlaygroundReducer;
        let { isBotMode } = this.props.DashboardReducer;
        let { onToggleChatBox, onRestart, onToggleSort } = this.props;

        if (!isBotMode) {
            let chatClass;
            let historyClass;

            if (isChatBoxOpen) {
                chatClass = 'nav-link cursor-pointer active';
                historyClass = 'nav-link cursor-pointer';
            }
            else {
                chatClass = 'nav-link cursor-pointer';
                historyClass = 'nav-link cursor-pointer active';
            }

            return (
                // vs Human mode

                <div className="col mt-1">
                    {this.generateTurnPlayer()}

                    <div className="status my-2 border-15px-365e46">
                        {notice}
                    </div>

                    <div className="status my-2 border-15px-365e46">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a className={chatClass} onClick={() => { onToggleChatBox(false) }}>Chat</a>
                            </li>
                            <li className="nav-item">
                                <a className={historyClass} onClick={() => { onToggleChatBox(true) }}>History</a>
                            </li>
                        </ul>
                        <div className="h-250px">
                            {this.generateHistoryChat(DESClass, ASCClass)}
                        </div>
                    </div>

                    {this.generateComboButton()}

                </div>

            );
        }
        else {
            return (
                // vs Bot mode
                <div className="col mt-1">
                    <div className="font-weight-bold text-center status border-15px-365e46 py-4">
                        <img src={logo} alt="Tic Tac Toe Logo" className="logo"></img>
                    </div>
                    <div className="status my-2 border-15px-365e46">
                        {notice}
                    </div>
                    <div className="status my-2 border-15px-365e46">
                        {type}
                    </div>

                    <button className="btn btn-danger d-flex align-items-center w-100 font-weight-bold my-2" onClick={() => { onRestart() }}>
                        <i className="fa fa-undo pull-left"></i>
                        <span className="mx-auto">RESTART</span>
                    </button>
                    <div className="d-flex justify-content-between mt-3">
                        <h4 className="text-center text-danger font-weight-bold">HISTORY MOVE</h4>
                        <div className="btn-group btn-group-toggle">
                            <button className={DESClass} onClick={() => { onToggleSort(false) }}>&#8595; DESC</button>
                            <button className={ASCClass} onClick={() => { onToggleSort(true) }}> ASC &#8593;</button>
                        </div>
                    </div>
                    <div className="history-table h-250px mt-2 border-15px-365e46">
                        {this.createHistoryTable()}
                    </div>
                </div>
            );
        }
    }

    render() {
        let status;
        let notice;
        let type;

        let ASCClass, DESClass;

        let { isASC, isOver, isP1Win, turnP1 } = this.props.PlaygroundReducer;
        let { isBotMode } = this.props.DashboardReducer;
        let { Player, P1name, P2name } = this.props.SocketReducer;

        // Sắp xếp lịch sử nước đi
        if (isASC) {
            ASCClass = "btn btn-warning font-weight-bold my-btn active";
            DESClass = "btn btn-warning font-weight-bold my-btn";
        }
        else {
            ASCClass = "btn btn-warning font-weight-bold my-btn";
            DESClass = "btn btn-warning font-weight-bold my-btn active";
        }

        // Kiểm tra trò chơi kết thúc
        if(isBotMode)
        {
            if (isOver === 2) {
                notice = <div className="alert alert-dark">DRAW - Nobody win !!!</div>
                type = <h3 className="text-center">--*****--</h3>
            }
            else if (isOver === 1) {
                if (isP1Win) {
                    notice = <div className="alert alert-success">Congratulation !!!</div>
                }
                else {
                    notice = <div className="alert alert-danger">You got lost !!!</div>
                }
                type = <h3 className="text-center">--*****--</h3>
            }
            else {
                if (turnP1) {
                    status = "One";
                    type = <h3>Type: X</h3>;
                }
                else {
                    status = "Two";
                    type = <h3>Type: O</h3>;
                }
                notice = <h3>Player: {status}</h3>;
            }
        }
        else
        {
            if (isOver === 2) {
                notice = <div className="alert alert-dark">DRAW - Nobody win !!!</div>
                type = <h3 className="text-center">--*****--</h3>
            }
            else if (isOver === 1) {
                if(Player === 1) // p1 win
                {
                    if (isP1Win) {
                        notice = <div className="alert alert-success">Congratulation !!!</div>
                    }
                    else {
                        notice = <div className="alert alert-danger">You got lost !!!</div>
                    }
                }
                else // p2 win
                {
                    if (isP1Win) {
                        notice = <div className="alert alert-danger">You got lost !!!</div>
                    }
                    else {
                        notice = <div className="alert alert-success">Congratulation !!!</div>
                    }
                }
            }
            else {
                if (Player === 1) {
                    notice = <h3>Player: {P1name}</h3>;
                }
                else {
                    notice = <h3>Player: {P2name}</h3>;                    
                }                
            }
        }

        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-8 mt-1">
                        <div className="board border-15px-365e46">
                            {this.createTable()}
                        </div>
                    </div>
                    {this.generateInfoMatch(notice, type, DESClass, ASCClass)}
                </div>
            </div>
        );
    }
}

export default Playground;