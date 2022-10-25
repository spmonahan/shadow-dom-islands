import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { FluentProvider, webLightTheme } from '@fluentui/react-components';

ReactDOM.render(
  <FluentProvider theme={webLightTheme}>
    <div>👻</div>
  </FluentProvider>,
  document.getElementById('root'),
);
