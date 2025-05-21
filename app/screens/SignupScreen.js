import axios from 'axios';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

const SignupScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [designationId, setDesignationId] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');

  const handleSignup = async () => {
    if (!fullName || !designationId || !departmentId || !username || !password || !email || !mobileNo) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      
      const response = await axios.post('http://172.16.19.125:8081/api/Auth/signup', {
        fullName,
        designationId: parseInt(designationId),
        departmentId: parseInt(departmentId),
        username,
        password,
        activeStatus: true,
        email,
        mobileNo
      });

      if (response.status === 200 || response.status === 201) {
        Alert.alert('Success', 'Signup successful');
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      Alert.alert('Signup Failed', error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput style={styles.input} placeholder="Full Name" value={fullName} onChangeText={setFullName} />
      <TextInput style={styles.input} placeholder="Designation ID" value={designationId} onChangeText={setDesignationId} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Department ID" value={departmentId} onChangeText={setDepartmentId} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Mobile Number" value={mobileNo} onChangeText={setMobileNo} keyboardType="phone-pad" />

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flexGrow: 1, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, padding: 10, marginBottom: 12, borderRadius: 5 },
  signupButton: { backgroundColor: '#2196F3', padding: 15, borderRadius: 5, marginTop: 10 },
  signupButtonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});

export default SignupScreen;
