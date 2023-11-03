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

const SeatScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const movieState = useSelector(movie);

  const { id, cinema, schedule } = route.params;

  useEffect(() => {
    if (movieState.cinema === undefined) {
        dispatch(getCinema(id));
    } else {
      console.log(movieState.cinema);
    }
  }, [movieState.cinema]);

  const [choose, setChoose] = useState([]);

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
          <View style={{ maxHeight: 350 }}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{}}
            >
              <View style={styles.seatmap}>
                <View style={styles.screen}></View>
                <Text style={{ marginBottom: 30 }}>Screen this Way</Text>
                <View>
                  {true ? (
                    <View
                      style={{
                        marginTop: 100,
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center"
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
          >
            <Text style={[GlobalStyles.boldText]}>BOOK NOW</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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

const seats = [
  {
    row: "A",
    seat: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -1, -1, -1, 11, 12, 13, -1, -1, -1],
  },
  {
    row: "B",
    seat: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -1, -1, -1, 11, 12, 13, -1, -1, -1],
  },
  {
    row: "C",
    seat: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -1, -1, -1, 11, 12, 13, -1, -1, -1],
  },
  {
    row: "D",
    seat: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, -1, -1, -1],
  },
  {
    row: "E",
    seat: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 14, 15, 16],
  },
  {
    row: "F",
    seat: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 14, 15, 16],
  },
];
