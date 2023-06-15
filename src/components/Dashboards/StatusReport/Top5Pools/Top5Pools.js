import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Top5Pools = () => {
  const [pools, setPools] = useState([]);

  useEffect(() => {
    const fetchTopFivePools = async () => {
      try {
        const response = await axios.get('/api/data');
        setPools(response.data.top_five_pools);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTopFivePools();
  }, []);

  return (
    <div>
      <h2>Top 5 Pools by Liquidity</h2>
      <table>
        <thead>
          <tr>
            <th>Pool Name</th>
            <th>Pool Liquidity</th>
          </tr>
        </thead>
        <tbody>
          {pools.map((pool, index) => (
            <tr key={index}>
              <td>{pool.name}</td>
              <td>{pool.liquidity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Top5Pools;
