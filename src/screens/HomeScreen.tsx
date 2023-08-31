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
import MovieCard from '../components/MovieCard';

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
      setNowPlayingMoviesList([
        {id: 'dummy1'},
        ...temNowPlaying.results,
        {id: 'dummy2'}
      ]);

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
    >
      <StatusBar hidden />

      <View style={styles.inputHeaderContainer}>
        <InputHeader searchFunction={searchMoviesFunction} />
      </View>

      {/* Render The npw playing movies component */}
      <CategoryHeader title={'Now Playing'} />
      <FlatList 
        data={nowPlayingMoviesList}
        keyExtractor={(item:any) => item.id}
        horizontal
        bounces={false}
        snapToInterval={width * 0.7 + SPACING.space_36}
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}) => {
          if(!item.original_title) {
            return (
              <View style={{width: (width - (width * 0.7 + SPACING.space_36 * 2)) / 2}}></View>
            )
          }
          return (
            <MovieCard
              title={item.original_title} 
              imagePath={baseImagePath('w780', item.poster_path)}
              shouldMarginatedAtEnd={true}
              cardFunction={() => {
                navigation.push('MovieDetails', {
                  movieId: item.id
                })
              }}
              cardWidth={width * 0.7}
              isFirst={index === 0 ? true : false}
              isLast={index === upcomingMoviesList?.length - 1 ? true : false}
              genre={item.genre_ids.slice(1,4)}
              vote_average={item.vote_average}
              vote_count={item.vote_count}
            /> 
          )
        }}
      />

      {/* Render the Popular movies component */}
      <CategoryHeader title={'Popular '} />
      <FlatList 
        data={popularMoviesList}
        keyExtractor={(item:any) => item.id}
        horizontal
        bounces={false}
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
      <FlatList 
        data={upcomingMoviesList}
        keyExtractor={(item:any) => item.id}
        horizontal
        bounces={false}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: COLORS.Black
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