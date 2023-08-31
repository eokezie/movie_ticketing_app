import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';


const CategoryHeader = (props: any) => {
  return (
    <Text style={styles.textHeader}>{props.title}</Text>
  );
};

export default CategoryHeader;

const styles = StyleSheet.create({
    textHeader: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_20,
        color: COLORS.White,
        paddingHorizontal: SPACING.space_36,
        paddingVertical: SPACING.space_28
    }
});
