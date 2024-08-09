/**
 * Class ComparisonOperator
 * Memeriksa apakah nilai dari context dan value sesuai dengan operator
 * Note: fungsi .includes() ini memeriksa isi dalam array, tapi strict. jadi jika didalam array berisi string maka nilai pembandingnya jg harus berupa string
 */
export default class ComparisonOperator {
    context: any;
    operator: string;
    value: any;
    constructor(context: any, operator: string, value: any);
    compare(): boolean;
    private transformContextAndValueToArray;
    private lessThan;
    private greaterThan;
    private lessThanOrEqualTo;
    private greaterThanOrEqualTo;
    private notEqual;
    private equal;
}
