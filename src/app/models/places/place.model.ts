export class Place {
        public idLocal: number;
        public id: number = this.idLocal;
        public direccion: string;
        public horario: string;
        public latitud: string;
        public longitud: string;
        public telefono: string;

        public idDepartamento: number;
        public nombreDepartamento?: string;

        public idMarca: number;
        public marcaId: number = this.idMarca;
        public tituloMarca?: string;
        public subtituloMarca?: string;
        public emailMarca?: string;
        public telefonoMarca?: string;
        public urlWebsiteMarca?: string;
        
        constructor() { }
        
        public static clone(place: Place): Place {
                let ret = new Place();
                ret.idLocal = place.idLocal;
                ret.direccion = place.direccion;
                ret.horario = place.horario;
                ret.latitud = place.latitud;
                ret.longitud = place.longitud;
                ret.telefono = place.telefono;
                ret.idDepartamento = place.idDepartamento;
                ret.idMarca = place.idMarca;
                ret.marcaId = place.idMarca;
                ret.id = place.idLocal;
                return ret;
        }

        public static simplePlaceFactory(id: number): Place {
                let ret = new Place();
                ret.id = id;
                return ret;
        }
}

export class SimplePlace {
        id: number;

        constructor(id: number){
                this.id = id;
        }
}

export class BranchPlace{
        public direccionLocal: string;
        public idDepartamento: number;
        public idLocal: number;
        public nombreDepartamento: string;
        public numeroDepartamento: number;
} 