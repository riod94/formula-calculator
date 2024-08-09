"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_discord_1 = __importDefault(require("log-discord"));
const ComparisonOperator_1 = __importDefault(require("./ComparisonOperator"));
const MapArrayObject_1 = __importDefault(require("./utils/MapArrayObject"));
const Variables_1 = __importDefault(require("./DataStructures/Variables"));
const contants_1 = require("./contants");
/**
 * FormulaCalculator
 * Class untuk menghitung formula
 */
class FormulaCalculator extends MapArrayObject_1.default {
    constructor() {
        super();
        this.notFoundVariable = [];
        this.oprValues = [];
        this.funcValues = [];
        this.comparisonFormula = [
            'time_off_type', 'work_group', 'work_shift', 'department', 'job_position', 'job_level', 'join_status',
        ];
        this.formulas = new MapArrayObject_1.default();
        this.formulaConvertions = new MapArrayObject_1.default();
        this.variables = new Variables_1.default();
        // Mengambil operator dan function
        this.oprValues = contants_1.OPERATOR.map((item) => item.value);
        this.funcValues = Object.values(contants_1.FUNCTION).map((item) => item.value);
    }
    /**
     * Menghitung hasil dari formula berdasarkan aturan yang sudah ditentukan
     *
     * @return float
     */
    calculate() {
        try {
            // Inisialisasi variabel
            const formulas = this.formulas;
            const rules = {};
            // Looping untuk mengambil setiap aturan dari formula
            formulas.forEach((row) => {
                const type = row.formula_component_value || row['formula_component_value'];
                const amount = this.formulaParse('amount', row.amount || row['amount']);
                const rowValue = row.value || row['value'];
                let condition = null;
                let context = type;
                let operator = null;
                let value = null;
                // Jika formula adalah function, maka set kondisi
                if ('function' === type) {
                    condition = this.formulaParse(type, rowValue);
                }
                // Jika formula adalah else, maka set context ke else,
                // operator ke kosong, dan value ke value dari formula
                else if ('else' === type) {
                    context = 'else';
                    operator = '';
                    value = this.formulaParse(type, rowValue);
                }
                // Jika formula adalah kondisi lain, maka set context ke formula component value, operator ke ==, dan value ke value dari formula
                else {
                    operator = '==';
                    value = this.formulaParse(type, rowValue);
                }
                // Ambil ranking teratas dari setiap aturan
                const topRank = row['ranking'].substring(0, 1);
                // Tambahkan aturan ke rules sesuai dengan ranking teratas
                if (!rules[topRank]) {
                    rules[topRank] = {};
                }
                rules[topRank][row['ranking']] = {
                    condition: condition,
                    context: context,
                    operator: operator,
                    value: value,
                    amount: amount,
                    type: type,
                    ranking: row['ranking'],
                };
            });
            // Urutkan rules secara ascending berdasarkan ranking teratas
            const sortedRules = Object.keys(rules).sort().reduce((acc, key) => {
                acc[key] = rules[key];
                return acc;
            }, {});
            this.formulaConvertions = sortedRules;
            // Inisialisasi variabel resolve
            let resolve = 0;
            // Looping untuk menyelesaikan setiap aturan dari rules
            for (const key in sortedRules) {
                if (sortedRules[key]) {
                    const rule = sortedRules[key];
                    // Hitung resolve dari aturan
                    resolve = this.resolve(rule);
                    // Jika nilai lebih besar dari pada 0 langsung skip, supaya tidak ambil nilai dari formula terakhir
                    if (resolve > 0) {
                        break;
                    }
                }
            }
            if (this.notFoundVariable.length > 0) {
                console.error('not_found_when_convert_formula_variable', {
                    variable: this.notFoundVariable,
                    function: this.variables.function,
                });
                log_discord_1.default.warning('not_found_when_convert_formula_variable', {
                    variable: this.notFoundVariable,
                    function: this.variables.function,
                });
            }
            // Kembalikan nilai resolve
            return resolve;
        }
        catch (th) {
            // Mengembalikan error
            console.error(th);
            log_discord_1.default.critical('error_calculate_formula', {
                formula: this.selectedFormula,
                error: th
            });
            throw th;
        }
    }
    /**
     * Parse untuk mencari string yang berada di dalam "{}" dan memisahkan variables yang memiliki tanda ":"
     * maka array pertama merupakan variable dan array kedua merupakan valuenya
     * jadi nanti pengambilannya cukup $this->variables->{$var}->get($value)
     */
    formulaParse(type, formulaString) {
        // Jika formula string kosong
        if (!formulaString) {
            return formulaString;
        }
        // Jika formula string adalah comparison formula
        if (this.comparisonFormula.includes(type)) {
            // handle old variable
            if (!formulaString.includes(':')) {
                // parse semua string dan remove semua "{}" dan ubah ke array 
                return formulaString
                    .split(' ')
                    .map((item) => item.replace('{', '').replace('}', ''))
                    .join(' ');
            }
            // Cari string yang berada di dalam "{}" dan pemisah :
            const matches = formulaString.match(/\{([^:]+):([^}]+)\}/g) || [];
            return matches.map((match) => match.split(':')[1].replace('}', '')).join(' ');
        }
        // Split formula string into array
        const initials = formulaString.split(' ');
        const values = initials.map((initial) => {
            var _a, _b, _c, _d, _e;
            // Cari string yang berada di dalam "{}"
            initial = initial.replace('{', '').replace('}', '');
            if (!initial.includes(':')) {
                // handle old variable
                return this.variables.function.get(initial) || this.variables.function[initial] || initial;
            }
            // Cari string yang berada di dalam "{}"
            const [object, value] = initial.split(':').map((item) => item.trim());
            // Get value dari variable yang ditemukan
            let getValue = ((_c = (_b = (_a = this.variables) === null || _a === void 0 ? void 0 : _a[object]) === null || _b === void 0 ? void 0 : _b.get) === null || _c === void 0 ? void 0 : _c.call(_b, value)) || ((_e = (_d = this.variables) === null || _d === void 0 ? void 0 : _d[object]) === null || _e === void 0 ? void 0 : _e[value]) || value;
            // Parse value to data type
            return this.convertValueToDataType(getValue);
        });
        return values.join(' ');
    }
    /**
     * Menghitung jumlah gaji berdasarkan aturan yang diberikan.
     *
     * @param array $rules Aturan untuk menghitung jumlah gaji.
     * @return int Jumlah gaji yang dihitung berdasarkan aturan yang diberikan.
     */
    resolve(rules) {
        let loopedRank = []; // Menyimpan rank yang sudah di-loop
        let nextRank = null; // Rank dari aturan selanjutnya
        let amount = 0; // Jumlah gaji yang dihitung berdasarkan aturan yang diberikan
        const ruleArray = Array.isArray(rules) ? rules : Object.values(rules);
        for (const row of ruleArray) {
            // Cek apakah rank ini sudah di-loop
            if (loopedRank.includes(row['ranking'])) {
                continue;
            }
            // Cek apakah ada rank selanjutnya
            if (nextRank && row['ranking'] !== nextRank) {
                continue;
            }
            loopedRank.push(row['ranking']);
            let status = false;
            // Cek apakah aturan ini adalah else
            if (row['type'] === 'else') {
                if (!row['amount']) {
                    nextRank = this.getNextChild(row['ranking']);
                    if (!rules[nextRank]) {
                        this.setSelectedFormula(amount, row);
                        break;
                    }
                    else {
                        status = true;
                    }
                }
                else {
                    amount = this.resolveOperation(row['context'], row['operator'], row['value'], row['type'], row['condition'], row['amount']);
                    this.setSelectedFormula(amount, row);
                    break;
                }
            }
            else {
                status = this.resolveOperation(row['context'], row['operator'], row['value'], row['type'], row['condition'], row['amount']);
            }
            if (status && row['amount']) {
                amount = row['amount'];
                this.setSelectedFormula(amount, row);
                break;
            }
            else if (status) {
                nextRank = this.getNextChild(row['ranking']);
                if (!rules[nextRank]) {
                    this.setSelectedFormula(amount, row);
                    break;
                }
            }
            else {
                nextRank = this.getElse(row['ranking']);
                if (!rules[nextRank]) {
                    this.setSelectedFormula(amount, row);
                    break;
                }
            }
        }
        return this.processAmount(amount);
    }
    getElse(rank) {
        const lastRankSuffix = rank.charAt(rank.length - 1);
        return rank.length === 1 ? (parseInt(rank) + 1).toString() : rank.substring(0, rank.length - 1) + (parseInt(lastRankSuffix) + 1).toString();
    }
    getNextChild(rank) {
        return rank + '.1';
    }
    /**
     * Melakukan proses perhitungan operator
     *
     * @param context Context dari perhitungan
     * @param operator Operator dari perhitungan
     * @param value Value dari perhitungan
     * @param type Type dari perhitungan
     * @param condition Kondisi dari perhitungan
     * @param amount Jumlah dari perhitungan
     * @return bool|int Hasil perhitungan operator
     */
    resolveOperation(context, operator, value, type, condition, amount) {
        if (value) {
            // Extract placeholders from the value
            const pattern = /{([^}]+)}/g;
            const matches = value.match(pattern);
            const result = matches ? matches.map(match => match.slice(1, -1)).join(' ') : '';
            if (result) {
                value = result;
            }
        }
        let a = value;
        let b;
        switch (type) {
            case 'time_off_type':
            case 'work_group':
            case 'work_shift':
                // convert object to string for comparison
                b = this.variables.get(context).keyToString();
                break;
            case 'function':
                if (condition) {
                    // Evaluate the condition
                    const conditionResult = eval(condition);
                    return conditionResult !== null && conditionResult !== void 0 ? conditionResult : false;
                }
                // Call the function based on the context and value
                const functionObj = this.variables.functionObj;
                a = functionObj[context] ? functionObj[context]() : context;
                b = functionObj[value] ? functionObj[value]() : value;
                break;
            case 'else':
                const amountResult = amount ? eval(amount) : 0;
                return amountResult !== null && amountResult !== void 0 ? amountResult : 0;
            default:
                // Get the value based on the context
                b = this.variables.get(context);
                break;
        }
        // Compare the values using the specified operator
        const comparison = new ComparisonOperator_1.default(a, operator, b);
        return comparison.compare();
    }
    /**
     * Konversi value ke data type yang sesuai
     *
     * @param value Value yang akan dikonversi
     * @return any Value yang sudah dikonversi
     */
    convertValueToDataType(value) {
        // Mengonversi nilai sesuai dengan tipe datanya
        switch (typeof value) {
            case 'string':
                // Jika nilai dapat diubah menjadi tanggal, maka ubah menjadi UNIX timestamp
                const parsedDate = Date.parse(value);
                if (!isNaN(parsedDate)) {
                    return new Date(parsedDate).getTime() / 1000;
                }
                const pattern = /\d+h\s+\d+m/i;
                if (pattern.test(value)) {
                    return this.convertStringValueToMinute(value);
                }
                // Cek Apakah value merupakan operator
                if (this.oprValues.includes(value)) {
                    return value;
                }
                // Cek Apakah value merupakan function atau
                // Cek Apakah Variable component tidak terparsing
                if ((this.funcValues[value] && this.funcValues[value].show === 0) ||
                    (value.split('-').length > 1 && value !== '-')) {
                    this.notFoundVariable.push(value);
                    return 0;
                }
                return value;
            case 'number':
                return value;
            case 'object':
                // Cek jika value merupakan array
                if (Array.isArray(value)) {
                    return value.join(' ');
                }
                // Cek jika value merupakan null
                if (value === null) {
                    return 0;
                }
                // konversi object ke array kemudian konversi string dan hanya ambil key nya
                const values = Object.keys(value);
                return values.join(' ');
            case 'boolean':
                return value ? 1 : 0;
            case 'undefined':
            case null:
                return 0;
            default:
                return value;
        }
    }
    /**
     * Proses jumlah yang diberikan
     *
     * @param amount Jumlah yang diberikan
     * @return number Jumlah yang sudah diproses
     */
    processAmount(amount) {
        // Jika jumlah yang diberikan numerik, maka kembalikan nilai tersebut.
        if (typeof amount === 'number') {
            return amount;
        }
        // Jika jumlah yang diberikan bukan numerik, maka diproses sebagai ekspresi matematika.
        try {
            // Evaluasi ekspresi matematika menggunakan fungsi eval() bawaan JavaScript.
            const result = eval(amount);
            if (isNaN(result)) {
                throw new Error('Invalid mathematical expression');
            }
            return result;
        }
        catch (error) {
            // Jika terjadi error saat mengevaluasi ekspresi matematika, maka log error dan kembalikan nilai 0.
            console.error('error_process_amount_function', error);
            if (error instanceof Error && error.message === 'Division by zero') {
                return 0;
            }
            return 0;
            // throw new Error('Error processing amount');
        }
    }
    /**
     * Convert a string value to minutes.
     *
     * @param string $timeStr The time string to convert (e.g. "2h30m").
     * @return int The total number of minutes.
     */
    convertStringValueToMinute(timeStr) {
        // Memisahkan string waktu menjadi bagian jam dan menit.
        const timeParts = timeStr.split('h');
        const hours = timeParts[0];
        const minutes = timeParts[1].replace(/m$/, '');
        // Menghitung total jumlah menit.
        return parseInt(hours) * 60 + parseInt(minutes);
    }
    /**
     * Mengatur formula yang dipilih berdasarkan amount
     *
     * @param amount Jumlah dari formula yang dipilih
     * @param row Row dari formula yang dipilih
     */
    setSelectedFormula(amount, item) {
        this.selectedFormula = {
            ranking: item === null || item === void 0 ? void 0 : item.ranking,
            context: item === null || item === void 0 ? void 0 : item.context,
            operator: item === null || item === void 0 ? void 0 : item.operator,
            value: item === null || item === void 0 ? void 0 : item.value,
            type: item === null || item === void 0 ? void 0 : item.type,
            condition: item === null || item === void 0 ? void 0 : item.condition,
            amount: amount || 0,
        };
    }
}
exports.default = FormulaCalculator;
