import './Title.css'

function Title({ text }) {
  return (
    <header>
      <h1 className="title">{text}</h1>
    </header>
  )
}

export default Title