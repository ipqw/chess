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
    _ip: number| null = null
    get ip(){
        return this._ip
    }
    getIp = async() => {
        const response = await fetch('https://api.ipify.org?format=json')
        .then((res) => {
            return res.json();
        })
        .catch(err => console.error(err))
        this._ip = response.ip
    }
    _color: Colors| null = null
    get color(){
        return this._color
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
    joinGame = async (id: string) => {
        await this.getIp()
        const response: Game| void = await fetch(`${store.server}game/join`, {
            method: 'POST',
            body: JSON.stringify({id, ip: this.ip}),
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
        })
        .catch((err: Error) => {
            this.setStatus(false)
            console.error(`Error: ${err}`)
        })
        return response
    }
}
export const serverStore = new Storage()