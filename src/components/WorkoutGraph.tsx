import * as React from 'react';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions, View, Text, ViewStyle} from 'react-native';
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
  console.log('Initial data:', data);

  if (data.length === 0) {
    return (
      <View style={noDataStyles}>
        <Text>No workout data to display.</Text>
      </View>
    );
  }

  data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

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

  const createDatasets = (data): DataSet[] => {
    const dataset: DataSet = {
      data: data.map(item =>
        convertWeight(item.weight, item.unit, mostRecentUnit),
      ),
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
      strokeWidth: 2,
    };
    return [dataset];
  };
  const chartData = {
    labels: data.map(d => d.date),
    datasets: createDatasets(data),
  };
  console.log('Chart data:', chartData.datasets);

  return (
    <View>
      {chartData && (
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
      )}
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

const screenWidth = Dimensions.get('window').width - 16;
const chartHeight = screenWidth / 2;

const noDataStyles: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  height: chartHeight,
};

export default WorkoutGraph;
