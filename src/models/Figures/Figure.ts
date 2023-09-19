import logo from '../../../src/assets/bk.png'
import { Colors } from '../Colors'
import { Cell } from '../Cell'

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

    canMove(target: Cell){
        return true
    }

    moveFigure(target: Cell){
        
    }
}