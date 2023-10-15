import { makeAutoObservable } from 'mobx'
import { Board } from '../models/Board'
import { Colors } from '../models/Colors'
import { Cell } from '../models/Cell'
import { Figure } from '../models/Figures/Figure'

class Storage {
    constructor(){
        makeAutoObservable(this)
    }
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
    changeTurn = () => {
        this.turn === Colors.WHITE ? this._turn = Colors.BLACK : this._turn = Colors.WHITE
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

    _attackedCells: Cell[] = []
    get attackedCells(): Cell[] {
        return this._attackedCells
    }
    setAttackedCells = (cells: Cell[]) => {
        this._attackedCells = cells
    }

    _previousFigure: Figure | null = null
    get previousFigure(){
        return this._previousFigure
    }
    setPreviousFigure = (figure: Figure) => {
        this._previousFigure = figure
    }

    _enPassant: boolean = false
    get enPassant(){
        return this._enPassant
    }
    setEnPassant = (isEnPassant: boolean) => {
        this._enPassant = isEnPassant
    }

    _check: boolean = false
    get check(){
        return this._check
    }
    setCheck = (isCheck: boolean) => {
        this._check = isCheck
    }
    
    _moveCounter: number = 1
    get moveCounter(){
        return this._moveCounter
    }
    increaseMoveCounter = () => {
        this._moveCounter++
    }
}


export const store = new Storage()