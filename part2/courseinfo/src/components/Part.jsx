const Part = ({key, part}) => {
  return (
    <li key={key}>
      {part.name} {part.exercises}
    </li>
  )
}
export default Part