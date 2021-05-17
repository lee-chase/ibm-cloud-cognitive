/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useCallback } from 'react';
import { Navigation } from './preview-components';
import { pkg } from '../../settings';
import { getStorybookPrefix } from '../../../config';
import { WebTerminal } from '.';
import mdx from './WebTerminal.mdx';
import { documentationLinks } from './preview-components/documentationLinks';
const storybookPrefix = getStorybookPrefix(pkg, WebTerminal.displayName);

import styles from './_storybook-styles.scss';

const Template = (args) => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const openTerminal = useCallback(() => setIsTerminalOpen(true), []);
  const closeTerminal = useCallback(() => setIsTerminalOpen(false), []);

  return (
    <div>
      <Navigation openTerminal={openTerminal} />

      <WebTerminal
        open={isTerminalOpen}
        closeTerminal={closeTerminal}
        {...args}>
        <div className="example-terminal">
          <p>Connection successful.</p>

          <p>
            DISCLAIMER: This is not a real terminal, you would pass your own
            terminal component into the children of the WebTerminal component.
          </p>

          <p>Please see the docs of this component for more information.</p>

          <p>joebob:~$</p>
        </div>
      </WebTerminal>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const WithDocumentationLinks = Template.bind({});
WithDocumentationLinks.args = { documentationLinks };

export default {
  title: `${storybookPrefix}/${WebTerminal.displayName}`,
  parameters: {
    styles,
    docs: {
      page: mdx,
    },
  },
};
