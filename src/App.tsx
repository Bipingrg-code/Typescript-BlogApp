const App: React.FC = () => {
  console.log(import.meta.env.VITE_APPWRITE_URL);

  return (
    <div className="font-sans text-2xl">App</div>
  )
}

export default App