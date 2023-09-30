import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Bishop } from "./Figures/Bishop";
import { King } from "./Figures/King";
import { Knight } from "./Figures/Knight";
import { Pawn } from "./Figures/Pawn";
import { Queen } from "./Figures/Queen";
import { Rook } from "./Figures/Rook";

export class Board {
    cells: Cell[][] = []

    public initCells = () => {
        for (let x = 0; x < 8; x++) {
            const row: Cell[] = [] 
            for (let y = 0; y < 8; y++) {
                if((x+y) % 2 !== 0) {
                    row.push(new Cell(this, x, y, Colors.BLACK, null)) // Черные
                }
                else{
                    row.push(new Cell(this, x, y, Colors.WHITE, null)) // Белые
                }
            }
            this.cells.push(row)
        }
    }

    public getCell(x: number, y: number): Cell{
        return this.cells[y][x]
    }

    public addFigures(){
        this.getCell(0, 4).figure = new King(Colors.BLACK, this.getCell(0, 5))
        this.getCell(7, 4).figure = new King(Colors.WHITE, this.getCell(7, 5))

        this.getCell(0, 3).figure = new Queen(Colors.BLACK, this.getCell(0, 3))
        this.getCell(7, 3).figure = new Queen(Colors.WHITE, this.getCell(7, 3))

        for (let index = 0; index < 8; index++) {
            this.getCell(1, index).figure = new Pawn(Colors.BLACK, this.getCell(1, index))
        }
        for (let index = 0; index < 8; index++) {
            this.getCell(6, index).figure = new Pawn(Colors.WHITE, this.getCell(6, index))
        }

        this.getCell(0, 2).figure = new Bishop(Colors.BLACK, this.getCell(0, 2))
        this.getCell(0, 5).figure = new Bishop(Colors.BLACK, this.getCell(0, 5))
        this.getCell(7, 2).figure = new Bishop(Colors.WHITE, this.getCell(7, 2))
        this.getCell(7, 5).figure = new Bishop(Colors.WHITE, this.getCell(7, 5))

        this.getCell(0, 6).figure = new Knight(Colors.BLACK, this.getCell(0, 6))
        this.getCell(0, 1).figure = new Knight(Colors.BLACK, this.getCell(0, 1))
        this.getCell(7, 6).figure = new Knight(Colors.WHITE, this.getCell(7, 6))
        this.getCell(7, 1).figure = new Knight(Colors.WHITE, this.getCell(7, 1))

        this.getCell(0, 0).figure = new Rook(Colors.BLACK, this.getCell(0, 0))
        this.getCell(0, 7).figure = new Rook(Colors.BLACK, this.getCell(0, 7))
        this.getCell(7, 0).figure = new Rook(Colors.WHITE, this.getCell(7, 0))
        this.getCell(7, 7).figure = new Rook(Colors.WHITE, this.getCell(7, 7))
        
    }
}