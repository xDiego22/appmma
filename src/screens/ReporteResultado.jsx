import React, { useEffect, useState } from 'react';
import { DataTable } from 'react-native-paper';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../config';
const ReporteResultado = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Realiza una solicitud GET a la API para obtener los datos de resultados
    axios.get(`${BASE_URL}/resultados`) // Actualiza la URL con la dirección de tu servidor
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const [page, setPage] = useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = useState(10);
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, data.length);

  const numberOfItemsPerPageList = [10];

  useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  return (
    <ScrollView horizontal>
      <DataTable>
        <DataTable.Header>
        <DataTable.Title style={styles.columnHeader}>Nombre Evento</DataTable.Title>
        <DataTable.Title style={styles.columnHeader}>Nomb. Atleta 1</DataTable.Title>
        <DataTable.Title style={styles.columnHeader}>Nomb. Atleta 2</DataTable.Title>
        <DataTable.Title style={styles.columnHeader}>Ronda</DataTable.Title>
        <DataTable.Title style={styles.columnHeader}>Forma de Ganar</DataTable.Title>
        </DataTable.Header>

        {loading ? (
          <View>
            <Text>Cargando datos...</Text>
          </View>
        ) : (
          data.slice(from, to).map((item, index) => (
            <DataTable.Row key={index} style={styles.row}>
              <DataTable.Cell style={styles.cell}>{item.nombre}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{item.nombre1}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{item.nombre2}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{item.ronda}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{item.forma_ganar}</DataTable.Cell>
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
    justifyContent: 'flex-start', // Centra verticalmente el texto
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 24, // Ajusta el valor según tus preferencias
    paddingVertical: 10, // Agrega un espacio vertical
     marginLeft: 20, // Opcional: Agrega un margen superior
  },
  row: {
    backgroundColor: 'white',
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7,
    flexWrap: 'wrap',
  },
});


export default ReporteResultado;
