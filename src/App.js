import logo from "./logo.svg";
import "./App.css";
import Api from "./Api";
import Navigation from "./Navigation";
function App() {
  return (
    <div className="App">
      <Navigation />
      <Api />
    </div>
  );
}

export default App;
