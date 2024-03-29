import './App.css';
import { CentralInfoProvider } from './context';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useReducer } from 'react'
import { useCallback } from 'react'
import Welcome from './screens/welcome';
import GetSong from './screens/get-song';
import SelectSong from './screens/select-song';
import GetStartFormation from './screens/get-start-formation';
import GetMoreFormations from './screens/end-formations';
import GetCostume from './screens/get-costume';

function App() {
  const [state, dispatch] = useReducer(reducer, [])
  function reducer(state, action) {
    switch (action.type) {
      case 'update':
        return [...state, action.data]
      default:
        return []
    }
  }
  const updateCentralInfo = useCallback((data) => { dispatch({ "type": "update", data }) }, [])

  return (
    <CentralInfoProvider value={state}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/start" element={<GetSong updateCentralInfo={updateCentralInfo} />} />
          <Route path="/songs" element={<SelectSong updateCentralInfo={updateCentralInfo} />} />
          <Route path="/start-formations" element={<GetStartFormation updateCentralInfo={updateCentralInfo} />} />
          <Route path="/full-formations" element={<GetMoreFormations updateCentralInfo={updateCentralInfo} />} />
          <Route path="/costumes" element={<GetCostume updateCentralInfo={updateCentralInfo} />} />
        </Routes>
      </BrowserRouter>
    </CentralInfoProvider>
  );
}

export default App;
