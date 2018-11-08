const getStorybookFile = (componentName: string): string => (
`import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs/react';
// import { action } from '@storybook/addon-actions';

import ${componentName} from './${componentName}.tsx';
import { componentType } from '../zen-component';

const stories = storiesOf('${componentName}', module);
stories.addDecorator(withKnobs);

const props = {};

stories.add(
  'default',
  withInfo()(() => (
    <${componentName} {...props} />
  ))
);
`);

export default getStorybookFile;
