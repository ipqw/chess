import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import whiteLogo from '../../../src/assets/wp.png'
import blackLogo from '../../../src/assets/bp.png'

export class Pawn extends Figure {
    constructor(color: Colors, cell: Cell){
        super(color, cell)
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo
        this.name = FigureNames.PAWN
    }
}