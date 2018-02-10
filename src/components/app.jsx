import React from 'react';
import ViceInput from './vice-input.jsx';
import ResultPage from './result-page.jsx';
import AboutPage from './about-page.jsx';
import If from './if.jsx';
import AppBar from 'material-ui/AppBar';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ActionHelp from 'material-ui/svg-icons/action/help';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {getCurrencyFromLanguage} from '../utils';

const styles = {
	main: {
		padding: '30px',
		maxWidth: '500px',
		marginLeft: 'auto',
		marginRight: 'auto',
		textAlign: 'center'
	}
};

const userCurrency = getCurrencyFromLanguage();


function onMenuButtonPressed() {
	modelHandler({
		type: 'ON_MENU_BUTTON_PRESSED'
	})
}

function onAboutButtonPressed() {
	modelHandler({
		type: 'ON_ABOUT_BUTTON_PRESSED'
	})
}

function showWhichIcon(currentPage) {
	if (currentPage === 'formPage') {
		return (<ActionHelp color='white' style={{ paddingTop: 11  }} onClick={onAboutButtonPressed}/>);
	} else if (currentPage === 'resultsPage' || currentPage === 'aboutPage') {
		return (<NavigationChevronLeft color='white' style={{ paddingTop: 11  }} onClick={onMenuButtonPressed}/>);
	}
}

export default function App({currentPage, viceInputProps, ...props}) {
	return (
		<MuiThemeProvider>
			<div>
				<AppBar
					iconElementLeft={showWhichIcon(currentPage)}
					showMenuIconButton={true}
					title="Vices"/>
				<main style={styles.main}>
					<If condition={currentPage === 'formPage'}>
						<ViceInput
							{...viceInputProps}
							currency={userCurrency}
						/>
					</If>
					<If condition={currentPage === 'resultsPage'}>
						<ResultPage
							event={viceInputProps.data.calculateCostEvent}
							result={viceInputProps.data.annualExpenditure}
							currency={userCurrency}
						/>
					</If>
					<If condition={currentPage === 'aboutPage'}>
						<AboutPage/>
					</If>
				</main>
			</div>
		</MuiThemeProvider>
	);
};
