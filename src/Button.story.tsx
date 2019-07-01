/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { ComponentProps } from "react";
import { storiesOf } from "@storybook/react";
import { Button } from "./Button";
// @ts-ignore We need to use `.tsx` because this will live next to the
// transpiled files that we can't import.
import { IconShip2 } from "../icons/IconShip2.tsx";
import { colors } from ".";
import * as typography from "./typography";
import { DemoSection } from "./shared/DemoSection";

const iconElement = <IconShip2 css={{ width: "100%", height: "100%" }} />;

/**
 * Wrap children with a rounded border
 */
const ButtonWrapper: React.FC = ({ children, ...otherProps }) => (
  <div
    {...otherProps}
    css={{
      border: `1px solid ${colors.silver.dark}`,
      borderRadius: 8,
      margin: 6
    }}
  >
    {children}
  </div>
);

const VerticalButtonGroup: React.FC<{
  buttonProps?: Partial<Omit<ComponentProps<typeof Button>, "children">>;
  darkButtonProps?: Partial<Omit<ComponentProps<typeof Button>, "children">>;
  children: JSX.Element | JSX.Element[];
  title: string;
}> = ({
  buttonProps = {},
  darkButtonProps = {},
  children,
  title,
  ...otherProps
}) => (
  <div {...otherProps} css={{ margin: "0 20px", width: 300 }}>
    <hr
      style={{
        height: 1,
        borderWidth: 0,
        backgroundColor: colors.silver.dark,
        marginBottom: 24
      }}
    />
    <div
      css={{
        ...typography.base.base,
        textTransform: "uppercase",
        fontWeight: 600,
        margin: 6
      }}
    >
      {title}
    </div>
    <div css={{ display: "flex", flexWrap: "wrap" }}>
      <ButtonWrapper>
        {React.Children.map(children, child => (
          <div css={{ margin: 12 }}>
            {React.cloneElement(child as any, buttonProps)}
          </div>
        ))}
      </ButtonWrapper>
      <ButtonWrapper
        css={{
          backgroundColor: colors.black.base
        }}
      >
        {React.Children.map(children, child => (
          <div css={{ margin: 12 }}>
            {React.cloneElement(child as any, {
              ...buttonProps,
              ...darkButtonProps,
              disabledBackgroundColor: colors.grey.dark
            })}
          </div>
        ))}
      </ButtonWrapper>
    </div>
  </div>
);

storiesOf("Space Kit", module)
  .addParameters({
    options: {
      showPanel: false
    }
  })
  .add("Button", () => (
    <div css={{ color: colors.black.base }}>
      <DemoSection
        title="Button Sizes"
        description="There are three different sizes of buttons, with the most common button being the default size. Small and large buttons are avialble for specific settings."
      >
        <VerticalButtonGroup title="Standard / Default">
          <Button>Default</Button>
          <Button icon={iconElement} />
        </VerticalButtonGroup>

        <VerticalButtonGroup title="Small">
          <Button size="small">Small</Button>
          <Button size="small" icon={iconElement} />
        </VerticalButtonGroup>

        <VerticalButtonGroup title="Large">
          <Button size="large">Large</Button>
          <Button size="large" icon={iconElement} />
        </VerticalButtonGroup>
      </DemoSection>

      <DemoSection
        title="Buttons Examples"
        description="Examples on how to configure buttons. Inspect these buttons with the React DevTools to understand usage"
      >
        <VerticalButtonGroup title="Example 1">
          <Button>Rest</Button>
          <Button forceHoverState>Hover</Button>
          <Button forceActiveState>Active</Button>
          <Button forceFocusState>Focused</Button>
          <Button disabled>Disabled</Button>
        </VerticalButtonGroup>

        <VerticalButtonGroup
          title="Example 2"
          buttonProps={{
            backgroundColor: colors.indigo.dark,
            hoverBackgroundColor: colors.indigo.darker,
            style: { color: colors.white }
          }}
        >
          <Button>Rest</Button>
          <Button forceHoverState>Hover</Button>
          <Button forceActiveState>Active</Button>
          <Button forceFocusState>Focused</Button>
          <Button disabled>Disabled</Button>
        </VerticalButtonGroup>

        <VerticalButtonGroup
          title="Example 3"
          buttonProps={{
            backgroundColor: colors.green.base,
            hoverBackgroundColor: colors.green.dark,
            style: { color: colors.white }
          }}
        >
          <Button>Rest</Button>
          <Button forceHoverState>Hover</Button>
          <Button forceActiveState>Active</Button>
          <Button forceFocusState>Focused</Button>
          <Button disabled>Disabled</Button>
        </VerticalButtonGroup>
      </DemoSection>

      <DemoSection
        title="Secondary & Icon Buttons"
        description="Secondary buttons can be used with primary buttons or as by themselves. Icon buttons are a good way to communicate more information about the button’s action."
      >
        <VerticalButtonGroup title="Secondary">
          <Button>Rest</Button>
          <Button forceHoverState>Hover</Button>
          <Button forceActiveState>Active</Button>
          <Button forceFocusState>Focused</Button>
          <Button disabled>Disabled</Button>
        </VerticalButtonGroup>

        <VerticalButtonGroup
          title="Buttons with icons"
          buttonProps={{
            icon: iconElement
          }}
        >
          <Button>Rest</Button>
          <Button forceHoverState>Hover</Button>
          <Button forceActiveState>Active</Button>
          <Button forceFocusState>Focused</Button>
          <Button disabled>Disabled</Button>
        </VerticalButtonGroup>

        <VerticalButtonGroup
          title="Icon only"
          buttonProps={{
            icon: iconElement
          }}
        >
          <React.Fragment>
            <Button css={{ marginRight: 6 }} icon={iconElement} />
            <Button css={{ marginLeft: 6 }} fab icon={iconElement} />
          </React.Fragment>
          <React.Fragment>
            <Button
              css={{ marginRight: 6 }}
              forceHoverState
              icon={iconElement}
            />
            <Button
              css={{ marginLeft: 6 }}
              forceHoverState
              fab
              icon={iconElement}
            />
          </React.Fragment>
          <React.Fragment>
            <Button
              css={{ marginRight: 6 }}
              forceActiveState
              icon={iconElement}
            />
            <Button
              css={{ marginLeft: 6 }}
              forceActiveState
              fab
              icon={iconElement}
            />
          </React.Fragment>
          <React.Fragment>
            <Button
              css={{ marginRight: 6 }}
              forceFocusState
              icon={iconElement}
            />
            <Button
              css={{ marginLeft: 6 }}
              forceFocusState
              fab
              icon={iconElement}
            />
          </React.Fragment>
          <React.Fragment>
            <Button css={{ marginRight: 6 }} disabled icon={iconElement} />
            <Button css={{ marginLeft: 6 }} disabled fab icon={iconElement} />
          </React.Fragment>
        </VerticalButtonGroup>
      </DemoSection>

      <DemoSection
        title="Hidden Button"
        description="As the name implies, the Simple button is a simpler approach on the standard buttons. It provides a lot of flexibility many buttons side-by-side and doesn’t clutter the interface as much as a standard button."
      >
        <VerticalButtonGroup
          title="Basic hidden button"
          buttonProps={{ hidden: true }}
          darkButtonProps={{
            style: { color: colors.grey.light },
            hoverBackgroundColor: colors.grey.dark,
            hiddenActiveBackgroundColor: colors.grey.darker
          }}
        >
          <Button>Rest</Button>
          <Button forceHoverState>Hover</Button>
          <Button forceActiveState>Active</Button>
          <Button forceFocusState>Focused</Button>
          <Button disabled>Disabled</Button>
        </VerticalButtonGroup>

        <VerticalButtonGroup
          title="Hidden color button"
          buttonProps={{
            hidden: true,
            style: { color: colors.blue.base },
            hiddenActiveBackgroundColor: colors.blue.lighter,
            hoverBackgroundColor: colors.blue.lightest
          }}
        >
          <Button>Rest</Button>
          <Button forceHoverState>Hover</Button>
          <Button forceActiveState>Active</Button>
          <Button forceFocusState>Focused</Button>
          <Button disabled>Disabled</Button>
        </VerticalButtonGroup>

        <VerticalButtonGroup
          title="Hidden button with icon"
          buttonProps={{ hidden: true, icon: iconElement }}
          darkButtonProps={{
            style: { color: colors.grey.light },
            hoverBackgroundColor: colors.grey.dark,
            hiddenActiveBackgroundColor: colors.grey.darker
          }}
        >
          <Button>Rest</Button>
          <Button forceHoverState>Hover</Button>
          <Button forceActiveState>Active</Button>
          <Button forceFocusState>Focused</Button>
          <Button disabled>Disabled</Button>
        </VerticalButtonGroup>
      </DemoSection>
    </div>
  ));
