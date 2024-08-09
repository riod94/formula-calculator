

/**
 * Class ComparisonOperator
 * Memeriksa apakah nilai dari context dan value sesuai dengan operator
 * Note: fungsi .includes() ini memeriksa isi dalam array, tapi strict. jadi jika didalam array berisi string maka nilai pembandingnya jg harus berupa string
 */
export default class ComparisonOperator {
    public context: any;
    public operator: string;
    public value: any;

    constructor(context: any, operator: string, value: any) {
        this.context = context;
        this.operator = operator;
        this.value = value;
    }

    public compare(): boolean {
        this.transformContextAndValueToArray(); // Transformasi nilai dari context dan value

        switch (this.operator) {
            case '==':
            case '===':
                return this.equal();
            case '!=':
            case '!==':
                return this.notEqual();
            case '>=':
                return this.greaterThanOrEqualTo();
            case '<=':
                return this.lessThanOrEqualTo();
            case '>':
                return this.greaterThan();
            case '<':
                return this.lessThan();
            default:
                console.error('Comparison operator not recognized', {
                    operator: this.operator,
                    context: this.context,
                    value: this.value,
                });
                return false;
        }
    }

    private transformContextAndValueToArray(): void {
        this.context = typeof this.context === 'string' && this.context.includes(' ')
            ? this.context.split(' ').filter(Boolean) : this.context;
        this.value = typeof this.value === 'string' && this.value.includes(' ')
            ? this.value.split(' ').filter(Boolean) : this.value;
    }

    private lessThan(): boolean {
        return this.context < this.value;
    }

    private greaterThan(): boolean {
        return this.context > this.value;
    }

    private lessThanOrEqualTo(): boolean {
        return this.context <= this.value;
    }

    private greaterThanOrEqualTo(): boolean {
        return this.context >= this.value;
    }

    private notEqual(): boolean {
        if (Array.isArray(this.value) && !this.value.some(value => this.context == value)) {
            return true;
        }

        if (Array.isArray(this.context) && !this.context.some(context => this.value == context)) {
            return true;
        }

        if (this.context != this.value) {
            return true;
        }

        if (Array.isArray(this.value) && Array.isArray(this.context)) {
            const intersection = this.value.filter((value: string | number) => this.context.some((context: string | number) => context == value));
            return intersection.length != Math.min(this.value.length, this.context.length);
        }

        return false;
    }

    private equal(): boolean {
        if (Array.isArray(this.value) && Array.isArray(this.context)) {
            const intersection = this.value.filter((value: string | number) => this.context.some((context: string | number) => context == value));
            return intersection.length == Math.min(this.value.length, this.context.length);
        }

        if (Array.isArray(this.value) && this.value.some(value => this.context == value)) {
            return true;
        }

        if (Array.isArray(this.context) && this.context.some(context => this.value == context)) {
            return true;
        }

        if (this.context == this.value) {
            return true;
        }

        return false;
    }
}