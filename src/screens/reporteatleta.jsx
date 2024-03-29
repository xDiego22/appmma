import React, { useEffect, useState,useContext } from 'react';
import { DataTable } from 'react-native-paper';
import { ScrollView, View, StyleSheet, Text,RefreshControl } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../config';
import { AuthContext } from '../context/AuthContext.jsx';

const ReporteAtletas = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userToken } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = () => {
    
    setRefreshing(true);
    axios.get(`${BASE_URL}/atletas`, {
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
          <DataTable.Title style={[styles.columnHeader, { width: 200 }]}><Text style={styles.columnHeaderText}>Club</Text></DataTable.Title>
          <DataTable.Title style={[styles.columnHeader, { width: 150 }]}><Text style={styles.columnHeaderText}>Cedula</Text></DataTable.Title>
          <DataTable.Title style={[styles.columnHeader, { width: 160 }]}><Text style={styles.columnHeaderText}>Nombre</Text></DataTable.Title>
          <DataTable.Title style={[styles.columnHeader, { width: 160 }]}><Text style={styles.columnHeaderText}>Apellido</Text></DataTable.Title>
          <DataTable.Title style={[styles.columnHeader, { width: 100 }]}><Text style={styles.columnHeaderText}>Peso</Text></DataTable.Title>
          <DataTable.Title style={[styles.columnHeader, { width: 100 }]}><Text style={styles.columnHeaderText}>Estatura</Text></DataTable.Title>
          <DataTable.Title style={[styles.columnHeader, { width: 180 }]}><Text style={styles.columnHeaderText}>F. Nacimiento</Text></DataTable.Title>
          <DataTable.Title style={[styles.columnHeader, { width: 150 }]}><Text style={styles.columnHeaderText}>Telefono</Text></DataTable.Title>
          <DataTable.Title style={[styles.columnHeader, { width: 150 }]}><Text style={styles.columnHeaderText}>Sexo</Text></DataTable.Title>
          <DataTable.Title style={[styles.columnHeader, { width: 130 }]}><Text style={styles.columnHeaderText}>Deporte</Text></DataTable.Title>
          <DataTable.Title style={[styles.columnHeader, { width: 150 }]}><Text style={styles.columnHeaderText}>Categoria</Text></DataTable.Title>
          <DataTable.Title style={[styles.columnHeader, { width: 150 }]}><Text style={styles.columnHeaderText}>F. Ingreso</Text></DataTable.Title>
          <DataTable.Title style={[styles.columnHeader, { width: 160 }]}><Text style={styles.columnHeaderText}>Entrenador</Text></DataTable.Title>
        </DataTable.Header>

        {loading ? (
          <View>
            <Text>Cargando datos...</Text>
          </View>
        ) : (
          data.slice(from, to).map((item,) => (
            <DataTable.Row key={item.cedula} style={styles.row}>
              <DataTable.Cell style={[styles.cell, { width: 200 }]}><Text style={styles.text}>{item.nombre_club}</Text></DataTable.Cell>
              <DataTable.Cell style={[styles.cell, { width: 150 }]}><Text style={styles.text}>{item.cedula}</Text></DataTable.Cell>
              <DataTable.Cell style={[styles.cell, { width: 160 }]}><Text style={styles.text}>{item.nombre}</Text></DataTable.Cell>
              <DataTable.Cell style={[styles.cell, { width: 160 }]}><Text style={styles.text}>{item.apellido}</Text></DataTable.Cell>
              <DataTable.Cell style={[styles.cell, { width: 100 }]}><Text style={styles.text}>{item.peso}</Text></DataTable.Cell>
              <DataTable.Cell style={[styles.cell, { width: 100 }]}><Text style={styles.text}>{item.estatura}</Text></DataTable.Cell>
              <DataTable.Cell style={[styles.cell, { width: 180 }]}><Text style={styles.text}>{item.fechadenacimiento}</Text></DataTable.Cell>
              <DataTable.Cell style={[styles.cell, { width: 150 }]}><Text style={styles.text}>{item.telefono}</Text></DataTable.Cell>
              <DataTable.Cell style={[styles.cell, { width: 150 }]}><Text style={styles.text}>{item.sexo}</Text></DataTable.Cell>
              <DataTable.Cell style={[styles.cell, { width: 130 }]}><Text style={styles.text}>{item.deportebase}</Text></DataTable.Cell>
              <DataTable.Cell style={[styles.cell, { width: 150 }]}><Text style={styles.text}>{item.categoria}</Text></DataTable.Cell>
              <DataTable.Cell style={[styles.cell, { width: 150 }]}><Text style={styles.text}>{item.fechaingresoclub}</Text></DataTable.Cell>
              <DataTable.Cell style={[styles.cell, { width: 160 }]}><Text style={styles.text}>{item.entrenador}</Text></DataTable.Cell>
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
    padding: 8,
  },
  cellView: {
    maxWidth: 150,
    overflow: 'hidden',
  },
  text: {
    textAlign: 'left',
    fontSize: 18,
  },
});

export default ReporteAtletas;
