import React, { useEffect, useState } from 'react';
import { DataTable } from 'react-native-paper';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import axios from 'axios';

const ReporteEvento = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Realiza una solicitud GET a la API para obtener los datos de eventos
    axios.get('http:///192.168.0.129/mma/api/eventos') // Actualiza la URL con la dirección de tu servidor
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
          <DataTable.Title style={styles.columnHeader}>Nombre</DataTable.Title>
          <DataTable.Title style={styles.columnHeader}>Fecha</DataTable.Title>
          <DataTable.Title style={styles.columnHeader}>Hora</DataTable.Title>
          <DataTable.Title style={styles.columnHeader}>Club Responsable</DataTable.Title>
          <DataTable.Title style={styles.columnHeader}>Monto</DataTable.Title>
          <DataTable.Title style={styles.columnHeader}>Dirección</DataTable.Title>
          <DataTable.Title style={styles.columnHeader}>Juez 1</DataTable.Title>
          <DataTable.Title style={styles.columnHeader}>Juez 2</DataTable.Title>
          <DataTable.Title style={styles.columnHeader}>Juez 3</DataTable.Title>
        </DataTable.Header>

        {loading ? (
          <View>
            <Text>Cargando datos...</Text>
          </View>
        ) : (
          data.slice(from, to).map((item, index) => (
            <DataTable.Row key={index} style={styles.row}>
              <DataTable.Cell style={styles.cell}>{item.nombre}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{item.fecha}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{item.hora}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{item.club_nombre}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{item.monto}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{item.direccion}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{item.juez1}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{item.juez2}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{item.juez3}</DataTable.Cell>
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
    padding: 7,
    flexWrap: 'wrap', // Añade esta propiedad para que las palabras largas se ajusten en varias líneas
  },
});

export default ReporteEvento;
