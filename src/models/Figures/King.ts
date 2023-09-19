import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import whiteLogo from '../../../src/assets/wk.png'
import blackLogo from '../../../src/assets/bk.png'

export class King extends Figure {
    constructor(color: Colors, cell: Cell){
        super(color, cell)
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo
        this.name = FigureNames.KING
    }
}