var numNeighbors = function (x, y, arr) {
    var totalLivingNeighbors = 0;
    if (x - 1 >= 0) {
        if (y - 1 >= 0) {
            if (arr[x - 1][y - 1]) {
                totalLivingNeighbors++;
            }
        }
        if (arr[x - 1][y]) {
            totalLivingNeighbors++;
        }
        if (y + 1 < arr[0].length) {
            if(arr[x - 1][y + 1]) {
                totalLivingNeighbors++;
            }
        }
    }
    if (y - 1 >= 0) {
        if (arr[x][y - 1]) {
            totalLivingNeighbors++;
        }
    }
    if (y + 1 < arr[0].length) {
        if(arr[x][y + 1]) {
            totalLivingNeighbors++;
        }
    }
    if (x + 1 < arr.length) {
        if (y - 1 >= 0) {
            if (arr[x + 1][y - 1]) {
                totalLivingNeighbors++;
            }
        }
        if (arr[x + 1][y]) {
            totalLivingNeighbors++;
        }
        if (y + 1 < arr[0].length) {
            if(arr[x + 1][y + 1]) {
                totalLivingNeighbors++;
            }
        }
    }
    console.log(totalLivingNeighbors, arr)
    return totalLivingNeighbors;
}

console.assert(numNeighbors(0, 0, [[true, true], [false, false]]) === 1, "First organism has one living neighbor.");
console.assert(numNeighbors(0, 0, [[true, true], [true, false]]) === 2, "First organism has two living neighbors.");
console.assert(numNeighbors(1, 1, [[true, true, true], [true, false, true], [true, true, true]]) === 8, "Target organism has 8 living neighbors.");
console.assert(numNeighbors(1, 1, [[true, true], [true, false]]) === 3, "Target organism has three living neighbors.");


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

console.assert(liveOrDie(2, true) === true, "If the current target has two living neighbors and is alive, it should return true");
console.assert(liveOrDie(3, false) === true, "If the current target has three living neighbors and is dead, it should spawn and return true");console.assert(liveOrDie(4, true) === false, "If the current target has four living neighbors and is alive, it should return false due to overpopulation");

console.assert(_.isEqual(updateBoard(0,0, true, [[false, false], [true, true]]), [[true, false], [true, true]]), "This should change the point to true.");