import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface CustomButtonProps {
  iconName: string;
  label: string;
  onPress: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ iconName, label, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon name={iconName} size={20} color="#000" style={styles.icon} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  icon: {
    marginRight: 10,
  },
  label: {
    fontSize: 16,
  },
});

export default CustomButton;
