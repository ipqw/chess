import { makeAutoObservable } from "mobx"
import { Cell } from '../models/Cell'
import { Figure } from '../models/Figures/Figure'

class Storage {
    constructor(){
        makeAutoObservable(this)
    }
    _checkCounterWhite: number = 0
    get checkCounterWhite(){
        return this._checkCounterWhite
    }
    increaseCheckCounterWhite = () => {
        this._checkCounterWhite++
        console.log(this._checkCounterWhite)
    }
    resetCheckCounterWhite = () => {
        this._checkCounterWhite = 0
    }

    _checkCounterBlack: number = 0
    get checkCounterBlack(){
        return this._checkCounterBlack
    }
    increaseCheckCounterBlack = () => {
        this._checkCounterBlack++
        console.log(this._checkCounterBlack)
    }
    resetCheckCounterBlack = () => {
        this._checkCounterBlack = 0
    }

    
    _isCheckWhite: boolean = false
    get isCheckWhite(){
        return this._isCheckWhite
    }
    setIsCheckWhite = (x: boolean) => {
        this._isCheckWhite = x
    }

    _isCheckBlack: boolean = false
    get isCheckBlack(){
        return this._isCheckBlack
    }
    setIsCheckBlack = (x: boolean) => {
        this._isCheckBlack = x
    }

    _actualPosition: Cell | null = null
    get actualPosition(){
        return this._actualPosition
    }
    setActualPosition = (el: Cell) => {
        this._actualPosition = el
    }

    _previousPosition: Cell | null = null
    get previousPosition(){
        return this._previousPosition
    }
    setPreviousPosition = (el: Cell) => {
        this._previousPosition = el
    }

    _eatenFigure: Figure | null = null
    get eatenFigure(){
        return this._eatenFigure
    }
    setEatenFigure = (el: Figure | null) => {
        this._eatenFigure = el
    }
}

export const checkStore = new Storage()