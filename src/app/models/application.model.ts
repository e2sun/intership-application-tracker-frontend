import { Company } from "./company.model";


export interface Application {
    id?: number,
    roleTitle: string,
    dateApplied: string,
    status: string,
    portalLink?: string,
    notes?: string;
    company?: Company; // linked company
}

