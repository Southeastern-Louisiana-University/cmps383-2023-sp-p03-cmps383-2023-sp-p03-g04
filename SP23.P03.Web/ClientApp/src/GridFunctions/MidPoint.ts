export function calculateMidPoint(point1: Array<string>, point2: Array<string>): Array<number> {
	let midpoint: number[] = [];

	const firstPoint = {
		x: parseFloat(point1[0]),
		y: parseFloat(point1[1]),
	};
	const secondPoint = {
		x: parseFloat(point2[0]),
		y: parseFloat(point1[1]),
	};

	const mptNumeratorX = firstPoint.x + secondPoint.x;
	const mptNumeratorY = firstPoint.y + secondPoint.y;

	const mpX = mptNumeratorX / 2;
	const mpY = mptNumeratorY / 2;

	midpoint = [mpX, mpY];
	return midpoint;
}