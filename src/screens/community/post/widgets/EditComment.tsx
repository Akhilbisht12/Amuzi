import {View, Text, StyleSheet, ScrollView, TextInput} from 'react-native';
import React, {useState} from 'react';
import {height} from '../../../../constants/dimensions';
import BackTitleHeader from '../../../../components/Headers/BackTitleHeader';
import {black, grayLight, white} from '../../../../constants/colors';
import {px1, px2, px4, py1} from '../../../../constants/spacing';
import Button from '../../../../components/button/Button';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CommunityStack} from '../../../../containers/routes/authenticated/community/CommunityRoutes';
import {updateComment} from '../../../../api/community/community.api';
import useStore from '../../../../store/store';

type Props = NativeStackScreenProps<CommunityStack, 'EditComment'>;

const EditComment = ({route, navigation}: Props) => {
  const {postId, comment, commentId, communityId} = route.params;
  const [content, setContent] = useState(comment);
  const {setLoading} = useStore();

  const updateCommentHandler = async () => {
    try {
      setLoading(true);
      await updateComment(commentId, postId, communityId, content);
      navigation.navigate('Post', {
        _id: postId,
        community_id: commentId,
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.fullView}>
      <BackTitleHeader title="Edit Comment" />
      <ScrollView style={styles.fullScroll}>
        <View style={styles.main}>
          <Text style={styles.label}>Comment</Text>
          <TextInput
            value={content}
            onChangeText={setContent}
            style={styles.input}
          />
          <Button
            colored={content !== comment && content.length > 0}
            onPress={updateCommentHandler}
            title="Update"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  fullView: {
    flex: 1,
    backgroundColor: black,
  },
  fullScroll: {
    height: height,
  },
  main: {
    flex: 1,
    padding: px4,
  },
  label: {
    color: grayLight,
  },
  input: {
    borderWidth: 1,
    borderRadius: px1,
    height: 0.15 * height,
    marginVertical: py1,
    borderColor: grayLight,
    textAlignVertical: 'top',
    color: white,
    padding: px2,
  },
});

export default EditComment;
