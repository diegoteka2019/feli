import { NavigationService } from "@app/core";
import { BenefitCategoryService } from "../services/benefit-category.service";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BenefitCategory } from "@app/models/benefit-category/benefit-category";
import { Subscription, Subscriber } from "rxjs";
import { OnDestroy } from "@angular/core";

export abstract class AbstractBenefitCategoty implements OnDestroy{

    public benefitCategoryGroup: FormGroup;
    protected saveActionSubscription: Subscription = new Subscriber();

    public constructor(protected nav: NavigationService, protected route: ActivatedRoute,
        protected bcService: BenefitCategoryService, protected fb: FormBuilder) {

        this.benefitCategoryGroup = this.fb.group({
            id: [null],
            tituloLargo: [null, [Validators.required]],
            tituloCorto: [null],
            urlImg: [null],
        });
    }

    public ngOnDestroy(): void {
        this.saveActionSubscription.unsubscribe();
    }

    /**
     * This method will be executed when save or edit button is tapped,
     * implement with the expected behavior
     */
    public abstract saveAction(benefitCategory: BenefitCategory): void;

    public updateList(): void {
        this.bcService.getAll().subscribe(res => this.bcService.next(res));
        this.close();
    }

    public close() {
        this.nav.goto('./', this.route.parent)
    }


}