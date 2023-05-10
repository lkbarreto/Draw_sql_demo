import { Column } from "./column";

export interface Data {
    type: string;
    data: Column;
    dataTypes: Array<any>
}
