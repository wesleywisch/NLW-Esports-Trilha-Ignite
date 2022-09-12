
interface ButtonProps {
  title: string;
}

function Button({ title }: ButtonProps) {
  return (
    <button>
      {title}
    </button>
  )
}

function App() {
  return (
    <div>
      <Button title="Send 1" />
      <Button title="Send 2" />
      <Button title="Send 3" />
      <Button title="Hello world" />
    </div>
  )
}

export default App
