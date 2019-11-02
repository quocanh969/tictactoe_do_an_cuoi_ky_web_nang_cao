import { TOGGLE_SORT, RESTART, BACK_TO_HISTORY, MOVE_BOTMODE, TOGGLE_CHAT_BOX, MOVE_PVPMODE, RECEIVE_MESSAGE, HANDLE_UNDO, HANDO_DRAW, HANDO_GIVE_UP } from '../Actions/Action';

const initState = {
    isChatBoxOpen: false,

    squares: Array(400).fill({ value: null, class: 'square square-normal' }),
    historyMove: [
        {
            step: 0,
            winnerMove: [],
            index: null,
            currentMove: null,
            squares: Array(400).fill({
                value: null,
                class: 'square square-normal'
            })
        }
    ],
    winnerMove: [],
    selectedStep: 0,
    currentMove: null,
    turnP1: true,
    isASC: false,
    isOver: 0,
    isP1Win: false
};

function winnerCondition(squares, i) {
    // Kiểm tra hàng dọc
    let chessNum = 1;
    let TwoSideChecked = 0;
    const res = [];

    for (let j = 1; j < 5; j += 1) {
        if (i - j * 20 >= 0) {
            if (squares[i].value === squares[i - j * 20].value) {
                chessNum += 1;
                if (chessNum === 5) {
                    if (
                        (i - 5 * 20 < 0 ||
                            (squares[i - 5 * 20].value !== squares[i].value &&
                                squares[i - 5 * 20].value !== null)) &&
                        (i + 20 >= 400 ||
                            (squares[i + 20].value !== squares[i].value &&
                                squares[i + 20].value !== null))
                    ) {
                        return null;
                    }

                    // Thắng lơi
                    for (let t = 0; t < 5; t += 1) {
                        res.push(i - t * 20);
                    }

                    return res.reverse();
                }
            } else if (squares[i - j * 20].value !== null) {
                TwoSideChecked += 1;
                break;
            } else {
                break;
            }
        } else {
            TwoSideChecked += 1;
            break;
        }
    }
    for (let j = 1; j < 5; j += 1) {
        if (i + j * 20 < 400 && squares[i].value === squares[i + j * 20].value) {
            chessNum += 1;
            if (chessNum === 5) {
                if (
                    i + (j + 1) * 20 >= 400 ||
                    (squares[i + (j + 1) * 20].value !== squares[i].value &&
                        squares[i + (j + 1) * 20].value !== null)
                ) {
                    if (TwoSideChecked === 1) {
                        return null;
                    }
                }

                // Thắng lơi

                const r = i + j * 20;
                for (let t = 0; t < 5; t += 1) {
                    res.push(r - t * 20);
                }

                return res.reverse();
            }
        } else {
            break;
        }
    }

    // Kiểm tra hàng ngang
    chessNum = 1;
    TwoSideChecked = 0;
    for (let j = 1; j < 5; j += 1) {
        if ((i % 20) - j >= 0) {
            if (squares[i].value === squares[i - j].value) {
                chessNum += 1;
                if (chessNum === 5) {
                    if (
                        ((i % 20) - 5 < 0 ||
                            (squares[i - 5].value !== squares[i].value &&
                                squares[i - 5].value !== null)) &&
                        ((i % 20) + 1 >= 20 ||
                            (squares[i + 1].value !== squares[i].value &&
                                squares[i + 1].value !== null))
                    ) {
                        return null;
                    }
                    // Thắng lơi

                    const r = i;
                    for (let t = 0; t < 5; t += 1) {
                        res.push(r - t);
                    }

                    return res.reverse();
                }
            } else if (squares[i - j].value !== null) {
                TwoSideChecked += 1;
                break;
            } else {
                break;
            }
        } else {
            TwoSideChecked += 1;
            break;
        }
    }
    for (let j = 1; j < 5; j += 1) {
        if ((i % 20) + j < 20 && squares[i].value === squares[i + j].value) {
            chessNum += 1;
            if (chessNum === 5) {
                if (
                    (i % 20) + j + 1 >= 20 ||
                    (squares[i + j + 1].value !== squares[i].value &&
                        squares[i + j + 1].value !== null)
                ) {
                    if (TwoSideChecked === 1) {
                        return null;
                    }
                }

                // Thắng lơi

                const r = i + j;
                for (let t = 0; t < 5; t += 1) {
                    res.push(r - t);
                }

                return res.reverse();
            }
        } else {
            break;
        }
    }

    // Kiểm tra chéo trái
    chessNum = 1;
    TwoSideChecked = 0;
    for (let j = 1; j < 5; j += 1) {
        if ((i % 20) - j >= 0 && i - j - j * 20 >= 0) {
            if (squares[i].value === squares[i - j - j * 20].value) {
                chessNum += 1;
                if (chessNum === 5) {
                    if (
                        ((i % 20) - 5 < 0 ||
                            i - 5 * 20 < 0 ||
                            (squares[i - 5 - 5 * 20].value !== squares[i].value &&
                                squares[i - 5 - 5 * 20].value !== null)) &&
                        ((i % 20) + 1 >= 20 ||
                            i + 20 >= 400 ||
                            (squares[i + 1 + 20].value !== squares[i].value &&
                                squares[i + 1 + 20].value !== null))
                    ) {
                        return null;
                    }

                    // Thắng lơi

                    const r = i;
                    for (let t = 0; t < 5; t += 1) {
                        res.push(r - t - t * 20);
                    }

                    return res.reverse();
                }
            } else if (squares[i - j - j * 20].value !== null) {
                TwoSideChecked += 1;
                break;
            } else {
                break;
            }
        } else {
            TwoSideChecked += 1;
            break;
        }
    }
    for (let j = 1; j < 5; j += 1) {
        if (
            (i % 20) + j < 20 &&
            i + j + j * 20 < 400 &&
            squares[i].value === squares[i + j + j * 20].value
        ) {
            chessNum += 1;
            if (chessNum === 5) {
                if (
                    (i % 20) + j + 1 >= 20 ||
                    i + (j + 1) * 20 >= 400 ||
                    (squares[i + j + 1 + (j + 1) * 20].value !== squares[i].value &&
                        squares[i + j + 1 + (j + 1) * 20].value !== null)
                ) {
                    if (TwoSideChecked === 1) {
                        return null;
                    }
                }

                // Thắng lơi

                const r = i + j + j * 20;
                for (let t = 0; t < 5; t += 1) {
                    res.push(r - t - t * 20);
                }

                return res.reverse();
            }
        } else {
            break;
        }
    }

    // Kiểm tra chéo phải
    chessNum = 1;
    TwoSideChecked = 0;
    for (let j = 1; j < 5; j += 1) {
        if ((i % 20) + j < 20 && i + j - j * 20 >= 0) {
            if (squares[i].value === squares[i + j - j * 20].value) {
                chessNum += 1;
                if (chessNum === 5) {
                    if (
                        ((i % 20) + 5 >= 20 ||
                            i - 5 * 20 < 0 ||
                            (squares[i + 5 - 5 * 20].value !== squares[i].value &&
                                squares[i + 5 - 5 * 20].value !== null)) &&
                        ((i % 20) - 1 < 0 ||
                            i + 20 >= 400 ||
                            (squares[i - 1 + 20].value !== squares[i].value &&
                                squares[i - 1 + 20].value !== null))
                    ) {
                        return null;
                    }

                    // Thắng lơi

                    const r = i;
                    for (let t = 0; t < 5; t += 1) {
                        res.push(r + t - t * 20);
                    }

                    return res.reverse();
                }
            } else if (squares[i + j - j * 20].value !== null) {
                TwoSideChecked += 1;
                break;
            } else {
                break;
            }
        } else {
            TwoSideChecked += 1;
            break;
        }
    }
    for (let j = 1; j < 5; j += 1) {
        if (
            (i % 20) - j >= 0 &&
            i - j + j * 20 < 400 &&
            squares[i].value === squares[i - j + j * 20].value
        ) {
            chessNum += 1;
            if (chessNum === 5) {
                if (
                    (i % 20) - j - 1 < 0 ||
                    i + (j + 1) * 20 >= 400 ||
                    (squares[i - (j + 1) + (j + 1) * 20].value !== squares[i].value &&
                        squares[i - (j + 1) + (j + 1) * 20].value !== null)
                ) {
                    if (TwoSideChecked === 1) {
                        return null;
                    }
                }

                // Thắng lơi

                const r = i - j + j * 20;
                for (let t = 0; t < 5; t += 1) {
                    res.push(r + t - t * 20);
                }

                return res.reverse();
            }
        } else {
            break;
        }
    }
    return null;
}

function PlaygroundReducer(state = initState, action) {
    switch (action.type) {        
        case TOGGLE_SORT:
            {
                if (action.isASC) {
                    return { ...state, isASC: false };
                }
                else {
                    return { ...state, isASC: true };
                }
            }
        // Bot mode
        case RESTART:
            {
                return {
                    ...state,
                    squares: Array(400).fill({
                        value: null,
                        class: 'square square-normal'
                    }),
                    historyMove: [
                        {
                            step: 0,
                            winnerMove: [],
                            index: null,
                            currentMove: null,
                            squares: Array(400).fill({
                                value: null,
                                class: 'square square-normal'
                            })
                        }
                    ],
                    winnerMove: [],
                    selectedStep: 0,
                    currentMove: null,
                    turnP1: true,
                    isASC: false,
                    isOver: 0,
                    isP1Win: false
                };
            }
        case MOVE_BOTMODE:
            {
                let { squares, historyMove, selectedStep, currentMove, turnP1, isOver, winnerMove, isP1Win } = state;

                let index = action.pos;

                if (isOver === 0) {
                    // Kiểm tra kết thúc ván đấu
                    if (squares[index].value === null) {
                        // Kiểm tra xem đã đánh chưa
                        const cloneSquares = squares.slice();
                        const history = historyMove.slice(0, selectedStep + 1);
                        const { length } = history;

                        if (turnP1) {
                            cloneSquares[currentMove] = {
                                value: 'O',
                                class: 'square square-normal'
                            };
                            cloneSquares[index] = {
                                value: 'X',
                                class: 'square square-current'
                            };
                        } else {
                            cloneSquares[currentMove] = {
                                value: 'X',
                                class: 'square square-normal'
                            };
                            cloneSquares[index] = {
                                value: 'O',
                                class: 'square square-current'
                            };
                        }

                        // Cập nhật lịch sử
                        history.push({
                            step: length,
                            winnerMove: [],
                            index,
                            currentMove: index,
                            squares: cloneSquares
                        });

                        historyMove = history;
                        selectedStep = length;
                        squares = cloneSquares;
                        currentMove = index; // Cập nhật lại nước đ;
                        turnP1 = !turnP1;

                        const res = winnerCondition(cloneSquares, index);
                        if (res !== null) {
                            history[length].winnerMove = res;
                            if (turnP1) {
                                winnerMove = res;
                                historyMove = history;
                                isOver = 1;
                                isP1Win = false;
                            } else {
                                winnerMove = res;
                                historyMove = history;
                                isOver = 1;
                                isP1Win = true;
                            }
                        } else if (historyMove.length - 1 === 400) {
                            isOver = 2;
                        } else {
                            // do nothing
                        }
                    }
                }

                return {
                    ...state,
                    squares,
                    historyMove,
                    selectedStep,
                    currentMove,
                    turnP1,
                    isOver,
                    winnerMove,
                    isP1Win
                };
            }
        case BACK_TO_HISTORY:
            {
                return {
                    ...state, winnerMove: action.stepState.winnerMove,
                    selectedStep: action.stepState.step,
                    squares: action.stepState.squares,
                    currentMove: action.stepState.currentMove,
                    isOver:
                        action.stepState.winnerMove.length === 5
                            ? 1
                            : action.stepState.step === 400
                                ? 2
                                : 0,
                    turnP1: action.stepState.step % 2 === 0
                };
            }  
        // PVP mode
        case TOGGLE_CHAT_BOX:
            {
                if (action.isChatBoxOpen) {
                    return { ...state, isChatBoxOpen: false };
                }
                else {
                    return { ...state, isChatBoxOpen: true };
                }
            }      
        default:
            {
                return state;
            }
    }
}

export default PlaygroundReducer;