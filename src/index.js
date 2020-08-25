function _applyStyleSheet ({ components, styleSheet, classPropName }) {

	if (!classPropName) classPropName = 'class';
	const SELECTORS = styleSheet
	const COMPONENTS = components
	const CACHE = {} // coming soon...
	let StyledComponents = {}
	let classIndex = {}

	// Build index for memory friendly sorting
	Object.keys(SELECTORS).map((className, index) => {
		classIndex[className] = index
	})

	// Create styled components
	Object.keys(COMPONENTS).map((componentName) => {
		StyledComponents[componentName] = function(props) {
			let applyClasses = []
			let applyStyles = []
			let applyProps = {}

			const Component  = COMPONENTS[componentName]

			const _addSelectorStyles = (selectorName) => {
				const classStyle = SELECTORS[selectorName]
				const classProps = SELECTORS[selectorName + ':props']
				if (classProps) {
					applyProps = { ...applyProps, ...classProps }
				}
				if (classStyle) {
					applyStyles.push(classStyle)
				}
			}

			// Make class string an array
			if (props[classPropName]) {
				applyClasses = props[classPropName].split(' ')
				delete props[classPropName]
			}

			// Sort class array by orrurance in classes object
			// to achieve same priority functionality as in CSS
			applyClasses.sort((a, b) => {
				return (classIndex[a] > classIndex[b]) ? 1 : -1
			})

			// Add default selector
			_addSelectorStyles(componentName)

			// Loop through class names and add styles / props
			applyClasses.map(className => {
				_addSelectorStyles('.' + className)
			})

			// Check if style prop is set on component and apply it
			if (props.style) {
				if (Array.isArray(props.style)) {
					applyStyles.concat(props.style)
				} else {
					applyStyles.push({ ...props.style })
				}
			}

			// Finalize props: apply component props with highest priority
			applyProps = { ...applyProps, ...props }
			applyProps.style = applyStyles

			// Return styled component
			return (
				<Component {...applyProps} />
			)
		}
	})

	return StyledComponents;
}

export const applyStyleSheet = _applyStyleSheet;