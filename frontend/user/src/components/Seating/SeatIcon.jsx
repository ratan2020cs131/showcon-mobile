import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
const SeatIcon=({data, row, choose, setChoose})=>{
    const[seat, setSeat]=useState(false);
    let temp={};

    return(
        <TouchableOpacity style={seat?styles.selected:styles.seat} onPress={()=>{
            if(!seat){
                temp.row=row;
                temp.no=data;
                setChoose(choose.concat(temp));
            }else{
                const updatedArray = choose.filter(item => {
                    if(item.no===data&&item.row===row){

                    }else{
                        return item;
                    }
                });
                setChoose(updatedArray);
            }
            setSeat(!seat)}
        }></TouchableOpacity>
    )
}

export default SeatIcon;

const styles = StyleSheet.create({
    seat:{
        width:18,
        height:18,
        borderColor:'#1E1F22',
        borderRadius:3,
        borderWidth:1
    },
    selected:{
        width:18,
        height:18,
        backgroundColor:'#F55139',
        borderRadius:2,
    }
})