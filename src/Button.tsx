/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import * as colors from "./colors";
import * as CSS from "csstype";
import { base } from "./typography";

// Types that could use some improvement:
// * Don't allow `children` and `icon` to be missing
// * Don't allow `children` when `FAB`
//
// I was able to get guarantees to work, but only with very cryptic errors. I
// decided it'd be best, for the time being, to `throw` if we use things
// incorrectly.
interface Props {
  /**
   * Background color to show in a non-disabled, non-active state
   */
  backgroundColor?: CSS.BackgroundColorProperty;

  /**
   * Background color to show when button is being hovered over and is not disabled
   */
  hoverBackgroundColor?: CSS.BackgroundColorProperty;

  /**
   * The content to show inside the button
   *
   * When using an icon, use the `icon` prop instead.
   */
  children?: React.ReactNode;

  /**
   * Class name to passthrough to the top level component
   */
  className?: string;

  /**
   * Disable the button
   *
   * This will prevent all clicks and will show the button in a different color
   */
  disabled?: boolean;

  /**
   * Background color to display when the button is disabled
   */
  disabledBackgroundColor?: CSS.BackgroundColorProperty;

  /**
   * Text color to display when the button is disabled
   */
  disabledTextColor?: CSS.BackgroundColorProperty;

  /**
   * Treat this button as a floating action button
   *
   * You must include an `icon` prop and you must _not_ include a `children`
   * prop for a floating action button.
   */
  fab?: boolean;

  /**
   * Force the button to be in the active state.
   *
   * Useful for Storybook
   *
   * @ignore
   */
  forceActiveState?: boolean;

  /**
   * Force the button to be in the focus state.
   *
   * Useful for Storybook
   *
   * @ignore
   */
  forceFocusState?: boolean;

  /**
   * Force the button to be in the hover state.
   *
   * Useful for Storybook
   *
   * @ignore
   */
  forceHoverState?: boolean;

  /**
   * A hidden button will have no background
   *
   * You should configure the `hiddenActiveBackgroundColor` prop if you are
   * using any custom colors.
   */
  hidden?: boolean;

  /**
   * Color to make the background for a hidden button that is active.
   *
   * This color should be darker than the `hoverBackgroundColor`.
   *
   * This should not be used for a non-hidden button.
   */
  hiddenActiveBackgroundColor?: CSS.BackgroundColorProperty;

  /**
   * Color to make the text for a focused hidden button.
   *
   * This should not be used for a non-hidden button.
   */
  hiddenFocusedColor?: CSS.ColorProperty;

  /**
   * Either an icon to show to the left of the button text, or on it's own
   */
  icon?: React.ReactElement;

  /**
   * Size of the button
   *
   * Defaults to "default"
   */
  size?: "default" | "small" | "large";

  /**
   * CSS styles to apply
   *
   * @ignore
   */
  style?: React.CSSProperties;
}

/**
 * Style system for Space Kit buttons
 *
 * This is intended to be used as an abstraction for your project's style guide.
 * There are way too many configuration options to use this component directly.
 *
 * @see https://zpl.io/amdN6Pr
 */
export const Button: React.FC<Props> = ({
  backgroundColor = colors.silver.light,
  children,
  disabled = false,
  disabledBackgroundColor = colors.silver.dark,
  disabledTextColor = colors.grey.light,
  fab = false,
  forceActiveState = false,
  forceFocusState = false,
  forceHoverState = false,
  hidden = false,
  hiddenActiveBackgroundColor = colors.silver.dark,
  hiddenFocusedColor = colors.blue.base,
  hoverBackgroundColor = colors.silver.base,
  icon,
  size = "default",
  ...otherProps
}) => {
  /**
   * Icon size in pixels
   *
   * This is stored so we can use the same value for `height` and `width`
   */
  const iconSize = size === "small" ? 12 : size === "large" ? 24 : 16;

  const iconOnly = !children;

  if (fab) {
    if (!icon) {
      throw new TypeError("FAB buttons are required to have an `icon`");
    } else if (children) {
      throw new TypeError("FAB buttons cannot have children, only an `icon`");
    }
  }

  if (forceActiveState && forceHoverState) {
    throw new TypeError(
      "Do not force multiple properties at once, you will get indeterminiate behavior"
    );
  }

  // We're storing this because it can be used for the `:active` style or when
  // `forceActiveState` is used in Storybook
  const activeProperties = {
    ...(hidden
      ? { backgroundColor: hiddenActiveBackgroundColor }
      : {
          // The `box-shadow` property is copied directly from Zeplin
          boxShadow:
            "inset 0 0 0 1px rgba(18, 21, 26, 0.2), inset 0 -1px 0 0 rgba(18, 21, 26, 0.05), inset 0 2px 2px 0 rgba(18, 21, 26, 0.12)"
        }),
    outline: 0
  };

  // We're storing this because it can be used for the `:hover` style or when
  // `forceHoverState` is used in Storybook
  const hoverProperties = {
    backgroundColor: hoverBackgroundColor,
    cursor: "pointer",
    ...(!hidden && {
      // The `box-shadow` property is copied directly from Zeplin
      boxShadow:
        "0 5px 10px 0 rgba(18, 21, 26, 0.12), inset 0 0 0 1px rgba(18, 21, 26, 0.2), inset 0 -1px 0 0 rgba(18, 21, 26, 0.05)"
    })
  };

  // We're storing this because it can be used for the `:focus` style or when
  // `forceFocusState` is used in Storybook
  const focusProperties = {
    // The `box-shadow` property is copied directly from Zeplin
    boxShadow:
      "0 1px 4px 0 rgba(18, 21, 26, 0.08), 0 0 0 2px #bbdbff, inset 0 0 0 1px #2075d6, inset 0 -1px 0 0 rgba(18, 21, 26, 0.05)",
    ...(hidden && { color: `${hiddenFocusedColor} !important` })
  };

  return (
    <button
      {...otherProps}
      css={{
        appearance: "button",
        backgroundColor: hidden
          ? "transparent"
          : disabled
          ? disabledBackgroundColor
          : backgroundColor,
        borderRadius: fab ? "100%" : 4,
        borderWidth: 0,
        ...(!hidden && {
          boxShadow:
            "0 1px 4px 0 rgba(18, 21, 26, 0.08), inset 0 0 0 1px rgba(18, 21, 26, 0.2), inset 0 -1px 0 0 rgba(18, 21, 26, 0.05)"
        }),
        minWidth: iconOnly
          ? size === "small"
            ? 28
            : size === "large"
            ? 42
            : 36
          : size === "small"
          ? 76
          : size === "large"
          ? 112
          : 100,
        padding: size === "small" ? `5px 8px` : size === "large" ? 8 : 7,
        ...(size === "small"
          ? base.small
          : size === "large"
          ? base.large
          : base.base),
        ...(!disabled &&
          (forceHoverState
            ? hoverProperties
            : {
                ":hover": hoverProperties
              })),
        fontWeight: 600,
        // Disable the outline because we're setting a custom `:active` style
        outline: 0,
        ...(disabled && { color: `${disabledTextColor} !important` }),
        ...(!disabled &&
          (forceFocusState ? focusProperties : { ":focus": focusProperties })),
        // This must come after `:focus` or the `:focus` state will override `:active`
        ...(!disabled && forceActiveState
          ? activeProperties
          : { ":active": activeProperties })
      }}
    >
      <div
        css={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {icon && (
          <span
            css={{
              display: "inline-block",
              width: iconSize,
              height: iconSize,
              margin: iconOnly ? "3px 0" : "0 4px 0"
            }}
          >
            {icon}
          </span>
        )}
        {children && <span>{children}</span>}
      </div>
    </button>
  );
};
