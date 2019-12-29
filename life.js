(function() {

    _ = self.Life = function(seed) {
        this.seed = seed;
        this.height = seed.length;
        this.width = seed[0].length;
        this.board = cloneArray(seed);
        this.prevBoard = [];
    };

    _.prototype = {
        next: function() {
            this.prevBoard = cloneArray(this.board);

            for (let i = 0; i < this.height; i++) {
                for (let j = 0;j < this.width; j++) {
                    this.board[i][j] = this.liveCheck(this.aliveNeighours(this.prevBoard, i, j), this.board[i][j]); 
                }
            }
        },
        aliveNeighoursAlternate: function(board, x, y) {
            let count = 0;
            for (let i= x - 1; i<= x + 1; i++) {
                if (board[i]) {
                    for (let j = y - 1; j <= y + 1; j++ ){
                        if (board[i][j] && !(i === x && j === y) )
                            count++;
                    }
                } 
            }
            return count;
        },

        aliveNeighours: function(board, x, y) {
            const prevRow = board[x - 1] || [];
            const nextRow = board[x + 1] || [];
            return [
                prevRow[y - 1], prevRow[y], prevRow[y + 1],
                board[x][y - 1], board[x][y + 1],
                nextRow[y - 1], nextRow[y], nextRow[y + 1]
             ].reduce(prev, cur => prev += +!!cur, 0);
        },
        liveCheck: function(aliveNeighours, cell) {
            if (cell) {
                if (cell && (aliveNeighours < 2 || aliveNeighours > 3))
                    return 0;
                else
                    return cell;
            } else {
                if (aliveNeighours === 3 )
                    return 1;
                else 
                    return cell;
            }
        },
        toString: function() {
            return this.board.map(item => item.join(' ')).join('\n');
        }
    }

    // Heplers

    // Clones 2D Array 
    function cloneArray(array) {
        return array.slice().map(item => item.slice());
    }

})();

var game = new Life([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
])

console.log(game + ' ' );

game.next();

console.log(game + ' ' );
