import React from 'react';
import {LineChart} from 'react-native-chart-kit';
import {View} from 'react-native';
import WorkoutProgressRecord from '../types/WorkoutProgressRecord';

// TypeScript interface for the props
interface WorkoutGraphProps {
  data: WorkoutProgressRecord[];
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

  const mostRecentUnit = data.length > 0 ? data[data.length - 1].unit : 'kg';

  const createDatasets = (data: any[]) => {
    const datasets = [];
    let currentDataset = {
      data: [],
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Default color
      strokeWidth: 2,
    };

    data.forEach((item: {weight: number; unit: string}, index: number) => {
      if (index > 0) {
        // Determine color based on the success of the previous data point
        const color = data[index - 1].success ? 'green' : 'red';
        currentDataset.color = (opacity = 1) =>
          `rgba(${color === 'green' ? '0, 128, 0' : '255, 0, 0'}, ${opacity})`;
      }

      currentDataset.data.push(
        convertWeight(item.weight, item.unit, mostRecentUnit),
      );

      // If the success value changes, start a new dataset
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

    // Add the last dataset
    datasets.push(currentDataset);

    return datasets;
  };

  // Prepare chart data
  const chartData = {
    labels: data.map(d => d.date),
    datasets: createDatasets(data),
  };

  return (
    <View>
      <LineChart
        data={chartData}
        width={/* width of the chart */}
        height={/* height of the chart */}
        yAxisLabel={''}
        yAxisSuffix={mostRecentUnit}
        yAxisInterval={1}
        chartConfig={{
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
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default WorkoutGraph;
