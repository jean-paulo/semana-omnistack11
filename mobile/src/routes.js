import React from 'react';
import {NavigationContainer} from '@react-navigation/native'; //fica em volta de todas as nossas rotas como o BrowserRouter no nosso projeto web é essencial que ele fique por volta das rotas
import {createStackNavigator} from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Incidents from './pages/Incidents';
import Detail from './pages/Detail';

//exportando um componente chamado Routes
export default function Routes(){
    return(
        <NavigationContainer>
            
            <AppStack.Navigator screenOptions={{headerShown: false}}>
                <AppStack.Screen name="Incidents" component={Incidents}/>
                <AppStack.Screen name= "Detail" component={Detail}/>
            </AppStack.Navigator> 
        
        </NavigationContainer>
    );
}
