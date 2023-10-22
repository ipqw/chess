import { makeAutoObservable } from 'mobx'
import { Board } from '../models/Board'
import { Colors } from '../models/Colors'
import { Cell } from '../models/Cell'
import { Figure, FigureNames } from '../models/Figures/Figure'
import { checkStore } from './check'

class Storage {
    constructor(){
        makeAutoObservable(this)
    }
    win: Colors | null = null
    _board: Board = new Board
    get board(){
        return this._board
    }
    restartBoard(){
        this._board = new Board
        this._board.initCells()
        this._board.addFigures()
    }
    

    _turn: Colors = Colors.WHITE
    get turn(){
        return this._turn
    }
    
    _selectedCell: Cell | null = null
    get selectedCell(){
        return this._selectedCell
    }
    setSelectedCell(cell: Cell | null){
        this._selectedCell = cell
    }
    resetAvalibleCells = () => {
        this.board.cells.map((el: Cell[]) => {
            el.map((cell: Cell) => {
                cell.available = false
            })
        })
        this.selectedCell?.figure?.getAvalibleCells().map((cell: Cell) => {
            cell.figure === null ? cell.available = true : cell.available = false
        })
    }
    // белые
    _attackedCellsByWhite: Cell[] = []
    get attackedCellsByWhite(): Cell[] {
        return this._attackedCellsByWhite
    }
    checkAttackedCellsByWhite = () => {
        this._attackedCellsByWhite = []
        this.board.cells.map((el: Cell[]) => {
            el.map((cell: Cell) => {
                cell.figure?.color === Colors.WHITE ? cell.figure?.getAvalibleCells().map((element: Cell) => {this._attackedCellsByWhite.push(element)}) : ''
            })
        })
    }
    // черные
    _attackedCellsByBlack: Cell[] = []
    get attackedCellsByBlack(): Cell[] {
        return this._attackedCellsByBlack
    }
    checkAttackedCellsByBlack = () => {
        this._attackedCellsByBlack = []
        this.board.cells.map((el: Cell[]) => {
            el.map((cell: Cell) => {
                cell.figure?.color === Colors.BLACK ? cell.figure?.getAvalibleCells().map((element: Cell) => {this._attackedCellsByBlack.push(element)}) : ''
            })
        })
    }

    _previousFigure: Figure | null = null
    get previousFigure(){
        return this._previousFigure
    }
    setPreviousFigure = (figure: Figure) => {
        this._previousFigure = figure
    }
    // взятие на проходе
    _enPassant: boolean = false
    get enPassant(){
        return this._enPassant
    }
    setEnPassant = (isEnPassant: boolean) => {
        this._enPassant = isEnPassant
    }
    _previousFigureEnPassant: Figure | null = null
    get previousFigureEnPassant(){
        return this._previousFigureEnPassant
    }
    setPreviousFigureEnPassant = (figure: Figure | null) => {
        this._previousFigureEnPassant = figure
    }
    
    _moveCounter: number = 1
    get moveCounter(){
        return this._moveCounter
    }
    increaseMoveCounter = () => {
        this._moveCounter++
    }

    changeTurn = () => {
        this.turn === Colors.WHITE ? this._turn = Colors.BLACK : this._turn = Colors.WHITE
        if(checkStore.isCheckBlack && this.attackedCellsByWhite.find((el: Cell) => {return el.figure?.name === FigureNames.KING && el.figure.color === Colors.BLACK})?.figure?.getRetreatCells().length === 0){
            this.win = Colors.WHITE
        }
        if(checkStore.isCheckWhite && this.attackedCellsByBlack.find((el: Cell) => {return el.figure?.name === FigureNames.KING && el.figure.color === Colors.WHITE})?.figure?.getRetreatCells().length === 0){
            this.win = Colors.BLACK
        }
        if(this.win !== null){
            console.log(this.win)
        }        
    }
}   


export const store = new Storage()