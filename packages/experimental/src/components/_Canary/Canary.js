/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import { bool, string } from 'prop-types';
import React from 'react';
// todo probably should be a modal
import { Tooltip, CodeSnippet } from 'carbon-components-react';

import { pkg } from '../../settings';
import { CanarySvg2 } from './CanarySvg2';

const blockClass = `${pkg.prefix}-canary`;

const CanaryInner = ({ component, className, small, ...rest }) => {
  const componentName = component?.name || component;

  const instructions = `
import { pkg } from '@carbon/ibm-cloud-cognitive-experimental';
// NOTE: must happen before component import
pkg.component.${componentName} = true;
`;

  return (
    <div className={cx(blockClass, className)} {...rest}>
      <h2>
        This component <strong>{componentName}</strong> is not ready yet.
      </h2>
      <p>
        To enable this initialize package flags before any components are
        loaded, passing an override object.
      </p>
      <br />
      <p>e.g. in main.js</p>
      <CodeSnippet type="multi" light={true}>
        {instructions}
      </CodeSnippet>
      <br />
      <p>
        View a live example on{' '}
        <a href="https://codesandbox.io/s/example-component-olif5?file=/src/config.js">
          codesadnbox
        </a>
        .
      </p>
    </div>
  );
};

CanaryInner.propTypes = {
  /** Provide an optional class to be applied to the containing node */
  className: string,

  /** Name  of the component that is not ready yet */
  component: string.isRequired,

  /** small */
  small: bool,
};

/**
 *  Canary component used when the component requested is not yet production
 */
export const Canary = ({ component, className, small, ...rest }) => {
  if (small) {
    return (
      <Tooltip direction="bottom" tabIndex={0} renderIcon={CanarySvg2}>
        <CanaryInner {...{ component, className, small, ...rest }} />
      </Tooltip>
    );
  } else {
    return <CanaryInner {...{ component, className, small, ...rest }} />;
  }
};

Canary.propTypes = {
  /** Provide an optional class to be applied to the containing node */
  className: string,

  /** Name of the component that is not ready yet */
  component: string.isRequired,

  /** small */
  small: bool,
};

Canary.defaultProps = {
  className: null,
};

Canary.displayName = 'Canary';
