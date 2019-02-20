import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subscription, Subscriber } from "rxjs";
import { NavigationService } from "@app/core";
import { ActivatedRoute } from "@angular/router";
import { BenefitTypeService } from "../services/benefit-type.service";
import { BenefitType } from "@app/models/benefit-category/benefit-type";
import { ColorUtilsService } from "@app/core/services/utils/color-utils.service";

export abstract class AbstractBenefitTypeCrudComponent {
    
    public benefitTypeGroup: FormGroup;
    protected saveActionSubscription: Subscription = new Subscriber();

    public constructor(protected nav: NavigationService, protected route: ActivatedRoute,
        protected btService: BenefitTypeService, protected fb: FormBuilder, protected colorUtils: ColorUtilsService) {

        this.benefitTypeGroup = this.fb.group({
            id: [null],
            titulo: [null, [Validators.required]],
            tipo: [null, [Validators.required]],
            orden: [null, [Validators.required]],
            backgroundColor: [null, [Validators.required]],
            charColor: [null, [Validators.required]],
            urlImage: [null],
        });
    }

    public ngOnDestroy(): void {
        this.saveActionSubscription.unsubscribe();
    }

    public get isInvalidValidForm(): boolean {
        let invalidColors = false;
        let backgroundColor = this.benefitTypeGroup.controls["backgroundColor"].value;
        let charColor = this.benefitTypeGroup.controls["charColor"].value;

        if(backgroundColor) invalidColors = invalidColors || !this.colorUtils.isValidColor(backgroundColor);
        if(charColor) invalidColors = invalidColors || !this.colorUtils.isValidColor(charColor);

        return invalidColors || this.benefitTypeGroup.invalid;
    }

    private getFormControlColor(formControl: string): string {
        let value = this.benefitTypeGroup.controls[formControl].value;
        if(value && this.colorUtils.isValidColor(value)){
          return value;
        }
        return null;
      }
    
      public get backgroundColor(): string {
        return this.getFormControlColor("backgroundColor");
      }
    
      public get charColor(): string {
        return this.getFormControlColor("charColor");
      }

    /**
     * This method will be executed when save or edit button is tapped,
     * implement with the expected behavior
     */
    public abstract saveAction(benefitType: BenefitType): void;

    public updateList(): void {
        this.btService.refreshBenefitTypes();
        this.close();
    }

    public close() {
        this.nav.goto('./', this.route.parent)
    }
}