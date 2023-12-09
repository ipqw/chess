import { makeAutoObservable } from "mobx"
import { store } from "."
import { Colors } from "../models/Colors"

export interface Game{
    id: number,
    name: string,
    moves: string[],
    counter: number,
    ownerColor: boolean,
    createdAt: string,
    updatedAt: string,
    members: string[]
}
class Storage {
    constructor(){
        makeAutoObservable(this)
    }
    getIp = async() => {
        const response = await fetch('https://api.ipify.org?format=json')
        .then((res) => {
            return res.json();
        })
        .catch(err => console.error(err))
        sessionStorage.setItem('ip', response.ip)
    }
    _color: Colors| null = null
    get color(){
        return this._color
    }
    setColor = (color: Colors | null) => {
        this._color = color
    }
    _game: Game | null = null
    get game(){
        return this._game
    }
    setGame = (game: Game | null) => {
        this._game = game
    }
    _status: boolean | null = null 
    get status(){
        return this._status
    }
    setStatus = (status: boolean | null) => {
        this._status = status
    }
    _allGames: Game[] = []
    get allGames(){
        return this._allGames
    }
    setAllGames = (el: Game[]) => {
        this._allGames = el
    }
    joinGame = async (id: string) => {
        
        // вернуть после отладки
        // await this.getIp()
        const response: Game| void = await fetch(`${store.server}game/join`, {
            method: 'POST',
            body: JSON.stringify({id, ip: sessionStorage.getItem('ip')}),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            return res.json();
        })
        .then(res => {
            if(res.message){
                this.setStatus(false)
            }
            else{
                this.setStatus(true)
            }
            this.setGame(res)
            store.clearMoves()
            store.restartBoard()
            this.game?.moves.map((el: string) => {
                store.doMoveWithoutConditions(el)
                store.changeTurn()
                store.addMove(el)
            })
            if(this.game?.members[0] === sessionStorage.getItem('ip')){
                this.setColor(this?.game.ownerColor ? Colors.WHITE : Colors.BLACK)
            }
            else if(this.game?.members[1] === sessionStorage.getItem('ip')){
                this.setColor(this?.game.ownerColor ? Colors.BLACK : Colors.WHITE)
            }
            this.color === Colors.WHITE ? store.rotateBoard(false) : store.rotateBoard(true)
        })
        .catch((err: Error) => {
            this.setStatus(false)
            console.error(`Error: ${err}`)
        })
        return response
    }
    getAllGames = async () => {
        const response: Game| void = await fetch(`${store.server}game`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            this.setAllGames(res)
        })
        return response
    }
    updateGame = async (id: string) => {
        const response: Game| void = await fetch(`${store.server}game/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            if(res.moves.length !== store.moves.length){
                store.doMoveWithoutConditions(res.moves[res.moves.length-1])
                store.addMove(res.moves[res.moves.length-1])
                store.changeTurn()
            }
            this.setGame(res)
            return res
        })
        .catch((err: any) => {
            console.error(err)
        })
        return response
    }
    sendMove = async (move: string) => {
        const response = await fetch(`${store.server}game/${this.game?.id}`, {
            method: 'POST',
            body: JSON.stringify({move}),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            return res.json()
        })
        .then((res) => {
            if(res.message){
                const cells: string[] = move.split('-')
                store.doMoveWithoutConditions(`${cells[1]}-${cells[0]}`)
                store.changeTurn()
                store.setEnPassant(false)
                store.returnMove()
            }
            return res
        })
        .catch((err) => {
            console.error(err)
        })
        return response
    }
}
export const serverStore = new Storage()