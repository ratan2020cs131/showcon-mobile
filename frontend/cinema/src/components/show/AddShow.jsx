import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from "react-native";
import GlobalStyles from "../../GlobalStyles";
import Screens from './Screens';
import { FontAwesome } from '@expo/vector-icons';
import LanguageDropdown from '../Dropdown';
import ShowDates from './Date';

const AddShow = ({ navigation, movie }) => {
    return (
        <View style={styles.conatiner}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                contentContainerStyle={{ minHeight: '100%', alignItems: 'center' }}
            >
                <View style={{ flex: 1, padding: 20, gap: 20 }}>
                    <Screens />

                    <View style={{ paddingHorizontal: 20, gap: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                            <View style={{ width: '40%', position: 'relative', justifyContent: 'center', alignSelf: 'flex-start' }}>
                                <FontAwesome name="rupee" size={24} color="black" style={{ position: 'absolute', zIndex: 1, left: 10 }} />
                                <TextInput
                                    style={[GlobalStyles.input, GlobalStyles.normalText, { color: '#1E1F22', fontSize: 17, backgroundColor: '#e0e0e0', borderWidth: 0, paddingHorizontal: 30 }]}
                                    placeholder="Price"
                                    keyboardType={"numeric"}
                                />
                            </View>

                            <View style={{ width: '55%', position: 'relative', justifyContent: 'center', alignSelf: 'flex-start' }}>
                                <LanguageDropdown title="Select Lang" list={langList} set={() => { }} get={[]} />
                            </View>
                        </View>

                        <ShowDates date={movie}/>
                    </View>
                </View>
                <TouchableOpacity style={[GlobalStyles.button, { marginBottom: 20 }]}>
                    <Text style={GlobalStyles.boldText}>ADD SHOW</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}
export default AddShow;


const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        width: "100%",
        alignItems: 'flex-start',
        justifyContent: 'center'
    }
})

const langList = [
    'Hindi',
    'English',
    'Tamil',
    'Marathi'
]