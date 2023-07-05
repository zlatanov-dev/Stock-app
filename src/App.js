import { Layout } from "antd";
import "./App.css";
import { Navbar, Homepage } from "./components";
import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="app">
      <div className="navbar">
        < Navbar />
      </div>
      <Layout>
          <div className="routes">
            <Routes>
              <Route path="/" element={<Homepage />} />
            </Routes>
          </div>
        </Layout>
    
    </div>
  )
}

export default App