import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Checkbox, } from 'react-native-paper';
import GlobalStyles from '../GlobalStyles';
import { Octicons, FontAwesome } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';

const DropDown = ({ title, list }) => {
    const input = useRef(null);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState(list)
    const toggleOpen = () => setOpen(!open);
    const handleSearch = (value) => setSearch(value);

    useEffect(() => {
        const regexPattern = new RegExp(`^${search}`, 'i');
        const filteredArray = list.filter(item => regexPattern.test(item));
        setSearchResult(filteredArray)
    }, [search])

    useEffect(() => {
        if (open) input.current.focus();
    }, [open])


    return (
        <View style={{ width: '100%', position: 'relative', justifyContent: 'center' }}>
            <TouchableOpacity activeOpacity={0.5} style={{ width: '100%', height: 45, flexDirection: 'row', backgroundColor: '#E0E0E0', borderTopLeftRadius: 7, borderTopRightRadius: 7, paddingHorizontal: 10, borderBottomLeftRadius: open ? 0 : 7, borderBottomRightRadius: open ? 0 : 7, alignItems: 'center', gap: 3 }} onPress={toggleOpen}>
                <Octicons name="stack" size={20} color="black" />
                {open ?
                    <TextInput ref={input} placeholder={title} style={[GlobalStyles.input, GlobalStyles.normalText, { color: 'black', borderWidth: 0, paddingHorizontal: 8, flex: 1 }]} onChangeText={(value) => handleSearch(value)} /> :
                    <Text style={[GlobalStyles.normalText, { color: '#808080', fontSize: 17, borderWidth: 0, paddingHorizontal: 8, flex: 1 }]}>{title}</Text>
                }
                <FontAwesome name={open ? "caret-up" : "caret-down"} size={24} color="black" style={{ width: 25, textAlign: 'right', height: '1005', position: 'absolute', right: 10 }} />
            </TouchableOpacity>
            {
                open &&
                <View style={{ width: '99.6%', maxHeight: 130, paddingVertical: 10, alignItems: 'center', position: 'absolute', top: 45, backgroundColor: '#fcfcfc', borderBottomEndRadius: 7, borderBottomStartRadius: 7, elevation: 3, paddingHorizontal: 5, zIndex: 10, gap: 10 }}>
                    {searchResult.length > 0 ?
                        <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} style={{ width: '100%' }}>
                            {searchResult.map((item, index) => (
                                <ListItem key={index} text={item} />
                            ))}
                        </ScrollView> :
                        <Text style={[GlobalStyles.normalText, { letterSpacing: 0.3, fontSize: 15, paddingVertical: 4 }]}>No result</Text>
                    }
                </View>
            }
        </View >
    )
};
export default DropDown;


const ListItem = ({ text }) => {
    const [check, setCheck] = useState(false);
    const handleSelect = () => {
        setCheck(!check)
    }
    return (
        <TouchableOpacity activeOpacity={0.6} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%', gap: 5 }}
            onPress={handleSelect}
        >
            <Checkbox status={check ? 'checked' : 'unchecked'} color={"#808080"} />
            <Text style={[GlobalStyles.semiBoldText, { letterSpacing: 0.3 }]}>{text}</Text>
        </TouchableOpacity>
    )
}

