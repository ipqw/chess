import { toJS } from "mobx"
import { store } from "../store"
import { checkStore } from "../store/check"
import { Board } from "./Board"
import { Colors } from "./Colors"
import { Figure, FigureNames } from "./Figures/Figure"
import { Queen } from "./Figures/Queen"

export class Cell{
    readonly x: number
    readonly y: number
    readonly color: Colors
    figure: Figure | null
    board: Board
    available: boolean //  Можно ли переместиться
    id: number // Для реакт ключей
    isAttacked: boolean = false

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
        if(this.figure?.canMove(target)) {
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

            // превращение пешки
            if(this.figure.name === FigureNames.PAWN && this.figure.color === Colors.WHITE && this.figure.cell.y === 0){
                target.figure = new Queen(Colors.WHITE, target)
            }
            if(this.figure.name === FigureNames.PAWN && this.figure.color === Colors.BLACK && this.figure.cell.y === 7){
                target.figure = new Queen(Colors.BLACK, target)
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
            
            this.figure.color === Colors.WHITE 
            ? this.figure.name === FigureNames.PAWN  && this.figure.cell.y === 0 ? '' : target.figure = this.figure
            : this.figure.name === FigureNames.PAWN  && this.figure.cell.y === 7 ? '' : target.figure = this.figure
            this.figure = null
            store.increaseMoveCounter()
            store.checkAttackedCellsByWhite()
            store.checkAttackedCellsByBlack()
            // проверка шаха
            
            store.attackedCellsByBlack.find((el: Cell) => {return el.figure?.name === FigureNames.KING && el.figure.color === Colors.WHITE}) ? (checkStore.setIsCheckWhite(true), checkStore.increaseCheckCounterWhite()) : (checkStore.setIsCheckWhite(false), checkStore.resetCheckCounterWhite())
            store.attackedCellsByWhite.find((el: Cell) => {return el.figure?.name === FigureNames.KING && el.figure.color === Colors.BLACK}) ? (checkStore.setIsCheckBlack(true), checkStore.increaseCheckCounterBlack()) : (checkStore.setIsCheckBlack(false), checkStore.resetCheckCounterBlack())
            
            if(store.turn === store.previousFigure?.color && store.previousFigure.color === Colors.WHITE ? checkStore.checkCounterWhite === 1 : checkStore.checkCounterBlack === 1){
                this.figure = store.previousFigure
                target.figure = checkStore.eatenFigure
                this.figure?.moveFigure(this)
                store.previousFigure?.color === Colors.WHITE ? checkStore.resetCheckCounterWhite() : checkStore.resetCheckCounterBlack()
                return
            }
            if(checkStore.checkCounterBlack >= 2 || checkStore.checkCounterWhite >= 2){
                this.figure = store.previousFigure
                target.figure = checkStore.eatenFigure
                this.figure?.moveFigure(this)
                return
            }
            
            store.turn === Colors.WHITE ? checkStore.isCheckWhite ? '' : (store.changeTurn(), store.setPreviousFigureEnPassant(store.previousFigure)) : checkStore.isCheckBlack ? '' : (store.changeTurn(), store.setPreviousFigureEnPassant(store.previousFigure))
            
        }
    }
}