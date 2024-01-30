import * as React from 'react';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions, View, Text, StyleSheet} from 'react-native';
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
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>No workout data to display.</Text>
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
    <View style={styles.chartContainer}>
      {chartData && (
        <LineChart
          data={chartData}
          width={screenWidth}
          height={chartHeight}
          yAxisLabel={'  '}
          yAxisSuffix={` ${mostRecentUnit}`}
          yAxisInterval={1}
          chartConfig={chartStyle}
          bezier
          style={{borderRadius: styles.chartContainer.borderRadius}}
        />
      )}
    </View>
  );
};

const chartStyle = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 8,
  },
  propsForDots: {
    r: '4',
    strokeWidth: '2',
    stroke: '#000000',
  },
};

const screenWidth = Dimensions.get('window').width - 40;
const chartHeight = screenWidth / 2;

const styles = StyleSheet.create({
  chartContainer: {
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#f0f0f0',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  noDataContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: chartHeight,
    backgroundColor: '#f0f0f0',
  },
  noDataText: {
    color: '#606060',
    fontFamily: 'Arial',
  },
});

export default WorkoutGraph;
