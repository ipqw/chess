import { Cell } from "./Cell";

export class Board {
    cells: Cell[][] = []

    public initCells = () => {
        for (let i = 0; i < 8; i++) {
            const row: Cell[] = [] 
            for (let z = 0; z < 8; z++) {
                if((i+z) % 2 !== 0) {
                    row.push(new Cell()) // Черные
                }
                else{
                    row.push(new Cell()) // Белые
                }
            }
        }
    }
}