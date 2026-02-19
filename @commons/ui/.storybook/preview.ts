import type { Preview } from "@storybook/react";
import "../../../frontend/src/app/globals.css";

const preview: Preview = {
  parameters: {
    nextRouter: {
      path: "/",
      asPath: "/",
      query: {},
      push: () => {},
      replace: () => {},
      prefetch: () => Promise.resolve(),
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
