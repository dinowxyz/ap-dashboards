import React from 'react';
import './StatusReport.css';
import logo from '../../../assets/StatusReport/logo.png';
import title from '../../../assets/StatusReport/title.png';
import LiquidityPerDeployment from './LiquidityPerDeployment/LiquidityPerDeployment';
// import Top5Pools from './Top5Pools/Top5Pools';

const StatusReport = () => {
  return (
    <div className="status-report">

        <div className='side'>
            <div className='logo'>
                <img src={logo} alt="logo" />
            </div>
        </div>

        <div className='main'>
            <div className='top'>
                <div className='title'>
                    <div className='titleFig'>
                        <img src={title} alt="title" />
                    </div>
                    <h1>Astroport Weekly Status Report</h1>
                </div>
            
                <div className='data'>
                    <div className='liquidity'>
                        <LiquidityPerDeployment />
                    </div>

                    <div className='rightData'>
                        <div className='top5Pools'>
                            {/* <Top5Pools /> */}
                        </div>

                        <div className='dailyFeeCapture'>
                            <h3>Daily Fee Capture per Deployment</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className='bottom'>
                <p>Date</p>
            </div>
        </div>

    </div>
  );
};

export default StatusReport;
