var liveOrDie = function (numberOfLivingNeighbors, currentVitality) {
    if (numberOfLivingNeighbors === 3 || (currentVitality === true && numberOfLivingNeighbors === 2)) {
        return true;
   } else {
       return false;
   }
};

var updateBoard = function (x, y, liveOrDie, arr) {
    arr[x][y] = liveOrDie;
    return arr;
};

console.assert(liveOrDie(2, true) === true, "If the current target has two neighbors and is alive, it should return true");

console.assert(_.isEqual(updateBoard(0,0, true, [[false, false], [true, true]]), [[true, false], [true, true]]), "This should change the point to true.");