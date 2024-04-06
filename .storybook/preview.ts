import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    chakra: {
      theme: (theme) => {
        return theme;
      },
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
