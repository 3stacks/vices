import React from 'react';
import Chart from 'chart.js';
import {InputNumber, Select, Button} from 'antd';
const Option = Select.Option;

function calculateAbsoluteCostPerDecade(moneyWastedPerYear, acc = [], cumulativeCost = 0, year = 1) {
	const lostSoFar = cumulativeCost + moneyWastedPerYear;
	const wastedAfterInterest = calculateAbsoluteCostPerYear(lostSoFar);

	if (year <= 10) {
		return [
			...acc,
			{
				year,
				cost: wastedAfterInterest
			},
			...calculateAbsoluteCostPerDecade(moneyWastedPerYear, acc, wastedAfterInterest, year + 1)
		];
	} else {
		return acc;
	}
}

function calculateAbsoluteCostPerYear(moneyWastedSoFar) {
	const interest = moneyWastedSoFar * 0.04;
	return moneyWastedSoFar + interest;
}

function getWastedPerYearFromValueAndFrequency(value, frequency) {
	switch (frequency) {
		case 'daily':
			return value * 365;
		case 'weekly':
			return value * 52;
		case 'monthly':
			return value * 12;
		case 'annually':
			return value;
		default:
			console.warn('not yet supported');
	}
}

export function downloadDataURI(contents, name, extension = 'png') {
	const element = document.createElement('a');
	element.setAttribute('href', contents);
	element.setAttribute('download', `${name}.${extension}`);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}

export default class App extends React.Component {
	chartCanvas = null;
	chart = null;
	state = {
		moneyValue: '',
		frequencyValue: 'daily',
		frequencyOptions: [
			{
				value: 'daily',
				text: 'Daily'
			},
			{
				value: 'weekly',
				text: 'Weekly'
			},
			{
				value: 'monthly',
				text: 'Monthly'
			},
			{
				value: 'annually',
				text: 'Annually'
			}
		],
		moneyWastedPerYear: null
	};

	handleCalculateSubmitted = (event) => {
		event.preventDefault();

		this.setState(state => {
			return {
				...state,
				moneyWastedPerYear: getWastedPerYearFromValueAndFrequency(
					this.state.moneyValue,
					this.state.frequencyValue
				)
			};
		}, () => {
			const data = calculateAbsoluteCostPerDecade(this.state.moneyWastedPerYear);
			this.chart = new Chart(this.chartCanvas.getContext('2d'), {
				type: 'line',
				data: {
					labels: data.map(item => item.year),
					datasets: [
						{
							label: 'Absolute cost ($)',
							data: data.map(item => Math.round(item.cost))
						}
					]
				},
				responsive: true
			});
		});
	};

	handleSaveButtonPressed = async () => {
		downloadDataURI(this.chart.toBase64Image(), 'please-stop');
	};

	render() {
		return (
			<div>
				<form onSubmit={this.handleCalculateSubmitted}>
					<label className="label">
						How much does your vice cost you?
						<InputNumber
							placeholder="e.g. 10"
							formatter={value => `$ ${value}`}
							value={this.state.moneyValue}
							onChange={value => {
								this.setState(state => {
									return {
										...state,
										moneyValue: value
									};
								});
							}}
						/>
					</label>
					<label className="label">
						How often do you indulge?
						<Select
							value={this.state.frequencyValue}
							onChange={value => {
								this.setState(state => {
									return {
										...state,
										frequencyValue: value
									};
								});
							}}
						>
							{this.state.frequencyOptions.map(frequencyOption => {
								return (
									<Option value={frequencyOption.value}>
										{frequencyOption.text}
									</Option>
								);
							})}
						</Select>
					</label>
					<Button
						htmlType="submit"
					>
						Calculate
					</Button>
				</form>
				{!!this.state.moneyWastedPerYear && (
					<div style={{maxWidth: 400}}>
						<dl>
							<div>
								<dt>
									Cost per year:
								</dt>
								<dd>
									${this.state.moneyWastedPerYear}
								</dd>
							</div>
						</dl>
						<p>
							If you invested that money instead:
						</p>
						<div>
							<canvas
								ref={el => this.chartCanvas = el}
								width="400"
								height="400"
							/>
						</div>
						<Button
							href={this.chart}
							onClick={this.handleSaveButtonPressed}
						>
							Save chart as image
						</Button>
					</div>
				)}
			</div>
		);
	}
}