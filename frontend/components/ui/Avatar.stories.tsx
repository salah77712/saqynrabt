import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'UI/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    src: { control: 'text' },
    name: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    name: 'Sarah Al-Thani',
    size: 'md',
  },
};

export const WithImage: Story = {
  args: {
    name: 'Sarah Al-Thani',
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    size: 'lg',
  },
};
