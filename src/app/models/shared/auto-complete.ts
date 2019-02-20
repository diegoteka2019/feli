export class AutoCompleteData {
    id: number;
    displayValue: string;

    public constructor(){}

    public setId(id: number): AutoCompleteData {
        this.id = id;
        return this;
    }

    public setDisplayValue(displayValue: string): AutoCompleteData {
        this.displayValue = displayValue;
        return this;
    }
}