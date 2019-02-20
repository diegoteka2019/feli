export class BenefitCategory {
    
    public id: number;
    public tituloCorto: string;
    public tituloLargo: string;
    public urlImage: string

    public constructo() {}

    public static clone(benefitCategory: BenefitCategory): BenefitCategory {
        let ret = new BenefitCategory();
        ret.id = benefitCategory.id;
        ret.tituloCorto = benefitCategory.tituloCorto;
        ret.tituloLargo = benefitCategory.tituloLargo;
        return ret;
    }
}