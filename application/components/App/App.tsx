// import React from 'react';
// import CSSModules from 'react-css-modules';
// import {Panel} from '2kit';
// import {connect, Dispatch} from 'react-redux';
// import HomePage from '../HomePage/HomePage';
// import SmsCodePage from '../SmsCodePage/SmsCodePage';
// import IframePage from '../IframePage/IframePage';
// import ErrorPage from '../ErrorPage/ErrorPage';
// import SuccessPage from '../SuccessPage/SuccessPage';
// import {Pages} from '../../modules/step/step.constants';
// import {setHeight, closeFrame} from '../../modules/postMessages/postMessages.actions';
// import {StoreState} from '../../modules/index/index.reducer';
//
// import styles from './App.css';
//
// export interface AppActions {
// 	closeFrame: () => void;
// }
//
// type AppProps = StoreState;
//
// export function resizeBlock(): void {
// 	const height = (document.querySelector('#app') as HTMLDivElement).offsetHeight;
//
// 	setHeight(height);
// }
//
// @CSSModules(styles)
// class App extends React.Component<AppProps & AppActions> {
//
// 	isPromo() {
// 		const {step, error} = this.props;
//
// 		if (error.value || step === Pages.SuccessPage) {
// 			return true;
// 		} else {
// 			return false;
// 		}
// 	}
//
// 	handlerResizeHeight = (height: number) => {
// 		setHeight(height);
// 	}
//
// 	render() {
// 		const {phone} = this.props.data;
// 		const {iframe, customErrorForm, step, error, closeFrame} = this.props;
//
// 		const pages = {
// 			[Pages.HomePage]: (
// 				<HomePage
// 					phone={phone}
// 					/>
// 			),
// 			[Pages.SmsCodePage]: (
// 				<SmsCodePage
// 					customErrorForm={customErrorForm}
// 					/>
// 			),
// 			[Pages.IframePage]: <IframePage />,
// 			[Pages.SuccessPage]: <SuccessPage />,
// 		};
//
// 		return (
// 			<Panel
// 				size="small"
// 		onResizeHeight={this.handlerResizeHeight}
// 		onClose={closeFrame}
// 		promo={this.isPromo()}
// 		popup={iframe}
// 		>
// 		{
// 			error.value ?
// 			<ErrorPage
// 				type={error.type}
// 		iframe={iframe}
// 			/>
// 	:
// 		pages[step]
// 	}
// 		</Panel>
// 	);
// 	}
// }
//
// const mapDispatchToProps = (dispatch: Dispatch<{}>): AppActions => {
// 	return {
// 		closeFrame: () => dispatch(closeFrame()),
// 	};
// };
//
// const mapStateToProps = (state: StoreState): StoreState => state;
//
// export default connect<AppProps, AppActions, {}>(
// 	mapStateToProps,
// 	mapDispatchToProps,
// )(App);
