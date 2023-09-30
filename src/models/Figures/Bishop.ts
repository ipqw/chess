import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import whiteLogo from '../../../src/assets/wb.png'
import blackLogo from '../../../src/assets/bb.png'
import { store } from "../../store";

export class Bishop extends Figure {
    constructor(color: Colors, cell: Cell){
        super(color, cell)
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo
        this.name = FigureNames.BISHOP
    }
    

    getAvalibleCells(): Cell[]{
        const availableCells: Cell[] = []

        let x = this.cell.x+1
        let y = this.cell.y+1
        let isFigureExist = false
        while (x < 8 && y < 8 && !isFigureExist) {
            if(store.board.getCell(y, x).figure){
                isFigureExist = true 
                availableCells.push(store.board.getCell(y, x))
            }
            else{
                availableCells.push(store.board.getCell(y, x))
            }
            x++; y++
        }

        x = this.cell.x-1; y = this.cell.y-1; isFigureExist = false
        while (x >= 0 && y >= 0 && !isFigureExist) {
            if(store.board.getCell(y, x).figure){
                isFigureExist = true 
                availableCells.push(store.board.getCell(y, x))
            }
            else{
                availableCells.push(store.board.getCell(y, x))
            }
            x--; y--
        }

        x = this.cell.x+1; y = this.cell.y-1; isFigureExist = false
        while (x < 8 && y >= 0 && !isFigureExist) {
            if(store.board.getCell(y, x).figure){
                isFigureExist = true 
                availableCells.push(store.board.getCell(y, x))
            }
            else{
                availableCells.push(store.board.getCell(y, x))
            }
            x++; y--
        }

        x = this.cell.x-1; y = this.cell.y+1; isFigureExist = false
        while (x >= 0 && y < 8 && !isFigureExist) {  
            if(store.board.getCell(y, x).figure){
                isFigureExist = true 
                availableCells.push(store.board.getCell(y, x))
            }
            else{
                availableCells.push(store.board.getCell(y, x))
            }
            x--; y++
        }

        return availableCells
    }
}