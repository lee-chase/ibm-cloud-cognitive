/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';

import { action } from '@storybook/addon-actions';

import { pkg } from '../../settings';

import { Button, Form, FormGroup, TextInput } from 'carbon-components-react';

import { Tearsheet, TearsheetNarrow } from '.';
import {
  actionsOptions,
  actionsLabels,
  actionsMapping,
} from '../ActionSet/actions.js';

import { getStorybookPrefix } from '../../../config';
const storybookPrefix = getStorybookPrefix(pkg, TearsheetNarrow.displayName);

import styles from './_storybook-styles.scss';

import mdx from './Tearsheet.mdx';

export default {
  title: `${storybookPrefix}/Tearsheets/${TearsheetNarrow.displayName}`,
  component: TearsheetNarrow,
  subcomponents: { Tearsheet },
  parameters: { styles, docs: { page: mdx } },
  argTypes: {
    actions: {
      control: { type: 'select', labels: actionsLabels },
      options: actionsOptions,
      mapping: actionsMapping(
        {
          primary: 'Create',
          secondary: 'Close',
          secondary2: 'Save',
          ghost: 'Cancel',
        },
        action
      ),
    },
    closeIconDescription: {},
    description: { control: { type: 'text' } },
    label: { control: { type: 'text' } },
    title: { control: { type: 'text' } },
    onClose: { control: { disable: true } },
    open: { control: { disable: true } },
  },
};

// Test values for props.

const closeIconDescription = 'Close the tearsheet';

const description =
  'This is a description for the tearsheet, providing an opportunity to \
  describe the flow.';

const label = 'The label of the tearsheet';

const mainContent = (
  <div className="tearsheet-stories__narrow-content-block">
    <Form>
      <p>Main content</p>
      <FormGroup>
        <TextInput labelText="Enter an important value here" />
      </FormGroup>
    </Form>
  </div>
);

const title = 'Title of the tearsheet';

// Template.
// eslint-disable-next-line react/prop-types
const Template = ({ actions, ...args }) => {
  const [open, setOpen] = useState(false);

  const wiredActions = Array.prototype.map.call(actions, (action) => {
    if (action.label === 'Cancel') {
      const previousClick = action.onClick;
      return {
        ...action,
        onClick: (evt) => {
          setOpen(false);
          previousClick(evt);
        },
      };
    }
    return action;
  });

  return (
    <>
      <style>{`.${pkg.prefix}--tearsheet { opacity: 0 }`};</style>
      <Button onClick={() => setOpen(true)}>Open Tearsheet</Button>
      <TearsheetNarrow
        {...args}
        actions={wiredActions}
        open={open}
        onClose={() => setOpen(false)}>
        {mainContent}
      </TearsheetNarrow>
    </>
  );
};

// eslint-disable-next-line react/prop-types
const StackedTemplate = ({ actions, ...args }) => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  const wiredActions1 = Array.prototype.map.call(actions, (action) => {
    if (action.label === 'Cancel') {
      const previousClick = action.onClick;
      return {
        ...action,
        onClick: (evt) => {
          setOpen1(false);
          previousClick(evt);
        },
      };
    }
    return action;
  });

  const wiredActions2 = Array.prototype.map.call(actions, (action) => {
    if (action.label === 'Cancel') {
      const previousClick = action.onClick;
      return {
        ...action,
        onClick: (evt) => {
          setOpen2(false);
          previousClick(evt);
        },
      };
    }
    return action;
  });

  const wiredActions3 = Array.prototype.map.call(actions, (action) => {
    if (action.label === 'Cancel') {
      const previousClick = action.onClick;
      return {
        ...action,
        onClick: (evt) => {
          setOpen3(false);
          previousClick(evt);
        },
      };
    }
    return action;
  });

  return (
    <>
      <style>{`.${pkg.prefix}--tearsheet { opacity: 0 }`};</style>
      <div
        style={{
          display: 'flex',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 10000,
        }}>
        <Button onClick={() => setOpen1(!open1)}>Toggle #1</Button>
        <Button onClick={() => setOpen2(!open2)}>Toggle #2</Button>
        <Button onClick={() => setOpen3(!open3)}>Toggle #3</Button>
      </div>
      <TearsheetNarrow
        {...args}
        actions={wiredActions1}
        title="Tearsheet #1"
        open={open1}
        onClose={() => setOpen1(false)}>
        <div className="tearsheet-stories__narrow-content-block">
          Main content 1
        </div>
      </TearsheetNarrow>
      <TearsheetNarrow
        {...args}
        actions={wiredActions2}
        title="Tearsheet #2"
        open={open2}
        onClose={() => setOpen2(false)}>
        <div className="tearsheet-stories__narrow-content-block">
          Main content 2
        </div>
      </TearsheetNarrow>
      <TearsheetNarrow
        {...args}
        actions={wiredActions3}
        title="Tearsheet #3"
        open={open3}
        onClose={() => setOpen3(false)}>
        <div className="tearsheet-stories__narrow-content-block">
          Main content 3
        </div>
      </TearsheetNarrow>
    </>
  );
};

// Stories
export const tearsheetNarrow = Template.bind({});
tearsheetNarrow.storyName = 'Narrow tearsheet';
tearsheetNarrow.args = {
  description,
  onClose: action('onClose called'),
  title,
  actions: 6,
};

export const fullyLoaded = Template.bind({});
fullyLoaded.storyName = 'Narrow tearsheet with all header items';
fullyLoaded.args = {
  closeIconDescription,
  description,
  hasCloseIcon: true,
  label,
  onClose: action('onClose called'),
  title,
  verticalPosition: 'normal',
  actions: 0,
};

export const stacked = StackedTemplate.bind({});
stacked.storyName = 'Stacking narrow tearsheets';
stacked.args = {
  closeIconDescription,
  description,
  height: 'lower',
  label,
  preventCloseOnClickOutside: true,
  actions: 6,
};
