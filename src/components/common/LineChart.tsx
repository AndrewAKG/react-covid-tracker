import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface Dataset {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
}

interface LineChartProps {
    text: string;
    data: {
        labels: string[];
        datasets: Dataset[];
    };
}

export const LineChart = ({ data, text }: LineChartProps) => {
    return (
        <Line
            data={data}
            options={{
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top' as const
                    },
                    title: {
                        display: true,
                        text
                    }
                }
            }}
        />
    );
};
