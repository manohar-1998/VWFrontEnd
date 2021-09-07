import React from 'react'
import TheContent from './TheContent'
import TheHeader from './TheHeader'

const TheLayout = () => {
  return (
    <div className="c-app c-default-layout">
      {/* <TheSidebar/> */}
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          <TheContent/>
        </div>
      </div>
    </div>
  )
}
export default TheLayout