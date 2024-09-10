import React from "react"

const page = () => {
  return (
    <div className="h-screen">
      <iframe
        src={`/table?dataset=production&projectId=gq7ixli9&apiVersion=2021-10-21`}
        width='100%'
        height='100%'
        title='Property Listings Table'
      />
    </div>
  )
}
export default page
