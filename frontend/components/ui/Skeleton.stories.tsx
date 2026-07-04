import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'UI/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Text: Story = {
  args: {
    variant: 'text',
    className: 'w-64',
  },
};

export const Circular: Story = {
  args: {
    variant: 'circular',
    className: 'h-12 w-12',
  },
};

export const Rectangular: Story = {
  args: {
    variant: 'rectangular',
    className: 'h-32 w-full',
  },
};
