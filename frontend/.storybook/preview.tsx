import React from 'react';
import type { Preview } from '@storybook/react';
import '../app/globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#F8F9FB' },
        { name: 'dark', value: '#07111F' },
      ],
    },
  },
  decorators: [
    (Story) => (
      <div className="font-sans antialiased text-[#141F33] p-8 min-h-screen">
        <Story />
      </div>
    ),
  ],
};

export default preview;
