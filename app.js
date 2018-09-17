var numNeighbors = function (x, y, arr) {
    var totalLivingNeighbors = 0;
    var offsets = [-1, 0, 1];
    offsets.forEach(xOffset => {
        offsets.forEach(yOffset => {
            if (!(yOffset === 0 && xOffset === 0) &&
            (arr[x + xOffset] || [])[y + yOffset]) {
                totalLivingNeighbors++;
            }
        })
    })
    return totalLivingNeighbors;
}

// console.assert(numNeighbors(0, 0, [[true, true], [false, false]]) === 1, "First organism has one living neighbor.");
// console.assert(numNeighbors(0, 0, [[true, true], [true, false]]) === 2, "First organism has two living neighbors.");
// console.assert(numNeighbors(1, 1, [[true, true, true], [true, false, true], [true, true, true]]) === 8, "Target organism has 8 living neighbors.");
// console.assert(numNeighbors(1, 1, [[true, true], [true, false]]) === 3, "Target organism has three living neighbors.");


var liveOrDie = function (numberOfLivingNeighbors, currentVitality) {
    return numberOfLivingNeighbors === 3 || 
        (currentVitality && numberOfLivingNeighbors === 2);
};

var updateBoard = function (x, y, liveOrDie, newBoard) {
    if (!newBoard[x]) {
        newBoard.push([]);
    }
    newBoard[x][y] = liveOrDie;
    return newBoard;
};

// var game = function (arr) {
//     console.log(arr);
//     var newBoard = [];
//     for (var x = 0; x < arr.length; x++) {
//         for (var y = 0; y < arr[0].length; y++) {
//             var currentVitality = arr[x][y]
//             var numberOfLivingNeighbors = numNeighbors(x, y, arr)
//             var newVitality = liveOrDie(numberOfLivingNeighbors, currentVitality)
//             updateBoard(x, y, newVitality, newBoard);
//         }
//     }
//     console.log(newBoard);
//     // return newBoard;
// };

var game = function(arr) {
    // console.log(arr);
    var newArr = arr.map(function(row, y) {
        return row.map(function(currentVitality, x){
            var numberOfLivingNeighbors = numNeighbors(y, x, arr);
            return liveOrDie(numberOfLivingNeighbors, currentVitality);
        });
    });
    // console.log(newArr);
    return newArr;
}

// console.assert(liveOrDie(2, true) === true, "If the current target has two living neighbors and is alive, it should return true");
// console.assert(liveOrDie(3, false) === true, "If the current target has three living neighbors and is dead, it should spawn and return true");console.assert(liveOrDie(4, true) === false, "If the current target has four living neighbors and is alive, it should return false due to overpopulation");

// console.assert(_.isEqual(updateBoard(0,0, true, [[false, false], [true, true]]), [[true, false], [true, true]]), "This should change the point to true.");

var arr1 = [[false, false, false, false], [false, true, true, false], [false, true, true, false], [false, false, false, false]];

var arr2 = [[false, false, false, false, false], 
[false, false, false, false, false], 
[false, true, true, true, false], 
[false, false, false, false, false], 
[false, false, false, false, false]];

var arr3 = [[false, false, false, false, false], 
[false, false, true, false, false], 
[false, false, true, false, false], 
[false, false, true, false, false], 
[false, false, false, false, false]];

var arr4 = [[false, false, false, false, false, false, false, false, false, false], 
[false, false, false, false, false, false, false, false, false, false],
[false, false, false, false, false, false, false, false, false, false],
[false, false, false, false, false, false, false, false, false, false],
[false, false, false, false, false, false, false, false, false, false],
[false, false, false, false, false, false, false, false, false, false],
[false, false, false, false, false, false, false, false, false, false],
[false, false, false, false, false, false, false, false, false, false],
[false, false, false, false, false, false, false, false, false, false],
[false, false, false, false, false, false, false, false, false, false]];

let setBoard = (rows, columns) => {

}

// console.assert(game(arr1) === arr1, "The board should not change.");

// console.assert(_.isEqual(game(arr2) === arr3), "The current alive target row should rotate.");

game(arr2);

let CtrlButtons = props => (
    <div>
        <button onClick={
            props.updateBoard
        }>Next</button>
        <button onClick={
            props.playBoard
        }>Play / Pause</button>
    </div>
)

let Cell = props => (
    <div 
        className={"cell " + (props.cell ? 'cell-alive' : 'cell-dead')}
        onClick={() => {
                    props.switchCell(props.iRow, props.iColumn);
                }
            }
    >
    </div>
)
// {props.cell ? 'o' : 'x'}

let Row = props => (
    <div className="row">{props.row.map((cell, index) => 
        <Cell cell={cell} iRow={props.iRow} iColumn={index} switchCell={props.switchCell} /> 
    )}
    </div>
)

let Board = props => (
    <div>
        {
            props.board.map((row, index) => 
                <Row iRow={index} row={row} switchCell={props.switchCell}/>
        )}
    </div>
)

class Homepage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          board: arr4
      }
      this.updateBoard = this.updateBoard.bind(this);
      this.switchCell = this.switchCell.bind(this);
      this.playBoard = this.playBoard.bind(this);
    }
    updateBoard() {
        this.setState({
            board: game(this.state.board),
            playTimer: null
        })
    }
    playBoard() {
        if (!this.state.playTimer) {
            this.state.playTimer = setInterval(() => {
                this.setState({
                    board: game(this.state.board)
                })
            }, 200);
        } else {
            clearInterval(this.state.playTimer);
            this.state.playTimer = null;
        }
    }
    switchCell(iRow, iColumn) {
        console.log(iRow)
        console.log(iColumn)
        let newBoard = _.map(this.state.board, _.clone);
        newBoard[iRow][iColumn] = !newBoard[iRow][iColumn]
        this.setState({
            board: newBoard
        })
    }
    render() {
        return (
            <div className="container">
                <CtrlButtons updateBoard={this.updateBoard} playBoard={this.playBoard}/>
                <Board board={this.state.board} switchCell={this.switchCell}/>
            </div>
        )
    }
}

let render = () => {
    console.log('rendering');
    ReactDOM.render(
      <Homepage />, 
      document.querySelector('.app')
    );
  }
  render();