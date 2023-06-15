import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import * as d3 from 'd3';
import astroport from '../../../../assets/StatusReport/astroport.png';
import terra from '../../../../assets/StatusReport/terra.png';
import injective from '../../../../assets/StatusReport/injective.png';

const LiquidityPerDeployment = () => {
  const [ltvData, setLtvData] = useState([]);
  const chartRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5001/api/data');
        const data = response?.data?.ltv_data;
        if (data) {
          setLtvData(JSON.parse(data));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (ltvData.length === 0 || !chartRef.current) {
      return;
    }

    const svg = d3.select(chartRef.current);
    svg.selectAll('*').remove();
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;
    const innerRadius = radius - 32;

    const arc = d3.arc().outerRadius(radius).innerRadius(innerRadius);
    const pie = d3.pie().startAngle(-Math.PI * 1.3 / 2).endAngle(Math.PI * 1.3 / 2).sort(null).value((d) => d.totalLiquidityUsd);

    const totalLiquidity = ltvData.reduce((acc, chain) => acc + chain.totalLiquidityUsd, 0);
    const pieData = ltvData.map((chain) => ({
      ...chain,
      totalLiquidityUsd: chain.totalLiquidityUsd / totalLiquidity,
      color: chain.chainId === 'injective-1' ? '#83FFCB' : '#534AF9',
    }));

    const g = svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`);

    const arcs = g.selectAll('.arc').data(pie(pieData)).enter().append('g').attr('class', 'arc');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', (d) => d.data.color)
      .on('mouseover', function (event, d) {
        d3.select(this).transition().duration(200).style('fill', d3.rgb(d.data.color).brighter());
      })
      .on('mouseout', function (event, d) {
        d3.select(this).transition().duration(200).style('fill', d.data.color);
      });

    arcs.append('line')
      .attr('x1', (d) => arc.centroid(d)[0] * 1.1)
      .attr('y1', (d) => arc.centroid(d)[1] * 1.1)
      .attr('x2', (d) => arc.centroid(d)[0] * 1.4)
      .attr('y2', (d) => arc.centroid(d)[1] * 1.4)
      .attr('stroke', (d) => d.data.color)
      .attr('stroke-width', 2);

    arcs.append('text')
      .attr('x', (d) => arc.centroid(d)[0] * 1.5)
      .attr('y', (d) => arc.centroid(d)[1] * 1.5)
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .text((d) => `${(d.data.totalLiquidityUsd * totalLiquidity).toFixed(1)}M`);

      const image = svg
      .append('image')
      .attr('xlink:href', astroport)
      .attr('width', innerRadius)
      .attr('height', innerRadius)
      .attr('x', width / 2 - innerRadius / 2)
      .attr('y', height / 2 - innerRadius / 2);

    const logoImages = {
      'phoenix-1': terra,
      'injective-1': injective,
    };

    arcs
      .append('image')
      .attr('xlink:href', (d) => logoImages[d.data.chainId])
      .attr('x', (d) => arc.centroid(d)[0] * 1.25 - 15)
      .attr('y', (d) => arc.centroid(d)[1] * 1.25 - 15)
      .attr('width', 30)
      .attr('height', 30);

    const totalTVLText = svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', height)
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .text(`Total TVL: ${(totalLiquidity / 1000000).toFixed(1)}M`);
  }, [ltvData, chartRef]);

  return (
    <div>
      <h3>Liquidity per Deployment</h3>
      <svg ref={chartRef} width="400" height="400" />
    </div>
  );
};

export default LiquidityPerDeployment;