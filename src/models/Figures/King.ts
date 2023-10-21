import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import whiteLogo from '../../../src/assets/wk.png'
import blackLogo from '../../../src/assets/bk.png'
import { store } from "../../store";
import { checkStore } from "../../store/check";

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

        // рокировка
        if(this.color === Colors.WHITE){
            if(store.board.getCell(7, 0).figure?.name === FigureNames.ROOK && store.board.getCell(7, 0).figure?.moveCounter === 0 && this.moveCounter === 0 
            && store.board.getCell(7, 1).figure === null && store.board.getCell(7, 2).figure === null && store.board.getCell(7, 3).figure === null && !checkStore.isCheckBlack 
            && !checkStore.isCheckWhite && !store.attackedCellsByBlack.includes(store.board.getCell(7, 1)) && !store.attackedCellsByBlack.includes(store.board.getCell(7, 2)) 
            && !store.attackedCellsByBlack.includes(store.board.getCell(7, 3))){
                availableCells.push(store.board.getCell(7, 2))
            }
            if(store.board.getCell(7, 7).figure?.name === FigureNames.ROOK && store.board.getCell(7, 7).figure?.moveCounter === 0 && this.moveCounter === 0 
            && store.board.getCell(7, 5).figure === null && store.board.getCell(7, 6).figure === null && !checkStore.isCheckBlack && !checkStore.isCheckWhite 
            && !store.attackedCellsByBlack.includes(store.board.getCell(7, 5)) && !store.attackedCellsByBlack.includes(store.board.getCell(7, 6))){
                availableCells.push(store.board.getCell(7, 6))
            }
        }
        else{
            if(store.board.getCell(0, 0).figure?.name === FigureNames.ROOK && store.board.getCell(0, 0).figure?.moveCounter === 0 && this.moveCounter === 0 
            && store.board.getCell(0, 1).figure === null && store.board.getCell(0, 2).figure === null && store.board.getCell(0, 3).figure === null && !checkStore.isCheckBlack 
            && !checkStore.isCheckWhite && !store.attackedCellsByWhite.includes(store.board.getCell(0, 1)) && !store.attackedCellsByWhite.includes(store.board.getCell(0, 2)) 
            && !store.attackedCellsByWhite.includes(store.board.getCell(0, 3))){
                availableCells.push(store.board.getCell(0, 2))
            }
            if(store.board.getCell(0, 7).figure?.name === FigureNames.ROOK && store.board.getCell(0, 7).figure?.moveCounter === 0 && this.moveCounter === 0 
            && store.board.getCell(0, 5).figure === null && store.board.getCell(0, 6).figure === null && !checkStore.isCheckBlack && !checkStore.isCheckWhite 
            && !store.attackedCellsByWhite.includes(store.board.getCell(0, 5)) && !store.attackedCellsByWhite.includes(store.board.getCell(0, 6))){
                availableCells.push(store.board.getCell(0, 6))
            }
        }
        
        return availableCells
    }
}