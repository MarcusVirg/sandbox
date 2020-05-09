const minMoves = (n, startX, startY, endX, endY) => {
    moves = []
    let numMoves = 0 // total number of moves
    let coordChanges = 0 // number of coordinate changes
    let curX = startX
    let curY = startY

    for(let i = 0; i <= n; i++) {
        moves.push([]) // builds visited spots
    }

    for (let i = 1; i <= N; i++) 
        for (let j = 1; j <= N; j++) 
            moves[i][j] = false; // set all visited moves to false

    visit[startX][startY] = true // visit starting

    while(!visit) {
        if(visit[0]) {

        }
    }

    return numMoves
}

const checkBounds = (x, y, n) => {
    // check if the coordinate is inside the board
    return  x >= 0 && x <= n && y >= 0 && y <= n
}