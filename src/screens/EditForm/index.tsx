import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {updateForm} from '../../components/KoboToolbox';
interface CustomInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

type ItemType = {
  // Define the shape of the item object here
  URL: string;
  Username: string;
  Password: string;
  // Add other properties as needed
};

type EditFormProps = {
  route: {
    params: {
      item: ItemType;
    };
  };
};
const EditForm: React.FC<EditFormProps> = ({route}) => {
  let item = route?.params?.item;

  const [data, setData] = useState({
    Url: '',
    Username: '',
    Password: '',
  });

  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    console.log("Item",item)
    if (item) {
      setData({
        Url: item.URL,
        Username: item.Usernmae, // Provide default value
        Password: item.Password, // Provide default value
      });
    }
  }, []);

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleBackPress}>
        <AntDesign name="arrowleft" color={'black'} size={28} />
      </TouchableOpacity>
      <Text style={styles.headerText}>Form ID: {item._id}</Text>
    </View>
  );

  const handleSavePress = async item => {
    try {
      const updatedData = {
        URL: data.Url,
        Username: data.Username,
        Password: data.Password,
      };
      const response = await updateForm(item._id,item._uuid, updatedData);
      
    } catch (error) {
      console.log('Error', error);
    }
  };

  const EmptyFeilds = () => {
    setData({
      Url: '',
      Username: '',
      Password: '',
    });
  };
  return (
    <View style={styles.container}>
      {renderHeader()}
      <View style={styles.contentContainer}>
        <CustomInput
          label="URL"
          value={data?.Url}
          onChangeText={value => setData({...data, Url: value})}
          placeholder="Enter URL"
        />
        <CustomInput
          label="Nom d'utilisateur"
          value={data?.Username}
          onChangeText={value => setData({...data, Username: value})}
          placeholder="Enter Username"
        />
        <CustomInput
          label="Mot de passe"
          value={data?.Password}
          onChangeText={value => setData({...data, Password: value})}
          placeholder="Enter Password"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSavePress(item)}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    // padding: 20,
  },
  contentContainer: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    borderRadius: 4,
    backgroundColor: '#D7D7D7',
  },
  button: {
    backgroundColor: '#1160AA',
    paddingVertical: 15,
    // width: '90%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
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
});
export default EditForm;
