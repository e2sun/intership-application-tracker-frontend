import { Company } from "./company.model";


export interface Application {
    id: number,
    roleTitle: String,
    dateApplied: String,
    status: String,
    portalLink?: String,
    notes?: String;
    company?: Company; // linked company
}

