import { BranchPlace } from '../../../../models/places/place.model';
import { BenefitScheduleService } from "../benefit-schedule.service";
import { BenefitSchedule } from "@app/models/benefit-category/benefit-schedule.model";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Subscription, Subscriber } from "rxjs";
import { NavigationService } from "@app/core";
import { ActivatedRoute } from "@angular/router";
import { OnInit, OnDestroy } from "@angular/core";
import { ObjectUtilsService } from "@app/core/services/utils/object-utils.service";
import { Benefit } from "@app/models/benefit-category/benefit";
import { Place } from "@app/models";
import { AutoCompleteData } from "@app/models/shared/auto-complete";
import { BenefitService } from "../../benefit/services/benefit.service";
import { PlacesService } from "../../places/places.service";
import * as moment from 'moment';
import { DateUtilsService } from '@app/core/services/utils/date-utils.service';

export abstract class AbstractBenefitSchedule implements OnInit, OnDestroy {

    public benefitScheduleGroup: FormGroup;
    protected saveActionSubscription: Subscription = new Subscriber();
    public benefits: Benefit[] = null;
    public imagePath: string;
    public places: BranchPlace[] = null;
    public selectedPlaces: AutoCompleteData[] = [];
    public titulo: string;
    public ranges: DateRanges;
    public benefitSelected: Benefit = null;

    // Subscriptions
    public subsBenefitControl: Subscription = new Subscriber();
    public subsCurrentBenefit: Subscription = new Subscriber();
    public subsBenefitList: Subscription = new Subscriber();
    public subsPlaces: Subscription = new Subscriber();

    public constructor(protected bsService: BenefitScheduleService, protected nav: NavigationService, protected route: ActivatedRoute,
        protected fb: FormBuilder, protected objectUtils: ObjectUtilsService, protected bService: BenefitService, protected placesService: PlacesService,
        protected dateUtils: DateUtilsService) {

        this.ranges = DateRanges.defaultInstanceFactory();
        this.benefitScheduleGroup = this.fb.group({
            id: [null],
            tituloLargo: ['', Validators.required],
            beneficio: [null, Validators.required],
            destacado: [false],
            detalle: [null, Validators.required],
            disponibleLun: [null],
            disponibleMar: [null],
            disponibleMie: [null],
            disponibleJue: [null],
            disponibleVie: [null],
            disponibleSab: [null],
            disponibleDom: [null],
            fechaDesde: [null, Validators.required],
            fechaHasta: [null, Validators.required],
            maximoPorUsuario: [0, Validators.required],
            stockCupones: [0, Validators.required],
            stockCuponesRestantes: [0, Validators.required],
            tieneStockPredefinido: [null],
            locales: [null]
            //TODO ver locales
        });
    }

    public ngOnInit(): void {
        this.initializeSchedule();
    }

    public ngOnDestroy(): void {
        this.subsBenefitControl.unsubscribe();
        this.subsCurrentBenefit.unsubscribe();
        this.subsBenefitList.unsubscribe();
        this.subsPlaces.unsubscribe();
        this.saveActionSubscription.unsubscribe();
    }

    /**
     * This method will be executed when save or edit button is tapped,
     * implement with the expected behavior
     */
    public abstract saveAction(benefitCategory: BenefitSchedule): void;

    public updateList(): void {
        this.bsService.getAll().subscribe(res => this.bsService.next(res));
        this.close();
    }

    public close() {
        this.nav.goto('./', this.route.parent)
    }

    protected setFormGroup(benefitSchedule: BenefitSchedule): void {
        this.benefitScheduleGroup.setValue(benefitSchedule);
        this.benefitScheduleGroup.controls["beneficio"].setValue(benefitSchedule.beneficio.id);
        this.benefitScheduleGroup.controls["locales"].setValue(null);
    }

    protected groupToBenefitSchedule(): BenefitSchedule {
        let ret: BenefitSchedule = this.objectUtils.clone(this.benefitScheduleGroup.value);
        ret.beneficio = this.benefits.find(benefit => benefit.id === this.benefitScheduleGroup.controls["beneficio"].value);
        let selectedPlaces: Place[] = this.selectedPlaces.map(place => Place.simplePlaceFactory(place.id));
        ret.locales = selectedPlaces;
        return ret;
    }

    public benefitIsValid(): boolean {
        return typeof this.benefitScheduleGroup.controls.beneficio.value === "number";
    }

    public get placesData(): AutoCompleteData[] {
        let ret = this.places ? this.places.map(place => new AutoCompleteData()
            .setId(place.idLocal)
            .setDisplayValue(this.displayName(place.nombreDepartamento, place.direccionLocal))) : null;
        return ret;
    }

    public initializeSchedule() {
        this.subsBenefitList = this.bService.getAll().subscribe(res => this.benefits = res);

        this.subsBenefitControl = this.benefitScheduleGroup.get("beneficio").valueChanges.subscribe(value => {
            this.selectedPlaces = [];
            if (typeof value === "number") {
                this.updateLocales(value);
            }

        })
    }

    public updateLocales(idBenefit: number): Promise<BranchPlace[]> {
        return new Promise(resolve => {
            this.subsCurrentBenefit = this.bService.getOne(idBenefit).subscribe(benefit => {
                this.benefitSelected = benefit;

                // if (!this.benefitScheduleGroup.get('tituloLargo').value)
                //     this.benefitScheduleGroup.get('tituloLargo').setValue(benefit.tituloLargo);

                this.subsPlaces = this.placesService.getByBranch(benefit.marca.id).subscribe(locales => {
                    this.places = locales;
                    resolve(locales);
                })
            })
        })
    }

    public displayName(departamento: string, direccion: string): string {
        return departamento ? `${departamento} - ${direccion}` : direccion;
    }

    public selectAllPlaces(): void {
        this.selectedPlaces = this.places.map(place => new AutoCompleteData()
            .setId(place.idLocal)
            .setDisplayValue(this.displayName(place.nombreDepartamento, place.direccionLocal)));
    }

    // Set limit to fechaDesde on change fechaHasta
    public changeDateTo(event): void {
        let dateTo = moment(event.value);
        this.ranges.maxFrom = event.value;
        // this.ranges.minFrom = dateTo.subtract(30, 'days');
        this.benefitScheduleGroup.value.fechaHasta = dateTo;
    }

    // Set limit to fechaHasta on change fechaDesde
    public changeDateFrom(event): void {
        let fcFechaDesde: Date = this.benefitScheduleGroup.controls["fechaDesde"].value;
        if (this.dateUtils.compare(moment(fcFechaDesde), moment()) >= 0) {
            this.ranges.minTo = fcFechaDesde ? fcFechaDesde : this.ranges.minFrom;
            this.benefitScheduleGroup.value.fechaDesde = event.value;
        } else {
            this.ranges.minTo = moment().toDate();
            this.benefitScheduleGroup.value.fechaDesde = moment().toDate();
        }
    }

    public copiarTitulo(){
        this.benefitScheduleGroup.get('tituloLargo').setValue(this.benefitSelected.tituloLargo);
    }

}

export class DateRanges {

    maxTo: Date;
    minTo: Date;
    maxFrom: Date;
    minFrom: Date;

    public static defaultInstanceFactory(): DateRanges {
        return {
            maxTo: null,
            minTo: moment().toDate(),
            maxFrom: null,
            minFrom: null,
        }
    }
}