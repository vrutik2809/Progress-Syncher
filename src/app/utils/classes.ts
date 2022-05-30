import { compProgMap } from "./calc";
import { compValidateMap } from "./validations";
import { ValidationErrorItem } from "joi";

export class ProgressSync {
    public componentName: string;
    public componentBody: any;
    private readonly validComponentName: string[];
    constructor(componentName: string, componentBody: any) {
        this.componentName = componentName;
        this.componentBody = componentBody;
        this.validComponentName = Array.from(compProgMap.keys());
    }

    isComponentValid(): boolean {
        return this.validComponentName.includes(this.componentName);
    }

    isBodyValid(): ValidationErrorItem[] | boolean {
        if (!this.isComponentValid()) {
            return false;
        }
        const err = compValidateMap.get(this.componentName)!(this.componentBody).error?.details;
        return err?.length ? err : true;
    }

    getProgress(): number | boolean {
        if (this.isComponentValid() && this.isBodyValid() === true) {
            return compProgMap.get(this.componentName)!(this.componentBody);
        }
        return false;
    }
}

