import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import whiteLogo from '../../../src/assets/wr.png'
import blackLogo from '../../../src/assets/br.png'
import { store } from "../../store";

export class Rook extends Figure {
    constructor(color: Colors, cell: Cell){
        super(color, cell)
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo
        this.name = FigureNames.ROOK
    }
    getAvalibleCells(): Cell[] {
        const availableCells: Cell[] = []
        let x = this.cell.x+1
        let y = this.cell.y
        let isFigureExist = false
        while (x < 8 && !isFigureExist) {
            if(store.board.getCell(y, x).figure){
                isFigureExist = true 
                availableCells.push(store.board.getCell(y, x))
            }
            else{
                availableCells.push(store.board.getCell(y, x))
            }
            x++
        }

        x = this.cell.x - 1; y = this.cell.y; isFigureExist = false
        while (x >= 0 && !isFigureExist) {
            if(store.board.getCell(y, x).figure){
                isFigureExist = true 
                availableCells.push(store.board.getCell(y, x))
            }
            else{
                availableCells.push(store.board.getCell(y, x))
            }
            x--
        }

        x = this.cell.x; y = this.cell.y+1; isFigureExist = false
        while (y < 8 && !isFigureExist) {
            if(store.board.getCell(y, x).figure){
                isFigureExist = true 
                availableCells.push(store.board.getCell(y, x))
            }
            else{
                availableCells.push(store.board.getCell(y, x))
            }
            y++
        }

        x = this.cell.x; y = this.cell.y-1; isFigureExist = false
        while (y >= 0 && !isFigureExist) {  
            if(store.board.getCell(y, x).figure){
                isFigureExist = true 
                availableCells.push(store.board.getCell(y, x))
            }
            else{
                availableCells.push(store.board.getCell(y, x))
            }
            y--
        }
        return availableCells
    }
}