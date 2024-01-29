import React from 'react';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions, View} from 'react-native';
import WorkoutProgressRecord from '../types/WorkoutProgressRecord';

interface WorkoutGraphProps {
  data: WorkoutProgressRecord[];
}

interface DataSet {
  data: number[];
  color: (opacity?: number) => string;
  strokeWidth: number;
}

const WorkoutGraph: React.FC<WorkoutGraphProps> = ({data}) => {
  const convertWeight = (
    weight: number,
    unit: string,
    targetUnit: string,
  ): number => {
    if (unit === targetUnit) {
      return weight;
    }
    return unit === 'kg' ? weight * 2.20462 : weight / 2.20462;
  };

  const getMostRecentUnit = (records: WorkoutProgressRecord[]): string => {
    if (
      records.length > 0 &&
      typeof records[records.length - 1].unit === 'string'
    ) {
      return records[records.length - 1].unit;
    }
    return 'kg';
  };

  const mostRecentUnit = getMostRecentUnit(data);

  const createDatasets = (data: any[]) => {
    const datasets = [];
    let currentDataset: DataSet = {
      data: [],
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      strokeWidth: 2,
    };
    data.forEach((item: {weight: number; unit: string}, index: number) => {
      if (index > 0) {
        const color = data[index - 1].success ? 'green' : 'red';
        currentDataset.color = (opacity = 1) =>
          `rgba(${color === 'green' ? '0, 128, 0' : '255, 0, 0'}, ${opacity})`;
      }
      currentDataset.data.push(
        convertWeight(item.weight, item.unit, mostRecentUnit),
      );

      if (
        index < data.length - 1 &&
        data[index].success !== data[index + 1].success
      ) {
        datasets.push(currentDataset);
        currentDataset = {
          data: [],
          color: currentDataset.color,
          strokeWidth: 2,
        };
      }
    });

    datasets.push(currentDataset);

    return datasets;
  };

  const chartData = {
    labels: data.map(d => d.date),
    datasets: createDatasets(data),
  };

  return (
    <View>
      <LineChart
        data={chartData}
        width={screenWidth}
        height={chartHeight}
        yAxisLabel={''}
        yAxisSuffix={mostRecentUnit}
        yAxisInterval={1}
        chartConfig={chartStyle}
        bezier
        style={chartMarginBorder}
      />
    </View>
  );
};

const chartStyle = {
  backgroundColor: '#e26a00',
  backgroundGradientFrom: '#fb8c00',
  backgroundGradientTo: '#ffa726',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};

const chartMarginBorder = {
  marginVertical: 8,
  borderRadius: 16,
};

const screenWidth = Dimensions.get('window').width;
const chartHeight = screenWidth / 2;

export default WorkoutGraph;
