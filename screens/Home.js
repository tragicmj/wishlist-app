import React,{useState,useEffect} from "react";
import {
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  View
} from "react-native";

import {
  Text,
  Fab,
  Icon,
  List,
  ListItem,
  Left,
  Button,
  Body,
  Right,
  CheckBox,
  Title,
  H1,
  Subtitle,
  Container,
  Spinner,
} from "native-base";

import AsyncStorage from "@react-native-community/async-storage";
import {useIsFocused} from "@react-navigation/native";
import { set } from "react-native-reanimated";

import Netflix from "../netflix.jpg";

const Home = ({navigation,route}) => {  
    const [listOfSeasons, setListOfSeasons] = useState([]);
    const [loading, setLoading] = useState(false);

    const isFocused = useIsFocused();

    const getList = async () => {
      setLoading(true);

      const storedValue = await AsyncStorage.getItem('@season_list');

      if(!storedValue){
        setListOfSeasons([]);
      }
      else{
        const list=JSON.parse(storedValue);
        setListOfSeasons(list);
      }

      // const list = JSON.parse(storedValue);
      // setListOfSeasons(list);

      setLoading(false);

    }

    useEffect(
      () => {
        getList();
      }, [isFocused]
    )

    const deleteSeason = async (id) => {
      const newList = await listOfSeasons.filter(
        (list) => list.id !== id
      );
      await AsyncStorage.setItem('@season_list',JSON.stringify(newList));
      setListOfSeasons(newList);
    }

    const markComplete = async (id) => {
      const newArr = listOfSeasons.map(
        (list) => {
          if(list.id == id){
            list.isWatched=!list.isWatched
          }
          return list;
        }
      )
      await AsyncStorage.setItem('@season_list',JSON.stringify(newArr));
      setListOfSeasons(newArr);
    }

    if (loading){
      return(
        <Container style={styles.container}>
          <Spinner color="#00b7c2" />
        </Container>
      )
    }

    return(
        <ScrollView contentContainerStyle={styles.container}>
          {
            listOfSeasons.length == 0
            ? (
              <Container style={styles.container}>
                <H1 style={styles.heading}>
                  WatchList is empty. Please add a season
                </H1>
                <View style={styles.imgWrap}>
                  <Image source={Netflix} style={styles.imageStyle} />
                </View>
              </Container>
            )
            : (
             <ScrollView style={styles.container}>
                <H1 style={styles.heading}>
                  Series to watch
                </H1>
                <List>
                {
                  listOfSeasons.map((season)=>(
                    <ListItem 
                    style={styles.listItem}
                    noBorder
                    key={season.id}
                    >
                      <Left>
                        <Button
                          style={styles.actionButton}
                          danger
                          onPress={
                            () => deleteSeason(season.id)
                          }
                        >
                          <Icon style={{fontSize:15}} name="trash" active />
                        </Button>
                        <Button
                          style={styles.actionButton}
                          onPress={
                            ()=>{
                              navigation.navigate('Edit',{season})
                            }
                          }
                        >
                          <Icon style={{fontSize:15}} name="edit" type="Feather" active />
                        </Button>
                      </Left>
                     <Body>
                        <Title style={styles.seasonName}>{season.name}</Title>
                        <Text note>{season.totalNoSeason}</Text>
                     </Body>
                     <Right>
                        <CheckBox 
                          checked={season.isWatched}
                          onPress={
                            () => markComplete(season.id)
                          }
                        />
                     </Right>
                    </ListItem>
                  ))
                }
               
              </List>
                <View style={{flex:1,marginBottom:10,bottom:0}}>
                    <Image source={Netflix} style={{width:'100%',height:150}} />
                </View>
             </ScrollView>
            )
          }



            <Fab
              style={{
                backgroundColor:"#5067ff",
              }}
              position="bottomRight"
              onPress={
                ()=> navigation.navigate('Add')
              }
            >
              <Icon name="add"  />
            </Fab>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    emptyContainer: {
      backgroundColor: '#1b262c',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      backgroundColor: '#1b262c',
      flex: 1,
      paddingHorizontal:2
    },
    heading: {
      textAlign: 'center',
      color: '#00b7c2',
      marginVertical: 15,
      marginHorizontal: 5,
    },
    actionButton: {
      marginLeft: 5,
    },
    seasonName: {
      color: '#fdcb9e',
      // textAlign: 'justify',
    },
    imgWrap:{
      paddingHorizontal:6,
      flex:1,
      marginBottom:10,
      position:'absolute',
      bottom:0,
      width:'100%',
      height:'30%'
    },
    imageStyle: {
      resizeMode: 'cover',
      height:'100%',
      width:"100%",
      flex:1,
      paddingHorizontal:10,
      justifyContent:'flex-end'
  },  
    listItem: {
      marginLeft: 0,
      marginBottom: 20,
    },
  });

export default Home;