import Part from './Part'
const Content = ({parts}) => {
  return (
    <div>
      {
        parts.map(value => <Part key={value.id} part={value}/>)
      }
    </div>
  )
}

export default Content