import { BranchPlace } from './../../../../models/places/place.model';
import { Component, OnInit } from '@angular/core';
import { BenefitScheduleService } from '../benefit-schedule.service';
import { AbstractBenefitSchedule } from './abstract-benefit-schedule';
import { NavigationService } from '@app/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { BenefitService } from '../../benefit/services/benefit.service';
import { AutoCompleteData } from '@app/models/shared/auto-complete';
import { PlacesService } from '../../places/places.service';
import { ObjectUtilsService } from '@app/core/services/utils/object-utils.service';
import { SanitizeHtmlPipe } from './../../../../pipes/html.pipe';
import { DateUtilsService } from '@app/core/services/utils/date-utils.service';

@Component({
  selector: 'app-add-benefit-schedule',
  templateUrl: './add-benefit-schedule.component.html',
  styleUrls: ['./add-benefit-schedule.component.scss']
})
export class AddBenefitScheduleComponent extends AbstractBenefitSchedule {

  public isPredefinedStock: boolean;

  constructor(protected bsService: BenefitScheduleService, protected nav: NavigationService, protected route: ActivatedRoute,
    protected fb: FormBuilder, protected bService: BenefitService, protected placesService: PlacesService, protected objectUtils: ObjectUtilsService,
    protected dateUtils: DateUtilsService) {
    super(bsService, nav, route, fb, objectUtils, bService, placesService, dateUtils);
    this.titulo = "Añadir";
  }

  public saveAction(): void {
    let toSave = this.groupToBenefitSchedule();
    // toSave.detalle = SanitizeHtmlPipe.prototype.transform(toSave.detalle);
    this.bsService.addItem(toSave).subscribe(res => this.updateList());
  }

  public predefinedStockChange(): void {
    if (this.benefitScheduleGroup.controls["tieneStockPredefinido"].value) {
      this.benefitScheduleGroup.controls["stockCupones"].setValue(0);
      this.benefitScheduleGroup.controls["stockCuponesRestantes"].setValue(0);
    }
  }

  public get benefitsAcd(): AutoCompleteData[] {
    return this.benefits ? this.benefits.map(benefit => {
      let autoCompleteData = benefit.tituloMarca ? benefit.tituloMarca : "";
      autoCompleteData += benefit.tituloLargo ? " - " + benefit.tituloLargo : "";
      return new AutoCompleteData().setId(benefit.id).setDisplayValue(autoCompleteData);
    }) : null;
  }

}
