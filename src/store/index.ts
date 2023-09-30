import { makeAutoObservable } from 'mobx'
import { Board } from '../models/Board'
import { Colors } from '../models/Colors'
import { Cell } from '../models/Cell'

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
}


export const store = new Storage()