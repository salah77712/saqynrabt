import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    title: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: 'Configure Channel Gateway',
    children: (
      <div>
        <p className="mb-4 text-xs text-slate-500">Provide endpoint authentication headers for Vapi nodes.</p>
        <div className="flex justify-end gap-2">
          <button className="h-9 px-4 rounded-xl text-xs font-semibold bg-gray-100 hover:bg-gray-200">Cancel</button>
          <button className="h-9 px-4 rounded-xl text-xs font-semibold bg-navy text-white hover:opacity-90">Save Config</button>
        </div>
      </div>
    ),
  },
};
