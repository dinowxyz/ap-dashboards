import React from 'react';
import './LiquidityOverview.css';
import logo from '../../../assets/StatusReport/logo.png';
import title from '../../../assets/StatusReport/title.png';
import Top10Pools from './Top10Pools/Top10Pools';

// import LiquidityPerDeployment from './LiquidityPerDeployment/LiquidityPerDeployment';
// import Top5Pools from './Top5Pools/Top5Pools';

const LiquidityOverview = () => {
  return (
    <div className="liquidity-overview">

        <div className='left-side'>
            <div className='logo'>
                <img src={logo} alt="logo" />
            </div>
        </div>

        <div className='main'>
            <div className='title'>
                <div className='titleFig'>
                    <img src={title} alt="title" />
                </div>
                <h1>Astroport Liquidity Overview</h1>
            </div>

            <div className='center'> 
              <div className='data'>
                <Top10Pools />
              </div>

              <div className='right-side'>

              </div>
            </div>
            
            <div className='date'>
              <p>data: </p>
            </div>
        </div>

    </div>
  );
};

export default LiquidityOverview;
