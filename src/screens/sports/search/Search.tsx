import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import ViewWrapper from '../../../components/wrappers/ViewWrapper';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {grayLight, white} from '../../../constants/colors';
import useContentStore from '../../../store/states/contentStore';
import useStore from '../../../store/store';
import {searchMedia} from '../../../api/playlist/playlist';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {iAuthenticated} from '../../../containers/routes/authenticated/Authenticated';
import {PLAYLIST_MEDIA} from '../../../types/content/playlist';
import {px4} from '../../../constants/spacing';
import useThemeStore from '../../../store/states/themeStore';

type Props = NativeStackScreenProps<iAuthenticated, 'search'>;
const Search = ({navigation}: Props) => {
  const [query, setQuery] = useState('');
  const {searchResults, setSearchResults} = useContentStore();
  const {theme} = useThemeStore();
  const {setLoading} = useStore();
  const searchMediaHandler = async () => {
    try {
      if (query === '') return;
      setLoading(true);
      const results = await searchMedia(
        query,
        // theme.name.toLowerCase() === 'all' ? '' : theme.name.toUpperCase(),
        theme.searchTag,
        1,
        10,
      );
      setSearchResults(results);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const renderItem = ({item}: {item: PLAYLIST_MEDIA}) => {
    const {duration} = item;
    const minute = Math.floor(duration / 60);
    const second = duration % 60;
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('OnDemand', {
            feed: {
              playlist: searchResults,
              description: `Search results for ${query}`,
              title: `Search Results For ${query}`,
              feedid: 'jwp ',
            },
            mediaid: item.mediaid,
          })
        }
        style={styles.resultCard}>
        <View>
          <Image style={styles.resultImage} source={{uri: item.image}} />
          <Text style={styles.resultDuration}>
            {`${minute}:${second <= 9 ? '0' : ''}${second}`}
          </Text>
        </View>
        <Text style={styles.resultTitle}>{item.title}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.main}>
      <View style={styles.searchHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={25} color={white} />
        </TouchableOpacity>
        <View style={styles.searchUnderline}>
          <Text style={styles.chip}>{theme.searchTag}</Text>
          <TextInput
            onBlur={searchMediaHandler}
            returnKeyType="search"
            value={query}
            onChangeText={setQuery}
            placeholder="Search..."
            placeholderTextColor={grayLight}
            style={styles.searchInput}
          />
        </View>
        <TouchableOpacity onPress={searchMediaHandler}>
          <Icon name="search-outline" size={25} color={white} />
        </TouchableOpacity>
      </View>
      <ViewWrapper>
        <View style={{padding: px4}}>
          <FlatList
            data={searchResults}
            renderItem={renderItem}
            keyExtractor={item => item.mediaid}
          />
        </View>
      </ViewWrapper>
    </View>
  );
};

export default Search;
