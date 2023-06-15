import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Top10Pools.css';

// The known IBC addresses and their corresponding token symbols
const ibcAddressSymbolMap = {
  'ibc/08095CEDEA29977C9DD0CE9A48329FDA622C183359D5F90CF04CC4FF80CBE431': 'stLUNA',
  'ibc/AC87717EA002B0123B10A05063E69BCA274BA2C44D842AEEB41558D2856DCE93': 'stINJ',
  'ibc/EBD5A24C554198EBAF44979C5B4D2C2D312E6EBAB71962C92F735499C7575839': 'ASTRO'
  // Add more mappings here as needed
};

const Top10Pools = () => {
  const [pools, setPools] = useState([]);

  useEffect(() => {
    const fetchTopTenPools = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5001/api/data');
        const topTenPools = JSON.parse(response.data.top_ten_pools);
        topTenPools.forEach(pool => {
          const pair = pool.asset_symbols.split('-');
          pair.forEach((token, index) => {
            if (ibcAddressSymbolMap[token]) {
              pair[index] = ibcAddressSymbolMap[token];
            }
          });
          pool.asset_symbols = pair.join('-');
        });
        setPools(topTenPools);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTopTenPools();
  }, []);

  const formatLiquidity = (value) => {
    return `${(value / 1000000).toFixed(2)}M`;
  };

  return (
    <div>
      {/* <h2>Top 10 Pools by Liquidity</h2> */}
      <table>
        <thead>
          <tr>
            <th>Pool Pair</th>
            <th>Network</th>
            <th>Liquidity</th>
            <th>Rewards</th>
            <th>Combined APR</th>
          </tr>
        </thead>
        <tbody>
          {pools.map((pool, index) => (
            <tr key={index}>
              <td>{pool.asset_symbols}</td>
              <td>{pool.chainId}</td>
              <td>{formatLiquidity(pool.poolLiquidityUsd)}</td>
              <td></td>
              <td>{pool['totalRewards.apr'] !== undefined ? pool['totalRewards.apr'] : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Top10Pools;