import React, { useCallback, useEffect } from 'react'
import { View, StyleSheet, ScrollView, Image, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { CustomText, HeadText, SuperText } from '../components/CustomTexts'
import Colors from '../constants/Colors'
import { toggleFav } from '../store/actions/meals'

const MealDetailsScreen = props => {
  const mealId = props.navigation.getParam('mealId')
  const { navigation } = props
  const allMeals = useSelector(state => state.mealsStore.meals)
  const MEAL = allMeals.find(meal => meal.id == mealId)

  const dispatch = useDispatch()

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFav(mealId))
  }, [dispatch, mealId])

  useEffect(() => {
    navigation.setParams({ toggleFav: toggleFavoriteHandler, fav: MEAL.fav })
  }, [toggleFavoriteHandler, MEAL])

  return (
    <ScrollView>
      <View style={styles.screen}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: MEAL.imageUrl }} style={styles.image} />
        </View>
        {/* <HeadText style={styles.mealName}>{MEAL.title}</HeadText> */}
        <SuperText style={styles.header}>Meal Details</SuperText>
        <View style={styles.textContainer}>
          <HeadText style={styles.infoText}>
            Price: {}
            <HeadText style={styles.headText}>{MEAL.price}</HeadText>
          </HeadText>
        </View>

        <SuperText style={styles.header}>Ingredients</SuperText>
        <View style={styles.textContainer}>
          {MEAL.ingredients.map((step, index) => (
            <View key={index} style={styles.listItem}>
              <CustomText>{index + 1}). </CustomText>
              <CustomText>{step}</CustomText>
            </View>
          ))}
        </View>

        {/* <Button title='Go Back' onPress={() => props.navigation.goBack()} />
      <Button title='Go home' onPress={() => props.navigation.popToTop()} /> */}
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingBottom: 20
  },
  imageContainer: {
    padding: 15,
    width: '100%',
    height: 250
  },
  image: {
    borderRadius: 15,
    width: '100%',
    height: '100%'
  },
  mealName: {
    paddingHorizontal: 15,
    fontSize: 25,
    color: Colors.redish,
    marginBottom: 10,
    lineHeight: 29
  },
  textContainer: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    width: '92%'
  },
  header: {
    fontSize: 23,
    textAlign: 'center'
    // color: Colors.redish
  },
  headText: {
    color: Colors.primary,
    fontSize: 16
  },
  headTextD: {
    color: Colors.redish,
    fontSize: 16
  },
  infoText: {
    fontSize: 16
  },
  recipeText: {
    fontSize: 16
  },
  listItem: {
    flexDirection: 'row',
    margin: 2
  }
})

export default MealDetailsScreen
