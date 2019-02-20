export class Category {
        
        id?: number = null;
        imagen: string;
        
        titulo: string;
        urlImg?: string = null;

        constructor() {}

        public static clone(category: Category): Category {
                let ret = new Category();
                ret.id = category.id;
                ret.imagen = category.imagen;
        
                ret.titulo = category.titulo;
                ret.urlImg = category.urlImg;
                return ret;
        }


}