import axios from 'axios';
import { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Validation Error', 'Please enter username and password');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        'http://172.16.19.92:8081/api/Auth/login',
        { username, password },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );

      if (response.status === 200) {
        Alert.alert('Success', response.data.message || 'Login Successful');
        // Agar aap navigation use kar rahe hain
        // navigation.navigate('Home');
      } else {
        Alert.alert('Login Failed', response.data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.log('Login error:', error);

      if (error.response) {
        Alert.alert('Login Failed', error.response.data.message || 'Invalid credentials');
      } else if (error.request) {
        Alert.alert('Error', 'No response from server. Please check your connection.');
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          autoCapitalize="none"
          editable={!loading}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
          editable={!loading}
        />
        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  inputContainer: {},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
});

export default LoginScreen;
