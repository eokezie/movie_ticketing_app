import * as React from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  FlatList
} from 'react-native';

import { COLORS, SPACING } from '../theme/theme';
import { 
  upcomingMovies,
  nowPlayingMovies,
  popularMovies,
  baseImagePath
} from '../api/apiCalls';
import InputHeader from '../components/InputHeader';
import CategoryHeader from '../components/CategoryHeader';
import SubMovieCard from '../components/SubMovieCard';

const { width, height } = Dimensions.get('window');

const getNowPlayingMoviesList = async () => {
  try {
    let response = fetch(nowPlayingMovies);
    let json = (await response).json();
    return json;
  } catch (error: any) {
    console.error(error)
  }
}
const getUpcomingMoviesList = async () => {
  try {
    let response = fetch(upcomingMovies);
    let json = (await response).json();
    return json;
  } catch (error: any) {
    console.error(error)
  }
}
const getPopularMoviesList = async () => {
  try {
    let response = fetch(popularMovies);
    let json = (await response).json();
    return json;
  } catch (error: any) {
    console.error(error)
  }
}

const HomeScreen = ({navigation}: any) => {
  const [ nowPlayingMoviesList, setNowPlayingMoviesList ] = React.useState<any>(undefined);
  const [ popularMoviesList, setPopularMoviesList ] = React.useState<any>(undefined);
  const [ upcomingMoviesList, setUpcomingMoviesList ] = React.useState<any>(undefined);

  const searchMoviesFunction = () => {
    navigation.navigate('Search')
  };

  React.useEffect(() => {
    (async () => {
      let temNowPlaying = await getNowPlayingMoviesList();
      setNowPlayingMoviesList(temNowPlaying.results);

      let temPopular = await getPopularMoviesList();
      setPopularMoviesList(temPopular.results);

      let temUpcoming = await getUpcomingMoviesList();
      setUpcomingMoviesList(temUpcoming.results);
    })();
  }, []);

  if(
      nowPlayingMoviesList == undefined && 
      nowPlayingMoviesList == null &&
      popularMoviesList == undefined && 
      popularMoviesList == null &&
      upcomingMoviesList == undefined && 
      upcomingMoviesList == null
    ) {
    return (
      <ScrollView 
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.scrollViewContainer}
      >
        <StatusBar hidden />
        <View style={styles.inputHeaderContainer}>
          <InputHeader searchFunction={searchMoviesFunction} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.Orange} />
        </View>
      </ScrollView>
    )
  }
  return (
    <ScrollView 
      style={styles.container}
      bounces={false}
      contentContainerStyle={styles.scrollViewContainer}
    >
      <StatusBar hidden />

      <View style={styles.inputHeaderContainer}>
        <InputHeader searchFunction={searchMoviesFunction} />
      </View>

      {/* Render The npw playing movies component */}
      <CategoryHeader title={'Now Playing'} />
      {/* <FlatList 
        data={nowPlayingMoviesList}
        keyExtractor={(item:any) => item.id}
        horizontal
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}) => (
          <SubMovieCard
            title={item.original_title} 
            imagePath={baseImagePath('w342', item.poster_path)}
            shouldMarginatedAtEnd={true}
            cardFunction={() => {
              navigation.push('MovieDetails', {
                movieId: item.id
              })
            }}
            cardWidth={width / 3}
            isFirst={index === 0 ? true : false}
            isLast={index === upcomingMoviesList?.length - 1 ? true : false}
          /> 
        )}
      /> */}

      {/* Render the Popular movies component */}
      <CategoryHeader title={'Popular '} />
      <FlatList 
        data={popularMoviesList}
        keyExtractor={(item:any) => item.id}
        horizontal
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}) => (
          <SubMovieCard
            title={item.original_title} 
            imagePath={baseImagePath('w342', item.poster_path)}
            shouldMarginatedAtEnd={true}
            cardFunction={() => {
              navigation.push('MovieDetails', {
                movieId: item.id
              })
            }}
            cardWidth={width / 3}
            isFirst={index === 0 ? true : false}
            isLast={index === upcomingMoviesList?.length - 1 ? true : false}
          /> 
        )}
      />

      {/* Render the upcoming movies component */}
      <CategoryHeader title={'Upcoming'} />
      {/* <FlatList 
        data={upcomingMoviesList}
        keyExtractor={(item:any) => item.id}
        horizontal
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}) => (
          <SubMovieCard
            title={item.original_title} 
            imagePath={baseImagePath('w342', item.poster_path)}
            shouldMarginatedAtEnd={true}
            cardFunction={() => {
              navigation.push('MovieDetails', {
                movieId: item.id
              })
            }}
            cardWidth={width / 3}
            isFirst={index === 0 ? true : false}
            isLast={index === upcomingMoviesList?.length - 1 ? true : false}
          /> 
        )}
      /> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: COLORS.Black
  },
  scrollViewContainer: {
    flex: 1
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  inputHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28
  },
  containerGap36: {
    gap: SPACING.space_36
  }
});

export default HomeScreen;