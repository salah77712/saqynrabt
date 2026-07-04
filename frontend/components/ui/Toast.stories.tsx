import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'UI/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'error', 'info'],
    },
    message: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Success: Story = {
  args: {
    message: 'Configuration successfully updated.',
    type: 'success',
  },
};

export const Error: Story = {
  args: {
    message: 'Failed to synchronize with NeonDB.',
    type: 'error',
  },
};
