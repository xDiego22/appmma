import React, { useEffect, useState, useContext} from 'react';
import { DataTable } from 'react-native-paper';
import { ScrollView, View, StyleSheet, Text,RefreshControl } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../config';
import { AuthContext } from '../context/AuthContext.jsx';

const ReporteResultado = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userToken } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = () => {
    
    setRefreshing(true);
    axios.get(`${BASE_URL}/resultados`, {
      headers: {
        'jwt': `Bearer ${userToken}`,
      }
    }) 
      .then((response) => {

        if (response.data.length === 0) {
          alert('No se encontró informacion para mostrar.');
        } 
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
          <DataTable.Title style={[styles.columnHeader, { width: 150 }]}>
            <Text style={{ fontSize: 20 }}>Nombre Evento</Text>
          </DataTable.Title>
          <DataTable.Title style={[styles.columnHeader, { width: 150 }]}>
            <Text style={{ fontSize: 20 }}>Nomb. Atleta 1</Text>
          </DataTable.Title>
          <DataTable.Title style={[styles.columnHeader, { width: 150 }]}>
            <Text style={{ fontSize: 20 }}>Nomb. Atleta 2</Text>
          </DataTable.Title>
          <DataTable.Title style={[styles.columnHeader, { width: 100 }]}>
            <Text style={{ fontSize: 20 }}>Ronda</Text>
          </DataTable.Title>
          <DataTable.Title style={[styles.columnHeader, { width: 150 }]}>
            <Text style={{ fontSize: 20 }}>Forma de Ganar</Text>
          </DataTable.Title>
        </DataTable.Header>

        {loading ? (
          <View>
            <Text>Cargando datos...</Text>
          </View>
        ) : (
          data.slice(from, to).map((item, index) => (
            <DataTable.Row key={index} style={styles.row}>
              <DataTable.Cell style={[styles.cell, { width: 150 }]}>
                <View style={{ maxWidth: 150, overflow: 'hidden' }}>
                  <Text style={styles.text}>{item.nombre}</Text>
                </View>
              </DataTable.Cell>
              <DataTable.Cell style={[styles.cell, { width: 150 }]}>
                <View style={{ maxWidth: 150, overflow: 'hidden' }}>
                  <Text style={styles.text}>{item.nombre1}</Text>
                </View>
              </DataTable.Cell>
              <DataTable.Cell style={[styles.cell, { width: 150 }]}>
                <View style={{ maxWidth: 150, overflow: 'hidden' }}>
                  <Text style={styles.text}>{item.nombre2}</Text>
                </View>
              </DataTable.Cell>
              <DataTable.Cell style={[styles.cell, { width: 100 }]}>
                <View style={{ maxWidth: 100, overflow: 'hidden' }}>
                  <Text style={styles.text}>{item.ronda}</Text>
                </View>
              </DataTable.Cell>
              <DataTable.Cell style={[styles.cell, { width: 150 }]}>
                <View style={{ maxWidth: 150, overflow: 'hidden' }}>
                  <Text style={styles.text}>{item.forma_ganar}</Text>
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
    fontSize: 14,
    lineHeight: 24,
    paddingVertical: 10,
    marginLeft: 20,
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
    padding: 7,
  },
  text: {
    flexWrap: 'wrap',
    textAlign: 'center',
    fontSize: 17,
  },
});

export default ReporteResultado;
