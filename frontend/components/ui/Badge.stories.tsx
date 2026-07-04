import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Primary: Story = {
  args: {
    children: 'Active',
    variant: 'primary',
  },
};

export const Success: Story = {
  args: {
    children: 'Completed',
    variant: 'success',
  },
};

export const Danger: Story = {
  args: {
    children: 'Overage Lock',
    variant: 'danger',
  },
};
