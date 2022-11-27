import {View, Text, Image} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {iAuthenticated} from '../../../containers/routes/authenticated/Authenticated';
import useXclusiveStore from '../../../store/xclusiveStore';
import BackTitleHeader from '../../../components/Headers/BackTitleHeader';
import ViewWrapper from '../../../components/wrappers/ViewWrapper';
import Player from '../../../components/Players/Player';
import styles from './styles';
import {Config} from 'react-native-jw-media-player';
import {FEED} from '../../../types/content/playlist';

type Props = NativeStackScreenProps<iAuthenticated, 'xclusivePost'>;

const renderPlayer = (media: FEED) => {
  const playerConfig: Omit<Config, 'license'> = {
    autostart: true,
    playlist: media.playlist
      ? media.playlist.map(item => {
          return {
            file: item.sources![0].file,
          };
        })
      : [],
    viewOnly: true,
    pipEnabled: false,
    enableLockScreenControls: false,
  };
  return <Player config={playerConfig} />;
};

const Post = ({route}: Props) => {
  const {index} = route.params;
  const {posts} = useXclusiveStore();
  const post = posts[index];

  return (
    <View style={styles.main}>
      <BackTitleHeader title="" />
      <ViewWrapper>
        <View style={styles.postView}>
          {post.type === 'video' && renderPlayer(post.media!)}
          {post.type === 'image' && (
            <Image style={styles.postImage} source={{uri: post.image}} />
          )}
          <Text style={styles.postTitle}>{post.title}</Text>
          <Text style={styles.postDate}>{post.createdAt}</Text>
          <Text style={styles.content}>{post.content}</Text>
        </View>
      </ViewWrapper>
    </View>
  );
};

export default Post;
