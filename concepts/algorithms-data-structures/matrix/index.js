// --- Directions
// Write a function that accepts an integer N
// and returns a NxN spiral matrix.
// --- Examples
//   matrix(2)
//     [[1, 2],
//     [4, 3]]
//   matrix(3)
//     [[1, 2, 3],
//     [8, 9, 4],
//     [7, 6, 5]]
//  matrix(4)
//     [[1,   2,  3, 4],
//     [12, 13, 14, 5],
//     [11, 16, 15, 6],
//     [10,  9,  8, 7]]

function matrix(n) {
    const newMatrix = []
    let spiralNum = 1
    let startCol = 0, startRow = 0
    let endCol = n - 1, endRow = n - 1

    for(let i = 0; i < n; i++) {
        newMatrix.push([]) // [ [], [], [], [] ] for n = 4
    }
    
    while (startCol <= endCol && startRow <= endRow) {
        // Top row loop
        for(let i = startCol; i <= endCol; i++) {
            newMatrix[startRow][i] = spiralNum
            spiralNum++
        }
        startRow++

        // Right column loop
        for(let i = startRow; i <= endRow; i++) {
            newMatrix[i][endCol] = spiralNum
            spiralNum++
        }
        endCol--

        // Bottom row loop
        for(let i = endCol; i >= startCol; i--) {
            newMatrix[endRow][i] = spiralNum
            spiralNum++
        }
        endRow--

        // Left column loop
        for(let i = endRow; i >= startRow; i--) {
            newMatrix[i][startCol] = spiralNum
            spiralNum++
        }
        startCol++
    }

    return newMatrix
}

module.exports = matrix;
