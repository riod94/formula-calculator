import MapArrayObject from './utils/MapArrayObject';
import Variables from './DataStructures/Variables';
/**
 * FormulaCalculator
 * Class untuk menghitung formula
 */
export default class FormulaCalculator extends MapArrayObject {
    formulas: MapArrayObject;
    formulaConvertions: MapArrayObject;
    variables: Variables;
    selectedFormula: any;
    private notFoundVariable;
    private oprValues;
    private funcValues;
    private comparisonFormula;
    constructor();
    /**
     * Menghitung hasil dari formula berdasarkan aturan yang sudah ditentukan
     *
     * @return float
     */
    calculate(): number;
    /**
     * Parse untuk mencari string yang berada di dalam "{}" dan memisahkan variables yang memiliki tanda ":"
     * maka array pertama merupakan variable dan array kedua merupakan valuenya
     * jadi nanti pengambilannya cukup $this->variables->{$var}->get($value)
     */
    private formulaParse;
    /**
     * Menghitung jumlah gaji berdasarkan aturan yang diberikan.
     *
     * @param array $rules Aturan untuk menghitung jumlah gaji.
     * @return int Jumlah gaji yang dihitung berdasarkan aturan yang diberikan.
     */
    private resolve;
    private getElse;
    private getNextChild;
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
    private resolveOperation;
    /**
     * Konversi value ke data type yang sesuai
     *
     * @param value Value yang akan dikonversi
     * @return any Value yang sudah dikonversi
     */
    private convertValueToDataType;
    /**
     * Proses jumlah yang diberikan
     *
     * @param amount Jumlah yang diberikan
     * @return number Jumlah yang sudah diproses
     */
    private processAmount;
    /**
     * Convert a string value to minutes.
     *
     * @param string $timeStr The time string to convert (e.g. "2h30m").
     * @return int The total number of minutes.
     */
    private convertStringValueToMinute;
    /**
     * Mengatur formula yang dipilih berdasarkan amount
     *
     * @param amount Jumlah dari formula yang dipilih
     * @param row Row dari formula yang dipilih
     */
    private setSelectedFormula;
}
