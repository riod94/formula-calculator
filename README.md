# Formula Payroll Calculator

A comprehensive formula payroll calculator library to support Hihono projects.

## Getting Started

```sh
npm install formula-payroll
```

## How to use

```typescript
const payrollFormula = [
	{
		payroll_component_id: 39,
		formula_component_value: "function",
		value: "{function:late_in} > 0",
		amount: null,
		ranking: "1",
		formula: {
			value: "function",
			label: "Function",
			show: 1,
			alias: null,
		},
	},
	{
		payroll_component_id: 39,
		formula_component_value: "job_position",
		value: "{job_position:154}",
		amount: "0",
		ranking: "1.1",
		formula: {
			value: "job_position",
			label: "Job Title",
			show: 1,
			alias: null,
		},
	},
	{
		payroll_component_id: 39,
		formula_component_value: "join_status",
		value: "{join_status:6}",
		amount: "50000 * {function:late_in}",
		ranking: "1.2",
		formula: {
			value: "join_status",
			label: "Join Status",
			show: 1,
			alias: null,
		},
	},
	{
		payroll_component_id: 39,
		formula_component_value: "job_level",
		value: "{job_level:6} {job_level:5}",
		amount: null,
		ranking: "1.3",
		formula: {
			value: "job_level",
			label: "Job Level",
			show: 1,
			alias: null,
		},
	},
	{
		payroll_component_id: 39,
		formula_component_value: "function",
		value: "{function:late_in} == 1",
		amount: "100000",
		ranking: "1.3.1",
		formula: {
			value: "function",
			label: "Function",
			show: 1,
			alias: null,
		},
	},
	{
		payroll_component_id: 39,
		formula_component_value: "function",
		value: "{function:late_in} == 2",
		amount: "200000",
		ranking: "1.3.2",
		formula: {
			value: "function",
			label: "Function",
			show: 1,
			alias: null,
		},
	},
	{
		payroll_component_id: 39,
		formula_component_value: "function",
		value: "{function:late_in} == 3",
		amount: "300000",
		ranking: "1.3.3",
		formula: {
			value: "function",
			label: "Function",
			show: 1,
			alias: null,
		},
	},
	{
		payroll_component_id: 39,
		formula_component_value: "function",
		value: "{function:late_in} == 4",
		amount: "800000",
		ranking: "1.3.4",
		formula: {
			value: "function",
			label: "Function",
			show: 1,
			alias: null,
		},
	},
	{
		payroll_component_id: 39,
		formula_component_value: "function",
		value: "{function:late_in} >= 5",
		amount: "800000 + ( ( {function:late_in} - 4 ) * 100000 )",
		ranking: "1.3.5",
		formula: {
			value: "function",
			label: "Function",
			show: 1,
			alias: null,
		},
	},
	{
		payroll_component_id: 39,
		formula_component_value: "else",
		value: "else",
		amount: null,
		ranking: "1.4",
		formula: {
			value: "else",
			label: "Else",
			show: 1,
			alias: null,
		},
	},
	{
		payroll_component_id: 39,
		formula_component_value: "function",
		value: "{function:late_in} == 1",
		amount: "200000",
		ranking: "1.4.1",
		formula: {
			value: "function",
			label: "Function",
			show: 1,
			alias: null,
		},
	},
	{
		payroll_component_id: 39,
		formula_component_value: "function",
		value: "{function:late_in} == 2",
		amount: "400000",
		ranking: "1.4.2",
		formula: {
			value: "function",
			label: "Function",
			show: 1,
			alias: null,
		},
	},
	{
		payroll_component_id: 39,
		formula_component_value: "function",
		value: "{function:late_in} == 3",
		amount: "600000",
		ranking: "1.4.3",
		formula: {
			value: "function",
			label: "Function",
			show: 1,
			alias: null,
		},
	},
	{
		payroll_component_id: 39,
		formula_component_value: "function",
		value: "{function:late_in} == 4",
		amount: "1200000",
		ranking: "1.4.4",
		formula: {
			value: "function",
			label: "Function",
			show: 1,
			alias: null,
		},
	},
	{
		payroll_component_id: 39,
		formula_component_value: "function",
		value: "{function:late_in} >= 5",
		amount: "1200000 + ( ( {function:late_in} - 4 ) * 200000 )",
		ranking: "1.4.5",
		formula: {
			value: "function",
			label: "Function",
			show: 1,
			alias: null,
		},
	},
];

// Init formula calculator
const formula = new FormulaCalculator();
// formula.set('employee', employee)
formula.set("formulas", payrollFormula);
formula.set("time_off_type", { "1": 0, "2": 0, "3": 0, "4": 1, "6": 0 });
formula.set("work_group", { "12": 26 });
formula.set("work_shift", { "26": 22, "27": 4 });
formula.variables.set("department", 4);
formula.variables.set("job_level", 4);
formula.variables.set("job_position", 40);
formula.variables.set("join_status", 6); // jika join status 6 maka result = 50000
// formula.variables.function.set('unpaid_timeoff', 3)
formula.variables.function.set("los", 2168);
formula.variables.function.set("los_payroll", 1608);
formula.variables.function.set("join_date", "2018-08-01");
formula.variables.function.set("resign_date", null);
formula.variables.function.set("payroll_start_date", "2022-12-26");
formula.variables.function.set("payroll_end_date", "2023-01-25");
formula.variables.function.set("current_cutoff_week", 0);
formula.variables.function.set("is_last_week_of_this_month", false);
formula.variables.function.set("attendance_type", "Weekly Regular");
formula.variables.function.set("total_alpha", 0);
formula.variables.function.set("early_out", 0);
formula.variables.function.set("early_in", 0);
formula.variables.function.set("unpaid_timeoff", 0);
formula.variables.function.set("paid_timeoff", 1);
formula.variables.function.set("late_in", 2);
formula.variables.function.set("break_in", 0);
formula.variables.function.set("break_off", 0);
formula.variables.function.set("work_time", "50h 23m");
formula.variables.function.set("break_time", "0h 0m");
formula.variables.function.set("avg_work_time", "1h 56m");
formula.variables.function.set("avg_break_time", "0h 0m");
formula.variables.function.set("total_clock_in_from_all_shift_location", 26);

const calculate = formula.calculate();
```
