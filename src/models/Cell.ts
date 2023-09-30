import { Board } from "./Board"
import { Colors } from "./Colors"
import { Figure } from "./Figures/Figure"

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
            this.figure?.moveFigure(target)
            target.figure = this.figure
            this.figure = null
        }
    }
}