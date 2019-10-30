import React from 'react';
import Square from './Square';
import logo from '../Assets/img/tic-tac-toe-logo.png';

function winnerCondition(squares,i)
{   
    // Kiểm tra hàng dọc    
    let chessNum = 1;
    let TwoSideChecked = 0;
    let res = [];

    for(let j = 1;j<5;j++)
    {
        if(i-j*20 >=0)
        {
            if(squares[i].value === squares[i-j*20].value)
            {
                chessNum++;                         
                if(chessNum === 5)
                {           
                    if(
                        (i-5*20 <0 || (squares[i-5*20].value !== squares[i].value && squares[i-5*20].value !== null))
                        && (i+20 >= 400 || (squares[i+20].value !== squares[i].value && squares[i+20].value !== null))
                    )
                    {   
                        return null;                 
                    }     

                    // Thắng lơi                    
                    for(var t = 0;t<5;t++)
                    {                        
                        res.push(i-t*20);
                    }
                    
                    return res.reverse();
                }
            }    
            else if(squares[i-j*20].value !== null)        
            {                
                TwoSideChecked++;
                break;
            }
            else
            {
                break;
            }
        }
        else
        {            
            TwoSideChecked++;
            break;
        }
    }
    for(let j = 1;j<5;j++)
    {
        if(i + j*20 < 400 && squares[i].value === squares[i+j*20].value)
        {
            chessNum++;                    
            if(chessNum === 5)
            {
                if(i+(j+1)*20 >= 400 || (squares[i+(j+1)*20].value!==squares[i].value && squares[i+(j+1)*20].value!==null))
                {
                    if(TwoSideChecked === 1)
                    {                        
                        return null;
                    }
                }

                // Thắng lơi
                
                let r = i+j*20;
                for(t = 0;t<5;t++)
                {                    
                    res.push(r-t*20);
                }          
                    
                return res.reverse();
            }
        }
        else
        {
            break;
        }
    }
    
    // Kiểm tra hàng ngang
    chessNum = 1;
    TwoSideChecked = 0;
    for(let j = 1;j<5;j++)
    {
        if(i%20 - j >=0)
        {
            if(squares[i].value === squares[i-j].value)
            {
                chessNum++;                         
                if(chessNum === 5)
                {           
                    if(
                        (i%20-5 < 0 || (squares[i-5].value !== squares[i].value && squares[i-5].value !== null))
                        && (i%20+1 >= 20 || (squares[i+1].value !== squares[i].value && squares[i+1].value !== null))
                    )
                    {                        
                        return null;                
                    }   
                    // Thắng lơi
                    
                    let r = i;
                    for(t = 0;t<5;t++)
                    {                        
                        res.push(r-t);
                    } 
                           
                    return res.reverse();
                }
            }    
            else if(squares[i-j].value !== null)        
            {                
                TwoSideChecked++;
                break;
            }
            else
            {
                break;
            }
        }
        else
        {            
            TwoSideChecked++;
            break;
        }
    }
    for(let j = 1;j<5;j++)
    {
        if(i%20 + j < 20 && squares[i].value === squares[i+j].value)
        {
            chessNum++;                    
            if(chessNum === 5)
            {
                if(i%20+j+1 >= 20 || (squares[i+j+1].value!==squares[i].value && squares[i+j+1].value!==null))
                {
                    if(TwoSideChecked === 1)
                    {                        
                        return null;
                    }
                }

                // Thắng lơi
                
                let r = i+j;
                for(t = 0;t<5;t++)
                {                    
                    res.push(r-t);
                } 
                       
                return res.reverse();
            }
        }
        else
        {
            break;
        }
    }

    // Kiểm tra chéo trái
    chessNum = 1;
    TwoSideChecked = 0;
    for(let j = 1;j<5;j++)
    {
        if(i%20-j >=0 && i-j-j*20 >=0)
        {
            if(squares[i].value === squares[i-j-j*20].value)
            {
                chessNum++;                         
                if(chessNum === 5)
                {           
                    if(
                        (i%20-5 < 0 || i-5*20 <0 || (squares[i-5-5*20].value !== squares[i].value && squares[i-5-5*20].value !== null))
                        && (i%20+1 >= 20 || i+20>=400 || (squares[i+1+20].value !== squares[i].value && squares[i+1+20].value !== null))
                    )
                    {
                        return null;                    
                    }     

                    // Thắng lơi
                    
                    let r = i;
                    for(t = 0;t<5;t++)
                    {                        
                        res.push(r-t-t*20);
                    } 
                         
                    return res.reverse();
                }
            }    
            else if(squares[i-j-j*20].value !== null)        
            {                
                TwoSideChecked++;
                break;
            }
            else
            {
                break;
            }
        }
        else
        {            
            TwoSideChecked++;
            break;
        }
    }
    for(let j = 1;j<5;j++)
    {        
        if(i%20+j<20 && i+j+j*20 < 400 && squares[i].value === squares[i+j+j*20].value)
        {
            chessNum++;                    
            if(chessNum === 5)
            {
                if(i%20+j+1 >= 20 || i+(j+1)*20>=400
                    || (squares[i+j+1+(j+1)*20].value!==squares[i].value && squares[i+j+1+(j+1)*20].value!==null))
                {
                    if(TwoSideChecked === 1)
                    {                        
                        return null;
                    }
                }

                // Thắng lơi
                
                let r = i+j+j*20;
                for(t = 0;t<5;t++)
                {                        
                    res.push(r-t-t*20);
                } 
                        
                return res.reverse();
            }
        }
        else
        {
            break;
        }
    }

    // Kiểm tra chéo phải
    chessNum = 1;
    TwoSideChecked = 0;
    for(let j = 1;j<5;j++)
    {
        if(i%20+j<20 && i+j-j*20 >= 0)
        {
            if(squares[i].value === squares[i+j-j*20].value)
            {
                chessNum++;                         
                if(chessNum === 5)
                {           
                    if(
                        (i%20+5 >= 20 || i-5*20 < 0 || (squares[i+5-5*20].value !== squares[i].value && squares[i+5-5*20].value !== null))
                        && (i%20-1 < 0 || i+20 >= 400 || (squares[i-1+20].value !== squares[i].value && squares[i-1+20].value !== null))
                    )
                    {                        
                        return null;                    
                    }     

                    // Thắng lơi
                    
                    let r = i;
                    for(t = 0;t<5;t++)
                    {
                        res.push(r+t-t*20);                        
                    }       
                     
                    return res.reverse();
                }
            }    
            else if(squares[i+j-j*20].value !== null)        
            {                
                TwoSideChecked++;
                break;
            }
            else
            {
                break;
            }
        }
        else
        {            
            TwoSideChecked++;
            break;
        }
    }
    for(let j = 1;j<5;j++)
    {
        if(i%20-j>=0 && i-j+j*20 < 400 && squares[i].value === squares[i-j+j*20].value)
        {
            chessNum++;                    
            if(chessNum === 5)
            {
                if(i%20-j-1 < 0 || i+(j+1)*20>=400
                    || (squares[i-(j+1)+(j+1)*20].value!==squares[i].value && squares[i-(j+1)+(j+1)*20].value!==null))
                {
                    if(TwoSideChecked === 1)
                    {                        
                        return null;
                    }
                }

                // Thắng lơi
                
                let r = i-j+j*20;
                for(t = 0;t<5;t++)
                {
                    res.push(r+t-t*20);                        
                }       
                    
                return res.reverse();
            }
        }
        else
        {
            break;
        }
    }
    return null;
}

class Playground extends React.Component
{
    constructor() {
        super();
        this.state = {
            squares: Array(400).fill({value:null,class:'square square-normal'}),
            historyMove: [{
                step:0,
                winnerMove:[],
                index: null,
                currentMove:null,                
                squares:Array(400).fill({value:null,class:'square square-normal'}),
            }],
            winnerMove:[],
            selectedStep: 0,
            currentMove: null,            
            turn_p1: true,
            isASC:false,
            isOver: 0,
            isP1Win: false,
        };
        
    }

    handleClick(i) {
        
        if(this.state.isOver === 0) // Kiểm tra kết thúc ván đấu
        {
            if(this.state.squares[i].value === null) // Kiểm tra xem đã đánh chưa
            {
                const squares = this.state.squares.slice();
                const history = this.state.historyMove.slice(0,this.state.selectedStep + 1);
                const length = history.length;

                if(this.state.turn_p1)
                {   
                    squares[this.state.currentMove] = {value:'O',class:'square square-normal'}
                    squares[i] = {value:'X',class:'square square-current'};                    
                }
                else
                {
                    squares[this.state.currentMove] = {value:'X',class:'square square-normal'}
                    squares[i] = {value:'O',class:'square square-current'};
                }

                // Cập nhật lịch sử                
                history.push({
                    step:length,    
                    winnerMove:[],                                    
                    index: i,
                    currentMove:i,
                    squares:squares,
                });

                this.setState({
                    historyMove:history,
                    selectedStep:length,
                    squares: squares,                      
                    currentMove: i, // Cập nhật lại nước đi
                    turn_p1: !this.state.turn_p1,
                },
                ()=>{          
                    let res = winnerCondition(squares,i);
                    if(res !== null)
                    {
                        history[length].winnerMove = res;
                        if(this.state.turn_p1)
                        {                            
                            this.setState({
                                winnerMove: res,
                                historyTable: history,
                                isOver: 1,
                                isP1Win: false,
                            })
                        }
                        else
                        {                            
                            this.setState({     
                                winnerMove: res,     
                                historyTable: history,                      
                                isOver: 1,
                                isP1Win: true,
                            })
                        }
                    }
                    else if(this.state.historyMove.length - 1 === 400)
                    {
                        this.setState({
                            isOver: 2,
                        })
                    }
                    else
                    {
                        // do nothing
                        this.setState({                            
                            isOver: 0,
                        })
                    }                    
                });
            }
        }       
        
    }

    handleTimeTravelClick(item)
    {   
        this.setState({
            winnerMove: item.winnerMove,
            selectedStep: item.step,
            squares: item.squares,
            currentMove: item.currentMove,
            isOver: (item.winnerMove.length === 5) ? 1 : ((item.step === 400) ? 2 : 0),
            turn_p1: (item.step%2) === 0,
        })
    }

    handleASCSortClick()
    {
        if(!this.state.isASC)
        {
            this.setState({
                isASC: true,
            })
        }        
    }

    handleDESSortClick()
    {
        if(this.state.isASC)
        {
            this.setState({
                isASC: false,
            })
        }        
    }

    handleRestartClick()
    {
        this.setState({
            squares: Array(400).fill({value:null,class:'square square-normal'}),
            historyMove: [{
                step:0,
                winnerMove:[],
                index: null,
                currentMove:null,                
                squares:Array(400).fill({value:null,class:'square square-normal'}),
            }],
            winnerMove:[],
            selectedStep: 0,
            currentMove: null,            
            turn_p1: true,
            isASC:false,
            isOver: 0,
            isP1Win: false,
        })
    }

    createTable = () => {
        let winnerPos = 0;
        let table = []

        // Outer loop to create parent
        for (let i = 0; i < 20; i++) {
            let children = []
            //Inner loop to create children
            for (let j = 0; j < 20; j++) {                
                
                if(this.state.squares[20*i+j].value !== null)
                {             
                    if(winnerPos < 5 && this.state.winnerMove[winnerPos] === i*20+j)
                    {
                        children.push(
                            <Square key={20*i+j} onClick={()=>this.handleClick(20*i+j)} value={this.state.squares[20*i+j].value} className="square square-winnerMove"/>
                        )
                        winnerPos += 1;
                    }
                    else
                    {
                        children.push(
                            <Square key={20*i+j} onClick={()=>this.handleClick(20*i+j)} value={this.state.squares[20*i+j].value} className={this.state.squares[20*i+j].class}/>
                        )
                    }
                }
                else
                {
                    children.push(<Square key={20*i+j} onClick={()=>this.handleClick(20*i+j)} value={'\u00A0'} className={this.state.squares[20*i+j].class}/>)
                } 
            }

            //Create the parent and add the children
            table.push(<div className="board-row" key={i}>{children}</div>)
        }
        return table
    }

    createHistoryTable = () =>{
        const historyTable = this.state.historyMove.slice();
        

        // Kiểm tra hình thức sort là tăng dần hay giảm dần theo thời gian đánh nước đó
        if(!this.state.isASC)
        {
            historyTable.reverse();            
        }
        
        let table = [];   
        let row,column;             
        for(let i = 0; i<historyTable.length;i++)
        {         
            row = Math.floor(historyTable[i].index / 20) + 1;
            column = historyTable[i].index % 20 + 1;            
            if(this.state.selectedStep === historyTable[i].step)
            {
                if(historyTable[i].step === 0)
                {
                    table.push(<tr className="cursor-pointer font-weight-bold border-bottom border-black" key={i} onClick={()=>this.handleTimeTravelClick(historyTable[i])}><td>{historyTable[i].step}</td><td colSpan="3">GAME START</td></tr>)
                }
                else if(historyTable[i].step % 2 !== 0)
                {
                    table.push(<tr className="cursor-pointer font-weight-bold border-bottom border-black" key={i} onClick={()=>this.handleTimeTravelClick(historyTable[i])}><td>{historyTable[i].step}</td><td>P1</td><td>{row}</td><td>{column}</td></tr>)
                }
                else
                {
                    table.push(<tr className="cursor-pointer font-weight-bold border-bottom border-black" key={i} onClick={()=>this.handleTimeTravelClick(historyTable[i])}><td>{historyTable[i].step}</td><td>P2</td><td>{row}</td><td>{column}</td></tr>)
                }
            }            
            else
            {
                if(historyTable[i].step === 0)
                {
                    table.push(<tr className="cursor-pointer border-bottom border-black" key={i} onClick={()=>this.handleTimeTravelClick(historyTable[i])}><td>{historyTable[i].step}</td><td colSpan="3">GAME START</td></tr>)
                }
                else if(historyTable[i].step % 2 !== 0)
                {
                    table.push(<tr className="cursor-pointer border-bottom border-black" key={i} onClick={()=>this.handleTimeTravelClick(historyTable[i])}><td>{historyTable[i].step}</td><td>P1</td><td>{row}</td><td>{column}</td></tr>)
                }
                else
                {
                    table.push(<tr className="cursor-pointer border-bottom border-black" key={i} onClick={()=>this.handleTimeTravelClick(historyTable[i])}><td>{historyTable[i].step}</td><td>P2</td><td>{row}</td><td>{column}</td></tr>)
                }
            }            
        }   
        

        return <div className="history-table mt-2 border-15px-365e46"><table cellSpacing="0" cellPadding="5"><thead><tr className="border-bottom border-black bg-secondary text-white"><th>Move#</th><th>Player</th><th>Row</th><th>Column</th></tr></thead><tbody>{table}</tbody></table></div>
    }

    render() {
        let status;
        let notice;
        let type;        

        let ASCClass,DESClass;

        // Sắp xếp lịch sử nước đi
        if(this.state.isASC)
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
        if(this.state.isOver === 2)
        {
            notice = <div className="alert alert-danger">DRAW - Nobody win !!!</div>
            type = <h3 className="text-center">--*****--</h3>
        }
        else if(this.state.isOver === 1)
        {
            if(this.state.isP1Win)
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
            if(this.state.turn_p1)
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

                    <button className="btn btn-danger w-100 font-weight-bold my-2" onClick={()=>this.handleRestartClick()}>RESTART</button>
                    <div className="d-flex justify-content-between mt-3">
                        <h4 className="text-center text-danger font-weight-bold">HISTORY MOVE LIST</h4>
                        <div className="btn-group btn-group-toggle">
                            <button className={DESClass} onClick={()=>this.handleDESSortClick()}>&#8595; DESC</button>
                            <button className={ASCClass} onClick={()=>this.handleASCSortClick()}> ASC &#8593;</button>                            
                        </div>                        
                    </div>   

                    {this.createHistoryTable()}
                </div>
            </div>
        </div>
        );
    }
}

export default Playground;