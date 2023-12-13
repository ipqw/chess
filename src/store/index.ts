import { makeAutoObservable } from 'mobx'
import { Board } from '../models/Board'
import { Colors } from '../models/Colors'
import { Cell } from '../models/Cell'
import { Figure, FigureNames } from '../models/Figures/Figure'
import { serverStore } from './server'
import { Queen } from '../models/Figures/Queen'

export enum MoveTypes {
    ENPASSANT = 'enpassant',
    BASIC = 'basic',
    CASTLING = 'castling',
    DOUBLEPAWN = 'doublepawn',
    TRANSFORMPAWN = 'transform' 
}

class Storage {
    constructor(){
        makeAutoObservable(this)
    }
    async setIsDev(el:boolean){
        el ? sessionStorage.setItem('ip', '0') : await serverStore.getIp()
    }
    _moves: string[] = []
    get moves(){
        return this._moves
    }
    addMove = (move: string) => {
        this._moves.push(move)
    }
    clearMoves = () => {
        this._moves = []
    }
    _typePreviousMove: MoveTypes | string = MoveTypes.BASIC
    get typePreviousMove(){
        return this._typePreviousMove
    }
    setTypePreviousMove = (type: MoveTypes | string) => {
        this._typePreviousMove = type
    }
    returnMove = () => {
        this._moves.pop()
    }
    _server: string = 'http://localhost:6425/api/'
    get server(){
        return this._server
    }
    _win: Colors | null = null
    get win(){
        return this._win
    }
    setWin = (color: Colors | null) => {
        this._win = color
    }
    _board: Board = new Board
    get board(){
        return this._board
    }
    _isRotated: boolean = false
    get isRotated(){
        return this._isRotated
    }
    rotateBoard = (rotate: boolean) => {
        this._isRotated = rotate
    }
    restartBoard(){
        this.setWin(null)
        this._board = new Board
        this._board.initCells()
        this._board.addFigures()
    }
    _turn: Colors = Colors.WHITE
    get turn(){
        return this._turn
    }
    setTurn = (el: Colors) => {
        this._turn = el
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
    // мат
    getWhiteAttackingFigure = (): Figure | null => {
        let resultFigure: Figure | null = null
        this.board.cells.map((cells: Cell[]) => {
            cells.map((cell: Cell) => {
                if(cell.figure?.getAvalibleCells().find((elem: Cell) => {
                    return (elem.figure?.name === FigureNames.KING && elem.figure.color === Colors.BLACK)
                })){
                    resultFigure = cell.figure
                }
                
            })
        })
        return resultFigure
    }
    getBlackAttackingFigure = (): Figure | null => {
        let resultFigure: Figure | null = null
        this.board.cells.map((cells: Cell[]) => {
            cells.map((cell: Cell) => {
                if(cell.figure?.getAvalibleCells().find((elem: Cell) => {
                    return (elem.figure?.name === FigureNames.KING && elem.figure.color === Colors.WHITE)
                })){
                    resultFigure = cell.figure
                }
                
            })
        })
        return resultFigure
    }
    getAttackedCellsByWhiteWithoutKing = () => {
        this.checkAttackedCellsByWhite()
        return this.attackedCellsByWhite.filter((el: Cell) => {el.figure?.name !== FigureNames.KING})
    }
    getAttackedCellsByBlackWithoutKing = () => {
        this.checkAttackedCellsByBlack()
        return this.attackedCellsByBlack.filter((el: Cell) => {el.figure?.name !== FigureNames.KING})
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
        this.checkAttackedCellsByWhite()
        this.checkAttackedCellsByBlack()
        this.turn === Colors.WHITE ? this._turn = Colors.BLACK : this._turn = Colors.WHITE
    }
    convertMoveToCells = (move: string) => {
        const words: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
        const numbers: number[][] = [[1, 7], [2, 6], [3, 5], [4, 4], [5, 3], [6, 2], [7, 1], [8, 0]]
        const cells: string[] = move.split('-')
        const firstConvertedNumber: number[] | undefined = numbers.find((el: any) => el[0] === Number(cells[0][1]))
        const firstConvertedWord: number = words.indexOf(cells[0][0])

        const secondConvertedNumber: number[] | undefined = numbers.find((el: any) => el[0] === Number(cells[1][1]))
        const secondConvertedWord: number = words.indexOf(cells[1][0])
        const firstCell: Cell = this.board?.getCell(firstConvertedNumber !== undefined ? firstConvertedNumber[1] : -1, firstConvertedWord)
        const secondCell: Cell = this.board?.getCell(secondConvertedNumber !== undefined ? secondConvertedNumber[1] : -1, secondConvertedWord)

        store.setTypePreviousMove(cells[2])
        return [firstCell, secondCell]
    }
    convertCellsToMove = (firstCell: Cell, secondCell: Cell) => {
        const words: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
        const numbers: number[][] = [[1, 7], [2, 6], [3, 5], [4, 4], [5, 3], [6, 2], [7, 1], [8, 0]]

        const firstConvertedNumber: number[] | undefined = numbers.find((el: any) => el[1] === firstCell.y)
        const firstConvertedWord: string = words[firstCell.x]

        const secondConvertedNumber: number[] | undefined = numbers.find((el: any) => el[1] === secondCell.y)
        const secondConvertedWord: string = words[secondCell.x]

        const move: string = `${firstConvertedWord}${firstConvertedNumber ? firstConvertedNumber[0] : 0}-${secondConvertedWord}${secondConvertedNumber ? secondConvertedNumber[0] : 0}`
        return move
    }
    
    doMove = (move: string) => {
        const [firstCell, secondCell] = this.convertMoveToCells(move)
        firstCell.moveFigure(secondCell)
        this.checkAttackedCellsByWhite()
        this.checkAttackedCellsByBlack()
    }
    doMoveWithoutConditions = (move: string) => {
        const [firstCell, secondCell] = this.convertMoveToCells(move)

        firstCell.moveFigureWithoutConditions(secondCell)
        if(this.typePreviousMove === MoveTypes.DOUBLEPAWN){
            this.setEnPassant(true)
            store.setPreviousFigureEnPassant(secondCell.figure)
        }
        else{
            this.setEnPassant(false)
        }
        if(this.typePreviousMove === MoveTypes.ENPASSANT){
            this.turn === Colors.WHITE
            ? store.board.getCell(secondCell.y+1, secondCell.x).figure?.deleteFigure()
            : store.board.getCell(secondCell.y-1, secondCell.x).figure?.deleteFigure()
        }
        if(this.typePreviousMove === MoveTypes.TRANSFORMPAWN){
            secondCell.figure = new Queen(this.turn, secondCell)
        }
        if(this.typePreviousMove === MoveTypes.CASTLING){
            store.board.getCell(secondCell.y, secondCell.x+1).figure?.name === FigureNames.ROOK 
            ? store.board.getCell(secondCell.y, secondCell.x+1).moveFigureWithoutConditions(store.board.getCell(secondCell.y, secondCell.x-1))
            : store.board.getCell(secondCell.y, secondCell.x-2).moveFigureWithoutConditions(store.board.getCell(secondCell.y, secondCell.x+1))
        }
        
        this.checkAttackedCellsByWhite()
        this.checkAttackedCellsByBlack()
    }
}

export const store = new Storage()