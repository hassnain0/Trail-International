import React ,{useEffect,useState,} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, FlatList,TouchableWithoutFeedback,Modal, Alert, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { deleteForm, getForms } from '../../components/KoboToolbox';

const Deleteforms: React.FC = () => {
  const navigation = useNavigation();

  const [loading,setLoading]=useState(true);
  //State hooks
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedForm, setSelectedForm] = useState();
  const [forms, setForms] = useState<Form[]>([]);

  type Form = {
    Password: string;
    URL: string;
    Username: string;
    _id: number;
    _uuid: string;
  };


  const renderItem = ({item}: {item: Form}) => (
    <View style={styles.RenderItemContainer}>
      <View>
      <Text style={styles.itemText}>Form ID: {item._id}</Text>
      </View>
      <View style={{flexDirection:'row',right:10}}>
      <TouchableOpacity onPress={() => handleItemPress(item)}>
        <Text style={{color:'#1560AA',fontSize:20,marginRight:10}}>View</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>DeleteForm(item)}>
      <Text style={{color:'#FF0000',fontSize:20,marginRight:10}}>Delete</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
  const handleBackPress = () => {
    navigation.goBack();
  };
  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleBackPress}>
        <AntDesign name="arrowleft" color={'black'} size={28} />
      </TouchableOpacity>
      <Text style={styles.backText}>Delete Form</Text>
    </View>
  );

  useEffect(() => {
    async function FetchData() {
      const response: Form[] = await getForms();
      setForms(response);
      setLoading(false)
    }
    FetchData();
  });

  const handleItemPress = (item: Form) => {
    setSelectedForm(item);
    setModalVisible(true);
  };

//Delete forms method
const DeleteForm=async(item)=>{
  const response =await deleteForm(item._id);
  console.log("Response",response)
  if(response==204){
    Alert.alert("Form Successfully Deleted")
  }
}
  return (
    <View style={styles.container}>
      {renderHeader()}
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.activityIndicator}
        />
      ) : (
     !forms || (forms.length===0&&(
      <View style={styles.content}>
        {/* <FontAwesome5 name='edit' color={'#1160AA'} size={30} /> */}
        <Image
          source={require('../../assets/images/trash.png')}
          style={styles.image}
        />
        <Text style={styles.title}>No forms to delete</Text>
        <Text style={styles.subtitle}>
          When you have saved forms they will appear here.
        </Text>
      </View>
     )))}
      <View>
        <FlatList
          data={forms}
          keyExtractor={(item: Form) => item._uuid}
          renderItem={renderItem}
        />

        {selectedForm && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}>
              <TouchableWithoutFeedback onPress={()=>{setModalVisible(false)}}> 
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-arround',
                    alignItems: 'flex-start',
                  }}>
                  <Text style={styles.modalText}>Url:</Text>
                  <Text style={styles.modalTextData}>{selectedForm.URL}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.modalText}>Username:</Text>
                  <Text style={styles.modalTextData}>
                    {selectedForm.Username}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.modalText}>Password:</Text>
                  <Text style={styles.modalTextData}>
                    {selectedForm.Password}
                  </Text>
                </View>
              </View>
            </View>
</TouchableWithoutFeedback>
          </Modal>
        )}
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
  },  itemContainer: {
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
    justifyContent:'space-between'
  },
  downloadButton: {
    width: 20,
    height: 20,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Deleteforms;
