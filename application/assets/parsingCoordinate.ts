export default function parsingCoordinate(coordinate) {
	return {
		from: {
			lat: coordinate[0][0],
			lon: coordinate[0][1],
		},
		to: {
			lat: coordinate[1][0],
			lon: coordinate[1][1],
		},
	}
}