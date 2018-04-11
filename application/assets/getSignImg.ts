import paintingSvg from './img/painting.svg';
import neatlySvg from './img/neatly.svg';
import cosySvg from './img/cosy.svg';
import palletSvg from './img/pallet.svg';
import fastSvg from './img/fast.svg';

function getSignImg(id: number): string {
	const signs = new Map([
		[1, fastSvg],
		[2, neatlySvg],
		[3, paintingSvg],
		[4, palletSvg],
		[5, cosySvg],
	]);

	return signs.get(id);
}

export default getSignImg;
