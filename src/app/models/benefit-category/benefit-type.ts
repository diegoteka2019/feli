export class BenefitType {

    public backgroundColor: string;
    public charColor: string;
    public id: number;
    public orden: number;
    public tipo: string;
    public titulo: string;
    public urlImage: string;

    public constructor() { }

    public static clone(benefitType: BenefitType): BenefitType {
        return new BenefitType()
            .setId(benefitType.id)
            .setTitulo(benefitType.titulo)
            .setOrden(benefitType.orden)
            .setTipo(benefitType.tipo)
            .setBackgroundColor(benefitType.backgroundColor)
            .setCharColor(benefitType.charColor)
            .setUrlImage(benefitType.urlImage)
    }

    public setBackgroundColor(color: string): BenefitType {
        this.backgroundColor = color;
        return this;
    }

    public setCharColor(color: string): BenefitType {
        this.charColor = color;
        return this;
    }

    public setId(id: number): BenefitType {
        this.id = id;
        return this;
    }

    public setOrden(orden: number): BenefitType {
        this.orden = orden;
        return this;
    }

    public setTipo(tipo: string): BenefitType {
        this.tipo = tipo;
        return this;
    }

    public setTitulo(titulo: string): BenefitType {
        this.titulo = titulo;
        return this;
    }

    public setUrlImage(urlImage: string): BenefitType {
        this.urlImage = urlImage;
        return this;
    }

    
}