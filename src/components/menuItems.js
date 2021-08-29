//**********************************************
//*             Documentation
//**********************************************
// MenuItem container. Gets passed an array of objects.
// Maps over the array in render to display each menu item. 
import React from 'react'
import '../App.css'
import MenuItem from './menuItem'

const MenuItems = ({menuItems}) => {
  return (
    <div className='menu-items-container'>
      {/* Here i'll need to map over array to display data*/}
      {menuItems.map((menuItem, i) => {
        return(
          <MenuItem
          menuInfo={menuItem}
          key={i} />
        )

      })}
    </div>
  )
}

export default MenuItems
