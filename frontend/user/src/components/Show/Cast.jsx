import { View, StyleSheet, Text, FlatList, Image } from "react-native";
import GlobalStyles from "../../GlobalStyles";

const Actor=({data})=>{
    const {name, img}=data;
    return(
        <View style={styles.cast}>
        <View style={styles.actor}>
            <Image source={{uri:img}} style={styles.image}/>
        </View>
        <Text style={[GlobalStyles.semiBoldText,{textAlign:'center'}]}>{name}</Text>
        </View>
    )
}

const Cast = ({data}) => {
    return (
        <View style={styles.container}>
            <Text style={[GlobalStyles.boldText, styles.headline]}>CAST</Text>
            <FlatList
                horizontal={true}
                data={data}
                renderItem={({ item }) => <Actor key={item._id} data={item}/>}
                keyExtractor={(item) => item._id}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default Cast;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 20
    },
    headline: {
        width: "100%",
        fontSize: 20,
        paddingHorizontal: 10,
        marginBottom: 10,
        marginTop: 30,
    },
    cast:{
        width:70,
        marginHorizontal:10,
        justifyContent:"center",
        alignItems:"center"
    },
    actor:{
        height:70,
        width:70,
        borderRadius:100,
    },
    image:{
        width:"100%",
        height:"100%",
        resizeMode:"cover",
        borderRadius:100
    }
})

// const castArray=[
//     {
//         id:1,
//         actor:"Keeanu Reeves",
//         image:Keeanu
//     },
//     {
//         id:2,
//         actor:"Iam McShane",
//         image:Ian
//     },
//     {
//         id:3,
//         actor:"Keeanu Reeves",
//         image:Keeanu
//     },
//     {
//         id:4,
//         actor:"Iam McShane",
//         image:Ian
//     },
//     {
//         id:5,
//         actor:"Keeanu Reeves",
//         image:Keeanu
//     },
//     {
//         id:6,
//         actor:"Iam McShane",
//         image:Ian
//     },
// ]