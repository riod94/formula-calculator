"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class ComparisonOperator
 * Memeriksa apakah nilai dari context dan value sesuai dengan operator
 * Note: fungsi .includes() ini memeriksa isi dalam array, tapi strict. jadi jika didalam array berisi string maka nilai pembandingnya jg harus berupa string
 */
class ComparisonOperator {
    constructor(context, operator, value) {
        this.context = context;
        this.operator = operator;
        this.value = value;
    }
    compare() {
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
    transformContextAndValueToArray() {
        this.context = typeof this.context === 'string' && this.context.includes(' ')
            ? this.context.split(' ').filter(Boolean) : this.context;
        this.value = typeof this.value === 'string' && this.value.includes(' ')
            ? this.value.split(' ').filter(Boolean) : this.value;
    }
    lessThan() {
        return this.context < this.value;
    }
    greaterThan() {
        return this.context > this.value;
    }
    lessThanOrEqualTo() {
        return this.context <= this.value;
    }
    greaterThanOrEqualTo() {
        return this.context >= this.value;
    }
    notEqual() {
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
            const intersection = this.value.filter((value) => this.context.some((context) => context == value));
            return intersection.length != Math.min(this.value.length, this.context.length);
        }
        return false;
    }
    equal() {
        if (Array.isArray(this.value) && Array.isArray(this.context)) {
            const intersection = this.value.filter((value) => this.context.some((context) => context == value));
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
exports.default = ComparisonOperator;
