import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import whiteLogo from '../../../src/assets/wn.png'
import blackLogo from '../../../src/assets/bn.png'
import { store } from "../../store";

export class Knight extends Figure {
    constructor(color: Colors, cell: Cell){
        super(color, cell)
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo
        this.name = FigureNames.KNIGHT
    }
    getAvalibleCells(): Cell[] {
        const availableCells: Cell[] = []
        this.cell.y-1 > 0 && this.cell.x-2 > 0 ? availableCells.push(store.board.getCell(this.cell.y-1, this.cell.x-2)) : ''

        this.cell.y+1 < 8 && this.cell.x-2 > 0 ? availableCells.push(store.board.getCell(this.cell.y+1, this.cell.x-2)) : ''

        this.cell.y-1 > 0 && this.cell.x+2 < 8 ? availableCells.push(store.board.getCell(this.cell.y-1, this.cell.x+2)) : ''

        this.cell.y+1 < 8 && this.cell.x+2 < 8 ? availableCells.push(store.board.getCell(this.cell.y+1, this.cell.x+2)) : ''

        this.cell.y-2 > 0 && this.cell.x-1 > 0 ? availableCells.push(store.board.getCell(this.cell.y-2, this.cell.x-1)) : ''

        this.cell.y-2 > 0 && this.cell.x+1 < 8 ? availableCells.push(store.board.getCell(this.cell.y-2, this.cell.x+1)) : ''

        this.cell.y+2 < 8 && this.cell.x-1 > 0 ? availableCells.push(store.board.getCell(this.cell.y+2, this.cell.x-1)) : ''

        this.cell.y+2 < 8 && this.cell.x+1 < 8 ? availableCells.push(store.board.getCell(this.cell.y+2, this.cell.x+1)) : ''

        
        return availableCells
    }
    
}