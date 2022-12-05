import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import ViewWrapper from '../../components/wrappers/ViewWrapper';
import {px1, px2, px4, px6, py1, pyh} from '../../constants/spacing';
import {black, gray, green, white} from '../../constants/colors';
import {md, medium, nm} from '../../constants/fonts';
import NewsHeroCard from './widgets/NewsHeroCard';
import useXclusiveStore from '../../store/xclusiveStore';
import {
  GetXclusiveCategories,
  GetXclusivePosts,
} from '../../handlers/xclusive/xclusiveHandler';
import {iXclusivePost} from '../../types/store/xclusiveStore';
import NewsCard from './widgets/NewsCard';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {iAuthenticated} from '../../containers/routes/authenticated/Authenticated';

type Props = NativeStackScreenProps<iAuthenticated, 'Home'>;

const Xclusive = ({navigation}: Props) => {
  const {
    selectedCategory,
    selectedSubCategories,
    posts,
    categories,
    setSelectedCategory,
    setSelectedSubCategories,
  } = useXclusiveStore();

  // fetching posts every time categories changes
  useEffect(() => {
    const getPosts = async () => {
      await GetXclusivePosts();
    };
    getPosts();
  }, [selectedCategory, selectedSubCategories]);

  // fetching categories in first render
  useEffect(() => {
    const getCategories = async () => {
      await GetXclusiveCategories();
    };
    getCategories();
  }, []);

  const renderNewsHero = ({
    item,
    index,
  }: {
    item: iXclusivePost;
    index: number;
  }) => {
    if (item.type === 'video') {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate('xclusivePost', {index})}>
          <NewsHeroCard post={item} index={index} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate('xclusivePost', {index})}>
          <NewsCard post={item} index={index} />
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.main}>
      <View>
        <View style={styles.header}>
          <Text style={styles.headerText}>Amuzi Xclusive</Text>
        </View>
        <ScrollView contentContainerStyle={{paddingBottom: py1}} horizontal>
          {selectedCategory !== 'ALL' && (
            <Text
              onPress={() => setSelectedCategory('ALL')}
              style={[
                styles.categoryTitleButton,
                styles.categoryTitle,
                {marginLeft: px4, backgroundColor: green},
              ]}>
              {categories.find(item => item._id === selectedCategory)?.name}
            </Text>
          )}
          {selectedCategory !== 'ALL' &&
            categories
              .find(item => item._id === selectedCategory)
              ?.subCategories.map((subCat, i) => {
                return (
                  <TouchableOpacity
                    key={subCat._id}
                    style={[
                      styles.categoryTitleButton,
                      i === 0 && {marginLeft: px2},
                      selectedSubCategories.findIndex(
                        item => item === subCat._id,
                      ) !== -1 && {backgroundColor: green},
                    ]}
                    onPress={() => setSelectedSubCategories(subCat._id)}>
                    <Text style={styles.categoryTitle}>{subCat.name}</Text>
                  </TouchableOpacity>
                );
              })}
          {selectedCategory === 'ALL' &&
            categories.map((item, i) => {
              return (
                <TouchableOpacity
                  key={item._id}
                  onPress={() => setSelectedCategory(item._id)}
                  style={[
                    styles.categoryTitleButton,
                    i === 0 && {marginLeft: px4},
                  ]}>
                  <Text style={styles.categoryTitle}>{item.name}</Text>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </View>
      <ViewWrapper>
        <FlatList
          style={styles.heroSlider}
          renderItem={renderNewsHero}
          keyExtractor={item => item._id}
          data={posts}
        />
      </ViewWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: black,
  },
  header: {
    paddingHorizontal: px4,
    paddingVertical: py1,
  },
  headerText: {
    color: white,
    fontSize: md,
    fontFamily: medium,
  },
  heroSlider: {
    marginVertical: py1,
    flexGrow: 1,
  },
  newsList: {
    marginVertical: py1,
    paddingHorizontal: px4,
  },
  categoryMain: {
    flexGrow: 1,
  },
  categoryTitleButton: {
    marginRight: px2,
    backgroundColor: gray,
    height: 'auto',
    paddingVertical: px2,
    paddingHorizontal: px4,
    borderRadius: px6,
  },
  categoryTitle: {
    color: white,
    fontSize: nm,
  },
});

export default Xclusive;
