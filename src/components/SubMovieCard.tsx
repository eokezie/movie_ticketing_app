import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';


const SubMovieCard = (props: any) => {
  return (
    <TouchableOpacity onPress={() => {}}>
        <View style={[
              styles.container, 
              props.shouldMarginatedAtEnd 
                ? props.isFirst 
                  ? {marginLeft: SPACING.space_36}
                  : props.isLast 
                  ? {marginRight: SPACING.space_36}
                  : {}
                : {},
              props.shouldMarginatedAround
                ? {margin: SPACING.space_12}
                : {},
                {maxWidth: props.cardWidth}
            ]}>
            <Image 
              source={{uri: props.imagePath}} 
              style={[
                styles.cardImage,
                {width: props.cardWidth}
              ]} />
            <Text 
              style={styles.textTitle}
              numberOfLines={1}
            >{props.title}</Text>
        </View>
    </TouchableOpacity>
  );
};

export default SubMovieCard;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black
  },
  cardImage: {
    aspectRatio: 2/3,
    borderRadius: BORDERRADIUS.radius_20,
  },
  textTitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
    textAlign: 'center',
    paddingVertical: SPACING.space_10
  }
});
