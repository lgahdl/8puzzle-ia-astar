import startPrompt from 'prompt-sync';
import { shuffleArray } from './utils';
import { PuzzleBoard } from './PuzzleBoard';

const startPuzzle = () => {
    console.log("Started");
    const prompt = startPrompt();
    const mode: string = prompt(`
    Welcome to the 8-puzzle solver, type 1 or 2 to select the mode and press Enter: \n 
    1 - Random (Automatically builds the initial state) \n 
    2 - User Input (You will need to input the initial state \n
        \n
        Mode: `
    )
    const possibleValues = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let puzzleBoard;
    if (mode === '1') {
        puzzleBoard = new PuzzleBoard(shuffleArray(possibleValues));
    } else if (mode === '2') {
        let userInputValues: number[] = [];
        for (let i = 0; i < 9; i++) {
            const userInputNumber: string = prompt(`Type a number between 0 and 8 for position ${i + 1}${userInputValues.length > 0 ? ` (Selected: ${userInputValues.join(", ")})` : ''}: `
            )
            if (!possibleValues.includes(parseInt(userInputNumber))) {
                console.log("invalid number");
                i--;
                continue;
            }
            if (userInputValues.includes(parseInt(userInputNumber))) {
                console.log("repeated number");
                i--;
                continue;
            }
            userInputValues.push(parseInt(userInputNumber));
        }
        puzzleBoard = new PuzzleBoard(userInputValues);
    }
    console.time('Puzzle');
    // Start IA Logic
    console.timeEnd('Puzzle');
}

startPuzzle();