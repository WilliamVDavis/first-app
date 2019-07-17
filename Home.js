import React from "react";
import {
    StyleSheet,
    View,
    ActivityIndicator,
    FlatList,
    Text,
    TouchableOpacity,
    Button
    } from "react-native";
    export default class Homescreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
    return {
      title: "Card App",
      headerStyle: {backgroundColor: "#000000"},
      headerTitleStyle: {textAlign: "center",flex: 1}
      ( <Button
        title="Go to Description Page"
        onPress={() => navigate('Description')}
      />
    )
     };
    };
    constructor(props) {
     super(props);
     this.state = {
       loading: true,
       vehicles:[]
      };
    }
    componentDidMount(){
    fetch("https://ghibliapi.herokuapp.com/vehicles/")
    .then(response => response.json())
    .then((data)=> {
      this.setState({
       loading: false,
       vehicles: data
      })
    })
    .catch(error=>console.log(error)) //to catch the errors if any
    }
    FlatListItemSeparator = () => {
    return (
      <View style={{
         height: 2,
         width:"100%",
         backgroundColor:"",
    }}
    />
    );
    }
    renderItem=(data)=>
    <TouchableOpacity style={styles.list}>
    <Text style={styles.lightText}>Vehicle:    {data.item.name}</Text>
    <Text style={styles.lightText}>{data.item.description}</Text>
    </TouchableOpacity>
    render(){
     if(this.state.loading){
      return( 
        <View style={styles.loader}> 
          <ActivityIndicator size="large" color="#0c9"/>
        </View>
    )}
    return(
     <View style={styles.container}>
     <FlatList
        data= {this.state.vehicles}
        ItemSeparatorComponent = {this.FlatListItemSeparator}
        renderItem= {item=> this.renderItem(item)}
        keyExtractor= {item=>item.id.toString()}
     />
    </View>
    )}
    }
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#002366",
        top: 80
       },
       button:{
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
       },
      loader:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
       },
      list:{
        paddingVertical: 4,
        margin: 5,
        backgroundColor: "#808080"
       }
      })