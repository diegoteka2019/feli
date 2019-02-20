import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subscription, Subscriber } from "rxjs";
import { NavigationService } from "@app/core";
import { ActivatedRoute } from "@angular/router";
import { BenefitService } from "../services/benefit.service";
import { Benefit } from "@app/models/benefit-category/benefit";

export abstract class AbstractBenefit {
    
    public benefitGroup: FormGroup;
    protected saveActionSubscription: Subscription = new Subscriber();

    public constructor(protected nav: NavigationService, protected route: ActivatedRoute,
        protected benefitService: BenefitService, protected fb: FormBuilder) {

        this.benefitGroup = this.fb.group({
            idBeneficio: [null],
            tituloLargo: [null, [Validators.required]],
            detalle: [''],
        });
    }

    public ngOnDestroy(): void {
        this.saveActionSubscription.unsubscribe();
    }

    /**
     * This method will be executed when save or edit button is tapped,
     * implement with the expected behavior
     */
    public abstract saveAction(benefit: Benefit): void;

    public updateList(): void {
        this.benefitService.refreshBehavior();
        this.close();
    }

    public close() {
        this.nav.goto('./', this.route.parent)
    }

}