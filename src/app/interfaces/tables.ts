import { Column } from "./column";

export interface Table {
    id: string;
    columns: Array<Column>
}
