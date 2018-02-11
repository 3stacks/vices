import React from 'react';
import {InputNumber, Select, Button} from 'antd';
const Option = Select.Option;

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
						moneyWastedPerYear: moneyWastedPerDecade / 10,
						moneyWastedPerDecade
					}
				});
				break;
			case 'weekly':
				this.setState(state => {
					const moneyWastedPerDecade = state.moneyValue * 752;

					return {
						...state,
						moneyWastedPerYear: moneyWastedPerDecade / 10,
						moneyWastedPerDecade
					}
				});
				break;
			case 'monthly':
				this.setState(state => {
					const moneyWastedPerDecade = state.moneyValue * 173;

					return {
						...state,
						moneyWastedPerYear: moneyWastedPerDecade / 10,
						moneyWastedPerDecade
					}
				});
				break;
			case 'annually':
				this.setState(state => {
					const moneyWastedPerDecade = (state.moneyValue * 752) * 12;

					return {
						...state,
						moneyWastedPerYear: moneyWastedPerDecade / 10,
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
					<dl>
						<div>
							<dt>
								Approximate cost per year:
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
				)}
			</div>
		);
	}
}