import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { CenteredFullViewPort } from 'shared/templates'

import { Tooltip } from '.'

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {}
} as ComponentMeta<typeof Tooltip>

const Template: ComponentStory<typeof Tooltip> = (args) => (
  <CenteredFullViewPort>
    <Tooltip {...args} />
  </CenteredFullViewPort>
)

export const Default = Template.bind({})
Default.args = {
  children: 'Hover me',
  tooltip: 'I`m a nice tooltip'
}
