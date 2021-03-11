//
// Copyright IBM Corp. 2020, 2020
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React from 'react';
import { action } from '@storybook/addon-actions';
import { pkg } from '../../settings';
import '../../enable-all'; // must come before component is imported (directly or indirectly)
import { getStorybookPrefix } from '../../../config';
import { Canary } from '.';
const storybookPrefix = getStorybookPrefix(pkg, Canary.displayName);

import styles from './_storybook.scss'; // import storybook which includes component and additional storybook styles

export default {
  title: `${storybookPrefix}/z~documentation-only/z~${Canary.displayName}`,
  component: Canary,
  argTypes: {
    borderColor: { control: 'color' },
  },
  parameters: { styles },
};

const Template = (args) => {
  return <Canary {...args} />;
};

export const ExampleCanary = Template.bind({});
ExampleCanary.args = {
  component: 'Example_Component_Name',
};

export const ExampleSmallCanary = Template.bind({});
ExampleSmallCanary.args = {
  component: 'Example_Component_Name',
  small: true,
};
