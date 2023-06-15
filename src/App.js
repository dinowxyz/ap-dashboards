import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/Navbar';
import LiquidityOverview from './components/Dashboards/LiquidityOverview/LiquidityOverview';
import StatusReport from './components/Dashboards/StatusReport/StatusReport';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/liquidity-overview" element={<LiquidityOverview />} />
        <Route path="/status-report" element={<StatusReport />} />
      </Routes>
    </Router>
  );
};

export default App;








// import logo from './logo.svg';
// import './App.css';
// import { useEffect } from 'react';
// import './App.css';

// function App() {
//   const fetchData = async () => {
//     const query = `
//       query Pools($chains: [String]!, $sortField: PoolSortFields, $sortDirection: SortDirections) {
//         pools(chains: $chains, sortField: $sortField, sortDirection: $sortDirection) {
//           chainId
//           poolLiquidityUsd
//           totalRewards {
//             apr
//           }
//           assets {
//             address
//             symbol
//           }
//         }
//       }
//     `;

//     const variables = {
//       "chains": ["phoenix-1", "injective-1"],
//       "sortField": "TVL",
//       "sortDirection": "DESC"
//     };

//     try {
//       const response = await fetch("https://develop-multichain-api.astroport.fi/graphql", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Accept": "application/json",
//         },
//         body: JSON.stringify({ query, variables }),
//       });

//       const data = await response.json();
//       console.log(data);

//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
