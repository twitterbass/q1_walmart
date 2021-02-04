import React from 'react'; 

function ListItem(props) {
  const data = props.data; 
  
  return (
    <div id='box'>
      <b>Title:</b> {data.title}<br></br>
      <b>Issue #:</b> {data.number}<br></br>
      <b>State:</b> {data.state}<br></br>
    </div>
  )
}

export default ListItem; 