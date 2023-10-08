import { store } from "../store"
import { Board } from "./Board"
import { Colors } from "./Colors"
import { Figure, FigureNames } from "./Figures/Figure"

export class Cell{
    readonly x: number 
    readonly y: number 
    readonly color: Colors
    figure: Figure | null
    board: Board
    available: boolean //  Можно ли переместиться
    id: number // Для реакт ключей

    constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null){
        this.x = x
        this.y = y
        this.color = color
        this.figure = figure
        this.board = board
        this.available = false
        this.id = Math.random()
    }
    isEmpty(): boolean{
        return this.figure === null ? true : false
    }

    public moveFigure(target: Cell){
        if(this.figure?.canMove(target)){
            store.setPreviousFigure(this.figure)
            this.figure?.moveFigure(target)
            
            // проверка двойного хода пешки
            if(this.figure.name === FigureNames.PAWN){
                this.figure.color === Colors.WHITE 
                ? this.y - 2 === target.y ? store.setEnPassant(true) : store.setEnPassant(false)
                : this.y + 2 === target.y ? store.setEnPassant(true) : store.setEnPassant(false)
            }
            target.figure = this.figure
            this.figure = null
            store.setAttackedCells(target.figure.getAvalibleCells())
        }
    }
}