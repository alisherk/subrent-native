import React from 'react';
import { StyleSheet, ViewStyle, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


interface Props {
  location: { geopoint: { U: number; k: number } };
}

export const MapPreview: React.FC<Props> = ({ location  } ) => {

  const region = {
    latitude: location?.geopoint.U ? location.geopoint.U : 49.8951 ,
    longitude: location?.geopoint.k ? location.geopoint.k : -97.1384,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  const markerCoords = {
    latitude: region.latitude,
    longitude: region.longitude,
  };
  return (
    <View style={styles.container}>
      <MapView style={styles.mapStyle} region={region}>
        <Marker coordinate={markerCoords} />
      </MapView>
    </View>
  );
};

interface Styles {
  container: ViewStyle;
  mapStyle: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: '100%',
    height: 300,
    maxHeight: 500,
  },
});
