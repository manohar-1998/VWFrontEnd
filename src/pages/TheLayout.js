import React from 'react'
import TheHome from './Leaves/TheHome'
import TheContent from './TheContent'
import TheHeader from './TheHeader'

const TheLayout = () => {
  return (
    <div className="c-app c-default-layout">
      {/* <TheSidebar/> */}
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          {/* <TheContent/> */}
          <TheHome/>
        </div>
      </div>
    </div>
  )
}
export default TheLayout