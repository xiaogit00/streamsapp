import React from 'react'

import '../App.css'

const NavHeader = () => {

  const logoImgStyle = {
    paddingBottom:'10px'

  }

  const logoTextStyle = {
    fontFamily:'menlo',
    color: '#C435E8',
    fontSize: '1.4rem',
    fontStyle: 'italic',
    fontWeight: 'bold',
    position: 'relative',
    left: '-11px',
    letterSpacing: '.03rem'

  }
  const topWrapper = {
    height: '70px',
  }
  return (
    <div style={topWrapper}>
      <div className='nav-header-flexbox'>
      <img src="https://res.cloudinary.com/dl4murstw/image/upload/v1629771756/letter-s_1_qcxocz.png"
          width="50px" height="50px"
          alt="logo" style={logoImgStyle}/>
      <span style={logoTextStyle}> treams</span>
      </div>
    </div>
  )
}

export default NavHeader
