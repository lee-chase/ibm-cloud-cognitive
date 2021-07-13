//
// Copyright IBM Corp. 2020, 2021
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React from 'react';

import { action } from '@storybook/addon-actions';

import { pkg } from '../../settings';

import { getStorybookPrefix } from '../../../config';
import { ButtonSetWithOverflow } from '.';

// Carbon and package components we use.

const storybookPrefix = getStorybookPrefix(
  pkg,
  ButtonSetWithOverflow.displayName
);

export default {
  title: `${storybookPrefix}/${ButtonSetWithOverflow.displayName}`,
  component: ButtonSetWithOverflow,
  argTypes: {
    containerWidth: {
      control: { type: 'range', min: 20, max: 800, step: 10 },
    },
  },
  decorators: [(story) => <div className="ccs-sb__display-box">{story()}</div>],
};

const buttons = [
  {
    kind: 'danger',
    onClick: action('Danger'),
    label: 'Danger',
  },
  {
    kind: 'secondary',
    onClick: action('Secondary'),
    label: 'Secondary',
  },
  {
    onClick: action('Primary'),
    label: 'Primary',
  },
];

const buttonSetOverflowLabel = 'Button set overflow';

const Template = (argsIn) => {
  const { containerWidth, ...args } = { ...argsIn };
  return (
    <div style={{ width: containerWidth }}>
      <ButtonSetWithOverflow {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  buttons,
  buttonSetOverflowLabel,
  containerWidth: 600,
};
