import * as React from 'react';
import { DataTable } from 'react-native-paper';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import axios from 'axios'; // Importa la biblioteca axios
import {BASE_URL} from '../config.jsx'
const ReporteAtletas = () => {
  const [data, setData] = React.useState([]); // Estado para almacenar los datos de la API
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Realiza una solicitud GET a la API para obtener los datos
    axios.get(`${BASE_URL}/atletas`)
      .then((response) => {
        setData(response.data); // Almacena los datos en el estado
        setLoading(false); // Establece loading en false cuando se cargan los datos
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Maneja errores y establece loading en false
      });
  }, []);

  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(10);
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, data.length);

  const numberOfItemsPerPageList = [10];

  React.useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  return (
    <ScrollView horizontal>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={styles.columnHeader}>Id Club</DataTable.Title>
          <DataTable.Title style={styles.columnHeader}>Cedula</DataTable.Title>
          <DataTable.Title style={styles.columnHeader}>Nombre</DataTable.Title>
          <DataTable.Title style={styles.columnHeader}>Apellido</DataTable.Title>
          <DataTable.Title style={styles.columnHeader}>Peso</DataTable.Title>
          <DataTable.Title style={styles.columnHeader}>Estatura</DataTable.Title>
          <DataTable.Title style={styles.columnHeader}>F. Nacimiento</DataTable.Title>
          <DataTable.Title style={styles.columnHeader}>Telefono</DataTable.Title>
          <DataTable.Title style={styles.columnHeader}>Sexo</DataTable.Title>
          <DataTable.Title style={styles.columnHeader}>Deporte</DataTable.Title>
          <DataTable.Title style={styles.columnHeader}>Categoria</DataTable.Title>
          <DataTable.Title style={styles.columnHeader}>F. Ingreso</DataTable.Title>
          <DataTable.Title style={styles.columnHeader}>Entrenador</DataTable.Title>
        </DataTable.Header>

        {loading ? (
          <View>
            <Text>Cargando datos...</Text>
          </View>
        ) : (
          data.slice(from, to).map((item) => (
            <DataTable.Row key={item.cedula} style={styles.row}>
              <DataTable.Cell style={styles.cell}>{item.id_club}</DataTable.Cell>
              <DataTable.Cell style={styles.cell} numeric>{item.cedula}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{item.nombre}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{item.apellido}</DataTable.Cell>
              <DataTable.Cell style={styles.cell} numeric>{item.peso}</DataTable.Cell>
              <DataTable.Cell style={styles.cell} numeric>{item.estatura}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{item.fechadenacimiento}</DataTable.Cell>
              <DataTable.Cell style={styles.cell} numeric>{item.telefono}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{item.sexo}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{item.deportebase}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{item.categoria}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{item.fechaingresoclub}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{item.entrenador}</DataTable.Cell>
            </DataTable.Row>
          ))
        )}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(data.length / numberOfItemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${data.length}`}
          showFastPaginationControls
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={numberOfItemsPerPage}
        />
      </DataTable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  columnHeader: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  row: {
    backgroundColor: 'white',
  },
  cell: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 8,
  },
});

export default ReporteAtletas;
