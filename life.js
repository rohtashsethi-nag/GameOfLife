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

        },
        toString: function() {
            return this.board.map(item => item.join(' ')).join('\n');
        }
    }

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

    // Heplers

    // Clones 2D Array 
    function cloneArray(array) {
        return array.slice().map(item => item.slice());
    }

})();