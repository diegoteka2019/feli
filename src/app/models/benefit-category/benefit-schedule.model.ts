import { Place, SimplePlace } from '@app/models/places/place.model';
import { Benefit } from '@app/models/benefit-category/benefit';
export class BenefitSchedule {


        public beneficio?: Benefit;
        public destacado?: boolean;
        public detalle?: string;

        public disponibleDom?: boolean;
        public disponibleJue?: boolean;
        public disponibleLun?: boolean;
        public disponibleMar?: boolean;
        public disponibleMie?: boolean;
        public disponibleSab?: boolean;
        public disponibleVie?: boolean;

        public fechaDesde: string;
        public fechaHasta: string;

        public id?: number;
        public locales?: Place[];

        public maximoPorUsuario?: number;
        public stockCupones?: number;
        public stockCuponesRestantes?: number;
        public tieneStockPredefinido?: boolean;

        public idAgendaBeneficio?: number;
        public idBeneficio?: number;
        public tituloLargo?: string;

        public idMarca?: number;
        public tituloMarca?: string;
        public tituloBeneficio?: string;


        public constructor() { }

        public static clone(schedule: BenefitSchedule): BenefitSchedule {
                let ret = new BenefitSchedule();

                // ret.fechaDesde = schedule.fechaDesde;
                // ret.fechaHasta = schedule.fechaHasta;
                // ret.diasSemana = schedule.diasSemana;
                // ret.tieneStockPredefinido = schedule.tieneStockPredefinido;
                // ret.cantStockCupones = schedule.cantStockCupones;
                // ret.destacado = schedule.destacado;
                // ret.cantidadPorUsuario = schedule.cantidadPorUsuario;
                // ret.idMarca = schedule.idMarca;
                // ret.tituloMarca = schedule.tituloMarca;
                // ret.tituloBeneficio = schedule.tituloBeneficio;

                return ret;
        }


        public setIdBeneficio(id: number): BenefitSchedule {
                this.idBeneficio = id;
                return this;
        }
        public setIdAgenda(id: number): BenefitSchedule {
                this.idAgendaBeneficio = id;
                return this;
        }

}