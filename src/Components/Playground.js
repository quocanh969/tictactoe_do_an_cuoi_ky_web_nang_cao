import React from 'react';
import Square from './Square';
import logo from '../Assets/img/tic-tac-toe-logo.png';



class Playground extends React.Component
{  
    componentWillMount()
    {
        this.props.onRestart();
    }

    createTable = () => {
        let { squares, winnerMove } = this.props.PlaygroundReducer;
        let { onMoveOnBotmode } = this.props;

        let winnerPos = 0;
        let table = [];

        // Outer loop to create parent
        for (let i = 0; i < 20; i++) {
            let children = []
            //Inner loop to create children
            for (let j = 0; j < 20; j++) {                
                
                if(squares[20*i+j].value !== null)
                {             
                    if(winnerPos < 5 && winnerMove[winnerPos] === i*20+j)
                    {
                        children.push(
                            <Square key={20*i+j} onClick={()=>onMoveOnBotmode(20*i+j)} value={squares[20*i+j].value} className="square square-winnerMove"/>
                        )
                        winnerPos += 1;
                    }
                    else
                    {
                        children.push(
                            <Square key={20*i+j} onClick={()=>onMoveOnBotmode(20*i+j)} value={squares[20*i+j].value} className={squares[20*i+j].class}/>
                        )
                    }
                }
                else
                {
                    children.push(<Square key={20*i+j} onClick={()=>onMoveOnBotmode(20*i+j)} value={'\u00A0'} className={squares[20*i+j].class}/>)
                } 
            }

            //Create the parent and add the children
            table.push(<div className="board-row" key={i}>{children}</div>)
        }
        return table
    }

    createHistoryTable = () =>{        
        let { isASC, selectedStep, historyMove } = this.props.PlaygroundReducer;
        let { onBack2History } = this.props;

        const historyTable = historyMove.slice();
        

        // Kiểm tra hình thức sort là tăng dần hay giảm dần theo thời gian đánh nước đó
        if(!isASC)
        {
            historyTable.reverse();            
        }
        
        let table = [];   
        let row,column;             
        for(let i = 0; i<historyTable.length;i++)
        {         
            row = Math.floor(historyTable[i].index / 20) + 1;
            column = historyTable[i].index % 20 + 1;            
            if(selectedStep === historyTable[i].step)
            {
                if(historyTable[i].step === 0)
                {
                    table.push(<tr className="cursor-pointer font-weight-bold border-bottom border-black" key={i} onClick={()=>onBack2History(historyTable[i])}><td>{historyTable[i].step}</td><td colSpan="3">GAME START</td></tr>)
                }
                else if(historyTable[i].step % 2 !== 0)
                {
                    table.push(<tr className="cursor-pointer font-weight-bold border-bottom border-black" key={i} onClick={()=>onBack2History(historyTable[i])}><td>{historyTable[i].step}</td><td>P1</td><td>{row}</td><td>{column}</td></tr>)
                }
                else
                {
                    table.push(<tr className="cursor-pointer font-weight-bold border-bottom border-black" key={i} onClick={()=>onBack2History(historyTable[i])}><td>{historyTable[i].step}</td><td>P2</td><td>{row}</td><td>{column}</td></tr>)
                }
            }            
            else
            {
                if(historyTable[i].step === 0)
                {
                    table.push(<tr className="cursor-pointer border-bottom border-black" key={i} onClick={()=>onBack2History(historyTable[i])}><td>{historyTable[i].step}</td><td colSpan="3">GAME START</td></tr>)
                }
                else if(historyTable[i].step % 2 !== 0)
                {
                    table.push(<tr className="cursor-pointer border-bottom border-black" key={i} onClick={()=>onBack2History(historyTable[i])}><td>{historyTable[i].step}</td><td>P1</td><td>{row}</td><td>{column}</td></tr>)
                }
                else
                {
                    table.push(<tr className="cursor-pointer border-bottom border-black" key={i} onClick={()=>onBack2History(historyTable[i])}><td>{historyTable[i].step}</td><td>P2</td><td>{row}</td><td>{column}</td></tr>)
                }
            }            
        }   
        

        return <table style={{width:'100%'}} cellSpacing="0" cellPadding="5"><thead><tr className="border-bottom border-black bg-secondary text-white"><th>Move#</th><th>Player</th><th>Row</th><th>Column</th></tr></thead><tbody>{table}</tbody></table>
    }

    generateChatBox()
    {
        return(
            <div class="chatbox mt-0">    
                <div class="messages">
                    <div>
                        <p class="rounded-pill">                
                        </p>                    
                    </div>            
                </div>
                
                <span>&nbsp;</span>
                <div class="input-group mb-3 border-top border-dark input-container">
                    <textarea type="text" rows="1" class="form-control" placeholder="Nhập tin nhắn ..." ></textarea>              
                    <div class="input-group-append">
                    <button class="btn btn-danger" type="button">
                        Gửi
                    </button>
                    </div>
                </div>          
            </div>
        );
    }

    generateHistoryChat(DESClass,ASCClass)
    {
        let { isChatBoxOpen } = this.props.PlaygroundReducer;
        let { onToggleSort } = this.props;
        
        if(isChatBoxOpen)
        {
            return(
                <div>{this.generateChatBox()}</div>
            );            
        }
        else
        {
            return(
                <div>
                    <div className="btn-group btn-group-toggle w-100 my-1">
                        <button className={DESClass} onClick={()=>{onToggleSort(false)}}>&#8595; DESC</button>
                        <button className={ASCClass} onClick={()=>{onToggleSort(true)}}> ASC &#8593;</button>                            
                    </div> 
                    <div className="history-table h-200px">
                        {this.createHistoryTable()}
                    </div>
                </div>                
            );
        }
    }

    generateTurnPlayer()
    {
        let { turnP1 } = this.props.PlaygroundReducer;
        if(turnP1)
        {
            return(
                <div className="font-weight-bold text-center status border-15px-365e46 py-4">                  
                    <h2 className="text-danger">Player 1: O</h2>
                    <h5 className="text-primary">VS</h5>
                    <h2>Player 2: X</h2>
                </div>
            );
        }
        else
        {
            return(
                <div className="font-weight-bold text-center status border-15px-365e46 py-4">                  
                    <h2>Player 1: O</h2>
                    <h5 className="text-primary">VS</h5>
                    <h2 className="text-danger">Player 2: X</h2>
                </div>
            );
        }
    }

    generateInfoMatch(notice,type,DESClass,ASCClass)
    {        
        let { isChatBoxOpen } = this.props.PlaygroundReducer;
        let { isBotMode } = this.props.DashboardReducer;
        let { onToggleChatBox, onRestart, onToggleSort } = this.props;        

        if(!isBotMode)
        {
            let chatClass;
            let historyClass;

            if(isChatBoxOpen)
            {
                chatClass='nav-link cursor-pointer active';
                historyClass='nav-link cursor-pointer';
            }
            else
            {
                chatClass='nav-link cursor-pointer';
                historyClass='nav-link cursor-pointer active';
            }

            return(
                // vs Human mode
                
                <div className="col">
                    {this.generateTurnPlayer()}

                    <div className="status my-2 border-15px-365e46">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a className={chatClass} onClick={()=>{onToggleChatBox(false)}}>Chat</a>
                            </li>
                            <li className="nav-item">
                                <a className={historyClass} onClick={()=>{onToggleChatBox(true)}}>History</a>
                            </li>
                        </ul>
                        <div className="h-250px">
                            {this.generateHistoryChat(DESClass,ASCClass)}
                        </div>
                    </div>

                    <button className="btn btn-dark w-100 d-flex font-weight-bold my-2 align-items-center">
                        <i className="fa fa-undo pull-left "></i>
                        <span className="mx-auto">UNDO</span>
                    </button>
                    <div className="d-flex justify-content-around mt-3">
                        <button style={{width:'49%'}} className="btn btn-info d-flex font-weight-bold align-items-center">
                            <i className="fa fa-handshake pull-left "></i>                             
                            <span className="mx-auto">SEND DRAW</span>
                        </button>
                        <button style={{width:'49%'}} className="btn btn-danger d-flex font-weight-bold align-items-center">
                            <i className="fa fa-flag pull-left "></i>
                            <span className="mx-auto">GIVE UP</span>
                        </button>                                             
                    </div>   
                </div>
                
            );
        }
        else
        {
            return(
                // vs Bot mode
                <div className="col">
                    <div className="font-weight-bold text-center status border-15px-365e46 py-4">
                        <img src={logo} alt="Tic Tac Toe Logo" className="logo"></img>
                    </div>
                    <div className="status my-2 border-15px-365e46">
                        {notice}
                    </div>
                    <div className="status my-2 border-15px-365e46">
                        {type}
                    </div>

                    <button className="btn btn-danger d-flex align-items-center w-100 font-weight-bold my-2" onClick={()=>{onRestart()}}>
                        <i className="fa fa-undo pull-left"></i>
                        <span className="mx-auto">RESTART</span>
                    </button>
                    <div className="d-flex justify-content-between mt-3">
                        <h4 className="text-center text-danger font-weight-bold">HISTORY MOVE</h4>
                        <div className="btn-group btn-group-toggle">
                            <button className={DESClass} onClick={()=>{onToggleSort(false)}}>&#8595; DESC</button>
                            <button className={ASCClass} onClick={()=>{onToggleSort(true)}}> ASC &#8593;</button>                            
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

        let ASCClass,DESClass;

        let {isASC, isOver, isP1Win, turnP1} = this.props.PlaygroundReducer;


        // Sắp xếp lịch sử nước đi
        if(isASC)
        {
            ASCClass = "btn btn-warning font-weight-bold my-btn active";
            DESClass = "btn btn-warning font-weight-bold my-btn";
        }
        else
        {
            ASCClass = "btn btn-warning font-weight-bold my-btn";
            DESClass = "btn btn-warning font-weight-bold my-btn active";
        }

        // Kiểm tra trò chơi kết thúc
        if(isOver === 2)
        {
            notice = <div className="alert alert-danger">DRAW - Nobody win !!!</div>
            type = <h3 className="text-center">--*****--</h3>
        }
        else if(isOver === 1)
        {
            if(isP1Win)
            {
                notice = <div className="alert alert-danger">Player One Win !!!</div>
            }
            else
            {
                notice = <div className="alert alert-danger">Player Two Win !!!</div>
            }
            type = <h3 className="text-center">--*****--</h3>
        }
        else
        {   
            if(turnP1)
            {
                status = "One";
                type = <h3>Type: X</h3>;
            }
            else
            {
                status = "Two";
                type = <h3>Type: O</h3>;
            }
            notice = <h3>Player: {status}</h3>;
        }

        return (
        <div className="container mt-5">            
            <div className="row">
                <div className="col-8">
                    <div className="board border-15px-365e46">
                        {this.createTable()}                        
                    </div>                    
                </div>
                {this.generateInfoMatch(notice,type,DESClass,ASCClass)}
            </div>
        </div>
        );
    }
}

export default Playground;