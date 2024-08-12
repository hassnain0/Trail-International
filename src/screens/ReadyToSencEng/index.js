import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Image, ActivityIndicator,TouchableOpacity, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getForms } from '../../components/KoboToolbox';
import EditForm from '../EditForm';

const ReadyToSendScreenEng = () => {
  const navigation = useNavigation();
  const [forms, setForms] = useState([]);
  const [loading,setLoading]=useState(true)

  const handleBackPress = () => {
    navigation.goBack();
  };
  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleBackPress}>
        <AntDesign name="arrowleft" color={'black'} size={28} />
      </TouchableOpacity>
      <Text style={styles.backText}>Ready to send</Text>
    </View>
  );
  useEffect(() => {
    async function FetchData() {
      const response= await getForms();
      setForms(response);
      setLoading(false)
    }
    FetchData();
  });
  const EditScreen=(item)=>{
    navigation.navigate('EditForm' ,{ item });
  }

  const renderItem = ({item}) => (
    <View style={styles.RenderItemContainer}>
      <View>
      <Text style={styles.itemText}>Form ID: {item._id}</Text>
      </View>
      <View style={{flexDirection:'row',right:10}}>
      <TouchableOpacity onPress={() => EditScreen(item)}>
        <Text style={{color:'#1560AA',fontSize:20,marginRight:10}}>Edit</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      {renderHeader()}
      {loading ?(
         <ActivityIndicator size="large" color="#0000ff" style={styles.activityIndicator} />
      ):!forms || forms.length==0 &&(
      <View style={styles.content}>
        {/* <FontAwesome5 name='edit' color={'#1160AA'} size={30} /> */}
        <Image
          source={require('../../assets/images/edit.png')}
          style={styles.image}
        />
        <Text style={styles.title}>Nothing ready to send</Text>
        <Text style={styles.subtitle}>
          When you finalize drafts, they will appear here.
        </Text>
      </View>
)}
<View>
<FlatList
          data={forms}
          keyExtractor={(item) => item._uuid}
          renderItem={renderItem}
        />
</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  backText: {
    fontSize: 20,
    color: '#000',
    marginStart: 20,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // alignSelf:'center'
  },
  image: {
    // width: 50,
    // height: 50,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  icon: {
    transform: [{rotate: '45deg'}],
  },
  
  //Forms Containers
  itemContainer: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    marginVertical: 8,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  modalTextData: {
    marginLeft: 10,
    fontSize: 18,
    marginBottom: 20,
  },
  RenderItemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  downloadButton: {
    width: 20,
    height: 20,
  },
  activityIndicator:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }
});

export default ReadyToSendScreenEng;
