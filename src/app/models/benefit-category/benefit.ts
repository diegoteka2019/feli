export class Benefit {

    public id: number;
    public detalle: string;
    public imagen: string;
    public tituloLargo: string;
    public urlImg: string;

    public tituloMarca?: string;
    public tituloTipoBeneficio?: string;


    public categorias?: AuxCategoriaBeneficio[];
    public marca?: AuxBeneficio;
    public tipoBeneficio?: AuxBeneficio;


    public constructor() {

    }

    public static clone(benefit: Benefit): Benefit {
        let ret = new Benefit();
        ret.id = benefit.id;
        ret.detalle = benefit.detalle;
        ret.imagen = benefit.imagen;
        ret.tituloLargo = benefit.tituloLargo;
        ret.urlImg = benefit.urlImg;
        //TODO Implementar
        // ret.tipo = BenefitType.clone(benefit.tipo);
        // ret.categorias = [];
        // benefit.categorias.forEach(categoria => ret.categorias.push(BenefitCategory.clone(categoria)));
        return ret;
    }

}

export interface AuxBeneficio {
    id: number;
    titulo: string;
}
export interface AuxCategoriaBeneficio {
    id: number;
    tituloCorto: string;
    tituloLargo: string;
}