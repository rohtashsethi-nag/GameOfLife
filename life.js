(function() {

    _ = self.Life = function(seed) {
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
             ].reduce((prev, cur) => prev += +!!cur, 0);
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

(function() {

    _ = self.LifeView = function(table, size) {
        this.grid = table;
        this.size = size;
        this.checkboxes = [];
        this.createGrid();
    }

    _.prototype = {
        createGrid: function() {
            let fragment = document.createDocumentFragment();
            for (let i = 0; i < this.size; i++) {
                let $tr = document.createElement('tr');
                this.checkboxes[i] = [];
                for (let j = 0; j < this.size; j++) {
                    $td = document.createElement('td');
                    $checkbox = document.createElement('input');
                    $checkbox.type = 'checkbox';
                    this.checkboxes[i][j] = $checkbox;
                    $td.appendChild($checkbox);
                    $tr.appendChild($td);
                }
                fragment.appendChild($tr);
            }
            this.grid.appendChild(fragment);
        },
        get board() {
            return this.checkboxes.map(row => row.map(checkbox => +checkbox.checked));
        },
        set board(board) {
            this.checkboxes.forEach((row, i) => row.forEach((checkbox, j) => checkbox.checked = board[i][j]));
        },
        play() {
            this.game = new Life(this.board);
        },
        next() {
            this.game.next();
            this.board = this.game.board;
        }
    }
})();

var lifeView = new LifeView(document.getElementById('grid'), 12);