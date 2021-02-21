// We have used the number type for the DataPoint class for simplicity since we'll only exploit numerical data, but we could've used a generic type here.

export class DataPoint {
    constructor(
        private _date: string,
        private _value: number
    ) { }

    get date() {
        return this._date;
    }

    get value(): number {
        return this._value;
    }
}
