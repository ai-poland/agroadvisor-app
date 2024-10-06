// weather.ts

// Define interfaces for structured data
export interface Params {
	latitude: number;
	longitude: number;
	hourly: string[];
	past_days: number;
	forecast_days: number;
}

export interface CurrentValue {
	name: string;
	value: number | null;
	unit: string;
}

export interface Summary {
	icon: string;
	text: string;
}

export interface PeriodData {
	labels: string[];
	data: (number | null)[];
	ySuffix: string;
	summary: Summary;
}

export interface WeatherData {
	humidity: {
		currentValue: CurrentValue;
		previousMonth: PeriodData;
		next16Days: PeriodData;
	};
	precipitation: {
		currentValue: CurrentValue;
		previousMonth: PeriodData;
		next16Days: PeriodData;
	};
}

export interface RawData {
	hourly: {
		time: string[];
		relativehumidity_2m: number[];
		precipitation_probability: number[];
	};
}

// Utility function to format dates as 'MMM DD' (e.g., 'Oct 06')
function formatDate(date: Date): string {
	const options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit' };
	return date.toLocaleDateString('en-US', options);
}

// Utility function to generate labels for past or future days
function generateLabels(startDate: Date, days: number, isPast: boolean = true): string[] {
	const labels: string[] = [];
	for (let i = 0; i < days; i++) {
		const date = new Date(startDate);
		if (isPast) {
			// For past labels, subtract days
			date.setDate(date.getDate() - (days - i));
		} else {
			// For future labels, add days
			date.setDate(date.getDate() + i);
		}
		labels.push(formatDate(date));
	}
	return labels;
}

// Utility function to calculate the average of an array, ignoring nulls
function calculateAverage(arr: (number | null)[]): number {
	const validNumbers = arr.filter((val): val is number => val !== null);
	if (validNumbers.length === 0) return 0;
	const sum = validNumbers.reduce((acc, val) => acc + val, 0);
	return parseFloat((sum / validNumbers.length).toFixed(2));
}

// Function to aggregate hourly data into daily averages, handling missing days
function aggregateDailyData(
	times: string[],
	values: number[],
	expectedDates: string[]
): { date: string; value: number | null }[] {
	const dailyData: { [key: string]: number[] } = {};

	times.forEach((time, index) => {
		const dateStr = time.split('T')[0]; // Extract 'YYYY-MM-DD'
		if (!dailyData[dateStr]) {
			dailyData[dateStr] = [];
		}
		dailyData[dateStr].push(values[index]);
	});

	// Calculate average for each day, insert null if data is missing
	const averagedData: { date: string; value: number | null }[] = [];
	expectedDates.forEach((date) => {
		if (dailyData[date] && dailyData[date].length > 0) {
			const avg = calculateAverage(dailyData[date]);
			averagedData.push({ date, value: avg });
		} else {
			// Data for this day is missing
			console.warn(`Missing data for date: ${date}`);
			averagedData.push({ date, value: null });
		}
	});

	return averagedData;
}

// Function to calculate percentage difference
function calculatePercentageDifference(current: number | null, comparison: number): number {
	if (current === null && comparison === 0) return 0;
	if (current === null) return Infinity;
	if (current === 0) return comparison > 0 ? Infinity : -Infinity;
	return ((comparison - current) / current) * 100;
}

// Function to fetch weather data from Open-Meteo API
export async function fetchWeatherData(params: Params): Promise<RawData> {
	const { latitude, longitude, hourly, past_days, forecast_days } = params;
	const url = 'https://api.open-meteo.com/v1/forecast';
	const TIMEZONE = 'America/Chicago'; // Specify the timezone

	// Define date ranges
	const today = new Date();
	const startPast = new Date();
	startPast.setDate(today.getDate() - past_days);
	const endPast = new Date();
	endPast.setDate(today.getDate() - 1); // Up to yesterday

	const startForecast = new Date();
	startForecast.setDate(today.getDate());
	const endForecast = new Date();
	endForecast.setDate(today.getDate() + forecast_days - 1);

	// Format dates as 'YYYY-MM-DD' in the specified timezone
	const formatYMD = (date: Date): string => {
		return new Intl.DateTimeFormat('en-CA', {
			timeZone: TIMEZONE,
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		}).format(date);
	};

	const queryParams = new URLSearchParams({
		latitude: latitude.toString(),
		longitude: longitude.toString(),
		hourly: hourly.join(','),
		start_date: formatYMD(startPast),
		end_date: formatYMD(endForecast),
		timezone: TIMEZONE // Set the specific timezone
	});

	const requestUrl = `${url}?${queryParams.toString()}`;

	// Fetch data from Open-Meteo API
	try {
		const response = await fetch(requestUrl);
		if (!response.ok) {
			throw new Error(`API request failed with status ${response.status}`);
		}
		const data: RawData = await response.json();

		// Validate response structure
		if (
			!data.hourly ||
			!data.hourly.time ||
			!data.hourly.relativehumidity_2m ||
			!data.hourly.precipitation_probability
		) {
			throw new Error('API response is missing required data fields.');
		}

		return data;
	} catch (error) {
		console.error('Error fetching weather data:', error);
		throw error;
	}
}

// Function to get current time in the specified timezone without introducing UTC offsets
function getCurrentTimeInTimezone(timezone: string): Date {
	const now = new Date();

	// Use Intl.DateTimeFormat to get the components in the specified timezone
	const options: Intl.DateTimeFormatOptions = {
		timeZone: timezone,
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false
	};
	const formatter = new Intl.DateTimeFormat([], options);
	const parts = formatter.formatToParts(now);

	const dateParts: { [key: string]: string } = {};
	parts.forEach(({ type, value }) => {
		dateParts[type] = value;
	});

	// Construct a Date object using the formatted parts
	const dateInTimezone = new Date(
		`${dateParts.year}-${dateParts.month}-${dateParts.day}T${dateParts.hour}:${dateParts.minute}:${dateParts.second}`
	);

	return dateInTimezone;
}

// Function to extract the most recent value (humidity or precipitation) up to the current time
function extractCurrentValue(times: string[], values: number[], currentTime: Date): number | null {
	let currentValue: number | null = null;
	let closestTimeDiff = Number.MAX_SAFE_INTEGER;

	times.forEach((time, index) => {
		const timeDate = new Date(time); // API times are in the specified timezone
		const timeDiff = currentTime.getTime() - timeDate.getTime();

		if (timeDiff >= 0 && timeDiff < closestTimeDiff) {
			closestTimeDiff = timeDiff;
			currentValue = values[index];
		}
	});

	// If no data point is found before currentTime, use the earliest available data
	if (currentValue === null && values.length > 0) {
		currentValue = values[0];
		console.warn('No data available up to the current time. Using the earliest available data.');
	}

	return currentValue !== null ? currentValue : null; // Return null if no data is available
}

// Function to process the retrieved weather data
export function processWeatherData(rawData: RawData, params: Params): WeatherData {
	const { past_days, forecast_days } = params;

	const {
		time: times,
		relativehumidity_2m: humidity,
		precipitation_probability: precipProb
	} = rawData.hourly;

	// Calculate expected dates for past and forecast periods
	const TIMEZONE = 'America/Chicago';
	const currentTime = getCurrentTimeInTimezone(TIMEZONE);
	const todayStr = currentTime.toISOString().split('T')[0];

	// Generate expected date strings for past and forecast periods
	const pastStartDate = new Date(currentTime);
	pastStartDate.setDate(currentTime.getDate() - past_days);
	const pastDates: string[] = [];
	for (let i = 0; i < past_days; i++) {
		const date = new Date(pastStartDate);
		date.setDate(pastStartDate.getDate() + i);
		pastDates.push(date.toISOString().split('T')[0]);
	}

	const forecastStartDate = new Date(currentTime);
	const forecastDates: string[] = [];
	for (let i = 0; i < forecast_days; i++) {
		const date = new Date(forecastStartDate);
		date.setDate(forecastStartDate.getDate() + i);
		forecastDates.push(date.toISOString().split('T')[0]);
	}

	// Aggregate humidity and precipitation data into daily averages, handling missing days
	const pastHumidityData = aggregateDailyData(times, humidity, pastDates);
	const pastPrecipProbData = aggregateDailyData(times, precipProb, pastDates);

	const forecastHumidityData = aggregateDailyData(times, humidity, forecastDates);
	const forecastPrecipProbData = aggregateDailyData(times, precipProb, forecastDates);

	// Extract current humidity and precipitation values
	const currentHumidity = extractCurrentValue(times, humidity, currentTime);
	const currentPrecipitation = extractCurrentValue(times, precipProb, currentTime);

	// Prepare labels
	const labelsPast = generateLabels(new Date(currentTime), past_days, true);
	const labelsForecast = generateLabels(new Date(currentTime), forecast_days, false);

	// Prepare data arrays, inserting nulls where data is missing
	const pastHumidity = pastHumidityData.map((entry) => entry.value);
	const pastPrecipProb = pastPrecipProbData.map((entry) => entry.value);

	const forecastHumidity = forecastHumidityData.map((entry) => entry.value);
	const forecastPrecipProb = forecastPrecipProbData.map((entry) => entry.value);

	// Calculate averages, handling nulls
	const avgPastHumidity = calculateAverage(pastHumidity);
	const avgPastPrecipProb = calculateAverage(pastPrecipProb);

	const avgForecastHumidity = calculateAverage(forecastHumidity);
	const avgForecastPrecipProb = calculateAverage(forecastPrecipProb);

	// Calculate percentage differences
	const pastHumidityDifference = calculatePercentageDifference(currentHumidity, avgPastHumidity);
	const forecastHumidityDifference = calculatePercentageDifference(
		currentHumidity,
		avgForecastHumidity
	);

	const pastPrecipDifference = calculatePercentageDifference(
		currentPrecipitation,
		avgPastPrecipProb
	);
	const forecastPrecipDifference = calculatePercentageDifference(
		currentPrecipitation,
		avgForecastPrecipProb
	);

	// Generate summary texts and icons
	function generateSummary(difference: number): Summary {
		let icon = '';
		let text = '';

		if (difference === Infinity) {
			icon = '❓';
			text = 'Cannot compare without current data.';
		} else if (difference === -Infinity) {
			icon = '❓';
			text = 'Cannot compare without current data.';
		} else if (difference > 0) {
			icon = '↑';
			text = `Average is ${difference.toFixed(2)}% higher than today.`;
		} else if (difference < 0) {
			icon = '↓';
			text = `Average is ${Math.abs(difference).toFixed(2)}% lower than today.`;
		} else {
			icon = '→';
			text = 'Average is equal to today.';
		}

		return { icon, text };
	}

	const pastHumiditySummary = generateSummary(pastHumidityDifference);
	const forecastHumiditySummary = generateSummary(forecastHumidityDifference);

	const pastPrecipSummary = generateSummary(pastPrecipDifference);
	const forecastPrecipSummary = generateSummary(forecastPrecipDifference);

	// Construct the WeatherData object
	const weatherData: WeatherData = {
		humidity: {
			currentValue: {
				name: 'Relative Humidity',
				value: currentHumidity,
				unit: '%'
			},
			previousMonth: {
				labels: labelsPast,
				data: pastHumidity,
				ySuffix: '%',
				summary: {
					icon: pastHumiditySummary.icon,
					text: `Last month on average: ${pastHumiditySummary.text}`
				}
			},
			next16Days: {
				labels: labelsForecast,
				data: forecastHumidity,
				ySuffix: '%',
				summary: {
					icon: forecastHumiditySummary.icon,
					text: `Next 16 days on average: ${forecastHumiditySummary.text}`
				}
			}
		},
		precipitation: {
			currentValue: {
				name: 'Precipitation Probability',
				value: currentPrecipitation,
				unit: '%'
			},
			previousMonth: {
				labels: labelsPast,
				data: pastPrecipProb,
				ySuffix: '%',
				summary: {
					icon: pastPrecipSummary.icon,
					text: `Last month on average: ${pastPrecipSummary.text}`
				}
			},
			next16Days: {
				labels: labelsForecast,
				data: forecastPrecipProb,
				ySuffix: '%',
				summary: {
					icon: forecastPrecipSummary.icon,
					text: `Next 16 days on average: ${forecastPrecipSummary.text}`
				}
			}
		}
	};

	return weatherData;
}
