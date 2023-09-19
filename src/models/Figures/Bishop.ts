import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import whiteLogo from '../../../src/assets/wb.png'
import blackLogo from '../../../src/assets/bb.png'

export class Bishop extends Figure {
    constructor(color: Colors, cell: Cell){
        super(color, cell)
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo
        this.name = FigureNames.BISHOP
    }
}