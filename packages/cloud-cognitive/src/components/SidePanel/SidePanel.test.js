/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import React from 'react';
import { TextInput } from 'carbon-components-react';
import { pkg } from '../../settings';
import uuidv4 from '../../global/js/utils/uuidv4';
import '../../utils/enable-all'; // must come before component is imported (directly or indirectly)
import { SidePanel } from '.';

const blockClass = `${pkg.prefix}--side-panel`;
const actionSetBlockClass = `${pkg.prefix}--action-set`;
const sizes = ['xs', 'sm', 'md', 'lg', 'max'];

const dataTestId = uuidv4();

const onRequestCloseFn = jest.fn();
const renderSidePanel = ({ ...rest }, children = <p>test</p>) =>
  render(
    <SidePanel
      {...{
        open: true,
        onRequestClose: onRequestCloseFn,
        ...rest,
      }}>
      {children}
    </SidePanel>
  );

// eslint-disable-next-line react/prop-types
const SlideIn = ({ placement, open }) => (
  <div>
    <SidePanel
      open={open}
      onRequestClose={onRequestCloseFn}
      slideIn
      pageContentSelector="#side-panel-test-page-content"
      placement={placement}>
      Content
    </SidePanel>
    <div id="side-panel-test-page-content" />
  </div>
);

describe('SidePanel', () => {
  it('renders the side panel', () => {
    const subtitle = uuidv4();
    const labelText = uuidv4();
    renderSidePanel({
      title: 'Test side panel',
      subtitle,
      labelText,
    });
    expect(screen.queryAllByText(/Test side panel/i)).toBeTruthy();
    expect(screen.getByText(subtitle));
    expect(screen.getByText(labelText));
  });

  it('should render a side panel with an overlay and trigger clickOutside hook when clicked', () => {
    const onRequestCloseFn = jest.fn();
    const { container } = renderSidePanel({
      includeOverlay: true,
      onRequestClose: onRequestCloseFn,
    });
    const overlayElement = container.querySelector(`.${blockClass}__overlay`);
    expect(overlayElement).toBeTruthy();
    userEvent.click(overlayElement);
    expect(onRequestCloseFn).toHaveBeenCalled();
  });

  it('should render a side panel from the right', () => {
    const { container } = renderSidePanel({
      placement: 'right',
    });
    const sidePanelOuter = container.querySelector(
      `.${blockClass}__container-right-placement`
    );
    expect(sidePanelOuter).toBeTruthy();
  });

  it('should render a side panel from the left', () => {
    const { container } = renderSidePanel({
      placement: 'left',
    });
    const sidePanelOuter = container.querySelector(
      `.${blockClass}__container-left-placement`
    );
    expect(sidePanelOuter).toBeTruthy();
  });

  it('should render a left slide in panel version', async () => {
    const { container, rerender } = render(<SlideIn placement="left" open />);
    const pageContent = container.querySelector(
      '#side-panel-test-page-content'
    );
    const style = getComputedStyle(pageContent);
    expect(style.marginLeft).toBe('30rem');
    const closeIconButton = container.querySelector(
      `.${blockClass}__close-button`
    );
    userEvent.click(closeIconButton);
    rerender(<SlideIn placement="left" open={false} />);
    const updatedStyles = getComputedStyle(pageContent);
    expect(updatedStyles.marginLeft).toBe('0px');
  });

  it('should render a right slide in panel version', async () => {
    const { container, rerender } = render(<SlideIn placement="right" open />);
    const pageContent = container.querySelector(
      '#side-panel-test-page-content'
    );
    const style = getComputedStyle(pageContent);
    expect(style.marginRight).toBe('30rem');
    const closeIconButton = container.querySelector(
      `.${blockClass}__close-button`
    );
    const outerElement = container.querySelector(`.${blockClass}`);
    userEvent.click(closeIconButton);
    fireEvent.animationStart(outerElement);
    rerender(<SlideIn placement="right" open={false} />);
    fireEvent.animationEnd(outerElement);
    const updatedStyles = getComputedStyle(pageContent);
    expect(updatedStyles.marginRight).toBe('0px');
  });

  it('should test overlay exit animation', async () => {
    const { container, rerender } = renderSidePanel({
      includeOverlay: true,
    });
    const closeIconButton = container.querySelector(
      `.${blockClass}__close-button`
    );
    userEvent.click(closeIconButton);
    rerender(
      <SidePanel includeOverlay open={false} onRequestClose={onRequestCloseFn}>
        Content
      </SidePanel>
    );
  });

  it('should render one primary action button', () => {
    const { container } = renderSidePanel({
      includeOverlay: true,
      actions: [
        {
          label: 'Primary button',
          onClick: () => {},
          kind: 'primary',
        },
      ],
    });
    const submitButtons = screen.queryAllByText('Primary button');
    const outerElement = container.querySelector(`.${blockClass}`);
    fireEvent.animationStart(outerElement);
    fireEvent.animationEnd(outerElement);
    expect(submitButtons).toHaveLength(1);
  });

  it('should render two action buttons', () => {
    renderSidePanel({
      actions: [
        {
          label: 'Action button',
          onClick: () => {},
          kind: 'primary',
        },
        {
          label: 'Action button',
          onClick: () => {},
          kind: 'secondary',
        },
      ],
    });
    const submitButtons = screen.queryAllByText('Action button');
    expect(submitButtons).toHaveLength(2);
  });

  it('should render a single ghost action button', () => {
    const { container } = renderSidePanel({
      actions: [
        {
          label: 'Ghost action button',
          onClick: () => {},
          kind: 'ghost',
        },
      ],
    });
    const sidePanelOuter = container.querySelector(
      `.${actionSetBlockClass}__action-button--ghost`
    );
    expect(sidePanelOuter).toBeTruthy();
  });

  it('should render a side panel with condensed actions', () => {
    renderSidePanel({
      condensedActions: true,
      actions: [
        {
          label: 'Primary button',
          onClick: () => {},
        },
      ],
    });
    const sidePanelAction = screen.getByText(/Primary button/i);
    expect(
      sidePanelAction.parentElement.classList.contains(
        `${blockClass}__actions-container-condensed`
      )
    ).toBeTruthy();
  });

  it('should render navigation button', () => {
    const { container } = renderSidePanel({
      currentStep: 1,
    });
    const navigationAction = container.querySelector(
      `.${blockClass}__navigation-back-button`
    );
    expect(navigationAction).toBeTruthy();
  });

  it('should click the navigation button', () => {
    const { fn } = jest;
    const { click } = userEvent;
    const onNavigationBackFn = fn();
    const { container } = renderSidePanel({
      currentStep: 1,
      onNavigationBack: onNavigationBackFn,
    });
    const navigationAction = container.querySelector(
      `.${blockClass}__navigation-back-button`
    );
    click(navigationAction);
    expect(onNavigationBackFn).toBeCalled();
  });

  it('should click the primary action button', () => {
    const { click } = userEvent;
    const onClick = jest.fn();
    renderSidePanel({
      actions: [
        {
          label: 'Primary button',
          onClick,
        },
      ],
    });
    const sidePanelAction = screen.getByText(/Primary button/i);
    click(sidePanelAction);
    expect(onClick).toBeCalled();
  });

  it('should click an action toolbar button', () => {
    const { click } = userEvent;
    const onActionToolbarButtonClickFn = jest.fn();
    const { container } = renderSidePanel({
      actionToolbarButtons: [
        {
          leading: true,
          label: 'Copy 1',
          onActionToolbarButtonClick: onActionToolbarButtonClickFn,
        },
        {
          label: 'Copy 2',
          onActionToolbarButtonClick: onActionToolbarButtonClickFn,
        },
      ],
    });
    const toolbarButton = container.querySelector(
      `.${blockClass}__action-toolbar-button`
    );
    click(toolbarButton);
    expect(onActionToolbarButtonClickFn).toHaveBeenCalled();
  });

  it('adds additional properties to the containing node', () => {
    renderSidePanel({ 'data-testid': dataTestId });
    screen.getByTestId(dataTestId);
  });

  it('forwards a ref to an appropriate node', () => {
    const ref = React.createRef();
    renderSidePanel({ ref });
    expect(ref.current).toEqual(screen.getByRole('complementary'));
  });

  it('should call the onRequestClose event handler', () => {
    const { click } = userEvent;
    const { container } = renderSidePanel();
    const closeIconButton = container.querySelector(
      `.${blockClass}__close-button`
    );
    click(closeIconButton);
    expect(onRequestCloseFn).toHaveBeenCalled();
  });

  it('should call the onNavigationBack event handler', () => {
    const onNavigationBackFn = jest.fn();
    const { click } = userEvent;
    const { container } = renderSidePanel({
      onNavigationBack: onNavigationBackFn,
      currentStep: 1,
    });
    const navigationButton = container.querySelector(
      `.${blockClass}__navigation-back-button`
    );
    click(navigationButton);
    expect(onNavigationBackFn).toHaveBeenCalled();
  });

  sizes.forEach((size) => {
    it('should render the correct size side panel', () => {
      const { container } = renderSidePanel({
        size,
      });
      const sidePanelOuter = container.querySelector(`.${blockClass}`);
      let sizeValue;
      switch (size) {
        case 'xs':
          sizeValue = 'extra-small';
          break;
        case 'sm':
          sizeValue = 'small';
          break;
        case 'lg':
          sizeValue = 'large';
          break;
        case 'max':
          sizeValue = 'max';
          break;
        default:
          sizeValue = 'medium';
          break;
      }
      expect(sidePanelOuter).toHaveClass(
        `${blockClass}__container--${sizeValue}`
      );
    });
  });

  it('should simulate onAnimationEnd synthetic event and set focus to specified element', async () => {
    const { container } = renderSidePanel(
      {
        open: true,
        selectorPrimaryFocus: '#test-input',
      },
      <TextInput labelText="Input A" id="test-input" placeholder="Test input" />
    );
    const outerElement = container.querySelector(`.${blockClass}`);
    fireEvent.animationStart(outerElement);
    fireEvent.animationEnd(outerElement);
    const inputElement = container.querySelector(`#test-input`);
    expect(inputElement).toHaveFocus();
  });

  it('should default focus to close button when selectorPrimaryFocus prop is not passed', () => {
    const { container } = renderSidePanel(
      {},
      <TextInput labelText="Input A" id="test-input" placeholder="Test input" />
    );
    const outerElement = container.querySelector(`.${blockClass}`);
    fireEvent.animationEnd(outerElement);
    const closeIconButton = container.querySelector(
      `.${blockClass}__close-button`
    );
    expect(closeIconButton).toHaveFocus();
  });

  it('should render slide in panel from left', () => {
    const { container } = render(
      <div>
        <SlideIn
          placement="left"
          open={false}
          pageContentSelector="#side-panel-test-page-content">
          Content
        </SlideIn>
        <div id="side-panel-test-page-content" />
      </div>
    );
    const pageContent = container.querySelector(
      '#side-panel-test-page-content'
    );
    const style = getComputedStyle(pageContent);
    expect(style.marginLeft).toBe('0px');
  });
});
