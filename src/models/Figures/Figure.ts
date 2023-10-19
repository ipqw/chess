import logo from '../../../src/assets/bk.png'
import { Colors } from '../Colors'
import { Cell } from '../Cell'
import { store } from '../../store'

export enum FigureNames {
    FIGURE = 'Фигура',
    ROOK = 'Ладья',
    BISHOP = 'Слон',
    KING = 'Король',
    KNIGHT = 'Конь',
    QUEEN = 'Ферзь',
    PAWN = 'Пешка'
}

export class Figure{
    public moveCounter = 0
    color: Colors
    logo: typeof logo | null
    cell: Cell
    name: FigureNames
    id: number

    constructor(color: Colors, cell: Cell){
        this.color = color
        this.logo = null
        this.cell = cell
        this.name = FigureNames.FIGURE
        this.id = Math.random()
    }

    getAvalibleCells(): Cell[]{
        return [store.board.getCell(this.cell.x, this.cell.y)]
    }
    moveWithoutChangeTurn(target: Cell){
        this.cell = target
    }

    moveFigure(target: Cell){
        store.turn === Colors.WHITE ? store.changeTurn() : store.changeTurn()        
        this.cell = target
    }
    
    canMove(target: Cell): boolean {
        store.setSelectedCell(null)
        store.resetAvalibleCells()
        if(!this.getAvalibleCells().includes(target) || target.figure?.color === this.color || store.turn !== this.color){
            return false
        }
        
        return true
    }

    deleteFigure(){
        this.cell.figure = null
    }
}