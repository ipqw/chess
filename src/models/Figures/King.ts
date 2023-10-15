import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import whiteLogo from '../../../src/assets/wk.png'
import blackLogo from '../../../src/assets/bk.png'
import { store } from "../../store";

export class King extends Figure {
    constructor(color: Colors, cell: Cell){
        super(color, cell)
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo
        this.name = FigureNames.KING
    }
    getAvalibleCells(): Cell[] {
        const availableCells: Cell[] = []
        let x = this.cell.x
        let y = this.cell.y
        
        x-1 >= 0 ? availableCells.push(store.board.getCell(y, x-1)) : ''
        x+1 < 8 ? availableCells.push(store.board.getCell(y, x+1)) : ''
        y-1 >= 0 ? availableCells.push(store.board.getCell(y-1, x)) : ''
        y+1 < 8 ? availableCells.push(store.board.getCell(y+1, x)) : ''

        x-1 >= 0 && y-1 >= 0 ? availableCells.push(store.board.getCell(y-1, x-1)) : ''
        x+1 < 8 && y-1 >= 0 ? availableCells.push(store.board.getCell(y-1, x+1)) : ''
        x-1 >= 0 && y+1 < 8 ? availableCells.push(store.board.getCell(y+1, x-1)) : ''
        x+1 < 8 && y+1 < 8 ? availableCells.push(store.board.getCell(y+1, x+1)) : ''
        
        return availableCells
    }
}