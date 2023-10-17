import React, { useState, useRef } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

const Historial = () => {
  const [historial, setHistorial] = useState([]);
  const [selectedAtleta, setSelectedAtleta] = useState(null); // Cambiado a null
  const flatListRef = useRef(null);

  const atletas = ['Luis Perdomo', 'Diego Aguilar', 'Cirez Barriga', 'Ruander Cuello'];

  const agregarEntradaAlHistorial = (actividad) => {
    setHistorial((prevHistorial) => [
      {
        actividad,
        timestamp: new Date().toLocaleString(),
      },
      ...prevHistorial,
    ]);
  };

  const handleAtletaChange = (atleta) => {
    setSelectedAtleta(atleta);
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Atletas</Text>
      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownLabel}>Seleccionar Atleta: </Text>
        <ModalDropdown
          options={atletas}
          defaultValue={selectedAtleta || 'Seleccione...'} // Cambiado el valor predeterminado
          onSelect={(index, value) => handleAtletaChange(value)}
          style={styles.dropdown}
          textStyle={styles.dropdownText}
          dropdownStyle={styles.dropdownOptions}
        />
      </View>
      <Button
        title="Realizar Actividad"
        onPress={() => agregarEntradaAlHistorial('Actividad realizada')}
      />
      {selectedAtleta !== null && ( // Renderiza la FlatList solo si se ha seleccionado un atleta
        <FlatList
          ref={flatListRef}
          data={historial}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.entry}>
              <Text>{item.actividad}</Text>
              <Text style={styles.timestamp}>{item.timestamp}</Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyMessage}>No hay actividades en el historial.</Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dropdownLabel: {
    fontSize: 18,
  },
  dropdown: {
    width: 150,
    padding: 10,
  },
  dropdownText: {
    fontSize: 16,
  },
  dropdownOptions: {
    maxHeight: 200,
  },
  entry: {
    marginBottom: 8,
  },
  timestamp: {
    color: 'gray',
  },
  emptyMessage: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
});

export default Historial;
