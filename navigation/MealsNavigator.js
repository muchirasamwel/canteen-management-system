import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealsScreen from '../screens/CategoryMealsScreen'
import FavoritesScreen from '../screens/CartScreen'
import MealDetails from '../screens/MealDetailsScreen'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/CustomHeaderButton'
import StoreScreen from '../screens/StoreScreen'

import { MenuIcon } from './MenuIcon'
import { Platform } from 'react-native'

const DefaultStackOptions = {
  cardStyle: {
    backgroundColor: 'white'
  },
  headerStyle: {
    backgroundColor: Platform.OS == 'ios' ? 'white' : Colors.redish
  },
  headerTitleStyle: {
    fontFamily: 'poppin-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'poppin-regular'
  },
  headerTintColor: Platform.OS == 'ios' ? Colors.redish : 'white'
}

const mealNavigationOptions = navigation => {
  return {
    title: `${navigation.state.params.mealName}`,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          iconName={
            navigation.getParam('fav') == true ? 'star' : 'star-outline'
          }
          onPress={navigation.getParam('toggleFav')}
        />
      </HeaderButtons>
    )
  }
}

export const FiltersNavigator = createStackNavigator(
  {
    Filters: {
      screen: StoreScreen,
      navigationOptions: navData => {
        return {
          title: 'Store',
          headerLeft: (
            <MenuIcon
              iconName='menu'
              onPress={() => {
                navData.navigation.openDrawer()
              }}
            />
          ),
          headerRight: (
            <MenuIcon
              iconName='content-save'
              onPress={navData.navigation.getParam('save')}
            />
          )
        }
      }
    }
  },
  {
    defaultNavigationOptions: DefaultStackOptions
  }
)

export const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
      navigationOptions: tabDetails => {
        return {
          headerTitle: 'Food Categories',
          headerLeft: () => {
            return (
              <MenuIcon
                iconName='menu'
                onPress={() => {
                  tabDetails.navigation.openDrawer()
                }}
              />
            )
          }
        }
      }
    },
    Meals: {
      screen: CategoryMealsScreen,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.name}`
      })
    },
    MealDetails: {
      screen: MealDetails,
      navigationOptions: ({ navigation }) => {
        return mealNavigationOptions(navigation)
      }
    }
  },
  {
    defaultNavigationOptions: DefaultStackOptions
  }
)
export const FavNavigator = createStackNavigator(
  {
    Favourites: {
      screen: FavoritesScreen,
      navigationOptions: {
        title: 'Cart'
      }
    },
    MealDetails: {
      screen: MealDetails,
      navigationOptions: ({ navigation }) => {
        return mealNavigationOptions(navigation)
      }
    }
  },
  {
    defaultNavigationOptions: DefaultStackOptions
  }
)
