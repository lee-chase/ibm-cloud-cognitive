/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { pkg } from '../../settings';

import uuidv4 from '../../global/js/utils/uuidv4';
import { documentationLinks } from './preview-components/documentationLinks';
import { WebTerminal } from '.';

const blockClass = `${pkg.prefix}-web-terminal`;
const name = WebTerminal.displayName;
const dataTestId = uuidv4();

describe(name, () => {
  test('Renders the component `WebTerminal` if flag is enabled', () => {
    const { container } = render(
      <WebTerminal closeTerminal={() => {}} open>
        Body content
      </WebTerminal>
    );

    expect(container.querySelector(`.${blockClass}`)).not.toBeNull();
  });

  test('should attach a custom class to the web terminal', () => {
    const testClassName = 'test-class-name';
    const { container } = render(
      <WebTerminal closeTerminal={() => {}} open className={testClassName}>
        Body content
      </WebTerminal>
    );
    expect(container.querySelector(`.${testClassName}`)).not.toBeNull();
  });
  test('should render child element content', () => {
    render(
      <WebTerminal closeTerminal={() => {}} open>
        Body content
      </WebTerminal>
    );
    expect(screen.getByText(/Body content/i)).toBeInTheDocument();
  });
  test('should call close terminal function', () => {
    const { click } = fireEvent;
    const onCloseHandler = jest.fn();
    const { container } = render(
      <WebTerminal closeTerminal={onCloseHandler} open>
        Body content
      </WebTerminal>
    );

    click(container.querySelector(`.${blockClass}__close-button`));
    expect(onCloseHandler).toBeCalled();
  });
  test('should render documentation link text', () => {
    render(
      <WebTerminal
        closeTerminal={jest.fn()}
        open
        documentationLinks={documentationLinks}>
        Body content
      </WebTerminal>
    );
    expect(screen.getByText(/Kube docs/i));
  });

  it('adds additional properties to the containing node', () => {
    const { container } = render(
      <WebTerminal closeTerminal={jest.fn()} data-testid={dataTestId} open>
        Body content
      </WebTerminal>
    );
    expect(
      container.querySelector(`.${blockClass}[data-testid="${dataTestId}"]`)
    ).toBeInTheDocument();
  });

  it('forwards a ref to an appropriate node', () => {
    const ref = React.createRef();
    render(
      <WebTerminal closeTerminal={jest.fn()} open ref={ref}>
        Body content
      </WebTerminal>
    );
    expect(ref.current.classList.contains(blockClass)).toBeTruthy();
  });
});
