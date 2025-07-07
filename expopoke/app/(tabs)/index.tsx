import { Image } from 'expo-image';
import { Platform, StyleSheet, TextInput, TextInputComponent, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [pokemon, setPokemon] = useState<any>(null);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
      fetch('https://0ef3-207-151-52-253.ngrok-free.app/pokemon/pikachu')
        .then(res => res.json())
        .then(data => setPokemon(data))
        .catch((error) => {
          console.log('API error:', error);
          setPokemon({error: 'Failed to fetch Pokémon data'});
        });
    }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={{ uri: 'https://wallpapersok.com/images/hd/basic-pokeball-cover-mcs4xg2ash4hj4e9.jpg'}}
          style={styles.headerImage}
          contentFit='cover'
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome to Andy's Pokédex!</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <View style={styles.pokedexBox}>
          <ThemedText type="subtitle" style={{ textAlign: 'center', color: '#000', fontSize: 30 }}>Pokédex</ThemedText>
          
          <TextInput
            style={styles.centeredInput}
            placeholder="Search Pokémon by name"
            placeholderTextColor={'#000000'}
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={() => {
              fetch(`https://0127-2603-8000-c600-a600-5dfa-da2d-ffe5-d2f0.ngrok-free.app/pokemon/${search}`)
                .then(res => res.json())
                .then(data => setPokemon(data))
                .catch((error) => {
                  console.log('API error:', error);
                  setPokemon({error: 'Failed to fetch Pokémon data'});
                });
            }}
            returnKeyType="search"
          />
          {pokemon ? (
            pokemon.error ? (
              <ThemedText style={styles.centeredText}>{pokemon.error}</ThemedText>
            ) : (
              <>
                <ThemedText style={styles.centeredText} type="title">
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} {pokemon.id ? `( #${pokemon.id} )` : ''}
                </ThemedText>
                {pokemon.image && (
                  <Image
                    source={{ uri: pokemon.image }}
                    style={{ width: 120, height: 120, marginVertical: 8, alignSelf: 'center' }}
                  />
                )}
                <ThemedText style={styles.centeredText}>
                  Type: {pokemon.types && pokemon.types.join(', ')}
                </ThemedText>
                <ThemedText style={styles.centeredText}>
                  Height: {pokemon.height}
                </ThemedText>
                 <ThemedText style={styles.centeredText}>
                 Weight: {pokemon.weight}
                </ThemedText>
              </>
            )
          ) : (
            <ThemedText style={styles.centeredText}>Loading Pokémon data...</ThemedText>
          )}
        </View>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage : {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  pokedexBox: {
    borderWidth: 2,
    borderColor: '#A1CEDC',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    width: '100%',
  },
  centeredText: {
    textAlign: 'center',
    marginVertical: 4,
    color: '#000000',
  },
  centeredInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
    color: '#000000',
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    textAlign: 'center',
  },
});
