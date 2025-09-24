import React from 'react'

function Icons({icons}) {
  return (

        <div className='flex items-center space-x-3 text-blue-400 hover:text-blue-300 hover:scale-105 hover:cursor-pointer transition'>
            <span>{icons}</span>
        </div>

  )
}

export default Icons
