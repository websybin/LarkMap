import type { ChoroplethLayerStyleAttributeValue, ChoroplethLayerProps } from '@antv/larkmap';
import { LarkMap, ChoroplethLayer, CustomControl, ChoroplethLayerStyleAttribute } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';

const FieldList = [
  { type: 'string', lable: '区域名称', value: 'name', typeColor: 'green', typeName: '文本' },
  { type: 'number', lable: '区域编码', value: 'adcode', typeColor: 'gold', typeName: '数值' },
];
const DefaultChoroplethLayerStyle = {
  fillColor: {
    field: 'adcode',
    value: ['#0f9960', '#33a02c', '#377eb8'],
  },
  opacity: 0.3,
  strokeColor: 'blue',
  lineWidth: 1,
  lineOpacity: 1,
  label: {
    field: 'name',
    visible: true,
    style: { fill: 'blue', fontSize: 18, textAnchor: 'center' as const },
  },
};

const choroplethLayerOptions: Omit<ChoroplethLayerProps, 'source'> = {
  autoFit: true,
  state: {
    active: { strokeColor: 'green', lineWidth: 2, lineOpacity: 1 },
  },
  ...DefaultChoroplethLayerStyle,
};

export default () => {
  const [layerOptions, setLayerOptions] = useState(choroplethLayerOptions);
  const [layerSource, setLayerSource] = useState({
    data: { type: 'FeatureCollection', features: [] },
    parser: { type: 'geojson' },
  });

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/antfincdn/Y8eGLb9j9v/hangzhou-district.json')
      .then((response) => response.json())
      .then((data: any) => {
        setLayerSource((prevState) => ({ ...prevState, data }));
      });
  }, []);

  return (
    <LarkMap mapType="GaodeV1" style={{ height: '400px', overflow: 'hidden' }}>
      <CustomControl position="topleft" style={{ width: '300px', background: '#fff', padding: '10px' }}>
        <h3>属性配置</h3>
        <ChoroplethLayerStyleAttribute
          style={{ overflowX: 'hidden', overflowY: 'auto', maxHeight: '300px' }}
          initialValues={DefaultChoroplethLayerStyle}
          fieldList={FieldList}
          onChange={(values: ChoroplethLayerStyleAttributeValue) => {
            // console.log('values: ', values);
            setLayerOptions(values);
          }}
        />
      </CustomControl>
      <ChoroplethLayer {...layerOptions} source={layerSource} />
    </LarkMap>
  );
};
