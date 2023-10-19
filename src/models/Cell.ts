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

            // рокировка
            // черные
            if(this.figure.name === FigureNames.KING && target === store.board.getCell(0, 6) && this.figure.moveCounter === 0){
                store.board.getCell(0, 7).figure?.moveWithoutChangeTurn(store.board.getCell(0, 5))
                store.board.getCell(0, 5).figure = store.board.getCell(0, 7).figure
                store.board.getCell(0, 7).figure = null
            }
            if(this.figure.name === FigureNames.KING && target === store.board.getCell(0, 2) && this.figure.moveCounter === 0){
                store.board.getCell(0, 0).figure?.moveWithoutChangeTurn(store.board.getCell(0, 3))
                store.board.getCell(0, 3).figure = store.board.getCell(0, 0).figure
                store.board.getCell(0, 0).figure = null
            }
            // белые
            if(this.figure.name === FigureNames.KING && target === store.board.getCell(7, 6) && this.figure.moveCounter === 0){
                store.board.getCell(7, 7).figure?.moveWithoutChangeTurn(store.board.getCell(7, 5))
                store.board.getCell(7, 5).figure = store.board.getCell(7, 7).figure
                store.board.getCell(7, 7).figure = null
            }
            if(this.figure.name === FigureNames.KING && target === store.board.getCell(7, 2) && this.figure.moveCounter === 0){
                store.board.getCell(7, 0).figure?.moveWithoutChangeTurn(store.board.getCell(7, 3))
                store.board.getCell(7, 3).figure = store.board.getCell(7, 0).figure
                store.board.getCell(7, 0).figure = null
            }

            // взятие на проходе

            if(this.figure.color === Colors.WHITE){
                if(this.figure.name === FigureNames.PAWN && store.enPassant && !target.figure){
                    store.board.getCell(target.y+1, target.x).figure?.deleteFigure()
                }
            }
            else{
                if(this.figure.name === FigureNames.PAWN && store.enPassant && !target.figure){
                    store.board.getCell(target.y-1, target.x).figure?.deleteFigure()
                }
            }
            
            // проверка двойного хода пешки
            if(this.figure.name === FigureNames.PAWN){
                this.figure.color === Colors.WHITE 
                ? this.y - 2 === target.y ? store.setEnPassant(true) : store.setEnPassant(false)
                : this.y + 2 === target.y ? store.setEnPassant(true) : store.setEnPassant(false)
            }

            this.figure.moveCounter++

            target.figure = this.figure
            this.figure = null
            store.setAttackedCells(target.figure.getAvalibleCells())
            store.increaseMoveCounter()
        }
    }
}