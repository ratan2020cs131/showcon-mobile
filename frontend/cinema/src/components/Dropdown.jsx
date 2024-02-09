import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Checkbox, } from 'react-native-paper';
import GlobalStyles from '../GlobalStyles';
import { Octicons, FontAwesome } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';

const DropDown = ({ title, list, set, get }) => {
    const input = useRef(null);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState(list);
    const [selected, setSelected] = useState([]);
    const toggleOpen = () => setOpen(!open);
    const handleSearch = (value) => setSearch(value);

    useEffect(() => {
        const regexPattern = new RegExp(`^${search}`, 'i');
        const filteredArray = list.filter(item => regexPattern.test(item));
        setSearchResult(filteredArray)
    }, [search])
    useEffect(() => set(selected), [selected])

    useEffect(() => {
        // if (open) input.current.focus();
    }, [open])


    return (
        <View style={{ width: '100%', position: 'relative', justifyContent: 'center' }}>
            <TouchableOpacity activeOpacity={0.5} style={{ width: '100%', height: 45, flexDirection: 'row', backgroundColor: '#E0E0E0', borderTopLeftRadius: 7, borderTopRightRadius: 7, paddingHorizontal: 7, borderBottomLeftRadius: open ? 0 : 7, borderBottomRightRadius: open ? 0 : 7, alignItems: 'center', gap: 3 }} onPress={toggleOpen}>
                <Octicons name="stack" size={19} color="black" />
                {open ?
                    <TextInput ref={input}
                        placeholder={open ? 'Search' : title}
                        style={[GlobalStyles.input, GlobalStyles.normalText, { color: 'black', borderWidth: 0, paddingHorizontal: 8, flex: 1, fontSize: 17 }]}
                        onChangeText={(value) => handleSearch(value)} /> :
                    <View style={{ paddingLeft: 5, flexDirection: 'row', width: '65%', overflow: 'scroll' }}>
                        {get.length > 0 ?
                            <>
                                {get.map((item, index) => (<Text key={index} style={[GlobalStyles.normalText, { fontSize: 16 }]}>{selected.length - 1 === index ? item : item + ", "}</Text>))}
                            </> :
                            <Text style={[GlobalStyles.normalText, {color: '#707070', fontSize: 16 }]}>{title}</Text>
                        }
                    </View>
                }
                <FontAwesome name={open ? "caret-up" : "caret-down"} size={22} color="black" style={{ width: 25, textAlign: 'right', height: '1005', position: 'absolute', right: 10 }} />
            </TouchableOpacity>
            {
                open &&
                <View style={{left:-7, width: '103%', maxHeight: 130, paddingVertical: 10, alignItems: 'center', position: 'absolute', top: 45, backgroundColor: '#fcfcfc', borderBottomEndRadius: 7, borderBottomStartRadius: 7, elevation: 3, paddingHorizontal: 5, zIndex: 10, gap: 10 }}>
                    {searchResult.length > 0 ?
                        <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} style={{ width: '100%' }}>
                            {searchResult.map((item, index) => (
                                <ListItem key={index} text={item} setSelected={setSelected} get={get} />
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


const ListItem = ({ text, setSelected, get }) => {
    // const [check, setCheck] = useState(false);
    const handleSelect = (text) => {
        if (!get.includes(text)) {
            setSelected((prev) => [...prev, text]);
        } else {
            setSelected((prev) => prev.filter((item) => item !== text));
        }
    }

    return (
        <TouchableOpacity activeOpacity={0.6} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%', gap: 5 }}
            onPress={() => handleSelect(text)}
        >
            <Checkbox status={get.includes(text) ? 'checked' : 'unchecked'} color={"#F55139"} />
            <Text style={[GlobalStyles.semiBoldText, { letterSpacing: 0.3 }]}>{text}</Text>
        </TouchableOpacity>
    )
}

