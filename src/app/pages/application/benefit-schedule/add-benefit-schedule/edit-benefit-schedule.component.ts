import { Component, OnInit } from '@angular/core';
import { AbstractBenefitSchedule } from './abstract-benefit-schedule';
import { BenefitScheduleService } from '../benefit-schedule.service';
import { NavigationService } from '@app/core';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../places/places.service';
import { BenefitService } from '../../benefit/services/benefit.service';
import { FormBuilder } from '@angular/forms';
import { Subscriber, Subscription } from 'rxjs';
import { BenefitSchedule } from '@app/models/benefit-category/benefit-schedule.model';
import { environment } from 'src/environments/environment';
import { AutoCompleteData } from '@app/models/shared/auto-complete';
import { ObjectUtilsService } from '@app/core/services/utils/object-utils.service';
import { SanitizeHtmlPipe } from './../../../../pipes/html.pipe';
import { DateUtilsService } from '@app/core/services/utils/date-utils.service';

@Component({
  selector: 'app-edit-benefit-schedule',
  templateUrl: './add-benefit-schedule.component.html',
  styleUrls: ['./add-benefit-schedule.component.scss']
})
export class EditBenefitScheduleComponent extends AbstractBenefitSchedule implements OnInit {

  private subsSchedule: Subscription = new Subscriber();
 
  constructor(protected bsService: BenefitScheduleService, protected nav: NavigationService, protected route: ActivatedRoute,
    protected fb: FormBuilder, protected bService: BenefitService, protected placesService: PlacesService, protected objectUtils: ObjectUtilsService,
    protected dateUtils: DateUtilsService) {
    super(bsService, nav, route, fb, objectUtils, bService, placesService, dateUtils);
    this.titulo = "Editar";
  }

  public ngOnInit() : void {
    super.ngOnInit();
    let params = this.route.params.subscribe(res => {
      this.getDetails(res.id)
    })

  }

  public predefinedStockChange(): void {
    this.benefitScheduleGroup.controls['stockCupones'].setValue(0);
  }

  public getDetails(id: number): void {
    this.subsSchedule = this.bsService.getOne(id).subscribe(res => {

      this.updateLocales(res.beneficio.id).then(locales => {

        let resPlaces = locales.filter(place => res.locales.find(local => local.id === place.idLocal));
        
        this.selectedPlaces = resPlaces.map(place => new AutoCompleteData()
        .setId(place.idLocal)
        .setDisplayValue(this.displayName(place.nombreDepartamento, place.direccionLocal)));


        this.benefitScheduleGroup.controls.locales.setValue(this.selectedPlaces.map(local => local.id));

      });

      this.setFormGroup(res);

      if (res.beneficio.urlImg)
        this.imagePath = environment.baseUrl + environment.assets + res.beneficio.urlImg;
    })
  }

  public get benefitsAcd(): AutoCompleteData[] {
    return this.benefits ? this.benefits.map(benefit => {
      let autoCompleteData = benefit.tituloMarca ? benefit.tituloMarca : " "; 
      autoCompleteData += benefit.tituloLargo ?  " - " + benefit.tituloLargo : " "; 
      return new AutoCompleteData().setId(benefit.id).setDisplayValue(autoCompleteData);
    }) : null;
  }


  public saveAction(): void {
    let toSave:BenefitSchedule = this.groupToBenefitSchedule();
    // toSave.detalle = SanitizeHtmlPipe.prototype.transform(toSave.detalle);
    this.bsService.editItem(toSave).subscribe(res => this.updateList());
  }

}
