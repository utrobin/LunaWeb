declare module "*.svg" {
	const content: string;
	export default content;
}

declare module '*.css' {
	const classes: {[className: string]: string};
	export = classes;
}

declare module 'babel-pollyfill' {
	const content: any;
	export default content;
}

declare module "*.png" {
	const content: string;
	export default content;
}

declare function i18n(str: string, obj?: any): string;

declare interface Window {
	require: (value: string) => any;
	initialState: any;
	setPhone: (value: string) => void;
	showPhoneButton: boolean;
}
