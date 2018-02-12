import React from 'react';
import {InputNumber, Select, Button} from 'antd';
const Option = Select.Option;

function calculateAbsoluteCostPerDecade(moneyWastedPerYear, acc = [], year = 1) {
	const lastItem = acc[acc.length - 1];
	const lostSoFar = !!lastItem ? moneyWastedPerYear + lastItem.cost : moneyWastedPerYear;
	const wastedAfterInterest = calculateAbsoluteCostPerYear(lostSoFar);

	if (year < 10) {
		return [
			...acc,
			{
				year,
				cost: wastedAfterInterest
			},
			...calculateAbsoluteCostPerDecade(moneyWastedPerYear + wastedAfterInterest, acc, year + 1)
		];
	} else {
		return [
			...acc,
			{
				year,
				cost: wastedAfterInterest
			}
		];
	}
}

function calculateAbsoluteCostPerYear(moneyWastedSoFar) {
	const interest = moneyWastedSoFar * 0.04;
	return moneyWastedSoFar + interest;
}

export default class App extends React.Component {
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
		moneyWastedPerYear: null,
		moneyWastedPerDecade: null
	};

	handleCalculateSubmitted = () => {
		switch (this.state.frequencyValue) {
			case 'daily':
				this.setState(state => {
					const moneyWastedPerDecade = (state.moneyValue * 7) * 752;

					return {
						...state,
						moneyWastedPerYear: state.moneyValue * 365,
						moneyWastedPerDecade
					}
				});
				break;
			case 'weekly':
				this.setState(state => {
					const moneyWastedPerDecade = state.moneyValue * 752;

					return {
						...state,
						moneyWastedPerYear: state.moneyValue * 52,
						moneyWastedPerDecade
					}
				});
				break;
			case 'monthly':
				this.setState(state => {
					const moneyWastedPerDecade = state.moneyValue * 173;

					return {
						...state,
						moneyWastedPerYear: state.moneyValue * 12,
						moneyWastedPerDecade
					}
				});
				break;
			case 'annually':
				this.setState(state => {
					const moneyWastedPerDecade = (state.moneyValue * 752) * 12;

					return {
						...state,
						moneyWastedPerYear: state.moneyValue,
						moneyWastedPerDecade
					}
				});
				break;
			default:
				console.warn('not yet supported');
		}
	};

	render() {
		return (
			<div>
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
					onClick={this.handleCalculateSubmitted}
				>
					Calculate
				</Button>
				{!!this.state.moneyWastedPerYear && (
					<div>
						<dl>
							<div>
								<dt>
									Cost per year:
								</dt>
								<dd>
									${this.state.moneyWastedPerYear}
								</dd>
							</div>
							<div>
								<dt>
									Approximate cost over 10 years (based on average 4% returns for investments):
								</dt>
								<dd>
									${this.state.moneyWastedPerDecade}
								</dd>
							</div>
						</dl>
						<p>
							If you invested that money instead:
						</p>
						<table>
							<thead>
							<tr>
								<td>
									Year
								</td>
								<td>
									Absolute cost
								</td>
							</tr>
							</thead>
							<tbody>
							{console.log(calculateAbsoluteCostPerDecade(this.state.moneyWastedPerYear))}
							{calculateAbsoluteCostPerDecade(this.state.moneyWastedPerYear).map(({year, cost}) => {
								return (
									<tr>
										<td>
											{year}
										</td>
										<td>
											${cost}
										</td>
									</tr>
								);
							})}
							</tbody>
						</table>
					</div>
				)}
			</div>
		);
	}
}