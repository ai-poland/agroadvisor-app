import { MD3DarkTheme } from 'react-native-paper';

const darkTheme = {
	...MD3DarkTheme,
	colors: {
		...MD3DarkTheme.colors,
		primary: '#1B5E20', // Darker green for primary
		onPrimary: '#FFFFFF', // Text color on primary
		primaryContainer: '#4CAF50', // Light green container
		onPrimaryContainer: '#FFFFFF', // Text color on primary container

		secondary: '#4CAF50', // Darker green accent
		onSecondary: '#FFFFFF', // Text color on secondary
		secondaryContainer: '#A5D6A7', // Light green secondary container
		onSecondaryContainer: '#FFFFFF', // Text color on secondary container

		background: '#121212', // Dark background
		surface: '#1F1F1F', // Dark surface
		onBackground: '#E0E0E0', // Light text on background
		onSurface: '#E0E0E0', // Light text on surface

		error: '#F44336', // Error color
		onError: '#FFFFFF', // Text color on error

		disabled: '#7E7E7E', // Disabled text color
		placeholder: '#B0BEC5', // Light gray placeholder
		backdrop: '#1B5E20', // Dark green backdrop

		// Tonal Colors
		tonal: {
			1: '#A5D6A7', // Light green
			2: '#4CAF50', // Medium green
			3: '#388E3C' // Dark green
		},

		// Elevation Levels
		elevation: {
			level1: '#1F1F1F', // Surface level 1 elevation
			level2: '#2C2C2C', // Surface level 2 elevation
			level3: '#3C3C3C' // Surface level 3 elevation
		}
	}
};

export default darkTheme;
