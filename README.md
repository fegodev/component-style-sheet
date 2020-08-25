# Component Style Sheet


## React Native example

Create the import file

./some/location/Stylable.js

```js
// ...
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { applyStylesheet } from 'component-style-sheet';

const Stylable = applyStylesheet({
	components: {
		View,
		ScrollView,
		Text
	},
	stylesheet: StyleSheet.create({
		'Text': { // Set the default style
			color: 'blue',
			fontSize: 18,
		},
		'Text.red': { // Overwrite default style with classes
			color: 'red'
		},
		'.h1': {
			fontWeight: 'bold',
			fontSize: 24
		},
		'View.container': {
			paddingLeft: 12,
			paddingRight: 12
		},
		".bg-blue": { // Applies to all types of components
			backgroundColor: 'blue'
		}
	}),
	classPropName: 'class'
})

module.exports = {
	// Export your stylable components
	...Stylable,
	// Pre-styled components are possible too:
	H1: props => (<Stylable.Text class={'h1 ' + props.class} />)
}
```

Import stylable components anywhere in your project:

./some/location/SomeComponent.js

```js
// ...
import { View, Text } from './some/location/Stylable.js';

export default MyComponent = (props) => {
	return(
		<View class="container">
			<H1>I already have some styles</H1>
			<Text>This text is blue by default</Text>
			<Text class="red">This text applies default styles but overwrites color to red</Text>
			<Text class="red bg-blue" style={{ color: 'green' }}>Multiple classes and manual overwriting is possible too</Text>
		</View>
	)
}
```