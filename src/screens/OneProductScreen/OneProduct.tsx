import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Alert } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { ProductType } from '../../types/types/product.types';
import i18n from '../../i18n';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getCurrentUser, logout } from '../../api/auth';
import { deleteProduct, getProduct } from '../../api/products';
import { PrimaryButton } from '../../components/buttons';
import LoadingModal from '../../utils/LoadingModal';
import { auth } from '../../firebase/config';

const OneProduct = ({ route, navigation }: any) => {
  const { colors } = useTheme();
  const userQuery = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser
  })
  const productQuery = useQuery({
    queryKey: ['product', route.params.id],
    queryFn: () => getProduct(route.params.id)
  })
  const deleteProductMutation = useMutation({
    mutationFn: () => deleteProduct(route.params.id),
    onSuccess: () => {
      navigation.goBack();

      Alert.alert(
        i18n.t('confirmation'),
        i18n.t('donationConfirmation'),
        [
          {
            text: i18n.t('no'),
            style: 'cancel'
          },
          {
            text: i18n.t('yes'),
            onPress: () => {
              Alert.alert(
                '',
                i18n.t('continuousCharityThanks'),
                [{ text: 'OK' }]
              );
            }
          }
        ]
      );
    }
  })

  const isAnonymous = auth.currentUser?.isAnonymous;
  console.log('current user', userQuery.data?.email)
  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: productQuery.data?.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.contentContainer}>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          marginBottom: 14,
          justifyContent: 'center'
        }}>
          {/* <Text style={styles.label}>{i18n.t('bookName')}:</Text> */}
          <Text style={[styles.title, { color: colors.text }]}>
            {productQuery.data?.bookName}
          </Text>
        </View>

        <View style={styles.labelGroup}>
          <Text style={styles.label}>{i18n.t('category')}:</Text>
          <Text style={[styles.category, { color: colors.text }]}>
            {i18n.t(productQuery.data?.category || "")}
          </Text>
        </View>

        <View style={styles.labelGroup}>
          <Text style={styles.label}>{i18n.t('language')}:</Text>
          <Text style={[styles.language, { color: colors.text }]}>
            {i18n.t(productQuery.data?.language || "")}
          </Text>
        </View>

        <View style={styles.labelGroup}>
          <Text style={styles.label}>{i18n.t('description')}:</Text>
          <Text style={[styles.description, { color: colors.text }]}>
            {productQuery.data?.description}
          </Text>
        </View>
      </View>
      <PrimaryButton
        label={isAnonymous ? i18n.t('login') :
          userQuery.data?.id === productQuery.data?.userId ? i18n.t('removeProduct') :
            i18n.t('chatWithOwner')}
        onPress={() =>
          isAnonymous ?
            logout() :
            userQuery.data?.id === productQuery.data?.userId ?
              deleteProductMutation.mutate()
              :
              navigation.navigate('ChatRoom', {
                otherUserId: productQuery.data?.userId,
              })
        }
        style={{ width: 200, textFont: 'bold', fontweight: 'bold', color: 'white', marginBottom: 10 }}
      />
      {
        userQuery.data?.email === 'ashmosa123@gmail.com'  &&
        userQuery.data?.id !== productQuery.data?.userId
        &&
        <PrimaryButton
          label={i18n.t('removeProduct')}
          onPress={() =>
            deleteProductMutation.mutate()

          }
          style={{
            width: 200, textFont: 'bold', fontweight: 'bold', color: 'white', backgroundColor: 'red',
            marginBottom: 10,
          }}
        />
      }
      <LoadingModal isVisible={deleteProductMutation.isPending ||
        productQuery.isLoading
      } />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingBottom: 16,

  },
  image: {
    width: "90%",
    aspectRatio: 1,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderColor: 'grey',
    borderWidth: .4,
    alignContent: "center",
    alignSelf: "center",
    marginTop: 30
  },
  contentContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  labelGroup: {
    marginBottom: 16,
    display: 'flex',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    fontWeight: '500',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  category: {
    fontSize: 16,
    marginBottom: 8,
  },
  language: {
    fontSize: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  }
});

export default OneProduct;