// Again, we are using the .intf.ts filename suffix to indicate that this file contains an interface.

import {DataPoint} from "../domain";

export interface ChartDetails {
    chartType: string;
    data: DataPoint[];
    dataLabel: string;
    title: string;
    xAxisLabel: string;
    yAxisLabel: string;
}

// We have used an interface here and not a class because this model element is a simple Value Object (VO), also called a Data Transfer Object (DTO). It will only be created and used to transfer information from the controller back to our view and we don't need any logic in it.
