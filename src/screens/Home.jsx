import * as React from 'react';
import { Avatar, Button, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

const LeftContent = props => (
    <Avatar.Icon
      {...props}
      icon={() => (
        <MaterialCommunityIcons
          name="hand-wave-outline"
          size={27}
          color="black"
        />
      )}
    />
  );  

  const styles = StyleSheet.create({
    container: {
      padding: 16,
    },
    text: {
      fontSize: 24,
      marginBottom: 16,
    },
  });

  const Home = () => {
    return (
      <ScrollView>

        <Card>
    <Card.Title title="¡Bienvenido a la app!" left={LeftContent} />
    <Card.Content style={{ marginTop: 8 }}>

      <Text style={{fontSize: 23}}>Reseña histórica de la Asociación de Artes Marciales Mixtas Lara.</Text>

      <Card.Cover style={{ marginTop: 10 }} source={require('../../assets/img/principal1.jpg')} />

      <Text variant="bodyMedium" style={{ marginTop: 20 }}>En el año 2015 luego de salir de la diligencia de la federación venezolana de lucha olímpica,
                                 el Doctor Fernando Lucena decide incursionar en el grapling realizando un seminario donde se
                                 encontraban el Sensei José Calderón, atleta olímpico de judo, el Maestro Henry Colmenares,
                                 Presidente de la Asociación Larense de Sambo, el Sensei Dany Lovera, practicante de judo, el
                                 Profesor Hernin Castillo, ex-selección nacional de lucha grecorromana, la Ing. Gladys, adjunta en
                                 la selección de taekwondo y el Ing. Edward Pereira de la selección de lucha grecorromana y deciden 
                                 organizarse realizando el primer seminario para unificar los criterios, el 8 de julio de 2019 
                                 asistiendo más de 40 practicantes de artes marciales mixtas (MMA), paralelamente el Doctor Fernando 
                                 Lucena hace contacto con el Sensei Mauricio para crear la Federación Venezolana de Artes Marciales 
                                 Mixtas, una vez hecho estos trámites comienzan los clubes interesados a registrarse ante el ministerio 
                                 del deporte y ante los entes municipales respectivos.</Text>
    
    <Text style={{fontSize: 23, marginTop: 20 }}>Misión.</Text>

    <Text variant="bodyMedium" style={{ marginTop: 10 }}>Aglutinar escuelas y clubes del estado Lara que permitan formar seres 
                                                         humanos integrales en un entorno globalizado, a través de las artes marciales 
                                                         mixtas con principios de disciplina, respeto, perseverancia, autocontrol,
                                                         cortesía y espíritu combativo poniéndolos en práctica en los diferentes
                                                         torneos, seminarios planificados por esta asociación o por cualquier otra 
                                                         perteneciente a la federación venezolana de artes marciales mixtas, 
                                                         desarrollando en nuestros estudiantes capacidades para desempeñarse como 
                                                         líderes en sus campos profesionales en cualquier parte del mundo.</Text>
    
    <Text style={{fontSize: 23, marginTop: 20 }}>Visión.</Text>

    <Text variant="bodyMedium" style={{ marginTop: 10 }}>Aglutinar todos los clubes y escuelas de artes marciales mixtas que permitan 
                                                         formar lideres para el futuro profesionales destacados y caracterizados 
                                                         por su disciplina y perseverancia en sus áreas del conocimiento la Asociación 
                                                         de Artes Marciales Mixtas Lara se proyecta como un centro de alto rendimiento 
                                                         en la región larense a través de sus programas de enseñanzas realizados por 
                                                         entrenadores y metodólogos reconocidos a nivel mundial, con filiales en todos 
                                                         los municipios del estado que permiten el intercambio deportivo de nuestros 
                                                         practicantes y el mejoramiento de sus habilidades convirtiendo la institución 
                                                         en una formadora de líderes para el futuro en sus especialidades además de 
                                                         buscar la excelencia físico-táctico..</Text>

    </Card.Content>
    
        

  </Card>
      </ScrollView>
    );
  };

export default Home;