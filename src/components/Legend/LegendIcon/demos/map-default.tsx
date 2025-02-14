import { LegendIcon, LarkMap, CustomControl } from '@antv/larkmap';
import React from 'react';

const config = {
  mapType: 'GaodeV1' as const,
  mapOptions: {
    style: 'light',
    center: [120.210792, 30.246026] as [number, number],
    zoom: 9,
    // token: 'xxxx - token',
  },
};
export default () => {
  return (
    <LarkMap {...config} style={{ height: '300px' }}>
      <CustomControl position="bottomleft">
        <LegendIcon
          style={{ background: '#fff', padding: 8 }}
          labels={['枫叶图标', '火车图标', '小汽车图标']}
          icons={[
            'https://gw.alipayobjects.com/mdn/rms_5e897d/afts/img/A*6ONoRKNECC0AAAAAAAAAAAAAARQnAQ',
            'https://gw.alipayobjects.com/zos/bmw-prod/e21321e0-8f4a-474f-a0ee-2176492bb824.svg',
            'https://gw.alipayobjects.com/zos/bmw-prod/7fb22e05-4488-4597-8e33-fc03716d2b0a.svg',
          ]}
        />
      </CustomControl>
    </LarkMap>
  );
};
