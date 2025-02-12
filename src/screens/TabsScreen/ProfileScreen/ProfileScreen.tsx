import React, { useCallback } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchUserProfile } from '../../../api/auth';
import { fetchUserProducts } from '../../../api/products';
import { useFocusEffect, useTheme } from '@react-navigation/native';
import { Items } from '../../../components/AllItems';
import { ProfilePicture } from '../../../../assets';
import i18n from '../../../i18n';
import LoadingModal from '../../../utils/LoadingModal';

const ProfileScreen = ({ navigation, extraData }: any) => {
  const { colors } = useTheme();
  const { data: userProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: () => fetchUserProfile() // Implement this function to fetch user data
  });

  const productsQuery = useQuery({
    queryKey: ['userProducts'],
    queryFn: () => fetchUserProducts() // Implement this function to fetch user's products
  });
  useFocusEffect(
    useCallback(() => {
      productsQuery.refetch();
      
    }, [])
);


  return (
    <>
      <LoadingModal isVisible={productsQuery.isLoading} />
      <ScrollView style={styles.container}>
        <View style={styles.profileSection}>
          <Image
            source={ProfilePicture}
            // { uri: userProfile?.profilePicture }}
            style={styles.profileImage}
          />
          <Text style={[styles.userName,
          { color: colors.text, backgroundColor: colors.card }
          ]}>{userProfile?.fullName}</Text>
        </View>
        {/* line */}
        <View style={styles.productsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text, borderRadius: 10, }
          ]}>{i18n.t('allMyProducts')
            }</Text>
          <Items navigation={navigation} products={
            productsQuery.data || []}
          />
        </View>

      </ScrollView>
    </>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    padding: 0,

    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 15,

  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 60,
    marginBottom: 10,
    resizeMode: 'contain'
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    borderRadius: 60,
    padding: 10,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

  },
  productsSection: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  }
});

export default ProfileScreen;