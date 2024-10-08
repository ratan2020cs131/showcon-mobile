import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Seats from "../../components/Seating/Seats";
import ScreenWrapper from "../ScreenWrapper";
import GlobalStyles from "../../GlobalStyles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCinema, movie } from "../../Redux/Features/Movie/movieSlice";
import ModalView from "../../components/Modal";

const SeatScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const movieState = useSelector(movie);

  const {title, id, cinema, schedule } = route.params;
  const [choose, setChoose] = useState([]);
  const [visible, setModal] = useState([]);
  const onClose=()=>setModal(false)

  useEffect(() => {
    if (movieState.cinema === undefined) {
        dispatch(getCinema(id));
    } else {
      
    }
  }, [movieState.cinema]);

  const handleBook=()=>{
    if(choose.length > 0){
      navigation.navigate("PaymentScreen",{choose,cinema, title, schedule});
    }else{
      setModal(true);
    }
  }


  return (
    <ScreenWrapper title={cinema}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={[GlobalStyles.semiBoldText, styles.date]}>
              {schedule.title} {schedule}
            </Text>
          </View>
          <View style={{ maxHeight: 350, alignItems:'center' }}>
            <View style={styles.screen}></View>
            <Text style={[GlobalStyles.normalText,{ marginBottom: 30, paddingTop:10 }]}>Screen this Way</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{}}
            >
              <View style={styles.seatmap}>
                <View>
                  {movieState.isLoading ? (
                    <View
                      style={{
                        marginTop: 100,
                        width: "auto",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ActivityIndicator size="large" color="#F55139" />
                    </View>
                  ) : (
                    <View>
                      {movieState.cinema.seats&&
                      movieState.cinema.seats.map((item, index) => (
                        <Seats
                          key={index}
                          data={item}
                          choose={choose}
                          setChoose={setChoose}
                        />
                      ))}
                    </View>
                  )}
                </View>
              </View>
            </ScrollView>
          </View>

          {choose.length > 0 && (
            <View style={{ width: "100%", marginBottom: 50 }}>
              <Text style={[GlobalStyles.boldText, styles.headline]}>
                SELECTED
              </Text>
              <View
                style={{ flexDirection: "row", paddingHorizontal: 12, gap: 5 }}
              >
                {choose.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      backgroundColor: "#1E1F22",
                      borderRadius: 5,
                      paddingHorizontal: 8,
                      paddingVertical: 3,
                    }}
                  >
                    <Text style={{ color: "#E9E5D7" }}>
                      {item.row}
                      {item.no}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
          <TouchableOpacity
            style={[GlobalStyles.button, { marginTop: "auto" }]}
            onPress={handleBook}
          >
            <Text style={[GlobalStyles.boldText]}>BOOK NOW</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <ModalView title="Select Atleast One Seat" visible={visible} onClose={onClose}/>
    </ScreenWrapper>
  );
};

export default SeatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  seatmap: {
    flexDirection: "column",
    gap: 10,
    alignItems: "center",
    padding: 20,
  },
  screen: {
    width: 240,
    height: 6,
    backgroundColor: "#1E90FF",
  },
  header: {
    width: "100%",
    marginBottom: 50,
  },
  date: {
    fontSize: 18,
    paddingLeft: 10,
  },
  headline: {
    width: "100%",
    fontSize: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 30,
  },
});
