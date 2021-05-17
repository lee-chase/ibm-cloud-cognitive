/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { action } from '@storybook/addon-actions';

import { pkg } from '../../settings';
import { getStorybookPrefix } from '../../../config';

import { ActionSet } from '.';
import { actionsOptions, actionsLabels, actionsMapping } from './actions.js';

import styles from './_storybook-styles.scss';

const blockClass = `${pkg.prefix}--action-set`;
const storybookPrefix = getStorybookPrefix(pkg, ActionSet.displayName);

export default {
  title: `${storybookPrefix}/${ActionSet.displayName}`,
  component: ActionSet,
  parameters: {
    styles,
  },
  argTypes: {
    actions: {
      control: {
        type: 'select',
        labels: actionsLabels,
      },
      options: actionsOptions,
      mapping: actionsMapping({}, action),
    },
  },
};

// eslint-disable-next-line react/prop-types
const Template = ({ actions, size, ...args }) => {
  return (
    <div
      className={`${blockClass}__story-container ${blockClass}__story-container--${size}`}>
      <ActionSet {...{ actions, size, ...args }} />
    </div>
  );
};

export const actionSet = Template.bind({});
actionSet.args = { actions: 3 };
