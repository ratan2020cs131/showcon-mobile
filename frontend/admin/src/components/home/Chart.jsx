import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { BarChart } from "react-native-chart-kit";

const Chart = ({ navigation }) => {
    const data = {
        labels: ["10", "15", "20", "25", "30"],
        datasets: [
            {
                data: [20, 45, 28, 43, 50]
            }
        ]
    };

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false} nestedScrollEnabled={true}
                contentContainerStyle={{ justifyContent: 'center' }}>
                <BarChart
                    // style={graphStyle}
                    data={data}
                    width={320}
                    height={200}
                    yAxisLabel="$"
                    chartConfig={{
                        backgroundColor: "#1E1F22",
                        backgroundGradientFrom: "#1E1F22",
                        backgroundGradientTo: "#F55139",
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    }}
                    verticalLabelRotation={30}
                />
            </ScrollView>
        </View>
    )
}
export default Chart;

const styles = StyleSheet.create({
    container: {
        width: 320,
        height: 200,
        borderRadius: 7,
        backgroundColor: '#e0e0e0',
        elevation: 10,
        overflow: 'hidden'
    },
})
