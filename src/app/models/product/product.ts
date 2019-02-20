export class Product {    
    id: number;
    idCategoriaProductoSamsung: number;    
    sku: string;    
    titulo: string;

    public constructor(){}

    public static clone(product: Product): Product {
        let ret = new Product();        
        ret.id = product.id;
        ret.idCategoriaProductoSamsung = product.idCategoriaProductoSamsung;        
        ret.sku = product.sku;        
        ret.titulo = product.titulo;
        return ret;
    }
}