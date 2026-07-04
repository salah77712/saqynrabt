import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    hoverEffect: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <h4 className="font-bold text-lg text-slate-800 dark:text-white">Card Title</h4>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
          This is an example body text inside a premium container.
        </p>
      </div>
    ),
    hoverEffect: true,
  },
};
