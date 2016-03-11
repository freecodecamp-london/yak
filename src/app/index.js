import React from 'react';
import { render } from 'react-dom';

import App from './containers/App';

const rootElement = document.getElementById('app');

render(
	<App />,
	rootElement
);

