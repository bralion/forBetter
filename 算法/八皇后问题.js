//八皇后问题
const chessBoard = (size =8)=>{
    return Array(size).fill(Array(size).fill(0));
};
console.log(chessBoard(8));
