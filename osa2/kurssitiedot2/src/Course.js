import React from 'react'

const Course = ({course}) => {
    return (
      <div>
        <Header course = {course}/>
        <Content course = {course}/>
        <Total course = {course}/>
      </div> 
    )
}

const Header = ({course}) => {
    return (
      <h1>{course.name}</h1>
    )
}
  
  const Content = ({course}) => {
    return (
      <div>
        {course.parts.map(part => 
          <Part key={part.id} part = {part}/>
        )}
      </div>
    )
  }

  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    )
  }
  
  const Total = ({course}) => {
    const sum = course.parts.map(x=>x.exercises).reduce((x,y)=>x+y,0)
    return (
      <div>
        <p>
          <b>Total of {sum} exercises</b>    
        </p>
      </div>
    )
  }

  export default Course