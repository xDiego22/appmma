import React, { useEffect, useState, useContext } from 'react';
import { DataTable } from 'react-native-paper';
import { ScrollView, View, StyleSheet, Text, RefreshControl } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../config';
import { AuthContext } from '../context/AuthContext.jsx';

const ReporteEvento = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {logout} = useContext(AuthContext);
  const { userToken } = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);
  
  const fetchData = () => {

    setRefreshing(true);
    // Realiza una solicitud GET a la API para obtener los datos de eventos
    axios.get(`${BASE_URL}/eventos`, {
      headers: {
        'jwt': `Bearer ${userToken}`,
      }
    }) 
      .then((response) => {
        setData(response.data);
        setLoading(false);
        setRefreshing(false);
        //respuesta recibida por el sistema
        console.log(JSON.stringify(response.data, null, 2));
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          // La solicitud fue prohibida (Forbidden)
          console.log("Error 403: Acceso prohibido");
          console.log("Datos de respuesta:", error.response.data);
          alert('Su sesion ha expirado');
          setTimeout(() => { logout() }, 3000);
        } else {
          console.error(error);
        }
        setRefreshing(false);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchData();
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
    <ScrollView horizontal
      refreshControl={ <RefreshControl refreshing={refreshing}  onRefresh={fetchData} colors={["#E34F62", "#F1213C"]} />}
    >
      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={[styles.columnHeader, { width: 170 }]}>
            <Text style={styles.columnHeaderText}>Nombre</Text>
          </DataTable.Title>
          <DataTable.Title style={[styles.columnHeader, { width: 150 }]}>
            <Text style={styles.columnHeaderText}>Fecha</Text>
          </DataTable.Title>
          <DataTable.Title style={[styles.columnHeader, { width: 100 }]}>
            <Text style={styles.columnHeaderText}>Hora</Text>
          </DataTable.Title>
          <DataTable.Title style={[styles.columnHeader, { width: 250 }]}>
            <Text style={styles.columnHeaderText}>Club Responsable</Text>
          </DataTable.Title>
          <DataTable.Title style={[styles.columnHeader, { width: 100 }]}>
            <Text style={styles.columnHeaderText}>Monto</Text>
          </DataTable.Title>
          <DataTable.Title style={[styles.columnHeader, { width: 250 }]}>
            <Text style={styles.columnHeaderText}>Dirección</Text>
          </DataTable.Title>
          <DataTable.Title style={[styles.columnHeader, { width: 150 }]}>
            <Text style={styles.columnHeaderText}>Juez 1</Text>
          </DataTable.Title>
          <DataTable.Title style={[styles.columnHeader, { width: 150 }]}>
            <Text style={styles.columnHeaderText}>Juez 2</Text>
          </DataTable.Title>
          <DataTable.Title style={[styles.columnHeader, { width: 150 }]}>
            <Text style={styles.columnHeaderText}>Juez 3</Text>
          </DataTable.Title>
        </DataTable.Header>

        {loading ? (
          <View>
            <Text>Cargando datos...</Text>
          </View>
        ) : (
          data.slice(from, to).map((item, index) => (
            <DataTable.Row key={index} style={styles.row}>
              <DataTable.Cell style={[styles.cell, { width: 170 }]}>
                <View style={styles.cellView}>
                  <Text style={styles.text}>{item.nombre}</Text>
                </View>
              </DataTable.Cell>
              <DataTable.Cell style={[styles.cell, { width: 150 }]}>
                <View style={styles.cellView}>
                  <Text style={styles.text}>{item.fecha}</Text>
                </View>
              </DataTable.Cell>
              <DataTable.Cell style={[styles.cell, { width: 100 }]}>
                <View style={styles.cellView}>
                  <Text style={styles.text}>{item.hora}</Text>
                </View>
              </DataTable.Cell>
              <DataTable.Cell style={[styles.cell, { width: 250 }]}>
                <View style={styles.cellView}>
                  <Text style={styles.text}>{item.club_nombre}</Text>
                </View>
              </DataTable.Cell>
              <DataTable.Cell style={[styles.cell, { width: 100 }]}>
                <View style={styles.cellView}>
                  <Text style={styles.text}>{item.monto}</Text>
                </View>
              </DataTable.Cell>
              <DataTable.Cell style={[styles.cell, { width: 250 }]}>
                <View style={styles.cellView}>
                  <Text style={styles.text}>{item.direccion}</Text>
                </View>
              </DataTable.Cell>
              <DataTable.Cell style={[styles.cell, { width: 150 }]}>
                <View style={styles.cellView}>
                  <Text style={styles.text}>{item.juez1}</Text>
                </View>
              </DataTable.Cell>
              <DataTable.Cell style={[styles.cell, { width: 150 }]}>
                <View style={styles.cellView}>
                  <Text style={styles.text}>{item.juez2}</Text>
                </View>
              </DataTable.Cell>
              <DataTable.Cell style={[styles.cell, { width: 150 }]}>
                <View style={styles.cellView}>
                  <Text style={styles.text}>{item.juez3}</Text>
                </View>
              </DataTable.Cell>
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
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  columnHeaderText: {
    fontSize: 20,
  },
  row: {
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    padding: 5,
  },
  cellView: {
    maxWidth: 150,
    overflow: 'hidden',
  },
  text: {
    textAlign: 'left',
    fontSize: 16,
  },
});

export default ReporteEvento;
