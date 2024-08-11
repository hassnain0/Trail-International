import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getForms} from '../../components/KoboToolbox';
import {PermissionsAndroid, Platform} from 'react-native';
import {Alert} from 'react-native';

const DownloadForm: React.FC = () => {
  //Use state hooks
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedForm, setSelectedForm] = useState();
  const [forms, setForms] = useState<Form[]>([]);
  const navigation = useNavigation();

  type Form = {
    Password: string;
    URL: string;
    Username: string;
    _id: number;
    _uuid: string;
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleBackPress}>
        <AntDesign name="arrowleft" color={'black'} size={28} />
      </TouchableOpacity>
      <Text style={styles.headerText}>Download form</Text>
    </View>
  );
  useEffect(() => {
    async function FetchData() {
      const response: Form[] = await getForms();
      setForms(response);
    }
    FetchData();
  });

  const handleItemPress = (item: Form) => {
    setSelectedForm(item);
    setModalVisible(true);
  };

  const downloadPDF = async item => {
    try {
      if (await checkPermissions()) {
        const options = {
          html: `<h1>KoboTool Box Form</h1> <br/> <p> URL: ${item.URL}</p><br/> <p>Username:${item.Username}</p> <br/> <p>Password:${item.Password}</p>`,
          fileName: 'FormKoboToolBox',
          directory: 'Documents',
        };

        // Generate PDF
        const file = await RNHTMLtoPDF.convert(options);

        // Save to Downloads folder
        const downloadPath = `${RNFS.ExternalStorageDirectoryPath}/Download/FormKoboToolBox.pdf`;

        await RNFS.moveFile(file.filePath, downloadPath);
        console.log('Path', downloadPath);
        // Notify user
        Alert.alert('PDF Saved', `PDF saved to ${downloadPath}`);
      } else {
        Alert.alert(
          'Permission Denied',
          'Storage permission is required to save the file.',
        );
      }
    } catch (error) {
      console.log('Error', error);
      Alert.alert('Error', 'Failed to save PDF');
    }
  };

  const checkPermissions = async () => {
    try {
      // Request permissions on Android
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'This app needs access to your storage to save the PDF.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted == 'granted') {
          return true;
        } else {
          Alert.alert(
            'Permission Denied',
            'You need to grant storage permission to save the PDF.',
          );
          return false;
        }
      }
    } catch (err) {
      console.log('Erro', err);
    }
  };

  const renderItem = ({item}: {item: Form}) => (
    <View style={styles.RenderItemContainer}>
      <View>
        <Text style={styles.itemText}>Form ID: {item._id}</Text>
      </View>
      <View style={{flexDirection: 'row', right: 10}}>
        <TouchableOpacity onPress={() => handleItemPress(item)}>
          <Text style={{color: '#1560AA', fontSize: 20, marginRight: 10}}>
            View
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => downloadPDF(item)}>
          <Text style={{color: '#1560AA', fontSize: 20, marginRight: 10}}>
            Download
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      {renderHeader()}
      {!forms ||
        (forms.length === 0 && (
          <View style={styles.content}>
            <Image
              source={require('../../assets/images/dowload_Btn.png')}
              style={styles.image}
            />
            <Text style={styles.title}>No forms to download</Text>
            <Text style={styles.subtitle}>Download form to get started.</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Start New Form</Text>
            </TouchableOpacity>
          </View>
        ))}

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
            <TouchableWithoutFeedback
              onPress={() => {
                setModalVisible(false);
              }}>
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
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 18,
    color: '#000',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 100,
    // height: 100,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'black',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1160AA',
    paddingVertical: 15,
    width: '90%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
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
});

export default DownloadForm;
