import { StyleSheet, View, Text } from "react-native";
import GlobalStyles from "../../GlobalStyles";
import Place from "../../components/Show/PlaceCard";

const Places =({navigation, cinema, title})=>{

    return(
        <View>
            {/* <Text style={[GlobalStyles.boldText, styles.headline]}>
                PLACES
            </Text> */}

            {
                cinema.map((item,index)=>(
                    <Place key={index} data={item} navigation={navigation} id={item.id} title={title}/>
                ))
            }
        </View>

    )
}

export default Places;

const styles=StyleSheet.create({
    headline: {
        width: "100%",
        fontSize: 20,
        paddingHorizontal: 3,
        marginBottom: 10,
        marginTop:30,
    }
})

const cinemaArray = [
    {
        cinema: 'PVR Anupam : Saket',
        date: [
            {
                title: 26,
                month: 'Oct'
            },
            {
                title: 27,
                month: 'Oct'
            },
            {
                title: 28,
                month: 'Oct'
            },
            {
                title: 29,
                month: 'Oct'
            }
        ]
    },
    {
        cinema: 'Cinepolis Ambience, Vasant Kunj',
        date: [
            {
                title: 26,
                month: 'Oct'
            },
            {
                title: 27,
                month: 'Oct'
            },
            {
                title: 28,
                month: 'Oct'
            },
            {
                title: 29,
                month: 'Oct'
            }
        ]
    },
    {
        cinema: 'INOX Patel Nagar, Delhi',
        date: [
            {
                title: 26,
                month: 'Oct'
            },
            {
                title: 27,
                month: 'Oct'
            },
            {
                title: 28,
                month: 'Oct'
            },
            {
                title: 29,
                month: 'Oct'
            }
        ]
    },
]