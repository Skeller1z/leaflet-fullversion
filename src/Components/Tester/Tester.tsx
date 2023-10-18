import React, { useState } from "react";
import SelectBox from "devextreme-react/select-box";
import {
  Chart,
  Series,
  ArgumentAxis,
  CommonSeriesSettings,
  CommonAxisSettings,
  Grid,
  Export,
  Legend,
  Margin,
  Tooltip,
  Label,
  Format,
} from "devextreme-react/chart";
import {
  architectureSources,
  sharingStatisticsInfo,
  seriesTypeLabel,
} from "./data";
import { useNavigate } from "react-router-dom";

const Tester: React.FC = () => {
  const [type, setType] = useState<string>("spline");
  const types = ["spline", "stackedspline", "fullstackedspline"];

  const handleChange = (e: any) => {
    setType(e.value);
  };

  const ChangePath = (e: any) => {
    navigate("/ImageTest")
  };

  const navigate = useNavigate();

  return (
    <>
      <Chart
        palette="Violet"
        dataSource={sharingStatisticsInfo}
        title="Architecture Share Over Time (Count)"
      >
        <CommonSeriesSettings argumentField="year" type={type} />
        <CommonAxisSettings>
          <Grid visible={true} />
        </CommonAxisSettings>
        {architectureSources.map(
          (item: { value: React.Key | null | undefined; name: any }) => (
            <Series key={item.value} valueField={item.value} name={item.name} />
          )
        )}
        <Margin bottom={20} />
        <ArgumentAxis allowDecimals={false} axisDivisionFactor={60}>
          <Label>
            <Format type="decimal" />
          </Label>
        </ArgumentAxis>
        <Legend verticalAlignment="top" horizontalAlignment="right" />
        <Export enabled={true} />
        <Tooltip enabled={true} />
      </Chart>
      
      <div className="options">
        <div className="caption">Options</div>
        <div className="option">
          <span>Series Type </span>
          <SelectBox
            dataSource={types}
            inputAttr={seriesTypeLabel}
            value={type}
            onValueChanged={handleChange}
          />
        </div>
      </div>
      <button onClick={ChangePath} >Image</button>
    </>
  );
};

export default Tester;
