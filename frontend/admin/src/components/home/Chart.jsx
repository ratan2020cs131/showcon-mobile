import { View, Text, StyleSheet } from 'react-native';
// import { BarChart, Grid } from 'react-native-svg-charts'

const Chart = ({ navigation }) => {
    const fill = 'rgb(134, 65, 244)'
    const data = [50, 10, 40, 95, -4, -24, null, 85, undefined, 0, 35, 53, -53, 24, 50, -20, -80]

    return (
        <View style={styles.container}>
            {/* <BarChart style={{ height: 200 }} data={data} svg={{ fill }} contentInset={{ top: 30, bottom: 30 }}>
                <Grid />
            </BarChart> */}
        </View>
    )
}
export default Chart;

const styles = StyleSheet.create({
    container: {
        width: 310,
        height: 150,
        borderRadius: 7,
        backgroundColor: '#e0e0e0',
        elevation: 10
    },
})
