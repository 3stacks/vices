export default function App(props) {
	return (
		<MuiThemeProvider>
			<div>
				<AppBar
					iconElementLeft={showWhichIcon()}
					showMenuIconButton={true}
					title="Vices"/>
				<main style={styles.main}>
					{currentPage === 'formPage' ? <ViceInput {...viceInputProps} currency={userCurrency}/> : null}
					{currentPage === 'resultsPage' ? <ResultPage event={viceInputProps.data.calculateCostEvent} result={viceInputProps.data.annualExpenditure} currency={userCurrency}/> : null}
					{currentPage === 'aboutPage' ? <AboutPage/> : null}
				</main>
			</div>
		</MuiThemeProvider>
	);
};
