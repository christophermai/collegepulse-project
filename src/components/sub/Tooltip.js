import React from 'react'
import { Icon, Popup } from 'semantic-ui-react'

const Tooltip = ({content}) => {
  return(
    <Popup 
      trigger={<Icon name='info circle' size='small'/>} 
      content={content}
      position='bottom center' 
    />
  )
}

export default Tooltip