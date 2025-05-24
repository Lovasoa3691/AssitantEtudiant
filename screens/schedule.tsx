import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Modal,
  Button,
  Animated,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Easing,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ScheduleCalendar() {
  const [selectedDate, setSelectedDate] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newRoom, setNewRoom] = useState('');

  const [schedule, setSchedule] = useState([
    {
      id: '1',
      date: '2025-05-23',
      time: '08:00 - 10:00',
      subject: 'Mathématiques',
      room: 'Salle 201',
    },
    {
      id: '2',
      date: '2025-05-23',
      time: '10:30 - 12:00',
      subject: 'Physique',
      room: 'Salle 105',
    },
    {
      id: '3',
      date: '2025-05-24',
      time: '09:00 - 11:00',
      subject: 'Informatique',
      room: 'Salle 301',
    },
  ]);

  const slideAnim = useRef(new Animated.Value(500)).current;

  useEffect(() => {
    if (modalVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 500,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible]);

  // Filtrer les cours du jour sélectionné
  const coursesToday = schedule.filter(c => c.date === selectedDate);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
      <Text style={styles.title}>Emploi du temps</Text>

      <Calendar
        onDayPress={day => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: {selected: true, selectedColor: '#2f95dc'},
        }}
        style={styles.calendar}
      />

      <Text style={styles.subtitle}>
        {selectedDate ? `Cours du ${selectedDate}` : 'Sélectionnez une date'}
      </Text>

      {coursesToday.length === 0 && <Text>Aucun cours pour cette date.</Text>}

      <FlatList
        data={coursesToday}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.courseItem}>
            <Text style={styles.courseText}>{item.time}</Text>
            <Text style={styles.courseText}>
              {item.subject} - {item.room}
            </Text>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>

      <Modal
        transparent
        visible={modalVisible}
        animationType="none"
        onRequestClose={() => setModalVisible(false)}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          />

          <Animated.View
            style={[
              styles.modalContent,
              {transform: [{translateY: slideAnim}]},
            ]}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
              <Text style={styles.title}>Ajouter une Révision</Text>

              <TextInput
                style={styles.input}
                placeholder="Nom du cours"
                placeholderTextColor={'#999'}
                value={newSubject}
                onChangeText={setNewSubject}
              />
              <TextInput
                style={styles.input}
                placeholderTextColor={'#999'}
                placeholder="Heure (ex: 14:00 - 16:00)"
                value={newTime}
                onChangeText={setNewTime}
              />

              <TextInput
                placeholder="Salle"
                placeholderTextColor={'#999'}
                value={newRoom}
                onChangeText={setNewRoom}
                style={styles.input}
              />

              <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                  // addTask();
                  setModalVisible(false);
                }}>
                <Text style={styles.addButtonText}>Ajouter</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </Animated.View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 10, backgroundColor: '#f2f6fc'},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  calendar: {marginBottom: 10},
  subtitle: {fontSize: 18, marginBottom: 10, fontWeight: '600'},
  courseItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
  },
  courseText: {fontSize: 16},
  input: {
    color: '#333',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    marginTop: 20,
    backgroundColor: '#2f95dc',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  addButtonText: {color: '#fff', fontSize: 18, fontWeight: 'bold'},
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#2f95dc',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    zIndex: 100,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },

  modalContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
});
