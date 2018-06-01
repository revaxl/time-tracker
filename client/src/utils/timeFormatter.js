function secondsToTime(secs) {
	let hours = Math.floor(secs / (60 * 60));
	if (hours < 10) hours = '0' + hours

	let divisor_for_minutes = secs % (60 * 60);
	let minutes = Math.floor(divisor_for_minutes / 60);
	if (minutes < 10) minutes = '0' + minutes;

	let divisor_for_seconds = divisor_for_minutes % 60;
	let seconds = Math.ceil(divisor_for_seconds);
	if (seconds < 10) seconds = '0' + seconds;

	let obj = {
			"h": hours,
			"m": minutes,
			"s": seconds
	};
	return obj;
};

export default secondsToTime;
