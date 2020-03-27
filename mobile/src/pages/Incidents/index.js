import React, {useState, useEffect} from 'react'; //useEffect é utilizado sempre que queremos carregar uma informação assim que o componente é exibido em tela
import { Feather } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'; //FlatList torna uma lista Scrollável

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Incidents() {
    //estados:
    const[incidents, setIncidents] = useState([]); //vamos preencher ele com o array, portanto temos que iniciá-lo com um array vazio
    const[total, setTotal] = useState(0);//inicia com valor de zero porque é valor numérico
    const[page, setPage] = useState(1); //inicia com o valor de 1 porque não tem como iniciar na página 0
    const[loading, setLoading] = useState(false) //para armazenar uma informação quando estamos buscando um dado novo, para evitar que esses dados sejam buscados novamente

    const navigation = useNavigation ();

    //rota de navegação para a pagina de detalhes o nome passado para o navigate tem que ser o mesmo nome definido no arquivo de routes.js
    function navigateToDetail(incident){
        navigation.navigate('Detail', {incident}); //recebe como segundo parametro as informações que queremos enviar para a pagina que estamos navegando(Detail).
    }

    async function loadIncidents(){
        //se ja estiver em uma requisição ele não tenta fazer dnv
        if(loading){
            return;
        }

        if(total>0 && incidents.length == total){
            return;
        }

        setLoading(true);

        const response = await api.get('incidents', {
            params: { page }
        });

        setIncidents([...incidents, ... response.data]); //uma forma de anexar dois vetores dentro de um unico vetor, pega todos os valores de um e todos os valores do outro
        setTotal(response.headers['x-total-count']); //x-total-count era o header que a gente enviava com o total de registros definido lá no insomnia
        setPage(page + 1);
        setLoading(false);

    }

    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}> {total} casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList 
                style={styles.incidentList}
                data={incidents}
                keyExtractor ={incident => String(incident.id)}
                //showsVerticalScrollIndicator ={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem ={({item: incident}) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                 currency: 'BRL'})
                                 .format(incident.value)}
                        </Text>
                        
                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={() => navigateToDetail(incident)}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#e02041" />
                        </TouchableOpacity>

                    </View>
                )}       
            /> 
        </View>
    );
}